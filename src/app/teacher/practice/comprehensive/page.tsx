'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Globe,
  LogOut,
  Plus,
  Save,
  Users,
  Settings,
  Target,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  ChevronRight,
  Sparkles,
  Zap,
  AlertTriangle,
  Info,
  Shuffle,
  UserPlus,
  Edit,
  Trash2,
  CheckCircle2,
  Brain,
  BarChart3,
  Layers,
  Award,
  RefreshCw,
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

// 实训阶段配置
const practicePhases = [
  {
    id: 'phase-1',
    name: '第一阶段：市场调研与选品',
    duration: '1周',
    modules: ['市场分析', '竞品调研', '选品决策'],
    weight: 15,
    description: '分析目标市场，完成竞品调研，确定产品策略',
    deliverables: ['市场分析报告', '竞品分析表', '选品方案'],
    milestones: [
      { name: '确定目标市场', weight: 30 },
      { name: '完成竞品分析', weight: 40 },
      { name: '确定选品方案', weight: 30 },
    ],
  },
  {
    id: 'phase-2',
    name: '第二阶段：独立站搭建',
    duration: '2周',
    modules: ['店铺装修', '商品上架', '支付物流'],
    weight: 25,
    description: '完成店铺搭建、商品上架、支付物流配置',
    deliverables: ['独立站链接', '商品详情页', '运营文档'],
    milestones: [
      { name: '完成店铺装修', weight: 35 },
      { name: '完成商品上架', weight: 35 },
      { name: '完成支付物流配置', weight: 30 },
    ],
  },
  {
    id: 'phase-3',
    name: '第三阶段：流量推广',
    duration: '2周',
    modules: ['广告投放', 'SEO优化', '社媒营销'],
    weight: 30,
    description: '制定推广计划，执行广告投放，优化流量获取',
    deliverables: ['推广计划', '广告数据报告', 'SEO优化报告'],
    milestones: [
      { name: '制定推广计划', weight: 20 },
      { name: '执行广告投放', weight: 40 },
      { name: '优化流量获取', weight: 40 },
    ],
  },
  {
    id: 'phase-4',
    name: '第四阶段：转化运营',
    duration: '1周',
    modules: ['转化优化', '客户服务', '复购运营'],
    weight: 20,
    description: '优化转化漏斗，处理客户服务，提升复购率',
    deliverables: ['转化分析报告', '客服话术库', '复购策略'],
    milestones: [
      { name: '优化转化漏斗', weight: 40 },
      { name: '建立客服体系', weight: 30 },
      { name: '制定复购策略', weight: 30 },
    ],
  },
  {
    id: 'phase-5',
    name: '第五阶段：数据分析与复盘',
    duration: '1周',
    modules: ['数据监控', '效果分析', '优化迭代'],
    weight: 10,
    description: '汇总分析数据，输出运营报告，进行复盘总结',
    deliverables: ['运营数据报告', '优化建议', '复盘总结'],
    milestones: [
      { name: '数据汇总分析', weight: 40 },
      { name: '输出优化建议', weight: 30 },
      { name: '完成复盘总结', weight: 30 },
    ],
  },
];

// 角色配置
const roleTemplates = [
  { id: 'leader', name: '项目经理', responsibilities: ['整体规划', '进度管理', '资源协调', '风险控制'], color: 'bg-purple-500' },
  { id: 'operation', name: '运营专员', responsibilities: ['店铺运营', '活动策划', '数据分析', '用户运营'], color: 'bg-blue-500' },
  { id: 'marketing', name: '推广专员', responsibilities: ['广告投放', 'SEO优化', '社媒运营', '流量分析'], color: 'bg-green-500' },
  { id: 'design', name: '视觉设计', responsibilities: ['店铺装修', '图片设计', '视频制作', '品牌视觉'], color: 'bg-pink-500' },
  { id: 'service', name: '客服专员', responsibilities: ['客户咨询', '售后处理', '评价管理', '客户维护'], color: 'bg-amber-500' },
  { id: 'supply', name: '供应链专员', responsibilities: ['供应商对接', '库存管理', '物流协调', '质量控制'], color: 'bg-cyan-500' },
];

