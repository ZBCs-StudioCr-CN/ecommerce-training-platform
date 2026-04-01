'use client';

import Link from 'next/link';
import {
  Globe,
  Shield,
  GraduationCap,
  User,
  ArrowRight,
  Building2,
  Users,
  Target,
  ChevronRight,
  Play,
  Store,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const roleCards = [
    {
      id: 'admin',
      title: '院校管理员',
      description: '管理账号、班级、数据报表、竞赛管理',
      icon: Shield,
      color: 'from-violet-500 to-purple-600',
      href: '/admin/dashboard',
      features: ['账号批量管理', '全校数据看板', '竞赛创建与管理', '报表导出'],
    },
    {
      id: 'teacher',
      title: '授课教师',
      description: '备课授课、发布实训、考核评分、学情分析',
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600',
      href: '/teacher/dashboard',
      features: ['课程管理', '实训任务发布', '智能+人工评分', '学情分析看板'],
    },
    {
      id: 'student',
      title: '在校学生',
      description: '理论学习、仿真实训、考核答题、成果导出',
      icon: User,
      color: 'from-emerald-500 to-teal-600',
      href: '/student/dashboard',
      features: ['6大技能模块', '独立站搭建实训', '考核与评分', '作品集生成'],
    },
  ];

  const quickLinks = [
    { title: '登录页', description: '三角色身份选择登录', href: '/login', icon: Shield },
    { title: '独立站编辑器', description: 'Shopify风格拖拽装修', href: '/builder', icon: Store },
    { title: '数据分析看板', description: '流量/转化/销售分析', href: '/analytics', icon: BarChart3 },
    { title: '实训详情页', description: '步骤引导式学习', href: '/practice/2', icon: Target },
  ];

  const features = [
    {
      icon: Building2,
      title: '产教融合',
      description: '面向中高职、本科院校电商/跨境电商专业，打造"教学-实训-考核-就业"全闭环',
    },
    {
      icon: Globe,
      title: '仿真引擎',
      description: '1:1复刻Shopify建站平台，虚拟域名、资金、流量，零风险全流程模拟',
    },
    {
      icon: Users,
      title: '三级权限',
      description: '管理员、教师、学生三级角色权限体系，权限严格隔离，适配院校管理规范',
    },
    {
      icon: Target,
      title: '六大技能',
      description: '市场调研、独立站搭建、流量推广、转化运营、数据分析、合规风控',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* 导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">电商实训平台</h1>
              <p className="text-xs text-blue-200">Cross-border E-commerce Training Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
              <Link href="/login">
                登录系统
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero区域 */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            电商实战模拟<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              教学实训平台
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            面向中高职、本科院校电商/跨境电商专业，打造"教学-实训-考核-就业"全闭环的云端SaaS电商实战模拟平台
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30" asChild>
              <Link href="/login">
                进入系统
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30" asChild>
              <Link href="/student/dashboard">
                查看学生端演示
                <Play className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* 数据统计 */}
          <div className="flex items-center justify-center gap-12">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">50+</p>
              <p className="text-sm text-blue-200">合作院校</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold text-white">10,000+</p>
              <p className="text-sm text-blue-200">实训学生</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold text-white">6</p>
              <p className="text-sm text-blue-200">核心技能模块</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold text-white">98%</p>
              <p className="text-sm text-blue-200">满意度</p>
            </div>
          </div>
        </div>
      </section>

      {/* 三角色入口 */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">三角色功能入口</h3>
            <p className="text-blue-200">点击下方卡片可直接进入对应角色的控制台（演示模式）</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {roleCards.map((role) => (
              <Link key={role.id} href={role.href} className="group">
                <Card className="h-full bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                      <role.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-blue-200">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-blue-100">
                          <ChevronRight className="h-4 w-4 text-blue-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-sm text-blue-300">点击进入</span>
                      <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 快速链接 */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-3">核心页面快速访问</h3>
            <p className="text-blue-200">快速访问平台的核心功能页面</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <link.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{link.title}</p>
                        <p className="text-xs text-blue-300">{link.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-blue-400/50 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 核心特性 */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">平台核心特性</h3>
            <p className="text-blue-200">专为产教融合场景打造的电商仿真实训平台</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-blue-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 六大技能模块 */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-3">六大核心技能模块</h3>
            <p className="text-blue-200">分步实操，带步骤引导，完成后自动评分反馈</p>
          </div>

          <div className="grid grid-cols-6 gap-4">
            {[
              { name: '市场调研与选品', icon: Target, score: 92 },
              { name: '独立站搭建', icon: Store, score: null },
              { name: '流量推广', icon: Play, score: null },
              { name: '转化运营', icon: BarChart3, score: null },
              { name: '数据分析', icon: BarChart3, score: null },
              { name: '合规风控', icon: Shield, score: null },
            ].map((module, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-3">
                  <module.icon className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-white mb-1">{module.name}</p>
                {module.score ? (
                  <Badge className="bg-green-500/20 text-green-300 text-xs">{module.score}分</Badge>
                ) : (
                  <Badge variant="outline" className="border-white/20 text-white/50 text-xs">待解锁</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-blue-200">电商实训平台</span>
          </div>
          <p className="text-sm text-blue-300">
            电商实战模拟教学实训平台
          </p>
        </div>
      </footer>
    </div>
  );
}
