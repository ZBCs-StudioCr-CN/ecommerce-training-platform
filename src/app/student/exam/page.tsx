'use client';

import { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Play,
  Star,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentLayout } from '@/components/student-layout';

const pendingExams = [
  { id: 1, title: '期末综合考核', course: '独立站运营', startTime: '2026-03-30 14:00', duration: '90分钟', totalScore: 100, status: 'pending' },
  { id: 2, title: '流量推广测验', course: '流量推广', startTime: '2026-04-02 10:00', duration: '45分钟', totalScore: 50, status: 'pending' },
];

const completedExams = [
  { id: 3, title: '市场调研测验', course: '市场调研与选品', score: 92, totalScore: 100, rank: 3, time: '2026-03-15' },
  { id: 4, title: '独立站搭建考核', course: '独立站搭建', score: 88, totalScore: 100, rank: 5, time: '2026-03-20' },
  { id: 5, title: '理论测试一', course: '独立站认知', score: 95, totalScore: 100, rank: 2, time: '2026-03-10' },
];

const examStats = {
  total: 15,
  completed: 12,
  avgScore: 91.5,
  passRate: 100,
};

export default function ExamCenterPage() {
  return (
    <StudentLayout activeMenu="exam">
      <div className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">考核中心</h2>
          <p className="text-slate-500">完成考核答题、实操考核，查看成绩与错题解析</p>
        </div>

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
