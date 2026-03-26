'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, BookOpen, Store, Award, FileText, MessageCircle, Bell, Globe,
  Target, ShoppingCart, Megaphone, TrendingUp, PieChart, Shield, ChevronRight, Clock, CheckCircle2, Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const menuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
];

const practiceModules = [
  { 
    id: 1, 
    title: '市场调研与选品', 
    description: '学习海外市场分析方法，掌握选品策略与定价技巧',
    icon: Target, 
    progress: 100, 
    status: 'completed', 
    score: 92,
    href: '/student/practice/research',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 2, 
    title: '独立站搭建', 
    description: '1:1复刻Shopify建站流程，拖拽装修、商品管理、配置设置',
    icon: ShoppingCart, 
    progress: 75, 
    status: 'in_progress', 
    score: null,
    href: '/student/practice/build',
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    id: 3, 
    title: '流量推广', 
    description: '模拟Google/Facebook/TikTok广告投放，SEO优化全流程',
    icon: Megaphone, 
    progress: 0, 
    status: 'pending', 
    score: null,
    href: '/student/practice/marketing',
    color: 'from-orange-500 to-red-500'
  },
  { 
    id: 4, 
    title: '转化运营', 
    description: '营销活动创建、优惠券管理、邮件营销、客诉处理',
    icon: TrendingUp, 
    progress: 0, 
    status: 'pending', 
    score: null,
    href: '/student/practice/operations',
    color: 'from-violet-500 to-purple-500'
  },
  { 
    id: 5, 
    title: '数据分析', 
    description: '数据看板解读、转化漏斗分析、异常归因、优化建议',
    icon: PieChart, 
    progress: 0, 
    status: 'pending', 
    score: null,
    href: '/student/practice/analytics',
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    id: 6, 
    title: '合规风控', 
    description: 'GDPR合规设置、隐私政策、风险场景应急处理',
    icon: Shield, 
    progress: 0, 
    status: 'pending', 
    score: null,
    href: '/student/practice/compliance',
    color: 'from-slate-500 to-zinc-600'
  },
];

export default function StudentPracticePage() {
  const [activeMenu, setActiveMenu] = useState('practice');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-700 border-green-200">已完成</Badge>;
      case 'in_progress': return <Badge className="bg-blue-100 text-blue-700 border-blue-200">进行中</Badge>;
      case 'pending': return <Badge variant="secondary">未开始</Badge>;
      case 'locked': return <Badge variant="outline" className="text-gray-400">待解锁</Badge>;
      default: return null;
    }
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case 'completed': return '查看成果';
      case 'in_progress': return '继续实训';
      case 'pending': return '开始实训';
      case 'locked': return '待解锁';
      default: return '开始实训';
    }
  };

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
          <h2 className="text-2xl font-bold text-slate-800">仿真实训</h2>
          <p className="text-slate-500">分项技能实训，逐步掌握独立站运营核心技能</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">已完成模块</p>
              <p className="text-2xl font-bold text-green-600">1/6</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">总分</p>
              <p className="text-2xl font-bold text-slate-800">92分</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">剩余时间</p>
              <p className="text-2xl font-bold text-amber-500">3天</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {practiceModules.map((module) => (
            <Card key={module.id} className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${module.status === 'locked' ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${module.color}`}>
                    <module.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-800">{module.title}</h3>
                      {getStatusBadge(module.status)}
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{module.description}</p>
                    {module.progress > 0 && (
                      <div className="mb-3">
                        <Progress value={module.progress} className="h-2 mb-1" />
                        <span className="text-xs text-slate-500">{module.progress}% 完成</span>
                      </div>
                    )}
                    {module.score && (
                      <p className="text-sm text-green-600 font-medium">得分：{module.score}分</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link href={module.href} className="block">
                    <Button 
                      className="w-full" 
                      disabled={module.status === 'locked'} 
                      variant={module.status === 'in_progress' ? 'default' : 'outline'}
                    >
                      {module.status === 'in_progress' && <Play className="h-4 w-4 mr-2" />}
                      {getButtonText(module.status)}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comprehensive Project */}
        <Card className="border-0 shadow-lg mt-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">综合项目实战</h3>
                <p className="text-violet-100">完成从0到1的独立站全流程运营，生成运营报告与作品集</p>
              </div>
              <div className="text-right">
                <Badge className="bg-white/20 text-white border-0 mb-2">需完成全部分项实训</Badge>
                <br />
                <Button variant="secondary" disabled>解锁综合实战</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
