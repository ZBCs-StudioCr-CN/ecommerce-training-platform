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
  Brain,
  Sparkles,
  AlertTriangle,
  LineChart,
  ShoppingCart,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const roleCards = [
    {
      id: 'admin',
      title: '院校管理员',
      description: '管理账号、班级、数据报表、能力画像统计',
      icon: Shield,
      color: 'from-violet-500 to-purple-600',
      href: '/admin/dashboard',
      features: ['账号批量管理', '全校数据看板', 'AI使用统计', '能力模型配置'],
    },
    {
      id: 'teacher',
      title: '授课教师',
      description: '备课授课、发布实训、AI开放控制、能力评价',
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600',
      href: '/teacher/dashboard',
      features: ['课程管理', 'AI辅助强度控制', '五大维度评分', '学情分析看板'],
    },
    {
      id: 'student',
      title: '在校学生',
      description: 'AI辅助决策、全场景实训、能力成长、成果输出',
      icon: User,
      color: 'from-emerald-500 to-teal-600',
      href: '/student/dashboard',
      features: ['三大电商场景', 'AI决策辅助', '风险事件应对', '能力雷达图'],
    },
  ];

  const quickLinks = [
    { title: '登录页', description: '三角色身份选择登录', href: '/login', icon: Shield },
    { title: 'AI助手演示', description: 'AI决策辅助中台', href: '/student/dashboard', icon: Brain },
    { title: '数据分析看板', description: '流量/转化/销售分析', href: '/analytics', icon: BarChart3 },
    { title: '实训详情页', description: '步骤引导式学习', href: '/practice/2', icon: Target },
  ];

  // 三大覆盖场景
  const scenarios = [
    {
      icon: ShoppingCart,
      name: '国内电商',
      platforms: '淘宝/天猫、拼多多、抖音电商',
      description: '直播带货、短视频营销、私域运营',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: ShoppingBag,
      name: '跨境平台电商',
      platforms: '亚马逊、Shopee、Lazada',
      description: '选品策略、跨境物流、海外推广',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Store,
      name: '外贸独立站',
      platforms: 'Shopify类建站+运营+投放',
      description: '品牌独立站、流量获取、转化运营',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  // 四大核心能力
  const coreAbilities = [
    {
      icon: Target,
      name: '商业决策',
      description: 'AI提供选项，学生做决策',
      weight: 30,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: LineChart,
      name: '流量逻辑',
      description: '理解流量背后的商业逻辑',
      weight: 25,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      name: '数据复盘',
      description: '真正理解数据背后的含义',
      weight: 25,
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: AlertTriangle,
      name: '风险应对',
      description: '真实市场不确定性的应对能力',
      weight: 20,
      color: 'from-red-500 to-rose-500',
    },
  ];

  // AI辅助设计原则
  const aiPrinciples = [
    { ai: 'AI提供选项', student: '学生做决策', icon: Brain },
    { ai: 'AI提供信息', student: '学生做判断', icon: Sparkles },
    { ai: 'AI提供建议', student: '学生承担结果', icon: Target },
  ];

  // 评分维度
  const scoringDimensions = [
    { name: '自主决策能力', weight: 30, color: 'bg-blue-500' },
    { name: 'AI辅助应用能力', weight: 20, color: 'bg-purple-500' },
    { name: '数据复盘与优化', weight: 25, color: 'bg-amber-500' },
    { name: '风险应对能力', weight: 15, color: 'bg-red-500' },
    { name: '合规与规则意识', weight: 10, color: 'bg-emerald-500' },
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
              <p className="text-xs text-blue-200">AI时代能力培养平台</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              AI融合版 V2.0
            </Badge>
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* 核心定位标签 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-8">
            <Brain className="h-5 w-5 text-purple-400" />
            <span className="text-purple-200 font-medium">AI时代电商运营决策能力培养平台</span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            驾驭AI · 培养能力<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              做不被AI替代的电商人才
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            专注训练<span className="text-white font-semibold">商业决策、流量逻辑、数据复盘、风险应对</span>四大不可被AI替代的职业核心能力
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30" asChild>
              <Link href="/login">
                进入系统
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg shadow-purple-500/30" asChild>
              <Link href="/student/dashboard">
                查看AI辅助演示
                <Brain className="h-5 w-5 ml-2" />
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
              <p className="text-4xl font-bold text-white">3</p>
              <p className="text-sm text-blue-200">电商场景覆盖</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-4xl font-bold text-white">4</p>
              <p className="text-sm text-blue-200">核心能力维度</p>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么AI越强，模拟平台价值越高 */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">为什么AI越强，模拟平台价值越高</h3>
            <p className="text-blue-200 max-w-2xl mx-auto">AI是工具，平台是系统化的能力培养体系</p>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {[
              { icon: Brain, title: 'AI能给出答案', desc: '却无法让学生亲历决策过程' },
              { icon: LineChart, title: 'AI能提供方案', desc: '却无法模拟真实市场不确定性' },
              { icon: BarChart3, title: 'AI能读取数据', desc: '却无法训练学生理解商业逻辑' },
              { icon: Target, title: 'AI能降低成本', desc: '却无法提供零成本试错环境' },
              { icon: Shield, title: 'AI能辅助教学', desc: '却无法实现标准化考核评价' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-purple-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-blue-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 三大覆盖场景 */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">三大电商场景全覆盖</h3>
            <p className="text-blue-200">统一流程，三大场景互通，培养全场景电商运营能力</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <div key={index} className="group">
                <Card className="h-full bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scenario.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                      <scenario.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">{scenario.name}</CardTitle>
                    <CardDescription className="text-blue-200 text-base">{scenario.platforms}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100">{scenario.description}</p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-300">点击进入实训</span>
                        <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 四大核心能力 */}
      <section className="py-20 px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">四大不可替代的核心能力</h3>
            <p className="text-blue-200">培养企业真正需要的"会运营、能判断、善优化、扛结果"的电商人才</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {coreAbilities.map((ability, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${ability.color} flex items-center justify-center mb-4`}>
                    <ability.icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{ability.name}</h4>
                  <p className="text-blue-200 text-sm mb-4">{ability.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${ability.color}`}
                        style={{ width: `${ability.weight}%` }}
                      />
                    </div>
                    <span className="text-white font-medium">{ability.weight}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI辅助设计原则 */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              <Brain className="inline-block h-8 w-8 mr-2 text-purple-400" />
              AI辅助设计原则
            </h3>
            <p className="text-blue-200">AI是辅助角色，不参与决策，培养学生驾驭AI的能力</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {aiPrinciples.map((principle, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-center gap-4 p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                      <principle.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <p className="text-purple-300 font-medium">{principle.ai}</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-blue-400" />
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-6 w-6 text-emerald-400" />
                    </div>
                    <p className="text-emerald-300 font-medium">{principle.student}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI能力范围 */}
          <div className="mt-12 grid grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-400" />
                  AI能力范围
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    '市场分析：输出趋势、需求、竞争度分析',
                    '选品建议：提供推荐清单及理由',
                    '文案生成：标题、详情页、广告文案创作',
                    '投放建议：渠道、人群、预算推荐',
                    '数据诊断：指出异常并分析原因',
                    '客服话术：提供标准回复参考',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-blue-100">
                      <CheckIcon className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  AI绝对禁止行为
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    '不得替学生做出最终选择',
                    '不得替学生执行操作',
                    '不保证答案100%正确',
                    '不得替代学生理解数据逻辑',
                    '不得替代学生进行风险判断',
                    '不得替代学生承担决策结果',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-blue-100">
                      <XIcon className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 全新评分机制 */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">AI融合全新评分机制</h3>
            <p className="text-blue-200">五大维度科学评估学生真实能力，防范直接抄袭AI</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {scoringDimensions.map((dim, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-40 text-right">
                        <span className="text-white font-medium">{dim.name}</span>
                      </div>
                      <div className="flex-1 h-8 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${dim.color} flex items-center justify-end pr-4 transition-all`}
                          style={{ width: `${dim.weight * 3}%` }}
                        >
                          <span className="text-white font-bold">{dim.weight}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">自动评分</p>
                      <p className="text-sm text-blue-300">系统实时计算</p>
                    </div>
                    <div className="text-4xl text-white/30">+</div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">教师批改</p>
                      <p className="text-sm text-blue-300">人工复核调整</p>
                    </div>
                    <div className="text-4xl text-white/30">+</div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">相似度检测</p>
                      <p className="text-sm text-blue-300">防范AI抄袭</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

      {/* 核心价值总结 */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center">
            {/* 装饰性图标 */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-purple-500/20 mb-8">
              <Brain className="h-10 w-10 text-purple-300" />
            </div>
            
            {/* 主标题 */}
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
              从<span className="text-purple-400">"AI使用者"</span>成长为<span className="text-pink-400">"AI驾驭者"</span>
            </h3>
            
            {/* 副标题 */}
            <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-10 leading-relaxed">
              AI可完成建站、文案撰写、客服回复、基础投放等重复性工作，<br className="hidden md:block" />
              但永远无法替代人的<span className="text-white font-medium">商业判断</span>、<span className="text-white font-medium">市场理解</span>、<span className="text-white font-medium">数据解读</span>、<span className="text-white font-medium">风险决策</span>及<span className="text-white font-medium">迭代优化</span>能力。
            </p>
            
            {/* 核心价值点 */}
            <div className="flex items-center justify-center gap-6 mb-10">
              {[
                { label: '商业判断', icon: Target },
                { label: '市场理解', icon: LineChart },
                { label: '数据解读', icon: BarChart3 },
                { label: '风险决策', icon: AlertTriangle },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <item.icon className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-blue-200">{item.label}</span>
                </div>
              ))}
            </div>
            
            {/* CTA按钮 */}
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg shadow-purple-500/30 text-lg px-8" 
                asChild
              >
                <Link href="/login">
                  立即开始
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 text-lg px-8"
                asChild
              >
                <Link href="/student/dashboard">
                  查看演示
                </Link>
              </Button>
            </div>
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
            <span className="text-sm text-blue-200">电商实训平台 · AI时代能力培养平台</span>
          </div>
          <p className="text-sm text-blue-300">
            V2.0 AI融合增强版
          </p>
        </div>
      </footer>
    </div>
  );
}

// 辅助图标组件
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
