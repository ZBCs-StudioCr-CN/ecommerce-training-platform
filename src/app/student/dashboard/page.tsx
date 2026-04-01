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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StudentLayout } from '@/components/student-layout';
import { PRACTICE_STAGES, type PracticeStage, type StageConfig } from '@/data/practice';

// 阶段图标映射
const stageIcons: Record<string, React.ElementType> = {
  market_research: Target,
  store_setup: Store,
  product_listing: BarChart3,
  payment_logistics: DollarSign,
  traffic_promotion: TrendingUp,
  operation_service: Users,
  data_analysis: BarChart3,
  final_assessment: Trophy,
};

// 模拟实训进度数据
const mockProgress = {
  stages: {
    market_research: { started: true, completed: true, score: 85, startedAt: '2024-01-15', completedAt: '2024-01-18' },
    store_setup: { started: true, completed: true, score: 92, startedAt: '2024-01-19', completedAt: '2024-01-25' },
    product_listing: { started: true, completed: false, score: 70, startedAt: '2024-01-26' },
    payment_logistics: { started: false, completed: false },
    traffic_promotion: { started: false, completed: false },
    operation_service: { started: false, completed: false },
    data_analysis: { started: false, completed: false },
    final_assessment: { started: false, completed: false },
  },
  overallProgress: 35,
  experience: 450,
  level: 3,
  achievements: ['market_analyst', 'store_builder', 'first_product'],
  totalTimeSpent: 1200,
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

export default function StudentDashboardPage() {
  const [progress] = useState(mockProgress);
  const [store] = useState(mockStore);

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
          <h2 className="text-2xl font-bold text-slate-800">实训控制台</h2>
          <p className="text-slate-500">全链路电商实战模拟</p>
        </div>

        {/* 概览卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">实训进度</p>
                  <p className="text-3xl font-bold mt-1">{progress.overallProgress}%</p>
                  <p className="text-emerald-200 text-sm mt-1">{completedStages}/{totalStages} 阶段完成</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Target className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">当前等级</p>
                  <p className="text-3xl font-bold mt-1">Lv.{progress.level}</p>
                  <p className="text-amber-200 text-sm mt-1">{progress.experience} 经验值</p>
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
                  <p className="text-green-100 text-sm">累计积分</p>
                  <p className="text-3xl font-bold mt-1">{Math.round(earnedPoints)}</p>
                  <p className="text-green-200 text-sm mt-1">总分 {totalPoints}</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Star className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">实训时长</p>
                  <p className="text-3xl font-bold mt-1">{Math.round(progress.totalTimeSpent / 60)}h</p>
                  <p className="text-purple-200 text-sm mt-1">持续学习中</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <Clock className="h-7 w-7" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：实训阶段 */}
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
                    <Badge className="bg-emerald-100 text-emerald-700">进行中</Badge>
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
                <CardDescription>完成各阶段任务，掌握独立站全链路技能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {PRACTICE_STAGES.map((stage) => {
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

          {/* 右侧：店铺概览 & 成就 */}
          <div className="space-y-6">
            {/* 我的店铺 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>我的店铺</CardTitle>
                  <Link href="/student/practice">
                    <Button size="sm" variant="outline">
                      进入后台
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                      {store.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{store.name}</h4>
                      <p className="text-sm text-slate-500">{store.domain}</p>
                      <Badge className="mt-1" variant="outline">
                        {store.status === 'development' ? '开发中' : '已上线'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-50 text-center">
                      <p className="text-2xl font-bold text-slate-800">{store.products}</p>
                      <p className="text-xs text-slate-500">产品数量</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 text-center">
                      <p className="text-2xl font-bold text-slate-800">{store.visitors}</p>
                      <p className="text-xs text-slate-500">访问人数</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 text-center">
                      <p className="text-2xl font-bold text-slate-800">{store.orders}</p>
                      <p className="text-xs text-slate-500">订单数量</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 text-center">
                      <p className="text-2xl font-bold text-slate-800">${store.revenue}</p>
                      <p className="text-xs text-slate-500">销售额</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 成就徽章 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>成就徽章</CardTitle>
                  <Badge variant="secondary">{progress.achievements.length} 已获得</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'market_analyst', name: '市场分析师', icon: '📊', unlocked: true },
                    { id: 'store_builder', name: '建站达人', icon: '🏪', unlocked: true },
                    { id: 'first_product', name: '首个产品', icon: '📦', unlocked: true },
                    { id: 'seo_master', name: 'SEO大师', icon: '🔍', unlocked: false },
                    { id: 'ad_expert', name: '广告专家', icon: '📢', unlocked: false },
                    { id: 'sales_star', name: '销售之星', icon: '⭐', unlocked: false },
                    { id: 'data_analyst', name: '数据分析师', icon: '📈', unlocked: false },
                    { id: 'operation_pro', name: '运营专家', icon: '🎯', unlocked: false },
                    { id: 'master', name: '独立站大师', icon: '🏆', unlocked: false },
                  ].map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-3 rounded-xl text-center ${
                        badge.unlocked ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200' : 'bg-slate-100 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <p className={`text-xs font-medium ${badge.unlocked ? 'text-slate-700' : 'text-slate-400'}`}>
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 学习建议 */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  今日任务
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/20">
                    <p className="font-medium">完成产品上架任务</p>
                    <p className="text-sm text-emerald-100 mt-1">上架3款新产品，获得+20积分</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/20">
                    <p className="font-medium">优化产品SEO</p>
                    <p className="text-sm text-emerald-100 mt-1">优化5个产品页面，获得+15积分</p>
                  </div>
                  <Button variant="secondary" className="w-full mt-2">
                    查看全部任务
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
