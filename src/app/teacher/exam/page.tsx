'use client';

import { useState, useRef, useEffect } from 'react';
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
  Database,
  FileUp,
  Sparkles,
  Play,
  Pause,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
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

// 模拟题库数据
const mockQuestions = [
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
    id: 'Q004',
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
    id: 'Q005',
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
    id: 'Q006',
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
];

// 模拟导入文件数据
interface ImportedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadTime: string;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  questionCount: number;
  analyzedCount: number;
}

// 模拟已分析题目数据
interface AnalyzedQuestion {
  id: string;
  originalContent: string;
  type: 'single' | 'multiple' | 'judgment' | 'case' | 'short';
  ability: string;
  difficulty: string;
  options: string[];
  correctAnswer: number | number[] | string;
  analysisStatus: 'pending' | 'analyzing' | 'completed';
  fileId: string;
}

export default function TeacherExamPage() {
  const [activeMenu, setActiveMenu] = useState('exam');
  const [activeTab, setActiveTab] = useState('questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAbility, setSelectedAbility] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // 智能组卷状态
  const [paperConfig, setPaperConfig] = useState({
    totalScore: 100,
    duration: 90,
    difficultyRatio: { easy: 30, medium: 50, hard: 20 },
    abilityRatio: { decision: 30, ai: 20, analysis: 25, risk: 15, compliance: 10 },
    questionTypeRatio: { single: 40, multiple: 20, judgment: 15, case: 15, short: 10 },
  });
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

  // 本地题库管理弹窗
  const [showLocalDatabase, setShowLocalDatabase] = useState(false);
  const [localDatabaseTab, setLocalDatabaseTab] = useState<'files' | 'analysis' | 'questions'>('files');
  const [importedFiles, setImportedFiles] = useState<ImportedFile[]>([
    {
      id: 'F001',
      name: '电商运营题库_2024Q1.xlsx',
      size: 256000,
      type: 'xlsx',
      uploadTime: '2024-02-18 14:30',
      status: 'completed',
      questionCount: 150,
      analyzedCount: 150,
    },
    {
      id: 'F002',
      name: '风险应对案例分析.docx',
      size: 128000,
      type: 'docx',
      uploadTime: '2024-02-19 10:15',
      status: 'analyzing',
      questionCount: 45,
      analyzedCount: 28,
    },
    {
      id: 'F003',
      name: '跨境电商合规测试题.pdf',
      size: 512000,
      type: 'pdf',
      uploadTime: '2024-02-20 09:00',
      status: 'pending',
      questionCount: 80,
      analyzedCount: 0,
    },
  ]);

  // 已分析题目列表
  const [analyzedQuestions, setAnalyzedQuestions] = useState<AnalyzedQuestion[]>([
    {
      id: 'AQ001',
      originalContent: '在选择跨境电商目标市场时，以下哪个因素应该优先考虑？',
      type: 'single',
      ability: 'decision',
      difficulty: 'medium',
      options: ['市场规模', '竞争程度', '物流成本', '消费者购买力'],
      correctAnswer: 0,
      analysisStatus: 'completed',
      fileId: 'F001',
    },
    {
      id: 'AQ002',
      originalContent: 'AI生成的内容可以直接使用，无需审核。',
      type: 'judgment',
      ability: 'ai',
      difficulty: 'easy',
      options: ['正确', '错误'],
      correctAnswer: 1,
      analysisStatus: 'completed',
      fileId: 'F001',
    },
    {
      id: 'AQ003',
      originalContent: '某店铺收到客户投诉，请分析处理方案。',
      type: 'case',
      ability: 'risk',
      difficulty: 'hard',
      options: [],
      correctAnswer: '需要人工评分',
      analysisStatus: 'analyzing',
      fileId: 'F002',
    },
    {
      id: 'AQ004',
      originalContent: '数据分析需要关注哪些核心指标？',
      type: 'multiple',
      ability: 'analysis',
      difficulty: 'medium',
      options: ['转化率', '客单价', '复购率', '退货率'],
      correctAnswer: [0, 1, 2, 3],
      analysisStatus: 'pending',
      fileId: 'F003',
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 弹窗打开时锁定主页面滚动
  useEffect(() => {
    if (showLocalDatabase) {
      // 保存当前滚动位置
      const scrollY = window.scrollY;
      // 锁定滚动
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // 保持滚动条可见
      
      return () => {
        // 恢复滚动
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showLocalDatabase]);

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

  // 处理文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles: ImportedFile[] = Array.from(files).map((file, index) => ({
        id: `F${String(Date.now() + index).slice(-6)}`,
        name: file.name,
        size: file.size,
        type: file.name.split('.').pop() || 'unknown',
        uploadTime: new Date().toLocaleString('zh-CN'),
        status: 'pending' as const,
        questionCount: 0,
        analyzedCount: 0,
      }));
      setImportedFiles([...importedFiles, ...newFiles]);
    }
  };

  // 开始AI分析
  const startAnalysis = (fileId: string) => {
    setImportedFiles(importedFiles.map(f => 
      f.id === fileId ? { ...f, status: 'analyzing' as const } : f
    ));
    
    // 模拟分析进度
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setImportedFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          const newCount = Math.min(Math.floor(progress / 10 * 15), 150);
          
          // 分析完成时，生成模拟题目并添加到本地题库
          if (progress >= 100) {
            clearInterval(interval);
            
            // 生成模拟题目
            const sampleQuestions: AnalyzedQuestion[] = [
              {
                id: `AQ${Date.now()}_1`,
                originalContent: '在进行跨境电商选品时，应该优先考虑哪些因素？',
                type: 'multiple',
                ability: 'decision',
                difficulty: 'medium',
                options: ['市场需求', '竞争程度', '利润空间', '供应链稳定性'],
                correctAnswer: [0, 1, 2, 3],
                analysisStatus: 'completed',
                fileId: fileId,
              },
              {
                id: `AQ${Date.now()}_2`,
                originalContent: 'AI生成的营销文案可以直接发布使用。',
                type: 'judgment',
                ability: 'ai',
                difficulty: 'easy',
                options: ['正确', '错误'],
                correctAnswer: 1,
                analysisStatus: 'completed',
                fileId: fileId,
              },
              {
                id: `AQ${Date.now()}_3`,
                originalContent: '某店铺日销售额突然下降50%，请分析可能的原因并提出解决方案。',
                type: 'case',
                ability: 'analysis',
                difficulty: 'hard',
                options: [],
                correctAnswer: '需要人工评分',
                analysisStatus: 'completed',
                fileId: fileId,
              },
            ];
            
            // 添加到本地题库
            setAnalyzedQuestions(prev => [...prev, ...sampleQuestions]);
            
            return { ...f, status: 'completed' as const, analyzedCount: newCount, questionCount: newCount };
          }
          return { ...f, analyzedCount: newCount, questionCount: newCount };
        }
        return f;
      }));
    }, 500);
  };

  // 批量分析所有待处理文件
  const analyzeAllFiles = () => {
    importedFiles.filter(f => f.status === 'pending').forEach(f => startAnalysis(f.id));
  };

  // 获取文件状态图标
  const getFileStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'analyzing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  // 获取文件状态文本
  const getFileStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="text-green-600">分析完成</span>;
      case 'analyzing':
        return <span className="text-blue-600">分析中...</span>;
      case 'error':
        return <span className="text-red-600">分析失败</span>;
      default:
        return <span className="text-slate-500">待分析</span>;
    }
  };

  // 获取当前筛选的能力维度名称
  const selectedAbilityName = selectedAbility !== 'all' 
    ? abilityDimensions.find(d => d.id === selectedAbility)?.name 
    : null;

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ scrollbarGutter: 'stable' }}>
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6 max-w-full">
          <div className="flex items-center gap-4 flex-shrink-0">
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

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="搜索..." className="w-64 pl-9 h-9" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">李老师</p>
                <p className="text-xs text-slate-500">电商学院</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">李</div>
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
                <Button variant="outline" onClick={() => setShowLocalDatabase(true)}>
                  <Database className="h-4 w-4 mr-2" />
                  本地题库管理
                </Button>
                <Button variant="outline" onClick={() => { setLocalDatabaseTab('files'); setShowLocalDatabase(true); }}>
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

          {/* 五维能力概览 */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {abilityDimensions.map((dim) => {
              const Icon = dim.icon;
              const isSelected = selectedAbility === dim.id;
              return (
                <Card 
                  key={dim.id} 
                  className={`border-0 shadow-md cursor-pointer transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : 'hover:shadow-lg'
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
              <TabsTrigger value="questions"><BookOpen className="h-4 w-4 mr-2" />题库管理</TabsTrigger>
              <TabsTrigger value="generate"><Zap className="h-4 w-4 mr-2" />智能组卷</TabsTrigger>
              <TabsTrigger value="exams"><FileText className="h-4 w-4 mr-2" />考试安排</TabsTrigger>
              <TabsTrigger value="scores"><BarChart3 className="h-4 w-4 mr-2" />成绩管理</TabsTrigger>
            </TabsList>

            {/* 题库管理 */}
            <TabsContent value="questions" className="space-y-4">
              {selectedAbilityName && (
                <Card className="border-0 shadow-sm bg-blue-50 border border-blue-200">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">当前筛选：<strong>{selectedAbilityName}</strong>，共 <strong>{filteredQuestions.length}</strong> 道题目</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600 hover:text-blue-700">
                        <X className="h-4 w-4 mr-1" />清除筛选
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
                      <Input placeholder="搜索题目内容..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <Select value={selectedAbility} onValueChange={setSelectedAbility}>
                      <SelectTrigger className="w-40"><SelectValue placeholder="能力维度" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部维度</SelectItem>
                        {abilityDimensions.map((dim) => (<SelectItem key={dim.id} value={dim.id}>{dim.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-32"><SelectValue placeholder="题目类型" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部类型</SelectItem>
                        {questionTypes.map((type) => (<SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="w-28"><SelectValue placeholder="难度" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部难度</SelectItem>
                        {difficultyLevels.map((level) => (<SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => setShowAddQuestion(true)}><Plus className="h-4 w-4 mr-2" />添加题目</Button>
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
                  </div>
                </CardHeader>
                <CardContent>
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
                                  <Icon className="h-3 w-3 mr-1" />{ability.name}
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
                                        ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-50 text-slate-600'
                                    }`}>
                                      {String.fromCharCode(65 + i)}. {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* 智能组卷 */}
            <TabsContent value="generate" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-purple-500" />组卷配置</CardTitle>
                    <CardDescription>设置试卷结构和题目分布</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">总分</label>
                        <Input type="number" value={paperConfig.totalScore} onChange={(e) => setPaperConfig({ ...paperConfig, totalScore: Number(e.target.value) })} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">考试时长（分钟）</label>
                        <Input type="number" value={paperConfig.duration} onChange={(e) => setPaperConfig({ ...paperConfig, duration: Number(e.target.value) })} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-3 block">难度比例</label>
                      <div className="space-y-3">
                        {[{ key: 'easy', name: '简单', color: 'bg-green-500' }, { key: 'medium', name: '中等', color: 'bg-amber-500' }, { key: 'hard', name: '困难', color: 'bg-red-500' }].map((level) => (
                          <div key={level.key} className="flex items-center gap-3">
                            <span className="w-12 text-sm text-slate-600">{level.name}</span>
                            <Input type="number" className="w-20" value={paperConfig.difficultyRatio[level.key as keyof typeof paperConfig.difficultyRatio]} onChange={(e) => setPaperConfig({ ...paperConfig, difficultyRatio: { ...paperConfig.difficultyRatio, [level.key]: Number(e.target.value) } })} />
                            <span className="text-sm text-slate-500">%</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${level.color} transition-all`} style={{ width: `${paperConfig.difficultyRatio[level.key as keyof typeof paperConfig.difficultyRatio]}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-3 block">能力维度比例</label>
                      <div className="space-y-3">
                        {abilityDimensions.map((dim) => (
                          <div key={dim.id} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded ${dim.color} flex items-center justify-center`}>
                              <dim.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="w-20 text-sm text-slate-600">{dim.name}</span>
                            <Input type="number" className="w-20" value={paperConfig.abilityRatio[dim.id as keyof typeof paperConfig.abilityRatio]} onChange={(e) => setPaperConfig({ ...paperConfig, abilityRatio: { ...paperConfig.abilityRatio, [dim.id]: Number(e.target.value) } })} />
                            <span className="text-sm text-slate-500">%</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${dim.color} transition-all`} style={{ width: `${paperConfig.abilityRatio[dim.id as keyof typeof paperConfig.abilityRatio]}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" size="lg" disabled={isGenerating}>
                      {isGenerating ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" />正在智能组卷...</> : <><Zap className="h-4 w-4 mr-2" />开始智能组卷</>}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-blue-500" />试卷预览</CardTitle>
                    <CardDescription>{generatedPaper ? generatedPaper.name : '配置完成后点击"开始智能组卷"'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedPaper ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                          <div><p className="text-sm text-slate-500">总分</p><p className="text-2xl font-bold text-blue-600">{generatedPaper.totalScore}分</p></div>
                          <div><p className="text-sm text-slate-500">考试时长</p><p className="text-2xl font-bold text-blue-600">{generatedPaper.duration}分钟</p></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-700 mb-3">能力维度分布</h4>
                          <div className="space-y-2">
                            {generatedPaper.abilityDistribution.map((item: any) => {
                              const dim = abilityDimensions.find(d => d.id === item.ability)!;
                              return (
                                <div key={item.ability} className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded ${dim.color} flex items-center justify-center`}><dim.icon className="h-3 w-3 text-white" /></div>
                                  <span className="flex-1 text-sm text-slate-600">{dim.name}</span>
                                  <span className="text-sm font-medium">{item.score}分 / {item.count}题</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button variant="outline" className="flex-1"><Eye className="h-4 w-4 mr-2" />预览试卷</Button>
                          <Button variant="outline" className="flex-1"><Edit className="h-4 w-4 mr-2" />编辑调整</Button>
                          <Button className="flex-1"><CheckCircle className="h-4 w-4 mr-2" />创建考试</Button>
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
                    <Button><Plus className="h-4 w-4 mr-2" />创建考试</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 'E001', name: '电商运营能力期末考试', className: '电商2201班', status: 'scheduled', scheduledTime: '2024-02-20 09:00', duration: 120, totalScore: 100, participantCount: 50, submittedCount: 0, avgScore: null },
                      { id: 'E002', name: '风险应对能力测试', className: '跨境电商2203班', status: 'ongoing', scheduledTime: '2024-02-18 14:00', duration: 90, totalScore: 100, participantCount: 45, submittedCount: 32, avgScore: null },
                      { id: 'E003', name: 'AI辅助应用能力测试', className: '电商2201班', status: 'completed', scheduledTime: '2024-02-15 10:00', duration: 60, totalScore: 100, participantCount: 50, submittedCount: 50, avgScore: 78.5 },
                    ].map((exam) => {
                      const statusConfig = { scheduled: { label: '待开始', color: 'bg-blue-100 text-blue-700', icon: Clock }, ongoing: { label: '进行中', color: 'bg-green-100 text-green-700', icon: Zap }, completed: { label: '已结束', color: 'bg-slate-100 text-slate-600', icon: CheckCircle } };
                      const status = statusConfig[exam.status as keyof typeof statusConfig];
                      const StatusIcon = status.icon;

                      return (
                        <div key={exam.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-slate-800">{exam.name}</h4>
                                <Badge className={status.color}><StatusIcon className="h-3 w-3 mr-1" />{status.label}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{exam.className}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{exam.scheduledTime}</span>
                                <span className="flex items-center gap-1"><Timer className="h-4 w-4" />{exam.duration}分钟</span>
                                <span>总分 {exam.totalScore}分</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-slate-800">{exam.submittedCount}/{exam.participantCount}</p>
                                <p className="text-xs text-slate-500">已交卷</p>
                              </div>
                              {exam.avgScore !== null && (<div className="text-center"><p className="text-2xl font-bold text-blue-600">{exam.avgScore}</p><p className="text-xs text-slate-500">平均分</p></div>)}
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                                <Button variant="outline" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                              </div>
                            </div>
                          </div>
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
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200"><p className="text-sm text-blue-600 mb-1">考试总场次</p><p className="text-3xl font-bold text-blue-700">12</p></div>
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200"><p className="text-sm text-green-600 mb-1">平均分</p><p className="text-3xl font-bold text-green-700">76.5</p></div>
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200"><p className="text-sm text-amber-600 mb-1">及格率</p><p className="text-3xl font-bold text-amber-700">85%</p></div>
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200"><p className="text-sm text-purple-600 mb-1">优秀率</p><p className="text-3xl font-bold text-purple-700">32%</p></div>
                  </div>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                    <div className="text-center"><BarChart3 className="h-12 w-12 mx-auto mb-2" /><p>选择考试查看详细成绩分析</p></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* 本地题库管理全屏弹窗 */}
      {showLocalDatabase && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          <div className="w-[95vw] h-[95vh] max-w-[95vw] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* 弹窗头部 */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">本地题库管理</h2>
                  <p className="text-sm text-slate-500">管理导入的题库文件，使用AI智能分析转化题目</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setShowLocalDatabase(false)}
                className="h-10 w-10 rounded-full hover:bg-red-100 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* 弹窗内容 */}
            <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto p-6">
              <Tabs value={localDatabaseTab} onValueChange={(v) => setLocalDatabaseTab(v as 'files' | 'analysis' | 'questions')} className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                  <TabsList className="bg-slate-100 h-12 px-1">
                    <TabsTrigger value="files" className="gap-2 px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <FileUp className="h-4 w-4" />导入文件
                    </TabsTrigger>
                    <TabsTrigger value="analysis" className="gap-2 px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Sparkles className="h-4 w-4" />智能分析转化
                    </TabsTrigger>
                    <TabsTrigger value="questions" className="gap-2 px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <BookOpen className="h-4 w-4" />所有题目
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex gap-3 flex-shrink-0">
                    {localDatabaseTab === 'files' && (
                      <>
                        <input type="file" ref={fileInputRef} className="hidden" accept=".xlsx,.xls,.docx,.doc,.pdf,.txt" multiple onChange={handleFileUpload} />
                        <Button size="lg" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="h-4 w-4 mr-2" />上传文件
                        </Button>
                      </>
                    )}
                    {localDatabaseTab === 'analysis' && (
                      <Button size="lg" onClick={analyzeAllFiles} disabled={!importedFiles.some(f => f.status === 'pending')}>
                        <Play className="h-4 w-4 mr-2" />分析所有待处理
                      </Button>
                    )}
                    {localDatabaseTab === 'questions' && (
                      <Button variant="outline" size="lg">
                        <Download className="h-4 w-4 mr-2" />导出全部
                      </Button>
                    )}
                  </div>
                </div>

                {/* 导入文件 */}
                <TabsContent value="files" className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto mt-0">
                  <div className="space-y-4 pr-2">
                  {/* 上传提示区域 */}
                  <div 
                    className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input type="file" ref={fileInputRef} className="hidden" accept=".xlsx,.xls,.docx,.doc,.pdf,.txt" multiple onChange={handleFileUpload} />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-slate-700">点击或拖拽文件到此处上传</p>
                        <p className="text-sm text-slate-500 mt-1">支持 Excel、Word、PDF、TXT 格式，可一次上传多个文件</p>
                      </div>
                      <Button className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />选择文件
                      </Button>
                    </div>
                  </div>

                  {/* 文件列表 */}
                  {importedFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-slate-700">已上传文件 ({importedFiles.length})</h3>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={analyzeAllFiles}
                            disabled={!importedFiles.some(f => f.status === 'pending')}
                          >
                            <Play className="h-4 w-4 mr-1" />分析全部
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setImportedFiles([])}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />清空列表
                          </Button>
                        </div>
                      </div>
                      {importedFiles.map((file) => (
                        <div key={file.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-white">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                file.type === 'xlsx' || file.type === 'xls' ? 'bg-green-100' :
                                file.type === 'docx' || file.type === 'doc' ? 'bg-blue-100' :
                                file.type === 'pdf' ? 'bg-red-100' : 'bg-slate-100'
                              }`}>
                                <FileSpreadsheet className={`h-6 w-6 ${
                                  file.type === 'xlsx' || file.type === 'xls' ? 'text-green-600' :
                                  file.type === 'docx' || file.type === 'doc' ? 'text-blue-600' :
                                  file.type === 'pdf' ? 'text-red-600' : 'text-slate-600'
                                }`} />
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{file.name}</p>
                                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                  <span>{formatFileSize(file.size)}</span>
                                  <span>•</span>
                                  <span>{file.uploadTime}</span>
                                  {file.questionCount > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-blue-600 font-medium">{file.questionCount} 道题目</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {getFileStatusIcon(file.status)}
                              <div className="text-right">
                                {getFileStatusText(file.status)}
                                {file.status === 'analyzing' && (
                                  <div className="w-32 mt-1">
                                    <Progress value={(file.analyzedCount / file.questionCount) * 100 || 0} className="h-1.5" />
                                  </div>
                                )}
                              </div>
                              {file.status === 'pending' && (
                                <Button size="sm" onClick={() => startAnalysis(file.id)}>
                                  <Play className="h-4 w-4 mr-1" />开始分析
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => setImportedFiles(importedFiles.filter(f => f.id !== file.id))}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 智能分析转化 */}
              <TabsContent value="analysis" className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto mt-0">
                <div className="pr-2 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-slate-800">{importedFiles.length}</p>
                        <p className="text-sm text-slate-500">导入文件</p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-blue-600">{importedFiles.filter(f => f.status === 'completed').reduce((sum, f) => sum + f.analyzedCount, 0)}</p>
                        <p className="text-sm text-slate-500">已分析题目</p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-amber-600">{importedFiles.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.questionCount, 0)}</p>
                        <p className="text-sm text-slate-500">待分析题目</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">AI智能分析说明</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <p className="font-medium text-slate-700">题目类型识别</p>
                            <p>自动识别单选题、多选题、判断题、案例分析题、简答题</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                          <div>
                            <p className="font-medium text-slate-700">五维能力标签</p>
                            <p>根据题目内容自动匹配：自主决策能力、AI辅助应用、数据复盘与优化、风险应对、合规与规则意识</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                          <div>
                            <p className="font-medium text-slate-700">难度评估</p>
                            <p>基于题目复杂度和知识点，自动评估为简单、中等、困难三个等级</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                          <div>
                            <p className="font-medium text-slate-700">自动归类</p>
                            <p>分析完成的题目将自动归类到首页五维能力题库中</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <h3 className="font-medium text-slate-800 mb-3">分析队列</h3>
                    <div className="space-y-2">
                      {analyzedQuestions.map((q) => {
                        const ability = abilityDimensions.find(a => a.id === q.ability)!;
                        const AbilityIcon = ability.icon;
                        
                        return (
                          <div key={q.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {q.analysisStatus === 'completed' ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : q.analysisStatus === 'analyzing' ? (
                                <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                              ) : (
                                <Clock className="h-5 w-5 text-slate-400" />
                              )}
                              <div>
                                <p className="text-sm text-slate-700 line-clamp-1">{q.originalContent}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{questionTypes.find(t => t.id === q.type)?.name}</Badge>
                                  <Badge className={`text-xs ${ability.bgColor} ${ability.textColor}`}>
                                    <AbilityIcon className="h-3 w-3 mr-1" />{ability.name}
                                  </Badge>
                                  <Badge className={`text-xs ${difficultyLevels.find(d => d.id === q.difficulty)?.color}`}>
                                    {difficultyLevels.find(d => d.id === q.difficulty)?.name}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              {q.analysisStatus === 'completed' && (
                                <Badge className="bg-green-100 text-green-700">已完成</Badge>
                              )}
                              {q.analysisStatus === 'analyzing' && (
                                <Badge className="bg-blue-100 text-blue-700">分析中</Badge>
                              )}
                              {q.analysisStatus === 'pending' && (
                                <Badge className="bg-slate-100 text-slate-600">待分析</Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 所有题目 */}
              <TabsContent value="questions" className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto mt-0">
                <div className="pr-2">
                  <div className="mb-4 flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-[200px] relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="搜索题目..." className="pl-10" />
                    </div>
                    <Select value={selectedAbility} onValueChange={setSelectedAbility}>
                      <SelectTrigger className="w-36"><SelectValue placeholder="能力维度" /></SelectTrigger>
                      <SelectContent position="popper" className="z-[200]">
                        <SelectItem value="all">全部维度</SelectItem>
                        {abilityDimensions.map((dim) => (<SelectItem key={dim.id} value={dim.id}>{dim.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-28"><SelectValue placeholder="题型" /></SelectTrigger>
                      <SelectContent position="popper" className="z-[200]">
                        <SelectItem value="all">全部类型</SelectItem>
                        {questionTypes.map((type) => (<SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline"><Download className="h-4 w-4 mr-2" />导出</Button>
                  </div>

                {/* 筛选结果提示 */}
                {(selectedAbility !== 'all' || selectedType !== 'all') && (
                  <div className="flex items-center justify-between px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-sm text-blue-700">
                      当前筛选：{selectedAbility !== 'all' && <strong>{abilityDimensions.find(d => d.id === selectedAbility)?.name}</strong>}
                      {selectedAbility !== 'all' && selectedType !== 'all' && ' · '}
                      {selectedType !== 'all' && <strong>{questionTypes.find(t => t.id === selectedType)?.name}</strong>}
                      {' · 共 '}<strong>{analyzedQuestions.filter(q => q.analysisStatus === 'completed').filter(q => selectedAbility === 'all' || q.ability === selectedAbility).filter(q => selectedType === 'all' || q.type === selectedType).length}</strong> 道题目
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => { setSelectedAbility('all'); setSelectedType('all'); }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <X className="h-4 w-4 mr-1" />清除筛选
                    </Button>
                  </div>
                )}

                <div className="space-y-3">
                  {analyzedQuestions
                    .filter(q => q.analysisStatus === 'completed')
                    .filter(q => selectedAbility === 'all' || q.ability === selectedAbility)
                    .filter(q => selectedType === 'all' || q.type === selectedType)
                    .map((question) => {
                      const ability = abilityDimensions.find(a => a.id === question.ability)!;
                      const AbilityIcon = ability.icon;
                      const type = questionTypes.find(t => t.id === question.type)!;
                      const difficulty = difficultyLevels.find(d => d.id === question.difficulty)!;

                      return (
                      <div key={question.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`${ability.bgColor} ${ability.textColor}`}>
                                <AbilityIcon className="h-3 w-3 mr-1" />{ability.name}
                              </Badge>
                              <Badge variant="outline">{type.name}</Badge>
                              <Badge className={difficulty.color}>{difficulty.name}</Badge>
                            </div>
                            <p className="text-slate-800">{question.originalContent}</p>
                            {question.options.length > 0 && (
                              <div className="mt-2 grid grid-cols-2 gap-2">
                                {question.options.map((opt, i) => (
                                  <div key={i} className={`text-sm p-2 rounded ${
                                    question.correctAnswer === i || (Array.isArray(question.correctAnswer) && question.correctAnswer.includes(i))
                                      ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-50 text-slate-600'
                                  }`}>
                                    {String.fromCharCode(65 + i)}. {opt}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>来源: {importedFiles.find(f => f.id === question.fileId)?.name || '未知'}</span>
                          <span>•</span>
                          <Badge className="bg-green-100 text-green-700">已入库</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      )}

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
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {questionTypes.map((type) => (<SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">能力维度</label>
                <Select value={newQuestion.ability} onValueChange={(v) => setNewQuestion({ ...newQuestion, ability: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {abilityDimensions.map((dim) => (<SelectItem key={dim.id} value={dim.id}>{dim.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">题目内容</label>
              <Textarea placeholder="请输入题目内容..." className="min-h-24" value={newQuestion.content} onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">难度等级</label>
              <Select value={newQuestion.difficulty} onValueChange={(v) => setNewQuestion({ ...newQuestion, difficulty: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (<SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>))}
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
