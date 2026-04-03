'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Users, School, BarChart3, Trophy, Settings, Bell, LogOut, Globe,
  Download, Calendar, TrendingUp, TrendingDown, Filter, Search, FileText, Target,
  Brain, AlertTriangle, Store, Award, Zap, ChevronDown, RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// 数据类型分类
const dataCategories = [
  {
    id: 'training',
    name: '实训数据',
    icon: Store,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    description: '店铺运营、任务完成、实训进度',
  },
  {
    id: 'learning',
    name: '学情数据',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: '学习时长、任务完成率、能力评估',
  },
  {
    id: 'achievement',
    name: '成绩数据',
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: '考试成绩、技能评分、五维能力',
  },
  {
    id: 'risk',
    name: '风险数据',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    description: '风险事件处理、合规意识',
  },
  {
    id: 'ai',
    name: 'AI应用数据',
    icon: Brain,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    description: 'AI使用频率、AI耦合度、AI辅助效果',
  },
];

// 时间维度分类
const timeCategories = [
  { id: 'realtime', name: '实时报表', icon: Zap, description: '当日/本周实时数据' },
  { id: 'weekly', name: '周报', icon: Calendar, description: '每周汇总统计' },
  { id: 'monthly', name: '月报', icon: FileText, description: '每月综合分析' },
  { id: 'semester', name: '学期报', icon: Target, description: '学期数据总结' },
  { id: 'yearly', name: '年报', icon: BarChart3, description: '全年数据统计' },
];

// 对象维度分类
const objectCategories = [
  { id: 'individual', name: '个人报告', count: 128 },
  { id: 'class', name: '班级报告', count: 12 },
  { id: 'school', name: '全校报告', count: 4 },
];

// 完整的报表数据
const allReports = [
  // 实训数据
  { id: 1, name: '全校模拟店铺运营周报', category: 'training', timeType: 'weekly', objectType: 'school', date: '2026-04-02', status: 'ready', downloads: 45 },
  { id: 2, name: '电商2201班店铺搭建实训报告', category: 'training', timeType: 'semester', objectType: 'class', date: '2026-03-30', status: 'ready', downloads: 23 },
  { id: 3, name: '跨境平台运营实时数据', category: 'training', timeType: 'realtime', objectType: 'school', date: '2026-04-02', status: 'ready', downloads: 67 },
  { id: 4, name: '张三-独立站运营个人实训报告', category: 'training', timeType: 'monthly', objectType: 'individual', date: '2026-03-25', status: 'ready', downloads: 12 },

  // 学情数据
  { id: 5, name: '全校学生学习进度月报', category: 'learning', timeType: 'monthly', objectType: 'school', date: '2026-03-31', status: 'ready', downloads: 56 },
  { id: 6, name: '电商2202班学情分析周报', category: 'learning', timeType: 'weekly', objectType: 'class', date: '2026-03-30', status: 'ready', downloads: 34 },
  { id: 7, name: '李四个人学习时长统计', category: 'learning', timeType: 'monthly', objectType: 'individual', date: '2026-03-28', status: 'ready', downloads: 8 },
  { id: 8, name: '全校任务完成率实时监控', category: 'learning', timeType: 'realtime', objectType: 'school', date: '2026-04-02', status: 'ready', downloads: 89 },

  // 成绩数据
  { id: 9, name: '2026春季学期成绩汇总', category: 'achievement', timeType: 'semester', objectType: 'school', date: '2026-03-25', status: 'ready', downloads: 123 },
  { id: 10, name: '电商2201班五维能力评估报告', category: 'achievement', timeType: 'monthly', objectType: 'class', date: '2026-03-20', status: 'ready', downloads: 45 },
  { id: 11, name: '技能竞赛成绩分析', category: 'achievement', timeType: 'semester', objectType: 'school', date: '2026-03-18', status: 'ready', downloads: 78 },
  { id: 12, name: '王五个人能力雷达图报告', category: 'achievement', timeType: 'monthly', objectType: 'individual', date: '2026-03-22', status: 'ready', downloads: 15 },

  // 风险数据
  { id: 13, name: '全校风险事件处理统计分析', category: 'risk', timeType: 'monthly', objectType: 'school', date: '2026-03-30', status: 'ready', downloads: 34 },
  { id: 14, name: '电商2203班合规意识评估报告', category: 'risk', timeType: 'semester', objectType: 'class', date: '2026-03-28', status: 'ready', downloads: 21 },
  { id: 15, name: '赵六风险应对能力分析', category: 'risk', timeType: 'monthly', objectType: 'individual', date: '2026-03-26', status: 'ready', downloads: 9 },

  // AI应用数据
  { id: 16, name: '全校AI辅助使用情况分析', category: 'ai', timeType: 'monthly', objectType: 'school', date: '2026-03-31', status: 'ready', downloads: 56 },
  { id: 17, name: 'AI耦合度监控实时报表', category: 'ai', timeType: 'realtime', objectType: 'school', date: '2026-04-02', status: 'ready', downloads: 78 },
  { id: 18, name: '电商2201班AI辅助效果评估', category: 'ai', timeType: 'semester', objectType: 'class', date: '2026-03-25', status: 'ready', downloads: 32 },
];

