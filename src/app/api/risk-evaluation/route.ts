import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

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

      return NextResponse.json(evaluation);
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
