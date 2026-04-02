'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  LogOut,
  Globe,
  Search,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  Shield,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Settings,
  Zap,
  BarChart3,
  Award,
  ChevronRight,
  MoreHorizontal,
  RefreshCw,
  BookOpen,
  Layers,
  Timer,
  ArrowLeft,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { teacherMenuItems } from '@/config/menu';

// 五维能力分类
const abilityDimensions = [
  {
    id: 'decision',
    name: '自主决策能力',
    icon: Target,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    description: '关键商业决策、选品定价、渠道选择等',
    questionCount: 156,
  },
  {
    id: 'ai',
    name: 'AI辅助应用',
    icon: Brain,
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    description: 'AI工具使用策略、内容审核、效率优化等',
    questionCount: 89,
  },
  {
    id: 'analysis',
    name: '数据复盘与优化',
    icon: TrendingUp,
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    description: '数据分析、问题诊断、优化策略等',
    questionCount: 124,
  },
  {
    id: 'risk',
    name: '风险应对',
    icon: AlertTriangle,
    color: 'bg-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    description: '危机识别、应对方案、客户投诉处理等',
    questionCount: 98,
  },
  {
    id: 'compliance',
    name: '合规与规则意识',
    icon: Shield,
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    description: '平台规则、法律法规、知识产权等',
    questionCount: 76,
  },
];

// 题目类型
const questionTypes = [
  { id: 'single', name: '单选题', count: 280 },
  { id: 'multiple', name: '多选题', count: 145 },
  { id: 'judgment', name: '判断题', count: 98 },
  { id: 'case', name: '案例分析题', count: 45 },
  { id: 'short', name: '简答题', count: 35 },
];

// 难度等级
const difficultyLevels = [
  { id: 'easy', name: '简单', color: 'bg-green-100 text-green-700' },
  { id: 'medium', name: '中等', color: 'bg-amber-100 text-amber-700' },
  { id: 'hard', name: '困难', color: 'bg-red-100 text-red-700' },
];

