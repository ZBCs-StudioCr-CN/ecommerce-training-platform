/**
 * 前端 AI 服务模块
 * 直接在浏览器中调用 LLM，无需后端 API 路由
 * 支持静态导出（output: 'export'）模式
 */
import {
  callLLM,
  callLLMStream,
  getLocalAIConfig,
  testLLMConnection,
  PROVIDER_CONFIGS,
  type Message,
  type LLMConfig,
} from './llm';

/* -------------------------------------------------------------------------- */
/*                              AI 助手（模块提示词）                          */
/* -------------------------------------------------------------------------- */

export const moduleSystemPrompts: Record<string, string> = {
  'market-analysis': `你是一位专业的电商市场分析师，拥有丰富的行业经验和数据洞察力。你的任务是帮助学生分析市场趋势、竞品情况和市场机会。

回答要求：
1. 基于电商行业实际情况，给出专业、可操作的分析
2. 结合具体案例和数据说明
3. 提供可执行的建议和行动方案
4. 语言简洁明了，适合学生理解`,

  'product-selection': `你是一位资深的电商选品专家，精通爆款挖掘、利润分析和供应链评估。你的任务是帮助学生进行科学的选品决策。

回答要求：
1. 从市场需求、竞争程度、利润空间、供应链可行性等多维度分析
2. 提供具体的选品建议和评估方法
3. 结合真实案例说明
4. 强调数据驱动的决策思维`,

  'store-building': `你是一位专业的电商店铺运营顾问，精通店铺搭建、页面优化和转化率提升。你的任务是指导学生打造高转化的电商店铺。

回答要求：
1. 从用户体验、视觉设计、内容策划等角度给出建议
2. 提供具体的优化方案和操作步骤
3. 结合成功案例说明
4. 强调以数据为导向的优化思维`,

  'advertising': `你是一位资深的电商广告投放专家，精通各平台广告策略、预算分配和ROI优化。你的任务是帮助学生制定高效的广告投放方案。

回答要求：
1. 分析不同广告渠道的特点和适用场景
2. 提供预算分配建议和投放策略
3. 讲解关键指标（CTR、CVR、ROAS等）的优化方法
4. 结合实操案例说明`,

  'operations': `你是一位经验丰富的电商运营总监，精通日常运营、活动策划和增长策略。你的任务是帮助学生建立系统的运营思维。

回答要求：
1. 从用户生命周期、转化漏斗等角度分析
2. 提供可执行的运营方案和活动策划思路
3. 强调数据分析和持续优化的重要性
4. 结合真实案例说明`,

  'marketing-copy': `你是一位专业的电商文案策划师，精通产品文案、营销话术和内容创意。你的任务是帮助学生撰写高转化的营销文案。

回答要求：
1. 根据目标受众和场景调整文案风格
2. 提供具体的文案模板和写作技巧
3. 讲解文案背后的心理学原理
4. 给出修改建议和优化方向`,

  'customer-service': `你是一位专业的电商客服培训导师，精通客服技巧、投诉处理和满意度提升。你的任务是帮助学生提升客户服务能力。

回答要求：
1. 提供标准的客服话术和应对流程
2. 讲解不同类型客户的沟通技巧
3. 强调同理心和专业性的平衡
4. 结合真实案例说明`,

  'data-review': `你是一位资深的电商数据分析师，精通数据采集、分析和问题诊断。你的任务是帮助学生建立数据复盘能力。

回答要求：
1. 讲解关键数据指标的含义和分析方法
2. 提供数据分析框架和工具建议
3. 强调从数据中发现问题和机会
4. 结合具体案例说明`,

  'crisis-management': `你是一位专业的电商危机管理顾问，精通风险预警、危机应对和舆情管理。你的任务是帮助学生提升危机处理能力。

回答要求：
1. 分析危机的性质和影响范围
2. 提供快速响应的处理流程
3. 强调合规意识和风险控制
4. 结合真实案例说明教训和经验`,

  'general': `你是一位友好的电商实训AI助手，能够帮助学生解答关于电商运营、跨境电商、独立站建设等各类问题。

回答要求：
1. 语言亲切友好，适合学生理解
2. 回答专业准确，有实操价值
3. 适当使用emoji增加亲和力
4. 如果问题超出电商范畴，礼貌引导回相关话题`,
};

/**
 * AI 助手对话（流式）
 * 返回 ReadableStream，前端可解析 SSE
 */
export async function chatWithAI(
  message: string,
  module: string,
  history: Message[] = []
): Promise<ReadableStream> {
  const aiConfig = getLocalAIConfig();
  if (!aiConfig) {
    throw new Error('请先配置 AI 服务');
  }

  const systemPrompt = moduleSystemPrompts[module] || moduleSystemPrompts['general'];
  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10),
    { role: 'user', content: message },
  ];

  return callLLMStream(messages, aiConfig, { temperature: 0.7 });
}

