'use client';

import { useState, useEffect } from 'react';
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
  Star,
  Target,
  CheckCircle2,
  Clock,
  Play,
  ChevronRight,
  Video,
  Download,
  Bookmark,
  Volume2,
  Upload,
  Loader2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoPlayer } from '@/components/video-player';

const menuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
];

// 课程体系数据（静态演示数据）
const courses = [
  {
    id: 1,
    title: '第一章：独立站认知与市场调研',
    description: '了解独立站基本概念，学习市场调研方法和选品策略',
    lessons: 6,
    completed: 6,
    duration: '45分钟',
    chapters: [
      { id: 101, title: '1.1 什么是独立站', duration: '8:20', completed: true },
      { id: 102, title: '1.2 独立站 vs 平台店铺', duration: '7:15', completed: true },
      { id: 103, title: '1.3 市场调研方法论', duration: '10:30', completed: true },
      { id: 104, title: '1.4 竞品分析实战', duration: '9:45', completed: true },
      { id: 105, title: '1.5 选品策略与技巧', duration: '12:00', completed: true },
      { id: 106, title: '1.6 章节测验', duration: '10题', completed: true },
    ],
  },
  {
    id: 2,
    title: '第二章：独立站搭建基础',
    description: '从零开始搭建独立站，掌握 Shopify 店铺装修技巧',
    lessons: 8,
    completed: 5,
    duration: '60分钟',
    chapters: [
      { id: 201, title: '2.1 Shopify 账号注册', duration: '5:30', completed: true },
      { id: 202, title: '2.2 店铺基础设置', duration: '8:15', completed: true },
      { id: 203, title: '2.3 主题选择与安装', duration: '7:20', completed: true },
      { id: 204, title: '2.4 页面装修技巧', duration: '12:00', completed: true },
      { id: 205, title: '2.5 商品上架流程', duration: '10:30', completed: true },
      { id: 206, title: '2.6 支付与物流配置', duration: '9:00', completed: false },
      { id: 207, title: '2.7 域名绑定设置', duration: '6:45', completed: false },
      { id: 208, title: '2.8 章节测验', duration: '15题', completed: false },
    ],
  },
  {
    id: 3,
    title: '第三章：流量推广策略',
    description: '学习多渠道流量获取方法，掌握广告投放技巧',
    lessons: 10,
    completed: 0,
    duration: '75分钟',
    chapters: [
      { id: 301, title: '3.1 流量渠道概览', duration: '6:00', completed: false },
      { id: 302, title: '3.2 Google SEO 优化', duration: '15:00', completed: false },
      { id: 303, title: '3.3 Google Ads 投放', duration: '12:00', completed: false },
      { id: 304, title: '3.4 Facebook 广告入门', duration: '10:00', completed: false },
      { id: 305, title: '3.5 TikTok 营销策略', duration: '8:30', completed: false },
      { id: 306, title: '3.6 Instagram 推广技巧', duration: '7:00', completed: false },
      { id: 307, title: '3.7 红人营销合作', duration: '9:00', completed: false },
      { id: 308, title: '3.8 邮件营销 EDM', duration: '6:30', completed: false },
      { id: 309, title: '3.9 联盟营销入门', duration: '5:30', completed: false },
      { id: 310, title: '3.10 章节测验', duration: '20题', completed: false },
    ],
  },
  {
    id: 4,
    title: '第四章：转化运营技巧',
    description: '提升店铺转化率，掌握客户运营和复购策略',
    lessons: 7,
    completed: 0,
    duration: '50分钟',
    chapters: [],
  },
  {
    id: 5,
    title: '第五章：数据分析与优化',
    description: '学会看懂数据，用数据驱动决策优化',
    lessons: 8,
    completed: 0,
    duration: '55分钟',
    chapters: [],
  },
  {
    id: 6,
    title: '第六章：合规风控与政策',
    description: '了解跨境电商合规要求，规避运营风险',
    lessons: 5,
    completed: 0,
    duration: '35分钟',
    chapters: [],
  },
];

