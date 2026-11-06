'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain,
  TrendingUp,
  Package,
  Store,
  Target,
  Settings,
  MessageSquare,
  Users,
  BarChart3,
  AlertTriangle,
  Send,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Lightbulb,
  CheckCircle,
  Clock,
  Zap,
  BookOpen,
  ArrowLeft,
  Mic,
  Paperclip,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Volume2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentSidebar, StudentHeader } from '@/components/student-layout';
import { chatWithAI, parseSSEStream } from '@/lib/ai-service';

// AI助手功能模块配置
const aiModules = [
  {
    id: 'market-analysis',
    title: '市场分析',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    description: '行业趋势、竞品分析、市场机会洞察',
    prompts: [
      '分析当前跨境电商市场的热门品类和趋势',
      '帮我分析竞品店铺的运营策略',
      '预测下一季度的消费趋势',
      '分析目标市场的消费者画像',
    ],
    capabilities: ['行业报告', '趋势预测', '竞品分析', '机会识别'],
  },
  {
    id: 'product-selection',
    title: '选品建议',
    icon: Package,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    description: '爆款挖掘、利润分析、供应链评估',
    prompts: [
      '推荐适合夏季销售的爆款产品',
      '分析这款产品的利润空间和竞争强度',
      '帮我评估这个供应商的可靠性',
      '预测这个品类的生命周期',
    ],
    capabilities: ['爆款挖掘', '利润计算', '风险评估', '供应链分析'],
  },
  {
    id: 'store-setup',
    title: '智能店铺搭建',
    icon: Store,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    description: '店铺装修、页面优化、转化率提升',
    prompts: [
      '帮我设计一个高转化率的产品详情页',
      '优化我的店铺首页布局',
      '建议适合我品牌风格的店铺主题',
      '分析我的店铺用户体验问题',
    ],
    capabilities: ['页面设计', 'UX优化', '主题定制', 'A/B测试'],
  },
  {
    id: 'advertising',
    title: '投放建议',
    icon: Target,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600',
    description: '广告策略、预算分配、ROI优化',
    prompts: [
      '制定一个合理的广告投放策略',
      '如何优化我的广告ROI？',
      '建议最佳的广告预算分配方案',
      '分析我的广告投放数据并给出改进建议',
    ],
    capabilities: ['策略制定', '预算规划', 'ROI分析', '效果追踪'],
  },
  {
    id: 'operations',
    title: '运营策略',
    icon: Settings,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-600',
    description: '日常运营、活动策划、增长策略',
    prompts: [
      '制定一份618大促的运营计划',
      '如何提升店铺的复购率？',
      '设计一个会员积分体系',
      '优化我的客服响应流程',
    ],
    capabilities: ['活动策划', '用户增长', '复购提升', '流程优化'],
  },
  {
    id: 'marketing-copy',
    title: '营销话术',
    icon: MessageSquare,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-600',
    description: '文案撰写、话术优化、内容创意',
    prompts: [
      '帮我写一个吸引人的产品标题',
      '优化我的产品描述文案',
      '设计一套客服销售话术',
      '写一个短视频带货脚本',
    ],
    capabilities: ['文案创作', '标题优化', '话术设计', '内容策划'],
  },
  {
    id: 'customer-service',
    title: '客户服务',
    icon: Users,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-600',
    description: '客服培训、投诉处理、满意度提升',
    prompts: [
      '如何处理客户的退款投诉？',
      '设计一套客服培训手册',
      '提升客户满意度的方法',
      '处理差评和负面反馈的策略',
    ],
    capabilities: ['投诉处理', '培训指导', '满意度提升', '危机化解'],
  },
  {
    id: 'data-review',
    title: '数据复盘',
    icon: BarChart3,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    description: '数据分析、问题诊断、优化建议',
    prompts: [
      '分析我店铺上个月的数据表现',
      '诊断流量下滑的原因',
      '帮我做一份季度运营复盘报告',
      '找出影响转化的关键因素',
    ],
    capabilities: ['数据分析', '问题诊断', '趋势洞察', '优化建议'],
  },
  {
    id: 'crisis-handling',
    title: '危机处理',
    icon: AlertTriangle,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    description: '风险预警、危机应对、舆情管理',
    prompts: [
      '如何应对差评风暴？',
      '处理产品质量投诉的最佳方案',
      '应对平台政策变化的策略',
      '管理店铺负面舆情的方案',
    ],
    capabilities: ['风险预警', '危机应对', '舆情管理', '恢复策略'],
  },
];

// 对话消息类型
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'like' | 'dislike';
}

// 使用记录类型
interface UsageRecord {
  id: string;
  module: string;
  query: string;
  timestamp: Date;
}

