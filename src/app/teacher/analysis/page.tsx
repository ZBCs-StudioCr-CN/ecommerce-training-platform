'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  Globe,
  LogOut,
  BarChart3,
  TrendingUp,
  Target,
  Users,
  AlertTriangle,
  Sparkles,
  Download,
  RefreshCw,
  ChevronRight,
  Brain,
  Zap,
  Eye,
  FileText,
  PieChart,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { teacherMenuItems } from '@/config/menu';

// 能力维度数据
const abilityDimensions = [
  { name: '商业决策', score: 78, fullScore: 100, description: '市场判断、选品决策、定价策略' },
  { name: '流量逻辑', score: 65, fullScore: 100, description: '广告投放、SEO优化、流量分析' },
  { name: '数据复盘', score: 72, fullScore: 100, description: '数据分析、效果评估、优化迭代' },
  { name: '风险应对', score: 82, fullScore: 100, description: '危机处理、合规意识、风险预防' },
];

// AI使用统计数据
const aiUsageStats = {
  totalQueries: 2847,
  avgPerStudent: 22.8,
  topUsers: [
    { name: '张三', queries: 156, lastActive: '10分钟前', couplingDegree: 45 },
    { name: '李四', queries: 142, lastActive: '25分钟前', couplingDegree: 38 },
    { name: '王五', queries: 128, lastActive: '1小时前', couplingDegree: 52 },
    { name: '赵六', queries: 115, lastActive: '2小时前', couplingDegree: 41 },
    { name: '钱七', queries: 98, lastActive: '3小时前', couplingDegree: 35 },
  ],
  moduleUsage: [
    { module: '市场分析', count: 456, percentage: 16 },
    { module: '选品建议', count: 523, percentage: 18 },
    { module: '投放建议', count: 612, percentage: 22 },
    { module: '运营策略', count: 389, percentage: 14 },
    { module: '数据复盘', count: 312, percentage: 11 },
    { module: '危机处理', count: 187, percentage: 7 },
    { module: '其他', count: 368, percentage: 12 },
  ],
};

// 预警学生列表
const alertStudents = [
  { id: 1, name: '王五', class: '电商2201班', type: 'ai_overuse', message: 'AI依赖度过高(52%)，建议关注', severity: 'high' },
  { id: 2, name: '李明', class: '跨境电商2203班', type: 'progress_lag', message: '实训进度落后(完成率35%)', severity: 'medium' },
  { id: 3, name: '张三', class: '电商2201班', type: 'ai_overuse', message: 'AI依赖度较高(45%)', severity: 'medium' },
  { id: 4, name: '刘芳', class: '电商2202班', type: 'risk_fail', message: '风险应对实训未通过(0分)', severity: 'high' },
  { id: 5, name: '陈强', class: '跨境电商2203班', type: 'progress_lag', message: '连续3天未登录实训平台', severity: 'medium' },
];

// 班级表现数据
const classPerformance = [
  { name: '电商2201班', students: 42, avgScore: 85.2, completion: 92, aiUsage: 23.5, abilityScores: [80, 68, 75, 85] },
  { name: '跨境电商2203班', students: 38, avgScore: 82.5, completion: 88, aiUsage: 25.1, abilityScores: [76, 70, 72, 82] },
  { name: '电商2202班', students: 45, avgScore: 79.8, completion: 85, aiUsage: 19.8, abilityScores: [78, 58, 69, 79] },
];

// 技能模块掌握情况
const skillMastery = [
  { name: '市场调研', mastery: 85, students: 42, trend: 'up' },
  { name: '独立站搭建', mastery: 72, students: 38, trend: 'stable' },
  { name: '流量推广', mastery: 58, students: 35, trend: 'down' },
  { name: '转化运营', mastery: 75, students: 40, trend: 'up' },
  { name: '数据分析', mastery: 80, students: 42, trend: 'stable' },
  { name: '风险应对', mastery: 82, students: 45, trend: 'up' },
];

