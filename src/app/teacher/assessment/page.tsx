'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  LogOut,
  Globe,
  Search,
  FileText,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  Clock,
  Brain,
  Target,
  TrendingUp,
  Shield,
  Award,
  Star,
  MessageSquare,
  Eye,
  Filter,
  ChevronRight,
  FileCheck,
  AlertCircle,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  ArrowLeft,
  Send,
  BarChart3,
  Radar,
  User,
  Clipboard,
  RefreshCw,
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
import { teacherMenuItems } from '@/config/menu';
import { useLogout } from '@/lib/auth';

// 五维能力
const abilityDimensions = [
  { id: 'decision', name: '自主决策能力', icon: Target, weight: 35, color: 'bg-blue-500' },
  { id: 'ai', name: 'AI辅助应用', icon: Brain, weight: 20, color: 'bg-purple-500' },
  { id: 'analysis', name: '数据复盘与优化', icon: TrendingUp, weight: 20, color: 'bg-green-500' },
  { id: 'risk', name: '风险应对', icon: AlertTriangle, weight: 15, color: 'bg-amber-500' },
  { id: 'compliance', name: '合规与规则意识', icon: Shield, weight: 10, color: 'bg-red-500' },
];

// 待评审任务类型
const reviewTypes = [
  { 
    id: 'subjective', 
    name: '主观题评审', 
    description: '案例分析、简答题等需要人工评分的题目',
    icon: FileText,
    color: 'bg-blue-500',
    count: 23
  },
  { 
    id: 'ai-detection', 
    name: 'AI耦合度检测', 
    description: '检测学生回答中AI生成内容占比，>60%需人工复核',
    icon: Sparkles,
    color: 'bg-purple-500',
    count: 8
  },
  { 
    id: 'reconsideration', 
    name: '复议申请', 
    description: '学生对评分有异议，申请教师重新评审',
    icon: RefreshCw,
    color: 'bg-amber-500',
    count: 5
  },
  { 
    id: 'process-review', 
    name: '过程性评价', 
    description: '评估学生实训过程中的决策质量、创新性',
    icon: Clipboard,
    color: 'bg-green-500',
    count: 15
  },
];

// 模拟待评审数据
const pendingReviews = [
  {
    id: 'R001',
    studentName: '张三',
    studentId: 'STU001',
    className: '电商2201班',
    type: 'subjective',
    taskName: '电商运营期末考试',
    questionTitle: '案例分析：某独立站转化率突然下降，请分析原因并提出解决方案',
    studentAnswer: '我认为转化率下降的主要原因有以下几点：\n\n1. 流量质量问题：可能引入了大量低质量流量，访客与目标用户不匹配\n2. 产品页面问题：产品描述、图片可能过时，无法吸引当前用户\n3. 价格竞争力下降：竞品可能进行了促销或降价\n4. 用户体验问题：网站加载速度变慢或移动端适配问题\n\n解决方案：\n1. 分析流量来源，优化广告投放策略\n2. A/B测试产品页面，找出最佳展示方案\n3. 进行竞品调研，制定差异化定价策略\n4. 检查网站性能，优化用户体验',
    referenceAnswer: '应从流量、产品、价格、体验四个维度分析，并结合数据验证假设...',
    systemScore: 85,
    aiCouplingRate: 42,
    submitTime: '2024-02-18 14:30',
    urgency: 'high'
  },
  {
    id: 'R002',
    studentName: '李四',
    studentId: 'STU002',
    className: '电商2201班',
    type: 'ai-detection',
    taskName: '风险应对实训',
    questionTitle: '针对客户投诉"产品与描述不符"，请撰写处理方案',
    studentAnswer: '尊敬的客户，您好！\n\n非常抱歉给您带来了不好的购物体验。关于您反馈的产品与描述不符问题，我们非常重视并深表歉意。\n\n首先，我们会立即核实具体情况，了解具体是哪些方面存在差异。其次，我们提供以下解决方案供您选择：\n1. 全额退款，无需退回商品\n2. 换货服务，承担来回运费\n3. 提供30%优惠券作为补偿\n\n我们承诺会在24小时内给您满意的答复。感谢您的理解与支持！',
    referenceAnswer: '',
    systemScore: 90,
    aiCouplingRate: 78,
    submitTime: '2024-02-18 15:20',
    urgency: 'high',
    aiWarning: '检测到AI生成内容占比78%，超过60%阈值'
  },
  {
    id: 'R003',
    studentName: '王五',
    studentId: 'STU003',
    className: '跨境电商2203班',
    type: 'reconsideration',
    taskName: '市场调研实训报告',
    questionTitle: '独立站选品策略分析报告',
    studentAnswer: '我选择了宠物用品作为目标品类，原因如下：\n\n市场分析：\n- 全球宠物市场规模持续增长，预计2025年达到2700亿美元\n- 宠物人性化趋势明显，消费者愿意为宠物支付更高价格\n- 疫情后线上购买习惯已形成\n\n竞争分析：\n- 大牌集中在宠物食品和医疗领域\n- 宠物智能用品、个性化定制产品竞争较小\n- 利润空间在30-50%\n\n我的策略：\n- 从宠物智能饮水机切入，差异化定价\n- 建立私域社群，提高复购率\n- 内容营销为主，降低获客成本',
    referenceAnswer: '',
    systemScore: 72,
    studentClaim: '我认为我的分析很全面，包含了市场、竞争、策略三个方面，分数应该更高',
    submitTime: '2024-02-17 10:15',
    urgency: 'medium'
  },
  {
    id: 'R004',
    studentName: '赵六',
    studentId: 'STU004',
    className: '电商2202班',
    type: 'process-review',
    taskName: '独立站运营实训',
    questionTitle: '实训过程综合评价',
    studentAnswer: '实训期间的关键决策记录：\n\n第1周：选择了"环保家居"品类，考虑了市场需求和竞争程度\n第2周：设计了简约风格的店铺页面，采用绿色为主色调\n第3周：投放Facebook广告，预算分配70%兴趣定向，30%类似受众\n第4周：根据数据调整，转化率从1.2%提升到2.8%\n\n主要创新点：\n- 设计了"碳足迹计算器"互动功能，提升用户参与度\n- 与环保博主合作，实现精准种草',
    referenceAnswer: '',
    systemScore: 88,
    processHighlights: ['决策有数据支撑', '创新点突出', '复盘能力强'],
    submitTime: '2024-02-16 16:45',
    urgency: 'low'
  },
];

