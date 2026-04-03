'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  School,
  BarChart3,
  Trophy,
  Settings,
  Bell,
  LogOut,
  Globe,
  User,
  TrendingUp,
  TrendingDown,
  Users2,
  BookOpen,
  ClipboardCheck,
  Download,
  Calendar,
  ChevronRight,
  Search,
  Plus,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useLogout } from '@/lib/auth';

const menuItems = [
  { id: 'dashboard', label: '数据总览', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'accounts', label: '账号管理', icon: Users, href: '/admin/accounts' },
  { id: 'classes', label: '班级管理', icon: School, href: '/admin/classes' },
  { id: 'reports', label: '数据报表', icon: BarChart3, href: '/admin/reports' },
  { id: 'competitions', label: '竞赛管理', icon: Trophy, href: '/admin/competitions' },
  { id: 'settings', label: '系统设置', icon: Settings, href: '/admin/settings' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const handleLogout = useLogout();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const statsData = [
    {
      title: '学生总数',
      value: '1,286',
      change: '+56',
      trend: 'up',
      icon: Users2,
      color: 'blue',
      description: '较上月',
    },
    {
      title: '教师总数',
      value: '48',
      change: '+3',
      trend: 'up',
      icon: User,
      color: 'green',
      description: '较上月',
    },
    {
      title: '实训完成率',
      value: '78.5%',
      change: '+12.3%',
      trend: 'up',
      icon: ClipboardCheck,
      color: 'purple',
      description: '较上周',
    },
    {
      title: '考核通过率',
      value: '92.3%',
      change: '-2.1%',
      trend: 'down',
      icon: BookOpen,
      color: 'amber',
      description: '较上周',
    },
  ];

  const classRanking = [
    { rank: 1, name: '电商2201班', completion: 95, avgScore: 89.2, students: 42 },
    { rank: 2, name: '跨境电商2203班', completion: 92, avgScore: 87.8, students: 38 },
    { rank: 3, name: '电商2202班', completion: 88, avgScore: 85.5, students: 45 },
    { rank: 4, name: '跨境电商2201班', completion: 85, avgScore: 83.2, students: 40 },
    { rank: 5, name: '电商2101班', completion: 82, avgScore: 81.5, students: 43 },
  ];

  const recentActivities = [
    { time: '10:30', action: '新增学生账号', user: '管理员张', target: '32名学生' },
    { time: '09:15', action: '创建竞赛', user: '管理员张', target: '跨境电商技能竞赛' },
    { time: '昨天', action: '导出报表', user: '管理员李', target: '3月实训数据报表' },
    { time: '昨天', action: '系统配置', user: '管理员张', target: '更新院校Logo' },
  ];

  const topStudents = [
    { rank: 1, name: '王小明', class: '电商2201班', score: 98.5, avatar: '王' },
    { rank: 2, name: '李晓红', class: '跨境电商2203班', score: 97.2, avatar: '李' },
    { rank: 3, name: '张志强', class: '电商2201班', score: 96.8, avatar: '张' },
    { rank: 4, name: '刘美玲', class: '电商2202班', score: 95.5, avatar: '刘' },
    { rank: 5, name: '陈建国', class: '跨境电商2201班', score: 94.8, avatar: '陈' },
  ];

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

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25'
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
        {/* 页面标题 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">数据总览</h2>
          <p className="text-slate-500">查看全校实训数据统计与学情分析</p>
        </div>

        {/* 核心指标卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {statsData.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-lg shadow-slate-200/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    stat.color === 'green' ? 'bg-green-100 text-green-600' :
                    stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-slate-400">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：班级排名 + 技能统计 */}
          <div className="col-span-2 space-y-6">
            {/* 班级排名 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>班级排名</CardTitle>
                  <CardDescription>按实训完成率与平均成绩综合排名</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  导出排名
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classRanking.map((cls) => (
                    <div
                      key={cls.rank}
                      className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        cls.rank === 1 ? 'bg-amber-100 text-amber-700' :
                        cls.rank === 2 ? 'bg-slate-200 text-slate-600' :
                        cls.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {cls.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{cls.name}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span>{cls.students}名学生</span>
                          <span>平均成绩 {cls.avgScore}分</span>
                        </div>
                      </div>
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">完成率</span>
                          <span className="font-medium">{cls.completion}%</span>
                        </div>
                        <Progress value={cls.completion} className="h-2" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 技能模块统计 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>技能模块掌握情况</CardTitle>
                <CardDescription>全校学生各技能模块平均得分</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: '市场调研与选品', score: 85, students: 1245 },
                    { name: '独立站搭建', score: 72, students: 1120 },
                    { name: '流量推广', score: 68, students: 856 },
                    { name: '转化运营', score: 71, students: 780 },
                    { name: '数据分析', score: 76, students: 920 },
                    { name: '合规风控', score: 82, students: 1050 },
                  ].map((module) => (
                    <div key={module.name} className="p-4 rounded-xl border border-slate-200 bg-white">
                      <p className="font-medium text-slate-800 mb-2">{module.name}</p>
                      <div className="flex items-end justify-between mb-2">
                        <span className="text-2xl font-bold text-blue-600">{module.score}</span>
                        <span className="text-xs text-slate-500">{module.students}人已学习</span>
                      </div>
                      <Progress value={module.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：活动日志 + 学生榜 */}
          <div className="space-y-6">
            {/* 学生榜 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  学生排行榜
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topStudents.map((student) => (
                    <div
                      key={student.rank}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        student.rank === 1 ? 'bg-amber-100 text-amber-700' :
                        student.rank === 2 ? 'bg-slate-200 text-slate-600' :
                        student.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {student.rank}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium">
                        {student.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{student.name}</p>
                        <p className="text-xs text-slate-500 truncate">{student.class}</p>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {student.score}分
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 最近活动 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>最近活动</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-800">
                          <span className="font-medium">{activity.user}</span>
                          {activity.action}
                        </p>
                        <p className="text-xs text-slate-500">{activity.target}</p>
                      </div>
                      <span className="text-xs text-slate-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 快捷操作 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-violet-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>快捷操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" className="w-full justify-start" asChild>
                  <Link href="/admin/accounts">
                    <Plus className="h-4 w-4 mr-2" />
                    批量导入账号
                  </Link>
                </Button>
                <Button variant="secondary" className="w-full justify-start" asChild>
                  <Link href="/admin/competitions">
                    <Trophy className="h-4 w-4 mr-2" />
                    创建技能竞赛
                  </Link>
                </Button>
                <Button variant="secondary" className="w-full justify-start" asChild>
                  <Link href="/admin/reports">
                    <Download className="h-4 w-4 mr-2" />
                    导出数据报表
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
