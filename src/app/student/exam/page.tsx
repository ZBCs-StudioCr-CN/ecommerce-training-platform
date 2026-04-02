'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Play,
  Pause,
  Flag,
  ArrowLeft,
  ArrowRight,
  Target,
  Brain,
  TrendingUp,
  Shield,
  BarChart3,
  Award,
  Timer,
  Users,
  Calendar,
  BookOpen,
  Zap,
  Eye,
  Download,
  RefreshCw,
  Bell,
  LogOut,
  Globe,
  Search,
  MessageCircle,
  Store,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// 学生端菜单配置
const studentMenuItems = [
  { id: 'dashboard', label: '实训控制台', icon: LayoutDashboard, href: '/student/dashboard' },
  { id: 'learning', label: '学习中心', icon: BookOpen, href: '/student/learning' },
  { id: 'practice', label: '仿真实训', icon: Store, href: '/student/practice' },
  { id: 'risk-events', label: '风险应对', icon: AlertTriangle, href: '/student/risk-events' },
  { id: 'exam', label: '考核中心', icon: Award, href: '/student/exam' },
  { id: 'assessment', label: '能力评估', icon: Target, href: '/student/assessment' },
  { id: 'achievement', label: '成果中心', icon: FileText, href: '/student/achievement' },
  { id: 'qa', label: '答疑提问', icon: MessageCircle, href: '/student/qa' },
  { id: 'ai-assistant', label: 'AI助手', icon: Brain, href: '/student/ai-assistant', highlight: true },
];

