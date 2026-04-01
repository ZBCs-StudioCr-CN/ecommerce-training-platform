'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentSidebar, StudentHeader } from '@/components/student-layout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// 五维能力配置
const abilityDimensions = [
  { id: 'decision', name: '自主决策能力', icon: Target, color: 'bg-blue-500' },
  { id: 'ai', name: 'AI辅助应用', icon: Brain, color: 'bg-purple-500' },
  { id: 'analysis', name: '数据复盘与优化', icon: TrendingUp, color: 'bg-green-500' },
  { id: 'risk', name: '风险应对', icon: AlertTriangle, color: 'bg-amber-500' },
  { id: 'compliance', name: '合规与规则意识', icon: Shield, color: 'bg-red-500' },
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
];

// 模拟考试题目
const mockExamQuestions: Array<{
  id: number;
  type: string;
  ability: string;
  content: string;
  options: string[];
  score: number;
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
  },
  {
    id: 3,
    type: 'judgment',
    ability: 'compliance',
    content: '在商品详情页中使用"世界最好"、"第一"等极限词汇是合规的。',
    options: ['正确', '错误'],
    score: 1,
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
  },
];

export default function StudentExamPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('available');
  const [examState, setExamState] = useState<'list' | 'exam' | 'result'>('list');
  const [currentExam, setCurrentExam] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);

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
    setShowResultDialog(true);
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
      available: { label: '可参加', color: 'bg-green-100 text-green-700', icon: Play },
      completed: { label: '已完成', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
      expired: { label: '已过期', color: 'bg-slate-100 text-slate-500', icon: Clock },
      ongoing: { label: '进行中', color: 'bg-amber-100 text-amber-700', icon: Zap },
    };
    return configs[status as keyof typeof configs] || configs.available;
  };

  // 渲染考试列表
  const renderExamList = () => (
    <div className="space-y-4">
      {mockExams
        .filter((exam) => {
          if (activeTab === 'available') return exam.status === 'available';
          if (activeTab === 'completed') return exam.status === 'completed';
          return true;
        })
        .map((exam) => {
          const status = getStatusConfig(exam.status);
          const StatusIcon = status.icon;

          return (
            <Card key={exam.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
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
                    <p className="text-sm text-slate-500 mb-3">{exam.description}</p>
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
                  <div className="ml-6">
                    {exam.status === 'available' && (
                      <Button size="lg" onClick={() => handleStartExam(exam)}>
                        <Play className="h-4 w-4 mr-2" />
                        开始考试
                      </Button>
                    )}
                    {exam.status === 'completed' && (
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">{exam.score}</p>
                        <p className="text-sm text-slate-500">得分</p>
                        <Button variant="outline" className="mt-2" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          查看详情
                        </Button>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-500">
                          完成时间: {exam.completedTime}
                        </span>
                        <span className="text-slate-500">
                          用时: 85分钟
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-amber-500" />
                          排名: 第{exam.rank}名 / {exam.totalStudents}人
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          下载成绩单
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
    </div>
  );

  // 渲染考试界面
  const renderExam = () => {
    const questions = mockExamQuestions;
    const question = questions[currentQuestion];
    const ability = abilityDimensions.find((a) => a.id === question.ability)!;
    const AbilityIcon = ability.icon;

    return (
      <div className="grid grid-cols-4 gap-6">
        {/* 左侧：答题卡 */}
        <Card className="border-0 shadow-lg col-span-1 h-fit sticky top-24">
          <CardHeader>
            <CardTitle className="text-base">答题卡</CardTitle>
            <CardDescription>
              已答 {Object.keys(answers).length} / {questions.length} 题
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    currentQuestion === index
                      ? 'bg-blue-500 text-white'
                      : answers[q.id] !== undefined
                      ? 'bg-green-100 text-green-700'
                      : markedQuestions.includes(q.id)
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {index + 1}
                  {markedQuestions.includes(q.id) && (
                    <Flag className="h-2 w-2 mx-auto mt-0.5" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="w-4 h-4 rounded bg-green-100" /> 已答
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="w-4 h-4 rounded bg-amber-100" /> 标记
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-4 h-4 rounded bg-slate-100" /> 未答
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 中间：题目内容 */}
        <Card className="border-0 shadow-lg col-span-2">
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
              <span className="text-sm text-slate-500">
                第 {currentQuestion + 1} / {questions.length} 题
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50">
              <p className="text-slate-800 whitespace-pre-wrap">{question.content}</p>
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
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[question.id] === i
                          ? 'border-blue-500 bg-blue-500 text-white'
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
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          selected
                            ? 'border-blue-500 bg-blue-500 text-white'
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
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-lg font-medium">{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {question.type === 'case' && (
              <textarea
                className="w-full h-48 p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                placeholder="请在此作答..."
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
                <Button onClick={() => setShowSubmitDialog(true)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  提交试卷
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 右侧：考试信息 */}
        <div className="space-y-4">
          {/* 倒计时 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <Timer className={`h-8 w-8 mx-auto mb-2 ${timeLeft < 600 ? 'text-red-500' : 'text-blue-500'}`} />
                <p className="text-sm text-slate-500 mb-1">剩余时间</p>
                <p className={`text-4xl font-mono font-bold ${timeLeft < 600 ? 'text-red-500' : 'text-slate-800'}`}>
                  {formatTime(timeLeft)}
                </p>
              </div>
              <Progress
                value={(timeLeft / (currentExam.duration * 60)) * 100}
                className={`h-2 mt-4 ${timeLeft < 600 ? 'bg-red-100' : ''}`}
              />
            </CardContent>
          </Card>

          {/* 考试须知 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base">考试须知</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• 请在规定时间内完成答题</li>
                <li>• 可标记不确定的题目稍后查看</li>
                <li>• 时间到后将自动提交试卷</li>
                <li>• 答题过程中请保持网络稳定</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // 渲染成绩结果
  const renderResult = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">考试已完成</h2>
            <p className="text-slate-500">您的答案已成功提交</p>
          </div>

          <div className="grid grid-cols-3 gap-4 p-6 rounded-xl bg-slate-50 mb-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">得分</p>
              <p className="text-4xl font-bold text-blue-600">85</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">用时</p>
              <p className="text-4xl font-bold text-slate-800">85</p>
              <p className="text-xs text-slate-400">分钟</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">排名</p>
              <p className="text-4xl font-bold text-amber-500">8</p>
              <p className="text-xs text-slate-400">/ 50人</p>
            </div>
          </div>

          {/* 能力分析 */}
          <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-4 text-left">能力维度分析</h3>
            <div className="space-y-3">
              {abilityDimensions.map((dim) => {
                const scores: Record<string, number> = {
                  decision: 92,
                  ai: 78,
                  analysis: 85,
                  risk: 88,
                  compliance: 72,
                };
                return (
                  <div key={dim.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded ${dim.color} flex items-center justify-center`}>
                      <dim.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="flex-1 text-sm text-slate-600 text-left">{dim.name}</span>
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${dim.color}`}
                        style={{ width: `${scores[dim.id]}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700 w-12 text-right">{scores[dim.id]}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => {
              setExamState('list');
              setCurrentExam(null);
            }}>
              返回列表
            </Button>
            <Button variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              查看答案解析
            </Button>
            <Button className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              下载成绩单
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <StudentSidebar />
      <StudentHeader />

      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {examState === 'list' && (
            <>
              {/* 页面头部 */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">考试中心</h1>
                <p className="text-slate-500 mt-1">参加考试 · 查看成绩 · 能力分析</p>
              </div>

              {/* 统计卡片 */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">3</p>
                    <p className="text-sm text-slate-500">待参加</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">8</p>
                    <p className="text-sm text-slate-500">已完成</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-amber-500">78.5</p>
                    <p className="text-sm text-slate-500">平均分</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-purple-600">Top 15%</p>
                    <p className="text-sm text-slate-500">排名</p>
                  </CardContent>
                </Card>
              </div>

              {/* 考试列表 */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white border shadow-sm">
                  <TabsTrigger value="available">待参加</TabsTrigger>
                  <TabsTrigger value="completed">已完成</TabsTrigger>
                  <TabsTrigger value="all">全部</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-4">
                  {renderExamList()}
                </TabsContent>
              </Tabs>
            </>
          )}

          {examState === 'exam' && renderExam()}
          {examState === 'result' && renderResult()}
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
            <Button className="flex-1" onClick={handleSubmitExam}>
              确认提交
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
