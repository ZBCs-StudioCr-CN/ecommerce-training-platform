import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// AI生成实训任务系统提示
const taskGenerationPrompt = `你是一位专业的电商教育专家，擅长设计实训任务和学习方案。

根据教师的需求描述，生成一个完整的实训任务方案。请严格按照以下JSON格式返回：

{
  "name": "任务名称",
  "description": "任务详细描述（100-200字）",
  "objectives": ["学习目标1", "学习目标2", "学习目标3"],
  "evaluation": ["评分维度1", "评分维度2", "评分维度3", "评分维度4"],
  "modules": [
    {"name": "模块名称", "weight": 权重数字, "description": "模块描述"}
  ],
  "risks": ["可能触发的风险事件1", "风险事件2"],
  "duration": "预计时长",
  "difficulty": "难度等级"
}

注意事项：
1. 任务名称要简洁明确，体现核心训练内容
2. 学习目标要具体可衡量，通常3-5个
3. 评分维度要覆盖核心能力，通常4-5个维度
4. 模块权重总和必须为100
5. 难度分为：入门级、进阶级、挑战级`;

export async function POST(request: NextRequest) {
  try {
    const { prompt, taskType, selectedModules } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: '缺少需求描述' },
        { status: 400 }
      );
    }

    // 提取请求头
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    // 初始化LLM客户端
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // 构建消息
    const messages = [
      { role: 'system' as const, content: taskGenerationPrompt },
      {
        role: 'user' as const,
        content: `请根据以下需求生成实训任务方案：

【教师需求】
${prompt}

【任务类型】
${taskType === 'module' ? '分项技能实训' : '综合项目实战'}

【已选模块】
${selectedModules?.join('、') || '未指定，请自动选择合适模块'}

请生成完整的任务方案，返回JSON格式。`,
      },
    ];

    // 调用LLM
    const response = await client.invoke(messages, {
      model: 'doubao-seed-1-6-251015',
      temperature: 0.7,
    });

    // 解析JSON结果
    try {
      let jsonStr = response.content;
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      const task = JSON.parse(jsonStr);

      return NextResponse.json({
        success: true,
        task,
      });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // 返回默认任务结构
      return NextResponse.json({
        success: true,
        task: {
          name: '电商实训任务',
          description: prompt,
          objectives: ['掌握电商运营基本技能', '培养实际操作能力', '提升决策分析能力'],
          evaluation: ['操作规范性', '方案合理性', '数据准确性', '创新思维'],
          modules: [
            { name: '市场调研', weight: 20, description: '市场分析与竞品调研' },
            { name: '店铺搭建', weight: 30, description: '店铺装修与商品上架' },
            { name: '流量推广', weight: 30, description: '广告投放与SEO优化' },
            { name: '数据分析', weight: 20, description: '数据监控与优化决策' },
          ],
          risks: ['客户投诉', '广告封禁'],
          duration: '4课时',
          difficulty: '进阶级',
        },
      });
    }
  } catch (error) {
    console.error('Task generation API error:', error);
    return NextResponse.json(
      { error: '任务生成服务暂时不可用' },
      { status: 500 }
    );
  }
}
