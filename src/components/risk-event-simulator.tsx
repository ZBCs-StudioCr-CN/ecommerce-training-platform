'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  X,
  AlertCircle,
  TrendingDown,
  MessageSquareWarning,
  ShieldAlert,
  DollarSign,
  Users,
  Clock,
  Lightbulb,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// 风险事件类型
type RiskEventType = 
  | 'ad_rejection' 
  | 'logistics_price_increase' 
  | 'negative_reviews' 
  | 'infringement' 
  | 'exchange_rate' 
  | 'competitor_price_war';

interface RiskEvent {
  id: string;
  type: RiskEventType;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  scenario: string;
  consequences: string[];
  options: RiskOption[];
  happenedAt: Date;
  requiresAction: boolean;
}

interface RiskOption {
  id: string;
  title: string;
  description: string;
  cost: string;
  timeToResolve: string;
  outcome: 'positive' | 'neutral' | 'negative';
  feedback: string;
  scoreImpact: number;
}

// 风险事件配置
const riskEventConfigs: Record<RiskEventType, {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  label: string;
}> = {
  ad_rejection: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: '广告拒登',
  },
  logistics_price_increase: {
    icon: TrendingDown,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    label: '物流涨价',
  },
  negative_reviews: {
    icon: MessageSquareWarning,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: '差评爆发',
  },
  infringement: {
    icon: ShieldAlert,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    label: '侵权违规',
  },
  exchange_rate: {
    icon: DollarSign,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: '汇率波动',
  },
  competitor_price_war: {
    icon: Users,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    label: '竞品降价',
  },
};

// 模拟风险事件数据
const mockRiskEvents: RiskEvent[] = [
  {
    id: '1',
    type: 'ad_rejection',
    title: '广告账户被拒登',
    description: '您的主推产品广告被平台拒登，原因是"涉嫌虚假宣传"。',
    impact: 'high',
    scenario: '今天早上，您发现店铺流量突然下降了60%。经检查，发现主推产品的广告被平台拒登，原因是产品描述中使用了"最好"、"第一"等绝对化用语。',
    consequences: [
      '店铺流量下降60%',
      '预计日销售额损失$500',
      '广告预算浪费$200',
    ],
    options: [
      {
        id: 'a',
        title: '立即修改文案并申诉',
        description: '快速修改违规文案，提交申诉恢复广告',
        cost: '无额外成本',
        timeToResolve: '1-2个工作日',
        outcome: 'positive',
        feedback: '快速响应展现了您的专业能力。修改后广告成功恢复，流量逐步回升。',
        scoreImpact: +15,
      },
      {
        id: 'b',
        title: '重新创建新广告',
        description: '放弃旧广告，创建全新的广告计划',
        cost: '需要重新投入广告费用',
        timeToResolve: '立即生效',
        outcome: 'neutral',
        feedback: '虽然能快速恢复，但历史数据丢失，需要重新积累优化数据。',
        scoreImpact: +5,
      },
      {
        id: 'c',
        title: '等待平台自动恢复',
        description: '不做任何处理，等待平台审核通过',
        cost: '持续损失销售额',
        timeToResolve: '不确定',
        outcome: 'negative',
        feedback: '被动等待导致损失扩大，错失市场机会。作为运营者，应主动解决问题。',
        scoreImpact: -20,
      },
    ],
    happenedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    requiresAction: true,
  },
  {
    id: '2',
    type: 'negative_reviews',
    title: '产品差评爆发',
    description: '最近一周收到20条差评，评分从4.8降至3.5。',
    impact: 'high',
    scenario: '最近一周，您的主打产品收到了20条差评，主要集中在"产品质量问题"和"物流太慢"。产品评分从4.8骤降至3.5，转化率下降了40%。',
    consequences: [
      '产品评分下降1.3分',
      '转化率下降40%',
      '可能被平台降权',
    ],
    options: [
      {
        id: 'a',
        title: '主动联系差评客户',
        description: '联系每位差评客户，了解问题并提供解决方案',
        cost: '需要投入客服时间',
        timeToResolve: '3-5天',
        outcome: 'positive',
        feedback: '主动沟通展现了负责任的态度。部分客户修改了评价，评分逐步恢复。',
        scoreImpact: +20,
      },
      {
        id: 'b',
        title: '优化产品和服务',
        description: '分析差评原因，改进产品质量和物流',
        cost: '可能需要更换供应商',
        timeToResolve: '1-2周',
        outcome: 'positive',
        feedback: '从根本上解决问题，长期来看是最正确的选择。但短期内影响仍会持续。',
        scoreImpact: +10,
      },
      {
        id: 'c',
        title: '刷好评稀释差评',
        description: '通过刷单方式增加好评',
        cost: '需要额外费用',
        timeToResolve: '立即',
        outcome: 'negative',
        feedback: '⚠️ 这是一个违规操作！平台检测到后会对店铺进行处罚，甚至封店。诚信经营是电商的根本。',
        scoreImpact: -50,
      },
    ],
    happenedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    requiresAction: true,
  },
  {
    id: '3',
    type: 'competitor_price_war',
    title: '竞品低价突袭',
    description: '主要竞争对手将同类产品降价30%，正在抢夺您的客户。',
    impact: 'medium',
    scenario: '您的热销产品正在面临激烈的竞争。主要竞争对手突然将价格从$29.99降至$19.99，降幅达30%。您的订单量下降了50%，客户流失严重。',
    consequences: [
      '订单量下降50%',
      '客户流失',
      '库存积压风险',
    ],
    options: [
      {
        id: 'a',
        title: '差异化竞争',
        description: '不降价，强化产品独特价值和服务',
        cost: '需要营销投入',
        timeToResolve: '持续进行',
        outcome: 'positive',
        feedback: '差异化竞争是正确的长期策略。通过强调品质和服务，维护了品牌价值。',
        scoreImpact: +15,
      },
      {
        id: 'b',
        title: '适度降价应对',
        description: '降价15%，保持利润空间',
        cost: '利润减少',
        timeToResolve: '立即生效',
        outcome: 'neutral',
        feedback: '降价保住了部分市场份额，但利润空间被压缩。需要思考如何提升产品竞争力。',
        scoreImpact: +5,
      },
      {
        id: 'c',
        title: '价格战到底',
        description: '比竞争对手更低的价格',
        cost: '可能亏损',
        timeToResolve: '不确定',
        outcome: 'negative',
        feedback: '价格战没有赢家。虽然保住了销量，但利润微薄甚至亏损，不可持续。',
        scoreImpact: -10,
      },
    ],
    happenedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    requiresAction: true,
  },
];

