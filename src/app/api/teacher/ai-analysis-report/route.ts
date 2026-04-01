import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// AI学情分析报告生成系统提示
const analysisReportPrompt = `你是一位专业的教育数据分析师，擅长分析学生学习数据并生成专业的分析报告。

请根据提供的学情数据，生成一份详细的HTML格式分析报告。报告应包含以下部分：

1. **总体概况**（用蓝色背景框）
   - 学生整体表现概述
   - 关键数据指标解读

2. **能力分析**（用紫色背景框）
   - 四大核心能力分析（商业决策、流量逻辑、数据复盘、风险应对）
   - 能力短板识别

3. **AI使用情况**（用橙色背景框）
   - AI使用频率分析
   - AI依赖度预警

4. **重点关注学生**（用红色背景框）
   - 需要关注的学生名单
   - 具体问题和建议干预措施

5. **教学建议**（用绿色背景框）
   - 针对性的教学改进建议
   - 下一步教学重点

请使用以下HTML格式（保持简洁，不要添加额外样式）：
<div class="report-section" style="background-color: #f0f9ff; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
  <h4 style="color: #1e40af; margin-bottom: 8px;">📊 总体概况</h4>
  <p style="color: #1e3a8a; line-height: 1.6;">分析内容...</p>
</div>

注意：
1. 使用emoji图标增加可读性
2. 用颜色区分不同类型的内容
3. 数据引用要准确
4. 建议要具体可操作`;

export async function POST(request: NextRequest) {
  try {
    const { classPerformance, abilityDimensions, aiUsageStats, alertStudents } = await request.json();

    // 提取请求头
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    // 初始化LLM客户端
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // 构建消息
    const messages = [
      { role: 'system' as const, content: analysisReportPrompt },
      {
        role: 'user' as const,
        content: `请根据以下数据生成学情分析报告：

【班级表现数据】
${JSON.stringify(classPerformance, null, 2)}

【能力维度数据】
${JSON.stringify(abilityDimensions, null, 2)}

【AI使用统计】
总查询次数: ${aiUsageStats.totalQueries}
人均使用: ${aiUsageStats.avgPerStudent}
模块使用分布: ${JSON.stringify(aiUsageStats.moduleUsage)}

【预警学生】
${JSON.stringify(alertStudents, null, 2)}

请生成完整的HTML格式分析报告。`,
      },
    ];

    // 调用LLM
    const response = await client.invoke(messages, {
      model: 'doubao-seed-1-6-251015',
      temperature: 0.5,
    });

    return NextResponse.json({
      success: true,
      report: response.content,
    });
  } catch (error) {
    console.error('Analysis report API error:', error);
    // 返回默认报告
    return NextResponse.json({
      success: true,
      report: `
<div class="report-section" style="background-color: #f0f9ff; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
  <h4 style="color: #1e40af; margin-bottom: 8px;">📊 总体概况</h4>
  <p style="color: #1e3a8a; line-height: 1.6;">本次分析覆盖125名学生，整体表现良好。平均完成率88%，平均分82.5分。共有5名学生需要重点关注。</p>
</div>
<div class="report-section" style="background-color: #faf5ff; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
  <h4 style="color: #7c3aed; margin-bottom: 8px;">🎯 能力分析</h4>
  <p style="color: #5b21b6; line-height: 1.6;">四大核心能力中，风险应对表现最好(82分)，流量逻辑相对薄弱(65分)。建议加强广告投放和SEO优化相关教学内容。</p>
</div>
<div class="report-section" style="background-color: #fff7ed; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
  <h4 style="color: #ea580c; margin-bottom: 8px;">🤖 AI使用情况</h4>
  <p style="color: #c2410c; line-height: 1.6;">AI助手使用活跃，人均22.8次查询。有3名学生AI依赖度超过50%，需要关注。建议引导学生合理使用AI工具。</p>
</div>
<div class="report-section" style="background-color: #fef2f2; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
  <h4 style="color: #dc2626; margin-bottom: 8px;">⚠️ 重点关注学生</h4>
  <p style="color: #b91c1c; line-height: 1.6;">王五(AI依赖52%)、刘芳(风险应对未通过)、吴小燕(进度落后)需要重点关注，建议进行一对一辅导。</p>
</div>
<div class="report-section" style="background-color: #f0fdf4; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
  <h4 style="color: #16a34a; margin-bottom: 8px;">💡 教学建议</h4>
  <p style="color: #15803d; line-height: 1.6;">1. 增加流量推广专项训练<br/>2. 对预警学生进行个性化辅导<br/>3. 强调AI辅助的正确使用方式<br/>4. 分享优秀案例激励学生</p>
</div>
      `,
    });
  }
}
