'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Target,
  BarChart3,
  AlertCircle,
  Brain,
  Award,
  Activity,
  Clock,
  Globe,
  Bell,
  LogOut,
  Search,
  MoreVertical,
  Download,
  RefreshCw,
  Eye,
  ChevronRight,
  Settings,
  MessageCircle,
  LayoutDashboard,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLogout } from '@/lib/auth';

// ============================================
// 模拟数据
// ============================================

// 班级概况
const classOverview = {
  studentCount: 42,
  avgAbility: 78.5,
  completionRate: 85,
  weeklyActivity: 92,
  weeklyChange: '+5%',
};

// 学生能力矩阵
const studentAbilityMatrix = [
  { name: '张小明', decision: 85, ai: 78, data: 82, risk: 88, compliance: 80, avg: 82.6 },
  { name: '李小红', decision: 82, ai: 75, data: 78, risk: 85, compliance: 78, avg: 79.6 },
  { name: '王小华', decision: 78, ai: 72, data: 75, risk: 80, compliance: 72, avg: 75.4 },
  { name: '赵小芳', decision: 88, ai: 85, data: 90, risk: 88, compliance: 85, avg: 87.2 },
  { name: '陈小强', decision: 70, ai: 72, data: 68, risk: 75, compliance: 70, avg: 71.0 },
  { name: '刘小芳', decision: 75, ai: 78, data: 70, risk: 82, compliance: 75, avg: 76.0 },
  { name: '周小伟', decision: 82, ai: 75, data: 78, risk: 80, compliance: 78, avg: 78.6 },
  { name: '吴小燕', decision: 72, ai: 70, data: 72, risk: 75, compliance: 70, avg: 71.8 },
];

// 能力短板
const abilityWeaknesses = [
  { name: '数据复盘', avg: 72, studentsBelow70: 8 },
  { name: 'AI辅助应用', avg: 75, studentsBelow70: 5 },
  { name: '风险应对', avg: 78, studentsBelow70: 4 },
];

// 实训任务
const practiceTasks = [
  { name: '市场调研与选品', progress: 95, avgScore: 85, pending: 2 },
  { name: '独立站搭建', progress: 78, avgScore: 80, pending: 8 },
  { name: '流量推广', progress: 65, avgScore: 75, pending: 12 },
  { name: '转化运营', progress: 45, avgScore: 72, pending: 18 },
  { name: '数据分析', progress: 30, avgScore: 68, pending: 22 },
  { name: '风险应对', progress: 20, avgScore: 70, pending: 25 },
];

// AI使用健康度
const aiUsageHealth = {
  avgCoupling: 58,
  healthyRatio: 85,
  riskStudents: 5,
  moduleUsage: [
    { name: '市场分析', count: 1285 },
    { name: '选品建议', count: 986 },
    { name: '智能搭建', count: 756 },
    { name: '投放建议', count: 654 },
    { name: '运营策略', count: 543 },
  ],
};

// 风险应对表现
const riskPerformance = [
  { type: '客户投诉', count: 25, avgScore: 82, excellent: 18, needImprove: 7 },
  { type: '差评处理', count: 18, avgScore: 78, excellent: 12, needImprove: 6 },
  { type: '平台处罚', count: 12, avgScore: 75, excellent: 8, needImprove: 4 },
  { type: '舆情危机', count: 8, avgScore: 70, excellent: 5, needImprove: 3 },
  { type: '运营风险', count: 15, avgScore: 80, excellent: 10, needImprove: 5 },
  { type: '合规风险', count: 20, avgScore: 85, excellent: 15, needImprove: 5 },
];