// 风险事件配置
const riskEvents = [
  { id: 'ad-ban', name: '广告账户封禁', severity: 'high', trigger: 'phase-3', description: 'Google/Facebook广告账户被暂停' },
  { id: 'shipping', name: '物流延误', severity: 'medium', trigger: 'phase-2', description: '国际物流延误、包裹丢失' },
  { id: 'ip', name: '侵权投诉', severity: 'high', trigger: 'phase-2', description: '产品侵权被投诉下架' },
  { id: 'exchange', name: '汇率波动', severity: 'medium', trigger: 'phase-3', description: '汇率剧烈波动影响利润' },
  { id: 'policy', name: '政策变更', severity: 'high', trigger: 'any', description: '目标市场政策突变' },
  { id: 'customer', name: '客户投诉危机', severity: 'medium', trigger: 'phase-4', description: '大量客户投诉和差评' },
  { id: 'supply', name: '供应链断裂', severity: 'high', trigger: 'phase-2', description: '供应商无法供货' },
  { id: 'competitor', name: '竞争对手恶意', severity: 'medium', trigger: 'phase-3', description: '竞争对手恶意攻击' },
];

// 目标市场配置
const targetMarkets = [
  { id: 'cn', name: '中国', currency: 'CNY', language: '中文', features: ['国内市场', '熟悉环境', '供应链优势'], type: 'domestic' },
  { id: 'us', name: '美国', currency: 'USD', language: '英语', features: ['成熟市场', '竞争激烈', '消费力强'], type: 'cross-border' },
  { id: 'uk', name: '英国', currency: 'GBP', language: '英语', features: ['欧洲门户', '法规严格', '品牌意识强'], type: 'cross-border' },
  { id: 'de', name: '德国', currency: 'EUR', language: '德语', features: ['欧洲最大市场', '质量要求高', '退货率高'], type: 'cross-border' },
  { id: 'jp', name: '日本', currency: 'JPY', language: '日语', features: ['消费精细', '服务要求高', '复购率高'], type: 'cross-border' },
  { id: 'au', name: '澳大利亚', currency: 'AUD', language: '英语', features: ['竞争较小', '物流成本高', '季节相反'], type: 'cross-border' },
];

// 虚拟预算配置 - 国内市场
const budgetTemplatesDomestic = [
  { level: '入门级', total: 20000, ad: 12000, operation: 4000, reserve: 4000, description: '适合新手，基础预算（人民币）' },
  { level: '标准级', total: 35000, ad: 20000, operation: 8000, reserve: 7000, description: '标准预算，适合大多数项目（人民币）' },
  { level: '挑战级', total: 60000, ad: 35000, operation: 15000, reserve: 10000, description: '高预算，挑战更高目标（人民币）' },
];

// 虚拟预算配置 - 跨境市场
const budgetTemplatesCrossBorder = [
  { level: '入门级', total: 3000, ad: 2000, operation: 500, reserve: 500, description: '适合新手，基础预算（美元）' },
  { level: '标准级', total: 5000, ad: 3000, operation: 1000, reserve: 1000, description: '标准预算，适合大多数项目（美元）' },
  { level: '挑战级', total: 10000, ad: 6000, operation: 2000, reserve: 2000, description: '高预算，挑战更高目标（美元）' },
];