// 评分维度
const scoringCriteria = [
  { id: 'logic', name: '逻辑性', maxScore: 20, description: '思路清晰、论证有力' },
  { id: 'completeness', name: '完整性', maxScore: 25, description: '覆盖关键要点、无遗漏' },
  { id: 'practicality', name: '可行性', maxScore: 25, description: '方案可落地、具操作性' },
  { id: 'innovation', name: '创新性', maxScore: 15, description: '有独特见解或创新方案' },
  { id: 'expression', name: '表达能力', maxScore: 15, description: '表述清晰、结构合理' },
];

// 评语模板
const commentTemplates = [
  { id: 1, text: '分析思路清晰，建议增加数据支撑' },
  { id: 2, text: '方案具有可行性，但考虑不够全面' },
  { id: 3, text: '创新点突出，值得肯定' },
  { id: 4, text: '建议加强竞品分析维度' },
  { id: 5, text: '整体表现优秀，继续保持' },
];

export default function TeacherAssessmentPage() {
  const router = useRouter();
  const handleLogout = useLogout();
  const [activeMenu, setActiveMenu] = useState('assessment');
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedReview, setSelectedReview] = useState<typeof pendingReviews[0] | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [teacherComment, setTeacherComment] = useState('');

  // 获取任务类型图标
  const getTypeIcon = (type: string) => {
    const found = reviewTypes.find(t => t.id === type);
    return found?.icon || FileText;
  };

  // 获取任务类型颜色
  const getTypeColor = (type: string) => {
    const found = reviewTypes.find(t => t.id === type);
    return found?.color || 'bg-slate-500';
  };

  // 获取任务类型名称
  const getTypeName = (type: string) => {
    const found = reviewTypes.find(t => t.id === type);
    return found?.name || '未知类型';
  };

  // 计算总分
  const calculateTotalScore = () => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  // 提交评分
  const handleSubmitScore = () => {
    alert(`评分已提交！总分：${calculateTotalScore()}分`);
    setSelectedReview(null);
    setScores({});
    setTeacherComment('');
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="搜索学生/任务..." className="w-64 pl-9 h-9" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">12</span>
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
        <div className="max-w-7xl mx-auto">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">考核评分</h1>
                <p className="text-slate-500 mt-1">主观题评审、AI检测复核、复议处理、过程性评价</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />筛选
                </Button>
                <Button>
                  <FileCheck className="h-4 w-4 mr-2" />导出成绩
                </Button>
              </div>
            </div>
          </div>

          {/* 评分价值说明 */}
          <Card className="border-0 shadow-md mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                教师评分的独特价值
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">AI无法替代</p>
                    <p className="text-sm text-slate-500">主观题评分、创新性判断、情感理解</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">AI耦合度检测</p>
                    <p className="text-sm text-slate-500">识别过度依赖AI，确保真实能力培养</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">个性化反馈</p>
                    <p className="text-sm text-slate-500">针对性建议，助力学生成长</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Radar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">过程性评价</p>
                    <p className="text-sm text-slate-500">关注决策过程，而非仅看结果</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 待评审任务统计 */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {reviewTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id} 
                  className={`border-0 shadow-md cursor-pointer hover:shadow-lg transition-all ${
                    activeTab === type.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setActiveTab(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-slate-800">{type.count}</span>
                    </div>
                    <p className="font-medium text-slate-700">{type.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* 主内容区 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="pending"><Clock className="h-4 w-4 mr-2" />待评审 ({pendingReviews.length})</TabsTrigger>
              <TabsTrigger value="completed"><CheckCircle className="h-4 w-4 mr-2" />已完成</TabsTrigger>
              <TabsTrigger value="statistics"><BarChart3 className="h-4 w-4 mr-2" />评分统计</TabsTrigger>
            </TabsList>

            {/* 待评审列表 */}
            <TabsContent value="pending" className="space-y-4">
              {selectedReview ? (
                /* 评审详情页 */
                <div className="space-y-4">
                  {/* 返回按钮 */}
                  <Button variant="ghost" onClick={() => { setSelectedReview(null); setScores({}); setTeacherComment(''); }}>
                    <ArrowLeft className="h-4 w-4 mr-2" />返回列表
                  </Button>

                  <div className="grid grid-cols-3 gap-4">
                    {/* 左侧：学生答案 */}
                    <div className="col-span-2 space-y-4">
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{selectedReview.questionTitle}</CardTitle>
                            <Badge className={getTypeColor(selectedReview.type)}>{getTypeName(selectedReview.type)}</Badge>
                          </div>
                          <CardDescription>
                            {selectedReview.taskName} · {selectedReview.className} · {selectedReview.studentName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* 学生答案 */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-700">学生答案</h4>
                              {selectedReview.aiCouplingRate !== undefined && (
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                                  selectedReview.aiCouplingRate > 60 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                }`}>
                                  <Sparkles className="h-4 w-4" />
                                  <span className="text-sm font-medium">AI耦合度 {selectedReview.aiCouplingRate}%</span>
                                </div>
                              )}
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 whitespace-pre-wrap">
                              {selectedReview.studentAnswer}
                            </div>
                          </div>

                          {/* AI警告 */}
                          {selectedReview.aiWarning && (
                            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-red-700">AI生成内容警告</p>
                                <p className="text-sm text-red-600 mt-1">{selectedReview.aiWarning}</p>
                              </div>
                            </div>
                          )}

                          {/* 参考答案 */}
                          {selectedReview.referenceAnswer && (
                            <div>
                              <h4 className="font-medium text-slate-700 mb-2">参考答案</h4>
                              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-slate-600">
                                {selectedReview.referenceAnswer}
                              </div>
                            </div>
                          )}

                          {/* 学生申诉理由 */}
                          {selectedReview.studentClaim && (
                            <div>
                              <h4 className="font-medium text-slate-700 mb-2">学生申诉理由</h4>
                              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-slate-600">
                                {selectedReview.studentClaim}
                              </div>
                            </div>
                          )}

                          {/* 过程亮点 */}
                          {selectedReview.processHighlights && (
                            <div>
                              <h4 className="font-medium text-slate-700 mb-2">过程亮点</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedReview.processHighlights.map((highlight, i) => (
                                  <Badge key={i} className="bg-green-100 text-green-700">{highlight}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* 评分维度 */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="text-lg">评分维度</CardTitle>
                          <CardDescription>请根据以下维度逐项评分</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {scoringCriteria.map((criterion) => (
                            <div key={criterion.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium text-slate-700">{criterion.name}</span>
                                  <span className="text-sm text-slate-500 ml-2">({criterion.description})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min={0}
                                    max={criterion.maxScore}
                                    className="w-20"
                                    value={scores[criterion.id] || 0}
                                    onChange={(e) => setScores({ ...scores, [criterion.id]: Number(e.target.value) })}
                                  />
                                  <span className="text-slate-500">/ {criterion.maxScore}</span>
                                </div>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                                  style={{ width: `${((scores[criterion.id] || 0) / criterion.maxScore) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}

                          <div className="pt-4 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-slate-700">总分</span>
                              <span className="text-3xl font-bold text-blue-600">{calculateTotalScore()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* 教师评语 */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="text-lg">教师评语</CardTitle>
                          <CardDescription>给学生提供个性化反馈和建议</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {commentTemplates.map((template) => (
                              <Button
                                key={template.id}
                                variant="outline"
                                size="sm"
                                onClick={() => setTeacherComment(teacherComment + (teacherComment ? '\n' : '') + template.text)}
                              >
                                {template.text}
                              </Button>
                            ))}
                          </div>
                          <Textarea
                            placeholder="请输入评语，或点击上方快捷模板..."
                            className="min-h-32"
                            value={teacherComment}
                            onChange={(e) => setTeacherComment(e.target.value)}
                          />
                        </CardContent>
                      </Card>
                    </div>

                    {/* 右侧：系统评分 & 操作 */}
                    <div className="space-y-4">
                      {/* 系统评分参考 */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="text-lg">系统评分参考</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <p className="text-sm text-slate-500 mb-1">系统自动评分</p>
                            <p className="text-4xl font-bold text-slate-800">{selectedReview.systemScore}</p>
                            <p className="text-sm text-slate-500 mt-1">/ 100</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">提交时间</span>
                              <span className="text-slate-700">{selectedReview.submitTime}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">学号</span>
                              <span className="text-slate-700">{selectedReview.studentId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">紧急程度</span>
                              <Badge className={
                                selectedReview.urgency === 'high' ? 'bg-red-100 text-red-700' :
                                selectedReview.urgency === 'medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-green-100 text-green-700'
                              }>
                                {selectedReview.urgency === 'high' ? '紧急' : selectedReview.urgency === 'medium' ? '一般' : '低'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* 能力维度评分 */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="text-lg">能力维度调整</CardTitle>
                          <CardDescription>可根据整体表现微调能力评分</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {abilityDimensions.map((dim) => {
                            const Icon = dim.icon;
                            return (
                              <div key={dim.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`w-6 h-6 rounded ${dim.color} flex items-center justify-center`}>
                                    <Icon className="h-3 w-3 text-white" />
                                  </div>
                                  <span className="text-sm text-slate-700">{dim.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <ThumbsDown className="h-3 w-3 text-red-500" />
                                  </Button>
                                  <span className="text-sm font-medium w-8 text-center">-</span>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <ThumbsUp className="h-3 w-3 text-green-500" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </CardContent>
                      </Card>

                      {/* 操作按钮 */}
                      <Card className="border-0 shadow-md">
                        <CardContent className="p-4 space-y-3">
                          <Button className="w-full" size="lg" onClick={handleSubmitScore}>
                            <Send className="h-4 w-4 mr-2" />提交评分
                          </Button>
                          <Button variant="outline" className="w-full" size="lg">
                            <Eye className="h-4 w-4 mr-2" />预览评分单
                          </Button>
                          <Button variant="ghost" className="w-full text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                            <Clock className="h-4 w-4 mr-2" />稍后处理
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ) : (
                /* 待评审列表 */
                <div className="space-y-3">
                  {pendingReviews.map((review) => {
                    const TypeIcon = getTypeIcon(review.type);
                    const typeColor = getTypeColor(review.type);
                    const typeName = getTypeName(review.type);

                    return (
                      <div 
                        key={review.id} 
                        className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => setSelectedReview(review)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg ${typeColor} flex items-center justify-center`}>
                              <TypeIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-slate-800">{review.studentName}</h4>
                                <Badge variant="outline" className="text-xs">{review.className}</Badge>
                                <Badge className={typeColor}>{typeName}</Badge>
                                {review.urgency === 'high' && (
                                  <Badge className="bg-red-100 text-red-700">
                                    <AlertCircle className="h-3 w-3 mr-1" />紧急
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 line-clamp-1">{review.questionTitle}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                <span>{review.taskName}</span>
                                <span>•</span>
                                <span>系统评分：{review.systemScore}分</span>
                                {review.aiCouplingRate !== undefined && (
                                  <>
                                    <span>•</span>
                                    <span className={review.aiCouplingRate > 60 ? 'text-red-500 font-medium' : ''}>
                                      AI耦合度：{review.aiCouplingRate}%
                                    </span>
                                  </>
                                )}
                                <span>•</span>
                                <span>{review.submitTime}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* 已完成 */}
            <TabsContent value="completed" className="space-y-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">已完成的评审记录将显示在这里</p>
                  <p className="text-sm text-slate-400 mt-1">支持按学生、班级、时间筛选查询</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 评分统计 */}
            <TabsContent value="statistics" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">156</p>
                    <p className="text-sm text-slate-500 mt-1">本月已评审</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">4.2分</p>
                    <p className="text-sm text-slate-500 mt-1">平均评分偏差</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-amber-600">8.5分</p>
                    <p className="text-sm text-slate-500 mt-1">平均提升幅度</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>评分分布分析</CardTitle>
                  <CardDescription>系统评分与教师评分对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>评分分布图表</p>
                    </div>
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