export default function TeacherAnalysisPage() {
  const [activeMenu, setActiveMenu] = useState('analysis');
  const [activeTab, setActiveTab] = useState('overview');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  // 生成AI分析报告
  const generateAIReport = async () => {
    setIsGeneratingReport(true);
    try {
      const response = await fetch('/api/teacher/ai-analysis-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classPerformance,
          abilityDimensions,
          aiUsageStats,
          alertStudents,
        }),
      });
      const data = await response.json();
      if (data.report) {
        setAiReport(data.report);
      }
    } catch (error) {
      console.error('Report generation error:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/login" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
              <p className="text-xs text-slate-500">教师端</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">王老师</p>
                <p className="text-xs text-slate-500">电商学院</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">王</div>
            </div>
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {teacherMenuItems.map((item) => (
            <Link key={item.id} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMenu === item.id ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25' : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      <main className="ml-60 pt-16 min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">学情分析</h2>
            <p className="text-slate-500">全面分析学生学习情况和能力发展</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateAIReport} disabled={isGeneratingReport}>
              {isGeneratingReport ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI生成分析报告
                </>
              )}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 核心指标卡片 */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">125</p>
                  <p className="text-sm text-slate-500">学生总数</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">82.5</p>
                  <p className="text-sm text-slate-500">平均分</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">88%</p>
                  <p className="text-sm text-slate-500">完成率</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">22.8</p>
                  <p className="text-sm text-slate-500">AI使用/人</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">5</p>
                  <p className="text-sm text-slate-500">预警学生</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <PieChart className="h-4 w-4 mr-2" />
              总体概览
            </TabsTrigger>
            <TabsTrigger value="ai-usage" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Brain className="h-4 w-4 mr-2" />
              AI使用分析
            </TabsTrigger>
            <TabsTrigger value="ability" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              能力评估
            </TabsTrigger>
            <TabsTrigger value="alerts" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              预警中心
            </TabsTrigger>
          </TabsList>

          {/* 总体概览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* 能力雷达图 */}
              <Card className="col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>四大核心能力评估</CardTitle>
                  <CardDescription>基于实训数据的综合能力分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    {abilityDimensions.map((dim) => (
                      <div key={dim.name} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700">{dim.name}</span>
                          <span className={`text-lg font-bold ${
                            dim.score >= 80 ? 'text-green-600' : 
                            dim.score >= 60 ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {dim.score}
                          </span>
                        </div>
                        <Progress value={dim.score} className="h-3 mb-2" />
                        <p className="text-xs text-slate-500">{dim.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>AI建议：</strong>流量逻辑能力整体较弱(65分)，建议增加广告投放策略和SEO优化相关教学内容，可结合实际案例进行针对性训练。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 预警概览 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    实时预警
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alertStudents.slice(0, 4).map((student) => (
                      <div key={student.id} className={`p-3 rounded-lg border ${
                        student.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-slate-800">{student.name}</span>
                          <Badge variant={student.severity === 'high' ? 'destructive' : 'default'} className="text-xs">
                            {student.type === 'ai_overuse' ? 'AI依赖' : 
                             student.type === 'progress_lag' ? '进度落后' : '未通过'}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600">{student.message}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" size="sm">
                      查看全部预警
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 班级表现对比 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>班级表现对比</CardTitle>
                <CardDescription>各班级的学习成绩和能力对比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  {classPerformance.map((cls) => (
                    <div key={cls.name} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-slate-800">{cls.name}</p>
                          <p className="text-xs text-slate-500">{cls.students}名学生</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{cls.avgScore}</p>
                          <p className="text-xs text-slate-500">平均分</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-500">完成率</span>
                            <span className="font-medium">{cls.completion}%</span>
                          </div>
                          <Progress value={cls.completion} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-500">AI使用/人</span>
                            <span className="font-medium">{cls.aiUsage}</span>
                          </div>
                          <Progress value={cls.aiUsage / 30 * 100} className="h-2" />
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-500 mb-2">能力分布</p>
                        <div className="flex gap-1">
                          {cls.abilityScores.map((score, i) => (
                            <div key={i} className="flex-1 h-8 rounded" style={{
                              backgroundColor: `hsl(${200 + (score - 60) * 2}, 70%, ${70 - score / 4}%)`
                            }} title={`${abilityDimensions[i]?.name}: ${score}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI使用分析 */}
          <TabsContent value="ai-usage" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* AI使用概览 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    AI使用概览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-purple-600">{aiUsageStats.totalQueries}</p>
                          <p className="text-sm text-purple-600">总查询次数</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-purple-500" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-slate-50 text-center">
                        <p className="text-xl font-bold text-slate-800">{aiUsageStats.avgPerStudent}</p>
                        <p className="text-xs text-slate-500">人均使用</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 text-center">
                        <p className="text-xl font-bold text-slate-800">78%</p>
                        <p className="text-xs text-slate-500">合理使用率</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 模块使用分布 */}
              <Card className="col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>AI模块使用分布</CardTitle>
                  <CardDescription>各功能模块的使用情况统计</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiUsageStats.moduleUsage.map((item) => (
                      <div key={item.module} className="flex items-center gap-4">
                        <div className="w-24 text-sm text-slate-700">{item.module}</div>
                        <Progress value={item.percentage} className="flex-1 h-3" />
                        <div className="w-20 text-right">
                          <span className="text-sm font-medium text-slate-800">{item.count}</span>
                          <span className="text-xs text-slate-500 ml-1">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI依赖度分析 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>学生AI依赖度排名</CardTitle>
                    <CardDescription>检测AI耦合度，防止过度依赖</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">高风险: &gt;50%</Badge>
                    <Badge variant="default">中等: 30-50%</Badge>
                    <Badge variant="secondary">正常: &lt;30%</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {aiUsageStats.topUsers.map((user, i) => (
                    <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${
                      user.couplingDegree > 50 ? 'bg-red-50 border border-red-200' : 
                      user.couplingDegree > 30 ? 'bg-amber-50 border border-amber-200' : 
                      'bg-slate-50 border border-slate-200'
                    }`}>
                      <div className="w-8 text-center font-bold text-slate-500">{i + 1}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-800">{user.name}</span>
                          <span className="text-xs text-slate-500">最后使用: {user.lastActive}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-500">查询{user.queries}次</span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">AI耦合度</span>
                          <Progress value={user.couplingDegree} className="w-20 h-2" />
                          <span className={`text-sm font-bold ${
                            user.couplingDegree > 50 ? 'text-red-600' : 
                            user.couplingDegree > 30 ? 'text-amber-600' : 'text-green-600'
                          }`}>
                            {user.couplingDegree}%
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 能力评估 */}
          <TabsContent value="ability" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* 技能模块掌握情况 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>技能模块掌握情况</CardTitle>
                  <CardDescription>各技能模块的学生掌握程度</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillMastery.map((skill) => (
                      <div key={skill.name} className="p-3 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">{skill.name}</span>
                            {skill.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {skill.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                          </div>
                          <span className={`text-lg font-bold ${
                            skill.mastery >= 80 ? 'text-green-600' : 
                            skill.mastery >= 60 ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {skill.mastery}%
                          </span>
                        </div>
                        <Progress value={skill.mastery} className="h-2" />
                        <p className="text-xs text-slate-500 mt-1">{skill.students}名学生已掌握</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 风险应对专项分析 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    风险应对专项分析
                  </CardTitle>
                  <CardDescription>风险应对实训成绩分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-xl font-bold text-green-600">68</p>
                        <p className="text-xs text-green-600">优秀(≥90)</p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-xl font-bold text-blue-600">35</p>
                        <p className="text-xs text-blue-600">良好(80-89)</p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-xl font-bold text-amber-600">18</p>
                        <p className="text-xs text-amber-600">及格(60-79)</p>
                      </div>
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-xl font-bold text-red-600">4</p>
                        <p className="text-xs text-red-600">未通过(&lt;60)</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50">
                      <p className="text-sm font-medium text-slate-700 mb-2">AI内容检测统计</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-slate-600">通过检测: 112人(89%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-slate-600">未通过: 13人(11%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-sm font-medium text-amber-800 mb-1">薄弱环节分析</p>
                      <ul className="text-xs text-amber-700 space-y-1">
                        <li>• 响应速度平均得分最低(14.2/20)</li>
                        <li>• 合规意识得分波动较大</li>
                        <li>• 建议加强实时危机处理训练</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 预警中心 */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm bg-red-50 border border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">2</p>
                      <p className="text-xs text-red-600">高风险预警</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-amber-50 border border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-600">3</p>
                      <p className="text-xs text-amber-600">中等预警</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-blue-50 border border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                      <p className="text-xs text-blue-600">进度关注</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-green-50 border border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">112</p>
                      <p className="text-xs text-green-600">正常学习</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 预警列表 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>预警学生列表</CardTitle>
                  <div className="flex gap-2">
                    <select className="h-8 px-3 border rounded-lg text-sm">
                      <option>全部类型</option>
                      <option>AI依赖过高</option>
                      <option>进度落后</option>
                      <option>考核未通过</option>
                    </select>
                    <select className="h-8 px-3 border rounded-lg text-sm">
                      <option>全部等级</option>
                      <option>高风险</option>
                      <option>中等</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertStudents.map((student) => (
                    <div key={student.id} className={`flex items-center gap-4 p-4 rounded-xl ${
                      student.severity === 'high' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        student.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                      }`}>
                        {student.type === 'ai_overuse' && <Brain className="h-5 w-5 text-red-600" />}
                        {student.type === 'progress_lag' && <Clock className="h-5 w-5 text-amber-600" />}
                        {student.type === 'risk_fail' && <AlertCircle className="h-5 w-5 text-red-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-800">{student.name}</span>
                          <Badge variant={student.severity === 'high' ? 'destructive' : 'default'} className="text-xs">
                            {student.severity === 'high' ? '高风险' : '中等'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{student.class}</Badge>
                        </div>
                        <p className="text-sm text-slate-600">{student.message}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                        <Button size="sm">
                          发送提醒
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI预警建议 */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Sparkles className="h-5 w-5" />
                  AI预警处理建议
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white border border-purple-200">
                    <h4 className="font-medium text-slate-800 mb-2">AI依赖过高处理方案</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 与学生一对一沟通，了解过度依赖AI的原因</li>
                      <li>• 强调AI耦合度超过60%将导致风险应对实训0分</li>
                      <li>• 引导学生将AI作为辅助工具，而非替代思考</li>
                      <li>• 安排专项训练，培养独立决策能力</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-purple-200">
                    <h4 className="font-medium text-slate-800 mb-2">进度落后干预措施</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 及时发送提醒通知</li>
                      <li>• 分析进度落后的具体原因</li>
                      <li>• 提供额外辅导或延长截止时间</li>
                      <li>• 鼓励同学互助学习</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI生成的分析报告 */}
        {aiReport && (
          <Card className="mt-6 border-0 shadow-lg border-purple-200 bg-purple-50/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  AI生成分析报告
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    重新生成
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    导出PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: aiReport }} />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
