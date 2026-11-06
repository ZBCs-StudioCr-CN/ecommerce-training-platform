/**
 * 通用 LLM 调用工具
 * 支持 OpenAI 兼容 API 格式
 * 用户可以在 /student/ai-config 页面配置 API Key
 */

export interface LLMConfig {
  provider: string;
  apiKey: string;
  baseURL?: string;
  model?: string;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

// 平台配置
export const PROVIDER_CONFIGS: Record<string, { baseURL: string; defaultModel: string }> = {
  openai: {
    baseURL: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o',
  },
  deepseek: {
    baseURL: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
  },
  zhipu: {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4',
    defaultModel: 'glm-4',
  },
  qwen: {
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    defaultModel: 'qwen-plus',
  },
  doubao: {
    baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
    defaultModel: 'doubao-pro-32k',
  },
};

/**
 * 获取用户的 AI 配置
 */
export function getUserAIConfig(headers: Headers): LLMConfig | null {
  const provider = headers.get('X-AI-Provider') || '';
  const apiKey = headers.get('X-AI-Api-Key') || '';

  if (!provider || !apiKey) {
    return null;
  }

  const config = PROVIDER_CONFIGS[provider];
  if (!config) {
    return null;
  }

  return {
    provider,
    apiKey,
    baseURL: config.baseURL,
    model: config.defaultModel,
  };
}

/**
 * 调用 LLM（非流式）
 */
export async function callLLM(
  messages: Message[],
  config: LLMConfig,
  options: LLMOptions = {}
): Promise<string> {
  const { baseURL, apiKey, model: configModel } = config;
  const model = options.model || configModel;

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

/**
 * 调用 LLM（流式）
 * 返回 ReadableStream
 */
export async function callLLMStream(
  messages: Message[],
  config: LLMConfig,
  options: LLMOptions = {}
): Promise<ReadableStream> {
  const { baseURL, apiKey, model: configModel } = config;
  const model = options.model || configModel;

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens,
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API error: ${response.status} - ${error}`);
  }

  return response.body || new ReadableStream();
}

/**
 * 从 localStorage 获取用户 AI 配置（前端直接调用时使用）
 */
export function getLocalAIConfig(): LLMConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('ai_config');
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed.provider || !parsed.apiKey) return null;
    const providerConfig = PROVIDER_CONFIGS[parsed.provider];
    return {
      provider: parsed.provider,
      apiKey: parsed.apiKey,
      baseURL: parsed.baseURL || parsed.apiBaseUrl || providerConfig?.baseURL,
      model: parsed.model || providerConfig?.defaultModel,
    };
  } catch {
    return null;
  }
}

/**
 * 测试 LLM 连接
 */
export async function testLLMConnection(config: LLMConfig): Promise<{ success: boolean; message: string; model?: string }> {
  try {
    const messages: Message[] = [
      { role: 'user', content: '你好，请简单回复' },
    ];

    const content = await callLLM(messages, config, { maxTokens: 50 });

    return {
      success: true,
      message: '连接成功',
      model: config.model,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '连接失败',
    };
  }
}
