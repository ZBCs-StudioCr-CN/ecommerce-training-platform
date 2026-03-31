'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  DollarSign,
  ShoppingCart,
  BarChart3,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Download,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StudentSidebar, StudentHeader } from '@/components/student-layout';

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
  const [dateRange, setDateRange] = useState('last7days');
  const stats = mockStats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 顶部导航栏 */}
      <StudentHeader />

      {/* 侧边导航 */}
      <StudentSidebar activeMenu="practice" />

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
                stats.overview.revenue.change >= 0 ? 'text-emerald-600' : 'text-red-600'
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
                stats.overview.orders.change >= 0 ? 'text-emerald-600' : 'text-red-600'
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
                stats.overview.visitors.change >= 0 ? 'text-emerald-600' : 'text-red-600'
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
                stats.overview.conversionRate.change >= 0 ? 'text-emerald-600' : 'text-red-600'
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
                stats.overview.avgOrderValue.change >= 0 ? 'text-emerald-600' : 'text-red-600'
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
                stats.overview.returningCustomers.change >= 0 ? 'text-emerald-600' : 'text-red-600'
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
                          <TrendingUp className="h-3 w-3 text-emerald-500" />
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
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold">
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
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mx-auto mb-3">
                      <device.icon className="h-10 w-10 text-emerald-600" />
                    </div>
                    <p className="font-semibold text-slate-800">{device.device}</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">{device.percent}%</p>
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
