'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  AlertCircle,
  MessageSquare,
  Gavel,
  Newspaper,
  Package,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Filter,
  Search,
  TrendingUp,
  Users,
  Star,
  Send,
  Lightbulb,
  ArrowLeft,
  Brain,
  ThumbsUp,
  ThumbsDown,
  Target,
  Award,
  BarChart3,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StudentSidebar, StudentHeader } from '@/components/student-layout';

// 风险类型配置
const riskCategories = [
  {
    id: 'complaint',
    name: '客户投诉',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600',
    description: '产品质量、物流延迟、服务态度等投诉处理',
  },
  {
    id: 'negative-review',
    name: '差评处理',
    icon: Star,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    description: '恶意差评、真实差评的识别与应对',
  },
  {
    id: 'platform-penalty',
    name: '平台处罚',
    icon: Gavel,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    description: '违规处罚、侵权投诉、售后纠纷处理',
  },
  {
    id: 'public-opinion',
    name: '舆情危机',
    icon: Newspaper,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    description: '负面传播、品牌形象危机应对',
  },
  {
    id: 'operation-risk',
    name: '运营风险',
    icon: Package,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    description: '库存积压、价格错误、活动异常处理',
  },
  {
    id: 'compliance',
    name: '合规风险',
    icon: Shield,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    description: '广告法违规、知识产权、数据合规',
  },
];

// 风险等级配置
const riskLevels = {
  low: { name: '低风险', color: 'bg-emerald-100 text-emerald-700', score: 1 },
  medium: { name: '中风险', color: 'bg-amber-100 text-amber-700', score: 2 },
  high: { name: '高风险', color: 'bg-red-100 text-red-700', score: 3 },
  critical: { name: '紧急', color: 'bg-red-500 text-white', score: 4 },
};

// 风险状态配置
const riskStatuses = {
  pending: { name: '待处理', color: 'bg-slate-100 text-slate-600', icon: Clock },
  in_progress: { name: '处理中', color: 'bg-blue-100 text-blue-600', icon: Zap },
  submitted: { name: '已提交', color: 'bg-purple-100 text-purple-600', icon: Send },
  completed: { name: '已完成', color: 'bg-emerald-100 text-emerald-600', icon: CheckCircle },
};

