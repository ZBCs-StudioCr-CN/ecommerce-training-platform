'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  Globe,
  LogOut,
  BarChart3,
  TrendingUp,
  Target,
  Users,
  AlertTriangle,
  Sparkles,
  Download,
  RefreshCw,
  ChevronRight,
  Brain,
  Zap,
  Eye,
  FileText,
  PieChart,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { teacherMenuItems } from '@/config/menu';

// 五维能力评估体系（方案二：考试评估维度，实训评估具体能力）
const fiveDimensions: Array<{
  id: string;
  name: string;
  icon: typeof Target;
  weight: number;
  color: string;
  description: string;
  examScore: number;
  score?: number;
  practiceScore?: number;
  subAbilities: Array<{
    name: string;
    score: number;
    description: string;
    scoreSource: {
      exam?: { name: string; score: number; weight: number; detail?: string };
      practice?: { name: string; score: number; weight: number; detail?: string };
      system?: { name: string; score: number; weight: number; detail: string };
    };
  }>;
}> = [
  { 
    id: 'decision',
    name: '自主决策能力', 
    icon: Target,
    weight: 35,
    color: 'blue',
    description: '关键商业决策、选品定价、渠道选择、物流供应链、营销活动等',
    examScore: 82,
    subAbilities: [
      { 
        name: '市场分析决策', 
        score: 85, 
        description: '市场趋势判断、竞争分析',
        scoreSource: {
          practice: { name: '市场调研报告', score: 85, weight: 100, detail: '完成市场调研报告撰写，AI评分+教师评分' }
        }
      },
      { 
        name: '选品决策', 
        score: 78, 
        description: '产品选择、利润空间评估',
        scoreSource: {
          practice: { name: '选品方案制定', score: 78, weight: 100, detail: '完成选品方案，AI评估利润率和可行性' }
        }
      },
      { 
        name: '定价策略', 
        score: 76, 
        description: '价格制定、促销策略',
        scoreSource: {
          practice: { name: '定价方案设计', score: 76, weight: 100, detail: '制定定价方案，模拟销售数据验证效果' }
        }
      },
      { 
        name: '渠道选择', 
        score: 80, 
        description: '销售渠道布局、资源配置',
        scoreSource: {
          practice: { name: '渠道布局实训', score: 80, weight: 100, detail: '完成渠道选择决策，资源配置合理性评估' }
        }
      },
      { 
        name: '物流供应链管理', 
        score: 72, 
        description: '物流选择、供应链优化、成本控制',
        scoreSource: {
          practice: { name: '物流配置实训', score: 72, weight: 100, detail: '完成物流商选择和成本优化方案' }
        }
      },
      { 
        name: '营销与活动决策', 
        score: 75, 
        description: '营销策略制定、活动策划执行',
        scoreSource: {
          practice: { name: '营销活动策划', score: 75, weight: 100, detail: '完成营销活动策划案，评估执行可行性' }
        }
      },
    ]
  },
  { 
    id: 'ai',
    name: 'AI辅助应用', 
    icon: Brain,
    weight: 20,
    color: 'purple',
    description: 'AI工具使用策略、内容审核、效率优化、视觉设计、文案创作等',
    examScore: 75,
    subAbilities: [
      { 
        name: 'AI工具选择', 
        score: 78, 
        description: 'AI工具识别与选择',
        scoreSource: {
          exam: { name: 'AI工具知识测试', score: 78, weight: 100, detail: 'AI工具识别与适用场景选择题' }
        }
      },
      { 
        name: '内容审核能力', 
        score: 70, 
        description: 'AI生成内容审核与优化',
        scoreSource: {
          practice: { name: 'AI内容审核实训', score: 70, weight: 100, detail: '对AI生成内容进行审核和优化实操' }
        }
      },
      { 
        name: '效率优化', 
        score: 74, 
        description: 'AI辅助提升工作效率',
        scoreSource: {
          practice: { name: '效率优化实训', score: 74, weight: 100, detail: '使用AI工具提升工作效率的实操任务' }
        }
      },
      { 
        name: 'AI耦合度控制', 
        score: 68, 
        description: '避免过度依赖AI',
        scoreSource: {
          system: { name: 'AI使用行为分析', score: 68, weight: 100, detail: '基于AI使用频率、复制粘贴比例、原创度等指标系统自动计算' }
        }
      },
      { 
        name: 'AI视觉策划设计', 
        score: 72, 
        description: 'AI辅助图片设计、视频制作、视觉优化',
        scoreSource: {
          practice: { name: '视觉设计实训', score: 72, weight: 100, detail: '使用AI工具完成视觉设计任务' }
        }
      },
      { 
        name: 'AI文案创意撰写', 
        score: 74, 
        description: 'AI辅助文案创作、内容优化、创意生成',
        scoreSource: {
          practice: { name: '文案撰写实训', score: 74, weight: 100, detail: '使用AI辅助完成文案创作任务' }
        }
      },
    ]
  },
  { 
    id: 'analysis',
    name: '数据复盘与优化', 
    icon: TrendingUp,
    weight: 20,
    color: 'green',
    description: '数据分析、问题诊断、优化策略等',
    examScore: 85,
    subAbilities: [
      { 
        name: '数据采集', 
        score: 86, 
        description: '关键数据识别与收集',
        scoreSource: {
          practice: { name: '数据采集实训', score: 86, weight: 100, detail: '完成数据报表制作，指标提取准确性评估' }
        }
      },
      { 
        name: '数据分析', 
        score: 82, 
        description: '数据趋势分析与洞察',
        scoreSource: {
          practice: { name: '数据分析报告', score: 82, weight: 100, detail: '完成数据解读和趋势分析报告' }
        }
      },
      { 
        name: '问题诊断', 
        score: 78, 
        description: '问题定位与根因分析',
        scoreSource: {
          practice: { name: '问题诊断实训', score: 78, weight: 100, detail: '基于数据定位问题并提出解决方案' }
        }
      },
      { 
        name: '优化迭代', 
        score: 80, 
        description: '基于数据的优化策略',
        scoreSource: {
          practice: { name: '优化方案设计', score: 80, weight: 100, detail: '制定数据驱动的优化策略并验证' }
        }
      },
    ]
  },
  { 
    id: 'risk',
    name: '风险应对', 
    icon: AlertTriangle,
    weight: 15,
    color: 'amber',
    description: '危机识别、应对方案、客户投诉处理等',
    examScore: 78,
    subAbilities: [
      { 
        name: '风险识别', 
        score: 82, 
        description: '潜在风险预判',
        scoreSource: {
          exam: { name: '风险识别测试', score: 82, weight: 100, detail: '风险场景识别选择题和判断题' }
        }
      },
      { 
        name: '应对方案制定', 
        score: 72, 
        description: '危机处理方案设计',
        scoreSource: {
          practice: { name: '风险应对实训', score: 72, weight: 100, detail: '风险应对实训AI五维评分（响应速度、方案合理性、沟通技巧、合规意识、风险控制）' }
        }
      },
      { 
        name: '客户投诉处理', 
        score: 76, 
        description: '投诉响应与解决',
        scoreSource: {
          practice: { name: '投诉处理实训', score: 76, weight: 100, detail: '客户投诉场景模拟和应对方案评估' }
        }
      },
      { 
        name: '舆情管理', 
        score: 74, 
        description: '负面舆情应对',
        scoreSource: {
          practice: { name: '舆情处理实训', score: 74, weight: 100, detail: '负面舆情应对策略制定和执行评估' }
        }
      },
    ]
  },
  { 
    id: 'compliance',
    name: '合规与规则意识', 
    icon: Shield,
    weight: 10,
    color: 'red',
    description: '平台规则、法律法规、知识产权等',
    examScore: 88,
    subAbilities: [
      { 
        name: '平台规则理解', 
        score: 88, 
        description: '电商平台规则掌握',
        scoreSource: {
          exam: { name: '平台规则测试', score: 88, weight: 100, detail: '各平台规则选择题和判断题' }
        }
      },
      { 
        name: '法律法规意识', 
        score: 85, 
        description: '广告法、消费者权益保护',
        scoreSource: {
          exam: { name: '法律法规测试', score: 85, weight: 100, detail: '电商相关法律法规专项测试' }
        }
      },
      { 
        name: '知识产权保护', 
        score: 82, 
        description: '商标、专利、版权',
        scoreSource: {
          exam: { name: '知识产权测试', score: 82, weight: 100, detail: '知识产权保护专项测试' }
        }
      },
      { 
        name: '数据合规', 
        score: 84, 
        description: '用户数据保护与合规',
        scoreSource: {
          exam: { name: '数据合规测试', score: 84, weight: 100, detail: '数据保护和合规操作测试' }
        }
      },
    ]
  },
];

