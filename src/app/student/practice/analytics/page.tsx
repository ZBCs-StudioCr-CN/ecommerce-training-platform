'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, BookOpen, Store, Award, FileText, MessageCircle, Bell, Globe,
  ChevronLeft, ChevronRight, Save, TrendingUp, TrendingDown, Eye, MousePointer, ShoppingCart, DollarSign, Users, Calendar, BarChart3, PieChart, LineChart, Activity, Target, AlertTriangle, Lightbulb, ArrowUpRight, ArrowDownRight, RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  { id: 1, title: '流量数据分析', status: 'completed' },
  { id: 2, title: '转化漏斗分析', status: 'completed' },
  { id: 3, title: '销售数据解读', status: 'in_progress' },
  { id: 4, title: '异常归因诊断', status: 'pending' },
  { id: 5, title: '优化方案制定', status: 'pending' },
];

// 模拟数据
const trafficData = {
  totalVisits: 45680,
  uniqueVisitors: 32450,
  pageViews: 128900,
  avgSessionDuration: '3m 45s',
  bounceRate: 42.5,
  topSources: [
    { source: 'Google Organic', visits: 18500, percentage: 40.5, trend: '+12%' },
    { source: 'Google Ads', visits: 12300, percentage: 26.9, trend: '+8%' },
    { source: 'Facebook', visits: 8200, percentage: 18.0, trend: '+5%' },
    { source: 'Direct', visits: 4500, percentage: 9.9, trend: '-2%' },
    { source: 'Email', visits: 2180, percentage: 4.8, trend: '+15%' },
  ],
  topPages: [
    { page: '/products', views: 45600, exitRate: 32 },
    { page: '/', views: 32000, exitRate: 28 },
    { page: '/products/dress-001', views: 12500, exitRate: 45 },
    { page: '/cart', views: 8900, exitRate: 52 },
    { page: '/checkout', views: 6200, exitRate: 38 },
  ],
};

const conversionFunnel = [
  { stage: '访问店铺', count: 45680, rate: 100 },
  { stage: '浏览商品', count: 32450, rate: 71 },
  { stage: '加入购物车', count: 8900, rate: 19.5 },
  { stage: '开始结账', count: 6200, rate: 13.6 },
  { stage: '完成支付', count: 3150, rate: 6.9 },
];

const salesData = {
  totalRevenue: 45680,
  totalOrders: 3150,
  avgOrderValue: 145,
  topProducts: [
    { name: '夏季连衣裙', sales: 856, revenue: 51360, trend: '+15%' },
    { name: '休闲T恤', sales: 1245, revenue: 37350, trend: '+8%' },
    { name: '牛仔裤', sales: 567, revenue: 45330, trend: '+12%' },
    { name: '运动套装', sales: 234, revenue: 23400, trend: '-3%' },
    { name: '针织衫', sales: 248, revenue: 18600, trend: '+5%' },
  ],
  revenueByCountry: [
    { country: 'United States', flag: '🇺🇸', revenue: 18500, percentage: 40.5 },
    { country: 'United Kingdom', flag: '🇬🇧', revenue: 9200, percentage: 20.1 },
    { country: 'Germany', flag: '🇩🇪', revenue: 6800, percentage: 14.9 },
    { country: 'Canada', flag: '🇨🇦', revenue: 5200, percentage: 11.4 },
    { country: 'Australia', flag: '🇦🇺', revenue: 3980, percentage: 8.7 },
  ],
};

