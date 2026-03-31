'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  MessageCircle,
  Bell,
  LogOut,
  Globe,
  Upload,
  FileText,
  Video,
  Trash2,
  Download,
  Search,
  Filter,
  RefreshCw,
  X,
  Check,
  AlertCircle,
  Loader2,
  FolderOpen,
  File,
  Folder,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const menuItems = [
  { id: 'dashboard', label: '教学控制台', icon: LayoutDashboard, href: '/teacher/dashboard' },
  { id: 'courses', label: '课程管理', icon: BookOpen, href: '/teacher/courses' },
  { id: 'resources', label: '资源管理', icon: FolderOpen, href: '/teacher/resources' },
  { id: 'practice', label: '实训管理', icon: ClipboardList, href: '/teacher/practice' },
  { id: 'grading', label: '考核评分', icon: BarChart3, href: '/teacher/grading' },
  { id: 'analysis', label: '学情分析', icon: BarChart3, href: '/teacher/analysis' },
  { id: 'qa', label: '答疑社区', icon: MessageCircle, href: '/teacher/qa' },
];

// 视频分类
const videoCategories = [
  { id: 'build', name: '建站教程', icon: '🏗️' },
  { id: 'marketing', name: '推广策略', icon: '📢' },
  { id: 'operations', name: '运营技巧', icon: '💡' },
  { id: 'analytics', name: '数据分析', icon: '📊' },
  { id: 'compliance', name: '合规政策', icon: '⚖️' },
];

// 文档分类
const documentCategories = [
  { id: 'tutorial', name: '教程文档', icon: '📘' },
  { id: 'policy', name: '政策法规', icon: '📋' },
  { id: 'template', name: '模板素材', icon: '📁' },
  { id: 'case', name: '案例分析', icon: '📊' },
];

interface Resource {
  key: string;
  fileName: string;
  title: string;
  type: string;
  resourceType: 'video' | 'document';
  category: string;
}

