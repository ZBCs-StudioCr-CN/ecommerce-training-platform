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
  Download,
  Eye,
  Star,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
  FileDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
];

const practiceReports = [
  { id: 1, title: '市场调研与选品实训报告', module: '市场调研', score: 92, date: '2026-03-15', status: 'completed' },
  { id: 2, title: '独立站搭建实训报告', module: '独立站搭建', score: null, date: '2026-03-26', status: 'in_progress' },
];

const certificates = [
  { id: 1, title: '市场调研与选品专项证书', issueDate: '2026-03-16', issuer: '电商学院', type: 'module' },
  { id: 2, title: '跨境电商技能竞赛三等奖', issueDate: '2026-03-20', issuer: '教务处', type: 'competition' },
];

const portfolio = {
  totalPractices: 12,
  completedModules: 1,
  avgScore: 92,
  rank: 3,
  skills: [
    { name: '市场调研', score: 92 },
    { name: '独立站搭建', score: 65 },
    { name: '流量推广', score: 0 },
    { name: '转化运营', score: 0 },
    { name: '数据分析', score: 0 },
    { name: '合规风控', score: 0 },
  ],
};

export default function AchievementPage() {
  const [activeMenu, setActiveMenu] = useState('achievement');

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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
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
        {/* 页面标题 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">成果中心</h2>
            <p className="text-slate-500">实训报告、作品集、证书管理</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            导出作品集
          </Button>
        </div>

        {/* 个人档案概览 */}
        <Card className="border-0 shadow-xl shadow-slate-200/50 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                张
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800">张三的个人档案</h3>
                <p className="text-slate-500">电商2201班 · 学习进度 35%</p>
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <span className="text-slate-600">班级排名第 <span className="font-bold text-amber-600">{portfolio.rank}</span> 名</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-500" />
                    <span className="text-slate-600">平均成绩 <span className="font-bold text-blue-600">{portfolio.avgScore}</span> 分</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-slate-600">已完成 <span className="font-bold text-green-600">{portfolio.completedModules}/6</span> 个模块</span>
                  </div>
                </div>
              </div>
              <div className="w-48">
                <p className="text-sm text-slate-500 mb-2">技能掌握度</p>
                <div className="grid grid-cols-3 gap-1">
                  {portfolio.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`h-8 rounded flex items-center justify-center text-xs font-medium ${
                        skill.score >= 80 ? 'bg-green-100 text-green-700' :
                        skill.score >= 50 ? 'bg-blue-100 text-blue-700' :
                        skill.score > 0 ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-400'
                      }`}
                      title={`${skill.name}: ${skill.score}%`}
                    >
                      {skill.score}%
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：实训报告 */}
          <div className="col-span-2 space-y-6">
            {/* 实训报告 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>实训报告</CardTitle>
                  <CardDescription>自动生成的实训报告，可导出PDF</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {practiceReports.map((report) => (
                    <div key={report.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        report.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <FileText className={`h-6 w-6 ${
                          report.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800">{report.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <span>{report.module}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.date}
                          </span>
                        </div>
                      </div>
                      {report.score !== null && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="font-bold text-amber-600">{report.score}分</span>
                        </div>
                      )}
                      {report.status === 'in_progress' && (
                        <Badge className="bg-blue-100 text-blue-700">进行中</Badge>
                      )}
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看
                        </Button>
                        {report.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <FileDown className="h-4 w-4 mr-1" />
                            导出
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 作品展示 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>作品展示</CardTitle>
                <CardDescription>实训期间完成的独立站作品</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <Store className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">My Fashion Store</p>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800">时尚服饰独立站</p>
                          <p className="text-xs text-slate-500">目标市场：美国</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-700">搭建中</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center aspect-[4/3] text-slate-400 hover:border-blue-300 hover:text-blue-400 cursor-pointer transition-colors">
                    <div className="text-center">
                      <Target className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">新建作品</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：证书与荣誉 */}
          <div className="space-y-6">
            {/* 证书荣誉 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  证书荣誉
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-3 rounded-lg border border-slate-200 hover:border-amber-300 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          cert.type === 'module' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          <Award className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800 text-sm">{cert.title}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span>{cert.issuer}</span>
                            <span>·</span>
                            <span>{cert.issueDate}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 成长轨迹 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  成长轨迹
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                    <div>
                      <p className="text-sm text-slate-800">完成市场调研与选品模块</p>
                      <p className="text-xs text-slate-500">2026-03-15</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                    <div>
                      <p className="text-sm text-slate-800">获得跨境电商技能竞赛三等奖</p>
                      <p className="text-xs text-slate-500">2026-03-20</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <p className="text-sm text-slate-800">开始独立站搭建实训</p>
                      <p className="text-xs text-slate-500">2026-03-22</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-300 mt-2" />
                    <div>
                      <p className="text-sm text-slate-500">注册平台账号</p>
                      <p className="text-xs text-slate-400">2026-03-01</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 作品集导出 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-violet-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>求职作品集</CardTitle>
                <CardDescription className="text-violet-100">一键生成专业作品集</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-violet-100 mb-4">
                  整合您的实训作品、报告、证书，生成专业PDF作品集，助力求职应聘
                </p>
                <Button className="w-full" variant="secondary">
                  <Download className="h-4 w-4 mr-2" />
                  生成作品集PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
