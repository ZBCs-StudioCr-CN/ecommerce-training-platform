'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  Globe,
  LogOut,
  Search,
  Eye,
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Play,
  Pause,
  Send,
  Sparkles,
  RefreshCw,
  Video,
  MessageCircle,
  Zap,
  Settings,
  ChevronRight,
  Activity,
  Brain,
  Target,
  AlertTriangle,
  Volume2,
  VolumeX,
  Maximize2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { teacherMenuItems } from '@/config/menu';

// 实时学生数据
const studentsData = [
  { id: 1, name: '张小明', avatar: '张', progress: 85, score: 92, status: 'normal', lastActive: '2分钟前', currentStep: '店铺装修-设置轮播图', timeSpent: 45, aiQueries: 12 },
  { id: 2, name: '李小红', avatar: '李', progress: 72, score: 78, status: 'warning', lastActive: '15分钟前', currentStep: '商品上架-编辑详情页', timeSpent: 38, aiQueries: 28 },
  { id: 3, name: '王小华', avatar: '王', progress: 45, score: 65, status: 'danger', lastActive: '1小时前', currentStep: '市场调研-选择目标市场', timeSpent: 22, aiQueries: 35 },
  { id: 4, name: '赵小芳', avatar: '赵', progress: 92, score: 95, status: 'normal', lastActive: '刚刚', currentStep: '数据分析-生成报告', timeSpent: 52, aiQueries: 8 },
  { id: 5, name: '陈小强', avatar: '陈', progress: 68, score: 82, status: 'warning', lastActive: '30分钟前', currentStep: '广告投放-设置预算', timeSpent: 35, aiQueries: 18 },
  { id: 6, name: '刘小芳', avatar: '刘', progress: 55, score: 70, status: 'warning', lastActive: '10分钟前', currentStep: '风险应对-处理投诉', timeSpent: 28, aiQueries: 22 },
  { id: 7, name: '周小伟', avatar: '周', progress: 88, score: 88, status: 'normal', lastActive: '5分钟前', currentStep: 'SEO优化-关键词设置', timeSpent: 48, aiQueries: 15 },
  { id: 8, name: '吴小燕', avatar: '吴', progress: 30, score: 58, status: 'danger', lastActive: '2小时前', currentStep: '店铺搭建-选择模板', timeSpent: 15, aiQueries: 42 },
];

// AI教学建议
const aiTeachingSuggestions = [
  {
    id: 1,
    type: 'warning',
    title: '学生AI依赖度预警',
    description: '发现3名学生AI使用频率过高，建议进行一对一辅导',
    action: '发送提醒',
    students: ['王小华', '吴小燕', '张小明'],
  },
  {
    id: 2,
    type: 'opportunity',
    title: '优秀案例推荐分享',
    description: '赵小芳的店铺装修方案可以作为优秀案例分享给全班',
    action: '分享案例',
    students: ['赵小芳'],
  },
  {
    id: 3,
    type: 'intervention',
    title: '进度落后学生干预',
    description: '吴小燕连续2小时未活跃，建议发送督促消息',
    action: '发送消息',
    students: ['吴小燕'],
  },
];

// 实时活动日志
const activityLogs = [
  { time: '14:32', student: '赵小芳', action: '完成了"数据分析"模块', type: 'complete' },
  { time: '14:28', student: '张小明', action: '向AI助手咨询"轮播图设计建议"', type: 'ai' },
  { time: '14:25', student: '王小华', action: '提交了风险应对方案（AI检测：52%）', type: 'warning' },
  { time: '14:20', student: '李小红', action: '进入"商品上架"步骤', type: 'progress' },
  { time: '14:15', student: '周小伟', action: '完成SEO关键词优化', type: 'complete' },
  { time: '14:10', student: '吴小燕', action: '向AI助手连续提问5次', type: 'warning' },
];

