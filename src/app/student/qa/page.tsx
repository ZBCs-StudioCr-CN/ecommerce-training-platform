'use client';

import { useState } from 'react';
import {
  Send,
  Clock,
  Search,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StudentLayout } from '@/components/student-layout';

const questions = [
  { id: 1, question: '如何设置GDPR合规弹窗？', course: '独立站搭建', time: '2026-03-26 14:30', status: 'answered', answer: '可以在店铺设置→合规设置中开启GDPR弹窗，系统会自动生成符合欧盟标准的弹窗模板...' },
  { id: 2, question: 'Google Ads关键词出价策略怎么选？', course: '流量推广', time: '2026-03-25 10:00', status: 'pending', answer: null },
  { id: 3, question: '竞品分析报告怎么写？', course: '市场调研', time: '2026-03-24 16:20', status: 'answered', answer: '竞品分析报告应包含以下部分：1.市场概况 2.竞争对手画像 3.产品对比分析...' },
];

export default function StudentQAPage() {
  const [newQuestion, setNewQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentLayout activeMenu="qa">
      <div className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">答疑提问</h2>
          <p className="text-slate-500">向教师提问，查看历史答疑记录</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 提交问题 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>提交问题</CardTitle>
              <CardDescription>选择课程模块，描述你的问题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">课程模块</label>
                  <select className="w-full h-10 px-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>请选择课程模块</option>
                    <option>市场调研与选品</option>
                    <option>独立站搭建</option>
                    <option>流量推广</option>
                    <option>转化运营</option>
                    <option>数据分析</option>
                    <option>合规风控</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">问题描述</label>
                  <Textarea
                    placeholder="请详细描述你的问题..."
                    className="min-h-32"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  <Send className="h-4 w-4 mr-2" />
                  提交问题
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 历史提问 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>历史提问</CardTitle>
                  <CardDescription>查看你的提问记录</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    className="pl-9 w-48"
                    placeholder="搜索问题..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-800">{q.question}</p>
                          {q.status === 'answered' ? (
                            <Badge className="bg-emerald-100 text-emerald-700">已回复</Badge>
                          ) : (
                            <Badge variant="secondary">待回复</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                          <span>{q.course}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {q.time}
                          </span>
                        </div>
                        {q.answer && (
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{q.answer}</p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 常见问题 */}
        <Card className="border-0 shadow-lg mt-6">
          <CardHeader>
            <CardTitle>常见问题</CardTitle>
            <CardDescription>快速找到答案</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {[
                { q: '如何开始实训？', a: '进入实训控制台，选择当前阶段开始' },
                { q: '如何查看成绩？', a: '在考核中心查看所有考核成绩' },
                { q: '如何下载证书？', a: '在成果中心下载已获得的证书' },
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <p className="font-medium text-slate-800">{item.q}</p>
                  <p className="text-sm text-slate-500 mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
