'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  School,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Globe,
  TrendingUp,
  TrendingDown,
  Users2,
  ClipboardCheck,
  Search,
  Package,
  Brain,
  AlertTriangle,
  Award,
  Activity,
  Clock,
  MapPin,
  DollarSign,
  Target,
  Zap,
  ChevronRight,
  Download,
  Filter,
  RefreshCw,
  Eye,
  MoreHorizontal,
  Store,
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

// 运营概况数据
const operationStats = [
  {
    title: '在校生总数',
    value: '1,286',
    change: '+56',
    trend: 'up',
    icon: Users2,
    color: 'blue',
    description: '较上月',
  },
  {
    title: '活跃班级数',
    value: '24',
    change: '+2',
    trend: 'up',
    icon: School,
    color: 'green',
    description: '本周活跃',
  },
  {
    title: '完成实训人次',
    value: '8,542',
    change: '+1,234',
    trend: 'up',
    icon: ClipboardCheck,
    color: 'purple',
    description: '本月',
  },
  {
    title: '整体能力达成率',
    value: '78.5%',
    change: '+5.2%',
    trend: 'up',
    icon: Award,
    color: 'emerald',
    description: '较上月',
  },
];

// 五维能力数据
const abilityData = {
  labels: ['自主决策', 'AI辅助应用', '数据复盘', '风险应对', '合规意识'],
  current: [82, 75, 78, 85, 72],
  previous: [78, 72, 75, 80, 68],
  benchmark: [80, 75, 75, 80, 70],
};

// 任务完成率热力图数据
const taskCompletionHeatmap = [
  { module: '市场调研', week1: 85, week2: 88, week3: 90, week4: 92 },
  { module: '独立站搭建', week1: 70, week2: 75, week3: 78, week4: 82 },
  { module: '流量推广', week1: 65, week2: 68, week3: 72, week4: 76 },
  { module: '转化运营', week1: 72, week2: 75, week3: 78, week4: 80 },
  { module: '数据分析', week1: 60, week2: 65, week3: 68, week4: 70 },
  { module: '风险应对', week1: 80, week2: 82, week3: 85, week4: 88 },
];

// 教学资源利用率
const resourceUtilization = [
  { name: '店铺创建数', value: 356, total: 500, icon: Store, unit: '个' },
  { name: '虚拟预算消耗', value: 45000, total: 60000, icon: DollarSign, unit: '元' },
  { name: 'AI调用次数', value: 12850, total: 20000, icon: Brain, unit: '次' },
  { name: '系统活跃时长', value: 12500, total: 20000, icon: Clock, unit: '小时' },
];

// 实训场景分布
const sceneDistribution = [
  { name: '国内电商', count: 520, percentage: 37, color: 'bg-orange-500' },
  { name: '跨境电商', count: 580, percentage: 41, color: 'bg-blue-500' },
  { name: '外贸独立站', count: 306, percentage: 22, color: 'bg-emerald-500' },
];

// 师资绩效
const teacherPerformance = [
  { name: '王老师', classes: 3, avgScore: 85.2, tasks: 12, feedback: 4.8 },
  { name: '李老师', classes: 2, avgScore: 82.5, tasks: 8, feedback: 4.7 },
  { name: '张老师', classes: 4, avgScore: 87.8, tasks: 15, feedback: 4.9 },
  { name: '刘老师', classes: 2, avgScore: 80.5, tasks: 10, feedback: 4.5 },
  { name: '陈老师', classes: 3, avgScore: 83.5, tasks: 11, feedback: 4.6 },
];

// 班级对比
const classComparison = [
  { name: '电商2201班', decision: 85, ai: 78, data: 82, risk: 88, compliance: 85, avg: 83.6 },
  { name: '跨境电商2203班', decision: 82, ai: 75, data: 78, risk: 85, compliance: 80, avg: 80.0 },
  { name: '电商2202班', decision: 78, ai: 72, data: 75, risk: 80, compliance: 75, avg: 76.0 },
  { name: '跨境电商2201班', decision: 75, ai: 70, data: 72, risk: 78, compliance: 72, avg: 73.4 },
];

// 风险预警
const riskAlerts = [
  { type: '能力不达标', count: 3, level: 'high', detail: '电商2202班数据复盘<60分' },
  { type: '进度滞后', count: 5, level: 'medium', detail: '多个班级独立站搭建完成率<50%' },
  { type: 'AI滥用', count: 8, level: 'high', detail: '8名学生耦合度>70%' },
  { type: '长期未登录', count: 12, level: 'low', detail: '12名学生7天未登录' },
];

