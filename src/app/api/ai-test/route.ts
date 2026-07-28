import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { provider, apiKey } = await request.json();

    if (!provider || !apiKey) {
      return NextResponse.json(
        { success: false, message: '请选择平台并填写API Key' },
        { status: 400 }
      );
    }

    // 使用扣子 SDK 测试连接
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config({ apiKey });
    const client = new LLMClient(config, customHeaders);

    const messages = [
      { role: 'user' as const, content: '你好，请简单介绍一下自己' }
    ];

    const response = await client.invoke(messages, {
      model: 'doubao-seed-1-8-251228',
      temperature: 0.7,
    });

    return NextResponse.json({
      success: true,
      message: '连接成功！',
      response: response.content
    });
  } catch (error) {
    console.error('AI测试连接错误:', error);
    return NextResponse.json({
      success: false,
      message: '连接失败，请检查API Key是否正确'
    });
  }
}
