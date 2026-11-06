export const dynamic = 'force-static';
import { NextRequest, NextResponse } from 'next/server';
import { testLLMConnection, PROVIDER_CONFIGS } from '@/lib/llm';

export async function POST(request: NextRequest) {
  try {
    const { provider, apiKey } = await request.json();

    if (!provider || !apiKey) {
      return NextResponse.json(
        { success: false, message: '请选择平台并填写API Key' },
        { status: 400 }
      );
    }

    const config = PROVIDER_CONFIGS[provider];
    if (!config) {
      return NextResponse.json(
        { success: false, message: '不支持的平台' },
        { status: 400 }
      );
    }

    // 测试连接
    const result = await testLLMConnection({
      provider,
      apiKey,
      baseURL: config.baseURL,
      model: config.defaultModel,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI test API error:', error);
    return NextResponse.json(
      { success: false, message: '测试失败' },
      { status: 500 }
    );
  }
}
