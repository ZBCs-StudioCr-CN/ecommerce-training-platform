import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { provider, apiKey, apiBaseUrl, model } = await request.json();

    if (!apiKey || !apiBaseUrl || !model) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 测试连接 - 发送一个简单的请求
    const response = await fetch(`${apiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: '你好' }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: `模型 ${model} 连接正常`,
      });
    } else {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({
        success: false,
        error: errorData.error?.message || `HTTP ${response.status}`,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '网络请求失败，请检查 Base URL 是否正确',
    });
  }
}