interface RiskEventSimulatorProps {
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: (eventId: string, optionId: string, score: number) => void;
}

export function RiskEventSimulator({ isOpen = false, onClose, onComplete }: RiskEventSimulatorProps) {
  const [open, setOpen] = useState(isOpen);
  const [currentEvent, setCurrentEvent] = useState<RiskEvent | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [handledEvents, setHandledEvents] = useState<Set<string>>(new Set());

  const handleOpenEvent = (event: RiskEvent) => {
    setCurrentEvent(event);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!currentEvent || !selectedOption) return;
    setShowResult(true);
    setHandledEvents((prev) => new Set([...prev, currentEvent.id]));
    
    const option = currentEvent.options.find((o) => o.id === selectedOption);
    if (option) {
      onComplete?.(currentEvent.id, selectedOption, option.scoreImpact);
    }
  };

  const handleClose = () => {
    setCurrentEvent(null);
    setShowResult(false);
    setOpen(false);
    onClose?.();
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const pendingEvents = mockRiskEvents.filter((e) => !handledEvents.has(e.id));

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/30 z-50"
      >
        <AlertTriangle className="h-5 w-5" />
        风险事件
        {pendingEvents.length > 0 && (
          <Badge className="ml-1 bg-white text-red-600">{pendingEvents.length}</Badge>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">风险事件模拟</h3>
              <p className="text-orange-100 text-sm">真实市场不确定性模拟，锻炼您的应对能力</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-white/80 hover:text-white hover:bg-white/10"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Event List */}
          {!currentEvent && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold text-slate-800">待处理的风险事件</h4>
                <Badge className="bg-orange-100 text-orange-700">
                  {pendingEvents.length} 个待处理
                </Badge>
              </div>

              {pendingEvents.map((event) => {
                const config = riskEventConfigs[event.type];
                return (
                  <Card
                    key={event.id}
                    className="cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-orange-500"
                    onClick={() => handleOpenEvent(event)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center shrink-0`}>
                          <config.icon className={`h-6 w-6 ${config.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-semibold text-slate-800">{event.title}</h5>
                            <Badge className={getImpactColor(event.impact)}>
                              {event.impact === 'high' ? '高影响' : event.impact === 'medium' ? '中影响' : '低影响'}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              发生于 {event.happenedAt.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {event.consequences.length} 个影响
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {pendingEvents.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-slate-800 mb-2">所有风险事件已处理</h4>
                  <p className="text-slate-500">您已成功应对所有风险事件，继续加油！</p>
                </div>
              )}
            </div>
          )}

          {/* Event Detail */}
          {currentEvent && !showResult && (
            <div className="space-y-6">
              {/* Event Info */}
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    {(() => {
                      const config = riskEventConfigs[currentEvent.type];
                      return (
                        <div className={`w-14 h-14 rounded-xl ${config.bgColor} flex items-center justify-center shrink-0`}>
                          <config.icon className={`h-7 w-7 ${config.color}`} />
                        </div>
                      );
                    })()}
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-1">{currentEvent.title}</h4>
                      <p className="text-slate-600">{currentEvent.description}</p>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 mb-4">
                    <h5 className="font-medium text-slate-800 mb-2">📋 场景描述</h5>
                    <p className="text-slate-600 text-sm">{currentEvent.scenario}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">⚠️ 后果影响</h5>
                    <ul className="space-y-1">
                      {currentEvent.consequences.map((consequence, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          {consequence}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Decision Options */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  请选择您的应对方案
                </h4>
                <div className="space-y-3">
                  {currentEvent.options.map((option) => (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all ${
                        selectedOption === option.id
                          ? 'border-2 border-purple-500 bg-purple-50'
                          : 'border border-slate-200 hover:border-purple-300'
                      }`}
                      onClick={() => handleSelectOption(option.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                              selectedOption === option.id
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-slate-300'
                            }`}
                          >
                            {selectedOption === option.id && (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-slate-800">{option.title}</h5>
                            <p className="text-sm text-slate-600 mt-1">{option.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <span>💰 {option.cost}</span>
                              <span>⏱️ {option.timeToResolve}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Result */}
          {currentEvent && showResult && selectedOption && (
            <div className="space-y-6">
              {(() => {
                const option = currentEvent.options.find((o) => o.id === selectedOption)!;
                const isSuccess = option.outcome === 'positive';
                const isNeutral = option.outcome === 'neutral';

                return (
                  <>
                    <Card className={`border-l-4 ${isSuccess ? 'border-l-green-500' : isNeutral ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              isSuccess
                                ? 'bg-green-100'
                                : isNeutral
                                ? 'bg-yellow-100'
                                : 'bg-red-100'
                            }`}
                          >
                            <CheckCircle2
                              className={`h-6 w-6 ${
                                isSuccess
                                  ? 'text-green-600'
                                  : isNeutral
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">
                              {isSuccess ? '决策正确！' : isNeutral ? '决策可行' : '决策有待改进'}
                            </h4>
                            <p className="text-sm text-slate-600">您选择了：{option.title}</p>
                          </div>
                        </div>

                        <div className={`p-4 rounded-xl mb-4 ${
                          isSuccess
                            ? 'bg-green-50'
                            : isNeutral
                            ? 'bg-yellow-50'
                            : 'bg-red-50'
                        }`}>
                          <h5 className="font-medium text-slate-800 mb-2">📝 反馈</h5>
                          <p className="text-slate-600 text-sm whitespace-pre-line">{option.feedback}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">能力评分影响：</span>
                            <Badge
                              className={
                                option.scoreImpact > 0
                                  ? 'bg-green-100 text-green-700'
                                  : option.scoreImpact < 0
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-slate-100 text-slate-700'
                              }
                            >
                              {option.scoreImpact > 0 ? '+' : ''}{option.scoreImpact} 分
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-500">
                            风险应对能力 {option.scoreImpact > 0 ? '提升' : option.scoreImpact < 0 ? '下降' : '不变'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Learning Points */}
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <h5 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          学习要点
                        </h5>
                        <ul className="space-y-1 text-sm text-purple-700">
                          <li>• 风险事件是真实市场的一部分，学会应对是核心能力</li>
                          <li>• 快速响应和正确决策能将损失降到最低</li>
                          <li>• 合规经营是电商运营的底线</li>
                          <li>• AI可以提供建议，但最终决策由您负责</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setCurrentEvent(null);
                    setShowResult(false);
                    setSelectedOption(null);
                  }}
                >
                  继续处理其他事件
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  onClick={handleClose}
                >
                  关闭
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {currentEvent && !showResult && (
          <div className="border-t border-slate-200 p-4 bg-slate-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                请仔细思考后做出决策，您的选择将影响能力评分
              </p>
              <Button
                disabled={!selectedOption}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50"
                onClick={handleSubmit}
              >
                确认决策
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 导出简化的风险事件按钮组件
export function RiskEventButton() {
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowSimulator(true)}
        className="fixed bottom-6 left-6 gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/30 z-50"
      >
        <AlertTriangle className="h-5 w-5" />
        风险事件
      </Button>
      {showSimulator && <RiskEventSimulator isOpen={showSimulator} onClose={() => setShowSimulator(false)} />}
    </>
  );
}
