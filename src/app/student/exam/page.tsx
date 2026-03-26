'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  Store,
  Award,
  FileText,
  MessageCircle,
  Bell,
  LogOut,
  Globe,
  Clock,
  CheckCircle2,
  Play,
  ChevronRight,
  Star,
  AlertCircle,
  Download,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const menuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
];

const pendingExams = [
  { id: 1, title: '期末综合考核', course: '独立站运营', startTime: '2026-03-30 14:00', duration: '90分钟', totalScore: 100, status: 'pending' },
  { id: 2, title: '流量推广测验', course: '流量推广', startTime: '2026-04-02 10:00', duration: '45分钟', totalScore: 50, status: 'pending' },
];

const completedExams = [
  { id: 3, title: '市场调研测验', course: '市场调研与选品', score: 92, totalScore: 100, rank: 3, time: '2026-03-15' },
  { id: 4, title: '独立站搭建考核', course: '独立站搭建', score: 88, totalScore: 100, rank: 5, time: '2026-03-20' },
  { id: 5, title: '理论测试一', course: '独立站认知', score: 95, totalScore: 100, rank: 2, time: '2026-03-10' },
];

const examStats = {
  total: 15,
  completed: 12,
  avgScore: 91.5,
  passRate: 100,
};

export default function ExamCenterPage() {
  const [activeMenu, setActiveMenu] = useState('exam');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
                <p className="text-xs text-slate-500">学生端</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">张三</p>
                <p className="text-xs text-slate-500">电商2201班</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">张</div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200/80 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-60 pt-16 min-h-screen p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">考核中心</h2>
          <p className="text-slate-500">完成考核答题、实操考核，查看成绩与错题解析</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-slate-800">{examStats.total}</p>
              <p className="text-sm text-slate-500">总考核数</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-green-600">{examStats.completed}</p>
              <p className="text-sm text-slate-500">已完成</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">{examStats.avgScore}</p>
              <p className="text-sm text-slate-500">平均成绩</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-amber-600">{examStats.passRate}%</p>
              <p className="text-sm text-slate-500">通过率</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="pending" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              待完成考核
              <Badge variant="destructive" className="ml-1">{pendingExams.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              已完成考核
            </TabsTrigger>
          </TabsList>

          {/* 待完成考核 */}
          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingExams.map((exam) => (
                <Card key={exam.id} className="border-0 shadow-lg shadow-slate-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Award className="h-7 w-7 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{exam.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                            <span>{exam.course}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {exam.startTime}
                            </span>
                            <span>时长 {exam.duration}</span>
                            <span>满分 {exam.totalScore} 分</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-amber-100 text-amber-700">待参加</Badge>
                        <Button>
                          <Play className="h-4 w-4 mr-2" />
                          进入考核
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingExams.length === 0 && (
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardContent className="p-12 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">暂无待完成考核</h3>
                    <p className="text-slate-500">继续保持学习，等待老师发布新考核</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* 已完成考核 */}
          <TabsContent value="completed">
            <div className="space-y-4">
              {completedExams.map((exam) => (
                <Card key={exam.id} className="border-0 shadow-lg shadow-slate-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          exam.score >= 90 ? 'bg-green-100' : exam.score >= 60 ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          <span className={`text-2xl font-bold ${
                            exam.score >= 90 ? 'text-green-600' : exam.score >= 60 ? 'text-blue-600' : 'text-red-600'
                          }`}>{exam.score}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{exam.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                            <span>{exam.course}</span>
                            <span>完成时间：{exam.time}</span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-amber-500" />
                              班级排名第 {exam.rank} 名
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-green-100 text-green-700">已通过</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
