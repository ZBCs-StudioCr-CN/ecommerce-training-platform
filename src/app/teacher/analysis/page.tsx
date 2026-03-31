'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Globe,
  LogOut,
  BarChart3,
  TrendingUp,
  Target,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { teacherMenuItems } from '@/config/menu';

export default function TeacherAnalysisPage() {
  const [activeMenu, setActiveMenu] = useState('analysis');

  const skills = [
    { name: '市场调研', mastery: 85, students: 42 },
    { name: '独立站搭建', mastery: 72, students: 38 },
    { name: '流量推广', mastery: 68, students: 35 },
    { name: '转化运营', mastery: 75, students: 40 },
    { name: '数据分析', mastery: 80, students: 42 },
    { name: '合规风控', mastery: 90, students: 45 },
  ];

  const classPerformance = [
    { name: '电商2201班', avgScore: 85.2, completion: 92 },
    { name: '跨境电商2203班', avgScore: 82.5, completion: 88 },
    { name: '电商2202班', avgScore: 79.8, completion: 85 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/login" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">学情分析</h2>
          <p className="text-slate-500">分析学生学习情况和技能掌握程度</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
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
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">78%</p>
                  <p className="text-sm text-slate-500">技能掌握</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>技能掌握情况</CardTitle>
              <CardDescription>各技能模块的学生掌握程度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.students}名学生</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={skill.mastery} className="flex-1 h-2" />
                      <span className="text-sm font-medium text-slate-600">{skill.mastery}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>班级表现</CardTitle>
              <CardDescription>各班级的学习成绩对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classPerformance.map((cls) => (
                  <div key={cls.name} className="p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-slate-800">{cls.name}</span>
                      <span className="text-lg font-bold text-blue-600">{cls.avgScore}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-500">完成率</span>
                      <Progress value={cls.completion} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{cls.completion}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
