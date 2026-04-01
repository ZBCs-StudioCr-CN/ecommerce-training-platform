'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Globe,
  Brain,
  Target,
  Store,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  { id: 'dashboard', label: '教学控制台', icon: LayoutDashboard, href: '/teacher/dashboard' },
  { id: 'students', label: '学生管理', icon: Users, href: '/teacher/students' },
  { id: 'practice', label: '实训管理', icon: Store, href: '/teacher/practice' },
  { id: 'exam', label: '考试管理', icon: FileText, href: '/teacher/exam' },
  { id: 'analytics', label: '学情分析', icon: BarChart3, href: '/teacher/analytics' },
  { id: 'resources', label: '教学资源', icon: BookOpen, href: '/teacher/resources' },
  { id: 'calendar', label: '教学日历', icon: Calendar, href: '/teacher/calendar' },
  { id: 'settings', label: '系统设置', icon: Settings, href: '/teacher/settings' },
];

interface TeacherLayoutProps {
  children: React.ReactNode;
  activeMenu?: string;
}

export function TeacherLayout({ children, activeMenu }: TeacherLayoutProps) {
  const pathname = usePathname();
  const currentMenu = activeMenu || menuItems.find(item => pathname.startsWith(item.href))?.id || 'dashboard';
  
  const user = {
    name: '李老师',
    role: '教师',
    avatar: '李',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/50">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
                <p className="text-xs text-slate-500">教师端</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200/80 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                currentMenu === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* 快捷统计 */}
        <div className="mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">今日统计</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-lg font-bold text-purple-600">45</p>
              <p className="text-slate-500">在线学生</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-lg font-bold text-indigo-600">12</p>
              <p className="text-slate-500">待批阅</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-60 pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}

// 仅导出侧边栏组件
export function TeacherSidebar({ activeMenu }: { activeMenu?: string }) {
  const pathname = usePathname();
  const currentMenu = activeMenu || menuItems.find(item => pathname.startsWith(item.href))?.id || 'dashboard';

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200/80 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              currentMenu === item.id
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* 快捷统计 */}
      <div className="mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">今日统计</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-white rounded-lg">
            <p className="text-lg font-bold text-purple-600">45</p>
            <p className="text-slate-500">在线学生</p>
          </div>
          <div className="text-center p-2 bg-white rounded-lg">
            <p className="text-lg font-bold text-indigo-600">12</p>
            <p className="text-slate-500">待批阅</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">退出登录</span>
        </button>
      </div>
    </aside>
  );
}

// 仅导出顶部导航组件
export function TeacherHeader({ title, subtitle }: { title?: string; subtitle?: string }) {
  const user = {
    name: '李老师',
    role: '教师',
    avatar: '李',
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-3">
          <Link href="/login" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">{title || '电商实训平台'}</h1>
              <p className="text-xs text-slate-500">{subtitle || '教师端'}</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
          </Button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">{user.name}</p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
              {user.avatar}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
