'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Eye,
  Star,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
  FileDown,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StudentLayout } from '@/components/student-layout';

const practiceReports = [
  { id: 1, title: '市场调研与选品实训报告', module: '市场调研', score: 92, date: '2026-03-15', status: 'completed' },
  { id: 2, title: '独立站搭建实训报告', module: '独立站搭建', score: null, date: '2026-03-26', status: 'in_progress' },
];

const certificates = [
  { id: 1, title: '市场调研与选品专项证书', issueDate: '2026-03-16', issuer: '电商学院', type: 'module' },
  { id: 2, title: '跨境电商技能竞赛三等奖', issueDate: '2026-03-20', issuer: '教务处', type: 'competition' },
];

const portfolio = {
  totalPractices: 12,
  completedModules: 1,
  avgScore: 92,
  rank: 3,
  skills: [
    { name: '市场调研', score: 92 },
    { name: '独立站搭建', score: 65 },
    { name: '流量推广', score: 0 },
    { name: '转化运营', score: 0 },
    { name: '数据分析', score: 0 },
    { name: '合规风控', score: 0 },
  ],
};

export default function AchievementPage() {
  return (
    <StudentLayout activeMenu="achievement">
      <div className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">成果中心</h2>
          <p className="text-slate-500">查看实训报告、证书和技能档案</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-slate-800">{portfolio.totalPractices}</p>
              <p className="text-sm text-slate-500">实训次数</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-emerald-600">{portfolio.completedModules}</p>
              <p className="text-sm text-slate-500">完成模块</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">{portfolio.avgScore}</p>
              <p className="text-sm text-slate-500">平均成绩</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-amber-600">#{portfolio.rank}</p>
              <p className="text-sm text-slate-500">班级排名</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 实训报告 */}
          <div className="col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>实训报告</CardTitle>
                <CardDescription>查看和下载实训报告</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {practiceReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          report.status === 'completed' ? 'bg-emerald-100' : 'bg-amber-100'
                        }`}>
                          {report.status === 'completed' ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                          ) : (
                            <Target className="h-6 w-6 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">{report.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                            <span>{report.module}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {report.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {report.score ? (
                          <Badge className="bg-emerald-100 text-emerald-700">{report.score}分</Badge>
                        ) : (
                          <Badge variant="secondary">进行中</Badge>
                        )}
                        {report.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            下载
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 技能档案 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>技能档案</CardTitle>
                <CardDescription>各模块技能掌握情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {portfolio.skills.map((skill) => (
                    <div key={skill.name} className="p-4 rounded-xl bg-slate-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-700">{skill.name}</span>
                        <span className="text-sm text-slate-500">{skill.score}%</span>
                      </div>
                      <Progress value={skill.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 证书 */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>我的证书</CardTitle>
                <CardDescription>获得的证书和荣誉</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          cert.type === 'module' ? 'bg-emerald-100' : 'bg-amber-100'
                        }`}>
                          <Award className={`h-5 w-5 ${
                            cert.type === 'module' ? 'text-emerald-600' : 'text-amber-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{cert.title}</p>
                          <p className="text-xs text-slate-500">{cert.issuer} · {cert.issueDate}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          查看
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          下载
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 成就展示 */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  成就展示
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/20">
                    <p className="font-medium">🎉 首次完成模块</p>
                    <p className="text-sm text-emerald-100 mt-1">完成市场调研模块</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/20">
                    <p className="font-medium">⚡ 学习达人</p>
                    <p className="text-sm text-emerald-100 mt-1">连续学习7天</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
