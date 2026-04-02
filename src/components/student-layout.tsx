'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Store,
  Award,
  FileText,
  MessageCircle,
  Bell,
  LogOut,
  Globe,
  Brain,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'risk-events', label: '风险应对', icon: AlertTriangle, href: '/student/risk-events' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'assessment', label: '能力评估', icon: Target, href: '/student/assessment' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
  { id: 'ai-assistant', label: 'AI助手', icon: Brain, href: '/student/ai-assistant', highlight: true },
];

interface StudentLayoutProps {
  children: React.ReactNode;
  activeMenu?: string;
}

export function StudentLayout({ children, activeMenu }: StudentLayoutProps) {
  const pathname = usePathname();
  const currentMenu = activeMenu || menuItems.find(item => pathname.startsWith(item.href))?.id || 'dashboard';
  
  // 获取用户信息（这里可以后续替换为真实的用户数据）
  const user = {
    name: '张三',
    class: '电商2201班',
    avatar: '张',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
                <p className="text-xs text-slate-500">学生端</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{user.name}</p>
                <p className="text-xs text-slate-500">{user.class}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
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
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                  : item.highlight 
                    ? 'text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {item.highlight && currentMenu !== item.id && (
                <Badge className="ml-auto bg-purple-500 text-white text-xs">AI</Badge>
              )}
            </Link>
          ))}
        </nav>

        {/* AI能力统计 */}
        <div className="mx-4 mt-2 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Brain className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">AI辅助统计</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="text-center p-1.5 bg-white rounded-md">
              <p className="text-base font-bold text-purple-600">23</p>
              <p className="text-slate-500 text-[10px]">AI调用</p>
            </div>
            <div className="text-center p-1.5 bg-white rounded-md">
              <p className="text-base font-bold text-emerald-600">78%</p>
              <p className="text-slate-500 text-[10px]">自主决策</p>
            </div>
          </div>
        </div>

        {/* 风险事件提醒 */}
        <div className="mx-4 mt-2 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-orange-600" />
            <span className="text-xs font-medium text-orange-700">风险事件</span>
            <Badge className="bg-red-500 text-white text-[10px] ml-auto px-1.5 py-0">3 待处理</Badge>
          </div>
          <Link href="/student/risk-events" className="block">
            <Button size="sm" className="w-full h-7 text-xs bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              查看详情
            </Button>
          </Link>
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

// 仅导出侧边栏组件（用于自定义布局的页面）
export function StudentSidebar({ activeMenu }: { activeMenu?: string }) {
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
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                : item.highlight 
                  ? 'text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                  : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
            {item.highlight && currentMenu !== item.id && (
              <Badge className="ml-auto bg-purple-500 text-white text-xs">AI</Badge>
            )}
          </Link>
        ))}
      </nav>

      {/* AI能力统计 */}
      <div className="mx-4 mt-2 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Brain className="h-3.5 w-3.5 text-purple-600" />
          <span className="text-xs font-medium text-purple-700">AI辅助统计</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div className="text-center p-1.5 bg-white rounded-md">
            <p className="text-base font-bold text-purple-600">23</p>
            <p className="text-slate-500 text-[10px]">AI调用</p>
          </div>
          <div className="text-center p-1.5 bg-white rounded-md">
            <p className="text-base font-bold text-emerald-600">78%</p>
            <p className="text-slate-500 text-[10px]">自主决策</p>
          </div>
        </div>
      </div>

      {/* 风险事件提醒 */}
      <div className="mx-4 mt-2 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
        <div className="flex items-center gap-1.5 mb-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-orange-600" />
          <span className="text-xs font-medium text-orange-700">风险事件</span>
          <Badge className="bg-red-500 text-white text-[10px] ml-auto px-1.5 py-0">3 待处理</Badge>
        </div>
        <Link href="/student/risk-events" className="block">
          <Button size="sm" className="w-full h-7 text-xs bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            查看详情
          </Button>
        </Link>
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
export function StudentHeader() {
  const user = {
    name: '张三',
    class: '电商2201班',
    avatar: '张',
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-3">
          <Link href="/login" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
              <p className="text-xs text-slate-500">学生端</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </Button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">{user.name}</p>
              <p className="text-xs text-slate-500">{user.class}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
              {user.avatar}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
