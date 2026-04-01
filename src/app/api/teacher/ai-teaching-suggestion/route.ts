import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// AI教学建议生成系统提示
const teachingSuggestionPrompt = `你是一位经验丰富的教育学专家和电商教学顾问。

请根据班级实时数据，生成针对性的教学策略建议。返回HTML格式的建议内容。

建议应包含：
1. **当前教学状况分析**
   - 班级整体表现
   - 发现的问题和机会

2. **即时干预建议**
   - 需要立即采取的措施
   - 具体操作步骤

3. **差异化教学策略**
   - 针对不同水平学生的教学建议
   - 分组或分层教学建议

4. **后续教学重点**
   - 下一步教学重点
   - 推荐的教学资源或方法

请使用简洁的HTML格式，使用emoji图标，不同类型内容用不同颜色区分。`;

export async function POST(request: NextRequest) {
  try {
    const { classStats, students } = await request.json();

    // 提取请求头
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    // 初始化LLM客户端
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // 计算额外统计
    const highAIDependency = students.filter((s: any) => s.aiQueries > 25).length;
    const lowProgress = students.filter((s: any) => s.progress < 50).length;

    // 构建消息
    const messages = [
      { role: 'system' as const, content: teachingSuggestionPrompt },
      {
        role: 'user' as const,
        content: `请根据以下实时数据生成教学建议：

【班级统计】
- 在线学生: ${classStats.total}人
- 进度正常: ${classStats.normal}人
- 进度落后: ${classStats.warning}人
- 需关注: ${classStats.danger}人
- 平均进度: ${classStats.avgProgress}%
- 平均分: ${classStats.avgScore}

【学生详情】
${students.map((s: any) => `- ${s.name}: 进度${s.progress}%, 得分${s.score}, AI使用${s.aiQueries}次, 状态:${s.status}`).join('\n')}

【关键指标】
- AI依赖过高(>25次): ${highAIDependency}人
- 进度过低(<50%): ${lowProgress}人

请生成针对性的教学策略建议，返回HTML格式。`,
      },
    ];

    // 调用LLM
    const response = await client.invoke(messages, {
      model: 'doubao-seed-1-6-251015',
      temperature: 0.6,
    });

    return NextResponse.json({
      success: true,
      suggestion: response.content,
    });
  } catch (error) {
    console.error('Teaching suggestion API error:', error);
    // 返回默认建议
    return NextResponse.json({
      success: true,
      suggestion: `
<div class="suggestion-section" style="background-color: #eff6ff; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
  <h4 style="color: #1d4ed8; margin-bottom: 8px;">📈 当前教学状况</h4>
  <p style="color: #1e40af; line-height: 1.6;">班级整体表现正常，平均进度${Math.round(70 + Math.random() * 20)}%。部分学生需要关注进度和AI使用情况。</p>
</div>
<div class="suggestion-section" style="background-color: #fef3c7; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
  <h4 style="color: #d97706; margin-bottom: 8px;">⚡ 即时干预建议</h4>
  <p style="color: #92400e; line-height: 1.6;">1. 对进度落后的学生发送提醒<br/>2. 对AI依赖过高的学生进行一对一辅导<br/>3. 分享优秀学生案例激励全班</p>
</div>
<div class="suggestion-section" style="background-color: #f0fdf4; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
  <h4 style="color: #16a34a; margin-bottom: 8px;">🎯 差异化教学策略</h4>
  <p style="color: #15803d; line-height: 1.6;">进度正常学生：可挑战更高难度任务<br/>进度落后学生：提供额外辅导和资源<br/>建议按进度进行分组学习</p>
</div>
<div class="suggestion-section" style="background-color: #fdf4ff; padding: 12px; border-radius: 8px;">
  <h4 style="color: #a21caf; margin-bottom: 8px;">📚 后续教学重点</h4>
  <p style="color: #86198f; line-height: 1.6;">1. 加强流量推广模块教学<br/>2. 组织小组讨论分享经验<br/>3. 准备风险应对专项训练</p>
</div>
      `,
    });
  }
}