// 模拟风险事件数据（老师预设）
const mockRiskEvents = [
  {
    id: 'risk-001',
    title: '产品质量投诉：服装褪色严重',
    category: 'complaint',
    level: 'high',
    platform: 'taobao',
    status: 'pending',
    createdAt: '2024-01-15 10:30',
    deadline: '2024-01-15 18:00',
    description: `客户反馈购买的深蓝色牛仔裤第一次洗涤就严重褪色，导致其他衣物被染色。客户非常愤怒，要求退款并赔偿损失，同时表示要在平台上发布差评并向消费者协会投诉。

订单信息：
- 订单号：TB20240115001
- 商品：深蓝色牛仔裤
- 金额：¥199
- 客户等级：金牌会员（累计消费¥5,000+）

客户诉求：
1. 全额退款
2. 赔偿被染色的其他衣物（约¥500）
3. 公开道歉`,
    hints: [
      '分析产品是否存在质量问题',
      '评估客户价值和历史记录',
      '考虑平台规则和消费者权益保护法',
      '制定合理的赔偿方案',
      '预防类似问题再次发生',
    ],
    referencePoints: [
      { item: '响应速度', weight: 20, description: '在规定时间内快速响应' },
      { item: '方案合理性', weight: 30, description: '解决方案是否符合实际情况' },
      { item: '沟通技巧', weight: 20, description: '沟通方式是否专业、有同理心' },
      { item: '合规意识', weight: 15, description: '是否考虑相关法规和平台规则' },
      { item: '风险控制', weight: 15, description: '是否有效降低事态升级风险' },
    ],
  },
  {
    id: 'risk-002',
    title: '恶意差评攻击：竞争对手刷差评',
    category: 'negative-review',
    level: 'critical',
    platform: 'pdd',
    status: 'pending',
    createdAt: '2024-01-15 09:00',
    deadline: '2024-01-15 14:00',
    description: `店铺在短时间内收到20+条一星差评，内容高度相似，都声称产品有质量问题，但订单记录显示这些订单均未申请退货。

异常情况分析：
- 所有差评账号均为新注册用户
- 收货地址集中在同一区域
- 评价时间间隔极短（5-10分钟/条）
- 差评内容几乎完全一致

影响评估：
- 店铺评分从4.8降至3.2
- 今日订单量下降60%
- 部分老客户发消息询问情况`,
    hints: [
      '收集证据证明差评为恶意刷评',
      '向平台申诉的流程和材料准备',
      '公开回应维护品牌形象',
      '安抚老客户情绪',
      '预防未来类似攻击',
    ],
    referencePoints: [
      { item: '证据收集', weight: 25, description: '是否能有效收集并整理证据' },
      { item: '申诉策略', weight: 25, description: '平台申诉方案是否完整有效' },
      { item: '危机公关', weight: 20, description: '公开回应是否得当' },
      { item: '客户维护', weight: 15, description: '老客户关系维护措施' },
      { item: '预防机制', weight: 15, description: '后续预防措施是否完善' },
    ],
  },
  {
    id: 'risk-003',
    title: '知识产权侵权投诉：产品图片被投诉',
    category: 'platform-penalty',
    level: 'high',
    platform: 'amazon',
    status: 'pending',
    createdAt: '2024-01-14 16:00',
    deadline: '2024-01-16 16:00',
    description: `收到Amazon平台通知，产品Listing被投诉侵犯知识产权，涉及产品图片版权问题。

投诉详情：
- ASIN: B09XXXXX
- 投诉方：某品牌公司
- 投诉类型：图片版权侵权
- 涉及产品：已售出200+件

平台通知：
请在48小时内提供以下材料之一：
1. 授权证明
2. 原创证明
3. 版权不属于投诉方的证明

否则Listing将被下架，账户可能受限。`,
    hints: [
      '核实图片来源和授权情况',
      '评估投诉的有效性',
      '准备申诉材料',
      '考虑替代方案（更换图片/和解）',
      '预防未来侵权风险',
    ],
    referencePoints: [
      { item: '情况核实', weight: 20, description: '对侵权情况的准确判断' },
      { item: '申诉准备', weight: 30, description: '申诉材料的完整性和有效性' },
      { item: '风险评估', weight: 20, description: '对不同方案风险的评估' },
      { item: '方案选择', weight: 15, description: '最终方案选择的合理性' },
      { item: '预防措施', weight: 15, description: '后续版权管理机制' },
    ],
  },
  {
    id: 'risk-004',
    title: '舆情危机：直播翻车事件',
    category: 'public-opinion',
    level: 'critical',
    platform: 'douyin',
    status: 'pending',
    createdAt: '2024-01-15 11:00',
    deadline: '2024-01-15 16:00',
    description: `品牌在抖音直播间进行新品发布时，主播因不当言论引发争议。相关视频片段被大量转发，话题登上热搜，出现大量负面评论。

事件详情：
- 主播在介绍产品时使用了不当比喻
- 视频片段被截取后在社交媒体广泛传播
- #某某品牌直播翻车# 话题阅读量破千万
- 官方账号被大量网友留言攻击
- 部分合作KOL表示要终止合作

舆论走向：
- 80%评论为负面
- 开始出现抵制品牌的声音
- 媒体开始关注报道`,
    hints: [
      '快速评估事件影响范围',
      '制定公开声明策略',
      '处理主播责任问题',
      '安抚合作方情绪',
      '品牌形象修复计划',
    ],
    referencePoints: [
      { item: '响应速度', weight: 20, description: '危机响应是否及时' },
      { item: '声明内容', weight: 25, description: '公开声明是否得体、有诚意' },
      { item: '责任处理', weight: 20, description: '主播责任认定和处理方式' },
      { item: '舆论引导', weight: 20, description: '舆论引导策略是否有效' },
      { item: '长期修复', weight: 15, description: '品牌形象修复计划' },
    ],
  },
  {
    id: 'risk-005',
    title: '运营风险：促销活动价格设置错误',
    category: 'operation-risk',
    level: 'high',
    platform: 'taobao',
    status: 'pending',
    createdAt: '2024-01-15 08:30',
    deadline: '2024-01-15 12:00',
    description: `618大促期间，运营团队设置优惠券时出现错误，导致商品实际到手价远低于成本价。在发现问题前，已产生大量订单。

错误详情：
- 原计划：满300减50
- 实际设置：满50减300
- 问题商品：夏季连衣裙（成本¥120，售价¥199）
- 已下单：500+笔，到手价约¥49-¥99

损失估算：
- 每单亏损约¥70-¥120
- 总亏损约¥35,000-¥60,000
- 如全部发货将严重亏损
- 如取消订单将影响店铺信誉`,
    hints: [
      '评估法律风险和平台规则',
      '计算不同方案的成本损失',
      '制定止损方案',
      '客户沟通策略',
      '预防未来类似问题',
    ],
    referencePoints: [
      { item: '风险评估', weight: 25, description: '对不同方案风险的准确评估' },
      { item: '止损方案', weight: 25, description: '止损方案的经济性和可行性' },
      { item: '客户沟通', weight: 20, description: '客户沟通方式和补偿方案' },
      { item: '平台协调', weight: 15, description: '与平台沟通协调策略' },
      { item: '预防机制', weight: 15, description: '活动审核流程优化方案' },
    ],
  },
  {
    id: 'risk-006',
    title: '合规风险：广告宣传用语违规',
    category: 'compliance',
    level: 'medium',
    platform: 'pdd',
    status: 'pending',
    createdAt: '2024-01-14 14:00',
    deadline: '2024-01-16 14:00',
    description: `店铺多款商品详情页被平台标记为广告违规，涉及违反《广告法》相关条款。

违规详情：
- 问题1：使用"最""第一"等极限词（3处）
- 问题2：医疗效果宣传（护肤品声称"治疗敏感肌"）
- 问题3：虚假价格对比（虚构原价）

平台处理：
- 涉及商品已被下架
- 需在48小时内整改
- 累计违规将影响店铺权重

影响范围：
- 涉及SKU：12个
- 月销售额影响：约¥50,000`,
    hints: [
      '梳理所有违规内容',
      '学习广告法相关规定',
      '制定整改方案',
      '预防未来违规',
      '评估对店铺的影响',
    ],
    referencePoints: [
      { item: '法规理解', weight: 25, description: '对广告法相关条款的理解' },
      { item: '整改方案', weight: 30, description: '整改方案的完整性和有效性' },
      { item: '影响评估', weight: 15, description: '对违规影响范围的评估' },
      { item: '预防措施', weight: 20, description: '未来违规预防机制' },
      { item: '持续合规', weight: 10, description: '长期合规管理计划' },
    ],
  },
];