export default function TeacherMonitorPage() {
  const [activeMenu, setActiveMenu] = useState('monitor');
  const [activeTab, setActiveTab] = useState('realtime');
  const [isClassActive, setIsClassActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof studentsData[0] | null>(null);
  const [guidanceMessage, setGuidanceMessage] = useState('');
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  // 统计数据
  const stats = {
    total: studentsData.length,
    normal: studentsData.filter(s => s.status === 'normal').length,
    warning: studentsData.filter(s => s.status === 'warning').length,
    danger: studentsData.filter(s => s.status === 'danger').length,
    avgProgress: Math.round(studentsData.reduce((a, b) => a + b.progress, 0) / studentsData.length),
    avgScore: Math.round(studentsData.reduce((a, b) => a + b.score, 0) / studentsData.length),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger': return 'bg-red-100 text-red-700';
      case 'warning': return 'bg-amber-100 text-amber-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'danger': return '需关注';
      case 'warning': return '进度落后';
      default: return '正常';
    }
  };

  // 生成AI教学建议
  const generateAISuggestion = async () => {
    setIsGeneratingSuggestion(true);
    try {
      const response = await fetch('/api/teacher/ai-teaching-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classStats: stats,
          students: studentsData,
        }),
      });
      const data = await response.json();
      if (data.suggestion) {
        setAiSuggestion(data.suggestion);
      }
    } catch (error) {
      console.error('AI suggestion error:', error);
    } finally {
      setIsGeneratingSuggestion(false);
    }
  };

  // 发送指导消息
  const sendGuidance = async (studentId: number, message: string) => {
    // 实际实现中会调用API
    console.log('Sending guidance to student:', studentId, message);
    alert(`已向学生发送指导: ${message}`);
    setGuidanceMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/login" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
              <p className="text-xs text-slate-500">教师端</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {/* 课堂控制 */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100">
              <div className={`w-2 h-2 rounded-full ${isClassActive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-sm font-medium text-slate-700">
                {isClassActive ? '课堂进行中' : '课堂已暂停'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsClassActive(!isClassActive)}
              >
                {isClassActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-5 w-5 text-slate-400" /> : <Volume2 className="h-5 w-5 text-slate-600" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">8</span>
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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      <main className="ml-60 pt-16 min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">教学控制台</h2>
            <p className="text-slate-500">实时监控学生实训，AI辅助教学决策</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateAISuggestion} disabled={isGeneratingSuggestion}>
              {isGeneratingSuggestion ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI教学建议
                </>
              )}
            </Button>
            <Button variant="outline">
              <Maximize2 className="h-4 w-4 mr-2" />
              全屏模式
            </Button>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-xs text-slate-500">在线学生</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.normal}</p>
              <p className="text-xs text-slate-500">进度正常</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-amber-600">{stats.warning}</p>
              <p className="text-xs text-slate-500">进度落后</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-red-600">{stats.danger}</p>
              <p className="text-xs text-slate-500">需关注</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.avgProgress}%</p>
              <p className="text-xs text-slate-500">平均进度</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.avgScore}</p>
              <p className="text-xs text-slate-500">平均分</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="realtime" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              实时监控
            </TabsTrigger>
            <TabsTrigger value="ai-suggestions" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Brain className="h-4 w-4 mr-2" />
              AI建议
            </TabsTrigger>
            <TabsTrigger value="logs" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              活动日志
            </TabsTrigger>
          </TabsList>

          {/* 实时监控 */}
          <TabsContent value="realtime" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* 学生列表 */}
              <div className="col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>学生实训状态</CardTitle>
                      <CardDescription>实时监控学生进度与AI使用情况</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <select className="h-8 px-3 border rounded-lg text-sm">
                        <option>电商2201班</option>
                        <option>跨境电商2203班</option>
                      </select>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="搜索学生..." className="w-48 pl-9 h-8" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {studentsData.map((student) => (
                        <div
                          key={student.id}
                          className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedStudent?.id === student.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                          onClick={() => setSelectedStudent(student)}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                            student.status === 'danger' ? 'bg-gradient-to-br from-red-500 to-rose-600' :
                            student.status === 'warning' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                            'bg-gradient-to-br from-emerald-500 to-teal-600'
                          }`}>
                            {student.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-slate-800">{student.name}</span>
                              <Badge className={getStatusColor(student.status)}>{getStatusLabel(student.status)}</Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span className="truncate">{student.currentStep}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Brain className="h-3 w-3" />
                                {student.aiQueries}次AI
                              </span>
                            </div>
                          </div>
                          <div className="w-24">
                            <Progress value={student.progress} className="h-2" />
                            <p className="text-xs text-slate-500 text-center mt-1">{student.progress}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-slate-700">{student.score}</p>
                            <p className="text-xs text-slate-500">分</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧面板 */}
              <div className="space-y-6">
                {/* 选中学生详情 */}
                {selectedStudent && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">学生详情</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          selectedStudent.status === 'danger' ? 'bg-gradient-to-br from-red-500 to-rose-600' :
                          selectedStudent.status === 'warning' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                          'bg-gradient-to-br from-emerald-500 to-teal-600'
                        }`}>
                          {selectedStudent.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{selectedStudent.name}</p>
                          <p className="text-xs text-slate-500">最后活跃: {selectedStudent.lastActive}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-slate-50 text-center">
                          <p className="text-xl font-bold text-slate-800">{selectedStudent.progress}%</p>
                          <p className="text-xs text-slate-500">完成进度</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 text-center">
                          <p className="text-xl font-bold text-slate-800">{selectedStudent.score}</p>
                          <p className="text-xs text-slate-500">当前得分</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 text-center">
                          <p className="text-xl font-bold text-slate-800">{selectedStudent.timeSpent}分钟</p>
                          <p className="text-xs text-slate-500">学习时长</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 text-center">
                          <p className={`text-xl font-bold ${selectedStudent.aiQueries > 25 ? 'text-red-600' : 'text-slate-800'}`}>
                            {selectedStudent.aiQueries}次
                          </p>
                          <p className="text-xs text-slate-500">AI使用</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">当前步骤</p>
                        <p className="text-sm text-slate-600 p-2 rounded bg-slate-50">{selectedStudent.currentStep}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">发送指导</p>
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="输入指导内容..."
                            className="min-h-16"
                            value={guidanceMessage}
                            onChange={(e) => setGuidanceMessage(e.target.value)}
                          />
                        </div>
                        <Button className="w-full mt-2" size="sm" onClick={() => sendGuidance(selectedStudent.id, guidanceMessage)}>
                          <Send className="h-4 w-4 mr-2" />
                          发送指导
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Video className="h-4 w-4 mr-1" />
                          回放
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          对话
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 快捷操作 */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <CardHeader>
                    <CardTitle>快捷操作</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="secondary" className="w-full justify-start" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      全班广播消息
                    </Button>
                    <Button variant="secondary" className="w-full justify-start" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      触发风险事件
                    </Button>
                    <Button variant="secondary" className="w-full justify-start" size="sm">
                      <Zap className="h-4 w-4 mr-2" />
                      批量辅导提醒
                    </Button>
                    <Button variant="secondary" className="w-full justify-start" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      实训环境设置
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI建议 */}
          <TabsContent value="ai-suggestions" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                {aiTeachingSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className={`border-0 shadow-lg ${
                    suggestion.type === 'warning' ? 'border-l-4 border-l-amber-500' :
                    suggestion.type === 'opportunity' ? 'border-l-4 border-l-green-500' :
                    'border-l-4 border-l-red-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          suggestion.type === 'warning' ? 'bg-amber-100' :
                          suggestion.type === 'opportunity' ? 'bg-green-100' :
                          'bg-red-100'
                        }`}>
                          {suggestion.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                          {suggestion.type === 'opportunity' && <Target className="h-5 w-5 text-green-600" />}
                          {suggestion.type === 'intervention' && <AlertCircle className="h-5 w-5 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-800">{suggestion.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {suggestion.students.length}名学生
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{suggestion.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {suggestion.students.map((s, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                              ))}
                            </div>
                            <Button size="sm">{suggestion.action}</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* AI生成的教学建议 */}
                {aiSuggestion && (
                  <Card className="border-0 shadow-lg border-purple-200 bg-purple-50/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-800">
                        <Sparkles className="h-5 w-5" />
                        AI教学策略建议
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none text-purple-900" dangerouslySetInnerHTML={{ __html: aiSuggestion }} />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* 右侧统计 */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>AI辅助教学统计</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg bg-purple-50 text-center">
                      <p className="text-2xl font-bold text-purple-600">3</p>
                      <p className="text-xs text-purple-600">当前建议数</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded bg-slate-50 text-center">
                        <p className="text-lg font-bold text-slate-800">12</p>
                        <p className="text-xs text-slate-500">今日干预</p>
                      </div>
                      <div className="p-2 rounded bg-slate-50 text-center">
                        <p className="text-lg font-bold text-slate-800">89%</p>
                        <p className="text-xs text-slate-500">有效率</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI教学助手
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Sparkles className="h-4 w-4 mr-2" />
                      生成个性化教案
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      分析薄弱知识点
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      生成分组建议
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 活动日志 */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>实时活动日志</CardTitle>
                  <div className="flex gap-2">
                    <select className="h-8 px-3 border rounded-lg text-sm">
                      <option>全部类型</option>
                      <option>完成</option>
                      <option>AI使用</option>
                      <option>警告</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      刷新
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activityLogs.map((log, i) => (
                    <div key={i} className={`flex items-center gap-4 p-3 rounded-lg ${
                      log.type === 'warning' ? 'bg-amber-50' :
                      log.type === 'complete' ? 'bg-green-50' :
                      log.type === 'ai' ? 'bg-purple-50' :
                      'bg-slate-50'
                    }`}>
                      <span className="text-sm text-slate-500 w-14">{log.time}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        log.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                        log.type === 'complete' ? 'bg-green-100 text-green-600' :
                        log.type === 'ai' ? 'bg-purple-100 text-purple-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {log.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                        {log.type === 'complete' && <CheckCircle2 className="h-4 w-4" />}
                        {log.type === 'ai' && <Brain className="h-4 w-4" />}
                        {log.type === 'progress' && <ChevronRight className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-slate-700">{log.student}</span>
                        <span className="text-slate-600 ml-2">{log.action}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