// 文档资源数据
const knowledgeBase = [
  { id: 1, title: '独立站运营全流程指南', type: 'pdf', downloads: 156, size: '2.3MB' },
  { id: 2, title: '海外合规政策解读', type: 'pdf', downloads: 89, size: '1.8MB' },
  { id: 3, title: 'Google Ads投放手册', type: 'pdf', downloads: 234, size: '3.1MB' },
  { id: 4, title: '跨境物流解决方案', type: 'pdf', downloads: 67, size: '1.5MB' },
  { id: 5, title: 'Shopify装修模板合集', type: 'zip', downloads: 189, size: '15.2MB' },
  { id: 6, title: '广告素材设计规范', type: 'pdf', downloads: 112, size: '4.2MB' },
];

// 视频分类
const videoCategories = [
  { name: '建站教程', count: 24, icon: '🏗️', key: 'build' },
  { name: '推广策略', count: 18, icon: '📢', key: 'marketing' },
  { name: '运营技巧', count: 15, icon: '💡', key: 'operations' },
  { name: '数据分析', count: 12, icon: '📊', key: 'analytics' },
  { name: '合规政策', count: 8, icon: '⚖️', key: 'compliance' },
];

interface VideoItem {
  key: string;
  fileName: string;
  category: string;
  title: string;
}

interface DocumentItem {
  key: string;
  fileName: string;
  title: string;
  type: string;
}

