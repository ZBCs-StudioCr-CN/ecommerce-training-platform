'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Brain,
  X,
  Send,
  Sparkles,
  Target,
  BarChart3,
  MessageSquare,
  LineChart,
  AlertCircle,
  Lightbulb,
  ChevronDown,
  Copy,
  Check,
  RotateCcw,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// AI能力类型
type AICapability = 'market_analysis' | 'product_suggestion' | 'copywriting' | 'ad_strategy' | 'data_diagnosis' | 'customer_service';

interface AICapabilityConfig {
  id: AICapability;
  name: string;
  description: string;
  icon: React.ElementType;
  placeholder: string;
  examplePrompts: string[];
}

const aiCapabilities: AICapabilityConfig[] = [
  {
    id: 'market_analysis',
    name: '市场分析',
    description: '输出趋势、需求、竞争度分析',
    icon: LineChart,
    placeholder: '请描述你想分析的市场或品类...',
    examplePrompts: [
      '分析北美市场宠物用品趋势',
      '分析东南亚美妆市场竞争格局',
      '分析国内咖啡市场规模和增长趋势',
    ],
  },
  {
    id: 'product_suggestion',
    name: '选品建议',
    description: '提供推荐清单及理由',
    icon: Target,
    placeholder: '请描述你的目标市场和预算...',
    examplePrompts: [
      '推荐适合新手卖家的跨境电商选品',
      '预算5000元，适合抖音带货的产品',
      '高利润率的亚马逊FBA选品建议',
    ],
  },
  {
    id: 'copywriting',
    name: '文案生成',
    description: '标题、详情页、广告文案创作',
    icon: MessageSquare,
    placeholder: '请描述产品信息和文案需求...',
    examplePrompts: [
      '为一款智能水杯写产品标题',
      '生成瑜伽服产品详情页文案',
      '写一个吸引人的广告投放文案',
    ],
  },
  {
    id: 'ad_strategy',
    name: '投放建议',
    description: '渠道、人群、预算推荐',
    icon: BarChart3,
    placeholder: '请描述你的推广需求和预算...',
    examplePrompts: [
      '预算1万元，如何投放Facebook广告',
      '新品牌如何做抖音推广',
      'Google Ads投放策略建议',
    ],
  },
  {
    id: 'data_diagnosis',
    name: '数据诊断',
    description: '指出异常并分析原因',
    icon: AlertCircle,
    placeholder: '请描述你的数据情况...',
    examplePrompts: [
      '店铺流量高但转化率低怎么办',
      '广告ROI突然下降原因分析',
      '如何降低店铺退货率',
    ],
  },
  {
    id: 'customer_service',
    name: '客服话术',
    description: '提供标准回复参考',
    icon: MessageSquare,
    placeholder: '请描述客户问题场景...',
    examplePrompts: [
      '客户投诉物流太慢如何回复',
      '客户要求退款怎么处理',
      '如何应对客户差评',
    ],
  },
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  capability?: AICapability;
  isAdvice?: boolean; // 标记这是建议而非决策
}

interface AIAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialCapability?: AICapability;
}