// 模拟题库数据 - 按能力维度分类
const mockQuestions = [
  // 自主决策能力题目
  {
    id: 'Q001',
    type: 'single',
    ability: 'decision',
    content: '在选择跨境电商目标市场时，以下哪个因素应该优先考虑？',
    options: ['市场规模和增长潜力', '竞争程度', '物流成本', '消费者购买力'],
    correctAnswer: 0,
    difficulty: 'medium',
    source: '平台官方题库',
    usageCount: 234,
    accuracy: 0.78,
  },
  {
    id: 'Q002',
    type: 'single',
    ability: 'decision',
    content: '在制定产品定价策略时，以下哪种方法最适合初创独立站？',
    options: ['成本加成定价法', '竞争对手定价法', '价值定价法', '撇脂定价法'],
    correctAnswer: 2,
    difficulty: 'hard',
    source: '自建题库',
    usageCount: 189,
    accuracy: 0.65,
  },
  {
    id: 'Q003',
    type: 'multiple',
    ability: 'decision',
    content: '选择供应商时，应该考虑哪些关键因素？（多选）',
    options: ['产品质量', '价格竞争力', '交货周期', '售后服务', '以上都是'],
    correctAnswer: [0, 1, 2, 3],
    difficulty: 'easy',
    source: '平台官方题库',
    usageCount: 312,
    accuracy: 0.85,
  },
  {
    id: 'Q004',
    type: 'case',
    ability: 'decision',
    content: '某跨境电商店铺主要销售家居用品，近期发现某款产品销量持续下滑。数据分析显示：流量正常但转化率下降15%，竞争对手新增3家价格低10%，客户评价中出现"质量不如以前"的反馈。请制定综合优化方案。',
    options: [],
    correctAnswer: '需要人工评分',
    difficulty: 'hard',
    source: '实战案例改编',
    usageCount: 89,
    accuracy: 0.72,
  },
  {
    id: 'Q005',
    type: 'judgment',
    ability: 'decision',
    content: '在选品时，利润率应该作为唯一考量标准。',
    options: ['正确', '错误'],
    correctAnswer: 1,
    difficulty: 'easy',
    source: '自建题库',
    usageCount: 456,
    accuracy: 0.92,
  },
  
  // AI辅助应用题目
  {
    id: 'Q006',
    type: 'multiple',
    ability: 'ai',
    content: '使用AI工具生成产品描述时，以下哪些做法是正确的？（多选）',
    options: [
      '直接复制AI生成的内容使用',
      '对AI生成内容进行审核和修改后使用',
      '参考AI建议，结合产品特点重新撰写',
      '将AI生成内容作为初稿，多次迭代优化',
    ],
    correctAnswer: [1, 2, 3],
    difficulty: 'easy',
    source: '自建题库',
    usageCount: 156,
    accuracy: 0.82,
  },
  {
    id: 'Q007',
    type: 'single',
    ability: 'ai',
    content: '以下哪个场景最适合使用AI工具辅助运营？',
    options: ['批量生成产品基础描述', '制定核心定价策略', '处理客户投诉', '签订供应商合同'],
    correctAnswer: 0,
    difficulty: 'medium',
    source: '平台官方题库',
    usageCount: 278,
    accuracy: 0.75,
  },
  {
    id: 'Q008',
    type: 'judgment',
    ability: 'ai',
    content: 'AI生成的内容可以直接用于产品页面，无需人工审核。',
    options: ['正确', '错误'],
    correctAnswer: 1,
    difficulty: 'easy',
    source: '自建题库',
    usageCount: 534,
    accuracy: 0.95,
  },
  {
    id: 'Q009',
    type: 'case',
    ability: 'ai',
    content: '某商家使用AI工具生成了100个产品描述，但发现其中部分内容存在夸大宣传的问题。请分析如何建立AI内容审核机制，确保合规使用AI工具。',
    options: [],
    correctAnswer: '需要人工评分',
    difficulty: 'hard',
    source: '实战案例改编',
    usageCount: 67,
    accuracy: 0.68,
  },
  
  // 数据复盘与优化题目
  {
    id: 'Q010',
    type: 'single',
    ability: 'analysis',
    content: '当独立站转化率突然下降20%时，首先应该分析哪个数据指标？',
    options: ['流量来源变化', '页面加载速度', '商品价格调整', '促销活动结束时间'],
    correctAnswer: 0,
    difficulty: 'medium',
    source: '平台官方题库',
    usageCount: 345,
    accuracy: 0.71,
  },
  {
    id: 'Q011',
    type: 'single',
    ability: 'analysis',
    content: '以下哪个指标最能反映独立站的用户粘性？',
    options: ['日访问量', '跳出率', '回访率', '页面浏览量'],
    correctAnswer: 2,
    difficulty: 'medium',
    source: '自建题库',
    usageCount: 234,
    accuracy: 0.78,
  },
  {
    id: 'Q012',
    type: 'multiple',
    ability: 'analysis',
    content: '分析店铺数据时，以下哪些指标需要重点关注？（多选）',
    options: ['转化率', '客单价', '复购率', '退货率', '广告ROI'],
    correctAnswer: [0, 1, 2, 3, 4],
    difficulty: 'easy',
    source: '平台官方题库',
    usageCount: 456,
    accuracy: 0.88,
  },
  {
    id: 'Q013',
    type: 'case',
    ability: 'analysis',
    content: '某店铺月销售额为10万元，但广告支出达到3万元，ROI仅为1.2。请分析问题原因并提出优化方案，包括广告投放策略调整和自然流量提升建议。',
    options: [],
    correctAnswer: '需要人工评分',
    difficulty: 'hard',
    source: '实战案例改编',
    usageCount: 89,
    accuracy: 0.62,
  },
  {
    id: 'Q014',
    type: 'judgment',
    ability: 'analysis',
    content: '数据分析只需要关注销售额这一个核心指标。',
    options: ['正确', '错误'],
    correctAnswer: 1,
    difficulty: 'easy',
    source: '自建题库',
    usageCount: 678,
    accuracy: 0.94,
  },
  
  // 风险应对题目
  {
    id: 'Q015',
    type: 'case',
    ability: 'risk',
    content: '某独立站收到客户投诉称产品与描述严重不符，客户要求退款并威胁向消费者协会投诉。作为运营人员，请分析处理步骤。',
    options: [],
    correctAnswer: '需要人工评分',
    difficulty: 'hard',
    source: '实战案例改编',
    usageCount: 89,
    accuracy: 0.65,
  },
  {
    id: 'Q016',
    type: 'single',
    ability: 'risk',
    content: '收到客户投诉后，首先应该采取的措施是？',
    options: ['立即退款', '了解投诉详情', '拉黑客户', '忽略投诉'],
    correctAnswer: 1,
    difficulty: 'easy',
    source: '平台官方题库',
    usageCount: 567,
    accuracy: 0.89,
  },
  {
    id: 'Q017',
    type: 'multiple',
    ability: 'risk',
    content: '处理客户投诉时，以下哪些做法是正确的？（多选）',
    options: [
      '保持冷静，耐心倾听',
      '承认错误并道歉',
      '提出合理的解决方案',
      '推卸责任给物流公司',
    ],
    correctAnswer: [0, 1, 2],
    difficulty: 'medium',
    source: '自建题库',
    usageCount: 345,
    accuracy: 0.82,
  },
  {
    id: 'Q018',
    type: 'judgment',
    ability: 'risk',
    content: '收到客户投诉后，为避免差评应无条件满足客户所有要求。',
    options: ['正确', '错误'],
    correctAnswer: 1,
    difficulty: 'medium',
    source: '自建题库',
    usageCount: 456,
    accuracy: 0.85,
  },
  
  // 合规与规则意识题目
  {
    id: 'Q019',
    type: 'judgment',
    ability: 'compliance',
    content: '在商品详情页中使用"世界最好"、"第一"等极限词汇是合规的。',
    options: ['正确', '错误'],
    correctAnswer: 1,
    difficulty: 'easy',
    source: '平台官方题库',
    usageCount: 789,
    accuracy: 0.96,
  },
  {
    id: 'Q020',
    type: 'single',
    ability: 'compliance',
    content: '以下哪种行为属于侵犯知识产权？',
    options: ['使用自己拍摄的图片', '复制竞争对手的产品描述', '销售自有品牌产品', '提供真实的客户评价'],
    correctAnswer: 1,
    difficulty: 'easy',
    source: '平台官方题库',
    usageCount: 456,
    accuracy: 0.91,
  },
  {
    id: 'Q021',
    type: 'multiple',
    ability: 'compliance',
    content: '电商运营中需要注意哪些合规事项？（多选）',
    options: [
      '广告法合规',
      '消费者权益保护',
      '个人信息保护',
      '知识产权保护',
    ],
    correctAnswer: [0, 1, 2, 3],
    difficulty: 'medium',
    source: '平台官方题库',
    usageCount: 345,
    accuracy: 0.87,
  },
  {
    id: 'Q022',
    type: 'case',
    ability: 'compliance',
    content: '某商家在产品描述中使用了"国家级"、"顶级"等词汇，收到平台违规通知。请分析违规原因，并说明如何修改产品描述使其合规。',
    options: [],
    correctAnswer: '需要人工评分',
    difficulty: 'medium',
    source: '实战案例改编',
    usageCount: 123,
    accuracy: 0.75,
  },
];

