'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Target,
  Wrench,
  TrendingUp,
  Award as CertificateIcon,
  BookOpen,
  Video,
  FileText,
  Clock,
  ChevronRight,
  ChevronLeft,
  FolderOpen,
  Play,
  CheckCircle2,
  Loader2,
  Globe,
  Bell,
  Brain,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StudentLayout } from '@/components/student-layout';
import { VideoPlayer } from '@/components/video-player';
import { courses, getPublishedCourses } from '@/data/courses';
import type { Course, Chapter, CourseCategory } from '@/data/courses';

// 课程分类配置
const categoryConfig: Record<CourseCategory, { name: string; icon: React.ElementType; color: string; bgColor: string }> = {
  foundation: { name: '专业基础', icon: GraduationCap, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  core: { name: '专业核心', icon: Target, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  practice: { name: '实践操作', icon: Wrench, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  extension: { name: '拓展提升', icon: TrendingUp, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  certification: { name: '考证培训', icon: CertificateIcon, color: 'text-purple-600', bgColor: 'bg-purple-100' },
};

// 视频资源数据
const videoResources = [
  { key: 'video-1', title: 'Shopify新手入门教程', category: '基础课程' },
  { key: 'video-2', title: '如何设置收款方式', category: '支付设置' },
  { key: 'video-3', title: '产品图片拍摄技巧', category: '运营技巧' },
  { key: 'video-4', title: '物流渠道选择指南', category: '物流配送' },
  { key: 'video-5', title: '客户评价管理', category: '客户服务' },
  { key: 'video-6', title: '节假日促销策划', category: '营销推广' },
];

// 文档资源数据
const documentResources = [
  { key: 'doc-1', fileName: 'shopify开店指南.pdf', title: 'Shopify开店完整指南', type: 'pdf' },
  { key: 'doc-2', fileName: '产品上架手册.pdf', title: '产品上架标准手册', type: 'pdf' },
  { key: 'doc-3', fileName: '广告投放模板.xlsx', title: 'Facebook广告投放模板', type: 'xlsx' },
  { key: 'doc-4', fileName: '物流合作伙伴清单.pdf', title: '物流合作伙伴清单', type: 'pdf' },
];

export default function StudentLearningPage() {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('foundation');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 获取已发布的课程
  const publishedCourses = getPublishedCourses();

  // 模拟加载课程数据
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedCourse]);

  // 计算课程进度（模拟）
  const getCourseProgress = (course: Course) => {
    return course.progress || 0;
  };

  // 计算总体统计
  const totalCourses = publishedCourses.length;
  const totalChapters = publishedCourses.reduce((sum, c) => sum + c.chapters.length, 0);
  const totalDuration = publishedCourses.reduce((sum, c) => {
    const hours = parseInt(c.duration.replace(/[^0-9]/g, '')) || 0;
    return sum + hours;
  }, 0);

  // 根据分类筛选课程
  const filteredCourses = selectedCategory === 'all'
    ? publishedCourses
    : publishedCourses.filter(c => c.category === selectedCategory);

  // 根据分类筛选课程（用于分类视图）
  const coursesInCategory = publishedCourses.filter(c => c.category === selectedCategory);

  // 打开课程详情
  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedChapter(null);
  };

  // 返回课程列表
  const backToList = () => {
    setSelectedCourse(null);
    setSelectedChapter(null);
  };

  // 返回分类选择
  const backToCategories = () => {
    setSelectedCourse(null);
    setSelectedChapter(null);
  };

  // 播放章节
  const playChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <StudentLayout activeMenu="learning">
      <div className="p-8">
        {/* 页面标题 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">学习中心</h2>
          <p className="text-slate-500">系统化学习独立站运营知识，提升专业技能</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
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
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Video className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{totalChapters}</p>
                  <p className="text-xs text-slate-500">章节总数</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{totalDuration}</p>
                  <p className="text-xs text-slate-500">总学时</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">0</p>
                  <p className="text-xs text-slate-500">已完成</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 分类标签栏 - 横向一行排列 */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            全部课程
          </button>
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as CourseCategory)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'bg-slate-800 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {config.name}
              </button>
            );
          })}
        </div>

        {/* 课程列表视图 - 直接显示课程 */}
        {selectedCourse === null && (
          <>
            {selectedCategory !== 'all' && (
              <Button variant="ghost" onClick={() => setSelectedCategory('all')} className="mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                返回全部课程
              </Button>
            )}

            <div className="mb-4 flex items-center gap-2">
              {selectedCategory !== 'all' && (
                <Badge className={`${categoryConfig[selectedCategory as CourseCategory].bgColor} ${categoryConfig[selectedCategory as CourseCategory].color} px-3 py-1`}>
                  {categoryConfig[selectedCategory as CourseCategory].name}
                </Badge>
              )}
              <span className="text-sm text-slate-500">{filteredCourses.length} 门课程</span>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => openCourse(course)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl ${categoryConfig[course.category].bgColor} flex items-center justify-center`}>
                          {(() => {
                            const Icon = categoryConfig[course.category].icon;
                            return <Icon className={`h-7 w-7 ${categoryConfig[course.category].color}`} />;
                          })()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-slate-800">{course.name}</h4>
                            <Badge className="bg-emerald-100 text-emerald-700">学习中</Badge>
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
            )}
          </>
        )}

        {/* 课程详情视图 */}
        {selectedCourse && !selectedChapter && (
          <>
            <Button variant="ghost" onClick={backToList} className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              返回课程列表
            </Button>

            <div className="grid grid-cols-3 gap-6">
              {/* 章节列表 */}
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
                  </CardHeader>
                  <CardContent>
                    {selectedCourse.chapters.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCourse.chapters.map((chapter, index) => (
                          <div
                            key={chapter.id}
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer"
                            onClick={() => playChapter(chapter)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                              <Play className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-800">{index + 1}. {chapter.title}</p>
                              <div className="flex items-center gap-3 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {chapter.duration}
                                </span>
                                {chapter.difficulty === 'intermediate' && (
                                  <Badge className="bg-amber-100 text-amber-700 text-xs">中级</Badge>
                                )}
                                {chapter.difficulty === 'advanced' && (
                                  <Badge className="bg-red-100 text-red-700 text-xs">高级</Badge>
                                )}
                                {chapter.difficulty === 'basic' && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">初级</Badge>
                                )}
                              </div>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600">
                              <Play className="h-4 w-4 mr-1" />
                              看课
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">暂无章节内容</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* 课程信息 */}
              <div className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>课程信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">课程分类</span>
                      <Badge>{categoryConfig[selectedCourse.category].name}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">章节数</span>
                      <span className="text-sm font-medium">{selectedCourse.chapters.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">总时长</span>
                      <span className="text-sm font-medium">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">学习进度</span>
                      <span className="text-sm font-medium">{getCourseProgress(selectedCourse)}%</span>
                    </div>
                    <Progress value={getCourseProgress(selectedCourse)} className="h-2" />
                  </CardContent>
                </Card>

                {/* 视频资源 */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base">视频资源</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {videoResources.slice(0, 3).map((video) => (
                        <div key={video.key} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-sm">
                          <Video className="h-4 w-4 text-emerald-500" />
                          <span className="flex-1 truncate">{video.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 文档下载 */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base">学习资料</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {documentResources.slice(0, 3).map((doc) => (
                        <div key={doc.key} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-sm">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="flex-1 truncate">{doc.title}</span>
                          <Button size="icon" variant="ghost" className="h-6 w-6">
                            <Download className="h-3 w-3 text-slate-400" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* 章节播放视图 */}
        {selectedChapter && selectedCourse && (
          <>
            <Button variant="ghost" onClick={() => setSelectedChapter(null)} className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              返回课程详情
            </Button>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${categoryConfig[selectedCourse.category].bgColor} ${categoryConfig[selectedCourse.category].color}`}>
                    {selectedCourse.name}
                  </Badge>
                </div>
                <CardTitle>{selectedChapter.title}</CardTitle>
                <CardDescription>课时长：{selectedChapter.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 视频播放器占位 */}
                <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <Play className="h-10 w-10 text-emerald-400" />
                    </div>
                    <p className="text-slate-400">视频播放器区域</p>
                    <p className="text-slate-500 text-sm mt-2">集成 VideoPlayer 组件</p>
                  </div>
                </div>

                {/* 章节信息 */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-medium text-slate-800 mb-2">章节学习指南</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    本章节将帮助您了解{selectedChapter.title}的核心知识点。建议您：
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                      认真观看视频教程，做好笔记
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                      完成后完成章节测验
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                      如有疑问可在答疑区提问
                    </li>
                  </ul>
                </div>

                {/* 章节导航 */}
                <div className="mt-6 flex items-center justify-between">
                  <Button variant="outline" disabled={selectedCourse.chapters.indexOf(selectedChapter) === 0}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    上一章
                  </Button>
                  <span className="text-sm text-slate-500">
                    第 {selectedCourse.chapters.indexOf(selectedChapter) + 1} / {selectedCourse.chapters.length} 章
                  </span>
                  <Button variant="outline" 
                    disabled={selectedCourse.chapters.indexOf(selectedChapter) === selectedCourse.chapters.length - 1}
                    onClick={() => {
                      const idx = selectedCourse.chapters.indexOf(selectedChapter);
                      if (idx < selectedCourse.chapters.length - 1) {
                        setSelectedChapter(selectedCourse.chapters[idx + 1]);
                      }
                    }}
                  >
                    下一章
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </StudentLayout>
  );
}
