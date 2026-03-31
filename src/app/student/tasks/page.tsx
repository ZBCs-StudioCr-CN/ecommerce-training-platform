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
  ChevronLeft,
  CheckCircle2,
  Clock,
  Target,
  Lightbulb,
  Video,
  FileQuestion,
  ArrowRight,
  Star,
  Lock,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PRACTICE_STAGES, type PracticeStage } from '@/data/practice';

const menuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
];

// 模拟当前阶段数据
const currentStage = PRACTICE_STAGES[2]; // 产品上架阶段
const mockTasks = currentStage.tasks.map((task, index) => ({
  ...task,
  completed: index < 3, // 前3个已完成
  score: index < 3 ? 80 + Math.random() * 20 : 0,
}));

export default function StudentTasksPage() {
  const [activeMenu, setActiveMenu] = useState('practice');
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);
  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const earnedPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);

  // 获取难度颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-amber-100 text-amber-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // 获取难度文本
  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  // 获取任务类型图标
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return FileText;
      case 'operation': return Target;
      case 'analysis': return Lightbulb;
      case 'creation': return Star;
      case 'simulation': return Play;
      default: return Target;
    }
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
        {/* 返回按钮 */}
        <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返回实训控制台
        </Link>

        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">{currentStage.name}</h2>
          <p className="text-slate-500">{currentStage.description}</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* 左侧：任务列表 */}
          <div className="col-span-3 space-y-6">
            {/* 进度卡片 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-800">任务进度</h3>
                    <p className="text-sm text-slate-500">
                      已完成 {completedTasks}/{tasks.length} 个任务
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-800">{progress}%</p>
                    <p className="text-sm text-slate-500">完成度</p>
                  </div>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="mt-4 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="text-slate-600">获得积分：<span className="font-semibold text-slate-800">{earnedPoints}</span>/{totalPoints}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">预计时长：{currentStage.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 任务列表 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>任务列表</CardTitle>
                <CardDescription>按顺序完成任务，获取积分和徽章</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task, index) => {
                    const TaskIcon = getTaskTypeIcon(task.type);
                    const isLocked = index > 0 && !tasks[index - 1].completed;
                    
                    return (
                      <div
                        key={task.id}
                        className={`border rounded-xl p-4 transition-all ${
                          task.completed 
                            ? 'border-green-200 bg-green-50' 
                            : isLocked 
                            ? 'border-slate-200 bg-slate-50 opacity-60'
                            : 'border-slate-200 hover:border-blue-300 hover:shadow-sm cursor-pointer'
                        }`}
                        onClick={() => !isLocked && setSelectedTask(task.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            task.completed 
                              ? 'bg-green-100' 
                              : isLocked 
                              ? 'bg-slate-200'
                              : 'bg-blue-100'
                          }`}>
                            {task.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : isLocked ? (
                              <Lock className="h-5 w-5 text-slate-400" />
                            ) : (
                              <TaskIcon className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-slate-800">{task.name}</h4>
                              <Badge className={getDifficultyColor(task.difficulty)}>
                                {getDifficultyText(task.difficulty)}
                              </Badge>
                              {task.completed && task.score && (
                                <Badge variant="outline" className="bg-white">
                                  {Math.round(task.score)}分
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500" />
                                {task.points} 积分
                              </span>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {task.estimatedTime}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {task.completed ? (
                              <Badge className="bg-green-500">已完成</Badge>
                            ) : isLocked ? (
                              <Badge variant="outline" className="text-slate-400">需完成前置任务</Badge>
                            ) : (
                              <Button size="sm">
                                开始任务
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：学习资源和提示 */}
          <div className="space-y-6">
            {/* 阶段奖励 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>阶段奖励</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentStage.rewards.badge && (
                    <div className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🎖️</span>
                        <div>
                          <p className="font-medium text-amber-800">{currentStage.rewards.badge}</p>
                          <p className="text-xs text-amber-600">完成所有任务获得</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-sm text-slate-600">总积分</p>
                    <p className="text-2xl font-bold text-slate-800">{totalPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 学习资源 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>学习资源</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { type: 'video', title: '产品上架教程', duration: '15分钟' },
                    { type: 'video', title: 'SEO优化技巧', duration: '20分钟' },
                    { type: 'doc', title: '产品描述模板' },
                    { type: 'doc', title: '图片处理规范' },
                  ].map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        resource.type === 'video' ? 'bg-blue-100' : 'bg-slate-100'
                      }`}>
                        {resource.type === 'video' ? (
                          <Video className="h-4 w-4 text-blue-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{resource.title}</p>
                        {resource.duration && (
                          <p className="text-xs text-slate-500">{resource.duration}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 常见问题 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>常见问题</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    '产品图片有什么要求？',
                    '如何设置产品价格？',
                    'SEO优化需要注意什么？',
                  ].map((question, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-sm text-slate-600"
                    >
                      <FileQuestion className="h-4 w-4 text-slate-400" />
                      {question}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
