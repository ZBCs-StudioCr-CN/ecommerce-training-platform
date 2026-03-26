'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap, BookOpen, Users, Award, BarChart3, MessageCircle, Settings, Bell, Globe,
  Search, CheckCircle, XCircle, ChevronRight, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const menuItems = [
  { id: 'dashboard', label: '教学控制台', icon: GraduationCap, href: '/teacher/dashboard' },
  { id: 'courses', label: '课程管理', icon: BookOpen, href: '/teacher/courses' },
  { id: 'practice', label: '实训管理', icon: Users, href: '/teacher/practice' },
  { id: 'grading', label: '考核评分', icon: Award, href: '/teacher/grading' },
  { id: 'analysis', label: '学情分析', icon: BarChart3, href: '/teacher/analysis' },
  { id: 'qa', label: '答疑社区', icon: MessageCircle, href: '/teacher/qa' },
];

const submissions = [
  { id: 1, student: '张小明', avatar: '张', exam: '独立站搭建考核', autoScore: 85, totalScore: 100, status: 'pending', submitTime: '2026-03-26 14:30' },
  { id: 2, student: '李小红', avatar: '李', exam: '市场调研报告', autoScore: 72, totalScore: 100, status: 'pending', submitTime: '2026-03-26 15:00' },
  { id: 3, student: '王小明', avatar: '王', exam: '独立站搭建考核', autoScore: 90, totalScore: 100, status: 'graded', submitTime: '2026-03-25 16:00' },
  { id: 4, student: '陈小华', avatar: '陈', exam: '流量推广考核', autoScore: 88, totalScore: 100, status: 'graded', submitTime: '2026-03-25 17:30' },
];

export default function TeacherGradingPage() {
  const [activeMenu, setActiveMenu] = useState('grading');

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
          <h2 className="text-2xl font-bold text-slate-800">考核评分</h2>
          <p className="text-slate-500">人工批改主观题与策略题，添加批注反馈</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">待批改</p>
              <p className="text-2xl font-bold text-amber-500">12份</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">已批改</p>
              <p className="text-2xl font-bold text-green-600">28份</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">平均分</p>
              <p className="text-2xl font-bold text-slate-800">82.5分</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>答卷列表</CardTitle>
                <CardDescription>点击进入批改页面</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <select className="h-9 px-3 border rounded-lg text-sm">
                  <option>全部状态</option>
                  <option>待批改</option>
                  <option>已批改</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    {sub.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">{sub.student}</span>
                      <Badge variant="outline">{sub.exam}</Badge>
                    </div>
                    <p className="text-sm text-slate-500">提交时间：{sub.submitTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">系统评分</p>
                    <p className="text-lg font-bold text-slate-800">{sub.autoScore}/{sub.totalScore}</p>
                  </div>
                  <Badge className={sub.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}>
                    {sub.status === 'pending' ? '待批改' : '已批改'}
                  </Badge>
                  <Button size="sm">{sub.status === 'pending' ? '开始批改' : '查看详情'}</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
