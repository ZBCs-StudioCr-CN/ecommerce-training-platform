'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  ChevronLeft,
  Play,
  Pause,
  TrendingUp,
  Eye,
  MousePointer,
  DollarSign,
  Target,
  MapPin,
  Calendar,
  Settings,
  BarChart3,
  Users,
  Image,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const menuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
];

// 模拟广告数据
const mockAds = [
  {
    id: '1',
    name: '夏季连衣裙推广',
    platform: 'google',
    status: 'active',
    budget: 50,
    spent: 23.45,
    impressions: 12500,
    clicks: 450,
    ctr: 3.6,
    conversions: 12,
    cpa: 1.95,
    startDate: '2024-01-15',
    endDate: '2024-01-31',
  },
  {
    id: '2',
    name: '新品上市宣传',
    platform: 'facebook',
    status: 'paused',
    budget: 100,
    spent: 45.20,
    impressions: 25000,
    clicks: 680,
    ctr: 2.72,
    conversions: 18,
    cpa: 2.51,
    startDate: '2024-01-10',
    endDate: '2024-01-25',
  },
];

// 模拟受众数据
const mockAudiences = [
  { name: '美国-女性-25-34岁', reach: 1500000, competition: 'high' },
  { name: '英国-女性-18-24岁', reach: 800000, competition: 'medium' },
  { name: '加拿大-全性别-25-44岁', reach: 650000, competition: 'low' },
  { name: '澳大利亚-女性-30-40岁', reach: 400000, competition: 'medium' },
];

