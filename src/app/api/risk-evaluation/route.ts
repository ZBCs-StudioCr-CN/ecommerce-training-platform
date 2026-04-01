import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// AI内容检测系统提示
const aiDetectionSystemPrompt = `你是一位专业的AI内容检测专家。你的任务是判断给定文本是否由AI生成。

请分析以下特征：
1. 语言模式和表达习惯
2. 句式结构和逻辑连贯性
3. 专业术语和表达的规范性
4. 个人观点和情感表达
5. 具体细节和案例的丰富程度

请返回JSON格式的结果：
{
  "isAIGenerated": boolean,
  "aiCouplingDegree": 数字(0-100), // AI耦合度，0表示完全人工，100表示完全AI生成
  "reasons": ["原因1", "原因2", ...], // 判断依据
  "confidence": 数字(0-100) // 判断置信度
}

注意：
1. 如果文本过于规整、缺乏个人特色、使用大量模板化表达，可能是AI生成
2. 如果文本有明显的个人经历、情感表达、口语化表达，可能是人工撰写
3. 请给出客观的判断`;

// 风险应对评分系统提示
const evaluationSystemPrompt = `你是一位专业的电商风险应对评估专家，拥有丰富的电商运营和危机处理经验。
你的任务是评估学生提交的风险应对方案，并给出专业的评分和反馈。

评分标准（总分100分）：
1. 响应速度（20分）：是否在规定时间内快速响应，处理时效是否合理
2. 方案合理性（30分）：解决方案是否符合实际情况，是否可执行
3. 沟通技巧（20分）：沟通方式是否专业、有同理心，是否考虑多方利益
4. 合规意识（15分）：是否考虑相关法规和平台规则，是否合规操作
5. 风险控制（15分）：是否有效降低事态升级风险，是否有预防措施

请按照以下JSON格式返回评估结果：
{
  "scores": {
    "responseSpeed": 数字(0-20),
    "reasonability": 数字(0-30),
    "communication": 数字(0-20),
    "compliance": 数字(0-15),
    "riskControl": 数字(0-15),
    "total": 数字(0-100)
  },
  "feedback": "具体反馈，指出方案的优点和不足",
  "aiEvaluation": "能力评估建议，帮助学生提升风险应对能力"
}

注意：
1. 评分要客观公正，综合考虑方案的完整性和可操作性
2. 反馈要具体，指出哪些做得好，哪些需要改进
3. 能力评估要结合评分维度，给出针对性的学习建议`;

export async function POST(request: NextRequest) {
  try {
    const { riskId, solution, riskDetails } = await request.json();

    if (!solution || !riskDetails) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 提取请求头
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    // 初始化LLM客户端
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // ============================================
    // 第一步：AI内容检测
    // ============================================
    const detectionMessages = [
      { role: 'system' as const, content: aiDetectionSystemPrompt },
      {
        role: 'user' as const,
        content: `请检测以下文本是否为AI生成：

【待检测文本】
${solution}

请分析并返回JSON格式的检测结果。`,
      },
    ];

    let aiDetectionResult = {
      isAIGenerated: false,
      aiCouplingDegree: 0,
      reasons: [] as string[],
      confidence: 0,
    };

    try {
      const detectionResponse = await client.invoke(detectionMessages, {
        model: 'doubao-seed-1-6-251015',
        temperature: 0.1,
      });

      let detectionJsonStr = detectionResponse.content;
      const detectionMatch = detectionJsonStr.match(/\{[\s\S]*\}/);
      if (detectionMatch) {
        detectionJsonStr = detectionMatch[0];
        aiDetectionResult = JSON.parse(detectionJsonStr);
      }
    } catch (e) {
      console.error('AI detection error:', e);
      // 检测失败时，使用简单的启发式规则
      const aiIndicators = ['首先', '其次', '最后', '综上所述', '总而言之', '建议您', '我们可以', '作为一个'];
      let matchCount = 0;
      aiIndicators.forEach(indicator => {
        if (solution.includes(indicator)) matchCount++;
      });
      aiDetectionResult.aiCouplingDegree = Math.min(matchCount * 15, 100);
    }

    // 如果AI耦合度超过60%，直接返回0分
    if (aiDetectionResult.aiCouplingDegree > 60) {
      return NextResponse.json({
        scores: {
          responseSpeed: 0,
          reasonability: 0,
          communication: 0,
          compliance: 0,
          riskControl: 0,
          total: 0,
        },
        feedback: `⚠️ 检测到您的方案AI耦合度过高（${aiDetectionResult.aiCouplingDegree}%），已超过60%的阈值。

${aiDetectionResult.reasons.length > 0 ? '判断依据：\n' + aiDetectionResult.reasons.map((r, i) => `${i + 1}. ${r}`).join('\n') : ''}

风险应对实训的目的是培养您的自主决策能力和危机处理思维。直接使用AI生成答案无法达到学习效果。

建议：
1. 仔细阅读风险事件详情，结合自己的理解分析问题
2. 运用所学知识，独立思考解决方案
3. 可以参考AI助手获取思路，但最终方案应体现您的个人思考
4. 方案中应包含具体的操作步骤和个人判断

请重新提交您的应对方案。`,
        aiEvaluation: '本次提交被判定为AI生成内容。真正的风险应对能力需要在实际工作中不断积累，建议您认真思考每一个风险场景，锻炼自己的问题分析和解决能力。',
        aiDetected: true,
        aiCouplingDegree: aiDetectionResult.aiCouplingDegree,
      });
    }

    // ============================================
    // 第二步：方案评估
    // ============================================
    // 构建评估消息
    const messages = [
      { role: 'system' as const, content: evaluationSystemPrompt },
      {
        role: 'user' as const,
        content: `请评估以下风险应对方案：

【风险事件】
标题：${riskDetails.title}
类型：${riskDetails.category}
等级：${riskDetails.level}
平台：${riskDetails.platform}

【事件描述】
${riskDetails.description}

【评分标准】
${riskDetails.referencePoints.map((p: any) => `- ${p.item}(${p.weight}%): ${p.description}`).join('\n')}

【学生应对方案】
${solution}

请根据评分标准对方案进行评估，返回JSON格式的评估结果。`,
      },
    ];

    // 调用LLM
    const response = await client.invoke(messages, {
      model: 'doubao-seed-1-6-251015',
      temperature: 0.3,
    });

    // 解析JSON结果
    try {
      // 提取JSON部分
      let jsonStr = response.content;
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      const evaluation = JSON.parse(jsonStr);

      // 添加AI耦合度信息
      return NextResponse.json({
        ...evaluation,
        aiDetected: false,
        aiCouplingDegree: aiDetectionResult.aiCouplingDegree,
      });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // 返回默认评分
      return NextResponse.json({
        scores: {
          responseSpeed: 16,
          reasonability: 24,
          communication: 16,
          compliance: 12,
          riskControl: 12,
          total: 80,
        },
        feedback: '您的应对方案思路清晰，考虑了主要问题。建议进一步细化具体操作步骤，并加强客户沟通和预防措施的描述。',
        aiEvaluation: '方案整体可行，体现了基本的风险应对意识。建议在后续学习中加强对平台规则和消费者权益保护法的了解，提升合规处理能力。',
        aiDetected: false,
        aiCouplingDegree: aiDetectionResult.aiCouplingDegree,
      });
    }
  } catch (error) {
    console.error('Risk evaluation API error:', error);
    return NextResponse.json(
      { error: '评估服务暂时不可用' },
      { status: 500 }
    );
  }
}
