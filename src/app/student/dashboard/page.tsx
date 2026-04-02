'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  ChevronRight,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  Trophy,
  TrendingUp,
  BarChart3,
  Users,
  DollarSign,
  Play,
  Lock,
  Star,
  Gift,
  Brain,
  AlertTriangle,
  LineChart,
  ShoppingCart,
  ShoppingBag,
  Sparkles,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StudentLayout } from '@/components/student-layout';
import { AIAssistantButton } from '@/components/ai-assistant';
import { RiskEventButton } from '@/components/risk-event-simulator';
import { PRACTICE_STAGES, type PracticeStage, type StageConfig } from '@/data/ability-practice';

// 阶段图标映射
const stageIcons: Record<string, React.ElementType> = {
  market_research: Target,
  store_setup: Store,
  product_listing: BarChart3,
  logistics_config: DollarSign,
  marketing_promotion: TrendingUp,
  risk_management: AlertTriangle,
  data_analysis: BarChart3,
  compliance_training: Shield,
  final_assessment: Trophy,
};

// 五维能力雷达图数据（方案二：考试评估维度，实训评估具体能力）
const abilityRadar = {
  dimensions: [
    { 
      id: 'decision',
      name: '自主决策能力', 
      examScore: 82,
      practiceScore: 78,
      value: 80, // 考试50% + 实训50%
      weight: 35, 
      color: '#3b82f6' 
    },
    { 
      id: 'ai',
      name: 'AI辅助应用', 
      examScore: 75,
      practiceScore: 72,
      value: 74,
      weight: 20, 
      color: '#8b5cf6' 
    },
    { 
      id: 'analysis',
      name: '数据复盘与优化', 
      examScore: 85,
      practiceScore: 82,
      value: 84,
      weight: 20, 
      color: '#22c55e' 
    },
    { 
      id: 'risk',
      name: '风险应对', 
      examScore: 78,
      practiceScore: 75,
      value: 77,
      weight: 15, 
      color: '#f59e0b' 
    },
    { 
      id: 'compliance',
      name: '合规与规则意识', 
      examScore: 88,
      practiceScore: 84,
      value: 86,
      weight: 10, 
      color: '#ef4444' 
    },
  ],
  overall: 80,
};

// 模拟实训进度数据
const mockProgress = {
  stages: {
    market_research: { started: true, completed: true, score: 85, startedAt: '2024-01-15', completedAt: '2024-01-18' },
    store_setup: { started: true, completed: true, score: 92, startedAt: '2024-01-19', completedAt: '2024-01-25' },
    product_listing: { started: true, completed: false, score: 70, startedAt: '2024-01-26' },
    logistics_config: { started: false, completed: false },
    marketing_promotion: { started: false, completed: false },
    risk_management: { started: false, completed: false },
    data_analysis: { started: false, completed: false },
    compliance_training: { started: false, completed: false },
    final_assessment: { started: false, completed: false },
  },
  overallProgress: 28,
  experience: 450,
  level: 3,
  achievements: ['market_analyst', 'store_builder', 'first_product'],
  totalTimeSpent: 1200,
  aiStats: {
    totalCalls: 23,
    autonomousDecisions: 78,
    lastWeekCalls: 8,
  },
};

// 模拟店铺数据
const mockStore = {
  name: 'My Fashion Store',
  domain: 'my-fashion-store.myshopify.com',
  status: 'development',
  products: 8,
  orders: 0,
  visitors: 1250,
  revenue: 0,
};

// 三大电商场景
const scenarios = [
  { id: 'domestic', name: '国内电商', icon: ShoppingCart, progress: 45, color: 'from-orange-500 to-red-500' },
  { id: 'crossborder', name: '跨境平台', icon: ShoppingBag, progress: 20, color: 'from-blue-500 to-cyan-500' },
  { id: 'independent', name: '外贸独立站', icon: Store, progress: 35, color: 'from-emerald-500 to-teal-500' },
];

