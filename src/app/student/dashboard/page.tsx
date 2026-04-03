'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Target,
  Award,
  Activity,
  Brain,
  Users,
  TrendingUp,
  Clock,
  Globe,
  Lock,
  Bell,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  BarChart3,
  Zap,
  Eye,
  ChevronRight,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentLayout } from '@/components/student-layout';

// ============================================
// 模拟数据
// ============================================

// 个人概况
const personalOverview = {
  totalScore: 82.5,
  classRank: 8,
  totalStudents: 42,
  completionRate: 75,
  weeklyHours: 12,
};

// 个人五维能力
const personalAbilities = {
  decision: 85,
  ai: 75,
  data: 82,
  risk: 80,
  compliance: 78,
};

// 班级平均（用于对比）
const classAverage = {
  decision: 78,
  ai: 75,
  data: 75,
  risk: 78,
  compliance: 72,
};

// 能力趋势
const abilityTrend = [
  { week: 'W1', decision: 70, ai: 65, data: 68, risk: 72, compliance: 70 },
  { week: 'W2', decision: 75, ai: 70, data: 72, risk: 75, compliance: 72 },
  { week: 'W3', decision: 78, ai: 72, data: 75, risk: 78, compliance: 75 },
  { week: 'W4', decision: 82, ai: 73, data: 78, risk: 79, compliance: 76 },
  { week: 'W5', decision: 85, ai: 75, data: 82, risk: 80, compliance: 78 },
];

// 实训任务列表
const practiceTasks = [
  { name: '市场调研', status: 'completed', score: 85, weight: 15, deadline: '2024-03-15', submitTime: '2024-03-14' },
  { name: '独立站搭建', status: 'completed', score: 82, weight: 20, deadline: '2024-03-22', submitTime: '2024-03-21' },
  { name: '流量推广', status: 'in-progress', score: null, weight: 25, deadline: '2024-03-29', progress: 60 },
  { name: '转化运营', status: 'not-started', score: null, weight: 20, deadline: '2024-04-05', progress: 0 },
  { name: '数据分析', status: 'not-started', score: null, weight: 15, deadline: '2024-04-12', progress: 0 },
  { name: '风险应对', status: 'not-started', score: null, weight: 5, deadline: '2024-04-15', progress: 0 },
];

// 成绩详情
const scoreBreakdown = [
  { dimension: '自主决策能力', examScore: 80, practiceScore: 88, total: 84, weight: 35 },
  { dimension: 'AI辅助应用', examScore: 75, practiceScore: 75, total: 75, weight: 20 },
  { dimension: '数据复盘与优化', examScore: 78, practiceScore: 85, total: 81.5, weight: 20 },
  { dimension: '风险应对', examScore: 82, practiceScore: 78, total: 80, weight: 15 },
  { dimension: '合规与规则意识', examScore: 75, practiceScore: 80, total: 77.5, weight: 10 },
];

// AI使用报告
const aiUsageReport = {
  coupling: 55,
  status: 'healthy',
  weeklyCalls: 245,
  totalCalls: 1250,
  originality: 75,
  moduleUsage: [
    { name: '市场分析', count: 456, percentage: 36 },
    { name: '选品建议', count: 325, percentage: 26 },
    { name: '智能搭建', count: 268, percentage: 21 },
    { name: '投放建议', count: 156, percentage: 12 },
    { name: '运营策略', count: 45, percentage: 5 },
  ],
};

// 风险应对记录
const riskHistory = [
  { type: '客户投诉处理', date: '2024-03-10', score: 85, feedback: '处理及时，沟通专业', improvement: '+5' },
  { type: '差评处理', date: '2024-03-08', score: 80, feedback: '态度良好，建议加强细节', improvement: '+3' },
  { type: '平台处罚应对', date: '2024-03-05', score: 78, feedback: '响应及时，方案需完善', improvement: '+2' },
];

// 竞争力分析
const competitiveness = {
  currentRank: 8,
  totalStudents: 42,
  top10PercentScore: 90,
  abilities: {
    commercialDecision: 82,
    trafficOperation: 78,
    dataAnalysis: 80,
    riskManagement: 85,
    overall: 81,
  },
  jobMarket: {
    position: '电商运营专员',
    matchScore: 85,
    strengths: ['数据复盘', '风险应对'],
    improvements: ['AI工具使用', '转化运营'],
  },
};

