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
  Brain,
  LineChart,
  AlertTriangle,
  Shield,
  Sparkles,
  FileText,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StudentLayout } from '@/components/student-layout';
import { FIVE_DIMENSIONS } from '@/data/ability-practice';

const practiceReports = [
  { id: 1, title: '市场调研与选品实训报告', module: '市场调研', score: 92, date: '2026-03-15', status: 'completed' },
  { id: 2, title: '独立站搭建实训报告', module: '独立站搭建', score: null, date: '2026-03-26', status: 'in_progress' },
];

const certificates = [
  { id: 1, title: '市场调研与选品专项证书', issueDate: '2026-03-16', issuer: '电商学院', type: 'module' },
  { id: 2, title: '跨境电商技能竞赛三等奖', issueDate: '2026-03-20', issuer: '教务处', type: 'competition' },
];

// 图标映射
const iconMap: Record<string, React.ElementType> = {
  Target,
  Brain,
  TrendingUp,
  AlertTriangle,
  Shield,
};

// 五维能力雷达图数据 - 使用固定值避免hydration错误
const abilityRadar = {
  dimensions: FIVE_DIMENSIONS.map((dim, index) => ({
    id: dim.id,
    name: dim.name,
    // 使用固定值替代随机数
    value: [78, 85, 72, 65, 90][index],
    weight: dim.weight,
    color: dim.color,
    icon: iconMap[dim.icon] || Target,
  })),
  overall: 0,
};

// 计算综合得分
abilityRadar.overall = Math.round(
  abilityRadar.dimensions.reduce((sum, d) => sum + d.value * d.weight, 0) / 
  abilityRadar.dimensions.reduce((sum, d) => sum + d.weight, 0)
);

const portfolio = {
  totalPractices: 12,
  completedModules: 1,
  avgScore: 92,
  rank: 3,
  aiCalls: 23,
  autonomousRate: 78,
};

