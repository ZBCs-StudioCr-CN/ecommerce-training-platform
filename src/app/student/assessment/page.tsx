'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  Shield,
  BarChart3,
  ChevronRight,
  Download,
  Calendar,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Lightbulb,
  BookOpen,
  Star,
  PieChart,
  Activity,
  FileText,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentSidebar, StudentHeader } from '@/components/student-layout';

// 能力维度配置
const abilityDimensions = [
  {
    id: 'decision',
    name: '自主决策能力',
    icon: Target,
    maxScore: 30,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    description: '在关键节点做出合理商业决策的能力',
    subItems: [
      { name: '选品决策', maxScore: 6 },
      { name: '定价策略', maxScore: 5 },
      { name: '渠道选择', maxScore: 5 },
      { name: '页面设计', maxScore: 5 },
      { name: '营销活动', maxScore: 5 },
      { name: '预算管理', maxScore: 4 },
    ],
  },
  {
    id: 'ai',
    name: 'AI辅助应用',
    icon: Brain,
    maxScore: 20,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    description: '正确使用AI工具辅助决策的能力',
    subItems: [
      { name: 'AI使用策略', maxScore: 5 },
      { name: '内容审核能力', maxScore: 5 },
      { name: '决策优化', maxScore: 5 },
      { name: '效率意识', maxScore: 5 },
    ],
  },
  {
    id: 'analysis',
    name: '数据复盘与优化',
    icon: TrendingUp,
    maxScore: 25,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    description: '从数据中提取洞察并优化的能力',
    subItems: [
      { name: '数据解读', maxScore: 8 },
      { name: '问题诊断', maxScore: 7 },
      { name: '优化方案', maxScore: 6 },
      { name: '复盘报告', maxScore: 4 },
    ],
  },
  {
    id: 'risk',
    name: '风险应对',
    icon: AlertTriangle,
    maxScore: 15,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    description: '识别风险并制定有效应对方案的能力',
    subItems: [
      { name: '客户投诉处理', maxScore: 5 },
      { name: '差评处理', maxScore: 3 },
      { name: '平台处罚应对', maxScore: 3 },
      { name: '舆情危机处理', maxScore: 2 },
      { name: '运营风险应对', maxScore: 2 },
    ],
  },
  {
    id: 'compliance',
    name: '合规与规则意识',
    icon: Shield,
    maxScore: 10,
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    description: '遵守平台规则和法律法规的意识',
    subItems: [
      { name: '平台规则', maxScore: 4 },
      { name: '法律法规', maxScore: 3 },
      { name: '知识产权', maxScore: 2 },
      { name: '数据合规', maxScore: 1 },
    ],
  },
];

// 模拟评估数据
const mockAssessmentData = {
  studentId: 'STU001',
  studentName: '张三',
  className: '电商2201班',
  practicePeriod: '2024.01.01 - 2024.02.15',
  totalScore: 85,
  rank: 5,
  totalStudents: 50,
  scores: {
    decision: {
      total: 26,
      subScores: { '选品决策': 5, '定价策略': 4, '渠道选择': 4, '页面设计': 4, '营销活动': 5, '预算管理': 4 },
    },
    ai: {
      total: 16,
      subScores: { 'AI使用策略': 4, '内容审核能力': 3, '决策优化': 5, '效率意识': 4 },
    },
    analysis: {
      total: 20,
      subScores: { '数据解读': 6, '问题诊断': 5, '优化方案': 5, '复盘报告': 4 },
    },
    risk: {
      total: 13,
      subScores: { '客户投诉处理': 4, '差评处理': 3, '平台处罚应对': 3, '舆情危机处理': 1, '运营风险应对': 2 },
    },
    compliance: {
      total: 10,
      subScores: { '平台规则': 4, '法律法规': 3, '知识产权': 2, '数据合规': 1 },
    },
  },
  history: [
    { week: 1, score: 15, focus: '市场调研与选品' },
    { week: 2, score: 28, focus: '独立站搭建' },
    { week: 3, score: 45, focus: '广告投放' },
    { week: 4, score: 62, focus: '运营优化' },
    { week: 5, score: 75, focus: '持续优化' },
    { week: 6, score: 85, focus: '总结复盘' },
  ],
  decisions: [
    {
      step: '选品决策',
      timestamp: '2024-01-03 14:30',
      score: 5,
      maxScore: 6,
      feedback: '选品理由充分，市场分析到位。选择的产品符合目标市场需求，竞争分析完整。',
      aiSuggestions: 3,
      usedAISuggestion: false,
    },
    {
      step: '定价策略',
      timestamp: '2024-01-05 10:15',
      score: 4,
      maxScore: 5,
      feedback: '定价逻辑清晰，略高于市场均价。建议考虑促销期间的定价策略调整。',
      aiSuggestions: 2,
      usedAISuggestion: true,
    },
    {
      step: '渠道选择',
      timestamp: '2024-01-10 16:00',
      score: 4,
      maxScore: 5,
      feedback: '渠道选择合理，预算分配需优化。建议增加社交媒体渠道的投放比例。',
      aiSuggestions: 4,
      usedAISuggestion: false,
    },
  ],
  riskEvents: [
    {
      id: 'RE001',
      title: '产品质量投诉：服装褪色严重',
      type: 'complaint',
      score: 4,
      maxScore: 5,
      status: 'completed',
      aiCouplingDegree: 35,
      feedback: '响应及时，方案合理，客户满意度高。',
    },
    {
      id: 'RE002',
      title: '恶意差评攻击：竞争对手刷差评',
      type: 'negative-review',
      score: 3,
      maxScore: 3,
      status: 'completed',
      aiCouplingDegree: 42,
      feedback: '证据充分，申诉成功，差评已清除。',
    },
  ],
  aiUsage: {
    totalInteractions: 45,
    averageCoupling: 38,
    byType: {
      '获取建议': 25,
      '生成内容': 12,
      '数据分析': 8,
    },
    trend: [30, 35, 42, 38, 36, 38],
  },
};

