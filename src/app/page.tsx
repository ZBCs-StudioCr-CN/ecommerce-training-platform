'use client';

import { useState } from 'react';
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Store,
  TrendingUp,
  BarChart3,
  FileText,
  Award,
  MessageCircle,
  Settings,
  LogOut,
  Bell,
  User,
  ChevronRight,
  Play,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Target,
  ShoppingCart,
  Globe,
  Megaphone,
  PieChart,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard },
    { id: 'learning', label: '学习中心', icon: BookOpen },
    { id: 'practice', label: '仿真实训', icon: Store },
    { id: 'exam', label: '考核中心', icon: Award },
    { id: 'achievement', label: '成果中心', icon: FileText },
    { id: 'qa', label: '答疑社区', icon: MessageCircle },
  ];

  const practiceModules = [
    {
      id: 1,
      title: '市场调研与选品',
      description: '模拟海外市场数据，进行选品分析、定价与品牌定位',
      icon: Target,
      progress: 100,
      status: 'completed',
      score: 92,
    },
    {
      id: 2,
      title: '独立站搭建',
      description: '拖拽式装修、商品上传、支付物流配置、GDPR合规设置',
      icon: ShoppingCart,
      progress: 75,
      status: 'in_progress',
      score: null,
    },
    {
      id: 3,
      title: '流量推广',
      description: 'Google SEO/Ads、社媒广告、网红营销全渠道模拟',
      icon: Megaphone,
      progress: 0,
      status: 'pending',
      score: null,
    },
    {
      id: 4,
      title: '转化运营',
      description: '营销活动、私域邮件、弃购挽回、售后客诉处理',
      icon: TrendingUp,
      progress: 0,
      status: 'locked',
      score: null,
    },
    {
      id: 5,
      title: '数据分析',
      description: '仿真数据看板解读，异常归因，优化方案制定',
      icon: PieChart,
      progress: 0,
      status: 'locked',
      score: null,
    },
    {
      id: 6,
      title: '合规风控',
      description: '海外政策学习，风险场景应急处理',
      icon: Shield,
      progress: 0,
      status: 'locked',
      score: null,
    },
  ];

  const todoTasks = [
    { id: 1, title: '完成独立站搭建实训', deadline: '今天 18:00', type: 'practice', urgent: true },
    { id: 2, title: '提交市场调研报告', deadline: '明天 23:59', type: 'homework', urgent: false },
    { id: 3, title: '参加期末综合考核', deadline: '3月30日 14:00', type: 'exam', urgent: false },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">已完成</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">进行中</Badge>;
      case 'pending':
        return <Badge variant="secondary">未开始</Badge>;
      case 'locked':
        return <Badge variant="outline" className="text-gray-400">待解锁</Badge>;
      default:
        return null;
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'practice':
        return <Store className="h-4 w-4" />;
      case 'homework':
        return <FileText className="h-4 w-4" />;
      case 'exam':
        return <Award className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
                <p className="text-xs text-slate-500">Cross-border E-commerce Training Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">张三</p>
                <p className="text-xs text-slate-500">电商2201班</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200/80 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Settings className="h-5 w-5" />
            <span className="font-medium">个人设置</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-60 pt-16 min-h-screen">
        <div className="p-8">
          {/* 欢迎横幅 */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/10 rounded-full translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">欢迎回来，张三同学！</h2>
              <p className="text-blue-100 mb-4">继续你的外贸独立站实训之旅，今天要完成独立站搭建模块哦</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200">综合成绩</p>
                    <p className="text-lg font-bold">92分</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200">班级排名</p>
                    <p className="text-lg font-bold">第3名</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200">完成模块</p>
                    <p className="text-lg font-bold">1/6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* 左侧：待办事项 + 实训进度 */}
            <div className="col-span-2 space-y-6">
              {/* 实训模块卡片 */}
              <Card className="border-0 shadow-xl shadow-slate-200/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">分项技能实训</CardTitle>
                      <CardDescription>按步骤完成六大核心技能模块</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      查看全部
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {practiceModules.map((module) => (
                      <div
                        key={module.id}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          module.status === 'locked'
                            ? 'bg-slate-50 border-slate-200 opacity-60'
                            : module.status === 'in_progress'
                            ? 'bg-blue-50/50 border-blue-200 shadow-lg shadow-blue-100'
                            : module.status === 'completed'
                            ? 'bg-green-50/50 border-green-200'
                            : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            module.status === 'completed'
                              ? 'bg-green-100 text-green-600'
                              : module.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            <module.icon className="h-6 w-6" />
                          </div>
                          {getStatusBadge(module.status)}
                        </div>
                        <h3 className="font-semibold text-slate-800 mb-1">{module.title}</h3>
                        <p className="text-sm text-slate-500 mb-3 line-clamp-2">{module.description}</p>
                        
                        {module.status !== 'locked' && (
                          <>
                            <div className="mb-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-500">完成进度</span>
                                <span className="font-medium">{module.progress}%</span>
                              </div>
                              <Progress value={module.progress} className="h-2" />
                            </div>
                            <div className="flex items-center justify-between">
                              {module.score !== null ? (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                  <span className="font-bold text-amber-600">{module.score}分</span>
                                </div>
                              ) : (
                                <span className="text-xs text-slate-400">未评分</span>
                              )}
                              {module.status !== 'completed' && (
                                <Button size="sm" className="h-8">
                                  {module.status === 'in_progress' ? '继续实训' : '开始实训'}
                                </Button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 独立站搭建预览 */}
              <Card className="border-0 shadow-xl shadow-slate-200/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">我的独立站预览</CardTitle>
                      <CardDescription>当前正在搭建的仿真独立站</CardDescription>
                    </div>
                    <Button>
                      <Store className="h-4 w-4 mr-2" />
                      进入编辑
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border-2 border-dashed border-slate-200 p-4 bg-slate-50/50">
                    <div className="aspect-video bg-white rounded-lg shadow-sm overflow-hidden relative">
                      {/* 模拟网站预览 */}
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white">
                        {/* 网站头部 */}
                        <div className="h-12 bg-white border-b flex items-center justify-between px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-purple-600" />
                            <span className="text-sm font-medium">My Fashion Store</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500">首页</span>
                            <span className="text-xs text-slate-500">商品</span>
                            <span className="text-xs text-slate-500">关于我们</span>
                            <div className="w-5 h-5 rounded-full bg-slate-200" />
                          </div>
                        </div>
                        {/* Banner */}
                        <div className="h-24 bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-lg font-bold text-slate-800">新品上市</p>
                            <p className="text-xs text-slate-500">探索2026春季系列</p>
                          </div>
                        </div>
                        {/* 商品展示 */}
                        <div className="p-3 grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded bg-slate-200/50 flex items-center justify-center">
                              <span className="text-xs text-slate-400">商品{i}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* 覆盖层 */}
                      <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="sm">
                          预览网站
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">fashion-store.simulation.com</Badge>
                        <Badge className="bg-amber-100 text-amber-700">搭建中</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-4 w-4" />
                        <span>上次编辑：今天 14:30</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧：待办 + 综合实战 */}
            <div className="space-y-6">
              {/* 待办任务 */}
              <Card className="border-0 shadow-xl shadow-slate-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    待办任务
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {todoTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border-2 ${
                        task.urgent
                          ? 'bg-red-50 border-red-200'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          task.urgent ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {getTaskTypeIcon(task.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-slate-800">{task.title}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>{task.deadline}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 综合实战入口 */}
              <Card className="border-0 shadow-xl shadow-slate-200/50 bg-gradient-to-br from-indigo-500 to-purple-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <CardHeader>
                  <CardTitle className="text-lg">综合项目实战</CardTitle>
                  <CardDescription className="text-indigo-100">
                    完成从0到1的独立站全流程运营
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-300" />
                      <span>完成所有分项实训后解锁</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4" />
                      <span>支持个人或小组（4-6人）组队</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4" />
                      <span>实时查看数据排名与运营报告</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full" disabled>
                    <Play className="h-4 w-4 mr-2" />
                    开始综合实战
                  </Button>
                  <p className="text-xs text-indigo-200 mt-2 text-center">
                    需完成所有分项实训模块
                  </p>
                </CardContent>
              </Card>

              {/* 学习进度统计 */}
              <Card className="border-0 shadow-xl shadow-slate-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">学习进度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">理论课程</span>
                        <span className="font-medium">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">实训任务</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">考核通过率</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