export function AIAssistant({ isOpen = false, onClose, initialCapability }: AIAssistantProps) {
  const [open, setOpen] = useState(isOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedCapability, setSelectedCapability] = useState<AICapability | null>(initialCapability || null);
  const [showCapabilities, setShowCapabilities] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getCurrentCapability = (): AICapabilityConfig | undefined => {
    return aiCapabilities.find((c) => c.id === selectedCapability);
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedCapability) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      capability: selectedCapability,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowCapabilities(false);

    // 模拟AI响应（实际项目中应该调用后端API）
    setTimeout(() => {
      const capability = getCurrentCapability();
      const aiResponses: Record<AICapability, string[]> = {
        market_analysis: [
          '## 📊 市场分析报告\n\n### 市场规模\n根据分析，该市场2024年规模约**$12.5B**，年增长率**15.2%**。\n\n### 竞争格局\n- 头部品牌占据35%市场份额\n- 中小卖家竞争激烈\n- 新兴品牌增长迅速\n\n### 趋势洞察\n1. 消费者偏好智能化产品\n2. 环保材料需求上升\n3. 个性化定制趋势明显\n\n---\n⚠️ **温馨提示**：以上是AI提供的参考分析，请结合实际情况做最终决策。',
        ],
        product_suggestion: [
          '## 🎯 选品建议\n\n### 推荐产品清单\n\n1. **智能水杯** - 利润率40%，复购率高\n2. **便携式榨汁机** - 季节性强，夏季热销\n3. **瑜伽垫** - 市场稳定，竞争适中\n\n### 推荐理由\n- 符合目标市场需求趋势\n- 供应链成熟，起订量低\n- 利润空间合理\n\n### 风险提示\n- 部分产品有季节性波动\n- 注意产品质量把控\n\n---\n⚠️ **温馨提示**：以上是AI提供的参考建议，请根据自身资源和市场判断做最终选择。',
        ],
        copywriting: [
          '## ✍️ 文案建议\n\n### 产品标题（3个版本）\n\n**版本A（功能导向）**\n[品牌名]智能保温杯 | 12小时长效保温 | LED温度显示 | 304不锈钢内胆\n\n**版本B（场景导向）**\n办公必备神器！智能保温杯，让每一口水都是刚刚好的温度\n\n**版本C（价值导向）**\n告别烫嘴烦恼！这款智能保温杯，让你随时随地享受完美温度\n\n### 详情页文案框架\n1. 痛点引入（烫嘴/变凉）\n2. 产品解决方案\n3. 使用场景展示\n4. 用户评价背书\n5. 购买引导\n\n---\n⚠️ **温馨提示**：以上是AI生成的文案参考，请根据品牌调性进行修改优化。',
        ],
        ad_strategy: [
          '## 📢 投放策略建议\n\n### 渠道推荐\n- **首选**：Facebook/Instagram（覆盖广）\n- **补充**：Google Shopping（精准搜索）\n- **测试**：TikTok（年轻用户）\n\n### 预算分配建议\n| 渠道 | 预算占比 | 日预算 |\n|------|---------|--------|\n| Facebook | 60% | $60 |\n| Google | 30% | $30 |\n| TikTok | 10% | $10 |\n\n### 人群定向\n- 年龄：25-45岁\n- 兴趣：健身、健康生活、居家办公\n- 行为：线上购物频繁\n\n### 创意建议\n1. 短视频展示产品使用场景\n2. 前后对比图\n3. 用户真实评价\n\n---\n⚠️ **温馨提示**：以上是AI提供的投放建议，请根据实际数据反馈调整优化。',
        ],
        data_diagnosis: [
          '## 🔍 数据诊断报告\n\n### 问题识别\n当前转化率**1.2%**，低于行业平均**2.5%**。\n\n### 可能原因分析\n1. **流量质量问题**\n   - 广告定向不够精准\n   - 关键词匹配度低\n\n2. **页面体验问题**\n   - 首页加载速度慢（建议优化到3秒内）\n   - 移动端适配不完善\n\n3. **产品展示问题**\n   - 图片不够吸引人\n   - 描述缺少卖点\n\n### 优化建议\n- ✅ 优化广告人群定向\n- ✅ 提升页面加载速度\n- ✅ 优化产品主图和详情\n- ✅ 增加用户评价展示\n\n---\n⚠️ **温馨提示**：以上是AI的分析建议，请结合实际业务情况判断并实施优化。',
        ],
        customer_service: [
          '## 💬 客服话术参考\n\n### 场景：客户投诉物流太慢\n\n**话术模板：**\n\n**开头（共情）**\n"您好，非常抱歉给您带来不好的体验，我完全理解您的心情。"\n\n**解释（透明）**\n"您订单的物流信息显示正在[具体位置]，目前受到[具体原因]影响，预计还需要[X]天送达。"\n\n**补偿（诚意）**\n"为了表达我们的歉意，我为您准备了以下方案：\n1. 退还运费\n2. 赠送优惠券（满减/折扣）\n3. 赠送小礼品\n\n您可以选择其中一项，请告诉我您的选择。"\n\n**结尾（承诺）**\n"我们会持续关注您的物流状态，有任何问题随时联系我们。再次为给您带来的不便道歉。"\n\n---\n⚠️ **温馨提示**：以上是AI提供的参考话术，请根据具体情况灵活调整语气和补偿方案。',
        ],
      };

      const responseContent = aiResponses[selectedCapability]?.[0] || 'AI正在分析中...';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        capability: selectedCapability,
        isAdvice: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
    setSelectedCapability(null);
    setShowCapabilities(true);
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg shadow-purple-500/30 z-50"
        size="icon"
      >
        <Brain className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI决策助手</h3>
            <p className="text-xs text-purple-100">AI提供选项，您做决策</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
            onClick={handleClear}
            title="清空对话"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => {
              setOpen(false);
              onClose?.();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Capability Selector */}
      {showCapabilities && messages.length === 0 && (
        <div className="p-4 border-b border-purple-100 bg-purple-50/50">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">选择AI能力</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {aiCapabilities.map((capability) => (
              <button
                key={capability.id}
                onClick={() => {
                  setSelectedCapability(capability.id);
                  inputRef.current?.focus();
                }}
                className={`p-3 rounded-xl text-left transition-all ${
                  selectedCapability === capability.id
                    ? 'bg-purple-100 border-2 border-purple-500'
                    : 'bg-white border border-purple-100 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <capability.icon className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-slate-700">{capability.name}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{capability.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && selectedCapability && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
              {(() => {
                const Icon = getCurrentCapability()?.icon || Sparkles;
                return <Icon className="h-8 w-8 text-purple-600" />;
              })()}
            </div>
            <h4 className="font-medium text-slate-700 mb-2">{getCurrentCapability()?.name}</h4>
            <p className="text-sm text-slate-500 mb-4">{getCurrentCapability()?.placeholder}</p>
            <div className="space-y-2">
              <p className="text-xs text-slate-400">试试这些示例：</p>
              {getCurrentCapability()?.examplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleExampleClick(prompt)}
                  className="block w-full text-left p-2 rounded-lg bg-white border border-purple-100 text-sm text-slate-600 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 ${
                message.role === 'user'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white border border-purple-100 shadow-sm'
              }`}
            >
              {message.role === 'assistant' && message.isAdvice && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-purple-100">
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI建议
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-purple-600"
                    onClick={() => handleCopy(message.content, message.id)}
                  >
                    {copiedId === message.id ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              )}
              <div
                className={`text-sm whitespace-pre-wrap ${
                  message.role === 'user' ? 'text-white' : 'text-slate-700'
                }`}
              >
                {message.content}
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-purple-200' : 'text-slate-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-slate-500">AI正在分析...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-purple-100 bg-white">
        {/* 温馨提示 */}
        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200">
          <Info className="h-4 w-4 text-amber-600 shrink-0" />
          <p className="text-xs text-amber-700">
            AI提供建议，但最终决策权在您手中。请结合实际情况判断。
          </p>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={
                selectedCapability
                  ? getCurrentCapability()?.placeholder
                  : '请先选择AI能力...'
              }
              disabled={!selectedCapability}
              className="w-full p-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
              rows={2}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || !selectedCapability || isTyping}
            className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50"
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// 导出简化的AI助手按钮组件
export function AIAssistantButton() {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg shadow-purple-500/30 z-50"
        size="icon"
      >
        <Brain className="h-6 w-6 text-white" />
      </Button>
      {showAssistant && <AIAssistant isOpen={showAssistant} onClose={() => setShowAssistant(false)} />}
    </>
  );
}
