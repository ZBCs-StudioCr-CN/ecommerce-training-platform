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
  User,
  Star,
  Target,
  CheckCircle2,
  Clock,
  Play,
  ChevronRight,
  Video,
  FileQuestion,
  Download,
  Bookmark,
  Volume2,
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

const courses = [
  {
    id: 1,
    title: '第一章：独立站认知与市场调研',
    lessons: 6,
    completed: 6,
    duration: '45分钟',
    type: 'video',
  },
  {
    id: 2,
    title: '第二章：独立站搭建基础',
    lessons: 8,
    completed: 5,
    duration: '60分钟',
    type: 'video',
  },
  {
    id: 3,
    title: '第三章：流量推广策略',
    lessons: 10,
    completed: 0,
    duration: '75分钟',
    type: 'video',
  },
  {
    id: 4,
    title: '第四章：转化运营技巧',
    lessons: 7,
    completed: 0,
    duration: '50分钟',
    type: 'video',
  },
  {
    id: 5,
    title: '第五章：数据分析与优化',
    lessons: 8,
    completed: 0,
    duration: '55分钟',
    type: 'video',
  },
  {
    id: 6,
    title: '第六章：合规风控与政策',
    lessons: 5,
    completed: 0,
    duration: '35分钟',
    type: 'video',
  },
];

const recentVideos = [
  { id: 1, title: 'Shopify店铺装修技巧', duration: '12:35', progress: 80, thumbnail: '🎨' },
  { id: 2, title: 'Google SEO优化入门', duration: '18:20', progress: 45, thumbnail: '📈' },
  { id: 3, title: '社媒广告投放策略', duration: '15:10', progress: 20, thumbnail: '📱' },
];

const knowledgeBase = [
  { id: 1, title: '独立站运营全流程指南', type: 'pdf', downloads: 156 },
  { id: 2, title: '海外合规政策解读', type: 'pdf', downloads: 89 },
  { id: 3, title: 'Google Ads投放手册', type: 'pdf', downloads: 234 },
  { id: 4, title: '跨境物流解决方案', type: 'pdf', downloads: 67 },
];

export default function StudentLearningPage() {
  const [activeMenu, setActiveMenu] = useState('learning');
  const [activeTab, setActiveTab] = useState('courses');

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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">学习中心</h2>
          <p className="text-slate-500">课程学习、微课视频、知识库查询</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="h-4 w-4" />
              课程体系
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="h-4 w-4" />
              微课视频
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="gap-2">
              <FileText className="h-4 w-4" />
              知识库
            </TabsTrigger>
          </TabsList>

          {/* 课程体系 */}
          <TabsContent value="courses">
            <div className="grid grid-cols-2 gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                        course.completed === course.lessons
                          ? 'bg-green-100'
                          : course.completed > 0
                          ? 'bg-blue-100'
                          : 'bg-slate-100'
                      }`}>
                        {course.completed === course.lessons ? '✅' : course.completed > 0 ? '📖' : '📚'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-2">{course.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            {course.lessons} 课时
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={(course.completed / course.lessons) * 100} className="flex-1 h-2" />
                          <span className="text-sm font-medium text-slate-600">
                            {course.completed}/{course.lessons}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant={course.completed === course.lessons ? 'outline' : 'default'}>
                        {course.completed === course.lessons ? '复习' : course.completed > 0 ? '继续学习' : '开始学习'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 微课视频 */}
          <TabsContent value="videos">
            <div className="grid grid-cols-3 gap-6">
              {/* 最近观看 */}
              <div className="col-span-2">
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>最近观看</CardTitle>
                    <CardDescription>继续学习未完成的微课</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentVideos.map((video) => (
                        <div key={video.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                          <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-3xl">
                            {video.thumbnail}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-800 mb-1">{video.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {video.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Volume2 className="h-4 w-4" />
                                已观看 {video.progress}%
                              </span>
                            </div>
                            <Progress value={video.progress} className="h-1.5 mt-2" />
                          </div>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-1" />
                            继续
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 视频分类 */}
              <div>
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>视频分类</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: '建站教程', count: 24, icon: '🏗️' },
                        { name: '推广策略', count: 18, icon: '📢' },
                        { name: '运营技巧', count: 15, icon: '💡' },
                        { name: '数据分析', count: 12, icon: '📊' },
                        { name: '合规政策', count: 8, icon: '⚖️' },
                      ].map((category) => (
                        <button key={category.name} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                          <span className="text-xl">{category.icon}</span>
                          <span className="flex-1 font-medium text-slate-700">{category.name}</span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 知识库 */}
          <TabsContent value="knowledge">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>实训知识库</CardTitle>
                    <CardDescription>独立站教程、海外合规、推广技巧、行业案例</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {knowledgeBase.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                          <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-800">{doc.title}</h4>
                            <p className="text-sm text-slate-500">PDF文档 · {doc.downloads} 次下载</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost">
                              <Bookmark className="h-4 w-4 text-slate-400" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              下载
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>热门标签</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Shopify', 'SEO', 'Google Ads', '社媒营销', '转化率', '客单价', '物流', '支付', 'GDPR', '选品', '定价策略', '客服'].map((tag) => (
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-50 hover:text-blue-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg shadow-slate-200/50 mt-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <CardHeader>
                    <CardTitle>学习建议</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-100 mb-3">
                      根据您的学习进度，建议重点学习：
                    </p>
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-white/20">
                        <p className="text-sm font-medium">流量推广策略</p>
                        <p className="text-xs text-blue-200">当前得分较低</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/20">
                        <p className="text-sm font-medium">转化运营技巧</p>
                        <p className="text-xs text-blue-200">即将开始实训</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