export default function StudentLearningPage() {
  const [activeMenu, setActiveMenu] = useState('learning');
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<{ id: number; title: string; duration: string } | null>(null);
  
  // 对象存储视频列表
  const [cloudVideos, setCloudVideos] = useState<VideoItem[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  
  // 对象存储文档列表
  const [cloudDocuments, setCloudDocuments] = useState<DocumentItem[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  
  // 当前播放的视频
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  // 加载云端视频
  const loadCloudVideos = async () => {
    setIsLoadingVideos(true);
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      if (data.success) {
        setCloudVideos(data.videos);
      }
    } catch (error) {
      console.error('加载视频失败:', error);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  // 加载云端文档
  const loadCloudDocuments = async () => {
    setIsLoadingDocs(true);
    try {
      const response = await fetch('/api/documents');
      const data = await response.json();
      if (data.success) {
        setCloudDocuments(data.documents);
      }
    } catch (error) {
      console.error('加载文档失败:', error);
    } finally {
      setIsLoadingDocs(false);
    }
  };

  // 切换到视频/文档标签时加载
  useEffect(() => {
    if (activeTab === 'videos' && cloudVideos.length === 0) {
      loadCloudVideos();
    }
    if (activeTab === 'knowledge' && cloudDocuments.length === 0) {
      loadCloudDocuments();
    }
  }, [activeTab]);

  // 打开课程详情
  const openCourse = (course: typeof courses[0]) => {
    setSelectedCourse(course);
  };

  // 返回课程列表
  const closeCourse = () => {
    setSelectedCourse(null);
    setSelectedChapter(null);
    setPlayingVideo(null);
  };

  // 播放章节视频
  const playChapter = (chapter: { id: number; title: string; duration: string }) => {
    setSelectedChapter(chapter);
  };

  // 下载文档
  const downloadDocument = async (doc: DocumentItem | typeof knowledgeBase[0]) => {
    // 如果是云端文档
    if ('key' in doc && doc.key) {
      try {
        const response = await fetch(`/api/documents/url?key=${encodeURIComponent(doc.key)}`);
        const data = await response.json();
        if (data.success) {
          // 使用 fetch + blob 下载
          const res = await fetch(data.url);
          const blob = await res.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = doc.title + '.' + doc.type;
          link.click();
          window.URL.revokeObjectURL(blobUrl);
        }
      } catch (error) {
        console.error('下载失败:', error);
        alert('下载失败，请重试');
      }
    } else {
      // 演示数据，提示用户
      alert('演示文档，请先上传真实文档到对象存储');
    }
  };

  // 播放云端视频
  const playCloudVideo = (video: VideoItem) => {
    setPlayingVideo(video);
  };

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
            {selectedCourse ? (
              /* 课程详情页 */
              <div className="space-y-6">
                {/* 返回按钮 */}
                <Button variant="ghost" onClick={closeCourse} className="gap-2">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  返回课程列表
                </Button>

                <div className="grid grid-cols-3 gap-6">
                  {/* 左侧：章节列表 */}
                  <div className="col-span-2">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>{selectedCourse.title}</CardTitle>
                        <CardDescription>{selectedCourse.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {selectedChapter ? (
                          /* 视频播放区域 */
                          <div className="space-y-4">
                            <Button variant="ghost" onClick={() => setSelectedChapter(null)} className="gap-2">
                              <ChevronRight className="h-4 w-4 rotate-180" />
                              返回章节列表
                            </Button>
                            
                            <VideoPlayer
                              videoKey={`courses/videos/${selectedCourse.id}/${selectedChapter.id}.mp4`}
                              title={selectedChapter.title}
                              onProgress={(progress) => {
                                console.log(`学习进度: ${progress.toFixed(1)}%`);
                              }}
                              onComplete={() => {
                                console.log('章节学习完成');
                              }}
                            />
                            
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-blue-800 mb-2">{selectedChapter.title}</h4>
                              <p className="text-sm text-blue-600">
                                本节课程将详细讲解相关知识点，帮助您掌握核心技能。
                              </p>
                            </div>
                          </div>
                        ) : (
                          /* 章节列表 */
                          <div className="space-y-3">
                            {selectedCourse.chapters.map((chapter, index) => (
                              <div
                                key={chapter.id}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                                  chapter.completed
                                    ? 'border-green-200 bg-green-50 hover:bg-green-100'
                                    : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                                onClick={() => playChapter(chapter)}
                              >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  chapter.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                  {chapter.completed ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                  ) : (
                                    <Play className="h-5 w-5" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-slate-800">{chapter.title}</p>
                                  <p className="text-sm text-slate-500">{chapter.duration}</p>
                                </div>
                                {chapter.completed && (
                                  <Badge className="bg-green-500">已完成</Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* 右侧：课程信息 */}
                  <div className="space-y-4">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>学习进度</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">已完成章节</span>
                            <span className="font-bold text-blue-600">
                              {selectedCourse.completed} / {selectedCourse.lessons}
                            </span>
                          </div>
                          <Progress value={(selectedCourse.completed / selectedCourse.lessons) * 100} className="h-3" />
                          <div className="text-center text-sm text-slate-500">
                            完成率 {((selectedCourse.completed / selectedCourse.lessons) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      <CardHeader>
                        <CardTitle>学习建议</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-100 mb-3">
                          {selectedCourse.completed === selectedCourse.lessons
                            ? '恭喜！您已完成本课程所有章节，可以进行复习或开始下一课程。'
                            : selectedCourse.completed > 0
                            ? '继续加油！保持学习节奏，每天进步一点点。'
                            : '开始您的学习之旅吧！建议按章节顺序学习。'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              /* 课程列表 */
              <div className="grid grid-cols-2 gap-4">
                {courses.map((course) => (
                  <Card 
                    key={course.id} 
                    className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => openCourse(course)}
                  >
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
                          <h3 className="font-semibold text-slate-800 mb-1">{course.title}</h3>
                          <p className="text-sm text-slate-500 mb-3">{course.description}</p>
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
            )}
          </TabsContent>

          {/* 微课视频 */}
          <TabsContent value="videos">
            <div className="grid grid-cols-3 gap-6">
              {/* 视频播放区 */}
              <div className="col-span-2">
                {playingVideo ? (
                  <div className="space-y-4">
                    <Button variant="ghost" onClick={() => setPlayingVideo(null)} className="gap-2">
                      <ChevronRight className="h-4 w-4 rotate-180" />
                      返回视频列表
                    </Button>
                    <VideoPlayer
                      videoKey={playingVideo.key}
                      title={playingVideo.title}
                    />
                  </div>
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>微课视频库</CardTitle>
                      <CardDescription>
                        {cloudVideos.length > 0 
                          ? `共 ${cloudVideos.length} 个视频资源`
                          : '从对象存储加载视频资源，支持在线播放学习'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoadingVideos ? (
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                          <span className="ml-2 text-slate-500">加载视频中...</span>
                        </div>
                      ) : cloudVideos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {cloudVideos.map((video) => (
                            <div
                              key={video.key}
                              className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                              onClick={() => playCloudVideo(video)}
                            >
                              <div className="aspect-video bg-slate-100 rounded-lg mb-3 flex items-center justify-center">
                                <Play className="h-12 w-12 text-slate-400" />
                              </div>
                              <h4 className="font-medium text-slate-800 truncate">{video.title}</h4>
                              <p className="text-sm text-slate-500">{video.category}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Upload className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                          <h4 className="font-medium text-slate-600 mb-2">暂无视频资源</h4>
                          <p className="text-sm text-slate-500 mb-4">
                            请将视频文件上传到对象存储的 courses/videos/ 目录
                          </p>
                          <div className="bg-slate-50 p-4 rounded-lg text-left text-sm text-slate-600">
                            <p className="font-medium mb-2">上传说明：</p>
                            <ol className="list-decimal list-inside space-y-1">
                              <li>支持格式：MP4, WebM, MOV, AVI</li>
                              <li>存储路径：courses/videos/分类/视频名.mp4</li>
                              <li>上传后视频将自动显示在此列表</li>
                            </ol>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* 视频分类 */}
              <div className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>视频分类</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {videoCategories.map((category) => (
                        <button 
                          key={category.key}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                        >
                          <span className="text-xl">{category.icon}</span>
                          <span className="flex-1 font-medium text-slate-700">{category.name}</span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <CardHeader>
                    <CardTitle>学习统计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-100">本周学习</span>
                        <span className="font-bold">3.5 小时</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-100">完成视频</span>
                        <span className="font-bold">12 个</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-100">学习天数</span>
                        <span className="font-bold">5 天</span>
                      </div>
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
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>实训知识库</CardTitle>
                    <CardDescription>
                      {cloudDocuments.length > 0
                        ? `共 ${cloudDocuments.length} 个文档资源`
                        : '独立站教程、海外合规、推广技巧、行业案例'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingDocs ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        <span className="ml-2 text-slate-500">加载文档中...</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* 云端文档 */}
                        {cloudDocuments.map((doc) => (
                          <div 
                            key={doc.key} 
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors"
                          >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              doc.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                            }`}>
                              <FileText className={`h-6 w-6 ${doc.type === 'pdf' ? 'text-red-600' : 'text-blue-600'}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">{doc.title}</h4>
                              <p className="text-sm text-slate-500">{doc.type.toUpperCase()} 文档</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="icon" variant="ghost">
                                <Bookmark className="h-4 w-4 text-slate-400" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => downloadDocument(doc)}>
                                <Download className="h-4 w-4 mr-1" />
                                下载
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        {/* 演示文档（当没有云端文档时显示） */}
                        {cloudDocuments.length === 0 && knowledgeBase.map((doc) => (
                          <div 
                            key={doc.id} 
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors"
                          >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              doc.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                            }`}>
                              <FileText className={`h-6 w-6 ${doc.type === 'pdf' ? 'text-red-600' : 'text-blue-600'}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">{doc.title}</h4>
                              <p className="text-sm text-slate-500">
                                {doc.type.toUpperCase()} 文档 · {doc.size} · {doc.downloads} 次下载
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="icon" variant="ghost">
                                <Bookmark className="h-4 w-4 text-slate-400" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => downloadDocument(doc)}>
                                <Download className="h-4 w-4 mr-1" />
                                下载
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="border-0 shadow-lg">
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

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
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
