import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// AI模块的系统提示配置
const moduleSystemPrompts: Record<string, string> = {
  'market-analysis': `你是一位专业的电商市场分析师，拥有丰富的市场研究和数据分析经验。
你的任务是帮助用户进行市场分析，包括：
- 行业趋势分析和预测
- 竞品分析和对比
- 市场机会识别
- 消费者行为洞察

请提供专业、数据驱动的分析建议。回答要简洁明了，结构清晰。`,

  'product-selection': `你是一位资深的电商选品专家，精通产品分析、利润计算和供应链评估。
你的任务是帮助用户进行选品决策，包括：
- 爆款产品推荐和分析
- 产品利润空间计算
- 市场竞争强度评估
- 供应商可靠性评估
- 产品生命周期预测

请提供基于数据的选品建议，并分析潜在风险。`,

  'store-setup': `你是一位电商店铺设计和优化专家，擅长提升店铺转化率和用户体验。
你的任务是帮助用户优化店铺，包括：
- 店铺页面设计和布局建议
- 产品详情页优化
- 用户体验改进方案
- 主题风格定制建议
- 转化率提升策略

请提供具体可执行的设计建议，并解释背后的逻辑。`,

  'advertising': `你是一位电商广告投放专家，精通各大平台的广告策略和ROI优化。
你的任务是帮助用户优化广告投放，包括：
- 广告策略制定
- 预算分配建议
- ROI优化方案
- 广告创意建议
- 投放数据分析

请提供具体的投放建议，包含预算分配和预期效果分析。`,

  'operations': `你是一位电商运营专家，擅长活动策划、用户增长和店铺日常运营。
你的任务是帮助用户优化运营，包括：
- 促销活动策划
- 用户增长策略
- 复购率提升方案
- 会员体系设计
- 运营流程优化

请提供系统性的运营建议，并给出执行步骤。`,

  'marketing-copy': `你是一位电商文案专家，擅长撰写吸引人的营销文案和话术。
你的任务是帮助用户创作文案，包括：
- 产品标题优化
- 产品描述文案
- 营销活动文案
- 客服销售话术
- 短视频带货脚本

请提供创意性强、转化率高的文案内容。`,

  'customer-service': `你是一位电商客户服务专家，擅长处理各类客户问题和投诉。
你的任务是帮助用户提升客服质量，包括：
- 客户投诉处理方案
- 客服话术培训
- 满意度提升策略
- 差评处理方案
- 客服流程优化

请提供专业、人性化的客服建议，注重客户体验。`,

  'data-review': `你是一位电商数据分析专家，擅长从数据中发现问题和机会。
你的任务是帮助用户进行数据复盘，包括：
- 运营数据分析
- 问题诊断和定位
- 趋势预测
- 优化建议
- 复盘报告撰写

请提供基于数据的深入分析，并给出可操作的改进建议。`,

  'crisis-handling': `你是一位电商危机公关专家，擅长处理各类危机事件和负面舆情。
你的任务是帮助用户应对危机，包括：
- 危机预警和识别
- 危机应对方案
- 舆情管理策略
- 品牌形象修复
- 预防措施建议

请提供专业、冷静的危机处理建议，优先保护品牌声誉。`,
};

// 对话消息类型
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, module, history } = await request.json();

    if (!message || !module) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 获取模块对应的系统提示
    const systemPrompt = moduleSystemPrompts[module] || moduleSystemPrompts['market-analysis'];

    // 提取请求头
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    // 初始化LLM客户端
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // 构建消息列表
    const messages: Message[] = [
      { role: 'system' as const, content: systemPrompt },
      ...(history || []),
      { role: 'user' as const, content: message },
    ];

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const llmStream = client.stream(messages, {
            model: 'doubao-seed-1-6-251015',
            temperature: 0.7,
          });

          for await (const chunk of llmStream) {
            if (chunk.content) {
              const text = chunk.content.toString();
              controller.enqueue(encoder.encode(text));
            }
          }

          controller.close();
        } catch (error) {
          console.error('LLM streaming error:', error);
          controller.enqueue(encoder.encode('\n\n[AI响应出错，请稍后重试]'));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('AI Assistant API error:', error);
    return NextResponse.json(
      { error: 'AI服务暂时不可用' },
      { status: 500 }
    );
  }
}