// 简单的雷达图组件（用SVG绘制）
const SimpleRadarChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const size = 200;
  const center = size / 2;
  const radius = 80;
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
    const r = radius + 20;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, label };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 背景网格 */}
      {[20, 40, 60, 80, 100].map((r, i) => (
        <polygon
          key={i}
          points={Array.from({ length: data.length }).map((_, j) => {
            const angle = angleStep * j - Math.PI / 2;
            const radius = (r / 100) * 80;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}

      {/* 数据区域 */}
      <polygon
        points={points}
        fill="rgba(99, 102, 241, 0.2)"
        stroke="#6366f1"
        strokeWidth="2"
      />

      {/* 标签 */}
      {labelsPos.map((pos, i) => (
        <text
          key={i}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#64748b"
        >
          {pos.label}
        </text>
      ))}
    </svg>
  );
};

// 简单的热力图组件
const HeatmapCell = ({ value, max }: { value: number; max: number }) => {
  const intensity = value / max;
  const bgColor = intensity > 0.8 ? 'bg-green-500' :
                  intensity > 0.6 ? 'bg-green-400' :
                  intensity > 0.4 ? 'bg-yellow-400' :
                  intensity > 0.2 ? 'bg-yellow-300' : 'bg-red-400';
  return (
    <div className={`w-12 h-12 flex items-center justify-center text-sm font-medium rounded ${bgColor} ${intensity > 0.5 ? 'text-white' : 'text-slate-800'}`}>
      {value}%
    </div>
  );
};

export default function AdminDashboard() {
  const handleLogout = useLogout();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
                <p className="text-xs text-slate-500">管理员端</p>
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
                5
              </span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">管理员张</p>
                <p className="text-xs text-slate-500">教务处</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-medium">
                张
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="pt-16 min-h-screen">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl mb-6">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              运营概况
            </TabsTrigger>
            <TabsTrigger value="quality" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              教学质量
            </TabsTrigger>
            <TabsTrigger value="resources" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              资源利用
            </TabsTrigger>
            <TabsTrigger value="teachers" className="rounded-lg data-[state=active]:bg-violet-500 data-[state=active]:text-white">
              师资绩效
            </TabsTrigger>
          </TabsList>

          {/* 运营概况 Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* 运营概况卡片 */}
            <div className="grid grid-cols-4 gap-4">
              {operationStats.map((stat, index) => {
                const Icon = stat.icon;
                const colorClass = stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                   stat.color === 'green' ? 'from-green-500 to-green-600' :
                                   stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                                   stat.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                                   'from-slate-500 to-slate-600';
                return (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-slate-400 ml-2">{stat.description}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 实训场景分布 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-violet-500" />
                  实训场景分布
                </CardTitle>
                <CardDescription>三大电商场景使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sceneDistribution.map((scene, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${scene.color}`} />
                          <span className="font-medium text-slate-700">{scene.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-slate-600">{scene.count} 个店铺</span>
                          <span className="text-sm font-medium text-slate-800">{scene.percentage}%</span>
                        </div>
                      </div>
                      <Progress value={scene.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 教学质量 Tab */}
          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* 五维能力达成度 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-violet-500" />
                    五维能力达成度
                  </CardTitle>
                  <CardDescription>当前周期 vs 上一周期 vs 行业基准</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <SimpleRadarChart data={abilityData.current} labels={abilityData.labels} />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-slate-500">当前周期</div>
                      <div className="text-lg font-bold text-violet-600">
                        {(abilityData.current.reduce((a, b) => a + b, 0) / abilityData.current.length).toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">上一周期</div>
                      <div className="text-lg font-bold text-slate-600">
                        {(abilityData.previous.reduce((a, b) => a + b, 0) / abilityData.previous.length).toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">行业基准</div>
                      <div className="text-lg font-bold text-emerald-600">
                        {(abilityData.benchmark.reduce((a, b) => a + b, 0) / abilityData.benchmark.length).toFixed(1)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 任务完成率热力图 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-violet-500" />
                    实训任务完成率
                  </CardTitle>
                  <CardDescription>各模块每周完成情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-end gap-3 mb-2 text-sm">
                      <span>低</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 bg-red-400 rounded" />
                        <div className="w-4 h-4 bg-yellow-300 rounded" />
                        <div className="w-4 h-4 bg-yellow-400 rounded" />
                        <div className="w-4 h-4 bg-green-400 rounded" />
                        <div className="w-4 h-4 bg-green-500 rounded" />
                      </div>
                      <span>高</span>
                    </div>
                    {taskCompletionHeatmap.map((module, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium text-slate-700">{module.module}</div>
                        <div className="flex gap-2">
                          <HeatmapCell value={module.week1} max={100} />
                          <HeatmapCell value={module.week2} max={100} />
                          <HeatmapCell value={module.week3} max={100} />
                          <HeatmapCell value={module.week4} max={100} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 班级能力对比 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-violet-500" />
                  班级能力对比
                </CardTitle>
                <CardDescription>各班级五维能力得分对比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">班级</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-slate-600">自主决策</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-slate-600">AI辅助</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-slate-600">数据复盘</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-slate-600">风险应对</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-slate-600">合规意识</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-slate-600">平均分</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classComparison.map((cls, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-slate-800">{cls.name}</td>
                          <td className="text-center py-3 px-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${cls.decision >= 80 ? 'bg-green-100 text-green-700' : cls.decision >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {cls.decision}
                            </span>
                          </td>
                          <td className="text-center py-3 px-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${cls.ai >= 80 ? 'bg-green-100 text-green-700' : cls.ai >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {cls.ai}
                            </span>
                          </td>
                          <td className="text-center py-3 px-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${cls.data >= 80 ? 'bg-green-100 text-green-700' : cls.data >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {cls.data}
                            </span>
                          </td>
                          <td className="text-center py-3 px-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${cls.risk >= 80 ? 'bg-green-100 text-green-700' : cls.risk >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {cls.risk}
                            </span>
                          </td>
                          <td className="text-center py-3 px-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${cls.compliance >= 80 ? 'bg-green-100 text-green-700' : cls.compliance >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {cls.compliance}
                            </span>
                          </td>
                          <td className="text-center py-3 px-2 font-bold text-violet-600">{cls.avg.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 资源利用 Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {resourceUtilization.map((resource, index) => {
                const Icon = resource.icon;
                const percentage = Math.round((resource.value / resource.total) * 100);
                return (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-violet-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-500">{resource.name}</p>
                          <p className="text-2xl font-bold text-slate-800">
                            {resource.value.toLocaleString()} <span className="text-sm font-normal text-slate-500">/{resource.total.toLocaleString()} {resource.unit}</span>
                          </p>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <p className="text-xs text-slate-500 mt-2">{percentage}% 已使用</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 店铺平台分布 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-violet-500" />
                  店铺平台分布
                </CardTitle>
                <CardDescription>各电商平台使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-3">国内电商</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">淘宝/天猫</span>
                        <Badge className="bg-orange-100 text-orange-700">186</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">拼多多</span>
                        <Badge className="bg-red-100 text-red-700">168</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">抖音电商</span>
                        <Badge className="bg-pink-100 text-pink-700">166</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-3">跨境电商</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Amazon</span>
                        <Badge className="bg-amber-100 text-amber-700">195</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Shopee</span>
                        <Badge className="bg-orange-100 text-orange-700">205</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Lazada</span>
                        <Badge className="bg-blue-100 text-blue-700">180</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-3">外贸独立站</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Shopify</span>
                        <Badge className="bg-emerald-100 text-emerald-700">108</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Shoplazza</span>
                        <Badge className="bg-blue-100 text-blue-700">98</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">WooCommerce</span>
                        <Badge className="bg-purple-100 text-purple-700">100</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 师资绩效 Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-violet-500" />
                  教师效能排行
                </CardTitle>
                <CardDescription>教师授课效果与学生反馈</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherPerformance.map((teacher, index) => (
                    <div key={index} className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-800">{teacher.name}</span>
                          <Badge variant="outline">{teacher.classes} 个班级</Badge>
                        </div>
                        <div className="flex items-center gap-6 mt-2 text-sm text-slate-600">
                          <span>平均分: <strong className="text-slate-800">{teacher.avgScore}</strong></span>
                          <span>任务数: <strong className="text-slate-800">{teacher.tasks}</strong></span>
                          <span>反馈: <strong className="text-amber-600">{'⭐'.repeat(Math.round(teacher.feedback))}</strong></span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        详情
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 风险预警 */}
            <Card className="border-0 shadow-lg border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  风险预警
                </CardTitle>
                <CardDescription>需要立即关注的问题</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                      <div className="flex items-center gap-3">
                        <Badge variant={alert.level === 'high' ? 'destructive' : alert.level === 'medium' ? 'default' : 'secondary'}>
                          {alert.level === 'high' ? '高' : alert.level === 'medium' ? '中' : '低'}
                        </Badge>
                        <span className="font-medium text-slate-800">{alert.type}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600">{alert.detail}</span>
                        <Badge variant="outline" className="bg-white">{alert.count} 个</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* 侧边栏（简化版） */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500 text-white">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">数据总览</span>
          </Link>
          <Link href="/admin/accounts" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <Users className="h-5 w-5" />
            <span className="font-medium">账号管理</span>
          </Link>
          <Link href="/admin/classes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <School className="h-5 w-5" />
            <span className="font-medium">班级管理</span>
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <BarChart3 className="h-5 w-5" />
            <span className="font-medium">数据报表</span>
          </Link>
          <Link href="/admin/competitions" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <Award className="h-5 w-5" />
            <span className="font-medium">竞赛管理</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
            <Settings className="h-5 w-5" />
            <span className="font-medium">系统设置</span>
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