// 平台配置
const platformConfig: Record<string, { name: string; color: string }> = {
  taobao: { name: '淘宝', color: 'bg-orange-100 text-orange-700' },
  pdd: { name: '拼多多', color: 'bg-red-100 text-red-700' },
  douyin: { name: '抖音', color: 'bg-pink-100 text-pink-700' },
  amazon: { name: 'Amazon', color: 'bg-amber-100 text-amber-700' },
  shopee: { name: 'Shopee', color: 'bg-orange-100 text-orange-700' },
  lazada: { name: 'Lazada', color: 'bg-blue-100 text-blue-700' },
  shopify: { name: 'Shopify', color: 'bg-emerald-100 text-emerald-700' },
};

// 学生应对方案类型
interface Solution {
  id: string;
  riskId: string;
  content: string;
  submittedAt: Date;
  scores: {
    responseSpeed: number;
    reasonability: number;
    communication: number;
    compliance: number;
    riskControl: number;
    total: number;
  };
  feedback: string;
  aiEvaluation: string;
  aiDetected?: boolean;
  aiCouplingDegree?: number;
}

export default function RiskEventsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<typeof mockRiskEvents[0] | null>(null);
  const [solutionText, setSolutionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSolution, setSubmittedSolution] = useState<Solution | null>(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  // 筛选风险事件
  const filteredRisks = mockRiskEvents.filter(risk => {
    const matchCategory = activeCategory === 'all' || risk.category === activeCategory;
    const matchStatus = activeStatus === 'all' || risk.status === activeStatus;
    const matchSearch = risk.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  // 统计数据
  const stats = {
    total: mockRiskEvents.length,
    pending: mockRiskEvents.filter(r => r.status === 'pending').length,
    completed: mockRiskEvents.filter(r => r.status === 'completed').length,
    avgScore: 85,
  };

  // 获取风险分类配置
  const getCategoryConfig = (categoryId: string) => {
    return riskCategories.find(c => c.id === categoryId) || riskCategories[0];
  };

  // 提交应对方案
  const handleSubmitSolution = async () => {
    if (!solutionText.trim() || !selectedRisk) return;

    setIsSubmitting(true);

    try {
      // 调用AI评分API
      const response = await fetch('/api/risk-evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riskId: selectedRisk.id,
          solution: solutionText.trim(),
          riskDetails: selectedRisk,
        }),
      });

      if (!response.ok) throw new Error('Evaluation failed');

      const evaluation = await response.json();

      const solution: Solution = {
        id: Date.now().toString(),
        riskId: selectedRisk.id,
        content: solutionText.trim(),
        submittedAt: new Date(),
        scores: evaluation.scores,
        feedback: evaluation.feedback,
        aiEvaluation: evaluation.aiEvaluation,
      };

      setSubmittedSolution(solution);
      setShowEvaluation(true);
    } catch (error) {
      console.error('Submit solution error:', error);
      // 模拟评分（实际应该从API获取）
      const solution: Solution = {
        id: Date.now().toString(),
        riskId: selectedRisk.id,
        content: solutionText.trim(),
        submittedAt: new Date(),
        scores: {
          responseSpeed: 18,
          reasonability: 25,
          communication: 17,
          compliance: 12,
          riskControl: 13,
          total: 85,
        },
        feedback: '您的应对方案整体思路清晰，考虑了多方面因素。建议在客户沟通部分更加注重同理心表达，同时可以增加一些预防措施来避免类似问题再次发生。',
        aiEvaluation: '方案具有一定的可操作性，体现了基本的危机处理意识。建议在后续学习中加强对消费者权益保护法和平台规则的学习，提升合规处理能力。',
      };
      setSubmittedSolution(solution);
      setShowEvaluation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 渲染风险列表
  const renderRiskList = () => (
    <div className="p-6">
      {/* 头部统计 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">风险应对实训</h1>
            <p className="text-sm text-slate-500">培养电商运营风险识别与应对能力</p>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-700">{stats.total}</p>
                  <p className="text-xs text-slate-500">风险事件</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                  <p className="text-xs text-slate-500">待处理</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-200 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
                  <p className="text-xs text-slate-500">已完成</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-200 flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{stats.avgScore}</p>
                  <p className="text-xs text-slate-500">平均得分</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索风险事件..."
            className="pl-10 h-10"
          />
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger className="w-40 h-10">
            <SelectValue placeholder="风险类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            {riskCategories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={activeStatus} onValueChange={setActiveStatus}>
          <SelectTrigger className="w-32 h-10">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            {Object.entries(riskStatuses).map(([key, status]) => (
              <SelectItem key={key} value={key}>{status.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 风险类型标签 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('all')}
          className={activeCategory === 'all' ? 'bg-slate-800' : ''}
        >
          全部
        </Button>
        {riskCategories.map(cat => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(cat.id)}
            className={activeCategory === cat.id ? `bg-gradient-to-r ${cat.color}` : ''}
          >
            <cat.icon className="h-4 w-4 mr-1" />
            {cat.name}
          </Button>
        ))}
      </div>

      {/* 风险事件列表 */}
      <div className="space-y-4">
        {filteredRisks.map(risk => {
          const category = getCategoryConfig(risk.category);
          const level = riskLevels[risk.level as keyof typeof riskLevels];
          const status = riskStatuses[risk.status as keyof typeof riskStatuses];
          const platform = platformConfig[risk.platform];

          return (
            <Card
              key={risk.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border-l-4 ${category.borderColor.replace('border-', 'border-l-')}`}
              onClick={() => {
                setSelectedRisk(risk);
                setSolutionText('');
                setSubmittedSolution(null);
                setShowEvaluation(false);
              }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={level.color}>{level.name}</Badge>
                      <Badge variant="outline" className={platform.color}>{platform.name}</Badge>
                      <Badge className={status.color}>
                        <status.icon className="h-3 w-3 mr-1" />
                        {status.name}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{risk.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        截止：{risk.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <category.icon className="h-4 w-4" />
                        {category.name}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 空状态 */}
      {filteredRisks.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">暂无符合条件的风险事件</p>
        </div>
      )}
    </div>
  );

  // 渲染风险详情和应对
  const renderRiskDetail = () => {
    if (!selectedRisk) return null;

    const category = getCategoryConfig(selectedRisk.category);
    const level = riskLevels[selectedRisk.level as keyof typeof riskLevels];
    const platform = platformConfig[selectedRisk.platform];

    return (
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* 头部 */}
        <div className={`bg-gradient-to-r ${category.color} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedRisk(null);
                  setSubmittedSolution(null);
                  setShowEvaluation(false);
                }}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回列表
              </Button>
              <div className="h-6 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <category.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold">{selectedRisk.title}</h2>
                  <p className="text-xs text-white/80">{category.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={level.color}>{level.name}</Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {platform.name}
              </Badge>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="detail" className="h-full flex flex-col">
            <div className="px-4 pt-4 border-b bg-white">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="detail">事件详情</TabsTrigger>
                <TabsTrigger value="solution">应对方案</TabsTrigger>
                <TabsTrigger value="evaluation">评分反馈</TabsTrigger>
              </TabsList>
            </div>

            {/* 事件详情 */}
            <TabsContent value="detail" className="flex-1 overflow-auto p-4 m-0">
              <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      事件描述
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap text-sm text-slate-600 leading-relaxed">
                      {selectedRisk.description}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      处理提示
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedRisk.hints.map((hint, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      评分标准
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedRisk.referencePoints.map((point, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <span className="font-medium text-slate-700">{point.item}</span>
                            <span className="text-sm text-slate-500 ml-2">({point.weight}%)</span>
                          </div>
                          <span className="text-sm text-slate-500">{point.description}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 应对方案 */}
            <TabsContent value="solution" className="flex-1 overflow-auto p-4 m-0">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">提交您的应对方案</CardTitle>
                    <CardDescription>
                      请根据事件详情，制定详细的应对方案。AI将根据评分标准对您的方案进行评分。
                      <span className="block mt-2 text-red-600 font-medium">
                        ⚠️ 重要提示：系统会自动检测AI生成内容，AI耦合度高于40%将直接判0分！
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={solutionText}
                      onChange={(e) => setSolutionText(e.target.value)}
                      placeholder="请输入您的应对方案，包括：
1. 问题分析
2. 处理步骤
3. 沟通话术
4. 预防措施

越详细的方案越能体现您的风险应对能力..."
                      className="min-h-[300px] resize-none"
                      disabled={isSubmitting || !!submittedSolution}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500">
                        提示：方案字数建议300字以上，涵盖多个评分维度
                      </p>
                      <Button
                        onClick={handleSubmitSolution}
                        disabled={!solutionText.trim() || isSubmitting || !!submittedSolution}
                        className={`bg-gradient-to-r ${category.color}`}
                      >
                        {isSubmitting ? (
                          <>
                            <Zap className="h-4 w-4 mr-2 animate-pulse" />
                            AI评分中...
                          </>
                        ) : submittedSolution ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            已提交
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            提交方案
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 评分反馈 */}
            <TabsContent value="evaluation" className="flex-1 overflow-auto p-4 m-0">
              <div className="max-w-4xl mx-auto">
                {!submittedSolution ? (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <Brain className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 mb-2">请先提交应对方案</p>
                      <p className="text-sm text-slate-400">AI将根据评分标准对您的方案进行评分和点评</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {/* AI检测结果提示 */}
                    {submittedSolution.aiDetected ? (
                      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 border-2">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-red-700 mb-1">⚠️ AI内容检测警告</h4>
                              <p className="text-sm text-red-600">
                                检测到您的方案AI耦合度为 <span className="font-bold">{submittedSolution.aiCouplingDegree}%</span>，
                                已超过40%的阈值。根据实训规则，此方案判定为0分。
                              </p>
                              <p className="text-xs text-red-500 mt-2">
                                风险应对实训的目的是培养您的自主决策能力，请独立思考并重新提交方案。
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-emerald-700">AI内容检测通过</p>
                                <p className="text-xs text-emerald-600">方案体现了您的自主思考能力</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                              耦合度: {submittedSolution.aiCouplingDegree || 0}%
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* 总分卡片 */}
                    <Card className={`bg-gradient-to-br ${submittedSolution.aiDetected ? 'from-red-50 to-orange-50 border-red-200' : 'from-purple-50 to-pink-50 border-purple-200'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800">综合得分</h3>
                            <p className="text-sm text-slate-500">基于5个评分维度的综合评价</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-4xl font-bold ${submittedSolution.aiDetected ? 'text-red-600' : 'text-purple-600'}`}>
                              {submittedSolution.scores.total}
                            </div>
                            <div className="text-sm text-slate-500">/ 100分</div>
                          </div>
                        </div>
                        <Progress value={submittedSolution.scores.total} className="h-3" />
                      </CardContent>
                    </Card>

                    {/* 分项得分 */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">分项得分</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { label: '响应速度', score: submittedSolution.scores.responseSpeed, max: 20 },
                            { label: '方案合理性', score: submittedSolution.scores.reasonability, max: 30 },
                            { label: '沟通技巧', score: submittedSolution.scores.communication, max: 20 },
                            { label: '合规意识', score: submittedSolution.scores.compliance, max: 15 },
                            { label: '风险控制', score: submittedSolution.scores.riskControl, max: 15 },
                          ].map((item, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600">{item.label}</span>
                                <span className="font-medium">
                                  {item.score} / {item.max}
                                </span>
                              </div>
                              <Progress value={(item.score / item.max) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI点评 */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Brain className="h-4 w-4 text-purple-500" />
                          AI点评
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {submittedSolution.feedback}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 能力评估 */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-500" />
                          能力评估
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {submittedSolution.aiEvaluation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 您的方案 */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">您的应对方案</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {submittedSolution.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/50">
      <StudentHeader />
      <StudentSidebar activeMenu="risk-events" />

      <main className="ml-60 pt-16 min-h-screen">
        {selectedRisk ? renderRiskDetail() : renderRiskList()}
      </main>
    </div>
  );
}