export default function StudentDashboardPage() {
  const [progress] = useState(mockProgress);
  const [store] = useState(mockStore);
  const [radar] = useState(abilityRadar);

  // 计算统计数据
  const completedStages = Object.values(progress.stages).filter(s => s.completed).length;
  const totalStages = PRACTICE_STAGES.length;
  const totalPoints = PRACTICE_STAGES.reduce((sum, stage) => 
    sum + stage.tasks.reduce((tSum, task) => tSum + task.points, 0), 0
  );
  const earnedPoints = PRACTICE_STAGES.reduce((sum, stage) => {
    const stageProgress = progress.stages[stage.id];
    if (stageProgress?.completed && 'score' in stageProgress) {
      return sum + stage.tasks.reduce((tSum, task) => tSum + task.points, 0) * (stageProgress.score || 0) / 100;
    }
    return sum;
  }, 0);

  // 获取当前阶段
  const getCurrentStage = (): StageConfig | null => {
    for (const stage of PRACTICE_STAGES) {
      const stageProgress = progress.stages[stage.id];
      if (stageProgress?.started && !stageProgress?.completed) {
        return stage;
      }
    }
    return null;
  };

  const currentStage = getCurrentStage();

  // 检查阶段是否可开始
  const canStartStage = (stage: StageConfig): boolean => {
    if (!stage.prerequisites || stage.prerequisites.length === 0) {
      return true;
    }
    return stage.prerequisites.every(preId => progress.stages[preId]?.completed);
  };

  // 获取阶段状态
  const getStageStatus = (stageId: PracticeStage): 'completed' | 'in_progress' | 'available' | 'locked' => {
    const stageProgress = progress.stages[stageId];
    if (stageProgress?.completed) return 'completed';
    if (stageProgress?.started) return 'in_progress';
    
    const stage = PRACTICE_STAGES.find(s => s.id === stageId);
    if (stage && canStartStage(stage)) return 'available';
    return 'locked';
  };

  return (
    <StudentLayout activeMenu="dashboard">
      <div className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-800">实训控制台</h2>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              AI融合版
            </Badge>
          </div>
          <p className="text-slate-500">驾驭AI，培养四大核心能力，成为不被替代的电商人才</p>
        </div>

        {/* 概览卡片 */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">综合能力</p>
                  <p className="text-3xl font-bold mt-1">{radar.overall}%</p>
                  <p className="text-emerald-200 text-sm mt-1">四大核心能力</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Target className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">AI辅助统计</p>
                  <p className="text-3xl font-bold mt-1">{progress.aiStats.totalCalls}</p>
                  <p className="text-purple-200 text-sm mt-1">调用次数</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Brain className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">自主决策</p>
                  <p className="text-3xl font-bold mt-1">{progress.aiStats.autonomousDecisions}%</p>
                  <p className="text-amber-200 text-sm mt-1">独立决策比例</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Zap className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">当前等级</p>
                  <p className="text-3xl font-bold mt-1">Lv.{progress.level}</p>
                  <p className="text-green-200 text-sm mt-1">{progress.experience} 经验值</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Star className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">综合能力</p>
                  <p className="text-3xl font-bold mt-1">{radar.overall}%</p>
                  <p className="text-amber-200 text-sm mt-1">优秀</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Trophy className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：五维能力雷达图 + 三大场景 */}
          <div className="col-span-1 space-y-6">
            {/* 五维能力雷达图 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-purple-600" />
                  五维能力评估
                </CardTitle>
                <CardDescription>考试得分 × 50% + 实训得分 × 50%</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 五维能力展示 */}
                <div className="space-y-4">
                  {radar.dimensions.map((dim, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">{dim.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: dim.color }}>{dim.value}%</span>
                          <span className="text-xs text-slate-400">权重{dim.weight}%</span>
                        </div>
                      </div>
                      {/* 考试vs实训双进度条 */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 w-10">考试</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-blue-500"
                              style={{ width: `${dim.examScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-blue-600 w-8">{dim.examScore}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 w-10">实训</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-green-500"
                              style={{ width: `${dim.practiceScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-green-600 w-8">{dim.practiceScore}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">综合能力得分</p>
                      <p className="text-2xl font-bold text-purple-600">{radar.overall}%</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-purple-200 flex items-center justify-center">
                      <span className="text-xl font-bold text-purple-600">{radar.overall}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 三大电商场景 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>三大电商场景</CardTitle>
                <CardDescription>统一流程，场景互通</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scenario.color} flex items-center justify-center`}>
                        <scenario.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{scenario.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={scenario.progress} className="h-2 flex-1" />
                          <span className="text-xs text-slate-500">{scenario.progress}%</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI使用建议 */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI使用建议
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/20">
                    <p className="font-medium">💡 建议</p>
                    <p className="text-sm text-purple-100 mt-1">您的自主决策比例为78%，继续保持独立思考习惯！</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/20">
                    <p className="font-medium">📈 提升</p>
                    <p className="text-sm text-purple-100 mt-1">风险应对能力有待提升，建议多参与风险事件模拟。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：实训阶段 */}
          <div className="col-span-2 space-y-6">
            {/* 当前任务 */}
            {currentStage && (
              <Card className="border-0 shadow-lg border-l-4 border-l-emerald-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                        {(() => {
                          const Icon = stageIcons[currentStage.id];
                          return Icon ? <Icon className="h-6 w-6 text-emerald-600" /> : null;
                        })()}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{currentStage.name}</CardTitle>
                        <CardDescription>当前进行中 · {currentStage.duration}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700">进行中</Badge>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                        onClick={() => {}}
                      >
                        <Brain className="h-4 w-4 mr-1" />
                        AI辅助
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">任务进度</span>
                      <span className="font-medium text-slate-800">
                        0/{currentStage.tasks.length}
                      </span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <div className="flex gap-3">
                      <Link href="/student/practice" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                          <Play className="h-4 w-4 mr-2" />
                          继续实训
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        查看任务详情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 实训阶段列表 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>实训阶段</CardTitle>
                <CardDescription>完成各阶段任务，掌握全链路电商能力</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {PRACTICE_STAGES.slice(0, 6).map((stage) => {
                    const status = getStageStatus(stage.id);
                    const Icon = stageIcons[stage.id] || Target;
                    const stageProgress = progress.stages[stage.id];
                    
                    return (
                      <div
                        key={stage.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                          status === 'completed' 
                            ? 'border-green-200 bg-green-50' 
                            : status === 'in_progress'
                            ? 'border-emerald-300 bg-emerald-50 shadow-sm'
                            : status === 'available'
                            ? 'border-slate-200 hover:border-emerald-300 hover:shadow-sm cursor-pointer'
                            : 'border-slate-200 bg-slate-50 opacity-60'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          status === 'completed' 
                            ? 'bg-green-100' 
                            : status === 'in_progress'
                            ? 'bg-emerald-100'
                            : status === 'available'
                            ? 'bg-slate-100'
                            : 'bg-slate-100'
                        }`}>
                          {status === 'completed' ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : status === 'locked' ? (
                            <Lock className="h-6 w-6 text-slate-400" />
                          ) : (
                            <Icon className={`h-6 w-6 ${
                              status === 'in_progress' ? 'text-emerald-600' : 'text-slate-500'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-slate-800">{stage.name}</h4>
                            {status === 'completed' && 'score' in stageProgress && stageProgress.score && (
                              <Badge className="bg-green-100 text-green-700">{Math.round(stageProgress.score)}分</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">{stage.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            <span>{stage.tasks.length} 个任务</span>
                            <span>{stage.duration}</span>
                            {stage.rewards.badge && <span>🎖️ {stage.rewards.badge}</span>}
                          </div>
                          {/* 显示关联的五维能力 */}
                          {stage.abilities && stage.abilities.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {stage.abilities.map((ability, idx) => {
                                const dim = radar.dimensions.find(d => d.id === ability.dimension);
                                return (
                                  <Badge 
                                    key={idx}
                                    variant="outline" 
                                    className="text-xs"
                                    style={{ borderColor: dim?.color, color: dim?.color }}
                                  >
                                    {dim?.name || ability.dimension}
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {status === 'completed' && (
                            <Badge className="bg-green-500">已完成</Badge>
                          )}
                          {status === 'in_progress' && (
                            <Badge className="bg-emerald-500">进行中</Badge>
                          )}
                          {status === 'available' && (
                            <Link href="/student/practice">
                              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600">开始</Button>
                            </Link>
                          )}
                          {status === 'locked' && (
                            <Badge variant="outline" className="text-slate-400">需完成前置</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 悬浮AI助手按钮 */}
      <AIAssistantButton />
      {/* 悬浮风险事件按钮 */}
      <RiskEventButton />
    </StudentLayout>
  );
}
