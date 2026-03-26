'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap, BookOpen, Users, Award, BarChart3, MessageCircle, Settings, Bell, Globe,
  Plus, Search, FolderOpen, Play, Clock, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const menuItems = [
  { id: 'dashboard', label: '教学控制台', icon: GraduationCap, href: '/teacher/dashboard' },
  { id: 'courses', label: '课程管理', icon: BookOpen, href: '/teacher/courses' },
  { id: 'practice', label: '实训管理', icon: Users, href: '/teacher/practice' },
  { id: 'grading', label: '考核评分', icon: Award, href: '/teacher/grading' },
  { id: 'analysis', label: '学情分析', icon: BarChart3, href: '/teacher/analysis' },
  { id: 'qa', label: '答疑社区', icon: MessageCircle, href: '/teacher/qa' },
];

export default function TeacherCoursesPage() {
  const [activeMenu, setActiveMenu] = useState('courses');

  const courses = [
    { id: 1, name: '外贸独立站基础认知', chapters: 8, duration: '6课时', status: 'published' },
    { id: 2, name: '独立站搭建实操', chapters: 12, duration: '12课时', status: 'published' },
    { id: 3, name: '跨境流量推广', chapters: 10, duration: '10课时', status: 'published' },
    { id: 4, name: '数据分析与优化', chapters: 6, duration: '8课时', status: 'draft' },
  ];

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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">课程管理</h2>
            <p className="text-slate-500">管理课程内容，上传课件与题库</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">导入课程</Button>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" />新建课程</Button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="搜索课程..." className="pl-9" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">{course.name}</h3>
                      <Badge className={course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}>
                        {course.status === 'published' ? '已发布' : '草稿'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><FolderOpen className="h-4 w-4" />{course.chapters}个章节</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
                    </div>
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
