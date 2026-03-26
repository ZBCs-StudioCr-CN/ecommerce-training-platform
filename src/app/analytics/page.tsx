'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  ShoppingCart,
  DollarSign,
  Globe,
  Monitor,
  MapPin,
  Calendar,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const kpiData = [
    {
      id: 'visitors',
      title: '访问量',
      value: '12,847',
      change: '+23.5%',
      trend: 'up',
      icon: Users,
      color: 'blue',
    },
    {
      id: 'pageviews',
      title: '页面浏览',
      value: '45,231',
      change: '+18.2%',
      trend: 'up',
      icon: Eye,
      color: 'green',
    },
    {
      id: 'orders',
      title: '订单数',
      value: '384',
      change: '+45.8%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'purple',
    },
    {
      id: 'revenue',
      title: '销售额',
      value: '$28,459',
      change: '+32.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'amber',
    },
  ];

  const trafficSources = [
    { name: 'Google 搜索', visits: 4521, percentage: 35, color: 'bg-blue-500' },
    { name: 'Google Ads', visits: 3200, percentage: 25, color: 'bg-green-500' },
    { name: '社交媒体', visits: 2568, percentage: 20, color: 'bg-purple-500' },
    { name: '直接访问', visits: 1542, percentage: 12, color: 'bg-amber-500' },
    { name: '邮件营销', visits: 1016, percentage: 8, color: 'bg-pink-500' },
  ];

  const topCountries = [
    { name: '美国', flag: '🇺🇸', visits: 5234, orders: 156, revenue: '$12,450' },
    { name: '英国', flag: '🇬🇧', visits: 2341, orders: 78, revenue: '$5,890' },
    { name: '德国', flag: '🇩🇪', visits: 1876, orders: 52, revenue: '$4,230' },
    { name: '法国', flag: '🇫🇷', visits: 1423, orders: 41, revenue: '$2,890' },
    { name: '加拿大', flag: '🇨🇦', visits: 1102, orders: 32, revenue: '$2,120' },
  ];

  const topProducts = [
    { name: '时尚连衣裙', views: 3421, sales: 89, revenue: '$5,340', conversion: '2.6%' },
    { name: '休闲运动鞋', views: 2876, sales: 67, revenue: '$6,029', conversion: '2.3%' },
    { name: '简约手提包', views: 2134, sales: 54, revenue: '$2,430', conversion: '2.5%' },
    { name: '太阳镜', views: 1876, sales: 48, revenue: '$1,439', conversion: '2.6%' },
  ];

  const alerts = [
    { type: 'warning', message: '欧洲地区转化率低于预期，建议优化运费策略', time: '2小时前' },
    { type: 'info', message: 'Google Ads 广告投放效果良好，ROI达到3.2', time: '5小时前' },
    { type: 'success', message: '本周销售额已超过目标值 15%', time: '今天' },
  ];

  const recommendations = [
    { title: '优化商品详情页', description: '连衣裙商品跳出率较高，建议增加商品视频展示', impact: '预计提升转化率 0.5%' },
    { title: '调整广告投放', description: '英国地区广告成本偏高，建议优化关键词', impact: '预计降低 CAC 12%' },
    { title: '添加社媒入口', description: 'Instagram 流量转化效果最佳，建议增加入口', impact: '预计增加流量 20%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回控制台
            </Button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">My Fashion Store</p>
                <p className="text-xs text-slate-500">数据分析看板</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'ghost'}
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              刷新
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              导出报告
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* KPI 卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi) => (
            <Card key={kpi.id} className="border-0 shadow-lg shadow-slate-200/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{kpi.title}</p>
                    <p className="text-3xl font-bold text-slate-800">{kpi.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    kpi.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    kpi.color === 'green' ? 'bg-green-100 text-green-600' :
                    kpi.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    <kpi.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-xs text-slate-400">vs 上周</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧主内容 */}
          <div className="col-span-2 space-y-6">
            {/* 流量趋势图 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>流量趋势</CardTitle>
                    <CardDescription>过去7天的访问量变化</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm text-slate-600">访问量</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm text-slate-600">订单数</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 模拟图表 */}
                <div className="h-64 flex items-end justify-between gap-2">
                  {[65, 78, 52, 89, 95, 72, 88].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col gap-1">
                        <div
                          className="w-full bg-blue-500 rounded-t"
                          style={{ height: `${height * 2}px` }}
                        />
                        <div
                          className="w-full bg-green-500 rounded-b"
                          style={{ height: `${(height / 10) * 2}px` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">
                        {['周一', '周二', '周三', '周四', '周五', '周六', '周日'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 流量来源 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>流量来源分布</CardTitle>
                <CardDescription>各渠道访问量占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={source.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{source.name}</span>
                        <span className="text-sm text-slate-500">{source.visits.toLocaleString()} 访问</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${source.color} rounded-full transition-all duration-500`}
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 热门商品 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>热门商品表现</CardTitle>
                <CardDescription>浏览量、销量与转化率分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">商品名称</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">浏览量</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">销量</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">销售额</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">转化率</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr key={product.name} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">👗👟👜🕶️'[index]</span>
                              <span className="font-medium text-slate-800">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right text-slate-600">{product.views.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-slate-600">{product.sales}</td>
                          <td className="py-3 px-4 text-right font-medium text-blue-600">{product.revenue}</td>
                          <td className="py-3 px-4 text-right">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {product.conversion}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧面板 */}
          <div className="space-y-6">
            {/* 地区分布 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  地区分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCountries.map((country) => (
                    <div key={country.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{country.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{country.visits.toLocaleString()} 访问</span>
                          <span>·</span>
                          <span>{country.orders} 订单</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{country.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 异常提醒 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  异常提醒
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        alert.type === 'warning' ? 'bg-amber-50' :
                        alert.type === 'success' ? 'bg-green-50' :
                        'bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {alert.type === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                        ) : alert.type === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        ) : (
                          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">{alert.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 优化建议 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  优化建议
                </CardTitle>
                <CardDescription className="text-blue-100">
                  基于数据分析的智能建议
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/10 backdrop-blur">
                      <p className="font-medium text-sm mb-1">{rec.title}</p>
                      <p className="text-xs text-blue-100 mb-2">{rec.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {rec.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
