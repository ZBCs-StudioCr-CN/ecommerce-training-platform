'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap, BookOpen, Users, Award, BarChart3, MessageCircle, Settings, Bell, Globe,
  Search, Send, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const questions = [
  { id: 1, student: '张小明', avatar: '张', course: '独立站搭建', question: '如何设置GDPR合规弹窗？', time: '10分钟前', status: 'pending' },
  { id: 2, student: '李小红', avatar: '李', course: '流量推广', question: 'Google Ads关键词出价策略怎么选？', time: '30分钟前', status: 'pending' },
  { id: 3, student: '王小明', avatar: '王', course: '市场调研', question: '竞品分析报告怎么写？', time: '2小时前', status: 'answered' },
];

export default function TeacherQAPage() {
  const [activeMenu, setActiveMenu] = useState('qa');

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
          <h2 className="text-2xl font-bold text-slate-800">答疑社区</h2>
          <p className="text-slate-500">回复学生提问，沉淀常见问题库</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">待回复</p>
              <p className="text-2xl font-bold text-amber-500">8条</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">已回复</p>
              <p className="text-2xl font-bold text-green-600">156条</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">平均响应</p>
              <p className="text-2xl font-bold text-slate-800">2.5小时</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>问题列表</CardTitle>
            <CardDescription>按时间排序，优先处理待回复问题</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0">
                      {q.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-slate-800">{q.student}</span>
                        <Badge variant="outline">{q.course}</Badge>
                        <Badge className={q.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}>
                          {q.status === 'pending' ? '待回复' : '已回复'}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{q.question}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" />{q.time}</span>
                        {q.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <Input placeholder="输入回复..." className="w-80 h-8" />
                            <Button size="sm"><Send className="h-4 w-4" /></Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