export default function StudentAdsPage() {
  const [activeMenu, setActiveMenu] = useState('practice');
  const [activeTab, setActiveTab] = useState('campaigns');
  const [ads, setAds] = useState(mockAds);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAd, setNewAd] = useState({
    name: '',
    platform: 'google',
    budget: 50,
    targetAudience: '',
    keywords: '',
    adCopy: '',
    imageUrl: '',
  });

  // 计算总数据
  const totalBudget = ads.reduce((sum, ad) => sum + ad.budget, 0);
  const totalSpent = ads.reduce((sum, ad) => sum + ad.spent, 0);
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const totalConversions = ads.reduce((sum, ad) => sum + ad.conversions, 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
                <p className="text-xs text-slate-500">学生端</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">张三</p>
                <p className="text-xs text-slate-500">电商2201班</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">张</div>
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
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-60 pt-16 min-h-screen p-8">
        {/* 返回按钮 */}
        <Link href="/student/practice" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返回店铺后台
        </Link>

        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">广告投放模拟器</h2>
            <p className="text-slate-500">模拟Google Ads和Facebook Ads广告投放</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            创建广告
          </Button>
        </div>

        {/* 数据概览 */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">预算</p>
                  <p className="text-xl font-bold text-slate-800">${totalBudget}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">已花费</p>
                  <p className="text-xl font-bold text-slate-800">${totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">展示次数</p>
                  <p className="text-xl font-bold text-slate-800">{(totalImpressions / 1000).toFixed(1)}K</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <MousePointer className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">点击率</p>
                  <p className="text-xl font-bold text-slate-800">{avgCtr}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Target className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">转化数</p>
                  <p className="text-xl font-bold text-slate-800">{totalConversions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-slate-200 mb-6">
            <TabsTrigger value="campaigns">广告系列</TabsTrigger>
            <TabsTrigger value="audiences">受众分析</TabsTrigger>
            <TabsTrigger value="performance">效果分析</TabsTrigger>
          </TabsList>

          {/* 广告系列 */}
          <TabsContent value="campaigns">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">广告名称</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">平台</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">状态</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">预算/花费</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">展示</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">点击</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">CTR</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">转化</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">CPA</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {ads.map((ad) => (
                        <tr key={ad.id} className="hover:bg-slate-50">
                          <td className="px-4 py-4">
                            <p className="font-medium text-slate-800">{ad.name}</p>
                            <p className="text-xs text-slate-500">{ad.startDate} - {ad.endDate}</p>
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant={ad.platform === 'google' ? 'default' : 'secondary'}>
                              {ad.platform === 'google' ? 'Google' : 'Facebook'}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <Badge className={ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}>
                              {ad.status === 'active' ? '投放中' : '已暂停'}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-slate-600">
                            ${ad.budget} / ${ad.spent.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-slate-600">{(ad.impressions / 1000).toFixed(1)}K</td>
                          <td className="px-4 py-4 text-slate-600">{ad.clicks}</td>
                          <td className="px-4 py-4 text-slate-600">{ad.ctr}%</td>
                          <td className="px-4 py-4 text-slate-600">{ad.conversions}</td>
                          <td className="px-4 py-4 text-slate-600">${ad.cpa.toFixed(2)}</td>
                          <td className="px-4 py-4 text-right">
                            <Button variant="ghost" size="sm" className="mr-2">
                              {ad.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 受众分析 */}
          <TabsContent value="audiences">
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>目标受众</CardTitle>
                  <CardDescription>选择您的目标受众群体</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAudiences.map((audience, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-slate-400" />
                            <div>
                              <p className="font-medium text-slate-800">{audience.name}</p>
                              <p className="text-sm text-slate-500">覆盖 {(audience.reach / 1000000).toFixed(1)}M 用户</p>
                            </div>
                          </div>
                          <Badge className={
                            audience.competition === 'high' 
                              ? 'bg-red-100 text-red-700' 
                              : audience.competition === 'medium'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-green-100 text-green-700'
                          }>
                            {audience.competition === 'high' ? '高竞争' : audience.competition === 'medium' ? '中竞争' : '低竞争'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>受众洞察</CardTitle>
                  <CardDescription>了解您的目标受众特征</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">年龄段分布</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { age: '18-24', percent: 25 },
                          { age: '25-34', percent: 45 },
                          { age: '35-44', percent: 20 },
                          { age: '45+', percent: 10 },
                        ].map((item) => (
                          <div key={item.age} className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 w-16">{item.age}</span>
                            <Progress value={item.percent} className="h-2 flex-1" />
                            <span className="text-xs text-slate-600">{item.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">性别分布</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 p-3 rounded-lg bg-pink-50 text-center">
                          <p className="text-2xl font-bold text-pink-600">68%</p>
                          <p className="text-xs text-pink-500">女性</p>
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-blue-50 text-center">
                          <p className="text-2xl font-bold text-blue-600">32%</p>
                          <p className="text-xs text-blue-500">男性</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">地区分布</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { country: '美国', percent: 45 },
                          { country: '英国', percent: 20 },
                          { country: '加拿大', percent: 18 },
                          { country: '澳大利亚', percent: 17 },
                        ].map((item) => (
                          <div key={item.country} className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-500 w-20">{item.country}</span>
                            <Progress value={item.percent} className="h-2 flex-1" />
                            <span className="text-xs text-slate-600">{item.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 效果分析 */}
          <TabsContent value="performance">
            <div className="grid grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg col-span-2">
                <CardHeader>
                  <CardTitle>投放趋势</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-500">图表数据可视化</p>
                      <p className="text-xs text-slate-400 mt-1">展示点击、转化趋势</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>广告表现对比</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ads.map((ad) => (
                      <div key={ad.id} className="p-3 rounded-lg bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-slate-800 text-sm">{ad.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {ad.platform === 'google' ? 'Google' : 'Facebook'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-slate-500">CTR</p>
                            <p className="font-semibold text-slate-800">{ad.ctr}%</p>
                          </div>
                          <div>
                            <p className="text-slate-500">转化率</p>
                            <p className="font-semibold text-slate-800">
                              {((ad.conversions / ad.clicks) * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500">花费</p>
                            <p className="font-semibold text-slate-800">${ad.spent.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">转化</p>
                            <p className="font-semibold text-slate-800">{ad.conversions}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 创建广告弹窗（简化版） */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>创建新广告</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">广告名称</label>
                  <Input
                    className="mt-1"
                    placeholder="输入广告名称"
                    value={newAd.name}
                    onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">广告平台</label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      className={`p-4 rounded-lg border-2 ${
                        newAd.platform === 'google' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                      }`}
                      onClick={() => setNewAd({ ...newAd, platform: 'google' })}
                    >
                      <p className="font-medium">Google Ads</p>
                      <p className="text-xs text-slate-500 mt-1">搜索引擎广告</p>
                    </button>
                    <button
                      className={`p-4 rounded-lg border-2 ${
                        newAd.platform === 'facebook' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                      }`}
                      onClick={() => setNewAd({ ...newAd, platform: 'facebook' })}
                    >
                      <p className="font-medium">Facebook Ads</p>
                      <p className="text-xs text-slate-500 mt-1">社交媒体广告</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">日预算 ($)</label>
                  <Input
                    type="number"
                    className="mt-1"
                    placeholder="50"
                    value={newAd.budget}
                    onChange={(e) => setNewAd({ ...newAd, budget: Number(e.target.value) })}
                  />
                </div>

                {newAd.platform === 'google' && (
                  <div>
                    <label className="text-sm font-medium text-slate-700">关键词</label>
                    <Input
                      className="mt-1"
                      placeholder="summer dress, women fashion"
                      value={newAd.keywords}
                      onChange={(e) => setNewAd({ ...newAd, keywords: e.target.value })}
                    />
                    <p className="text-xs text-slate-500 mt-1">多个关键词用逗号分隔</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-slate-700">广告文案</label>
                  <textarea
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg resize-none"
                    rows={3}
                    placeholder="输入广告标题和描述"
                    value={newAd.adCopy}
                    onChange={(e) => setNewAd({ ...newAd, adCopy: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                    取消
                  </Button>
                  <Button className="flex-1" onClick={() => setShowCreateModal(false)}>
                    创建广告
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
