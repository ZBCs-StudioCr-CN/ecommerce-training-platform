'use client';

import { useState, useEffect, useCallback } from 'react';
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
  CheckCircle2,
  Clock,
  Play,
  ChevronRight,
  Video,
  Download,
  Bookmark,
  Upload,
  Loader2,
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

interface Chapter {
  id: number;
  title: string;
  duration: string;
  videoKey?: string;
  documentKeys?: string[];
  description?: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  chapters: Chapter[];
  duration: string;
  status: 'published' | 'draft';
  progress: number;
  completed: number;
}

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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  
  // 课程列表（从API获取）
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  
  // 对象存储视频列表
  const [cloudVideos, setCloudVideos] = useState<VideoItem[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  
  // 对象存储文档列表
  const [cloudDocuments, setCloudDocuments] = useState<DocumentItem[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  
  // 当前播放的视频
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  // 加载课程列表
  const loadCourses = useCallback(async () => {
    setIsLoadingCourses(true);
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('加载课程失败:', error);
    } finally {
      setIsLoadingCourses(false);
    }
  }, []);

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

  // 初始加载课程
  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // 切换到视频/文档标签时加载
  useEffect(() => {
    if (activeTab === 'videos' && cloudVideos.length === 0) {
      loadCloudVideos();
    }
    if (activeTab === 'knowledge' && cloudDocuments.length === 0) {
      loadCloudDocuments();
    }
  }, [activeTab, cloudVideos.length, cloudDocuments.length]);

  // 打开课程详情
  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedChapter(null);
  };

  // 返回课程列表
  const closeCourse = () => {
    setSelectedCourse(null);
    setSelectedChapter(null);
    setPlayingVideo(null);
  };

  // 播放章节视频
  const playChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  // 下载文档
  const downloadDocument = async (doc: DocumentItem) => {
    try {
      const response = await fetch(`/api/documents/url?key=${encodeURIComponent(doc.key)}`);
      const data = await response.json();
      if (data.success) {
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
                        <CardTitle>{selectedCourse.name}</CardTitle>
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
                              videoKey={selectedChapter.videoKey || `courses/videos/${selectedCourse.id}/${selectedChapter.id}.mp4`}
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
                                {selectedChapter.description || '本节课程将详细讲解相关知识点，帮助您掌握核心技能。'}
                              </p>
                            </div>
                          </div>
                        ) : (
                          /* 章节列表 */
                          <div className="space-y-3">
                            {selectedCourse.chapters.map((chapter) => {
                              const isCompleted = selectedCourse.completed > 0 && 
                                selectedCourse.chapters.indexOf(chapter) < selectedCourse.completed;
                              
                              return (
                                <div
                                  key={chapter.id}
                                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                                    isCompleted
                                      ? 'border-green-200 bg-green-50 hover:bg-green-100'
                                      : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                                  }`}
                                  onClick={() => playChapter(chapter)}
                                >
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                      <Play className="h-5 w-5" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-slate-800">{chapter.title}</p>
                                    <p className="text-sm text-slate-500">{chapter.duration}</p>
                                  </div>
                                  {isCompleted && (
                                    <Badge className="bg-green-500">已完成</Badge>
                                  )}
                                </div>
                              );
                            })}
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
                              {selectedCourse.completed} / {selectedCourse.chapters.length}
                            </span>
                          </div>
                          <Progress 
                            value={(selectedCourse.completed / selectedCourse.chapters.length) * 100} 
                            className="h-3" 
                          />
                          <div className="text-center text-sm text-slate-500">
                            完成率 {((selectedCourse.completed / selectedCourse.chapters.length) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>课程信息</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">总课时</span>
                            <span className="font-medium">{selectedCourse.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">章节数</span>
                            <span className="font-medium">{selectedCourse.chapters.length} 节</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">状态</span>
                            <Badge className="bg-green-100 text-green-700">学习中</Badge>
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
                          {selectedCourse.completed === selectedCourse.chapters.length
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
              <>
                {isLoadingCourses ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-slate-500">加载课程中...</span>
                  </div>
                ) : (
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
                              course.completed === course.chapters.length
                                ? 'bg-green-100'
                                : course.completed > 0
                                ? 'bg-blue-100'
                                : 'bg-slate-100'
                            }`}>
                              {course.completed === course.chapters.length ? '✅' : course.completed > 0 ? '📖' : '📚'}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 mb-1">{course.name}</h3>
                              <p className="text-sm text-slate-500 mb-3 line-clamp-2">{course.description}</p>
                              <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                <span className="flex items-center gap-1">
                                  <Video className="h-4 w-4" />
                                  {course.chapters.length} 课时
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {course.duration}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Progress 
                                  value={(course.completed / course.chapters.length) * 100} 
                                  className="flex-1 h-2" 
                                />
                                <span className="text-sm font-medium text-slate-600">
                                  {course.completed}/{course.chapters.length}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant={course.completed === course.chapters.length ? 'outline' : 'default'}>
                              {course.completed === course.chapters.length ? '复习' : course.completed > 0 ? '继续学习' : '开始学习'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
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
                          <p className="text-sm text-slate-500">
                            请联系教师上传课程视频
                          </p>
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
                      {[
                        { name: '建站教程', count: 24, icon: '🏗️' },
                        { name: '推广策略', count: 18, icon: '📢' },
                        { name: '运营技巧', count: 15, icon: '💡' },
                        { name: '数据分析', count: 12, icon: '📊' },
                        { name: '合规政策', count: 8, icon: '⚖️' },
                      ].map((category) => (
                        <button 
                          key={category.name}
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
                    ) : cloudDocuments.length > 0 ? (
                      <div className="space-y-3">
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
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h4 className="font-medium text-slate-600 mb-2">暂无文档资源</h4>
                        <p className="text-sm text-slate-500">
                          请联系教师上传课程文档
                        </p>
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