// 五维能力配置
const abilityDimensions = [
  { id: 'decision', name: '自主决策能力', icon: Target, color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  { id: 'ai', name: 'AI辅助应用', icon: Brain, color: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
  { id: 'analysis', name: '数据复盘与优化', icon: TrendingUp, color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
  { id: 'risk', name: '风险应对', icon: AlertTriangle, color: 'bg-amber-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
  { id: 'compliance', name: '合规与规则意识', icon: Shield, color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-600' },
];

// 模拟考试列表
const mockExams = [
  {
    id: 'E001',
    name: '电商运营能力期末考试',
    status: 'available',
    scheduledTime: '2024-02-20 09:00',
    duration: 120,
    totalScore: 100,
    questionCount: 50,
    description: '综合考查电商运营五大核心能力，包括选品决策、数据分析、风险应对等内容。',
  },
  {
    id: 'E002',
    name: 'AI辅助应用能力测试',
    status: 'available',
    scheduledTime: '2024-02-19 14:00',
    duration: 60,
    totalScore: 100,
    questionCount: 30,
    description: '考查AI工具使用策略、内容审核能力、决策优化等核心技能。',
  },
  {
    id: 'E003',
    name: '风险应对能力测试',
    status: 'completed',
    scheduledTime: '2024-02-15 10:00',
    duration: 90,
    totalScore: 100,
    questionCount: 35,
    score: 85,
    rank: 8,
    totalStudents: 50,
    completedTime: '2024-02-15 11:25',
  },
  {
    id: 'E004',
    name: '合规意识测试',
    status: 'expired',
    scheduledTime: '2024-02-10 09:00',
    duration: 45,
    totalScore: 100,
    questionCount: 25,
  },
  {
    id: 'E005',
    name: '数据分析能力测试',
    status: 'completed',
    scheduledTime: '2024-02-12 14:00',
    duration: 60,
    totalScore: 100,
    questionCount: 30,
    score: 72,
    rank: 15,
    totalStudents: 50,
    completedTime: '2024-02-12 14:52',
  },
];

// 模拟考试题目
const mockExamQuestions: Array<{
  id: number;
  type: string;
  ability: string;
  content: string;
  options: string[];
  score: number;
  correctAnswer?: number | number[];
  analysis?: string;
}> = [
  {
    id: 1,
    type: 'single',
    ability: 'decision',
    content: '在选择跨境电商目标市场时，以下哪个因素应该优先考虑？',
    options: [
      '市场规模和增长潜力',
      '竞争对手数量',
      '物流成本',
      '当地语言熟悉度',
    ],
    score: 2,
    correctAnswer: 0,
    analysis: '市场规模和增长潜力是选择目标市场的首要因素，决定了业务的天花板和发展空间。',
  },
  {
    id: 2,
    type: 'multiple',
    ability: 'ai',
    content: '使用AI工具生成产品描述时，以下哪些做法是正确的？（多选）',
    options: [
      '直接复制AI生成的内容使用',
      '对AI生成内容进行审核和修改后使用',
      '参考AI建议，结合产品特点重新撰写',
      '将AI生成内容作为初稿，多次迭代优化',
    ],
    score: 3,
    correctAnswer: [1, 2, 3],
    analysis: 'AI生成的内容需要人工审核和优化，不能直接使用，需要结合实际产品特点进行调整。',
  },
  {
    id: 3,
    type: 'judgment',
    ability: 'compliance',
    content: '在商品详情页中使用"世界最好"、"第一"等极限词汇是合规的。',
    options: ['正确', '错误'],
    score: 1,
    correctAnswer: 1,
    analysis: '根据广告法规定，使用极限词汇属于违规行为，可能面临行政处罚风险。',
  },
  {
    id: 4,
    type: 'single',
    ability: 'analysis',
    content: '当独立站转化率突然下降20%时，首先应该分析哪个数据指标？',
    options: [
      '流量来源变化',
      '页面加载速度',
      '商品价格调整',
      '促销活动结束时间',
    ],
    score: 2,
    correctAnswer: 0,
    analysis: '流量来源的变化直接影响用户质量，是分析转化率下降的首要因素。',
  },
  {
    id: 5,
    type: 'case',
    ability: 'risk',
    content: `某独立站收到客户投诉称产品与描述严重不符，客户要求退款并威胁向消费者协会投诉。作为运营人员，请分析：

1. 首先应该采取哪些措施？
2. 如何评估投诉的合理性？
3. 制定什么样的解决方案？
4. 如何预防类似问题再次发生？

请详细作答。`,
    options: [],
    score: 15,
    analysis: '应先安抚客户情绪，核实投诉内容，评估产品描述是否准确，制定合理的退款或补偿方案，并完善产品描述规范和质检流程。',
  },
  {
    id: 6,
    type: 'single',
    ability: 'decision',
    content: '在制定产品定价策略时，以下哪种方法最适合初创独立站？',
    options: [
      '成本加成定价法',
      '竞争对手定价法',
      '价值定价法',
      '撇脂定价法',
    ],
    score: 2,
    correctAnswer: 2,
    analysis: '价值定价法关注客户感知价值，适合初创独立站建立品牌认知和差异化定位。',
  },
  {
    id: 7,
    type: 'multiple',
    ability: 'ai',
    content: '以下哪些场景适合使用AI工具辅助运营？（多选）',
    options: [
      '批量生成产品基础描述',
      '自动回复客户常见问题',
      '制定核心定价策略',
      '分析销售数据趋势',
    ],
    score: 3,
    correctAnswer: [0, 1, 3],
    analysis: 'AI适合处理标准化、重复性工作，核心定价策略需要综合考虑多种因素，应由人工决策。',
  },
  {
    id: 8,
    type: 'judgment',
    ability: 'risk',
    content: '收到客户投诉后，为避免差评应无条件满足客户所有要求。',
    options: ['正确', '错误'],
    score: 1,
    correctAnswer: 1,
    analysis: '应合理评估投诉内容，既保护客户权益，也要维护商家正当利益，避免滥用退换货政策。',
  },
  {
    id: 9,
    type: 'single',
    ability: 'analysis',
    content: '以下哪个指标最能反映独立站的用户粘性？',
    options: [
      '日访问量',
      '跳出率',
      '回访率',
      '页面浏览量',
    ],
    score: 2,
    correctAnswer: 2,
    analysis: '回访率直接反映用户对网站内容和产品的认可度，是衡量用户粘性的核心指标。',
  },
  {
    id: 10,
    type: 'case',
    ability: 'decision',
    content: `某跨境电商店铺主要销售家居用品，近期发现某款产品销量持续下滑。数据分析显示：
- 流量正常，但转化率下降15%
- 竞争对手新增3家，价格低10%
- 客户评价中出现"质量不如以前"的反馈

请制定综合优化方案，包括定价、产品、营销等方面的建议。`,
    options: [],
    score: 20,
    analysis: '应从产品质量提升、差异化定位、增值服务等方面入手，避免单纯价格战。',
  },
];

export default function StudentExamPage() {
  const [activeMenu, setActiveMenu] = useState('exam');
  const [activeTab, setActiveTab] = useState('available');
  const [examState, setExamState] = useState<'list' | 'exam' | 'result' | 'analysis'>('list');
  const [currentExam, setCurrentExam] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [selectedExamForAnalysis, setSelectedExamForAnalysis] = useState<any>(null);

  // 考试计时器
  useEffect(() => {
    if (examState === 'exam' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examState, timeLeft]);

  // 开始考试
  const handleStartExam = (exam: any) => {
    setCurrentExam(exam);
    setExamState('exam');
    setCurrentQuestion(0);
    setAnswers({});
    setMarkedQuestions([]);
    setTimeLeft(exam.duration * 60);
  };

  // 提交答案
  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  // 标记题目
  const toggleMark = (questionId: number) => {
    if (markedQuestions.includes(questionId)) {
      setMarkedQuestions(markedQuestions.filter((id) => id !== questionId));
    } else {
      setMarkedQuestions([...markedQuestions, questionId]);
    }
  };

  // 提交考试
  const handleSubmitExam = useCallback(() => {
    setExamState('result');
    setShowSubmitDialog(false);
  }, []);

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 获取考试状态配置
  const getStatusConfig = (status: string) => {
    const configs = {
      available: { label: '待参加', color: 'bg-green-100 text-green-700', icon: Play },
      completed: { label: '已完成', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
      expired: { label: '已过期', color: 'bg-slate-100 text-slate-500', icon: Clock },
      ongoing: { label: '进行中', color: 'bg-amber-100 text-amber-700', icon: Zap },
    };
    return configs[status as keyof typeof configs] || configs.available;
  };

  // 渲染考试列表
  const renderExamList = () => {
    const filteredExams = mockExams.filter((exam) => {
      if (activeTab === 'available') return exam.status === 'available';
      if (activeTab === 'completed') return exam.status === 'completed';
      if (activeTab === 'expired') return exam.status === 'expired';
      return true;
    });

    return (
      <div className="space-y-4">
        {filteredExams.map((exam) => {
          const status = getStatusConfig(exam.status);
          const StatusIcon = status.icon;

          return (
            <Card key={exam.id} className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-slate-800">{exam.name}</h3>
                      <Badge className={status.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{exam.description || '综合能力测试'}</p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exam.scheduledTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        {exam.duration}分钟
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {exam.questionCount}题
                      </span>
                      <span>满分 {exam.totalScore}分</span>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    {exam.status === 'available' && (
                      <Button size="lg" onClick={() => handleStartExam(exam)}>
                        <Play className="h-4 w-4 mr-2" />
                        开始考试
                      </Button>
                    )}
                    {exam.status === 'completed' && (
                      <div>
                        <p className="text-3xl font-bold text-emerald-600">{exam.score}</p>
                        <p className="text-sm text-slate-500 mb-2">得分</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedExamForAnalysis(exam)}>
                            <Eye className="h-4 w-4 mr-1" />
                            详情
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            成绩单
                          </Button>
                        </div>
                      </div>
                    )}
                    {exam.status === 'expired' && (
                      <Button variant="outline" disabled>
                        已过期
                      </Button>
                    )}
                  </div>
                </div>
                {exam.status === 'completed' && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-slate-500">
                        <span>完成时间: {exam.completedTime}</span>
                        <span className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-amber-500" />
                          排名: 第{exam.rank}名 / {exam.totalStudents}人
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
        
        {filteredExams.length === 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">暂无相关考试</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // 渲染考试界面
  const renderExam = () => {
    const questions = mockExamQuestions;
    const question = questions[currentQuestion];
    const ability = abilityDimensions.find((a) => a.id === question.ability)!;
    const AbilityIcon = ability.icon;

    return (
      <div className="grid grid-cols-12 gap-6">
        {/* 左侧：答题卡 */}
        <Card className="col-span-3 h-fit sticky top-24 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">答题卡</CardTitle>
              <Badge variant="outline" className="text-emerald-600">
                {Object.keys(answers).length}/{questions.length} 已答
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`relative w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    currentQuestion === index
                      ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                      : answers[q.id] !== undefined
                      ? 'bg-emerald-100 text-emerald-700'
                      : markedQuestions.includes(q.id)
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {index + 1}
                  {markedQuestions.includes(q.id) && (
                    <Flag className="absolute -top-1 -right-1 h-3 w-3 text-amber-500" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-4 h-4 rounded bg-emerald-100" />
                <span className="text-slate-500">已答</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-4 h-4 rounded bg-amber-100" />
                <span className="text-slate-500">标记</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-4 h-4 rounded bg-slate-100" />
                <span className="text-slate-500">未答</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 中间：题目内容 */}
        <div className="col-span-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={`${ability.color} text-white`}>
                    <AbilityIcon className="h-3 w-3 mr-1" />
                    {ability.name}
                  </Badge>
                  <Badge variant="outline">
                    {question.type === 'single' ? '单选题' : 
                     question.type === 'multiple' ? '多选题' :
                     question.type === 'judgment' ? '判断题' : '案例分析题'}
                  </Badge>
                  <span className="text-sm text-slate-500">({question.score}分)</span>
                </div>
                <span className="text-sm font-medium text-slate-500">
                  第 {currentQuestion + 1} / {questions.length} 题
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{question.content}</p>
              </div>

              {/* 选项 */}
              {question.type === 'single' && (
                <div className="space-y-3">
                  {question.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(question.id, i)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        answers[question.id] === i
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[question.id] === i
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-slate-300'
                        }`}>
                          {answers[question.id] === i && <CheckCircle className="h-4 w-4" />}
                        </div>
                        <span className="font-medium text-slate-500">{String.fromCharCode(65 + i)}.</span>
                        <span className="text-slate-700">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'multiple' && (
                <div className="space-y-3">
                  {question.options.map((opt, i) => {
                    const selected = (answers[question.id] as number[])?.includes(i) || false;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const current = (answers[question.id] as number[]) || [];
                          if (selected) {
                            handleAnswer(question.id, current.filter((idx) => idx !== i));
                          } else {
                            handleAnswer(question.id, [...current, i]);
                          }
                        }}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          selected
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                            selected
                              ? 'border-emerald-500 bg-emerald-500 text-white'
                              : 'border-slate-300'
                          }`}>
                            {selected && <CheckCircle className="h-4 w-4" />}
                          </div>
                          <span className="font-medium text-slate-500">{String.fromCharCode(65 + i)}.</span>
                          <span className="text-slate-700">{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {question.type === 'judgment' && (
                <div className="flex gap-4">
                  {['正确', '错误'].map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(question.id, i)}
                      className={`flex-1 p-4 rounded-xl border-2 text-center transition-all ${
                        answers[question.id] === i
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <span className="text-lg font-medium">{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'case' && (
                <textarea
                  className="w-full h-48 p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none text-slate-700"
                  placeholder="请在此作答，注意条理清晰、内容完整..."
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                />
              )}

              {/* 导航按钮 */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <Button
                  variant="outline"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  上一题
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleMark(question.id)}
                  className={markedQuestions.includes(question.id) ? 'border-amber-400 text-amber-600' : ''}
                >
                  <Flag className={`h-4 w-4 mr-2 ${markedQuestions.includes(question.id) ? 'text-amber-500' : ''}`} />
                  {markedQuestions.includes(question.id) ? '取消标记' : '标记题目'}
                </Button>
                {currentQuestion < questions.length - 1 ? (
                  <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                    下一题
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={() => setShowSubmitDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    提交试卷
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：考试信息 */}
        <div className="col-span-3 space-y-4">
          {/* 倒计时 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  timeLeft < 600 ? 'bg-red-100' : 'bg-emerald-100'
                }`}>
                  <Timer className={`h-8 w-8 ${timeLeft < 600 ? 'text-red-500' : 'text-emerald-500'}`} />
                </div>
                <p className="text-sm text-slate-500 mb-1">剩余时间</p>
                <p className={`text-4xl font-mono font-bold ${timeLeft < 600 ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
                  {formatTime(timeLeft)}
                </p>
              </div>
              <Progress
                value={(timeLeft / (currentExam.duration * 60)) * 100}
                className={`h-2 mt-4 ${timeLeft < 600 ? 'bg-red-100' : 'bg-emerald-100'}`}
              />
              {timeLeft < 600 && (
                <p className="text-xs text-red-500 text-center mt-2">剩余时间不足10分钟，请注意时间！</p>
              )}
            </CardContent>
          </Card>

          {/* 考试信息 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">考试信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">考试名称</span>
                  <span className="font-medium text-slate-700">{currentExam.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">总题数</span>
                  <span className="font-medium text-slate-700">{questions.length}题</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">满分</span>
                  <span className="font-medium text-slate-700">{currentExam.totalScore}分</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 考试须知 */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">考试须知</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                  请在规定时间内完成答题
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                  可标记不确定的题目
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                  时间到后自动提交
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                  保持网络稳定
                </li>
              </ul>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full" onClick={() => setShowExitDialog(true)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            暂停退出
          </Button>
        </div>
      </div>
    );
  };

  // 渲染成绩结果
  const renderResult = () => {
    const totalScore = 85;
    const abilityScores = {
      decision: 92,
      ai: 78,
      analysis: 85,
      risk: 88,
      compliance: 72,
    };

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">考试已完成</h2>
              <p className="text-slate-500">您的答案已成功提交，以下是成绩分析</p>
            </div>

            {/* 成绩概览 */}
            <div className="grid grid-cols-4 gap-4 p-6 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50 border border-emerald-100 mb-8">
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">得分</p>
                <p className="text-4xl font-bold text-emerald-600">{totalScore}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">用时</p>
                <p className="text-4xl font-bold text-slate-800">85</p>
                <p className="text-xs text-slate-400">分钟</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">排名</p>
                <p className="text-4xl font-bold text-amber-500">8</p>
                <p className="text-xs text-slate-400">/ 50人</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">正确率</p>
                <p className="text-4xl font-bold text-blue-600">85%</p>
              </div>
            </div>

            {/* 能力分析 */}
            <div className="mb-8">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-500" />
                五维能力分析
              </h3>
              <div className="space-y-4">
                {abilityDimensions.map((dim) => {
                  const score = abilityScores[dim.id as keyof typeof abilityScores];
                  return (
                    <div key={dim.id} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${dim.color} flex items-center justify-center`}>
                        <dim.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">{dim.name}</span>
                          <span className="text-sm font-bold text-slate-800">{score}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${dim.color} transition-all duration-500`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => {
                setExamState('list');
                setCurrentExam(null);
              }}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回列表
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setExamState('analysis')}>
                <Eye className="h-4 w-4 mr-2" />
                查看答案解析
              </Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                <Download className="h-4 w-4 mr-2" />
                下载成绩单
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // 渲染答案解析
  const renderAnalysis = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setExamState('result')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回成绩
            </Button>
            <h2 className="text-xl font-bold text-slate-800">答案解析</h2>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            导出解析
          </Button>
        </div>

        {mockExamQuestions.map((question, index) => {
          const ability = abilityDimensions.find((a) => a.id === question.ability)!;
          const AbilityIcon = ability.icon;
          const isCorrect = question.type !== 'case' && 
            JSON.stringify(answers[question.id]) === JSON.stringify(question.correctAnswer);

          return (
            <Card key={question.id} className={`border-0 shadow-md ${isCorrect ? 'border-l-4 border-l-emerald-500' : question.type === 'case' ? '' : 'border-l-4 border-l-red-400'}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isCorrect ? 'bg-emerald-100' : question.type === 'case' ? 'bg-blue-100' : 'bg-red-100'
                  }`}>
                    <span className={`font-bold ${isCorrect ? 'text-emerald-600' : question.type === 'case' ? 'text-blue-600' : 'text-red-600'}`}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`${ability.color} text-white`}>
                        <AbilityIcon className="h-3 w-3 mr-1" />
                        {ability.name}
                      </Badge>
                      <Badge variant="outline">
                        {question.type === 'single' ? '单选题' : 
                         question.type === 'multiple' ? '多选题' :
                         question.type === 'judgment' ? '判断题' : '案例分析题'}
                      </Badge>
                      <span className="text-sm text-slate-500">({question.score}分)</span>
                      {question.type !== 'case' && (
                        <Badge className={isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}>
                          {isCorrect ? '正确' : '错误'}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-3 rounded-lg bg-slate-50 mb-4">
                      <p className="text-slate-800 whitespace-pre-wrap">{question.content}</p>
                    </div>

                    {question.type !== 'case' && (
                      <div className="space-y-2 mb-4">
                        {question.options.map((opt, i) => {
                          const isCorrectOption = Array.isArray(question.correctAnswer) 
                            ? question.correctAnswer.includes(i)
                            : question.correctAnswer === i;
                          const isUserAnswer = Array.isArray(answers[question.id])
                            ? answers[question.id].includes(i)
                            : answers[question.id] === i;

                          return (
                            <div
                              key={i}
                              className={`p-3 rounded-lg border ${
                                isCorrectOption
                                  ? 'border-emerald-300 bg-emerald-50'
                                  : isUserAnswer
                                  ? 'border-red-300 bg-red-50'
                                  : 'border-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{String.fromCharCode(65 + i)}.</span>
                                <span>{opt}</span>
                                {isCorrectOption && <CheckCircle className="h-4 w-4 text-emerald-500 ml-auto" />}
                                {isUserAnswer && !isCorrectOption && <AlertTriangle className="h-4 w-4 text-red-500 ml-auto" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {question.type === 'case' && (
                      <div className="mb-4">
                        <p className="text-sm text-slate-500 mb-2">你的答案：</p>
                        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                          <p className="text-slate-700 whitespace-pre-wrap">{answers[question.id] || '未作答'}</p>
                        </div>
                      </div>
                    )}

                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="text-sm font-medium text-emerald-700 mb-1">解析</p>
                      <p className="text-sm text-slate-600">{question.analysis}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">电商实训平台</h1>
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
                张
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边导航 */}
      <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200/80 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {studentMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                  : item.highlight 
                    ? 'text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {item.highlight && activeMenu !== item.id && (
                <Badge className="ml-auto bg-purple-500 text-white text-xs">AI</Badge>
              )}
            </Link>
          ))}
        </nav>

        {/* AI能力统计 */}
        <div className="mx-4 mt-2 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Brain className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">AI辅助统计</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="text-center p-1.5 bg-white rounded-md">
              <p className="text-base font-bold text-purple-600">23</p>
              <p className="text-slate-500 text-[10px]">AI调用</p>
            </div>
            <div className="text-center p-1.5 bg-white rounded-md">
              <p className="text-base font-bold text-emerald-600">78%</p>
              <p className="text-slate-500 text-[10px]">自主决策</p>
            </div>
          </div>
        </div>

        {/* 风险事件提醒 */}
        <div className="mx-4 mt-2 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-orange-600" />
            <span className="text-xs font-medium text-orange-700">风险事件</span>
            <Badge className="bg-red-500 text-white text-[10px] ml-auto px-1.5 py-0">6 待处理</Badge>
          </div>
          <Link href="/student/risk-events" className="block">
            <Button size="sm" className="w-full h-7 text-xs bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              查看详情
            </Button>
          </Link>
        </div>

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
          {examState === 'list' && (
            <>
              {/* 页面头部 */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">考核中心</h1>
                <p className="text-slate-500 mt-1">参加考试 · 查看成绩 · 能力分析 · 答案解析</p>
              </div>

              {/* 统计卡片 */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-2">
                      <Play className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">2</p>
                    <p className="text-sm text-slate-500">待参加</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">2</p>
                    <p className="text-sm text-slate-500">已完成</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-amber-600" />
                    </div>
                    <p className="text-3xl font-bold text-amber-600">78.5</p>
                    <p className="text-sm text-slate-500">平均分</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600">Top 15%</p>
                    <p className="text-sm text-slate-500">排名</p>
                  </CardContent>
                </Card>
              </div>

              {/* 考试列表 */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white border shadow-sm">
                  <TabsTrigger value="available" className="gap-2">
                    <Play className="h-4 w-4" />
                    待参加
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    已完成
                  </TabsTrigger>
                  <TabsTrigger value="expired" className="gap-2">
                    <Clock className="h-4 w-4" />
                    已过期
                  </TabsTrigger>
                  <TabsTrigger value="all" className="gap-2">
                    <FileText className="h-4 w-4" />
                    全部
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-4">
                  {renderExamList()}
                </TabsContent>
              </Tabs>
            </>
          )}

          {examState === 'exam' && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">{currentExam.name}</h1>
                <p className="text-slate-500 mt-1">在线答题中，请认真作答</p>
              </div>
              {renderExam()}
            </>
          )}

          {examState === 'result' && renderResult()}
          {examState === 'analysis' && renderAnalysis()}
        </div>
      </main>

      {/* 提交确认弹窗 */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认提交试卷？</DialogTitle>
            <DialogDescription>
              您还有 {mockExamQuestions.length - Object.keys(answers).length} 道题目未作答，提交后无法修改。
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowSubmitDialog(false)}>
              继续答题
            </Button>
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmitExam}>
              确认提交
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 退出确认弹窗 */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认退出考试？</DialogTitle>
            <DialogDescription>
              考试进度将自动保存，但计时会继续。建议完成考试后再退出。
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowExitDialog(false)}>
              继续答题
            </Button>
            <Button variant="destructive" className="flex-1" onClick={() => {
              setShowExitDialog(false);
              setExamState('list');
              setCurrentExam(null);
            }}>
              确认退出
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