// 计算具体能力得分
const calculateSubAbilityScore = (subAbility: typeof fiveDimensions[0]['subAbilities'][0]) => {
  const source = subAbility.scoreSource;
  if (source.system) {
    return source.system.score;
  }
  if (source.exam) {
    return source.exam.score;
  }
  if (source.practice) {
    return source.practice.score;
  }
  return subAbility.score;
};

// 计算维度综合分（考试50% + 实训50%）
const calculateDimensionScore = (dimension: typeof fiveDimensions[0]) => {
  // 具体能力平均分（实训为主）
  const subAbilityScores = dimension.subAbilities.map(sub => calculateSubAbilityScore(sub));
  const avgSubScore = Math.round(subAbilityScores.reduce((a, b) => a + b, 0) / subAbilityScores.length);
  
  // 维度分 = 考试得分 × 50% + 实训平均分 × 50%
  const dimensionScore = Math.round(dimension.examScore * 0.5 + avgSubScore * 0.5);
  
  return {
    examScore: dimension.examScore,
    practiceScore: avgSubScore,
    finalScore: dimensionScore
  };
};

// 更新五维分数
fiveDimensions.forEach(dim => {
  dim.subAbilities.forEach(sub => {
    sub.score = calculateSubAbilityScore(sub);
  });
  const scores = calculateDimensionScore(dim);
  (dim as any).score = scores.finalScore;
  (dim as any).practiceScore = scores.practiceScore;
});