// 模拟考试列表
const mockExams = [
  {
    id: 'E001',
    name: '电商运营能力期末考试',
    className: '电商2201班',
    status: 'scheduled',
    scheduledTime: '2024-02-20 09:00',
    duration: 120,
    totalScore: 100,
    participantCount: 50,
    submittedCount: 0,
    avgScore: null as number | null,
  },
  {
    id: 'E002',
    name: '风险应对能力测试',
    className: '跨境电商2203班',
    status: 'ongoing',
    scheduledTime: '2024-02-18 14:00',
    duration: 90,
    totalScore: 100,
    participantCount: 45,
    submittedCount: 32,
    avgScore: null as number | null,
  },
  {
    id: 'E003',
    name: 'AI辅助应用能力测试',
    className: '电商2201班',
    status: 'completed',
    scheduledTime: '2024-02-15 10:00',
    duration: 60,
    totalScore: 100,
    participantCount: 50,
    submittedCount: 50,
    avgScore: 78.5,
  },
];

// 智能组卷配置
const defaultPaperConfig = {
  totalScore: 100,
  duration: 90,
  difficultyRatio: { easy: 30, medium: 50, hard: 20 },
  abilityRatio: { decision: 30, ai: 20, analysis: 25, risk: 15, compliance: 10 },
  questionTypeRatio: { single: 40, multiple: 20, judgment: 15, case: 15, short: 10 },
};

