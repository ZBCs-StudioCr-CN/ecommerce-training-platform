'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Users, School, BarChart3, Trophy, Settings, Bell, LogOut, Globe,
  Download, Calendar, TrendingUp, TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  { id: 'dashboard', label: '数据总览', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'accounts', label: '账号管理', icon: Users, href: '/admin/accounts' },
  { id: 'classes', label: '班级管理', icon: School, href: '/admin/classes' },
  { id: 'reports', label: '数据报表', icon: BarChart3, href: '/admin/reports' },
  { id: 'competitions', label: '竞赛管理', icon: Trophy, href: '/admin/competitions' },
  { id: 'settings', label: '系统设置', icon: Settings, href: '/admin/settings' },
];

export default function AdminReportsPage() {
  const [activeMenu, setActiveMenu] = useState('reports');

  const reports = [
    { id: 1, name: '全校实训数据周报', type: 'weekly', date: '2026-03-26', status: 'ready' },
    { id: 2, name: '电商2201班学情报告', type: 'class', date: '2026-03-25', status: 'ready' },
    { id: 3, name: '3月份实训完成率统计', type: 'monthly', date: '2026-03-20', status: 'ready' },
    { id: 4, name: '技能竞赛成绩汇总', type: 'competition', date: '2026-03-18', status: 'ready' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
              <p className="text-xs text-slate-500">管理员端</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5 text-slate-600" /></Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">张</div>
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMenu === item.id ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-60 pt-16 min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">数据报表</h2>
            <p className="text-slate-500">导出全校实训数据报表，支持教学评估与双高建设上报</p>
          </div>
          <Button><Download className="h-4 w-4 mr-2" />生成报表</Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: '本周实训完成率', value: '78.5%', change: '+5.2%', up: true },
            { label: '本周考核通过率', value: '92.3%', change: '+2.1%', up: true },
            { label: '活跃学生数', value: '1,156', change: '+86', up: true },
            { label: '平均成绩', value: '85.6分', change: '-1.2分', up: false },
          ].map((stat, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.up ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                  <span className={stat.up ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>报表列表</CardTitle>
            <CardDescription>已生成的数据报表，点击下载</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-violet-300 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{report.name}</p>
                    <p className="text-sm text-slate-500">生成时间：{report.date}</p>
                  </div>
                  <Badge variant="outline">
                    {report.type === 'weekly' ? '周报' : report.type === 'class' ? '班级报告' : report.type === 'monthly' ? '月报' : '竞赛报告'}
                  </Badge>
                  <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />下载</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
