'use client';

import { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Play,
  Star,
  AlertCircle,
  Eye,
  Brain,
  Target,
  LineChart,
  AlertTriangle,
  Shield,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { StudentLayout } from '@/components/student-layout';

const pendingExams = [
  { id: 1, title: '期末综合考核', course: '全链路电商运营', startTime: '2026-03-30 14:00', duration: '90分钟', totalScore: 100, status: 'pending' },
  { id: 2, title: '流量推广测验', course: '流量获取与转化', startTime: '2026-04-02 10:00', duration: '45分钟', totalScore: 50, status: 'pending' },
];

const completedExams = [
  { id: 3, title: '市场调研测验', course: '市场分析', score: 92, totalScore: 100, rank: 3, time: '2026-03-15' },
  { id: 4, title: '独立站搭建考核', course: '店铺搭建', score: 88, totalScore: 100, rank: 5, time: '2026-03-20' },
  { id: 5, title: '理论测试一', course: '电商基础', score: 95, totalScore: 100, rank: 2, time: '2026-03-10' },
];

const examStats = {
  total: 15,
  completed: 12,
  avgScore: 91.5,
  passRate: 100,
};

// 五大评分维度
const scoringDimensions = [
  { 
    name: '自主决策能力', 
    weight: 30, 
    color: 'from-blue-500 to-indigo-500',
    icon: Target,
    description: '学生在AI辅助下独立做出决策的能力',
    score: 78,
  },
  { 
    name: 'AI辅助应用能力', 
    weight: 20, 
    color: 'from-purple-500 to-pink-500',
    icon: Brain,
    description: '有效利用AI工具提升工作效率的能力',
    score: 85,
  },
  { 
    name: '数据复盘与优化', 
    weight: 25, 
    color: 'from-amber-500 to-orange-500',
    icon: LineChart,
    description: '分析数据、发现问题、制定优化方案的能力',
    score: 72,
  },
  { 
    name: '风险应对能力', 
    weight: 15, 
    color: 'from-red-500 to-rose-500',
    icon: AlertTriangle,
    description: '应对突发风险事件、处理危机的能力',
    score: 65,
  },
  { 
    name: '合规与规则意识', 
    weight: 10, 
    color: 'from-emerald-500 to-teal-500',
    icon: Shield,
    description: '遵守平台规则、合法合规运营的意识',
    score: 90,
  },
];

export default function ExamCenterPage() {
  const [dimensions] = useState(scoringDimensions);

  // 计算综合得分
  const overallScore = dimensions.reduce((sum, d) => sum + d.score * d.weight / 100, 0);

  return (
    <StudentLayout activeMenu="exam">
      <div className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-800">考核中心</h2>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              AI融合评分
            </Badge>
          </div>
          <p className="text-slate-500">五大维度科学评估，全面衡量您的真实电商运营能力</p>
        </div>

        {/* 五大评分维度展示 */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  AI融合评分机制
                </CardTitle>
                <CardDescription>根据五大维度综合评估，防范AI抄袭，真实反映您的运营能力</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">综合得分</p>
                <p className="text-3xl font-bold text-purple-600">{Math.round(overallScore)}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {dimensions.map((dim, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dim.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <dim.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-medium text-slate-800 text-sm">{dim.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 mb-2">权重 {dim.weight}%</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-bold text-slate-800">{dim.score}</span>
                    <span className="text-sm text-slate-400">分</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${dim.color} rounded-full`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 评分说明 */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
              <h5 className="font-medium text-purple-800 mb-2">📋 评分机制说明</h5>
              <div className="grid grid-cols-3 gap-4 text-sm text-purple-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-purple-600" />
                  <span>系统自动评分 + 教师人工批改</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-purple-600" />
                  <span>决策相似度检测，防范AI抄袭</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-purple-600" />
                  <span>成绩报表导出，支持教学分析</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-slate-800">{examStats.total}</p>
              <p className="text-sm text-slate-500">总考核数</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-emerald-600">{examStats.completed}</p>
              <p className="text-sm text-slate-500">已完成</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">{examStats.avgScore}</p>
              <p className="text-sm text-slate-500">平均成绩</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-amber-600">{examStats.passRate}%</p>
              <p className="text-sm text-slate-500">通过率</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="pending" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              待完成考核
              <Badge variant="destructive" className="ml-1">{pendingExams.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              已完成考核
            </TabsTrigger>
          </TabsList>

          {/* 待完成考核 */}
          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingExams.map((exam) => (
                <Card key={exam.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <Clock className="h-7 w-7 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{exam.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                            <span>{exam.course}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {exam.startTime}
                            </span>
                            <span>时长 {exam.duration}</span>
                            <span>满分 {exam.totalScore} 分</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-amber-100 text-amber-700">待参加</Badge>
                        <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                          <Play className="h-4 w-4 mr-2" />
                          进入考核
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingExams.length === 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">暂无待完成考核</h3>
                    <p className="text-slate-500">继续保持学习，等待老师发布新考核</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* 已完成考核 */}
          <TabsContent value="completed">
            <div className="space-y-4">
              {completedExams.map((exam) => (
                <Card key={exam.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          exam.score >= 90 ? 'bg-emerald-100' : exam.score >= 60 ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          <span className={`text-2xl font-bold ${
                            exam.score >= 90 ? 'text-emerald-600' : exam.score >= 60 ? 'text-blue-600' : 'text-red-600'
                          }`}>{exam.score}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{exam.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                            <span>{exam.course}</span>
                            <span>完成时间：{exam.time}</span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-amber-500" />
                              班级排名第 {exam.rank} 名
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-100 text-emerald-700">已通过</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
