'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, TestTube, CheckCircle, AlertCircle, Key, Globe, Cpu, Info } from 'lucide-react';

interface AIConfig {
  provider: string;
  apiKey: string;
  apiBaseUrl: string;
  model: string;
  temperature: number;
}

const providerConfig = {
  openai: {
    name: 'OpenAI',
    icon: '🤖',
    defaultBaseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  },
  doubao: {
    name: '豆包 (Doubao)',
    icon: '🫘',
    defaultBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    defaultModel: 'doubao-seed-1-6-251015',
    models: ['doubao-seed-1-6-251015', 'doubao-pro-32k', 'doubao-lite-32k'],
  },
  deepseek: {
    name: 'DeepSeek',
    icon: '🔍',
    defaultBaseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    models: ['deepseek-chat', 'deepseek-reasoner'],
  },
  zhipu: {
    name: '智谱 (GLM)',
    icon: '🧠',
    defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    defaultModel: 'glm-4',
    models: ['glm-4', 'glm-4-flash', 'glm-4-air'],
  },
  moonshot: {
    name: 'Kimi (Moonshot)',
    icon: '🌙',
    defaultBaseUrl: 'https://api.moonshot.cn/v1',
    defaultModel: 'moonshot-v1-8k',
    models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
  },
  custom: {
    name: '自定义 (OpenAI兼容)',
    icon: '⚙️',
    defaultBaseUrl: '',
    defaultModel: '',
    models: [],
  },
};

export default function AIConfigPage() {
  const router = useRouter();
  const [config, setConfig] = useState<AIConfig>({
    provider: 'openai',
    apiKey: '',
    apiBaseUrl: '',
    model: '',
    temperature: 0.7,
  });
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);

  useEffect(() => {
    // 检测是否在沙箱环境
    setIsSandbox(typeof window !== 'undefined' && window.location.hostname.includes('coze.site'));

    // 从 localStorage 加载配置
    const savedConfig = localStorage.getItem('ai_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
      } catch (e) {
        console.error('Failed to parse AI config:', e);
      }
    }
    setLoaded(true);
  }, []);

  const handleProviderChange = (provider: string) => {
    const providerInfo = providerConfig[provider as keyof typeof providerConfig];
    setConfig({
      ...config,
      provider,
      apiBaseUrl: providerInfo.defaultBaseUrl,
      model: providerInfo.defaultModel,
    });
  };

  const handleSave = () => {
    if (!config.apiKey.trim()) {
      setTestResult({ success: false, message: '请填写 API Key' });
      return;
    }
    if (!config.apiBaseUrl.trim()) {
      setTestResult({ success: false, message: '请填写 API Base URL' });
      return;
    }
    if (!config.model.trim()) {
      setTestResult({ success: false, message: '请填写模型名称' });
      return;
    }

    localStorage.setItem('ai_config', JSON.stringify(config));
    setSaved(true);
    setTestResult({ success: true, message: '配置已保存' });
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTest = async () => {
    if (!config.apiKey.trim() || !config.apiBaseUrl.trim() || !config.model.trim()) {
      setTestResult({ success: false, message: '请先填写完整的配置信息' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/ai-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: config.provider,
          apiKey: config.apiKey,
          apiBaseUrl: config.apiBaseUrl,
          model: config.model,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setTestResult({ success: true, message: '连接成功！' + (data.message || '') });
      } else {
        setTestResult({ success: false, message: data.error || '连接失败' });
      }
    } catch (error) {
      setTestResult({ success: false, message: '请求失败，请检查网络' });
    } finally {
      setTesting(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('ai_config');
    setConfig({
      provider: 'openai',
      apiKey: '',
      apiBaseUrl: 'https://api.openai.com/v1',
      model: 'gpt-4o',
      temperature: 0.7,
    });
    setTestResult(null);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const currentProvider = providerConfig[config.provider as keyof typeof providerConfig];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">AI 大模型配置</h1>
              <p className="text-xs text-slate-500">配置您自己的 AI 服务接入</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* 沙箱环境提示 */}
        <div className={`rounded-lg border p-4 ${isSandbox ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSandbox ? 'bg-green-100' : 'bg-blue-100'}`}>
              {isSandbox ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-blue-600" />}
            </div>
            <div>
              <p className={`font-medium ${isSandbox ? 'text-green-800' : 'text-blue-800'}`}>
                {isSandbox ? '✅ 扣子沙箱环境' : '🌐 外部部署环境'}
              </p>
              <p className={`text-sm mt-1 ${isSandbox ? 'text-green-700' : 'text-blue-700'}`}>
                {isSandbox
                  ? '可使用内置豆包大模型，也可配置自己的 API Key 使用其他模型'
                  : '请配置您自己的大模型 API Key 以使用 AI 功能（支持 OpenAI、DeepSeek、智谱等）'}
              </p>
            </div>
          </div>
        </div>

        {/* 说明卡片 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">为什么需要配置？</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  本系统支持接入多种主流大语言模型。配置后，AI 助手、智能评分、数据分析等功能将使用您自己的 API 密钥调用模型服务。
                  您的 API Key 仅存储在本地浏览器中，不会上传到服务器。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 提供商选择 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-slate-600" />
              选择 AI 服务商
            </CardTitle>
            <CardDescription>选择您要接入的大模型服务商</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(providerConfig).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => handleProviderChange(key)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    config.provider === key
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{info.icon}</div>
                  <div className="font-medium text-slate-800 text-sm">{info.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API 配置 */}
        <Card>
          <CardHeader>
            <CardTitle>API 配置</CardTitle>
            <CardDescription>
              配置 {currentProvider.name} 的 API 信息
              {currentProvider.name && (
                <Badge variant="outline" className="ml-2">
                  {currentProvider.name}
                </Badge>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key *</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="输入您的 API Key"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              />
              <p className="text-xs text-slate-500">您的 API Key 仅存储在本地浏览器中</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiBaseUrl">API Base URL *</Label>
              <Input
                id="apiBaseUrl"
                placeholder="https://api.openai.com/v1"
                value={config.apiBaseUrl}
                onChange={(e) => setConfig({ ...config, apiBaseUrl: e.target.value })}
              />
              <p className="text-xs text-slate-500">API 服务的 base URL 地址</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">模型名称 *</Label>
              {currentProvider.models.length > 0 ? (
                <Select value={config.model} onValueChange={(value) => setConfig({ ...config, model: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择模型" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentProvider.models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="model"
                  placeholder="输入模型名称"
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">
                Temperature: {config.temperature}
              </Label>
              <Input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.temperature}
                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>精确 (0)</span>
                <span>创意 (1)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 测试结果 */}
        {testResult && (
          <Alert variant={testResult.success ? 'default' : 'destructive'}>
            {testResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{testResult.message}</AlertDescription>
          </Alert>
        )}

        {/* 操作按钮 */}
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
            <Save className="h-4 w-4 mr-2" />
            保存配置
          </Button>
          <Button variant="outline" onClick={handleTest} disabled={testing}>
            <TestTube className="h-4 w-4 mr-2" />
            {testing ? '测试中...' : '测试连接'}
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            重置
          </Button>
        </div>

        {/* 已保存提示 */}
        {saved && (
          <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4">
            <CheckCircle className="h-5 w-5" />
            <span>配置已保存</span>
          </div>
        )}
      </div>
    </div>
  );
}
