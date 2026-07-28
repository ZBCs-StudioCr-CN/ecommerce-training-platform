import { NextRequest, NextResponse } from 'next/server';

// AI模块的系统提示配置
const moduleSystemPrompts: Record<string, string> = {
  general: `你是一位专业的电商运营顾问，拥有丰富的电商平台运营经验，熟悉淘宝、拼多多、抖音、Amazon、Shopee、Shopify等主流电商平台。
你的任务是帮助学生解决电商运营中的各种问题，包括：
- 店铺运营策略建议
- 产品推广和营销方案
- 数据分析和优化建议
- 客户服务和售后问题
- 平台规则和合规建议

请提供专业、实用、可操作的建议。回答要简洁明了，结构清晰，适合学生理解和学习。`,

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
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// AI配置类型
interface AIConfig {
  provider: string;
  apiKey: string;
  apiBaseUrl: string;
  model: string;
  temperature: number;
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
    const systemPrompt = moduleSystemPrompts[module] || moduleSystemPrompts['general'];

    // 从请求头获取 AI 配置（由客户端传递）
    const aiConfigHeader = request.headers.get('x-ai-config');
    let aiConfig: AIConfig | null = null;

    if (aiConfigHeader) {
      try {
        aiConfig = JSON.parse(aiConfigHeader);
      } catch (e) {
        console.error('Failed to parse AI config header:', e);
      }
    }

    // 构建消息列表
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...(history || []),
      { role: 'user', content: message },
    ];

    // 如果没有配置，返回错误提示
    if (!aiConfig || !aiConfig.apiKey || !aiConfig.apiBaseUrl || !aiConfig.model) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode('⚠️ 请先配置 AI 大模型\n\n'));
          controller.enqueue(encoder.encode('点击左侧菜单的「AI助手」→「⚙️ 配置」按钮，设置您的 API Key 后即可使用 AI 功能。\n\n'));
          controller.enqueue(encoder.encode('支持的服务商：\n'));
          controller.enqueue(encoder.encode('- OpenAI (GPT-4o)\n'));
          controller.enqueue(encoder.encode('- 豆包 (Doubao)\n'));
          controller.enqueue(encoder.encode('- DeepSeek\n'));
          controller.enqueue(encoder.encode('- 智谱 (GLM)\n'));
          controller.enqueue(encoder.encode('- Kimi (Moonshot)\n'));
          controller.enqueue(encoder.encode('- 自定义 OpenAI 兼容接口'));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // 使用用户配置的 API 调用大模型
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await fetch(`${aiConfig!.apiBaseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${aiConfig!.apiKey}`,
            },
            body: JSON.stringify({
              model: aiConfig!.model,
              messages: messages,
              temperature: aiConfig!.temperature || 0.7,
              stream: true,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            controller.enqueue(
              encoder.encode(`\n\n❌ API 调用失败：${errorData.error?.message || `HTTP ${response.status}`}\n\n请检查配置是否正确。`)
            );
            controller.close();
            return;
          }

          // 处理流式响应
          const reader = response.body?.getReader();
          if (!reader) {
            controller.enqueue(encoder.encode('\n\n❌ 无法读取响应流'));
            controller.close();
            return;
          }

          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (e) {
                  // 忽略解析错误
                }
              }
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