export default function AchievementPage() {
  const [radar] = useState(abilityRadar);

  return (
    <StudentLayout activeMenu="achievement">
      <div className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-800">成果中心</h2>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              AI融合版
            </Badge>
          </div>
          <p className="text-slate-500">能力雷达图 · 实训报告 · 作品集 · 证书档案</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold">{radar.overall}%</p>
              <p className="text-sm text-purple-100">综合能力</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-slate-800">{portfolio.totalPractices}</p>
              <p className="text-sm text-slate-500">实训次数</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-emerald-600">{portfolio.completedModules}</p>
              <p className="text-sm text-slate-500">完成模块</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-blue-600">{portfolio.avgScore}</p>
              <p className="text-sm text-slate-500">平均成绩</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-amber-600">#{portfolio.rank}</p>
              <p className="text-sm text-slate-500">班级排名</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：能力雷达图 + 五大维度 */}
          <div className="space-y-6">
            {/* 能力雷达图 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-purple-600" />
                  能力雷达图
                </CardTitle>
                <CardDescription>五维能力评估</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 雷达图 SVG */}
                <div className="flex justify-center mb-4">
                  <svg width="280" height="280" viewBox="0 0 280 280">
                    {(() => {
                      const centerX = 140;
                      const centerY = 140;
                      const maxRadius = 100;
                      const levels = 5;
                      const dimensions = radar.dimensions;
                      const numDimensions = dimensions.length;
                      
                      // 计算每个维度的角度
                      const angleStep = (2 * Math.PI) / numDimensions;
                      const startAngle = -Math.PI / 2; // 从顶部开始
                      
                      // 计算顶点位置
                      const getPoint = (index: number, radius: number) => {
                        const angle = startAngle + index * angleStep;
                        return {
                          x: centerX + radius * Math.cos(angle),
                          y: centerY + radius * Math.sin(angle)
                        };
                      };
                      
                      // 绘制网格线
                      const gridLines = [];
                      for (let level = 1; level <= levels; level++) {
                        const radius = (maxRadius / levels) * level;
                        const points = dimensions.map((_, i) => {
                          const p = getPoint(i, radius);
                          return `${p.x},${p.y}`;
                        }).join(' ');
                        gridLines.push(
                          <polygon
                            key={`grid-${level}`}
                            points={points}
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="1"
                          />
                        );
                      }
                      
                      // 绘制轴线
                      const axisLines = dimensions.map((_, i) => {
                        const p = getPoint(i, maxRadius);
                        return (
                          <line
                            key={`axis-${i}`}
                            x1={centerX}
                            y1={centerY}
                            x2={p.x}
                            y2={p.y}
                            stroke="#cbd5e1"
                            strokeWidth="1"
                          />
                        );
                      });
                      
                      // 绘制数据多边形
                      const dataPoints = dimensions.map((dim, i) => {
                        const radius = (dim.value / 100) * maxRadius;
                        return getPoint(i, radius);
                      });
                      const dataPolygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
                      
                      // 绘制数据点和标签
                      const dataPointsElements = dimensions.map((dim, i) => {
                        const radius = (dim.value / 100) * maxRadius;
                        const p = getPoint(i, radius);
                        const labelP = getPoint(i, maxRadius + 25);
                        
                        return (
                          <g key={`data-${i}`}>
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="5"
                              fill={dim.color}
                              stroke="white"
                              strokeWidth="2"
                            />
                            <text
                              x={labelP.x}
                              y={labelP.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-xs font-medium"
                              fill="#475569"
                            >
                              {dim.name}
                            </text>
                            <text
                              x={labelP.x}
                              y={labelP.y + 14}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-xs font-bold"
                              fill={dim.color}
                            >
                              {dim.value}%
                            </text>
                          </g>
                        );
                      });
                      
                      return (
                        <>
                          {/* 网格 */}
                          {gridLines}
                          {/* 轴线 */}
                          {axisLines}
                          {/* 数据区域 */}
                          <polygon
                            points={dataPolygonPoints}
                            fill="url(#radarGradient)"
                            fillOpacity="0.3"
                            stroke="#8b5cf6"
                            strokeWidth="2"
                          />
                          {/* 数据点 */}
                          {dataPointsElements}
                          {/* 渐变定义 */}
                          <defs>
                            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                        </>
                      );
                    })()}
                  </svg>
                </div>

                {/* 综合得分 */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">综合能力得分</p>
                      <p className="text-2xl font-bold text-purple-600">{radar.overall}%</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-purple-200 flex items-center justify-center bg-white">
                      <span className="text-xl font-bold text-purple-600">{radar.overall}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 五大评分维度 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  五大评分维度
                </CardTitle>
                <CardDescription>AI融合评分机制</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {radar.dimensions.map((dim, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: dim.color }}
                      >
                        <span className="text-white text-xs font-bold">{dim.weight}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">{dim.name}</span>
                          <span className="text-sm font-bold" style={{ color: dim.color }}>{dim.value}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: `${dim.value}%`, backgroundColor: dim.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 中间：实训报告 */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-emerald-600" />
                      实训报告
                    </CardTitle>
                    <CardDescription>自动生成，支持导出</CardDescription>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600">
                    <Download className="h-4 w-4 mr-1" />
                    导出全部
                  </Button>
                </div>
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

            {/* AI使用统计 */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI使用统计
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/20">
                    <p className="text-3xl font-bold">{portfolio.aiCalls}</p>
                    <p className="text-sm text-purple-100">AI调用次数</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/20">
                    <p className="text-3xl font-bold">{portfolio.autonomousRate}%</p>
                    <p className="text-sm text-purple-100">自主决策比例</p>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-white/10">
                  <p className="text-sm text-purple-100">
                    💡 您的自主决策比例为{portfolio.autonomousRate}%，展现了良好的独立思考能力！
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：证书 + 成就 */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  我的证书
                </CardTitle>
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
                  <div className="p-3 rounded-lg bg-white/20">
                    <p className="font-medium">🧠 AI驾驭者</p>
                    <p className="text-sm text-emerald-100 mt-1">自主决策比例超过70%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 个人电商运营作品集 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-600" />
                  个人作品集
                </CardTitle>
                <CardDescription>电商运营能力证明</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">完成更多实训模块，生成您的个人电商运营作品集</p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    生成作品集
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