const menuItems = [
  { id: 'dashboard', label: '数据总览', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'accounts', label: '账号管理', icon: Users, href: '/admin/accounts' },
  { id: 'classes', label: '班级管理', icon: School, href: '/admin/classes' },
  { id: 'reports', label: '数据报表', icon: BarChart3, href: '/admin/reports' },
  { id: 'competitions', label: '竞赛管理', icon: Trophy, href: '/admin/competitions' },
  { id: 'settings', label: '系统设置', icon: Settings, href: '/admin/settings' },
];

export default function AdminReportsPage() {
  const [activeMenu, setActiveMenu] = useState('reports');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeType, setSelectedTimeType] = useState('all');
  const [selectedObjectType, setSelectedObjectType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 筛选报表
  const filteredReports = allReports.filter(report => {
    const matchCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchTime = selectedTimeType === 'all' || report.timeType === selectedTimeType;
    const matchObject = selectedObjectType === 'all' || report.objectType === selectedObjectType;
    const matchSearch = searchQuery === '' || 
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.date.includes(searchQuery);
    return matchCategory && matchTime && matchObject && matchSearch;
  });

  const getCategoryBadge = (category: string) => {
    const cat = dataCategories.find(c => c.id === category);
    return cat ? (
      <Badge variant="outline" className={`${cat.color} ${cat.bgColor} border-0`}>
        {cat.name}
      </Badge>
    ) : null;
  };

  const getTimeBadge = (timeType: string) => {
    const time = timeCategories.find(t => t.id === timeType);
    return time ? (
      <Badge variant="secondary" className="text-xs">
        {time.name}
      </Badge>
    ) : null;
  };

  const getObjectBadge = (objectType: string) => {
    const obj = objectCategories.find(o => o.id === objectType);
    return obj ? (
      <Badge variant="outline" className="text-xs">
        {obj.name}
      </Badge>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
              <p className="text-xs text-slate-500">管理员端</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5 text-slate-600" /></Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">张</div>
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMenu === item.id ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-60 pt-16 min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">数据报表</h2>
            <p className="text-slate-500">导出全校实训数据报表，支持教学评估与双高建设上报</p>
          </div>
          <Button><Download className="h-4 w-4 mr-2" />生成报表</Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: '本周实训完成率', value: '78.5%', change: '+5.2%', up: true },
            { label: '本周考核通过率', value: '92.3%', change: '+2.1%', up: true },
            { label: '活跃学生数', value: '1,156', change: '+86', up: true },
            { label: '模拟店铺总数', value: '2,543', change: '+127', up: true },
          ].map((stat, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.up ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                  <span className={stat.up ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 筛选区域 */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-violet-600" />
              报表筛选
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 数据类型分类 */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">数据类型</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  全部 ({allReports.length})
                </button>
                {dataCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      {cat.name}
                      ({allReports.filter(r => r.category === cat.id).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 时间维度和对象维度 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-3 block">时间维度</label>
                <select
                  className="w-full h-10 px-3 border rounded-lg text-sm"
                  value={selectedTimeType}
                  onChange={(e) => setSelectedTimeType(e.target.value)}
                >
                  <option value="all">全部时间</option>
                  {timeCategories.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-3 block">对象维度</label>
                <select
                  className="w-full h-10 px-3 border rounded-lg text-sm"
                  value={selectedObjectType}
                  onChange={(e) => setSelectedObjectType(e.target.value)}
                >
                  <option value="all">全部对象</option>
                  {objectCategories.map(o => (
                    <option key={o.id} value={o.id}>{o.name} ({o.count})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 搜索框 */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">搜索报表</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="搜索报表名称或日期..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* 筛选结果统计 */}
            <div className="flex items-center justify-between p-4 bg-violet-50 rounded-lg">
              <span className="text-sm text-violet-700">
                筛选结果：<strong>{filteredReports.length}</strong> 份报表
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setSelectedCategory('all'); setSelectedTimeType('all'); setSelectedObjectType('all'); setSearchQuery(''); }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                重置筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 报表列表 */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>报表列表</CardTitle>
            <CardDescription>
              基于学生端实训、学情、成绩、风险、AI应用等数据生成的分类报表
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredReports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">暂无符合条件的报表</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReports.map((report) => {
                  const category = dataCategories.find(c => c.id === report.category);
                  const CategoryIcon = category?.icon;
                  return (
                    <div key={report.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-violet-300 transition-colors">
                      <div className={`w-10 h-10 rounded-lg ${category?.bgColor} flex items-center justify-center`}>
                        {CategoryIcon && <CategoryIcon className={`h-5 w-5 ${category?.color}`} />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{report.name}</p>
                        <p className="text-sm text-slate-500 mt-1">生成时间：{report.date}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {getCategoryBadge(report.category)}
                          {getTimeBadge(report.timeType)}
                          {getObjectBadge(report.objectType)}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">下载次数</p>
                        <p className="font-medium text-slate-700">{report.downloads}</p>
                      </div>
                      <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />下载</Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
