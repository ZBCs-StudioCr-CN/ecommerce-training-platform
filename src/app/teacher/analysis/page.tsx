'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap, BookOpen, Users, Award, BarChart3, MessageCircle, Settings, Bell, Globe,
  TrendingUp, TrendingDown, Target, Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const menuItems = [
  { id: 'dashboard', label: '教学控制台', icon: GraduationCap, href: '/teacher/dashboard' },
  { id: 'courses', label: '课程管理', icon: BookOpen, href: '/teacher/courses' },
  { id: 'practice', label: '实训管理', icon: Users, href: '/teacher/practice' },
  { id: 'grading', label: '考核评分', icon: Award, href: '/teacher/grading' },
  { id: 'analysis', label: '学情分析', icon: BarChart3, href: '/teacher/analysis' },
  { id: 'qa', label: '答疑社区', icon: MessageCircle, href: '/teacher/qa' },
];

const skills = [
  { name: '市场调研', mastery: 85, students: 42 },
  { name: '独立站搭建', mastery: 72, students: 38 },
  { name: '流量推广', mastery: 68, students: 35 },
  { name: '转化运营', mastery: 60, students: 28 },
  { name: '数据分析', mastery: 55, students: 25 },
];

export default function TeacherAnalysisPage() {
  const [activeMenu, setActiveMenu] = useState('analysis');

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/login" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
              <p className="text-xs text-slate-500">教师端</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5 text-slate-600" /></Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">王</div>
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMenu === item.id ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-60 pt-16 min-h-screen p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">学情分析</h2>
          <p className="text-slate-500">班级学情看板，知识点掌握率与薄弱项分析</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: '平均成绩', value: '82.5', unit: '分', change: '+3.2', up: true },
            { label: '考核通过率', value: '92', unit: '%', change: '+5', up: true },
            { label: '实训完成率', value: '78', unit: '%', change: '+8', up: true },
            { label: '活跃学生', value: '38', unit: '人', change: '-2', up: false },
          ].map((stat, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-4">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <div className="flex items-end gap-1">
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <span className="text-sm text-slate-500 mb-1">{stat.unit}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.up ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                  <span className={stat.up ? 'text-xs text-green-600' : 'text-xs text-red-600'}>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-blue-500" />技能掌握情况</CardTitle>
              <CardDescription>各模块知识点掌握率</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{skill.students}人已学</span>
                        <span className="text-sm font-semibold text-slate-800">{skill.mastery}%</span>
                      </div>
                    </div>
                    <Progress value={skill.mastery} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-amber-500" />薄弱项诊断</CardTitle>
              <CardDescription>需要重点辅导的知识点</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { topic: 'SEO优化策略', rate: 45, suggestion: '建议增加实操案例' },
                  { topic: '广告ROI分析', rate: 52, suggestion: '建议补充理论讲解' },
                  { topic: '跨境物流选择', rate: 58, suggestion: '建议对比讲解各渠道' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-800">{item.topic}</span>
                      <span className="text-sm text-amber-600">掌握率 {item.rate}%</span>
                    </div>
                    <p className="text-sm text-slate-600">{item.suggestion}</p>
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
