'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  LogOut,
  Globe,
  Plus,
  Save,
  Calendar,
  Clock,
  Target,
  Users,
  AlertTriangle,
  Info,
  ChevronRight,
  Sparkles,
  Zap,
  FileText,
  RefreshCw,
  Settings,
  Trash2,
  Edit,
  Eye,
  Wand2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { teacherMenuItems } from '@/config/menu';
import { useLogout } from '@/lib/auth';

const practiceModules = [
  { id: 'market', name: '市场调研与选品', weight: 15, description: '市场分析、竞品调研、选品决策' },
  { id: 'build', name: '独立站搭建', weight: 20, description: '店铺装修、商品上架、页面优化' },
  { id: 'traffic', name: '流量推广', weight: 25, description: '广告投放、SEO优化、社媒营销' },
  { id: 'conversion', name: '转化运营', weight: 20, description: '转化优化、客户服务、复购运营' },
  { id: 'data', name: '数据分析', weight: 15, description: '数据监控、效果分析、优化决策' },
  { id: 'risk', name: '风险应对', weight: 5, description: '危机处理、合规运营、风险预防' },
];

const riskScenarios = [
  { id: 'ad-ban', name: '广告账户封禁', description: '模拟Google/Facebook广告账户被暂停场景', severity: 'high' },
  { id: 'shipping', name: '物流延误', description: '模拟国际物流延误、包裹丢失场景', severity: 'medium' },
  { id: 'ip', name: '侵权投诉', description: '模拟产品侵权被投诉下架场景', severity: 'high' },
  { id: 'exchange', name: '汇率波动', description: '模拟汇率剧烈波动影响利润场景', severity: 'medium' },
  { id: 'policy', name: '政策变更', description: '模拟目标市场政策突变场景', severity: 'high' },
  { id: 'customer', name: '客户投诉', description: '模拟客户投诉和差评处理场景', severity: 'low' },
];

const existingTasks = [
  { id: 1, name: '独立站搭建实训（第3期）', class: '电商2201班', status: '进行中', progress: 65, students: 42, endDate: '2024-03-30' },
  { id: 2, name: '市场调研与选品实战', class: '跨境电商2203班', status: '已结束', progress: 100, students: 38, endDate: '2024-03-20' },
  { id: 3, name: '流量推广模拟', class: '电商2202班', status: '未开始', progress: 0, students: 45, endDate: '2024-04-05' },
  { id: 4, name: '风险应对专项训练', class: '电商2201班', status: '进行中', progress: 30, students: 42, endDate: '2024-04-10' },
];

