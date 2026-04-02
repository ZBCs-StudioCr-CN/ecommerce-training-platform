'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Play,
  ChevronRight,
  Video,
  Download,
  Bookmark,
  Loader2,
  GraduationCap,
  Target,
  Wrench,
  TrendingUp,
  Award as CertificateIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoPlayer } from '@/components/video-player';
import { StudentLayout } from '@/components/student-layout';
import type { Course, Chapter, CourseCategory } from '@/data/courses';

// 课程分类配置
const categoryConfig: Record<CourseCategory, { name: string; icon: React.ElementType; color: string; bgColor: string }> = {
  foundation: { name: '专业基础', icon: GraduationCap, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  core: { name: '专业核心', icon: Target, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  practice: { name: '实践操作', icon: Wrench, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  extension: { name: '拓展提升', icon: TrendingUp, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  certification: { name: '考证培训', icon: CertificateIcon, color: 'text-purple-600', bgColor: 'bg-purple-100' },
};

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
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  
  // 课程列表
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
  const loadCloudVideos = useCallback(async () => {
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
  }, []);

  // 加载云端文档
  const loadCloudDocuments = useCallback(async () => {
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
  }, []);

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

  // 根据分类筛选课程
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  // 计算学习统计
  const totalChapters = courses.reduce((sum, c) => sum + c.chapters.length, 0);
  const totalDuration = courses.reduce((sum, c) => {
    const hours = parseInt(c.duration.replace(/[^0-9]/g, '')) || 0;
    return sum + hours;
  }, 0);

  return (
    <StudentLayout activeMenu="learning">
      <div className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">学习中心</h2>
          <p className="text-slate-500">系统化学习独立站运营知识</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{courses.length}</p>
                  <p className="text-sm text-slate-500">课程数</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Bookmark className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{totalChapters}</p>
                  <p className="text-sm text-slate-500">章节总数</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{totalDuration}h</p>
                  <p className="text-sm text-slate-500">总学时</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">0</p>
                  <p className="text-sm text-slate-500">已完成</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 课程内容 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border shadow-sm mb-6">
            <TabsTrigger value="courses">课程列表</TabsTrigger>
            <TabsTrigger value="videos">视频资源</TabsTrigger>
            <TabsTrigger value="knowledge">知识文档</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            {/* 分类筛选 */}
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : ''}
              >
                全部
              </Button>
              {Object.entries(categoryConfig).map(([key, config]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(key as CourseCategory)}
                  className={selectedCategory === key ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : ''}
                >
                  <config.icon className="h-4 w-4 mr-1" />
                  {config.name}
                </Button>
              ))}
            </div>

            {/* 课程列表 */}
            {isLoadingCourses ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => openCourse(course)}
                  >
                    <CardContent className="p-0">
                      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg flex items-center justify-center">
                        <span className="text-4xl">📚</span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={categoryConfig[course.category].bgColor + ' ' + categoryConfig[course.category].color}>
                            {categoryConfig[course.category].name}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-slate-800 mb-1">{course.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between mt-3 text-sm text-slate-500">
                          <span>{course.chapters.length} 章节</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos">
            {isLoadingVideos ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {cloudVideos.map((video) => (
                  <Card
                    key={video.key}
                    className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => playCloudVideo(video)}
                  >
                    <CardContent className="p-3">
                      <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                        <Video className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-800 truncate">{video.title}</p>
                      <p className="text-xs text-slate-500">{video.category}</p>
                    </CardContent>
                  </Card>
                ))}
                {cloudVideos.length === 0 && (
                  <div className="col-span-4 text-center py-12 text-slate-500">
                    暂无视频资源
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="knowledge">
            {isLoadingDocs ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              </div>
            ) : (
              <div className="space-y-3">
                {cloudDocuments.map((doc) => (
                  <Card key={doc.key} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Download className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{doc.title}</p>
                            <p className="text-sm text-slate-500">{doc.fileName}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => downloadDocument(doc)}>
                          下载
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {cloudDocuments.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    暂无知识文档
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* 视频播放弹窗 */}
        {playingVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="w-full max-w-4xl">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">{playingVideo.title}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setPlayingVideo(null)}>
                    ✕
                  </Button>
                </div>
                <VideoPlayer videoKey={playingVideo.key} />
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
