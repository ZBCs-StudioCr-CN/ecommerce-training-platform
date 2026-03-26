'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap, BookOpen, Users, Award, BarChart3, MessageCircle, Settings, Bell, Globe,
  Search, Eye, MessageSquare, AlertTriangle, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

const menuItems = [
  { id: 'dashboard', label: '教学控制台', icon: GraduationCap, href: '/teacher/dashboard' },
  { id: 'courses', label: '课程管理', icon: BookOpen, href: '/teacher/courses' },
  { id: 'practice', label: '实训管理', icon: Users, href: '/teacher/practice' },
  { id: 'grading', label: '考核评分', icon: Award, href: '/teacher/grading' },
  { id: 'analysis', label: '学情分析', icon: BarChart3, href: '/teacher/analysis' },
  { id: 'qa', label: '答疑社区', icon: MessageCircle, href: '/teacher/qa' },
];

const students = [
  { id: 1, name: '张小明', avatar: '张', progress: 85, score: 92, status: 'normal', lastActive: '2分钟前' },
  { id: 2, name: '李小红', avatar: '李', progress: 72, score: 78, status: 'normal', lastActive: '15分钟前' },
  { id: 3, name: '王小明', avatar: '王', progress: 45, score: null, status: 'warning', lastActive: '1小时前' },
  { id: 4, name: '陈小华', avatar: '陈', progress: 100, score: 95, status: 'normal', lastActive: '5分钟前' },
  { id: 5, name: '刘小丽', avatar: '刘', progress: 60, score: 70, status: 'warning', lastActive: '3小时前' },
  { id: 6, name: '赵小强', avatar: '赵', progress: 30, score: null, status: 'danger', lastActive: '昨天' },
];

export default function TeacherMonitorPage() {
  const [activeMenu, setActiveMenu] = useState('monitor');

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
          <h2 className="text-2xl font-bold text-slate-800">实训监控</h2>
          <p className="text-slate-500">实时监控学生实训进度，异常进度预警提醒</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">总学生数</p>
              <p className="text-2xl font-bold text-slate-800">42人</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">平均进度</p>
              <p className="text-2xl font-bold text-blue-600">68%</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">预警学生</p>
              <p className="text-2xl font-bold text-amber-500">3人</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">已完成</p>
              <p className="text-2xl font-bold text-green-600">15人</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>学生进度列表</CardTitle>
                <CardDescription>电商2201班 - 独立站搭建实训</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="搜索学生..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className={`flex items-center gap-4 p-4 rounded-xl border ${student.status === 'danger' ? 'border-red-200 bg-red-50' : student.status === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-slate-200'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${student.status === 'danger' ? 'bg-red-500' : student.status === 'warning' ? 'bg-amber-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
                    {student.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-800">{student.name}</span>
                      {student.status !== 'normal' && (
                        <Badge className={student.status === 'danger' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}>
                          <AlertTriangle className="h-3 w-3 mr-1" />{student.status === 'danger' ? '进度严重落后' : '进度偏慢'}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <Progress value={student.progress} className="h-2" />
                      </div>
                      <span className="text-sm text-slate-500">{student.progress}%</span>
                      {student.score && <span className="text-sm text-green-600 font-medium">得分：{student.score}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">最后活动</p>
                    <p className="text-sm text-slate-600">{student.lastActive}</p>
                  </div>
                  <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" />详情</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