export default function AIAssistantPage() {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [generalMessages, setGeneralMessages] = useState<Message[]>([]); // 通用对话消息
  const [inputValue, setInputValue] = useState('');
  const [generalInputValue, setGeneralInputValue] = useState(''); // 通用对话输入
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneralLoading, setIsGeneralLoading] = useState(false); // 通用对话加载状态
  const [usageHistory, setUsageHistory] = useState<UsageRecord[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const generalMessagesEndRef = useRef<HTMLDivElement>(null); // 通用对话滚动ref
  const inputRef = useRef<HTMLInputElement>(null);
  const generalInputRef = useRef<HTMLInputElement>(null); // 通用对话输入ref

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGeneralBottom = () => {
    generalMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToGeneralBottom();
  }, [generalMessages]);

  // 获取当前模块配置
  const currentModule = aiModules.find(m => m.id === activeModule);

  // 发送消息
  const sendMessage = async (content: string) => {
    if (!content.trim() || !activeModule) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 前端直接调用 AI（流式）
      const llmHistory = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const stream = await chatWithAI(content.trim(), activeModule, llmHistory);

      let assistantContent = '';
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      await new Promise<void>((resolve, reject) => {
        parseSSEStream(
          stream,
          (chunk) => {
            assistantContent += chunk;
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantMessage.id
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          },
          () => resolve(),
          (err) => reject(err)
        );
      });

      // 记录使用历史
      setUsageHistory(prev => [
        {
          id: Date.now().toString(),
          module: activeModule,
          query: content.trim(),
          timestamp: new Date(),
        },
        ...prev.slice(0, 19), // 只保留最近20条
      ]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '抱歉，AI助手暂时无法响应，请稍后再试。',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 快捷提问
  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  // 反馈
  const handleFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    setMessages(prev =>
      prev.map(m =>
        m.id === messageId ? { ...m, feedback } : m
      )
    );
  };

  // 复制内容
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  // 通用对话发送消息
  const sendGeneralMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setGeneralMessages(prev => [...prev, userMessage]);
    setGeneralInputValue('');
    setIsGeneralLoading(true);

    try {
      // 前端直接调用 AI（流式，general 模块）
      const llmHistory = generalMessages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      const stream = await chatWithAI(content.trim(), 'general', llmHistory);

      let assistantContent = '';
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setGeneralMessages(prev => [...prev, assistantMessage]);

      await new Promise<void>((resolve, reject) => {
        parseSSEStream(
          stream,
          (chunk) => {
            assistantContent += chunk;
            setGeneralMessages(prev =>
              prev.map(m =>
                m.id === assistantMessage.id
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          },
          () => resolve(),
          (err) => reject(err)
        );
      });

      // 记录使用历史
      setUsageHistory(prev => [
        {
          id: Date.now().toString(),
          module: 'general',
          query: content.trim(),
          timestamp: new Date(),
        },
        ...prev.slice(0, 19),
      ]);
    } catch (error) {
      console.error('General AI Assistant error:', error);
      setGeneralMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '抱歉，AI助手暂时无法响应，请稍后再试。',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsGeneralLoading(false);
    }
  };

  // 通用对话反馈
  const handleGeneralFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    setGeneralMessages(prev =>
      prev.map(m =>
        m.id === messageId ? { ...m, feedback } : m
      )
    );
  };

  // 渲染模块选择界面
  const renderModuleSelection = () => (
    <div className="p-6">
      {/* 头部 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">AI智能助手</h1>
            <p className="text-sm text-slate-500">您的电商运营决策伙伴</p>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{usageHistory.length}</p>
                  <p className="text-xs text-slate-500">今日对话</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">9</p>
                  <p className="text-xs text-slate-500">功能模块</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">24/7</p>
                  <p className="text-xs text-slate-500">全天候服务</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 功能模块网格 */}
      <div className="grid grid-cols-3 gap-4">
        {aiModules.map((module) => (
          <Card
            key={module.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${module.bgColor} ${module.borderColor} border-2`}
            onClick={() => {
              setActiveModule(module.id);
              setMessages([]);
            }}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 mb-1">{module.title}</h3>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{module.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {module.capabilities.slice(0, 2).map((cap) => (
                      <Badge key={cap} variant="secondary" className="text-xs bg-white/80">
                        {cap}
                      </Badge>
                    ))}
                    {module.capabilities.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-white/80">
                        +{module.capabilities.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 使用提示 */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-slate-700 mb-1">AI辅助使用提示</h4>
            <p className="text-sm text-slate-600">
              AI助手会提供建议和选项，但最终决策权在您手中。请结合实际情况判断建议的可行性，
              这有助于培养您的自主决策能力。每次AI调用都会被记录，用于评估您的AI辅助应用能力。
            </p>
          </div>
        </div>
      </div>

      {/* 通用对话区域 */}
      <div className="mt-8">
        <Card className="border-2 border-purple-100 bg-white shadow-lg">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">自由问答</CardTitle>
                  <CardDescription>直接向AI助手提问，获取电商运营建议</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="bg-purple-50 text-purple-600 border-purple-200">
                对话: {generalMessages.filter(m => m.role === 'assistant').length}次
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* 消息列表 */}
            <div className="h-80 overflow-y-auto p-4 bg-slate-50/50">
              {generalMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                  <p className="text-slate-600 font-medium mb-2">开始与AI助手对话</p>
                  <p className="text-sm text-slate-400 max-w-md">
                    您可以问任何关于电商运营的问题，AI助手会为您提供专业建议
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {[
                      '如何提升店铺转化率？',
                      '新品上架如何推广？',
                      '怎么优化产品标题？',
                    ].map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => sendGeneralMessage(prompt)}
                        className="text-xs bg-white hover:bg-purple-50 hover:border-purple-200"
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {generalMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white border border-slate-200 shadow-sm'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div
                          className={`text-xs mt-2 ${
                            message.role === 'user' ? 'text-white/70' : 'text-slate-400'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('zh-CN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(message.content)}
                              className="h-6 px-2 text-xs text-slate-500 hover:text-slate-700"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              复制
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGeneralFeedback(message.id, 'like')}
                              className={`h-6 px-2 ${
                                message.feedback === 'like'
                                  ? 'text-emerald-600 bg-emerald-50'
                                  : 'text-slate-500 hover:text-emerald-600'
                              }`}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGeneralFeedback(message.id, 'dislike')}
                              className={`h-6 px-2 ${
                                message.feedback === 'dislike'
                                  ? 'text-red-600 bg-red-50'
                                  : 'text-slate-500 hover:text-red-600'
                              }`}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isGeneralLoading && generalMessages[generalMessages.length - 1]?.role !== 'assistant' && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin text-purple-500" />
                          <span className="text-sm text-slate-500">AI正在思考...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={generalMessagesEndRef} />
                </div>
              )}
            </div>
            {/* 输入区域 */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendGeneralMessage(generalInputValue);
                }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 relative">
                  <Input
                    ref={generalInputRef}
                    value={generalInputValue}
                    onChange={(e) => setGeneralInputValue(e.target.value)}
                    placeholder="输入您的电商运营问题..."
                    className="h-11 rounded-xl border-slate-200 focus:border-purple-300 focus:ring-purple-200"
                    disabled={isGeneralLoading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!generalInputValue.trim() || isGeneralLoading}
                  className="h-11 px-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <Send className="h-4 w-4 mr-1" />
                  发送
                </Button>
              </form>
              <p className="text-xs text-center text-slate-400 mt-2">
                AI建议仅供参考，请结合实际情况做出最终决策
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // 渲染对话界面
  const renderChatInterface = () => {
    if (!currentModule) return null;

    return (
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* 对话头部 */}
        <div className={`bg-gradient-to-r ${currentModule.color} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveModule(null)}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回
              </Button>
              <div className="h-6 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <currentModule.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold">{currentModule.title}</h2>
                  <p className="text-xs text-white/80">{currentModule.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                AI调用: {messages.filter(m => m.role === 'assistant').length}次
              </Badge>
            </div>
          </div>
        </div>

        {/* 快捷问题 */}
        {messages.length === 0 && (
          <div className="p-4 bg-slate-50 border-b">
            <p className="text-sm text-slate-500 mb-3">
              <Sparkles className="h-4 w-4 inline mr-1" />
              您可以尝试以下问题：
            </p>
            <div className="flex flex-wrap gap-2">
              {currentModule.prompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-sm bg-white hover:bg-slate-100"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 消息列表 */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white border border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-white/70' : 'text-slate-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>

                  {/* AI消息操作按钮 */}
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(message.content)}
                        className="h-7 px-2 text-slate-500 hover:text-slate-700"
                      >
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        复制
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(message.id, 'like')}
                        className={`h-7 px-2 ${
                          message.feedback === 'like'
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-slate-500 hover:text-emerald-600'
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(message.id, 'dislike')}
                        className={`h-7 px-2 ${
                          message.feedback === 'dislike'
                            ? 'text-red-600 bg-red-50'
                            : 'text-slate-500 hover:text-red-600'
                        }`}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* 加载中指示器 */}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-purple-500" />
                    <span className="text-sm text-slate-500">AI正在思考...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* 输入区域 */}
        <div className="p-4 border-t bg-white">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputValue);
              }}
              className="flex items-center gap-3"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-slate-600"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`输入您的${currentModule.title}问题...`}
                  className="pr-12 h-12 rounded-xl border-slate-200 focus:border-purple-300 focus:ring-purple-200"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
              <Button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`h-12 px-6 rounded-xl bg-gradient-to-r ${currentModule.color} text-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-center text-slate-400 mt-2">
              AI建议仅供参考，请结合实际情况做出最终决策
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/50">
      <StudentHeader />
      <StudentSidebar activeMenu="ai-assistant" />

      <main className="ml-60 pt-16 min-h-screen">
        {activeModule ? renderChatInterface() : renderModuleSelection()}
      </main>
    </div>
  );
}
