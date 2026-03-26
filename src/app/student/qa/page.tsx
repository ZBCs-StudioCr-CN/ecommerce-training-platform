'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, BookOpen, Store, Award, FileText, MessageCircle, Bell, Globe,
  Send, Clock, Search, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const menuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
];

const questions = [
  { id: 1, question: '如何设置GDPR合规弹窗？', course: '独立站搭建', time: '2026-03-26 14:30', status: 'answered', answer: '可以在店铺设置→合规设置中开启GDPR弹窗，系统会自动生成符合欧盟标准的弹窗模板...' },
  { id: 2, question: 'Google Ads关键词出价策略怎么选？', course: '流量推广', time: '2026-03-25 10:00', status: 'pending', answer: null },
  { id: 3, question: '竞品分析报告怎么写？', course: '市场调研', time: '2026-03-24 16:20', status: 'answered', answer: '竞品分析报告应包含以下部分：1.市场概况 2.竞争对手画像 3.产品对比分析...' },
];

export default function StudentQAPage() {
  const [activeMenu, setActiveMenu] = useState('qa');
  const [newQuestion, setNewQuestion] = useState('');

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/login" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
              <p className="text-xs text-slate-500">学生端</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5 text-slate-600" /></Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">张</div>
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMenu === item.id ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'text-slate-600 hover:bg-slate-100'
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
          <h2 className="text-2xl font-bold text-slate-800">答疑提问</h2>
          <p className="text-slate-500">向教师提问，查看历史答疑记录</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>提交问题</CardTitle>
              <CardDescription>选择课程模块，描述你的问题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">课程模块</label>
                  <select className="w-full h-10 px-3 border rounded-lg text-sm">
                    <option>请选择课程模块</option>
                    <option>市场调研与选品</option>
                    <option>独立站搭建</option>
                    <option>流量推广</option>
                    <option>转化运营</option>
                    <option>数据分析</option>
                    <option>合规风控</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">问题描述</label>
                  <Textarea 
                    placeholder="请详细描述你的问题..." 
                    className="min-h-32"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </div>
                <Button className="w-full" disabled={!newQuestion.trim()}>
                  <Send className="h-4 w-4 mr-2" />提交问题
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>我的提问记录</CardTitle>
              <CardDescription>查看历史问题与教师回复</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {questions.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{q.course}</Badge>
                      <Badge className={q.status === 'answered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                        {q.status === 'answered' ? '已回复' : '待回复'}
                      </Badge>
                    </div>
                    <p className="font-medium text-slate-800 mb-2">{q.question}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                      <Clock className="h-3 w-3" />{q.time}
                    </p>
                    {q.answer && (
                      <div className="p-3 bg-emerald-50 rounded-lg">
                        <p className="text-sm text-slate-600">{q.answer}</p>
                      </div>
                    )}
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