// 评分等级配置
const scoreLevels = {
  excellent: { min: 90, label: '优秀', color: 'text-green-600', bg: 'bg-green-100' },
  good: { min: 75, label: '良好', color: 'text-blue-600', bg: 'bg-blue-100' },
  pass: { min: 60, label: '合格', color: 'text-amber-600', bg: 'bg-amber-100' },
  fail: { min: 0, label: '不合格', color: 'text-red-600', bg: 'bg-red-100' },
};

function getScoreLevel(score: number) {
  if (score >= 90) return scoreLevels.excellent;
  if (score >= 75) return scoreLevels.good;
  if (score >= 60) return scoreLevels.pass;
  return scoreLevels.fail;
}

export default function StudentAssessmentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const data = mockAssessmentData;

  // 计算雷达图数据
  const radarData = abilityDimensions.map((dim) => ({
    dimension: dim.name,
    score: data.scores[dim.id as keyof typeof data.scores].total,
    maxScore: dim.maxScore,
    percentage: Math.round(
      (data.scores[dim.id as keyof typeof data.scores].total / dim.maxScore) * 100
    ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <StudentSidebar />
      <StudentHeader />

      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">能力评估报告</h1>
                <p className="text-slate-500 mt-1">
                  实训周期：{data.practicePeriod}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  导出PDF报告
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  下载详细数据
                </Button>
              </div>
            </div>
          </div>

          {/* 总分卡片 */}
          <Card className="border-0 shadow-xl mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">{data.totalScore}</div>
                    <div className="text-blue-200 text-lg">综合得分</div>
                    <div className="mt-3">
                      <Badge className="bg-white/20 text-white text-lg px-4 py-1">
                        {getScoreLevel(data.totalScore).label}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-8 w-8" />
                        <div>
                          <div className="text-2xl font-bold">第 {data.rank} 名</div>
                          <div className="text-blue-200 text-sm">班级排名</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-8 w-8" />
                        <div>
                          <div className="text-2xl font-bold">{data.totalStudents} 人</div>
                          <div className="text-blue-200 text-sm">参与实训</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Activity className="h-8 w-8" />
                        <div>
                          <div className="text-2xl font-bold">85%</div>
                          <div className="text-blue-200 text-sm">超过同学</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 能力雷达图 */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <Card className="border-0 shadow-lg col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  能力雷达图
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {radarData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{item.dimension}</span>
                        <span className="font-medium text-slate-800">
                          {item.score}/{item.maxScore}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 进度曲线 */}
            <Card className="border-0 shadow-lg col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  能力成长曲线
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-4 px-4">
                  {data.history.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-lg transition-all duration-300"
                        style={{ height: `${(item.score / 100) * 200}px` }}
                      />
                      <div className="mt-2 text-center">
                        <div className="text-xs text-slate-500">第{item.week}周</div>
                        <div className="text-sm font-medium text-slate-700">{item.score}分</div>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 max-w-full truncate">
                        {item.focus}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 详细评估 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="overview">综合概览</TabsTrigger>
              <TabsTrigger value="decisions">决策记录</TabsTrigger>
              <TabsTrigger value="risks">风险应对</TabsTrigger>
              <TabsTrigger value="ai">AI使用分析</TabsTrigger>
              <TabsTrigger value="suggestions">改进建议</TabsTrigger>
            </TabsList>

            {/* 综合概览 */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {abilityDimensions.map((dim) => {
                  const scoreData = data.scores[dim.id as keyof typeof data.scores];
                  const percentage = Math.round((scoreData.total / dim.maxScore) * 100);
                  const Icon = dim.icon;

                  return (
                    <Card key={dim.id} className={`border-0 shadow-lg ${dim.bgColor} ${dim.borderColor} border`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dim.color} flex items-center justify-center text-white`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-slate-800">{dim.name}</h3>
                              <div className="text-right">
                                <span className="text-2xl font-bold text-slate-800">{scoreData.total}</span>
                                <span className="text-slate-500">/{dim.maxScore}</span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-500 mb-3">{dim.description}</p>
                            <div className="h-2 bg-white rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-500`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              {dim.subItems.map((sub, i) => (
                                <div key={i} className="flex justify-between text-xs">
                                  <span className="text-slate-600">{sub.name}</span>
                                  <span className="font-medium">
                                    {scoreData.subScores[sub.name as keyof typeof scoreData.subScores] || 0}/{sub.maxScore}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* 决策记录 */}
            <TabsContent value="decisions" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>关键决策记录</CardTitle>
                  <CardDescription>记录您在实训过程中做出的重要决策及其评分</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.decisions.map((decision, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <Target className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800">{decision.step}</h4>
                              <p className="text-xs text-slate-500">{decision.timestamp}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {decision.score}/{decision.maxScore}
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              {decision.usedAISuggestion ? (
                                <>
                                  <Brain className="h-3 w-3 text-purple-500" />
                                  <span className="text-purple-600">采纳AI建议</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span className="text-green-600">自主决策</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                          {decision.feedback}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <span>AI提供 {decision.aiSuggestions} 个建议方案</span>
                          <span>•</span>
                          <span>{decision.usedAISuggestion ? '选择了AI建议方案' : '做出了独立决策'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 风险应对 */}
            <TabsContent value="risks" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>风险应对记录</CardTitle>
                  <CardDescription>风险事件处理情况及评分详情</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.riskEvents.map((event) => (
                      <div key={event.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                              <AlertTriangle className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800">{event.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{event.type}</Badge>
                                <Badge className="bg-green-100 text-green-700 text-xs">已完成</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-amber-600">
                              {event.score}/{event.maxScore}
                            </div>
                            <div className="text-xs text-slate-500">
                              AI耦合度: {event.aiCouplingDegree}%
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{event.feedback}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI使用分析 */}
            <TabsContent value="ai" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base">AI交互次数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{data.aiUsage.totalInteractions}</div>
                    <p className="text-sm text-slate-500 mt-1">本次实训累计</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base">平均耦合度</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{data.aiUsage.averageCoupling}%</div>
                    <p className="text-sm text-slate-500 mt-1">合理使用范围内</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base">使用评价</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-green-100 text-green-700 text-base">✓ 良好</Badge>
                    <p className="text-sm text-slate-500 mt-2">AI辅助得当，未过度依赖</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>AI使用类型分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(data.aiUsage.byType).map(([type, count]) => (
                      <div key={type} className="text-center">
                        <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <div className="text-2xl font-bold text-purple-600">{count}</div>
                        </div>
                        <p className="text-sm text-slate-600">{type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 改进建议 */}
            <TabsContent value="suggestions" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>能力评估总结</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 优势 */}
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      优势领域
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>自主决策能力强，能够在关键节点做出合理判断</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>AI工具使用得当，能够有效辅助决策而非依赖</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>合规意识强，无违规操作记录</span>
                      </li>
                    </ul>
                  </div>

                  {/* 待改进 */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      待改进领域
                    </h4>
                    <ul className="space-y-2 text-sm text-amber-700">
                      <li className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>数据分析深度有待提升，建议加强数据思维训练</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>AI生成内容审核能力需加强，避免直接复制使用</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowUpRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>舆情危机应对策略需要更多实践积累</span>
                      </li>
                    </ul>
                  </div>

                  {/* 学习建议 */}
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      学习建议
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-medium flex-shrink-0">1</div>
                        <span>学习《数据分析基础》课程，提升数据洞察力和分析能力</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-medium flex-shrink-0">2</div>
                        <span>多参与风险应对模拟训练，积累危机处理经验</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-medium flex-shrink-0">3</div>
                        <span>培养内容创作能力，减少对AI生成内容的直接使用</span>
                      </li>
                    </ul>
                  </div>

                  {/* 教师评语 */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      教师评语
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      张三同学在本次实训中表现优秀，展现了较强的自主决策能力和合规意识。
                      在选品决策、定价策略等关键环节能够独立思考，做出合理判断。
                      AI工具使用得当，能够将AI建议与自身经验结合，而非简单依赖。
                      建议在后续学习中加强数据分析能力的培养，进一步提升综合运营能力。
                      总体而言，已具备独立运营小型独立站的基础能力。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
