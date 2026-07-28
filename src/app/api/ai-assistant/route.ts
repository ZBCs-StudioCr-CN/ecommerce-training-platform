import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// AI助手模块系统提示词
const MODULE_PROMPTS: Record<string, string> = {
  'market-analysis': `你是电商市场分析专家，专注于行业趋势分析、竞品分析和市场机会洞察。
你的回答应该：
1. 基于数据和市场规律给出专业分析
2. 提供可操作的市场洞察和建议
3. 结合国内电商和跨境电商的不同特点
4. 引导学生思考市场背后的逻辑`,

  'product-selection': `你是电商选品顾问，专注于爆款挖掘、利润分析和供应链评估。
你的回答应该：
1. 提供科学的选品方法论
2. 分析产品的市场潜力和利润空间
3. 评估供应链可行性
4. 引导学生建立选品思维框架`,

  'store-building': `你是电商店铺搭建专家，专注于店铺装修、页面优化和转化率提升。
你的回答应该：
1. 提供店铺视觉设计建议
2. 分析页面布局和用户体验
3. 给出转化率优化策略
4. 结合不同平台的特点给出建议`,

  'advertising': `你是电商广告投放专家，专注于广告策略、预算分配和ROI优化。
你的回答应该：
1. 分析不同广告平台的特点
2. 提供预算分配建议
3. 给出ROI优化策略
4. 引导学生理解广告数据背后的逻辑`,

  'operations': `你是电商运营策略专家，专注于日常运营、活动策划和增长策略。
你的回答应该：
1. 提供系统化的运营方法论
2. 分析运营数据和关键指标
3. 给出活动策划建议
4. 引导学生建立运营思维`,

  'marketing-copy': `你是电商营销文案专家，专注于文案撰写、话术优化和内容创意。
你的回答应该：
1. 提供文案撰写技巧和方法
2. 分析优秀文案案例
3. 给出话术优化建议
4. 引导学生理解消费者心理`,

  'customer-service': `你是电商客服培训专家，专注于客服培训、投诉处理和满意度提升。
你的回答应该：
1. 提供客服沟通技巧
2. 分析投诉处理案例
3. 给出满意度提升策略
4. 引导学生建立服务意识`,

  'data-review': `你是电商数据分析专家，专注于数据分析、问题诊断和优化建议。
你的回答应该：
1. 提供数据分析方法论
2. 分析关键指标和趋势
3. 给出问题诊断思路
4. 引导学生建立数据驱动思维`,

  'crisis-management': `你是电商危机管理专家，专注于风险预警、危机应对和舆情管理。
你的回答应该：
1. 提供风险识别方法
2. 分析危机处理案例
3. 给出舆情管理策略
4. 引导学生建立风险意识`,

  'general': `你是电商实训AI助手，专注于帮助学生提升电商运营能力。
你的回答应该：
1. 专业、准确、有建设性
2. 引导学生独立思考，而不是直接给答案
3. 结合电商行业实际案例
4. 鼓励学生实践和应用`
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, module = 'general', history = [] } = body;

    if (!message) {
      return NextResponse.json({ error: '请输入消息' }, { status: 400 });
    }

    // 获取系统提示词
    const systemPrompt = MODULE_PROMPTS[module] || MODULE_PROMPTS['general'];

    // 构建消息
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // 使用扣子 SDK 调用 LLM
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // 使用流式输出
    const stream = client.stream(messages, {
      model: 'doubao-seed-1-8-251228',
      temperature: 0.8,
    });

    // 创建 ReadableStream 用于 SSE
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.content) {
              const text = chunk.content.toString();
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'AI响应出错，请稍后重试' })}\n\n`));
          controller.close();
        }
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('AI助手API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