// 雷达图组件
const RadarChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const size = 180;
  const center = size / 2;
  const radius = 70;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((value, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const labelsPos = labels.map((label, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const r = radius + 15;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, label };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[20, 40, 60, 80, 100].map((r, i) => (
        <polygon
          key={i}
          points={Array.from({ length: data.length }).map((_, j) => {
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
        points={points}
        fill="rgba(59, 130, 246, 0.2)"
        stroke="#3b82f6"
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

// 热力图单元格
const HeatmapCell = ({ value }: { value: number }) => {
  const bgClass = value >= 85 ? 'bg-green-500 text-white' :
                   value >= 70 ? 'bg-green-400 text-white' :
                   value >= 55 ? 'bg-yellow-400 text-slate-800' :
                   value >= 40 ? 'bg-yellow-300 text-slate-800' :
                   'bg-red-400 text-white';
  return (
    <div className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded ${bgClass}`}>
      {value}
    </div>
  );
};

export default function TeacherDashboard() {
  const handleLogout = useLogout();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
                <p className="text-xs text-slate-500">教师端</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="搜索..." className="w-64 pl-9 h-9" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                4
              </span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">王老师</p>
                <p className="text-xs text-slate-500">电商学院</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                王
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="pt-16 min-h-screen">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl mb-6">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              班级概况
            </TabsTrigger>
            <TabsTrigger value="ability" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              能力分析
            </TabsTrigger>
            <TabsTrigger value="tasks" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              实训任务
            </TabsTrigger>
            <TabsTrigger value="ai" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              AI使用
            </TabsTrigger>
            <TabsTrigger value="risk" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              风险应对
            </TabsTrigger>
          </TabsList>

          {/* 班级概况 Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">班级人数</p>
                      <p className="text-3xl font-bold text-slate-800">{classOverview.studentCount}</p>
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
                      <p className="text-sm text-slate-500">平均能力分</p>
                      <p className="text-3xl font-bold text-slate-800">{classOverview.avgAbility}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">任务完成率</p>
                      <p className="text-3xl font-bold text-slate-800">{classOverview.completionRate}%</p>
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
                      <p className="text-sm text-slate-500">本周活跃</p>
                      <p className="text-3xl font-bold text-slate-800">{classOverview.weeklyActivity}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <p className="text-sm text-green-500 mt-2">{classOverview.weeklyChange}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>待办提醒</CardTitle>
                <CardDescription>需要处理的紧急事项</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">独立站搭建任务批改</p>
                      <p className="text-sm text-slate-500">8名学生已完成待批改</p>
                    </div>
                    <Badge variant="destructive">紧急</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">答疑待回复</p>
                      <p className="text-sm text-slate-500">5个问题需要解答</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 能力分析 Tab */}
          <TabsContent value="ability" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    班级能力雷达图
                  </CardTitle>
                  <CardDescription>班级平均 vs 全校平均</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <RadarChart
                      data={[82, 75, 78, 85, 80]}
                      labels={['自主决策', 'AI辅助', '数据复盘', '风险应对', '合规意识']}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                    <div>
                      <div className="text-sm text-slate-500">班级平均</div>
                      <div className="text-lg font-bold text-blue-600">80.0</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">全校平均</div>
                      <div className="text-lg font-bold text-slate-600">78.5</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    能力短板分布
                  </CardTitle>
                  <CardDescription>需要加强教学的能力模块</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {abilityWeaknesses.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700">{item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-600">平均分: <strong>{item.avg}</strong></span>
                            <Badge variant={item.avg < 70 ? 'destructive' : 'default'}>
                              {item.studentsBelow70}名学生&lt;70
                            </Badge>
                          </div>
                        </div>
                        <Progress value={item.avg} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  学生能力矩阵
                </CardTitle>
                <CardDescription>点击学生姓名查看详情</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4">学生</th>
                        <th className="text-center py-3 px-2">决策</th>
                        <th className="text-center py-3 px-2">AI</th>
                        <th className="text-center py-3 px-2">数据</th>
                        <th className="text-center py-3 px-2">风险</th>
                        <th className="text-center py-3 px-2">合规</th>
                        <th className="text-center py-3 px-2">平均</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentAbilityMatrix.map((student, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                          <td className="py-3 px-4 font-medium">{student.name}</td>
                          <td className="text-center py-3 px-2"><HeatmapCell value={student.decision} /></td>
                          <td className="text-center py-3 px-2"><HeatmapCell value={student.ai} /></td>
                          <td className="text-center py-3 px-2"><HeatmapCell value={student.data} /></td>
                          <td className="text-center py-3 px-2"><HeatmapCell value={student.risk} /></td>
                          <td className="text-center py-3 px-2"><HeatmapCell value={student.compliance} /></td>
                          <td className="text-center py-3 px-2 font-bold text-blue-600">{student.avg.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 实训任务 Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  实训任务完成情况
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {practiceTasks.map((task, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">{task.name}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span>完成率: <strong>{task.progress}%</strong></span>
                          <span>平均分: <strong>{task.avgScore}</strong></span>
                          <Badge variant="outline">{task.pending}人未完成</Badge>
                        </div>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>评分分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {['市场调研', '独立站搭建', '流量推广', '转化运营'].map((module, index) => (
                    <div key={index} className="text-center p-4 border border-slate-200 rounded-lg">
                      <p className="font-medium text-slate-700 mb-3">{module}</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span>优秀(90+)</span>
                          <span className="font-bold text-green-600">25%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>良好(80-89)</span>
                          <span className="font-bold text-blue-600">40%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>及格(60-79)</span>
                          <span className="font-bold text-yellow-600">30%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>不及格(&lt;60)</span>
                          <span className="font-bold text-red-600">5%</span>
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
                    <span className="text-sm text-slate-500">平均耦合度</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{aiUsageHealth.avgCoupling}%</p>
                  <Badge className={aiUsageHealth.avgCoupling < 60 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                    {aiUsageHealth.avgCoupling < 60 ? '健康' : '需关注'}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-slate-500">健康使用</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{aiUsageHealth.healthyRatio}%</p>
                  <Badge className="bg-green-100 text-green-700">健康比例</Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="text-sm text-slate-500">高风险学生</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{aiUsageHealth.riskStudents}</p>
                  <Badge variant="destructive">需干预</Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-slate-500">调用次数</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">
                    {aiUsageHealth.moduleUsage.reduce((a, b) => a + b.count, 0).toLocaleString()}
                  </p>
                  <Badge className="bg-blue-100 text-blue-700">本月累计</Badge>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>模块使用分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiUsageHealth.moduleUsage.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">{item.name}</span>
                        <span className="font-medium text-slate-800">{item.count.toLocaleString()} 次</span>
                      </div>
                      <Progress value={(item.count / 1285) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 风险应对 Tab */}
          <TabsContent value="risk" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  风险事件处理效果
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4">风险类型</th>
                        <th className="text-center py-3 px-2">触发次数</th>
                        <th className="text-center py-3 px-2">平均得分</th>
                        <th className="text-center py-3 px-2">优秀</th>
                        <th className="text-center py-3 px-2">需改进</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskPerformance.map((item, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium">{item.type}</td>
                          <td className="text-center py-3 px-2">{item.count}</td>
                          <td className="text-center py-3 px-2">
                            <Badge variant={item.avgScore >= 80 ? 'default' : 'destructive'}>
                              {item.avgScore}
                            </Badge>
                          </td>
                          <td className="text-center py-3 px-2 text-green-600">{item.excellent}</td>
                          <td className="text-center py-3 px-2 text-red-600">{item.needImprove}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* 侧边栏 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          <Link href="/teacher/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500 text-white">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">教学概览</span>
          </Link>
          <Link href="/teacher/practice" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <Target className="h-5 w-5" />
            <span className="font-medium">实训管理</span>
          </Link>
          <Link href="/teacher/exam" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <Award className="h-5 w-5" />
            <span className="font-medium">考试管理</span>
          </Link>
          <Link href="/teacher/grading" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <FileText className="h-5 w-5" />
            <span className="font-medium">成绩管理</span>
          </Link>
          <Link href="/teacher/analysis" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <BarChart3 className="h-5 w-5" />
            <span className="font-medium">学情分析</span>
          </Link>
          <Link href="/teacher/qa" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">答疑管理</span>
          </Link>
          <Link href="/teacher/assessment" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <Target className="h-5 w-5" />
            <span className="font-medium">能力评估</span>
          </Link>
          <Link href="/teacher/monitor" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <Activity className="h-5 w-5" />
            <span className="font-medium">学习监控</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