export default function TeacherPracticePage() {
  const router = useRouter();
  const handleLogout = useLogout();
  const [activeMenu, setActiveMenu] = useState('practice');
  const [activeTab, setActiveTab] = useState('create');
  const [taskType, setTaskType] = useState<'module' | 'comprehensive'>('module');
  const [selectedModules, setSelectedModules] = useState<string[]>(['build']);
  const [selectedClass, setSelectedClass] = useState('电商2201班');
  const [riskEnabled, setRiskEnabled] = useState(false);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedContent, setAiGeneratedContent] = useState('');
  
  // AI任务生成相关状态
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedTask, setGeneratedTask] = useState<{
    name: string;
    description: string;
    objectives: string[];
    evaluation: string[];
  } | null>(null);

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const toggleRisk = (id: string) => {
    if (selectedRisks.includes(id)) {
      setSelectedRisks(selectedRisks.filter((r) => r !== id));
    } else {
      setSelectedRisks([...selectedRisks, id]);
    }
  };

  // AI生成实训任务
  const handleGenerateTask = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/teacher/ai-generate-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          taskType,
          selectedModules,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setGeneratedTask(data.task);
      }
    } catch (error) {
      console.error('AI generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

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
                <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
                <p className="text-xs text-slate-500">教师端</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
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

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {teacherMenuItems.map((item) => (
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
        {/* 页面标题 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">实训管理</h2>
            <p className="text-slate-500">创建和管理实训任务，AI辅助生成教学内容</p>
          </div>
        </div>

        {/* 标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="create" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Plus className="h-4 w-4 mr-2" />
              发布任务
            </TabsTrigger>
            <TabsTrigger value="ai-generate" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              AI生成任务
            </TabsTrigger>
            <TabsTrigger value="risk-manage" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              风险事件管理
            </TabsTrigger>
            <TabsTrigger value="task-list" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              任务列表
            </TabsTrigger>
          </TabsList>

          {/* 发布任务 */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* 左侧：任务配置 */}
              <div className="col-span-2 space-y-6">
                {/* 任务类型选择 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>任务类型</CardTitle>
                    <CardDescription>选择实训任务类型</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setTaskType('module')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          taskType === 'module'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            taskType === 'module' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <Target className="h-5 w-5" />
                          </div>
                          <span className="font-semibold">分项技能实训</span>
                        </div>
                        <p className="text-sm text-slate-500">针对单个技能模块进行专项训练，带步骤引导</p>
                      </button>
                      <button
                        onClick={() => setTaskType('comprehensive')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          taskType === 'comprehensive'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            taskType === 'comprehensive' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <Users className="h-5 w-5" />
                          </div>
                          <span className="font-semibold">综合项目实战</span>
                        </div>
                        <p className="text-sm text-slate-500">全流程闭环，支持个人或小组（4-6人）组队</p>
                        {taskType === 'comprehensive' && (
                          <Link href="/teacher/practice/comprehensive" className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                            前往详细配置页面
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        )}
                      </button>
                    </div>
                    {taskType === 'comprehensive' && (
                      <div className="mt-4 p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                        <p className="text-sm text-indigo-700">
                          <strong>综合项目实战</strong>需要配置完整的项目周期、小组分工、风险事件等内容。
                          点击上方按钮进入详细配置页面，进行完整的实训项目设置。
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 基础信息 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>基础信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">任务名称</label>
                        <Input placeholder="请输入任务名称，如：独立站搭建实训" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">目标班级</label>
                        <select
                          className="w-full h-10 px-3 border rounded-lg text-sm"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          <option>电商2201班</option>
                          <option>跨境电商2203班</option>
                          <option>电商2202班</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">开始时间</label>
                        <Input type="datetime-local" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">结束时间</label>
                        <Input type="datetime-local" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">虚拟预算（美元）</label>
                        <Input type="number" placeholder="如：5000" defaultValue="5000" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">目标市场</label>
                        <select className="w-full h-10 px-3 border rounded-lg text-sm">
                          <option>美国</option>
                          <option>英国</option>
                          <option>德国</option>
                          <option>法国</option>
                          <option>日本</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 模块选择与评分权重 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>实训模块与评分权重</CardTitle>
                    <CardDescription>选择包含的实训模块，自定义评分权重</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {practiceModules.map((module) => (
                        <div key={module.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${
                          selectedModules.includes(module.id) ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                        }`}>
                          <input
                            type="checkbox"
                            checked={selectedModules.includes(module.id)}
                            onChange={() => toggleModule(module.id)}
                            className="rounded border-slate-300"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">{module.name}</p>
                            <p className="text-xs text-slate-500">{module.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              className="w-20 h-8 text-center"
                              defaultValue={module.weight}
                              min={0}
                              max={100}
                            />
                            <span className="text-sm text-slate-500">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">权重总计需为 100%</p>
                  </CardContent>
                </Card>

                {/* 风险场景设置 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                          风险场景模拟
                        </CardTitle>
                        <CardDescription>开启后可模拟真实运营中的突发状况</CardDescription>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={riskEnabled}
                          onChange={(e) => setRiskEnabled(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </CardHeader>
                  {riskEnabled && (
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {riskScenarios.map((risk) => (
                          <button
                            key={risk.id}
                            onClick={() => toggleRisk(risk.id)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              selectedRisks.includes(risk.id)
                                ? 'border-amber-500 bg-amber-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <AlertTriangle className={`h-4 w-4 ${
                                selectedRisks.includes(risk.id) ? 'text-amber-500' : 'text-slate-400'
                              }`} />
                              <span className="font-medium text-sm">{risk.name}</span>
                              <Badge variant={risk.severity === 'high' ? 'destructive' : risk.severity === 'medium' ? 'default' : 'secondary'} className="text-xs">
                                {risk.severity === 'high' ? '高' : risk.severity === 'medium' ? '中' : '低'}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500">{risk.description}</p>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>

              {/* 右侧：预览与操作 */}
              <div className="space-y-6">
                {/* 快捷操作 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <CardHeader>
                    <CardTitle>操作</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="secondary" className="w-full justify-start">
                      <Save className="h-4 w-4 mr-2" />
                      保存草稿
                    </Button>
                    <Button variant="secondary" className="w-full justify-start bg-green-500 hover:bg-green-600">
                      <Zap className="h-4 w-4 mr-2" />
                      立即发布
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI优化建议
                    </Button>
                  </CardContent>
                </Card>

                {/* 任务预览 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>任务预览</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-slate-50">
                        <p className="text-xs text-slate-500 mb-1">任务类型</p>
                        <p className="font-medium">{taskType === 'module' ? '分项技能实训' : '综合项目实战'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50">
                        <p className="text-xs text-slate-500 mb-1">目标班级</p>
                        <p className="font-medium">{selectedClass}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50">
                        <p className="text-xs text-slate-500 mb-1">已选模块</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedModules.map(m => (
                            <Badge key={m} variant="outline" className="text-xs">{practiceModules.find(p => p.id === m)?.name}</Badge>
                          ))}
                        </div>
                      </div>
                      {riskEnabled && selectedRisks.length > 0 && (
                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                          <p className="text-xs text-amber-600 mb-1">风险场景</p>
                          <p className="font-medium text-amber-800">{selectedRisks.length} 项已启用</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* 发布须知 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Info className="h-5 w-5" />
                      发布须知
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>任务发布后，学生可在实训端查看并开始操作</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>可实时监控学生实训进度，对异常情况进行辅导</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>实训结束后需进行考核评分，生成成绩报告</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI生成任务 */}
          <TabsContent value="ai-generate" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      AI智能生成实训任务
                    </CardTitle>
                    <CardDescription>输入需求描述，AI将自动生成完整的实训任务方案</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">任务需求描述</label>
                      <Textarea
                        placeholder="例如：生成一个针对美国市场的服装类目独立站搭建实训任务，重点训练选品和页面优化能力，适合初学者..."
                        className="min-h-32"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">任务类型</label>
                        <select className="w-full h-10 px-3 border rounded-lg text-sm" value={taskType} onChange={(e) => setTaskType(e.target.value as 'module' | 'comprehensive')}>
                          <option value="module">分项技能实训</option>
                          <option value="comprehensive">综合项目实战</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">难度等级</label>
                        <select className="w-full h-10 px-3 border rounded-lg text-sm">
                          <option>入门级</option>
                          <option>进阶级</option>
                          <option>挑战级</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">预计时长</label>
                        <select className="w-full h-10 px-3 border rounded-lg text-sm">
                          <option>2课时</option>
                          <option>4课时</option>
                          <option>8课时</option>
                          <option>16课时</option>
                        </select>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={handleGenerateTask}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          正在生成...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          开始生成
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* 生成结果 */}
                {generatedTask && (
                  <Card className="border-0 shadow-lg shadow-slate-200/50 border-purple-200 bg-purple-50/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-purple-500" />
                          生成结果
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            重新生成
                          </Button>
                          <Button size="sm">
                            应用此方案
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-xl bg-white border border-purple-200">
                        <h4 className="font-semibold text-slate-800 mb-2">{generatedTask.name}</h4>
                        <p className="text-sm text-slate-600">{generatedTask.description}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-slate-700 mb-2">学习目标</h5>
                        <ul className="space-y-1">
                          {generatedTask.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <Target className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-700 mb-2">评分维度</h5>
                        <div className="flex flex-wrap gap-2">
                          {generatedTask.evaluation.map((ev, i) => (
                            <Badge key={i} variant="outline" className="bg-white">{ev}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* 右侧：模板库 */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>任务模板库</CardTitle>
                    <CardDescription>快速选择预设模板</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: '新手入门：独立站基础搭建', modules: ['市场调研', '独立站搭建'], difficulty: '入门' },
                      { name: '进阶训练：流量推广实战', modules: ['流量推广', '数据分析'], difficulty: '进阶' },
                      { name: '综合挑战：全链路运营', modules: ['全部模块'], difficulty: '挑战' },
                      { name: '专项突破：风险应对', modules: ['风险应对'], difficulty: '进阶' },
                    ].map((template, i) => (
                      <div key={i} className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm text-slate-800">{template.name}</span>
                          <Badge variant={template.difficulty === '入门' ? 'secondary' : template.difficulty === '进阶' ? 'default' : 'destructive'} className="text-xs">
                            {template.difficulty}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.modules.map((m, j) => (
                            <Badge key={j} variant="outline" className="text-xs">{m}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg shadow-slate-200/50 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-purple-800 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      AI生成提示
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li>• 详细描述训练目标和学生水平</li>
                      <li>• 指定目标市场和产品类目</li>
                      <li>• 说明希望重点训练的技能</li>
                      <li>• 可添加特殊要求或限制条件</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 风险事件管理 */}
          <TabsContent value="risk-manage" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                {/* 创建自定义风险事件 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      创建自定义风险事件
                    </CardTitle>
                    <CardDescription>设计真实的风险场景，训练学生的应对能力</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">事件名称</label>
                        <Input placeholder="如：Facebook广告账户被封禁" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">风险类型</label>
                        <select className="w-full h-10 px-3 border rounded-lg text-sm">
                          <option>客户投诉</option>
                          <option>差评处理</option>
                          <option>平台处罚</option>
                          <option>舆情危机</option>
                          <option>运营风险</option>
                          <option>合规风险</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">严重程度</label>
                        <select className="w-full h-10 px-3 border rounded-lg text-sm">
                          <option>低 - 一般影响</option>
                          <option>中 - 较大影响</option>
                          <option>高 - 严重影响</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">适用平台</label>
                        <select className="w-full h-10 px-3 border rounded-lg text-sm">
                          <option>全部平台</option>
                          <option>淘宝/天猫</option>
                          <option>亚马逊</option>
                          <option>Shopify独立站</option>
                          <option>Shopee</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">事件描述</label>
                      <Textarea 
                        placeholder="详细描述风险事件背景、影响范围、关键信息..."
                        className="min-h-24"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">参考评分标准</label>
                      <div className="space-y-2">
                        {['响应速度(20%)', '方案合理性(30%)', '沟通技巧(20%)', '合规意识(15%)', '风险控制(15%)'].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                            <span className="flex-1 text-sm text-slate-600">{item}</span>
                            <Input className="w-20 h-7 text-center text-sm" defaultValue={item.match(/\d+/)?.[0]} />
                            <span className="text-xs text-slate-500">分</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        保存风险事件
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI生成事件
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* 已有风险事件列表 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>风险事件库</CardTitle>
                      <div className="flex gap-2">
                        <select className="h-8 px-3 border rounded-lg text-sm">
                          <option>全部类型</option>
                          <option>客户投诉</option>
                          <option>平台处罚</option>
                          <option>舆情危机</option>
                        </select>
                        <Input placeholder="搜索..." className="w-40 h-8" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {riskScenarios.map((risk) => (
                        <div key={risk.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            risk.severity === 'high' ? 'bg-red-100 text-red-600' : 
                            risk.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 
                            'bg-green-100 text-green-600'
                          }`}>
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-slate-800">{risk.name}</p>
                              <Badge variant={risk.severity === 'high' ? 'destructive' : risk.severity === 'medium' ? 'default' : 'secondary'} className="text-xs">
                                {risk.severity === 'high' ? '高风险' : risk.severity === 'medium' ? '中风险' : '低风险'}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500">{risk.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧：统计信息 */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <CardTitle>风险事件统计</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-slate-50 text-center">
                        <p className="text-2xl font-bold text-slate-800">24</p>
                        <p className="text-xs text-slate-500">总事件数</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 text-center">
                        <p className="text-2xl font-bold text-slate-800">6</p>
                        <p className="text-xs text-slate-500">事件类型</p>
                      </div>
                      <div className="p-3 rounded-lg bg-red-50 text-center">
                        <p className="text-2xl font-bold text-red-600">8</p>
                        <p className="text-xs text-red-500">高风险</p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50 text-center">
                        <p className="text-2xl font-bold text-amber-600">10</p>
                        <p className="text-xs text-amber-500">中风险</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg shadow-slate-200/50 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800 flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      使用说明
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-amber-700">
                      <li>• 风险事件可在实训任务中动态触发</li>
                      <li>• 学生应对方案将自动评分</li>
                      <li>• AI内容检测防止直接复制</li>
                      <li>• 支持从真实案例导入事件</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 任务列表 */}
          <TabsContent value="task-list" className="space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>已发布的实训任务</CardTitle>
                  <div className="flex gap-2">
                    <select className="h-8 px-3 border rounded-lg text-sm">
                      <option>全部状态</option>
                      <option>进行中</option>
                      <option>已结束</option>
                      <option>未开始</option>
                    </select>
                    <Input placeholder="搜索任务..." className="w-48 h-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {existingTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        task.status === '进行中' ? 'bg-blue-100 text-blue-600' :
                        task.status === '已结束' ? 'bg-green-100 text-green-600' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {task.status === '进行中' ? <Zap className="h-6 w-6" /> :
                         task.status === '已结束' ? <Target className="h-6 w-6" /> :
                         <Clock className="h-6 w-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-slate-800">{task.name}</p>
                          <Badge variant={
                            task.status === '进行中' ? 'default' :
                            task.status === '已结束' ? 'secondary' :
                            'outline'
                          }>
                            {task.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{task.class}</span>
                          <span>•</span>
                          <span>{task.students}名学生</span>
                          <span>•</span>
                          <span>截止：{task.endDate}</span>
                        </div>
                      </div>
                      <div className="w-32">
                        <Progress value={task.progress} className="h-2" />
                        <p className="text-xs text-slate-500 text-center mt-1">{task.progress}% 完成</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          详情
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          管理
                        </Button>
                      </div>
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