// 模拟学生列表
const mockStudents = [
  { id: 1, name: '张小明', class: '电商2201班', ability: { decision: 82, traffic: 75, data: 78, risk: 85 } },
  { id: 2, name: '李小红', class: '电商2201班', ability: { decision: 78, traffic: 80, data: 75, risk: 72 } },
  { id: 3, name: '王小华', class: '电商2201班', ability: { decision: 75, traffic: 68, data: 82, risk: 70 } },
  { id: 4, name: '赵小芳', class: '电商2201班', ability: { decision: 88, traffic: 85, data: 90, risk: 88 } },
  { id: 5, name: '陈小强', class: '电商2201班', ability: { decision: 70, traffic: 72, data: 68, risk: 75 } },
  { id: 6, name: '刘小芳', class: '电商2201班', ability: { decision: 72, traffic: 78, data: 70, risk: 82 } },
  { id: 7, name: '周小伟', class: '电商2201班', ability: { decision: 85, traffic: 82, data: 78, risk: 80 } },
  { id: 8, name: '吴小燕', class: '电商2201班', ability: { decision: 68, traffic: 65, data: 72, risk: 68 } },
  { id: 9, name: '郑小军', class: '电商2201班', ability: { decision: 80, traffic: 76, data: 75, risk: 78 } },
  { id: 10, name: '孙小丽', class: '电商2201班', ability: { decision: 76, traffic: 80, data: 82, risk: 74 } },
  { id: 11, name: '黄小龙', class: '电商2201班', ability: { decision: 78, traffic: 75, data: 76, risk: 80 } },
  { id: 12, name: '杨小美', class: '电商2201班', ability: { decision: 82, traffic: 78, data: 80, risk: 76 } },
];

