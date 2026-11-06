export const dynamic = 'force-static';
import { NextRequest, NextResponse } from 'next/server';
import { getUserAIConfig, callLLMStream, Message } from '@/lib/llm';

// 各模块系统提示词
const moduleSystemPrompts: Record<string, string> = {
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

export async function POST(request: NextRequest) {
  try {
    const { message, module, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '请输入您的问题' },
        { status: 400 }
      );
    }

    // 获取用户配置的 AI
    const aiConfig = getUserAIConfig(request.headers);

    if (!aiConfig) {
      return NextResponse.json(
        {
          error: '请先配置 AI 服务',
          needConfig: true,
          configUrl: '/student/ai-config',
        },
        { status: 400 }
      );
    }

    // 获取系统提示词
    const systemPrompt = moduleSystemPrompts[module] || moduleSystemPrompts['general'];

    // 构建消息
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
    ];

    // 添加历史消息（最多保留最近 10 条）
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      messages.push(...recentHistory);
    }

    // 添加当前用户消息
    messages.push({ role: 'user', content: message });

    // 调用 LLM（流式）
    const stream = await callLLMStream(messages, aiConfig, {
      temperature: 0.7,
    });

    // 返回 SSE 流
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('AI assistant API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI 服务暂时不可用' },
      { status: 500 }
    );
  }
}
