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
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  DollarSign,
  ShoppingCart,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

// 模拟数据
const mockStats = {
  overview: {
    revenue: { value: 2580.45, change: 12.5 },
    orders: { value: 68, change: 8.3 },
    visitors: { value: 15420, change: 15.2 },
    conversionRate: { value: 0.44, change: -2.1 },
    avgOrderValue: { value: 37.95, change: 3.8 },
    returningCustomers: { value: 23.5, change: 5.2 },
  },
  trafficSources: [
    { source: 'Direct', visitors: 4500, percent: 29.2, trend: 'up' },
    { source: 'Google Ads', visitors: 3800, percent: 24.6, trend: 'up' },
    { source: 'Facebook', visitors: 3200, percent: 20.8, trend: 'up' },
    { source: 'Email', visitors: 2100, percent: 13.6, trend: 'down' },
    { source: 'Social', visitors: 1820, percent: 11.8, trend: 'up' },
  ],
  topProducts: [
    { name: '夏季连衣裙', sales: 28, revenue: 839.72 },
    { name: '休闲T恤', sales: 22, revenue: 439.78 },
    { name: '牛仔裤', sales: 18, revenue: 719.82 },
  ],
  topCountries: [
    { country: '美国', orders: 32, revenue: 1214.40 },
    { country: '英国', orders: 15, revenue: 569.25 },
    { country: '加拿大', orders: 12, revenue: 455.40 },
    { country: '澳大利亚', orders: 9, revenue: 341.40 },
  ],
  devices: [
    { device: 'Desktop', percent: 52, icon: Monitor },
    { device: 'Mobile', percent: 38, icon: Smartphone },
    { device: 'Tablet', percent: 10, icon: Tablet },
  ],
};

export default function StudentAnalyticsPage() {
  const [activeMenu, setActiveMenu] = useState('practice');
  const [dateRange, setDateRange] = useState('last7days');

  const stats = mockStats;

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
            <h2 className="text-2xl font-bold text-slate-800">数据分析</h2>
            <p className="text-slate-500">查看店铺运营数据和表现</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">今天</option>
              <option value="yesterday">昨天</option>
              <option value="last7days">最近7天</option>
              <option value="last30days">最近30天</option>
              <option value="thisMonth">本月</option>
            </select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">总收入</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">${stats.overview.revenue.value.toLocaleString()}</p>
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                stats.overview.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.overview.revenue.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(stats.overview.revenue.change)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">订单数</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{stats.overview.orders.value}</p>
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                stats.overview.orders.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.overview.orders.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(stats.overview.orders.change)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">访客数</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{(stats.overview.visitors.value / 1000).toFixed(1)}K</p>
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                stats.overview.visitors.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.overview.visitors.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(stats.overview.visitors.change)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">转化率</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{stats.overview.conversionRate.value}%</p>
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                stats.overview.conversionRate.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.overview.conversionRate.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(stats.overview.conversionRate.change)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">客单价</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">${stats.overview.avgOrderValue.value}</p>
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                stats.overview.avgOrderValue.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.overview.avgOrderValue.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(stats.overview.avgOrderValue.change)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">复购率</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{stats.overview.returningCustomers.value}%</p>
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                stats.overview.returningCustomers.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.overview.returningCustomers.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(stats.overview.returningCustomers.change)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* 流量来源 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>流量来源</CardTitle>
              <CardDescription>各渠道访客分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.trafficSources.map((source, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700">{source.source}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">{source.visitors.toLocaleString()}</span>
                        {source.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                    </div>
                    <Progress value={source.percent} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 热销产品 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>热销产品</CardTitle>
              <CardDescription>销售额Top 3</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.sales} 销量</p>
                    </div>
                    <p className="font-semibold text-slate-800">${product.revenue.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 国家分布 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>订单国家分布</CardTitle>
              <CardDescription>主要市场分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topCountries.map((country, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-700">{country.country}</span>
                        <span className="text-sm font-medium text-slate-800">${country.revenue.toFixed(2)}</span>
                      </div>
                      <Progress value={(country.orders / stats.overview.orders.value) * 100} className="h-1.5" />
                    </div>
                    <span className="text-xs text-slate-500 w-8">{country.orders}单</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 趋势图表 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>销售趋势</CardTitle>
              <CardDescription>最近7天销售额和订单数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500">销售趋势图表</p>
                  <p className="text-xs text-slate-400 mt-1">展示每日销售额和订单趋势</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 设备分布 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>设备分布</CardTitle>
              <CardDescription>访客设备类型分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-around h-64">
                {stats.devices.map((device) => (
                  <div key={device.device} className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-3">
                      <device.icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-800">{device.device}</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{device.percent}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
