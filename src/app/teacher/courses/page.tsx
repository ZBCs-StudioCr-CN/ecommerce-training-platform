'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Globe,
  LogOut,
  Plus,
  Search,
  FolderOpen,
  Clock,
  BookOpen,
  Video,
  FileText,
  Upload,
  Trash2,
  ChevronRight,
  MoreVertical,
  Loader2,
  Check,
  X,
  GraduationCap,
  Target,
  Wrench,
  TrendingUp,
  Award as CertificateIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { teacherMenuItems } from '@/config/menu';
import type { Course, Chapter, CourseCategory } from '@/data/courses';
import { getPublishedCourses } from '@/data/courses';
import { useLogout } from '@/lib/auth';

// 课程分类配置
const categoryConfig: Record<CourseCategory, { name: string; icon: React.ElementType; color: string; bgColor: string }> = {
  foundation: { name: '专业基础', icon: GraduationCap, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  core: { name: '专业核心', icon: Target, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  practice: { name: '实践操作', icon: Wrench, color: 'text-green-600', bgColor: 'bg-green-100' },
  extension: { name: '拓展提升', icon: TrendingUp, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  certification: { name: '考证培训', icon: CertificateIcon, color: 'text-purple-600', bgColor: 'bg-purple-100' },
};

interface Resource {
  key: string;
  fileName: string;
  title: string;
  type: string;
  resourceType: 'video' | 'document';
  category: string;
}

export default function TeacherCoursesPage() {
  const router = useRouter();
  const handleLogout = useLogout();
  const [activeMenu, setActiveMenu] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  
  // 课程列表（从API获取）
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  
  // 资源列表
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(false);
  
  // 上传状态
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 加载课程列表（直接使用静态数据）
  const loadCourses = useCallback(() => {
    setIsLoadingCourses(true);
    try {
      setCourses(getPublishedCourses());
    } catch (error) {
      console.error('加载课程失败:', error);
    } finally {
      setIsLoadingCourses(false);
    }
  }, []);

  // 加载资源（从 localStorage 读取）
  const loadResources = useCallback(() => {
    setIsLoadingResources(true);
    try {
      const stored = localStorage.getItem('course_resources');
      const list = stored ? JSON.parse(stored) : [];
      setResources(list);
    } catch (error) {
      console.error('加载资源失败:', error);
    } finally {
      setIsLoadingResources(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
    loadResources();
  }, [loadCourses, loadResources]);

  // 处理文件上传
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  // 上传文件（纯前端模式：存储元数据到 localStorage）
  const handleUpload = async () => {
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      // 模拟上传过程
      await new Promise((r) => setTimeout(r, 1000));
      clearInterval(progressInterval);
      setUploadProgress(100);

      // 存储资源元数据到 localStorage
      const stored = localStorage.getItem('course_resources');
      const list = stored ? JSON.parse(stored) : [];
      const newResource = {
        key: Date.now().toString(),
        id: Date.now().toString(),
        title: uploadTitle || uploadFile.name,
        type: uploadFile.type.startsWith('video/') ? 'video' : 'document',
        category: selectedCourse?.id.toString() || 'general',
        fileName: uploadFile.name,
        fileSize: uploadFile.size,
        url: URL.createObjectURL(uploadFile),
        uploadedAt: new Date().toISOString(),
      };
      list.unshift(newResource);
      localStorage.setItem('course_resources', JSON.stringify(list));

      await loadResources();
      setUploadFile(null);
      setUploadTitle('');
      setShowUploadModal(false);
    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败，请重试');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 删除资源（从 localStorage 删除）
  const handleDeleteResource = async (key: string) => {
    if (!confirm('确定要删除这个资源吗？')) return;
    
    try {
      const stored = localStorage.getItem('course_resources');
      const list = stored ? JSON.parse(stored) : [];
      const filtered = list.filter((r: any) => r.key !== key && r.id !== key);
      localStorage.setItem('course_resources', JSON.stringify(filtered));
      setResources(filtered);
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  // 关联资源到章节
  const handleAttachResource = (chapter: Chapter, resource: Resource) => {
    if (resource.resourceType === 'video') {
      chapter.videoKey = resource.key;
    } else {
      chapter.documentKeys = [...(chapter.documentKeys || []), resource.key];
    }
    // 更新课程
    setCourses([...courses]);
  };

  // 视频资源
  const videoResources = resources.filter(r => r.resourceType === 'video');
  // 文档资源
  const documentResources = resources.filter(r => r.resourceType === 'document');

  // 返回课程列表
  const backToList = () => {
    setSelectedCourse(null);
    setSelectedChapter(null);
  };

  // 打开章节详情
  const openChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  // 根据分类筛选课程
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  // 按分类分组课程
  const groupedCourses = courses.reduce((acc, course) => {
    const cat = course.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(course);
    return acc;
  }, {} as Record<CourseCategory, Course[]>);

  // 计算课程进度
  const getCourseProgress = (course: Course) => {
    const total = course.chapters.length;
    if (total === 0) return 0;
    const completed = course.chapters.filter(ch => ch.videoKey).length;
    return Math.round((completed / total) * 100);
  };

  // 统计数据
  const totalCourses = courses.length;
  const totalChapters = courses.reduce((sum, c) => sum + c.chapters.length, 0);
  const totalCredits = courses.reduce((sum, c) => sum + (c.credit || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
              <p className="text-xs text-slate-500">教师端</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">王老师</p>
                <p className="text-xs text-slate-500">电商学院</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">王</div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {teacherMenuItems.map((item) => (
            <Link key={item.id} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMenu === item.id ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25' : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-60 pt-16 min-h-screen p-6">
        {/* 课程列表视图 */}
        {!selectedCourse && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">课程管理</h2>
                <p className="text-slate-500">管理课程内容、章节和教学资源</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  导入课程
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  新建课程
                </Button>
              </div>
            </div>

            {/* 快捷统计 */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{totalCourses}</p>
                      <p className="text-xs text-slate-500">课程总数</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{totalChapters}</p>
                      <p className="text-xs text-slate-500">章节总数</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <Video className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{videoResources.length}</p>
                      <p className="text-xs text-slate-500">视频资源</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{documentResources.length}</p>
                      <p className="text-xs text-slate-500">文档资源</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{courses.length}</p>
                      <p className="text-xs text-slate-500">课程总数</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 课程分类筛选 */}
            <div className="flex gap-2 mb-6 flex-wrap">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                全部课程
              </Button>
              {(Object.keys(categoryConfig) as CourseCategory[]).map((cat) => {
                const config = categoryConfig[cat];
                const Icon = config.icon;
                return (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {config.name}
                  </Button>
                );
              })}
            </div>

            {/* 加载状态 */}
            {isLoadingCourses ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-slate-500">加载课程中...</span>
              </div>
            ) : selectedCategory === 'all' ? (
              /* 按模块分组显示 */
              <div className="space-y-8">
                {(Object.keys(categoryConfig) as CourseCategory[]).map((cat) => {
                  const catCourses = groupedCourses[cat] || [];
                  if (catCourses.length === 0) return null;
                  
                  const config = categoryConfig[cat];
                  const Icon = config.icon;
                  
                  return (
                    <div key={cat}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                          <Icon className={`h-4 w-4 ${config.color}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">{config.name}模块</h3>
                        <Badge variant="secondary">{catCourses.length} 门课程</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {catCourses.map((course) => (
                          <Card 
                            key={course.id} 
                            className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                            onClick={() => setSelectedCourse(course)}
                          >
                            <CardContent className="p-5">
                              <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-xl ${config.bgColor} flex items-center justify-center`}>
                                  <Icon className={`h-7 w-7 ${config.color}`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-slate-800">{course.name}</h4>
                                    <Badge className={course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}>
                                      {course.status === 'published' ? '已发布' : '草稿'}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">{course.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                      <FolderOpen className="h-4 w-4" />
                                      {course.chapters.length} 章节
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {course.duration}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 mt-3">
                                    <Progress value={getCourseProgress(course)} className="flex-1 h-2" />
                                    <span className="text-sm font-medium text-slate-600">{getCourseProgress(course)}%</span>
                                  </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-slate-400" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* 单分类列表 */
              <div className="grid grid-cols-2 gap-4">
                {filteredCourses.map((course) => {
                  const config = categoryConfig[course.category];
                  const Icon = config.icon;
                  
                  return (
                    <Card 
                      key={course.id} 
                      className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-xl ${config.bgColor} flex items-center justify-center`}>
                            <Icon className={`h-7 w-7 ${config.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-slate-800">{course.name}</h4>
                              <Badge className={course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}>
                                {course.status === 'published' ? '已发布' : '草稿'}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-500 mb-3 line-clamp-2">{course.description}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                <FolderOpen className="h-4 w-4" />
                                {course.chapters.length} 章节
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {course.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                              <Progress value={getCourseProgress(course)} className="flex-1 h-2" />
                              <span className="text-sm font-medium text-slate-600">{getCourseProgress(course)}%</span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* 课程详情视图 */}
        {selectedCourse && !selectedChapter && (
          <>
            <Button variant="ghost" onClick={backToList} className="mb-4">
              <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
              返回课程列表
            </Button>

            <div className="grid grid-cols-3 gap-6">
              {/* 章节管理 */}
              <div className="col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${categoryConfig[selectedCourse.category].bgColor} ${categoryConfig[selectedCourse.category].color}`}>
                          {categoryConfig[selectedCourse.category].name}
                        </Badge>
                      </div>
                      <CardTitle>{selectedCourse.name}</CardTitle>
                      <CardDescription>{selectedCourse.description}</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      添加章节
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {selectedCourse.chapters.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.chapters.map((chapter) => (
                          <div
                            key={chapter.id}
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                            onClick={() => openChapter(chapter)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              {chapter.videoKey ? (
                                <Video className="h-5 w-5 text-blue-600" />
                              ) : (
                                <FolderOpen className="h-5 w-5 text-slate-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-800">{chapter.title}</p>
                              <div className="flex items-center gap-3 text-sm text-slate-500">
                                <span>{chapter.duration}</span>
                                {chapter.difficulty === 'advanced' && (
                                  <Badge className="bg-red-100 text-red-700 text-xs">进阶</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {chapter.videoKey && (
                                <Badge className="bg-green-100 text-green-700">已关联视频</Badge>
                              )}
                              {chapter.documentKeys && chapter.documentKeys.length > 0 && (
                                <Badge className="bg-blue-100 text-blue-700">{chapter.documentKeys.length} 文档</Badge>
                              )}
                              <ChevronRight className="h-5 w-5 text-slate-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 mb-4">暂无章节，点击"添加章节"开始创建</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* 资源库 */}
              <div className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>课程资源库</CardTitle>
                    <Button size="sm" onClick={() => setShowUploadModal(true)}>
                      <Upload className="h-4 w-4 mr-2" />
                      上传
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {/* 视频资源 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-600 mb-2">视频资源</h4>
                      {videoResources.length > 0 ? (
                        <div className="space-y-2">
                          {videoResources.slice(0, 5).map((resource) => (
                            <div key={resource.key} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-sm">
                              <Video className="h-4 w-4 text-blue-500" />
                              <span className="flex-1 truncate">{resource.title}</span>
                              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleDeleteResource(resource.key)}>
                                <Trash2 className="h-3 w-3 text-slate-400" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">暂无视频资源</p>
                      )}
                    </div>

                    {/* 文档资源 */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-600 mb-2">文档资源</h4>
                      {documentResources.length > 0 ? (
                        <div className="space-y-2">
                          {documentResources.slice(0, 5).map((resource) => (
                            <div key={resource.key} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-sm">
                              <FileText className="h-4 w-4 text-red-500" />
                              <span className="flex-1 truncate">{resource.title}</span>
                              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleDeleteResource(resource.key)}>
                                <Trash2 className="h-3 w-3 text-slate-400" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">暂无文档资源</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <CardHeader>
                    <CardTitle>课程设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="secondary" className="w-full justify-start">
                      编辑课程信息
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                      设置考核规则
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                      发布到班级
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* 章节详情视图 */}
        {selectedCourse && selectedChapter && (
          <>
            <Button variant="ghost" onClick={() => setSelectedChapter(null)} className="mb-4">
              <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
              返回章节列表
            </Button>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>{selectedChapter.title}</CardTitle>
                    <CardDescription>时长：{selectedChapter.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* 关联的视频 */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-700">关联视频</h4>
                        {selectedChapter.videoKey && (
                          <Button size="sm" variant="outline" onClick={() => { 
                            const chapter = selectedCourse.chapters.find(c => c.id === selectedChapter.id);
                            if (chapter) {
                              chapter.videoKey = undefined; 
                              setCourses([...courses]);
                            }
                          }}>
                            取消关联
                          </Button>
                        )}
                      </div>
                      {selectedChapter.videoKey ? (
                        <div className="p-4 rounded-xl border border-green-200 bg-green-50">
                          <div className="flex items-center gap-3">
                            <Video className="h-8 w-8 text-green-600" />
                            <div className="flex-1">
                              <p className="font-medium text-green-800">
                                {videoResources.find(r => r.key === selectedChapter.videoKey)?.title || '已关联视频'}
                              </p>
                              <p className="text-sm text-green-600">点击可预览</p>
                            </div>
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 text-center">
                          <Video className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-500 mb-3">暂未关联视频</p>
                          <p className="text-sm text-slate-400">从右侧资源库选择视频关联</p>
                        </div>
                      )}
                    </div>

                    {/* 关联的文档 */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-700">关联文档</h4>
                      </div>
                      {selectedChapter.documentKeys && selectedChapter.documentKeys.length > 0 ? (
                        <div className="space-y-2">
                          {selectedChapter.documentKeys.map((key) => {
                            const doc = documentResources.find(r => r.key === key);
                            return (
                              <div key={key} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                                <FileText className="h-5 w-5 text-red-500" />
                                <span className="flex-1">{doc?.title || '文档'}</span>
                                <Button size="sm" variant="ghost" onClick={() => {
                                  const chapter = selectedCourse.chapters.find(c => c.id === selectedChapter.id);
                                  if (chapter && chapter.documentKeys) {
                                    chapter.documentKeys = chapter.documentKeys.filter(k => k !== key);
                                    setCourses([...courses]);
                                  }
                                }}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 text-center">
                          <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-500 mb-3">暂未关联文档</p>
                          <p className="text-sm text-slate-400">从右侧资源库选择文档关联</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 资源选择面板 */}
              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>选择资源</CardTitle>
                    <Button size="sm" onClick={() => setShowUploadModal(true)}>
                      <Upload className="h-4 w-4 mr-2" />
                      上传
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {/* 视频列表 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-600 mb-2">视频资源</h4>
                      <div className="space-y-2">
                        {videoResources.map((resource) => (
                          <div
                            key={resource.key}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                              selectedChapter.videoKey === resource.key
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-slate-50 hover:bg-blue-50'
                            }`}
                            onClick={() => handleAttachResource(selectedChapter, resource)}
                          >
                            <Video className="h-4 w-4 text-blue-500" />
                            <span className="flex-1 truncate text-sm">{resource.title}</span>
                            {selectedChapter.videoKey === resource.key && (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        ))}
                        {videoResources.length === 0 && (
                          <p className="text-sm text-slate-400 text-center py-4">暂无视频资源</p>
                        )}
                      </div>
                    </div>

                    {/* 文档列表 */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-600 mb-2">文档资源</h4>
                      <div className="space-y-2">
                        {documentResources.map((resource) => (
                          <div
                            key={resource.key}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                              selectedChapter.documentKeys?.includes(resource.key)
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-slate-50 hover:bg-blue-50'
                            }`}
                            onClick={() => handleAttachResource(selectedChapter, resource)}
                          >
                            <FileText className="h-4 w-4 text-red-500" />
                            <span className="flex-1 truncate text-sm">{resource.title}</span>
                            {selectedChapter.documentKeys?.includes(resource.key) && (
                              <Check className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                        ))}
                        {documentResources.length === 0 && (
                          <p className="text-sm text-slate-400 text-center py-4">暂无文档资源</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </main>

      {/* 上传弹窗 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md border-0 shadow-2xl">
            <CardHeader>
              <CardTitle>上传资源</CardTitle>
              <CardDescription>
                支持 MP4、PDF、Word 等格式，最大 100MB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 文件选择 */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">选择文件</label>
                <Input type="file" onChange={handleFileSelect} />
              </div>

              {/* 标题输入 */}
              {uploadFile && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">资源标题</label>
                  <Input
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="请输入资源标题"
                  />
                </div>
              )}

              {/* 上传进度 */}
              {isUploading && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-slate-500 text-center">{uploadProgress}%</p>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFile(null);
                    setUploadTitle('');
                  }}
                  disabled={isUploading}
                >
                  取消
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpload}
                  disabled={!uploadFile || isUploading}
                >
                  {isUploading ? '上传中...' : '确认上传'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