/**
 * 解析 OpenAI 兼容流式响应（data: {...} 格式）
 * 提取 content 字段
 */
export function parseSSEStream(
  stream: ReadableStream,
  onChunk: (content: string) => void,
  onDone: () => void,
  onError: (error: Error) => void
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  function read() {
    reader
      .read()
      .then(({ done, value }) => {
        if (done) {
          onDone();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.slice(5).trim();
          if (dataStr === '[DONE]') continue;
          try {
            const data = JSON.parse(dataStr);
            // OpenAI 格式: data.choices[0].delta.content
            // 某些平台格式: data.content
            const content =
              data.choices?.[0]?.delta?.content || data.content || '';
            if (content) onChunk(content);
          } catch {
            // 忽略解析错误
          }
        }
        read();
      })
      .catch(onError);
  }
  read();
}

/* -------------------------------------------------------------------------- */
/*                              风险应对评估                                   */
/* -------------------------------------------------------------------------- */

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
  "aiCouplingDegree": 数字 (0-100),
  "reasons": ["原因1", "原因2"],
  "confidence": 数字 (0-100)
}

注意：
1. 如果文本过于规整、缺乏个人特色、使用大量模板化表达，可能是AI生成
2. 如果文本有明显的个人经历、情感表达、口语化表达，可能是人工撰写
3. 请给出客观的判断`;

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
    "responseSpeed": 数字 (0-20),
    "reasonability": 数字 (0-30),
    "communication": 数字 (0-20),
    "compliance": 数字 (0-15),
    "riskControl": 数字 (0-15),
    "total": 数字 (0-100)
  },
  "feedback": "具体反馈，指出方案的优点和不足",
  "aiEvaluation": "能力评估建议，帮助学生提升风险应对能力"
}

注意：
1. 评分要客观公正，综合考虑方案的完整性和可操作性
2. 反馈要具体，指出哪些做得好，哪些需要改进
3. 能力评估要结合评分维度，给出针对性的学习建议`;

export interface RiskEvaluationResult {
  scores: {
    responseSpeed: number;
    reasonability: number;
    communication: number;
    compliance: number;
    riskControl: number;
    total: number;
  };
  feedback: string;
  aiEvaluation: string;
  aiDetected: boolean;
  aiCouplingDegree: number;
}

export async function evaluateRiskSolution(
  solution: string,
  riskDetails: any
): Promise<RiskEvaluationResult> {
  const aiConfig = getLocalAIConfig();

  // 第一步：AI 内容检测
  let aiCouplingDegree = 0;
  if (aiConfig) {
    try {
      const detectionMessages: Message[] = [
        { role: 'system', content: aiDetectionSystemPrompt },
        { role: 'user', content: `请检测以下文本是否为AI生成：\n\n【待检测文本】\n${solution}\n\n请分析并返回JSON格式的检测结果。` },
      ];
      const detectionResponse = await callLLM(detectionMessages, aiConfig, { temperature: 0.1 });
      const match = detectionResponse.match(/\{[\s\S]*\}/);
      if (match) {
        const result = JSON.parse(match[0]);
        aiCouplingDegree = result.aiCouplingDegree || 0;
      }
    } catch {
      // 启发式检测
      const indicators = ['首先', '其次', '最后', '综上所述', '总而言之', '建议您', '我们可以', '作为一个'];
      const count = indicators.filter((i) => solution.includes(i)).length;
      aiCouplingDegree = Math.min(count * 15, 100);
    }
  }

  if (aiCouplingDegree > 60) {
    return {
      scores: { responseSpeed: 0, reasonability: 0, communication: 0, compliance: 0, riskControl: 0, total: 0 },
      feedback: `⚠️ 检测到您的方案AI耦合度过高（${aiCouplingDegree}%），已超过60%的阈值。\n\n风险应对实训的目的是培养您的自主决策能力和危机处理思维。直接使用AI生成答案无法达到学习效果。\n\n建议：\n1. 仔细阅读风险事件详情，结合自己的理解分析问题\n2. 运用所学知识，独立思考解决方案\n3. 可以参考AI助手获取思路，但最终方案应体现您的个人思考\n4. 方案中应包含具体的操作步骤和个人判断\n\n请重新提交您的应对方案。`,
      aiEvaluation: '本次提交被判定为AI生成内容。真正的风险应对能力需要在实际工作中不断积累，建议您认真思考每一个风险场景，锻炼自己的问题分析和解决能力。',
      aiDetected: true,
      aiCouplingDegree,
    };
  }

  // 第二步：方案评估
  if (!aiConfig) {
    // 未配置 AI，返回默认评分
    return {
      scores: { responseSpeed: 16, reasonability: 24, communication: 16, compliance: 12, riskControl: 12, total: 80 },
      feedback: '您的应对方案思路清晰，考虑了主要问题。建议进一步细化具体操作步骤，并加强客户沟通和预防措施的描述。',
      aiEvaluation: '方案整体可行，体现了基本的风险应对意识。建议在后续学习中加强对平台规则和消费者权益保护法的了解，提升合规处理能力。',
      aiDetected: false,
      aiCouplingDegree,
    };
  }

  const messages: Message[] = [
    { role: 'system', content: evaluationSystemPrompt },
    {
      role: 'user',
      content: `请评估以下风险应对方案：

【风险事件】
标题：${riskDetails.title}
类型：${riskDetails.category}
等级：${riskDetails.level}
平台：${riskDetails.platform}

【事件描述】
${riskDetails.description}

【评分标准】
${riskDetails.referencePoints?.map((p: any) => `- ${p.item}(${p.weight}%): ${p.description}`).join('\n') || ''}

【学生应对方案】
${solution}

请根据评分标准对方案进行评估，返回JSON格式的评估结果。`,
    },
  ];

  try {
    const response = await callLLM(messages, aiConfig, { temperature: 0.3 });
    const match = response.match(/\{[\s\S]*\}/);
    if (match) {
      const evaluation = JSON.parse(match[0]);
      return { ...evaluation, aiDetected: false, aiCouplingDegree };
    }
  } catch {
    // 解析失败返回默认
  }

  return {
    scores: { responseSpeed: 16, reasonability: 24, communication: 16, compliance: 12, riskControl: 12, total: 80 },
    feedback: '您的应对方案思路清晰，考虑了主要问题。建议进一步细化具体操作步骤，并加强客户沟通和预防措施的描述。',
    aiEvaluation: '方案整体可行，体现了基本的风险应对意识。',
    aiDetected: false,
    aiCouplingDegree,
  };
}