export default function TeacherExamPage() {
  const [activeMenu, setActiveMenu] = useState('exam');
  const [activeTab, setActiveTab] = useState('questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAbility, setSelectedAbility] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // 智能组卷状态
  const [paperConfig, setPaperConfig] = useState(defaultPaperConfig);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState<any>(null);

  // 新建题目弹窗
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    type: 'single',
    ability: 'decision',
    content: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    difficulty: 'medium',
  });

  // 点击能力维度卡片
  const handleAbilityClick = (abilityId: string) => {
    setSelectedAbility(abilityId);
    setActiveTab('questions');
  };

  // 清除筛选
  const clearFilters = () => {
    setSelectedAbility('all');
    setSelectedType('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  // 筛选题目
  const filteredQuestions = mockQuestions.filter((q) => {
    if (selectedAbility !== 'all' && q.ability !== selectedAbility) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery && !q.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // 处理智能组卷
  const handleGeneratePaper = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const paper = {
      name: `智能组卷 - ${new Date().toLocaleDateString()}`,
      totalScore: paperConfig.totalScore,
      duration: paperConfig.duration,
      abilityDistribution: [
        { ability: 'decision', score: 30, count: 15 },
        { ability: 'ai', score: 20, count: 10 },
        { ability: 'analysis', score: 25, count: 12 },
        { ability: 'risk', score: 15, count: 8 },
        { ability: 'compliance', score: 10, count: 5 },
      ],
    };
    
    setGeneratedPaper(paper);
    setIsGenerating(false);
  };

  // 获取当前筛选的能力维度名称
  const selectedAbilityName = selectedAbility !== 'all' 
    ? abilityDimensions.find(d => d.id === selectedAbility)?.name 
    : null;

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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="搜索..." className="w-64 pl-9 h-9" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">李老师</p>
                <p className="text-xs text-slate-500">电商学院</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                李
              </div>
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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-60 pt-16 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">考试管理</h1>
                <p className="text-slate-500 mt-1">基于五维能力模型的题库管理与智能组卷</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  导入题目
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  新建考试
                </Button>
              </div>
            </div>
          </div>

          {/* 五维能力概览 - 可点击 */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {abilityDimensions.map((dim) => {
              const Icon = dim.icon;
              const isSelected = selectedAbility === dim.id;
              return (
                <Card 
                  key={dim.id} 
                  className={`border-0 shadow-md cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                      : 'hover:shadow-lg'
                  } ${dim.bgColor} ${dim.borderColor} border`}
                  onClick={() => handleAbilityClick(dim.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg ${dim.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{dim.name}</p>
                        <p className="text-xs text-slate-500">{dim.questionCount} 题</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{dim.description}</p>
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-center gap-1 text-xs text-blue-600">
                        <Filter className="h-3 w-3" />
                        <span>已筛选</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* 主内容区 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="questions">
                <BookOpen className="h-4 w-4 mr-2" />
                题库管理
              </TabsTrigger>
              <TabsTrigger value="generate">
                <Zap className="h-4 w-4 mr-2" />
                智能组卷
              </TabsTrigger>
              <TabsTrigger value="exams">
                <FileText className="h-4 w-4 mr-2" />
                考试安排
              </TabsTrigger>
              <TabsTrigger value="scores">
                <BarChart3 className="h-4 w-4 mr-2" />
                成绩管理
              </TabsTrigger>
            </TabsList>

            {/* 题库管理 */}
            <TabsContent value="questions" className="space-y-4">
              {/* 当前筛选状态提示 */}
              {selectedAbilityName && (
                <Card className="border-0 shadow-sm bg-blue-50 border border-blue-200">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">
                          当前筛选：<strong>{selectedAbilityName}</strong>，共 <strong>{filteredQuestions.length}</strong> 道题目
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600 hover:text-blue-700">
                        <X className="h-4 w-4 mr-1" />
                        清除筛选
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 筛选工具栏 */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="搜索题目内容..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={selectedAbility} onValueChange={setSelectedAbility}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="能力维度" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部维度</SelectItem>
                        {abilityDimensions.map((dim) => (
                          <SelectItem key={dim.id} value={dim.id}>{dim.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="题目类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部类型</SelectItem>
                        {questionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="难度" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部难度</SelectItem>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => setShowAddQuestion(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      添加题目
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 题目统计 */}
              <div className="grid grid-cols-5 gap-4">
                {questionTypes.map((type) => {
                  const count = filteredQuestions.filter(q => q.type === type.id).length;
                  return (
                    <Card key={type.id} className="border-0 shadow-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-slate-800">{count}</p>
                        <p className="text-sm text-slate-500">{type.name}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* 题目列表 */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>题目列表</CardTitle>
                      <CardDescription>共 {filteredQuestions.length} 道题目</CardDescription>
                    </div>
                    {filteredQuestions.length > 0 && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        导出题目
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredQuestions.length > 0 ? (
                    <div className="space-y-3">
                      {filteredQuestions.map((question) => {
                        const ability = abilityDimensions.find(a => a.id === question.ability)!;
                        const Icon = ability.icon;
                        const type = questionTypes.find(t => t.id === question.type)!;
                        const difficulty = difficultyLevels.find(d => d.id === question.difficulty)!;

                        return (
                          <div key={question.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={`${ability.bgColor} ${ability.textColor} border ${ability.borderColor}`}>
                                    <Icon className="h-3 w-3 mr-1" />
                                    {ability.name}
                                  </Badge>
                                  <Badge variant="outline">{type.name}</Badge>
                                  <Badge className={difficulty.color}>{difficulty.name}</Badge>
                                  <span className="text-xs text-slate-400">ID: {question.id}</span>
                                </div>
                                <p className="text-slate-800">{question.content}</p>
                                {question.type !== 'case' && question.type !== 'short' && question.options.length > 0 && (
                                  <div className="mt-2 grid grid-cols-2 gap-2">
                                    {question.options.map((opt, i) => (
                                      <div key={i} className={`text-sm p-2 rounded ${
                                        question.correctAnswer === i || (Array.isArray(question.correctAnswer) && question.correctAnswer.includes(i))
                                          ? 'bg-green-50 text-green-700 border border-green-200'
                                          : 'bg-slate-50 text-slate-600'
                                      }`}>
                                        {String.fromCharCode(65 + i)}. {opt}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>来源: {question.source}</span>
                              <span>•</span>
                              <span>使用次数: {question.usageCount}</span>
                              <span>•</span>
                              <span>正确率: {(question.accuracy * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <Layers className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">暂无符合条件的题目</p>
                      <Button variant="outline" className="mt-4" onClick={clearFilters}>
                        清除筛选条件
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 智能组卷 */}
            <TabsContent value="generate" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {/* 组卷配置 */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-500" />
                      组卷配置
                    </CardTitle>
                    <CardDescription>设置试卷结构和题目分布</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 基本信息 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">总分</label>
                        <Input
                          type="number"
                          value={paperConfig.totalScore}
                          onChange={(e) => setPaperConfig({ ...paperConfig, totalScore: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">考试时长（分钟）</label>
                        <Input
                          type="number"
                          value={paperConfig.duration}
                          onChange={(e) => setPaperConfig({ ...paperConfig, duration: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    {/* 难度比例 */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-3 block">难度比例</label>
                      <div className="space-y-3">
                        {[
                          { key: 'easy', name: '简单', color: 'bg-green-500' },
                          { key: 'medium', name: '中等', color: 'bg-amber-500' },
                          { key: 'hard', name: '困难', color: 'bg-red-500' },
                        ].map((level) => (
                          <div key={level.key} className="flex items-center gap-3">
                            <span className="w-12 text-sm text-slate-600">{level.name}</span>
                            <Input
                              type="number"
                              className="w-20"
                              value={paperConfig.difficultyRatio[level.key as keyof typeof paperConfig.difficultyRatio]}
                              onChange={(e) => setPaperConfig({
                                ...paperConfig,
                                difficultyRatio: { ...paperConfig.difficultyRatio, [level.key]: Number(e.target.value) }
                              })}
                            />
                            <span className="text-sm text-slate-500">%</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${level.color} transition-all`}
                                style={{ width: `${paperConfig.difficultyRatio[level.key as keyof typeof paperConfig.difficultyRatio]}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 能力维度比例 */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-3 block">能力维度比例</label>
                      <div className="space-y-3">
                        {abilityDimensions.map((dim) => (
                          <div key={dim.id} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded ${dim.color} flex items-center justify-center`}>
                              <dim.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="w-20 text-sm text-slate-600">{dim.name}</span>
                            <Input
                              type="number"
                              className="w-20"
                              value={paperConfig.abilityRatio[dim.id as keyof typeof paperConfig.abilityRatio]}
                              onChange={(e) => setPaperConfig({
                                ...paperConfig,
                                abilityRatio: { ...paperConfig.abilityRatio, [dim.id]: Number(e.target.value) }
                              })}
                            />
                            <span className="text-sm text-slate-500">%</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${dim.color} transition-all`}
                                style={{ width: `${paperConfig.abilityRatio[dim.id as keyof typeof paperConfig.abilityRatio]}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleGeneratePaper}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          正在智能组卷...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          开始智能组卷
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* 生成结果 */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      试卷预览
                    </CardTitle>
                    <CardDescription>
                      {generatedPaper ? generatedPaper.name : '配置完成后点击"开始智能组卷"'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedPaper ? (
                      <div className="space-y-4">
                        {/* 试卷信息 */}
                        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                          <div>
                            <p className="text-sm text-slate-500">总分</p>
                            <p className="text-2xl font-bold text-blue-600">{generatedPaper.totalScore}分</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">考试时长</p>
                            <p className="text-2xl font-bold text-blue-600">{generatedPaper.duration}分钟</p>
                          </div>
                        </div>

                        {/* 能力分布 */}
                        <div>
                          <h4 className="font-medium text-slate-700 mb-3">能力维度分布</h4>
                          <div className="space-y-2">
                            {generatedPaper.abilityDistribution.map((item: any) => {
                              const dim = abilityDimensions.find(d => d.id === item.ability)!;
                              return (
                                <div key={item.ability} className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded ${dim.color} flex items-center justify-center`}>
                                    <dim.icon className="h-3 w-3 text-white" />
                                  </div>
                                  <span className="flex-1 text-sm text-slate-600">{dim.name}</span>
                                  <span className="text-sm font-medium">{item.score}分 / {item.count}题</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex gap-3 pt-4">
                          <Button variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            预览试卷
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Edit className="h-4 w-4 mr-2" />
                            编辑调整
                          </Button>
                          <Button className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            创建考试
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-80 flex flex-col items-center justify-center text-slate-400">
                        <Layers className="h-16 w-16 mb-4" />
                        <p>设置组卷参数后点击"开始智能组卷"</p>
                        <p className="text-sm mt-2">系统将根据配置自动选择题目</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 考试安排 */}
            <TabsContent value="exams" className="space-y-4">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>考试列表</CardTitle>
                      <CardDescription>管理所有考试安排</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      创建考试
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockExams.map((exam) => {
                      const statusConfig = {
                        scheduled: { label: '待开始', color: 'bg-blue-100 text-blue-700', icon: Clock },
                        ongoing: { label: '进行中', color: 'bg-green-100 text-green-700', icon: Zap },
                        completed: { label: '已结束', color: 'bg-slate-100 text-slate-600', icon: CheckCircle },
                      };
                      const status = statusConfig[exam.status as keyof typeof statusConfig];
                      const StatusIcon = status.icon;

                      return (
                        <div key={exam.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-slate-800">{exam.name}</h4>
                                <Badge className={status.color}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {status.label}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {exam.className}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {exam.scheduledTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Timer className="h-4 w-4" />
                                  {exam.duration}分钟
                                </span>
                                <span>总分 {exam.totalScore}分</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-slate-800">
                                  {exam.submittedCount}/{exam.participantCount}
                                </p>
                                <p className="text-xs text-slate-500">已交卷</p>
                              </div>
                              {exam.avgScore !== null && (
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-blue-600">{exam.avgScore}</p>
                                  <p className="text-xs text-slate-500">平均分</p>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {exam.status === 'ongoing' && (
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">交卷进度</span>
                                <span className="font-medium text-slate-700">
                                  {Math.round((exam.submittedCount / exam.participantCount) * 100)}%
                                </span>
                              </div>
                              <Progress
                                value={(exam.submittedCount / exam.participantCount) * 100}
                                className="h-2 mt-2"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 成绩管理 */}
            <TabsContent value="scores" className="space-y-4">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>成绩统计</CardTitle>
                  <CardDescription>查看和分析学生考试成绩</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <p className="text-sm text-blue-600 mb-1">考试总场次</p>
                      <p className="text-3xl font-bold text-blue-700">12</p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                      <p className="text-sm text-green-600 mb-1">平均分</p>
                      <p className="text-3xl font-bold text-green-700">76.5</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-sm text-amber-600 mb-1">及格率</p>
                      <p className="text-3xl font-bold text-amber-700">85%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                      <p className="text-sm text-purple-600 mb-1">优秀率</p>
                      <p className="text-3xl font-bold text-purple-700">32%</p>
                    </div>
                  </div>
                  
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>选择考试查看详细成绩分析</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* 添加题目弹窗 */}
      <Dialog open={showAddQuestion} onOpenChange={setShowAddQuestion}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加新题目</DialogTitle>
            <DialogDescription>创建新的考试题目并添加到题库</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">题目类型</label>
                <Select value={newQuestion.type} onValueChange={(v) => setNewQuestion({ ...newQuestion, type: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {questionTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">能力维度</label>
                <Select value={newQuestion.ability} onValueChange={(v) => setNewQuestion({ ...newQuestion, ability: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {abilityDimensions.map((dim) => (
                      <SelectItem key={dim.id} value={dim.id}>{dim.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">题目内容</label>
              <Textarea
                placeholder="请输入题目内容..."
                className="min-h-24"
                value={newQuestion.content}
                onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
              />
            </div>
            {(newQuestion.type === 'single' || newQuestion.type === 'multiple') && (
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">选项</label>
                <div className="space-y-2">
                  {['A', 'B', 'C', 'D'].map((label, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-8 text-sm font-medium text-slate-500">{label}</span>
                      <Input
                        placeholder={`选项 ${label}`}
                        value={newQuestion.options[i]}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[i] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">难度等级</label>
              <Select value={newQuestion.difficulty} onValueChange={(v) => setNewQuestion({ ...newQuestion, difficulty: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddQuestion(false)}>取消</Button>
              <Button onClick={() => setShowAddQuestion(false)}>保存题目</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
