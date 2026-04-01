'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  Shield,
  BarChart3,
  Download,
  Calendar,
  Award,
  CheckCircle,
  Lightbulb,
  BookOpen,
  Star,
  PieChart,
  Activity,
  FileText,
  Users,
  Zap,
  Scale,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentSidebar, StudentHeader } from '@/components/student-layout';

// 能力维度配置
const abilityDimensions = [
  {
    id: 'decision',
    name: '自主决策能力',
    icon: Target,
    maxScore: 30,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    description: '在关键节点做出合理商业决策的能力',
    subItems: [
      { name: '选品决策', maxScore: 6 },
      { name: '定价策略', maxScore: 5 },
      { name: '渠道选择', maxScore: 5 },
      { name: '页面设计', maxScore: 5 },
      { name: '营销活动', maxScore: 5 },
      { name: '预算管理', maxScore: 4 },
    ],
  },
  {
    id: 'ai',
    name: 'AI辅助应用',
    icon: Brain,
    maxScore: 20,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    description: '正确使用AI工具辅助决策的能力',
    subItems: [
      { name: 'AI使用策略', maxScore: 5 },
      { name: '内容审核能力', maxScore: 5 },
      { name: '决策优化', maxScore: 5 },
      { name: '效率意识', maxScore: 5 },
    ],
  },
  {
    id: 'analysis',
    name: '数据复盘与优化',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    maxScore: 25,
    description: '从数据中提取洞察并优化的能力',
    subItems: [
      { name: '数据解读', maxScore: 8 },
      { name: '问题诊断', maxScore: 7 },
      { name: '优化方案', maxScore: 6 },
      { name: '复盘报告', maxScore: 4 },
    ],
  },
  {
    id: 'risk',
    name: '风险应对',
    icon: AlertTriangle,
    maxScore: 15,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    description: '识别风险并制定有效应对方案的能力',
    subItems: [
      { name: '客户投诉处理', maxScore: 5 },
      { name: '差评处理', maxScore: 3 },
      { name: '平台处罚应对', maxScore: 3 },
      { name: '舆情危机处理', maxScore: 2 },
      { name: '运营风险应对', maxScore: 2 },
    ],
  },
  {
    id: 'compliance',
    name: '合规与规则意识',
    icon: Shield,
    maxScore: 10,
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    description: '遵守平台规则和法律法规的意识',
    subItems: [
      { name: '平台规则', maxScore: 4 },
      { name: '法律法规', maxScore: 3 },
      { name: '知识产权', maxScore: 2 },
      { name: '数据合规', maxScore: 1 },
    ],
  },
];

// 评分等级配置
const scoreLevels = {
  excellent: { min: 90, label: '优秀', color: 'text-green-600', bg: 'bg-green-100' },
  good: { min: 75, label: '良好', color: 'text-blue-600', bg: 'bg-blue-100' },
  pass: { min: 60, label: '合格', color: 'text-amber-600', bg: 'bg-amber-100' },
  fail: { min: 0, label: '不合格', color: 'text-red-600', bg: 'bg-red-100' },
};

function getScoreLevel(score: number) {
  if (score >= 90) return scoreLevels.excellent;
  if (score >= 75) return scoreLevels.good;
  if (score >= 60) return scoreLevels.pass;
  return scoreLevels.fail;
}

// 模拟数据 - 考试成绩
const mockExamData = {
  totalScore: 82,
  rank: 10,
  totalStudents: 50,
  examCount: 8,
  avgScore: 78.5,
  scores: {
    decision: { total: 24, maxScore: 30, percentage: 80 },
    ai: { total: 15, maxScore: 20, percentage: 75 },
    analysis: { total: 20, maxScore: 25, percentage: 80 },
    risk: { total: 12, maxScore: 15, percentage: 80 },
    compliance: { total: 9, maxScore: 10, percentage: 90 },
  },
  recentExams: [
    { name: '电商运营期末考试', score: 85, date: '2024-02-15', type: '综合' },
    { name: 'AI应用能力测试', score: 78, date: '2024-02-10', type: '专项' },
    { name: '风险应对测试', score: 82, date: '2024-02-05', type: '专项' },
  ],
};

// 模拟数据 - 实训成绩
const mockPracticeData = {
  totalScore: 88,
  rank: 5,
  totalStudents: 50,
  projectCount: 3,
  scores: {
    decision: { total: 27, maxScore: 30, percentage: 90 },
    ai: { total: 17, maxScore: 20, percentage: 85 },
    analysis: { total: 21, maxScore: 25, percentage: 84 },
    risk: { total: 13, maxScore: 15, percentage: 87 },
    compliance: { total: 10, maxScore: 10, percentage: 100 },
  },
  projects: [
    { name: '品牌独立站全链路运营', score: 90, status: '已完成', duration: '6周' },
    { name: '跨境电商选品实训', score: 86, status: '已完成', duration: '2周' },
    { name: '广告投放模拟实战', score: 88, status: '已完成', duration: '3周' },
  ],
};