/* -------------------------------------------------------------------------- */
/*                              AI 生成实训任务                                */
/* -------------------------------------------------------------------------- */

export async function generateAITask(
  prompt: string,
  taskType: string,
  selectedModules: string[]
): Promise<string> {
  const aiConfig = getLocalAIConfig();
  if (!aiConfig) {
    throw new Error('请先配置 AI 服务');
  }

  const systemPrompt = `你是一位专业的电商实训任务设计师。请根据学生的需求生成一个完整的实训任务。

任务类型：${taskType}
涉及模块：${selectedModules.join('、')}

请生成包含以下内容的实训任务：
1. 任务背景与目标
2. 具体操作步骤
3. 评分标准
4. 参考资源

请用 Markdown 格式输出，结构清晰，适合学生阅读和执行。`;

  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt },
  ];

  return callLLM(messages, aiConfig, { temperature: 0.7 });
}

/* -------------------------------------------------------------------------- */
/*                              AI 学情分析报告                                */
/* -------------------------------------------------------------------------- */

export async function generateAnalysisReport(data: any): Promise<string> {
  const aiConfig = getLocalAIConfig();
  if (!aiConfig) {
    throw new Error('请先配置 AI 服务');
  }

  const systemPrompt = `你是一位专业的教育数据分析专家。请根据提供的学生学习数据生成一份学情分析报告。

报告应包含：
1. 整体学习情况概览
2. 各模块掌握程度分析
3. 薄弱环节识别
4. 个性化学习建议

请用 Markdown 格式输出，数据详实，建议具体可行。`;

  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `以下是学生学习数据：\n\n${JSON.stringify(data, null, 2)}\n\n请生成学情分析报告。` },
  ];

  return callLLM(messages, aiConfig, { temperature: 0.5 });
}

/* -------------------------------------------------------------------------- */
/*                              AI 教学建议                                    */
/* -------------------------------------------------------------------------- */

export async function generateTeachingSuggestion(data: any): Promise<string> {
  const aiConfig = getLocalAIConfig();
  if (!aiConfig) {
    throw new Error('请先配置 AI 服务');
  }

  const systemPrompt = `你是一位资深的电商教育专家。请根据班级学情数据生成教学建议。

建议应包含：
1. 班级整体情况分析
2. 教学重点调整建议
3. 针对性辅导方案
4. 后续教学规划

请用 Markdown 格式输出，建议具体可执行。`;

  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `以下是班级学情数据：\n\n${JSON.stringify(data, null, 2)}\n\n请生成教学建议。` },
  ];

  return callLLM(messages, aiConfig, { temperature: 0.5 });
}

/* -------------------------------------------------------------------------- */
/*                              AI 连接测试                                    */
/* -------------------------------------------------------------------------- */

export async function testAIConnection(provider: string, apiKey: string) {
  const config = PROVIDER_CONFIGS[provider];
  if (!config) {
    return { success: false, message: '不支持的平台' };
  }
  return testLLMConnection({
    provider,
    apiKey,
    baseURL: config.baseURL,
    model: config.defaultModel,
  });
}
