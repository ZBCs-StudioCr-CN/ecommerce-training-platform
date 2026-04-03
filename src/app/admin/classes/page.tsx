'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Users, School, BarChart3, Trophy, Settings, Bell, LogOut, Globe,
  Plus, Search, Edit, ChevronRight, Users2, TrendingUp, TrendingDown,
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

const classes = [
  { id: 1, name: '电商2201班', department: '电商学院', students: 42, teacher: '王老师', completion: 85, status: 'active' },
  { id: 2, name: '跨境电商2203班', department: '电商学院', students: 38, teacher: '李老师', completion: 78, status: 'active' },
  { id: 3, name: '电商2202班', department: '电商学院', students: 45, teacher: '张老师', completion: 72, status: 'active' },
  { id: 4, name: '跨境电商2201班', department: '电商学院', students: 40, teacher: '王老师', completion: 65, status: 'active' },
  { id: 5, name: '电商2101班', department: '电商学院', students: 43, teacher: '陈老师', completion: 92, status: 'graduated' },
];

export default function AdminClassesPage() {
  const [activeMenu, setActiveMenu] = useState('classes');

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
            <h2 className="text-2xl font-bold text-slate-800">班级管理</h2>
            <p className="text-slate-500">管理院系、班级信息，分配教师</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">导入班级</Button>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" />新增班级</Button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="搜索班级名称..." className="pl-9" />
          </div>
          <select className="h-10 px-3 border rounded-lg text-sm">
            <option>全部院系</option>
            <option>电商学院</option>
            <option>经管学院</option>
          </select>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">班级名称</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">所属院系</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">学生人数</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">授课教师</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">实训完成率</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">状态</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-slate-800">{cls.name}</td>
                    <td className="py-3 px-4 text-slate-600">{cls.department}</td>
                    <td className="py-3 px-4 text-slate-600">{cls.students}人</td>
                    <td className="py-3 px-4 text-slate-600">{cls.teacher}</td>
                    <td className="py-3 px-4">
                      <div className="w-24">
                        <Progress value={cls.completion} className="h-2" />
                        <span className="text-xs text-slate-500">{cls.completion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={cls.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}>
                        {cls.status === 'active' ? '进行中' : '已结业'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">查看</Button>
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