// 计算综合成绩（考试50% + 实训50%）
function calculateOverallScore(examScore: number, practiceScore: number) {
  return Math.round(examScore * 0.5 + practiceScore * 0.5);
}

export default function StudentAssessmentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  const examData = mockExamData;
  const practiceData = mockPracticeData;
  
  // 计算综合成绩
  const overallScore = calculateOverallScore(examData.totalScore, practiceData.totalScore);
  
  // 计算各维度综合得分
  const overallDimensionScores = abilityDimensions.map((dim) => {
    const examDim = examData.scores[dim.id as keyof typeof examData.scores];
    const practiceDim = practiceData.scores[dim.id as keyof typeof practiceData.scores];
    return {
      id: dim.id,
      name: dim.name,
      examScore: examDim.total,
      practiceScore: practiceDim.total,
      maxScore: dim.maxScore,
      overallScore: Math.round((examDim.total + practiceDim.total) / 2),
      overallPercentage: Math.round((examDim.percentage + practiceDim.percentage) / 2),
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <StudentSidebar />
      <StudentHeader />

      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">综合能力评估</h1>
                <p className="text-slate-500 mt-1">
                  考试成绩 50% + 实训成绩 50% = 综合评定
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  导出PDF报告
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  下载详细数据
                </Button>
              </div>
            </div>
          </div>

          {/* 综合成绩卡片 */}
          <Card className="border-0 shadow-xl mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-5 gap-6">
                {/* 综合成绩 */}
                <div className="col-span-2 border-r border-white/20">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Scale className="h-6 w-6" />
                      <span className="text-blue-200 text-lg">综合评定</span>
                    </div>
                    <div className="text-7xl font-bold mb-2">{overallScore}</div>
                    <Badge className="bg-white/20 text-white text-lg px-4 py-1">
                      {getScoreLevel(overallScore).label}
                    </Badge>
                    <div className="mt-4 flex items-center justify-center gap-2 text-blue-200">
                      <Award className="h-5 w-5" />
                      <span>班级排名 第 {Math.min(examData.rank, practiceData.rank)} 名 / {examData.totalStudents} 人</span>
                    </div>
                  </div>
                </div>
                
                {/* 考试成绩 */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-blue-200">考试成绩</span>
                  </div>
                  <div className="text-5xl font-bold">{examData.totalScore}</div>
                  <div className="text-blue-200 text-sm mt-2">权重 50%</div>
                  <div className="mt-2 text-sm text-blue-200">
                    已完成 {examData.examCount} 场考试
                  </div>
                </div>
                
                {/* 实训成绩 */}
                <div className="text-center border-l border-white/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="h-5 w-5" />
                    <span className="text-blue-200">实训成绩</span>
                  </div>
                  <div className="text-5xl font-bold">{practiceData.totalScore}</div>
                  <div className="text-blue-200 text-sm mt-2">权重 50%</div>
                  <div className="mt-2 text-sm text-blue-200">
                    已完成 {practiceData.projectCount} 个项目
                  </div>
                </div>
                
                {/* 计算公式 */}
                <div className="text-center border-l border-white/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calculator className="h-5 w-5" />
                    <span className="text-blue-200">计算公式</span>
                  </div>
                  <div className="text-lg font-medium">
                    {examData.totalScore} × 50% + {practiceData.totalScore} × 50%
                  </div>
                  <div className="text-2xl font-bold mt-2">= {overallScore}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 能力维度对比 */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <Card className="border-0 shadow-lg col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  五维能力综合分析
                </CardTitle>
                <CardDescription>考试成绩 vs 实训成绩 对比分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overallDimensionScores.map((dim) => {
                    const config = abilityDimensions.find((d) => d.id === dim.id)!;
                    const Icon = config.icon;
                    return (
                      <div key={dim.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium text-slate-700">{dim.name}</span>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-blue-600">考试: {dim.examScore}/{dim.maxScore}</span>
                            <span className="text-green-600">实训: {dim.practiceScore}/{dim.maxScore}</span>
                            <span className="font-bold text-slate-800">综合: {dim.overallScore}/{dim.maxScore}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 h-3">
                          <div className="flex-1 bg-blue-100 rounded-l-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 transition-all"
                              style={{ width: `${dim.examScore / dim.maxScore * 100}%` }}
                            />
                          </div>
                          <div className="flex-1 bg-green-100 rounded-r-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all"
                              style={{ width: `${dim.practiceScore / dim.maxScore * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500" />
                    <span className="text-sm text-slate-600">考试成绩</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500" />
                    <span className="text-sm text-slate-600">实训成绩</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 能力雷达图 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-500" />
                  能力雷达图
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {overallDimensionScores.map((dim) => (
                    <div key={dim.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{dim.name}</span>
                        <span className="font-medium text-slate-800">{dim.overallPercentage}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                          style={{ width: `${dim.overallPercentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 详细评估 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="overview">综合概览</TabsTrigger>
              <TabsTrigger value="exam">考试详情</TabsTrigger>
              <TabsTrigger value="practice">实训详情</TabsTrigger>
              <TabsTrigger value="suggestions">改进建议</TabsTrigger>
            </TabsList>

            {/* 综合概览 */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {abilityDimensions.map((dim) => {
                  const overallDim = overallDimensionScores.find((d) => d.id === dim.id)!;
                  const Icon = dim.icon;
                  const examDim = examData.scores[dim.id as keyof typeof examData.scores];
                  const practiceDim = practiceData.scores[dim.id as keyof typeof practiceData.scores];

                  return (
                    <Card key={dim.id} className={`border-0 shadow-lg ${dim.bgColor} ${dim.borderColor} border`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dim.color} flex items-center justify-center text-white`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-slate-800">{dim.name}</h3>
                              <div className="text-right">
                                <span className="text-2xl font-bold text-slate-800">{overallDim.overallScore}</span>
                                <span className="text-slate-500">/{dim.maxScore}</span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-500 mb-3">{dim.description}</p>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div className="text-center p-2 bg-blue-100 rounded-lg">
                                <p className="text-xs text-blue-600 mb-1">考试成绩</p>
                                <p className="text-lg font-bold text-blue-700">{examDim.total}/{dim.maxScore}</p>
                              </div>
                              <div className="text-center p-2 bg-green-100 rounded-lg">
                                <p className="text-xs text-green-600 mb-1">实训成绩</p>
                                <p className="text-lg font-bold text-green-700">{practiceDim.total}/{dim.maxScore}</p>
                              </div>
                            </div>
                            <div className="h-2 bg-white rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-500`}
                                style={{ width: `${overallDim.overallPercentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* 考试详情 */}
            <TabsContent value="exam" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>考试成绩详情</CardTitle>
                  <CardDescription>
                    已完成 {examData.examCount} 场考试，平均分 {examData.avgScore} 分
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {examData.recentExams.map((exam, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800">{exam.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span>{exam.date}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">{exam.type}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{exam.score}</div>
                            <div className="text-xs text-slate-500">满分100</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 实训详情 */}
            <TabsContent value="practice" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>实训成绩详情</CardTitle>
                  <CardDescription>
                    已完成 {practiceData.projectCount} 个实训项目
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {practiceData.projects.map((project, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-200 hover:border-green-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                              <Zap className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800">{project.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span>周期: {project.duration}</span>
                                <span>•</span>
                                <Badge className="bg-green-100 text-green-700 text-xs">{project.status}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{project.score}</div>
                            <div className="text-xs text-slate-500">满分100</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 改进建议 */}
            <TabsContent value="suggestions" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>综合能力评估总结</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 优势 */}
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      优势领域
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>合规意识强，考试和实训均为最高分（考试90%，实训100%）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>自主决策能力优秀，实训表现（90%）优于考试（80%）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>AI工具使用得当，能够有效辅助决策</span>
                      </li>
                    </ul>
                  </div>

                  {/* 待改进 */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      待改进领域
                    </h4>
                    <ul className="space-y-2 text-sm text-amber-700">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>AI辅助应用能力考试得分（75%）低于实训（85%），建议加强理论知识学习</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>数据复盘与优化能力有提升空间，建议多进行数据分析实践</span>
                      </li>
                    </ul>
                  </div>

                  {/* 学习建议 */}
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      学习建议
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-medium flex-shrink-0">1</div>
                        <span>建议复习AI应用相关理论知识，提升考试表现</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-medium flex-shrink-0">2</div>
                        <span>多参与数据分析实训项目，提升数据洞察能力</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-medium flex-shrink-0">3</div>
                        <span>继续保持实训中的优秀表现，将实践能力转化为理论认知</span>
                      </li>
                    </ul>
                  </div>

                  {/* 教师评语 */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      教师综合评语
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      张三同学综合能力评估为{getScoreLevel(overallScore).label}（{overallScore}分）。考试成绩（{examData.totalScore}分）和实训成绩（{practiceData.totalScore}分）均表现良好，两者差距不大，说明理论知识和实践能力发展较为均衡。在合规意识方面表现突出，建议在AI辅助应用和数据分析方面继续加强学习。总体而言，已具备独立运营独立站的基础能力。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