const anomalies = [
  { id: 1, type: 'warning', title: '购物车放弃率偏高', description: '购物车放弃率达到78%，高于行业平均（70%），建议优化结账流程', impact: '高', suggestion: '简化结账步骤、添加信任徽章、提供多种支付方式' },
  { id: 2, type: 'info', title: '移动端转化率较低', description: '移动端转化率仅2.1%，低于桌面端的4.5%', impact: '中', suggestion: '优化移动端页面加载速度、简化导航结构' },
  { id: 3, type: 'success', title: '邮件渠道效果显著', description: '邮件营销ROI达到4.2x，是表现最好的渠道', impact: '低', suggestion: '继续加大邮件营销投入，优化邮件内容' },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStep, setCurrentStep] = useState(3);
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-slate-700 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <Link href="/student/practice" className="flex items-center gap-2 text-slate-400 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm">返回实训列表</span>
            </Link>
            <div className="w-px h-6 bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium">数据分析实训</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32 h-8 bg-slate-800 border-slate-600 text-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">今日</SelectItem>
                <SelectItem value="7d">近7天</SelectItem>
                <SelectItem value="30d">近30天</SelectItem>
                <SelectItem value="90d">近90天</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <RefreshCw className="h-4 w-4 mr-2" />刷新数据
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Save className="h-4 w-4 mr-2" />保存进度
            </Button>
          </div>
        </div>
      </header>

      {/* Steps */}
      <div className="fixed top-14 left-0 right-0 h-12 bg-white border-b z-40">
        <div className="flex items-center h-full px-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                  currentStep === step.id 
                    ? 'bg-blue-500 text-white' 
                    : step.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-slate-100 text-slate-500'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <span className="text-xs font-bold">{step.id}</span>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && <ChevronRight className="h-4 w-4 text-slate-300 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border rounded-lg p-1">
              <TabsTrigger value="overview">数据概览</TabsTrigger>
              <TabsTrigger value="traffic">流量分析</TabsTrigger>
              <TabsTrigger value="conversion">转化漏斗</TabsTrigger>
              <TabsTrigger value="sales">销售数据</TabsTrigger>
              <TabsTrigger value="anomalies">异常诊断</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                {[
                  { label: '总访问量', value: trafficData.totalVisits.toLocaleString(), icon: Eye, change: '+12.5%', color: 'blue' },
                  { label: '订单数', value: salesData.totalOrders.toLocaleString(), icon: ShoppingCart, change: '+8.3%', color: 'emerald' },
                  { label: '总收入', value: `$${salesData.totalRevenue.toLocaleString()}`, icon: DollarSign, change: '+15.2%', color: 'violet' },
                  { label: '转化率', value: '6.9%', icon: Target, change: '+0.8%', color: 'amber' },
                  { label: '客单价', value: `$${salesData.avgOrderValue}`, icon: TrendingUp, change: '+$12', color: 'rose' },
                ].map((metric, i) => (
                  <Card key={i} className="border-0 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500">{metric.label}</span>
                        <metric.icon className="h-5 w-5 text-slate-300" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                      <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-3 w-3" />{metric.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>流量来源分布</CardTitle>
                    <CardDescription>各渠道流量占比</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trafficData.topSources.map((source, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{source.source}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">{source.visits.toLocaleString()}</span>
                                <span className={`text-xs ${source.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{source.trend}</span>
                              </div>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                style={{ width: `${source.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Countries */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>销售额地区分布</CardTitle>
                    <CardDescription>各国家/地区销售占比</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {salesData.revenueByCountry.map((country, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-2xl">{country.flag}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{country.country}</span>
                              <span className="text-sm font-bold">${country.revenue.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                style={{ width: `${country.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="mt-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-500">独立访客</p>
                    <p className="text-2xl font-bold text-slate-800">{trafficData.uniqueVisitors.toLocaleString()}</p>
                    <p className="text-xs text-emerald-500">+10.2%</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-500">页面浏览量</p>
                    <p className="text-2xl font-bold text-slate-800">{trafficData.pageViews.toLocaleString()}</p>
                    <p className="text-xs text-emerald-500">+15.8%</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-500">跳出率</p>
                    <p className="text-2xl font-bold text-slate-800">{trafficData.bounceRate}%</p>
                    <p className="text-xs text-red-500">+2.1%</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>热门页面</CardTitle>
                  <CardDescription>访问量最高的页面</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">页面</th>
                        <th className="py-3 px-4 text-right text-sm font-medium text-slate-500">浏览量</th>
                        <th className="py-3 px-4 text-right text-sm font-medium text-slate-500">退出率</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trafficData.topPages.map((page, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-3 px-4 font-medium text-blue-600">{page.page}</td>
                          <td className="py-3 px-4 text-right">{page.views.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={page.exitRate > 40 ? 'text-red-500' : 'text-slate-600'}>{page.exitRate}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversion" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>转化漏斗分析</CardTitle>
                  <CardDescription>从访问到成交的完整转化路径</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversionFunnel.map((stage, i) => (
                      <div key={i} className="relative">
                        <div className="flex items-center gap-4">
                          <div className="w-32 text-right">
                            <p className="font-medium text-slate-800">{stage.stage}</p>
                            <p className="text-sm text-slate-500">{stage.count.toLocaleString()}</p>
                          </div>
                          <div className="flex-1">
                            <div 
                              className="h-12 rounded-lg flex items-center px-4"
                              style={{ 
                                width: `${stage.rate}%`,
                                background: `linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)`,
                                opacity: 0.3 + (stage.rate / 100) * 0.7
                              }}
                            >
                              <span className="text-white font-bold">{stage.rate.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                        {i < conversionFunnel.length - 1 && (
                          <div className="ml-32 my-2 text-sm text-red-500">
                            ⬇️ 流失 {(conversionFunnel[i].count - conversionFunnel[i+1].count).toLocaleString()} 人 ({((conversionFunnel[i].count - conversionFunnel[i+1].count) / conversionFunnel[i].count * 100).toFixed(1)}%)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>热销商品排行</CardTitle>
                  <CardDescription>按销量和收入排序</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {salesData.topProducts.map((product, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{product.name}</p>
                          <p className="text-sm text-slate-500">销量: {product.sales}件</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">${product.revenue.toLocaleString()}</p>
                          <p className={`text-sm ${product.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{product.trend}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="anomalies" className="mt-4">
              <div className="space-y-4">
                {anomalies.map((anomaly) => (
                  <Card key={anomaly.id} className={`border-0 shadow-lg ${
                    anomaly.type === 'warning' ? 'border-l-4 border-l-amber-500' :
                    anomaly.type === 'success' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-blue-500'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          anomaly.type === 'warning' ? 'bg-amber-100' :
                          anomaly.type === 'success' ? 'bg-emerald-100' : 'bg-blue-100'
                        }`}>
                          {anomaly.type === 'warning' ? (
                            <AlertTriangle className="h-6 w-6 text-amber-500" />
                          ) : anomaly.type === 'success' ? (
                            <TrendingUp className="h-6 w-6 text-emerald-500" />
                          ) : (
                            <Lightbulb className="h-6 w-6 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-slate-800">{anomaly.title}</h3>
                            <Badge className={
                              anomaly.impact === '高' ? 'bg-red-100 text-red-700' :
                              anomaly.impact === '中' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                            }>
                              影响度: {anomaly.impact}
                            </Badge>
                          </div>
                          <p className="text-slate-600 mb-3">{anomaly.description}</p>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-sm text-slate-500">优化建议：</p>
                            <p className="text-sm text-slate-700">{anomaly.suggestion}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">查看详情</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