// AI使用统计数据
const aiUsageStats = {
  totalQueries: 2847,
  avgPerStudent: 22.8,
  topUsers: [
    { name: '张三', queries: 156, lastActive: '10分钟前', couplingDegree: 45 },
    { name: '李四', queries: 142, lastActive: '25分钟前', couplingDegree: 38 },
    { name: '王五', queries: 128, lastActive: '1小时前', couplingDegree: 52 },
    { name: '赵六', queries: 115, lastActive: '2小时前', couplingDegree: 41 },
    { name: '钱七', queries: 98, lastActive: '3小时前', couplingDegree: 35 },
  ],
  moduleUsage: [
    { module: '市场分析', count: 456, percentage: 16 },
    { module: '选品建议', count: 523, percentage: 18 },
    { module: '投放建议', count: 612, percentage: 22 },
    { module: '运营策略', count: 389, percentage: 14 },
    { module: '数据复盘', count: 312, percentage: 11 },
    { module: '危机处理', count: 187, percentage: 7 },
    { module: '其他', count: 368, percentage: 12 },
  ],
};

// 预警学生列表
const alertStudents = [
  { id: 1, name: '王五', class: '电商2201班', type: 'ai_overuse', message: 'AI依赖度过高(52%)，建议关注', severity: 'high' },
  { id: 2, name: '李明', class: '跨境电商2203班', type: 'progress_lag', message: '实训进度落后(完成率35%)', severity: 'medium' },
  { id: 3, name: '张三', class: '电商2201班', type: 'ai_overuse', message: 'AI依赖度较高(45%)', severity: 'medium' },
  { id: 4, name: '刘芳', class: '电商2202班', type: 'risk_fail', message: '风险应对实训未通过(0分)', severity: 'high' },
  { id: 5, name: '陈强', class: '跨境电商2203班', type: 'progress_lag', message: '连续3天未登录实训平台', severity: 'medium' },
];

// 班级表现数据
const classPerformance = [
  { name: '电商2201班', students: 42, avgScore: 85.2, completion: 92, aiUsage: 23.5, abilityScores: [80, 72, 83, 76, 85] },
  { name: '跨境电商2203班', students: 38, avgScore: 82.5, completion: 88, aiUsage: 25.1, abilityScores: [76, 70, 80, 74, 82] },
  { name: '电商2202班', students: 45, avgScore: 79.8, completion: 85, aiUsage: 19.8, abilityScores: [78, 68, 79, 73, 80] },
];

