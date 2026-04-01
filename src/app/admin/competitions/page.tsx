'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Users, School, BarChart3, Trophy, Settings, Bell, LogOut, Globe,
  Plus, Search, Calendar, Users2, Award, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

const menuItems = [
  { id: 'dashboard', label: '数据总览', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'accounts', label: '账号管理', icon: Users, href: '/admin/accounts' },
  { id: 'classes', label: '班级管理', icon: School, href: '/admin/classes' },
  { id: 'reports', label: '数据报表', icon: BarChart3, href: '/admin/reports' },
  { id: 'competitions', label: '竞赛管理', icon: Trophy, href: '/admin/competitions' },
  { id: 'settings', label: '系统设置', icon: Settings, href: '/admin/settings' },
];

const competitions = [
  { id: 1, name: '跨境电商技能竞赛', status: 'ongoing', participants: 128, startDate: '2026-03-20', endDate: '2026-04-10' },
  { id: 2, name: '独立站搭建大赛', status: 'upcoming', participants: 0, startDate: '2026-04-15', endDate: '2026-04-30' },
  { id: 3, name: '2025年度电商技能大赛', status: 'ended', participants: 256, startDate: '2025-11-01', endDate: '2025-11-30' },
];

export default function AdminCompetitionsPage() {
  const [activeMenu, setActiveMenu] = useState('competitions');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ongoing': return <Badge className="bg-green-100 text-green-700">进行中</Badge>;
      case 'upcoming': return <Badge className="bg-blue-100 text-blue-700">即将开始</Badge>;
      case 'ended': return <Badge variant="secondary">已结束</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/login" className="flex items-center gap-2">
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
            <h2 className="text-2xl font-bold text-slate-800">竞赛管理</h2>
            <p className="text-slate-500">创建技能竞赛，设置规则与评分标准</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />创建竞赛</Button>
        </div>

        <div className="space-y-4">
          {competitions.map((comp) => (
            <Card key={comp.id} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Trophy className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{comp.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Users2 className="h-4 w-4" />{comp.participants}人参与</span>
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{comp.startDate} ~ {comp.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(comp.status)}
                    <Button variant="outline" size="sm">查看详情</Button>
                    {comp.status === 'ongoing' && <Button size="sm">查看排名</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