// 简单雷达图组件
const RadarChart = ({ personal, compare, labels }: { personal: number[]; compare: number[]; labels: string[] }) => {
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const angleStep = (Math.PI * 2) / labels.length;

  const personalPoints = personal.map((value, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const comparePoints = compare.map((value, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const labelsPos = labels.map((label, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = radius + 18;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, label };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[20, 40, 60, 80, 100].map((r, i) => (
        <polygon
          key={i}
          points={Array.from({ length: labels.length }).map((_, j) => {
            const angle = angleStep * j - Math.PI / 2;
            const radius = (r / 100) * 70;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}

      <polygon
        points={comparePoints}
        fill="rgba(148, 163, 184, 0.15)"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="4,2"
      />

      <polygon
        points={personalPoints}
        fill="rgba(16, 185, 129, 0.2)"
        stroke="#10b981"
        strokeWidth="2"
      />

      {labelsPos.map((pos, i) => (
        <text
          key={i}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9"
          fill="#64748b"
        >
          {pos.label}
        </text>
      ))}
    </svg>
  );
};

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <StudentLayout activeMenu="dashboard">
      <div className="space-y-6">
        {/* 欢迎横幅 */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">欢迎回来，张三同学！</h2>
              <p className="text-emerald-100">本周你有 3 个任务待完成，继续保持进步！</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{personalOverview.totalScore}</div>
                <div className="text-sm text-emerald-100">综合能力分</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">#{personalOverview.classRank}</div>
                <div className="text-sm text-emerald-100">班级排名</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              个人概况
            </TabsTrigger>
            <TabsTrigger value="ability" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              能力成长
            </TabsTrigger>
            <TabsTrigger value="tasks" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              实训任务
            </TabsTrigger>
            <TabsTrigger value="score" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              成绩详情
            </TabsTrigger>
            <TabsTrigger value="ai" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              AI使用
            </TabsTrigger>
            <TabsTrigger value="competitiveness" className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              竞争力
            </TabsTrigger>
          </TabsList>

          {/* 个人概况 Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">综合能力分</p>
                      <p className="text-3xl font-bold text-slate-800">{personalOverview.totalScore}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Award className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">班级排名</p>
                      <p className="text-3xl font-bold text-slate-800">
                        #{personalOverview.classRank}
                        <span className="text-base font-normal text-slate-500">/{personalOverview.totalStudents}</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">完成进度</p>
                      <p className="text-3xl font-bold text-slate-800">{personalOverview.completionRate}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">学习时长</p>
                      <p className="text-3xl font-bold text-slate-800">{personalOverview.weeklyHours}h</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">本周累计</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>本周任务提醒</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-lg">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">流量推广任务</p>
                      <p className="text-sm text-slate-500">剩余 3 天截止</p>
                    </div>
                    <Badge variant="outline">进行中</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">数据分析理论学习</p>
                      <p className="text-sm text-slate-500">建议完成时间：本周</p>
                    </div>
                    <Button variant="outline" size="sm">开始学习</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 能力成长 Tab */}
          <TabsContent value="ability" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-500" />
                    个人五维能力
                  </CardTitle>
                  <CardDescription>绿色：个人 | 灰色：班级平均</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <RadarChart
                      personal={[
                        personalAbilities.decision,
                        personalAbilities.ai,
                        personalAbilities.data,
                        personalAbilities.risk,
                        personalAbilities.compliance,
                      ]}
                      compare={[
                        classAverage.decision,
                        classAverage.ai,
                        classAverage.data,
                        classAverage.risk,
                        classAverage.compliance,
                      ]}
                      labels={['决策', 'AI', '数据', '风险', '合规']}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                    <div>
                      <div className="text-sm text-slate-500">个人平均</div>
                      <div className="text-lg font-bold text-emerald-600">
                        {(
                          (personalAbilities.decision +
                           personalAbilities.ai +
                           personalAbilities.data +
                           personalAbilities.risk +
                           personalAbilities.compliance) /
                          5
                        ).toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">班级平均</div>
                      <div className="text-lg font-bold text-slate-600">
                        {(
                          (classAverage.decision +
                           classAverage.ai +
                           classAverage.data +
                           classAverage.risk +
                           classAverage.compliance) /
                          5
                        ).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    能力趋势
                  </CardTitle>
                  <CardDescription>近5周能力变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {abilityTrend.map((week, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">{week.week}</span>
                          <div className="flex gap-4 text-xs">
                            <span>决策: {week.decision}</span>
                            <span>AI: {week.ai}</span>
                            <span>数据: {week.data}</span>
                            <span>风险: {week.risk}</span>
                            <span>合规: {week.compliance}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 h-2">
                          <div
                            className="flex-1 bg-blue-500 rounded"
                            style={{ width: `${week.decision}%` }}
                          />
                          <div
                            className="flex-1 bg-green-500 rounded"
                            style={{ width: `${week.ai}%` }}
                          />
                          <div
                            className="flex-1 bg-purple-500 rounded"
                            style={{ width: `${week.data}%` }}
                          />
                          <div
                            className="flex-1 bg-orange-500 rounded"
                            style={{ width: `${week.risk}%` }}
                          />
                          <div
                            className="flex-1 bg-pink-500 rounded"
                            style={{ width: `${week.compliance}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 实训任务 Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>实训任务完成情况</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {practiceTasks.map((task, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                            'bg-slate-100 text-slate-400'
                          }`}>
                            {task.status === 'completed' && <CheckCircle2 className="h-5 w-5" />}
                            {task.status === 'in-progress' && <Activity className="h-5 w-5" />}
                            {task.status === 'not-started' && <Lock className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{task.name}</p>
                            <p className="text-xs text-slate-500">权重 {task.weight}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {task.score !== null ? (
                            <Badge className="bg-emerald-100 text-emerald-700">得分: {task.score}</Badge>
                          ) : (
                            <Badge variant="outline">{task.status === 'in-progress' ? '进行中' : '未开始'}</Badge>
                          )}
                          <span className="text-sm text-slate-500">{task.deadline}</span>
                        </div>
                      </div>
                      {task.status === 'in-progress' && (
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600">完成进度</span>
                            <span className="font-medium">{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 成绩详情 Tab */}
          <TabsContent value="score" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>成绩详情</CardTitle>
                <CardDescription>考试成绩50% + 实训成绩50%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scoreBreakdown.map((item, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-slate-800">{item.dimension}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-slate-600">权重 {item.weight}%</span>
                          <Badge className="bg-emerald-100 text-emerald-700">
                            总分: {item.total.toFixed(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">考试得分</p>
                          <p className="text-xl font-bold text-blue-600">{item.examScore}</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">实训得分</p>
                          <p className="text-xl font-bold text-emerald-600">{item.practiceScore}</p>
                        </div>
                        <div className="p-3 bg-violet-50 rounded-lg">
                          <p className="text-sm text-slate-600 mb-1">综合得分</p>
                          <p className="text-xl font-bold text-violet-600">{item.total.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI使用 Tab */}
          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-slate-500">耦合度</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{aiUsageReport.coupling}%</p>
                  <Badge className={aiUsageReport.coupling < 60 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                    {aiUsageReport.coupling < 60 ? '健康使用' : '需注意'}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-slate-500">本周调用</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{aiUsageReport.weeklyCalls}</p>
                  <Badge className="bg-blue-100 text-blue-700">次</Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-slate-500">累计调用</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{aiUsageReport.totalCalls}</p>
                  <Badge className="bg-purple-100 text-purple-700">次</Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-slate-500">原创度</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{aiUsageReport.originality}%</p>
                  <Badge className="bg-emerald-100 text-emerald-700">原创占比</Badge>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>模块使用分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiUsageReport.moduleUsage.map((module, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">{module.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-800">{module.count.toLocaleString()} 次</span>
                          <span className="text-sm text-slate-500">{module.percentage}%</span>
                        </div>
                      </div>
                      <Progress value={module.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 竞争力 Tab */}
          <TabsContent value="competitiveness" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-500" />
                    班级排名
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-emerald-600 mb-2">
                      #{competitiveness.currentRank}
                    </div>
                    <div className="text-sm text-slate-500">
                      共 {competitiveness.totalStudents} 名学生
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">前10%平均分</span>
                      <span className="font-medium text-slate-800">
                        {competitiveness.top10PercentScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">你的得分</span>
                      <span className="font-medium text-emerald-600">
                        {personalOverview.totalScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">差距</span>
                      <span className="font-medium text-red-600">
                        {competitiveness.top10PercentScore - personalOverview.totalScore}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-emerald-500" />
                    就业能力评估
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">商业决策能力</span>
                        <span className="font-medium">{competitiveness.abilities.commercialDecision}</span>
                      </div>
                      <Progress value={competitiveness.abilities.commercialDecision} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">流量运营能力</span>
                        <span className="font-medium">{competitiveness.abilities.trafficOperation}</span>
                      </div>
                      <Progress value={competitiveness.abilities.trafficOperation} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">数据分析能力</span>
                        <span className="font-medium">{competitiveness.abilities.dataAnalysis}</span>
                      </div>
                      <Progress value={competitiveness.abilities.dataAnalysis} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">风险管理能力</span>
                        <span className="font-medium">{competitiveness.abilities.riskManagement}</span>
                      </div>
                      <Progress value={competitiveness.abilities.riskManagement} className="h-2" />
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">综合就业竞争力</span>
                        <Badge className="bg-emerald-100 text-emerald-700">
                          {competitiveness.abilities.overall}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>目标岗位匹配</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{competitiveness.jobMarket.position}</p>
                      <p className="text-sm text-slate-500">匹配度: {competitiveness.jobMarket.matchScore}%</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">高匹配</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">优势能力</p>
                    <div className="flex flex-wrap gap-2">
                      {competitiveness.jobMarket.strengths.map((item, index) => (
                        <Badge key={index} className="bg-emerald-100 text-emerald-700">{item}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">提升建议</p>
                    <div className="flex flex-wrap gap-2">
                      {competitiveness.jobMarket.improvements.map((item, index) => (
                        <Badge key={index} variant="outline">{item}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
