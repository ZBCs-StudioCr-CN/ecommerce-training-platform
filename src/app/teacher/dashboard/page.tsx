'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  LogOut,
  Globe,
  Users,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Play,
  FileText,
  Target,
  Plus,
  Search,
  MessageCircle,
  Award,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { teacherMenuItems } from '@/config/menu';
import { useLogout } from '@/lib/auth';

export default function TeacherDashboard() {
  const router = useRouter();
  const handleLogout = useLogout();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const classStats = [
    { id: 1, name: '电商2201班', students: 42, completion: 85, avgScore: 87.5, pending: 5 },
    { id: 2, name: '跨境电商2203班', students: 38, completion: 78, avgScore: 82.3, pending: 8 },
    { id: 3, name: '电商2202班', students: 45, completion: 72, avgScore: 79.8, pending: 12 },
  ];

  const pendingTasks = [
    { id: 1, type: 'grading', title: '电商2201班 - 市场调研报告待批改', count: 15, urgent: true },
    { id: 2, type: 'practice', title: '跨境电商2203班 - 实训进度落后预警', count: 8, urgent: true },
    { id: 3, type: 'qa', title: '学生答疑待回复', count: 12, urgent: false },
    { id: 4, type: 'exam', title: '电商2202班 - 期末考核待发布', count: 1, urgent: false },
  ];

  const recentPractices = [
    { id: 1, title: '独立站搭建实训', class: '电商2201班', status: '进行中', progress: 65, endDate: '2026-03-30' },
    { id: 2, title: '市场调研与选品', class: '跨境电商2203班', status: '已结束', progress: 100, endDate: '2026-03-20' },
    { id: 3, title: '流量推广模拟', class: '电商2202班', status: '未开始', progress: 0, endDate: '2026-04-05' },
  ];

  const weakPoints = [
    { skill: '流量推广', avgScore: 68, suggestion: '建议加强广告投放策略教学' },
    { skill: '转化运营', avgScore: 71, suggestion: '可增加弃购挽回案例分析' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2">
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
                8
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

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {teacherMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
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

      {/* 主内容区 */}
      <main className="ml-60 pt-16 min-h-screen p-6">
        {/* 欢迎横幅 */}
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">欢迎回来，王老师！</h2>
              <p className="text-blue-100">今天有 3 个班级的实训课程，2 项待办任务需要处理</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary">
                <Plus className="h-4 w-4 mr-2" />
                发布实训任务
              </Button>
              <Button variant="secondary">
                <FileText className="h-4 w-4 mr-2" />
                进入课堂
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：班级概览 + 实训进度 */}
          <div className="col-span-2 space-y-6">
            {/* 待办任务 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>待办任务</CardTitle>
                  <CardDescription>需要您处理的紧急事项</CardDescription>
                </div>
                <Badge variant="destructive">4项待处理</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer ${
                        task.urgent ? 'bg-red-50 hover:bg-red-100' : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        task.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {task.type === 'grading' && <FileText className="h-5 w-5" />}
                        {task.type === 'practice' && <AlertCircle className="h-5 w-5" />}
                        {task.type === 'qa' && <MessageCircle className="h-5 w-5" />}
                        {task.type === 'exam' && <Award className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{task.title}</p>
                        <p className="text-sm text-slate-500">{task.count} 项待处理</p>
                      </div>
                      {task.urgent && (
                        <Badge variant="destructive" className="animate-pulse">紧急</Badge>
                      )}
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 班级概览 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>我的班级</CardTitle>
                  <CardDescription>管辖班级的实训进度一览</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  查看全部
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classStats.map((cls) => (
                    <div key={cls.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{cls.name}</p>
                            <p className="text-xs text-slate-500">{cls.students} 名学生</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-slate-800">{cls.avgScore}</p>
                            <p className="text-xs text-slate-500">平均分</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-amber-600">{cls.pending}</p>
                            <p className="text-xs text-slate-500">待辅导</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-500">实训完成率</span>
                            <span className="font-medium">{cls.completion}%</span>
                          </div>
                          <Progress value={cls.completion} className="h-2" />
                        </div>
                        <Button size="sm" variant="outline">
                          进入班级
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 实训任务列表 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>实训任务</CardTitle>
                  <CardDescription>最近发布和进行中的实训任务</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  发布任务
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPractices.map((practice) => (
                    <div key={practice.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-200">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        practice.status === '进行中' ? 'bg-blue-100 text-blue-600' :
                        practice.status === '已结束' ? 'bg-green-100 text-green-600' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {practice.status === '进行中' ? <Play className="h-5 w-5" /> :
                         practice.status === '已结束' ? <CheckCircle2 className="h-5 w-5" /> :
                         <Clock className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{practice.title}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span>{practice.class}</span>
                          <span>·</span>
                          <span>截止：{practice.endDate}</span>
                        </div>
                      </div>
                      <div className="w-32">
                        <Progress value={practice.progress} className="h-2" />
                        <p className="text-xs text-slate-500 text-center mt-1">{practice.progress}%</p>
                      </div>
                      <Badge variant={
                        practice.status === '进行中' ? 'default' :
                        practice.status === '已结束' ? 'secondary' :
                        'outline'
                      }>
                        {practice.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：学情分析 + 快捷操作 */}
          <div className="space-y-6">
            {/* 今日课程 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  今日课程
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800">独立站搭建实训</span>
                    <Badge className="bg-blue-500">进行中</Badge>
                  </div>
                  <p className="text-xs text-blue-600">电商2201班 · 08:00-09:40</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">流量推广理论</span>
                    <Badge variant="outline">14:00-15:40</Badge>
                  </div>
                  <p className="text-xs text-slate-500">跨境电商2203班</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">数据分析实战</span>
                    <Badge variant="outline">16:00-17:40</Badge>
                  </div>
                  <p className="text-xs text-slate-500">电商2202班</p>
                </div>
              </CardContent>
            </Card>

            {/* 知识点薄弱项 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-500" />
                  知识点薄弱项
                </CardTitle>
                <CardDescription>需要重点讲解的技能模块</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakPoints.map((item, index) => (
                    <div key={index} className="p-3 rounded-lg border border-amber-200 bg-amber-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-amber-800">{item.skill}</span>
                        <span className="text-lg font-bold text-amber-600">{item.avgScore}分</span>
                      </div>
                      <p className="text-xs text-amber-600">{item.suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 快捷操作 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle>快捷操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  发布实训任务
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  批改作业
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  回复答疑
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  查看学情
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