export default function TeacherResourcesPage() {
  const [activeMenu, setActiveMenu] = useState('resources');
  const [activeTab, setActiveTab] = useState('videos');
  
  // 资源列表
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ video: 0, document: 0, categories: [] as string[] });
  
  // 上传状态
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // 搜索和筛选
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // 加载资源列表
  const loadResources = useCallback(async () => {
    setIsLoading(true);
    try {
      const type = activeTab === 'videos' ? 'video' : 'document';
      const response = await fetch(`/api/resources?type=${type}&category=${filterCategory}`);
      const data = await response.json();
      
      if (data.success) {
        setResources(data.data.resources);
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('加载资源失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, filterCategory]);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  // 上传文件
  const handleUpload = async () => {
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('type', activeTab === 'videos' ? 'video' : 'document');
      if (uploadCategory) formData.append('category', uploadCategory);
      if (uploadTitle) formData.append('title', uploadTitle);

      // 模拟进度
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/resources/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();
      
      if (data.success) {
        // 刷新列表
        await loadResources();
        // 重置表单
        setUploadFile(null);
        setUploadTitle('');
        setUploadCategory('');
        setShowUploadModal(false);
      } else {
        alert(data.error || '上传失败');
      }
    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败，请重试');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 删除资源
  const handleDelete = async (key: string) => {
    if (!confirm('确定要删除这个资源吗？删除后无法恢复。')) return;

    try {
      const response = await fetch(`/api/resources/delete?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setResources(resources.filter((r) => r.key !== key));
      } else {
        alert(data.error || '删除失败');
      }
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败，请重试');
    }
  };

  // 下载资源
  const handleDownload = async (resource: Resource) => {
    try {
      const type = resource.resourceType;
      const urlEndpoint = type === 'video' ? 'videos' : 'documents';
      const response = await fetch(`/api/${urlEndpoint}/url?key=${encodeURIComponent(resource.key)}`);
      const data = await response.json();
      
      if (data.success) {
        // 使用 fetch + blob 下载
        const res = await fetch(data.url);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = resource.title + '.' + resource.type;
        link.click();
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请重试');
    }
  };

  // 过滤资源
  const filteredResources = resources.filter((resource) => {
    if (searchQuery) {
      return resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // 当前分类列表
  const categories = activeTab === 'videos' ? videoCategories : documentCategories;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">外贸独立站实训平台</h1>
                <p className="text-xs text-slate-500">教师端</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">王老师</p>
                <p className="text-xs text-slate-500">电商学院</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                王
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
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
      <main className="ml-60 pt-16 min-h-screen p-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">资源管理</h2>
            <p className="text-slate-500">上传和管理课程视频、文档资源</p>
          </div>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload className="h-4 w-4 mr-2" />
            上传资源
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.video}</p>
                  <p className="text-sm text-slate-500">视频资源</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.document}</p>
                  <p className="text-sm text-slate-500">文档资源</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Folder className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.categories.length}</p>
                  <p className="text-sm text-slate-500">分类数量</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <File className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.video + stats.document}</p>
                  <p className="text-sm text-slate-500">总资源数</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-white border">
              <TabsTrigger value="videos" className="gap-2">
                <Video className="h-4 w-4" />
                视频资源
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="h-4 w-4" />
                文档资源
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              {/* 搜索框 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="搜索资源..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              
              {/* 分类筛选 */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm"
              >
                <option value="">全部分类</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              {/* 刷新按钮 */}
              <Button variant="outline" size="icon" onClick={loadResources} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {/* 视频资源 */}
          <TabsContent value="videos">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-slate-500">加载中...</span>
                  </div>
                ) : filteredResources.length > 0 ? (
                  <div className="space-y-3">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.key}
                        className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Video className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{resource.title}</p>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span>{resource.type.toUpperCase()}</span>
                            <span>·</span>
                            <span>{resource.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleDownload(resource)}>
                            <Download className="h-4 w-4 mr-1" />
                            下载
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(resource.key)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Video className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h4 className="font-medium text-slate-600 mb-2">暂无视频资源</h4>
                    <p className="text-sm text-slate-500 mb-4">
                      点击右上角"上传资源"按钮添加视频
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg text-left max-w-md mx-auto">
                      <p className="font-medium text-slate-600 mb-2">支持的格式：</p>
                      <p className="text-sm text-slate-500">MP4, WebM, MOV, AVI（最大 500MB）</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 文档资源 */}
          <TabsContent value="documents">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-slate-500">加载中...</span>
                  </div>
                ) : filteredResources.length > 0 ? (
                  <div className="space-y-3">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.key}
                        className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          resource.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <FileText className={`h-6 w-6 ${
                            resource.type === 'pdf' ? 'text-red-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{resource.title}</p>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span>{resource.type.toUpperCase()}</span>
                            <span>·</span>
                            <span>{resource.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleDownload(resource)}>
                            <Download className="h-4 w-4 mr-1" />
                            下载
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(resource.key)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h4 className="font-medium text-slate-600 mb-2">暂无文档资源</h4>
                    <p className="text-sm text-slate-500 mb-4">
                      点击右上角"上传资源"按钮添加文档
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg text-left max-w-md mx-auto">
                      <p className="font-medium text-slate-600 mb-2">支持的格式：</p>
                      <p className="text-sm text-slate-500">PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX（最大 50MB）</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* 上传弹窗 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>上传资源</CardTitle>
                <CardDescription>
                  {activeTab === 'videos' ? '上传视频课程' : '上传文档资料'}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 文件选择 */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">选择文件</label>
                <div className="relative">
                  <input
                    type="file"
                    accept={activeTab === 'videos' ? '.mp4,.webm,.mov,.avi' : '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx'}
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
                  >
                    {uploadFile ? (
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-slate-700">{uploadFile.name}</span>
                        <span className="text-sm text-slate-500">
                          ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600">点击或拖拽文件到此处</p>
                        <p className="text-sm text-slate-400 mt-1">
                          {activeTab === 'videos'
                            ? '支持 MP4, WebM, MOV, AVI（最大 500MB）'
                            : '支持 PDF, DOC, PPT, XLS（最大 50MB）'}
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* 资源标题 */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">资源标题</label>
                <Input
                  placeholder="请输入资源标题"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                />
              </div>

              {/* 分类选择 */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">资源分类</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="">选择分类</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 上传进度 */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">上传中...</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* 按钮 */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                  取消
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={!uploadFile || isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      上传中...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      开始上传
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