export default function ComprehensivePracticePage() {
  const router = useRouter();
  const handleLogout = useLogout();
  const [activeMenu, setActiveMenu] = useState('practice');
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // 项目基础信息
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [selectedClass, setSelectedClass] = useState('电商2201班');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // 项目模式：单人 / 小组
  const [projectMode, setProjectMode] = useState<'solo' | 'team'>('solo');

  // 市场与预算
  const [selectedMarket, setSelectedMarket] = useState('cn');
  const [selectedBudget, setSelectedBudget] = useState('标准级');
  const [customBudget, setCustomBudget] = useState({ total: 35000, ad: 20000, operation: 8000, reserve: 7000 });

  // 小组配置（仅在团队模式下使用）
  const [groupSize, setGroupSize] = useState(5);
  const [groupMethod, setGroupMethod] = useState<'random' | 'self' | 'manual'>('random');
  const [groups, setGroups] = useState<Array<Array<{ id: number; name: string; class: string; ability: { decision: number; traffic: number; data: number; risk: number } }>>>([]);
  const [enableRoles, setEnableRoles] = useState(true);

  // 阶段配置
  const [enabledPhases, setEnabledPhases] = useState<string[]>(practicePhases.map(p => p.id));
  const [phaseWeights, setPhaseWeights] = useState<Record<string, number>>({});

  // 风险配置
  const [riskEnabled, setRiskEnabled] = useState(true);
  const [selectedRisks, setSelectedRisks] = useState<string[]>(['ad-ban', 'customer', 'shipping']);
  const [riskTriggerMode, setRiskTriggerMode] = useState<'random' | 'scheduled' | 'manual'>('random');
  
  // 根据市场类型获取预算模板
  const isDomesticMarket = selectedMarket === 'cn';
  const currentBudgetTemplates = isDomesticMarket ? budgetTemplatesDomestic : budgetTemplatesCrossBorder;
  const currencySymbol = isDomesticMarket ? '¥' : '$';

  // AI配置
  const [aiAssistLevel, setAiAssistLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [aiCouplingThreshold, setAiCouplingThreshold] = useState(60);

  // 自动分组
  const handleAutoGroup = () => {
    const shuffled = [...mockStudents].sort(() => Math.random() - 0.5);
    const newGroups: Array<Array<typeof mockStudents[0]>> = [];
    for (let i = 0; i < shuffled.length; i += groupSize) {
      newGroups.push(shuffled.slice(i, i + groupSize));
    }
    setGroups(newGroups);
  };

  // 生成项目
  const handleGenerateProject = async () => {
    setIsGenerating(true);
    // 模拟生成过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    alert('综合项目实战配置已保存！');
  };

  const togglePhase = (phaseId: string) => {
    if (enabledPhases.includes(phaseId)) {
      setEnabledPhases(enabledPhases.filter(p => p !== phaseId));
    } else {
      setEnabledPhases([...enabledPhases, phaseId]);
    }
  };

  const toggleRisk = (riskId: string) => {
    if (selectedRisks.includes(riskId)) {
      setSelectedRisks(selectedRisks.filter(r => r !== riskId));
    } else {
      setSelectedRisks([...selectedRisks, riskId]);
    }
  };

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
            <h2 className="text-2xl font-bold text-slate-800">综合项目实战设置</h2>
            <p className="text-slate-500">配置全链路实训项目，支持单人完成或小组协作，培养完整运营能力</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              保存草稿
            </Button>
            <Button onClick={handleGenerateProject} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  发布项目
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 步骤指示器 */}
        <div className="mb-6 flex items-center gap-2">
          {(projectMode === 'solo' ? [
            { step: 1, name: '项目基础', icon: Target },
            { step: 2, name: '市场预算', icon: DollarSign },
            { step: 3, name: '阶段设置', icon: Layers },
            { step: 4, name: '风险配置', icon: AlertTriangle },
            { step: 5, name: 'AI设置', icon: Brain },
          ] : [
            { step: 1, name: '项目基础', icon: Target },
            { step: 2, name: '市场预算', icon: DollarSign },
            { step: 3, name: '小组配置', icon: Users },
            { step: 4, name: '阶段设置', icon: Layers },
            { step: 5, name: '风险配置', icon: AlertTriangle },
            { step: 6, name: 'AI设置', icon: Brain },
          ]).map((item, index, arr) => (
            <div key={item.step} className="flex items-center">
              <button
                onClick={() => setCurrentStep(item.step)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentStep === item.step
                    ? 'bg-blue-500 text-white'
                    : currentStep > item.step
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {currentStep > item.step ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <item.icon className="h-4 w-4" />
                )}
                <span className="font-medium">{item.name}</span>
              </button>
              {index < arr.length - 1 && <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />}
            </div>
          ))}
        </div>

        {/* 步骤内容 */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            {/* 步骤1：项目基础 */}
            {currentStep === 1 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    项目基础信息
                  </CardTitle>
                  <CardDescription>设置项目名称、模式和参与对象</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">项目名称 *</label>
                      <Input
                        placeholder="如：品牌独立站全链路运营"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">目标班级 *</label>
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

                  {/* 项目模式选择 */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">项目模式 *</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setProjectMode('solo')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          projectMode === 'solo'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            projectMode === 'solo' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <Users className="h-5 w-5" />
                          </div>
                          <span className="font-semibold">单人模式</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-2">学生独立完成全链路任务，培养个人综合能力</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">全链路能力</Badge>
                          <Badge variant="outline" className="text-xs">独立决策</Badge>
                          <Badge variant="outline" className="text-xs">个人评分</Badge>
                        </div>
                      </button>
                      <button
                        onClick={() => setProjectMode('team')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          projectMode === 'team'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            projectMode === 'team' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <Users className="h-5 w-5" />
                          </div>
                          <span className="font-semibold">小组模式</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-2">团队协作完成项目，培养分工协作与沟通能力</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">角色分工</Badge>
                          <Badge variant="outline" className="text-xs">团队协作</Badge>
                          <Badge variant="outline" className="text-xs">互评机制</Badge>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">项目描述</label>
                    <Textarea
                      placeholder="描述项目的背景、目标和核心训练内容..."
                      className="min-h-24"
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">开始时间</label>
                      <Input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">结束时间</label>
                      <Input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      综合项目实战说明
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 全流程闭环，覆盖市场调研到数据分析完整链路</li>
                      <li>• {projectMode === 'solo' ? '单人独立完成，培养全链路综合能力' : '小组协作（4-6人），角色分工明确'}</li>
                      <li>• 支持国内市场和跨境市场场景</li>
                      <li>• 动态风险事件模拟真实运营场景</li>
                      <li>• AI辅助+学生决策，培养核心决策能力</li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setCurrentStep(2)}>
                      下一步：市场与预算
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 步骤2：市场与预算 */}
            {currentStep === 2 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    目标市场与虚拟预算
                  </CardTitle>
                  <CardDescription>选择目标市场，分配虚拟运营预算</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 国内市场 */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      国内市场
                    </label>
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {targetMarkets.filter(m => m.type === 'domestic').map((market) => (
                        <button
                          key={market.id}
                          onClick={() => setSelectedMarket(market.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            selectedMarket === market.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <MapPin className={`h-5 w-5 ${selectedMarket === market.id ? 'text-blue-500' : 'text-slate-400'}`} />
                                <span className="font-semibold text-lg text-slate-800">{market.name}</span>
                                <Badge className="bg-red-100 text-red-700">国内</Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {market.features.map((f, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{f}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-slate-600">
                            模拟淘宝/天猫/拼多多/抖音等国内电商平台运营，熟悉国内电商环境
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* 跨境市场 */}
                    <label className="text-sm font-medium text-slate-700 mb-3 block flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      跨境市场
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                      {targetMarkets.filter(m => m.type === 'cross-border').map((market) => (
                        <button
                          key={market.id}
                          onClick={() => setSelectedMarket(market.id)}
                          className={`p-3 rounded-xl border-2 text-left transition-all ${
                            selectedMarket === market.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className={`h-4 w-4 ${selectedMarket === market.id ? 'text-blue-500' : 'text-slate-400'}`} />
                            <span className="font-semibold text-slate-800">{market.name}</span>
                          </div>
                          <div className="text-xs text-slate-500 space-y-1">
                            <p>货币: {market.currency}</p>
                            <p>语言: {market.language}</p>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {market.features.map((f, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{f}</Badge>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 预算模板 */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">
                      预算模板 {isDomesticMarket && <span className="text-red-500">（人民币）</span>}
                      {!isDomesticMarket && <span className="text-blue-500">（美元）</span>}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {currentBudgetTemplates.map((budget) => (
                        <button
                          key={budget.level}
                          onClick={() => {
                            setSelectedBudget(budget.level);
                            setCustomBudget({
                              total: budget.total,
                              ad: budget.ad,
                              operation: budget.operation,
                              reserve: budget.reserve,
                            });
                          }}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            selectedBudget === budget.level
                              ? 'border-green-500 bg-green-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-800">{budget.level}</span>
                            <span className="text-xl font-bold text-green-600">{currencySymbol}{budget.total}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-2">{budget.description}</p>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-500">广告预算</span>
                              <span className="font-medium">{currencySymbol}{budget.ad}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">运营费用</span>
                              <span className="font-medium">{currencySymbol}{budget.operation}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">储备金</span>
                              <span className="font-medium">{currencySymbol}{budget.reserve}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 自定义预算 */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      自定义预算分配 {isDomesticMarket && <span className="text-xs text-red-500">（人民币）</span>}
                      {!isDomesticMarket && <span className="text-xs text-blue-500">（美元）</span>}
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">总预算</label>
                        <Input
                          type="number"
                          value={customBudget.total}
                          onChange={(e) => setCustomBudget({ ...customBudget, total: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">广告预算</label>
                        <Input
                          type="number"
                          value={customBudget.ad}
                          onChange={(e) => setCustomBudget({ ...customBudget, ad: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">运营费用</label>
                        <Input
                          type="number"
                          value={customBudget.operation}
                          onChange={(e) => setCustomBudget({ ...customBudget, operation: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">储备金</label>
                        <Input
                          type="number"
                          value={customBudget.reserve}
                          onChange={(e) => setCustomBudget({ ...customBudget, reserve: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      上一步
                    </Button>
                    <Button onClick={() => setCurrentStep(projectMode === 'solo' ? 4 : 3)}>
                      下一步：{projectMode === 'solo' ? '阶段设置' : '小组配置'}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 步骤3：小组配置（仅小组模式） */}
            {currentStep === 3 && projectMode === 'team' && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    小组配置
                  </CardTitle>
                  <CardDescription>设置分组方式和角色分配</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 分组设置 */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">每组人数</label>
                      <select
                        className="w-full h-10 px-3 border rounded-lg text-sm"
                        value={groupSize}
                        onChange={(e) => setGroupSize(Number(e.target.value))}
                      >
                        <option value={4}>4人</option>
                        <option value={5}>5人</option>
                        <option value={6}>6人</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">分组方式</label>
                      <select
                        className="w-full h-10 px-3 border rounded-lg text-sm"
                        value={groupMethod}
                        onChange={(e) => setGroupMethod(e.target.value as 'random' | 'self' | 'manual')}
                      >
                        <option value="random">系统随机分配</option>
                        <option value="self">学生自由组队</option>
                        <option value="manual">教师手动分配</option>
                      </select>
                    </div>
                  </div>

                  {/* 角色分配 */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-slate-700">启用角色分工</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={enableRoles}
                          onChange={(e) => setEnableRoles(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {enableRoles && (
                      <div className="grid grid-cols-3 gap-3">
                        {roleTemplates.map((role) => (
                          <div key={role.id} className={`p-3 rounded-lg bg-slate-50 border border-slate-200`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-3 h-3 rounded-full ${role.color}`} />
                              <span className="font-medium text-slate-800">{role.name}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {role.responsibilities.map((r, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{r}</Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 分组预览 */}
                  {groupMethod === 'random' && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-slate-700">分组预览</label>
                        <Button variant="outline" size="sm" onClick={handleAutoGroup}>
                          <Shuffle className="h-4 w-4 mr-2" />
                          随机分组
                        </Button>
                      </div>
                      {groups.length > 0 ? (
                        <div className="space-y-3">
                          {groups.map((group, i) => (
                            <div key={i} className="p-3 rounded-lg border border-slate-200">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-slate-800">第 {i + 1} 组</span>
                                <Badge>{group.length}人</Badge>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {group.map((student) => (
                                  <div key={student.id} className="flex items-center gap-2 px-2 py-1 rounded bg-slate-100">
                                    <span className="text-sm text-slate-700">{student.name}</span>
                                    {enableRoles && (
                                      <select className="h-6 text-xs border rounded px-1">
                                        {roleTemplates.slice(0, group.length).map((role) => (
                                          <option key={role.id} value={role.id}>{role.name}</option>
                                        ))}
                                      </select>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 rounded-lg border-2 border-dashed border-slate-200 text-center">
                          <Users className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">点击"随机分组"按钮生成分组</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 能力均衡提示 */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      分组建议
                    </h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• 建议每组包含不同能力水平的学生，实现互补</li>
                      <li>• 角色分配应考虑学生个人能力和兴趣</li>
                      <li>• 可在实训过程中进行角色轮换，培养综合能力</li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      上一步
                    </Button>
                    <Button onClick={() => setCurrentStep(4)}>
                      下一步：阶段设置
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 步骤4（小组模式）/ 步骤3（单人模式）：阶段设置 */}
            {(currentStep === 4 && projectMode === 'team') || (currentStep === 3 && projectMode === 'solo') ? (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-500" />
                    实训阶段设置
                  </CardTitle>
                  <CardDescription>配置实训阶段、里程碑和交付物</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {practicePhases.map((phase, index) => (
                    <div
                      key={phase.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        enabledPhases.includes(phase.id)
                          ? 'border-indigo-300 bg-indigo-50/50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                          enabledPhases.includes(phase.id) ? 'bg-indigo-500' : 'bg-slate-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={enabledPhases.includes(phase.id)}
                                onChange={() => togglePhase(phase.id)}
                                className="rounded border-slate-300"
                              />
                              <span className="font-semibold text-slate-800">{phase.name}</span>
                              <Badge variant="outline">{phase.duration}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-500">权重:</span>
                              <Input
                                type="number"
                                className="w-16 h-8 text-center"
                                value={phase.weight}
                                min={0}
                                max={100}
                                onChange={(e) => setPhaseWeights({ ...phaseWeights, [phase.id]: Number(e.target.value) })}
                              />
                              <span className="text-sm text-slate-500">%</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{phase.description}</p>
                          {enabledPhases.includes(phase.id) && (
                            <>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {phase.modules.map((m, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{m}</Badge>
                                ))}
                              </div>
                              <div className="mt-3 pt-3 border-t border-indigo-200">
                                <p className="text-xs text-slate-500 mb-2">里程碑检查点:</p>
                                <div className="grid grid-cols-3 gap-2">
                                  {phase.milestones.map((m, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs">
                                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                                      <span className="text-slate-600">{m.name} ({m.weight}%)</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-slate-500 mb-1">交付物:</p>
                                <div className="flex flex-wrap gap-1">
                                  {phase.deliverables.map((d, i) => (
                                    <Badge key={i} variant="outline" className="text-xs bg-white">{d}</Badge>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-indigo-800">权重总计</span>
                      <span className={`text-xl font-bold ${
                        practicePhases.filter(p => enabledPhases.includes(p.id)).reduce((a, b) => a + b.weight, 0) === 100
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {practicePhases.filter(p => enabledPhases.includes(p.id)).reduce((a, b) => a + b.weight, 0)}%
                      </span>
                    </div>
                    <p className="text-xs text-indigo-600">权重总计需为100%</p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(projectMode === 'solo' ? 2 : 3)}>
                      上一步
                    </Button>
                    <Button onClick={() => setCurrentStep(projectMode === 'solo' ? 4 : 5)}>
                      下一步：风险配置
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* 步骤5（小组模式）/ 步骤4（单人模式）：风险配置 */}
            {(currentStep === 5 && projectMode === 'team') || (currentStep === 4 && projectMode === 'solo') ? (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        风险事件配置
                      </CardTitle>
                      <CardDescription>配置动态风险事件，模拟真实运营场景</CardDescription>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={riskEnabled}
                        onChange={(e) => setRiskEnabled(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                </CardHeader>
                {riskEnabled && (
                  <CardContent className="space-y-6">
                    {/* 触发方式 */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">风险触发方式</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'random', name: '随机触发', desc: '系统在适当时机随机触发' },
                          { id: 'scheduled', name: '定时触发', desc: '按预设时间点触发' },
                          { id: 'manual', name: '手动触发', desc: '教师手动控制触发' },
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() => setRiskTriggerMode(mode.id as 'random' | 'scheduled' | 'manual')}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              riskTriggerMode === mode.id
                                ? 'border-amber-500 bg-amber-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <p className="font-medium text-slate-800">{mode.name}</p>
                            <p className="text-xs text-slate-500">{mode.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 风险事件选择 */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-3 block">风险事件库</label>
                      <div className="grid grid-cols-2 gap-3">
                        {riskEvents.map((risk) => (
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
                              <span className="font-medium text-slate-800">{risk.name}</span>
                              <Badge variant={risk.severity === 'high' ? 'destructive' : 'default'} className="text-xs">
                                {risk.severity === 'high' ? '高风险' : '中风险'}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500">{risk.description}</p>
                            <p className="text-xs text-slate-400 mt-1">触发阶段: {
                              risk.trigger === 'any' ? '任意阶段' :
                              practicePhases.find(p => p.id === risk.trigger)?.name || risk.trigger
                            }</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 已选风险事件 */}
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <h4 className="font-medium text-amber-800 mb-2">已选择 {selectedRisks.length} 个风险事件</h4>
                      <p className="text-xs text-amber-700">
                        风险事件将在实训过程中触发，学生需要及时应对。每次风险应对将进行AI内容检测，耦合度超过{aiCouplingThreshold}%将判定为0分。
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(projectMode === 'solo' ? 3 : 4)}>
                        上一步
                      </Button>
                      <Button onClick={() => setCurrentStep(projectMode === 'solo' ? 5 : 6)}>
                        下一步：AI设置
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ) : null}

            {/* 步骤6（小组模式）/ 步骤5（单人模式）：AI设置 */}
            {(currentStep === 6 && projectMode === 'team') || (currentStep === 5 && projectMode === 'solo') ? (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    AI辅助设置
                  </CardTitle>
                  <CardDescription>配置AI辅助级别和内容检测阈值</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* AI辅助级别 */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">AI辅助级别</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'low', name: '低辅助', desc: 'AI仅提供基础建议，强调学生自主决策', color: 'green' },
                        { id: 'medium', name: '中辅助', desc: 'AI提供详细分析和多个方案选项', color: 'blue' },
                        { id: 'high', name: '高辅助', desc: 'AI深度参与，提供完整方案供参考', color: 'purple' },
                      ].map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setAiAssistLevel(level.id as 'low' | 'medium' | 'high')}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            aiAssistLevel === level.id
                              ? `border-${level.color}-500 bg-${level.color}-50`
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <p className="font-semibold text-slate-800 mb-1">{level.name}</p>
                          <p className="text-xs text-slate-500">{level.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI耦合度阈值 */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">AI内容检测阈值</label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        className="w-24 h-10 text-center"
                        value={aiCouplingThreshold}
                        onChange={(e) => setAiCouplingThreshold(Number(e.target.value))}
                        min={0}
                        max={100}
                      />
                      <span className="text-slate-600">%</span>
                      <div className="flex-1">
                        <Progress value={aiCouplingThreshold} className="h-3" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      学生提交方案的AI耦合度超过此阈值将被判定为0分，建议设置为50-70%
                    </p>
                  </div>

                  {/* 评分维度 */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">综合评分维度</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: '自主决策能力', weight: 30, color: 'blue' },
                        { name: 'AI辅助应用', weight: 20, color: 'purple' },
                        { name: '数据复盘与优化', weight: 25, color: 'green' },
                        { name: '风险应对', weight: 15, color: 'amber' },
                        { name: '合规与规则意识', weight: 10, color: 'red' },
                      ].map((dim) => (
                        <div key={dim.name} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                          <div className={`w-3 h-3 rounded-full bg-${dim.color}-500`} />
                          <span className="flex-1 text-sm text-slate-700">{dim.name}</span>
                          <span className="font-bold text-slate-800">{dim.weight}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 配置总结 */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      项目配置总结
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">项目模式</span>
                        <span className="font-medium text-slate-800">
                          {projectMode === 'solo' ? '单人独立完成' : '小组协作'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">目标市场</span>
                        <span className="font-medium text-slate-800">{targetMarkets.find(m => m.id === selectedMarket)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">虚拟预算</span>
                        <span className="font-medium text-slate-800">{currencySymbol}{customBudget.total}</span>
                      </div>
                      {projectMode === 'team' && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">小组规模</span>
                          <span className="font-medium text-slate-800">{groupSize}人/组</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">实训阶段</span>
                        <span className="font-medium text-slate-800">{enabledPhases.length}个阶段</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">风险事件</span>
                        <span className="font-medium text-slate-800">{selectedRisks.length}个</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">AI辅助级别</span>
                        <span className="font-medium text-slate-800">
                          {aiAssistLevel === 'low' ? '低辅助' : aiAssistLevel === 'medium' ? '中辅助' : '高辅助'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(projectMode === 'solo' ? 4 : 5)}>
                      上一步
                    </Button>
                    <Button onClick={handleGenerateProject} disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          发布项目
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>

          {/* 右侧：配置预览 */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">配置预览</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">项目名称</p>
                  <p className="font-medium text-slate-800">{projectName || '未设置'}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">项目模式</p>
                  <p className="font-medium text-slate-800">
                    {projectMode === 'solo' ? '单人独立完成' : '小组协作'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">目标班级</p>
                  <p className="font-medium text-slate-800">{selectedClass}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">目标市场</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-slate-800">
                      {targetMarkets.find(m => m.id === selectedMarket)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-xs text-green-600 mb-1">虚拟预算</p>
                  <p className="text-xl font-bold text-green-700">{currencySymbol}{customBudget.total}</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <p className="text-xs text-purple-600 mb-1">分组配置</p>
                  <p className="font-medium text-purple-700">{groupSize}人/组 · {
                    groupMethod === 'random' ? '随机分配' : 
                    groupMethod === 'self' ? '自由组队' : '手动分配'
                  }</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-xs text-amber-600 mb-1">风险事件</p>
                  <p className="font-medium text-amber-700">{selectedRisks.length} 个已启用</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-xs text-blue-600 mb-1">实训阶段</p>
                  <p className="font-medium text-blue-700">{enabledPhases.length} 个阶段</p>
                </div>
              </CardContent>
            </Card>

            {/* 使用说明 */}
            <Card className="border-0 shadow-lg bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  设置说明
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>综合项目实战为全链路实训，建议时长6-8周</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>小组协作模式需设置角色分工</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>风险事件可在实训过程中动态调整</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>AI辅助级别影响学生可获得的帮助程度</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