export default function TeacherAnalysisPage() {
  const [activeMenu, setActiveMenu] = useState('analysis');
  const [activeTab, setActiveTab] = useState('overview');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [expandedDimensions, setExpandedDimensions] = useState<string[]>([]);

  // 切换维度展开/收起
  const toggleDimension = (id: string) => {
    setExpandedDimensions(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  // 生成AI分析报告
  const generateAIReport = async () => {
    setIsGeneratingReport(true);
    try {
      const response = await fetch('/api/teacher/ai-analysis-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classPerformance,
          fiveDimensions,
          aiUsageStats,
          alertStudents,
        }),
      });
      const data = await response.json();
      if (data.report) {
        setAiReport(data.report);
      }
    } catch (error) {
      console.error('Report generation error:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // 获取颜色类名
  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border' | 'bgLight') => {
    const colors: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', bgLight: 'bg-blue-50' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200', bgLight: 'bg-purple-50' },
      green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', bgLight: 'bg-green-50' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', bgLight: 'bg-amber-50' },
      red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-200', bgLight: 'bg-red-50' },
    };
    return colors[color]?.[type] || colors.blue[type];
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
            <h2 className="text-2xl font-bold text-slate-800">学情分析</h2>
            <p className="text-slate-500">全面分析学生学习情况和五维能力发展</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={generateAIReport} disabled={isGeneratingReport}>
              {isGeneratingReport ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI生成分析报告
                </>
              )}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 核心指标卡片 */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">125</p>
                  <p className="text-sm text-slate-500">学生总数</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">77.8</p>
                  <p className="text-sm text-slate-500">五维均分</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">88%</p>
                  <p className="text-sm text-slate-500">完成率</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">22.8</p>
                  <p className="text-sm text-slate-500">AI使用/人</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">5</p>
                  <p className="text-sm text-slate-500">预警学生</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <PieChart className="h-4 w-4 mr-2" />
              总体概览
            </TabsTrigger>
            <TabsTrigger value="ai-usage" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Brain className="h-4 w-4 mr-2" />
              AI使用分析
            </TabsTrigger>
            <TabsTrigger value="ability" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              能力评估
            </TabsTrigger>
            <TabsTrigger value="alerts" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              预警中心
            </TabsTrigger>
          </TabsList>

          {/* 总体概览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* 五维能力雷达图 */}
              <Card className="col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>五维能力评估</CardTitle>
                  <CardDescription>基于实训数据的综合能力分析（点击展开查看具体能力得分）</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {fiveDimensions.map((dim) => {
                      const Icon = dim.icon;
                      const isExpanded = expandedDimensions.includes(dim.id);
                      
                      return (
                        <div key={dim.id} className={`rounded-xl border ${getColorClasses(dim.color, 'border')} overflow-hidden`}>
                          {/* 维度主行 */}
                          <div 
                            className={`p-4 ${getColorClasses(dim.color, 'bgLight')} cursor-pointer hover:opacity-80 transition-opacity`}
                            onClick={() => toggleDimension(dim.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${getColorClasses(dim.color, 'bg')} flex items-center justify-center`}>
                                  <Icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-800">{dim.name}</span>
                                    <Badge variant="outline" className="text-xs">权重 {dim.weight}%</Badge>
                                  </div>
                                  <p className="text-xs text-slate-500">{dim.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <span className={`text-2xl font-bold ${getColorClasses(dim.color, 'text')}`}>{dim.score}</span>
                                  <span className="text-sm text-slate-400">/100</span>
                                </div>
                                <Progress value={dim.score} className="w-24 h-2" />
                                {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                              </div>
                            </div>
                          </div>
                          
                          {/* 子能力展开 */}
                          {isExpanded && (
                            <div className="p-4 bg-white">
                              <p className="text-xs text-slate-500 mb-3">具体能力得分（平均分 = 维度总分）</p>
                              <div className="grid grid-cols-2 gap-3">
                                {dim.subAbilities.map((sub, i) => (
                                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium text-slate-700">{sub.name}</span>
                                      <span className={`text-sm font-bold ${
                                        sub.score >= 80 ? 'text-green-600' : 
                                        sub.score >= 60 ? 'text-amber-600' : 'text-red-600'
                                      }`}>{sub.score}</span>
                                    </div>
                                    <Progress value={sub.score} className="h-1.5 mb-1" />
                                    <p className="text-xs text-slate-500">{sub.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>AI建议：</strong>AI辅助应用能力整体较弱(72分)，建议增加AI工具使用策略和内容审核相关教学内容，引导学生合理使用AI而非过度依赖。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 预警概览 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    实时预警
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alertStudents.slice(0, 4).map((student) => (
                      <div key={student.id} className={`p-3 rounded-lg border ${
                        student.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-slate-800">{student.name}</span>
                          <Badge variant={student.severity === 'high' ? 'destructive' : 'default'} className="text-xs">
                            {student.type === 'ai_overuse' ? 'AI依赖' : 
                             student.type === 'progress_lag' ? '进度落后' : '未通过'}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600">{student.message}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" size="sm">
                      查看全部预警
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 班级表现对比 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>班级表现对比</CardTitle>
                <CardDescription>各班级的学习成绩和五维能力对比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  {classPerformance.map((cls) => (
                    <div key={cls.name} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-slate-800">{cls.name}</p>
                          <p className="text-xs text-slate-500">{cls.students}名学生</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{cls.avgScore}</p>
                          <p className="text-xs text-slate-500">平均分</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-500">完成率</span>
                            <span className="font-medium">{cls.completion}%</span>
                          </div>
                          <Progress value={cls.completion} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-500">AI使用/人</span>
                            <span className="font-medium">{cls.aiUsage}</span>
                          </div>
                          <Progress value={cls.aiUsage / 30 * 100} className="h-2" />
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-500 mb-2">五维能力分布</p>
                        <div className="flex gap-1">
                          {cls.abilityScores.map((score, i) => (
                            <div 
                              key={i} 
                              className="flex-1 h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                              style={{
                                backgroundColor: score >= 80 ? '#22c55e' : score >= 70 ? '#3b82f6' : score >= 60 ? '#f59e0b' : '#ef4444'
                              }}
                              title={`${fiveDimensions[i].name}: ${score}`}
                            >
                              {score}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {fiveDimensions.map((dim, i) => (
                            <div key={i} className="flex-1 text-center text-xs text-slate-500 truncate">
                              {dim.name.slice(0, 2)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI使用分析 */}
          <TabsContent value="ai-usage" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* AI使用概览 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    AI使用概览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-purple-600">{aiUsageStats.totalQueries}</p>
                          <p className="text-sm text-purple-600">总查询次数</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-purple-500" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-slate-50 text-center">
                        <p className="text-xl font-bold text-slate-800">{aiUsageStats.avgPerStudent}</p>
                        <p className="text-xs text-slate-500">人均使用</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 text-center">
                        <p className="text-xl font-bold text-slate-800">78%</p>
                        <p className="text-xs text-slate-500">合理使用率</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 模块使用分布 */}
              <Card className="col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>AI模块使用分布</CardTitle>
                  <CardDescription>各功能模块的使用情况统计</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiUsageStats.moduleUsage.map((item) => (
                      <div key={item.module} className="flex items-center gap-4">
                        <div className="w-24 text-sm text-slate-700">{item.module}</div>
                        <Progress value={item.percentage} className="flex-1 h-3" />
                        <div className="w-20 text-right">
                          <span className="text-sm font-medium text-slate-800">{item.count}</span>
                          <span className="text-xs text-slate-500 ml-1">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI依赖度分析 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>学生AI依赖度排名</CardTitle>
                    <CardDescription>检测AI耦合度，防止过度依赖</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">高风险: &gt;50%</Badge>
                    <Badge variant="default">中等: 30-50%</Badge>
                    <Badge variant="secondary">正常: &lt;30%</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {aiUsageStats.topUsers.map((user, i) => (
                    <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${
                      user.couplingDegree > 50 ? 'bg-red-50 border border-red-200' : 
                      user.couplingDegree > 30 ? 'bg-amber-50 border border-amber-200' : 
                      'bg-slate-50 border border-slate-200'
                    }`}>
                      <div className="w-8 text-center font-bold text-slate-500">{i + 1}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-800">{user.name}</span>
                          <span className="text-xs text-slate-500">最后使用: {user.lastActive}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-500">查询{user.queries}次</span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">AI耦合度</span>
                          <Progress value={user.couplingDegree} className="w-20 h-2" />
                          <span className={`text-sm font-bold ${
                            user.couplingDegree > 50 ? 'text-red-600' : 
                            user.couplingDegree > 30 ? 'text-amber-600' : 'text-green-600'
                          }`}>
                            {user.couplingDegree}%
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 能力评估 */}
          <TabsContent value="ability" className="space-y-6">
            {/* 五维能力总览 */}
            <div className="grid grid-cols-5 gap-4">
              {fiveDimensions.map((dim) => {
                const Icon = dim.icon;
                return (
                  <Card key={dim.id} className={`border-0 shadow-lg ${getColorClasses(dim.color, 'bgLight')} ${getColorClasses(dim.color, 'border')} border`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${getColorClasses(dim.color, 'bg')} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{dim.name}</p>
                          <p className="text-xs text-slate-500">权重 {dim.weight}%</p>
                        </div>
                      </div>
                      <div className="text-center mb-3">
                        <span className={`text-4xl font-bold ${getColorClasses(dim.color, 'text')}`}>{dim.score}</span>
                        <span className="text-lg text-slate-400">/100</span>
                      </div>
                      <Progress value={dim.score} className="h-2 mb-3" />
                      
                      {/* 考试vs实训得分 */}
                      <div className="grid grid-cols-2 gap-2 mb-3 p-2 rounded-lg bg-white/50">
                        <div className="text-center">
                          <p className="text-xs text-slate-500">考试</p>
                          <p className="text-lg font-bold text-blue-600">{dim.examScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500">实训</p>
                          <p className="text-lg font-bold text-green-600">{(dim as any).practiceScore || '-'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {dim.subAbilities.slice(0, 3).map((sub, i) => (
                          <div key={i} className="flex items-center justify-between text-xs group cursor-help" title="点击下方各维度具体能力分析查看得分来源">
                            <span className="text-slate-600 group-hover:text-slate-800">{sub.name}</span>
                            <span className={`font-medium ${
                              sub.score >= 80 ? 'text-green-600' : 
                              sub.score >= 60 ? 'text-amber-600' : 'text-red-600'
                            }`}>{sub.score}</span>
                          </div>
                        ))}
                        {dim.subAbilities.length > 3 && (
                          <p className="text-xs text-slate-400 text-center">+{dim.subAbilities.length - 3} 项能力</p>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">
                        点击下方「各维度具体能力分析」查看详情
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 详细能力分析 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>各维度具体能力分析</CardTitle>
                <CardDescription>点击展开查看每个维度下的具体能力得分详情</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fiveDimensions.map((dim) => {
                    const Icon = dim.icon;
                    const isExpanded = expandedDimensions.includes(dim.id);
                    const avgScore = Math.round(dim.subAbilities.reduce((sum, sub) => sum + sub.score, 0) / dim.subAbilities.length);
                    
                    return (
                      <div key={dim.id} className={`rounded-xl border ${getColorClasses(dim.color, 'border')} overflow-hidden`}>
                        <div 
                          className={`p-4 ${getColorClasses(dim.color, 'bgLight')} cursor-pointer hover:opacity-80 transition-opacity`}
                          onClick={() => toggleDimension(dim.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-lg ${getColorClasses(dim.color, 'bg')} flex items-center justify-center`}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800">{dim.name}</p>
                                <p className="text-sm text-slate-500">{dim.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="text-xs text-slate-500">维度总分</p>
                                <p className={`text-2xl font-bold ${getColorClasses(dim.color, 'text')}`}>{avgScore}</p>
                              </div>
                              <div className="w-32">
                                <Progress value={avgScore} className="h-2" />
                              </div>
                              {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                            </div>
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="p-4 bg-white">
                            <div className="grid grid-cols-2 gap-4">
                              {dim.subAbilities.map((sub, i) => (
                                <div key={i} className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <p className="font-medium text-slate-800">{sub.name}</p>
                                      <p className="text-xs text-slate-500">{sub.description}</p>
                                    </div>
                                    <span className={`text-xl font-bold ${
                                      sub.score >= 80 ? 'text-green-600' : 
                                      sub.score >= 60 ? 'text-amber-600' : 'text-red-600'
                                    }`}>{sub.score}</span>
                                  </div>
                                  <Progress value={sub.score} className="h-2" />
                                  
                                  {/* 得分来源按钮 */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm" className="w-full mt-3 h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                        <Eye className="h-3 w-3 mr-1" />
                                        查看得分来源
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                      <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2">
                                          <span className={getColorClasses(dim.color, 'text')}>{sub.name}</span>
                                          得分来源
                                        </DialogTitle>
                                        <DialogDescription>
                                          {sub.scoreSource.exam && '该能力通过专项测试评估'}
                                          {sub.scoreSource.practice && '该能力通过实训任务评估'}
                                          {sub.scoreSource.system && '该能力由系统自动计算'}
                                        </DialogDescription>
                                      </DialogHeader>
                                      
                                      <div className="space-y-4 mt-4">
                                        {/* 考试成绩来源 */}
                                        {sub.scoreSource.exam && (
                                          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-blue-600" />
                                                <span className="font-medium text-slate-800">专项测试</span>
                                              </div>
                                              <Badge variant="secondary" className="text-xs">
                                                权重 100%
                                              </Badge>
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">{sub.scoreSource.exam.name}</span>
                                                <span className="font-bold text-blue-600">{sub.scoreSource.exam.score}分</span>
                                              </div>
                                              <Progress value={sub.scoreSource.exam.score} className="h-2" />
                                              {sub.scoreSource.exam.detail && (
                                                <p className="text-xs text-slate-500 mt-2">
                                                  {sub.scoreSource.exam.detail}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* 实训成绩来源 */}
                                        {sub.scoreSource.practice && (
                                          <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2">
                                                <Activity className="h-4 w-4 text-green-600" />
                                                <span className="font-medium text-slate-800">实训任务</span>
                                              </div>
                                              <Badge variant="secondary" className="text-xs">
                                                权重 100%
                                              </Badge>
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">{sub.scoreSource.practice.name}</span>
                                                <span className="font-bold text-green-600">{sub.scoreSource.practice.score}分</span>
                                              </div>
                                              <Progress value={sub.scoreSource.practice.score} className="h-2" />
                                              {sub.scoreSource.practice.detail && (
                                                <p className="text-xs text-slate-500 mt-2">
                                                  {sub.scoreSource.practice.detail}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* 系统自动计算 */}
                                        {sub.scoreSource.system && (
                                          <div className="p-4 rounded-lg border border-purple-200 bg-purple-50">
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2">
                                                <Brain className="h-4 w-4 text-purple-600" />
                                                <span className="font-medium text-slate-800">系统自动计算</span>
                                              </div>
                                              <Badge variant="secondary" className="text-xs">
                                                权重 100%
                                              </Badge>
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">{sub.scoreSource.system.name}</span>
                                                <span className="font-bold text-purple-600">{sub.scoreSource.system.score}分</span>
                                              </div>
                                              <Progress value={sub.scoreSource.system.score} className="h-2" />
                                              <p className="text-xs text-slate-500 mt-2">
                                                {sub.scoreSource.system.detail}
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* 维度分计算说明 */}
                                        <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                                          <p className="text-xs text-slate-500 mb-2">
                                            <strong>维度分计算方式：</strong>
                                          </p>
                                          <p className="text-sm text-slate-600">
                                            维度分 = 考试得分 × 50% + 具体能力平均分 × 50%
                                          </p>
                                          <p className="text-xs text-slate-500 mt-2">
                                            其中，考试得分来自五维能力统一测试，具体能力得分来自各专项实训任务或测试。
                                          </p>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                                    <span>能力水平</span>
                                    <span>{sub.score >= 80 ? '优秀' : sub.score >= 60 ? '良好' : '需提升'}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* 维度分计算方式（方案二） */}
                            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                              <div className="grid grid-cols-3 gap-4 mb-3">
                                <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                                  <p className="text-xs text-slate-500 mb-1">考试得分</p>
                                  <p className="text-xl font-bold text-blue-600">{dim.examScore}</p>
                                  <p className="text-xs text-slate-500">权重 50%</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                                  <p className="text-xs text-slate-500 mb-1">实训平均分</p>
                                  <p className="text-xl font-bold text-green-600">{(dim as any).practiceScore || avgScore}</p>
                                  <p className="text-xs text-slate-500">权重 50%</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-green-50 border border-slate-300">
                                  <p className="text-xs text-slate-500 mb-1">维度总分</p>
                                  <p className={`text-xl font-bold ${getColorClasses(dim.color, 'text')}`}>{dim.score}</p>
                                  <p className="text-xs text-slate-500">综合评分</p>
                                </div>
                              </div>
                              <div className="p-3 rounded-lg bg-white border border-slate-200">
                                <p className="text-sm text-slate-600">
                                  <strong>计算公式：</strong>
                                  <span className="text-blue-600">{dim.examScore} × 50%</span>
                                  {' + '}
                                  <span className="text-green-600">{(dim as any).practiceScore || avgScore} × 50%</span>
                                  {' = '}
                                  <strong className={getColorClasses(dim.color, 'text')}>{dim.score}分</strong>
                                </p>
                                <p className="text-xs text-slate-500 mt-2">
                                  说明：考试得分来自五维能力统一测试，实训平均分为该维度下所有具体能力的平均得分。
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 风险应对专项分析 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  风险应对专项分析
                </CardTitle>
                <CardDescription>风险应对实训成绩分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-xl font-bold text-green-600">68</p>
                      <p className="text-xs text-green-600">优秀(≥90)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xl font-bold text-blue-600">35</p>
                      <p className="text-xs text-blue-600">良好(80-89)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-xl font-bold text-amber-600">18</p>
                      <p className="text-xs text-amber-600">及格(60-79)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-xl font-bold text-red-600">4</p>
                      <p className="text-xs text-red-600">未通过(&lt;60)</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-sm font-medium text-slate-700 mb-2">AI内容检测统计</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-slate-600">通过检测: 112人(89%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-slate-600">未通过: 13人(11%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-sm font-medium text-amber-800 mb-1">薄弱环节分析</p>
                    <ul className="text-xs text-amber-700 space-y-1">
                      <li>• 响应速度平均得分最低(14.2/20)</li>
                      <li>• 合规意识得分波动较大</li>
                      <li>• 建议加强实时危机处理训练</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 预警中心 */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm bg-red-50 border border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">2</p>
                      <p className="text-xs text-red-600">高风险预警</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-amber-50 border border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-600">3</p>
                      <p className="text-xs text-amber-600">中等预警</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-blue-50 border border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                      <p className="text-xs text-blue-600">进度关注</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-green-50 border border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">112</p>
                      <p className="text-xs text-green-600">正常学习</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 预警列表 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>预警学生列表</CardTitle>
                  <div className="flex gap-2">
                    <select className="h-8 px-3 border rounded-lg text-sm">
                      <option>全部类型</option>
                      <option>AI依赖过高</option>
                      <option>进度落后</option>
                      <option>考核未通过</option>
                    </select>
                    <select className="h-8 px-3 border rounded-lg text-sm">
                      <option>全部等级</option>
                      <option>高风险</option>
                      <option>中等</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertStudents.map((student) => (
                    <div key={student.id} className={`flex items-center gap-4 p-4 rounded-xl ${
                      student.severity === 'high' ? 'bg-red-50 border border-red-200' : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        student.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                      }`}>
                        <span className={`font-medium ${
                          student.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                        }`}>{student.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-800">{student.name}</span>
                          <Badge variant="outline">{student.class}</Badge>
                          <Badge variant={student.severity === 'high' ? 'destructive' : 'default'}>
                            {student.severity === 'high' ? '高风险' : '中等'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{student.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          详情
                        </Button>
                        <Button variant="outline" size="sm">
                          处理
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
