'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  Target,
  ShoppingCart,
  Megaphone,
  TrendingUp,
  PieChart,
  Shield,
  ChevronRight,
  Play,
  BookOpen,
  AlertCircle,
  Trophy,
  Star,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const moduleData = {
  id: 2,
  title: '独立站搭建',
  description: '拖拽式装修、商品上传、支付物流配置、GDPR合规设置',
  icon: ShoppingCart,
  progress: 65,
  status: 'in_progress',
  steps: [
    { id: 1, name: '域名申请', description: '申请模拟域名，配置DNS解析', completed: true, score: 95 },
    { id: 2, name: '模板选择', description: '选择店铺模板，了解模板结构', completed: true, score: 90 },
    { id: 3, name: '页面装修', description: '拖拽式装修，设计首页与详情页', completed: true, score: 88 },
    { id: 4, name: '商品上传', description: '上传商品信息、图片、价格', completed: false, current: true, score: null },
    { id: 5, name: '支付配置', description: '配置模拟支付方式，设置收款账户', completed: false, score: null },
    { id: 6, name: '物流设置', description: '设置物流方案与配送区域', completed: false, score: null },
    { id: 7, name: '合规设置', description: 'GDPR合规设置，隐私政策配置', completed: false, score: null },
  ],
};

const relatedResources = [
  { id: 1, title: 'Shopify建站入门教程', type: 'video', duration: '25:30' },
  { id: 2, title: '店铺装修最佳实践', type: 'article', duration: '阅读 5分钟' },
  { id: 3, title: '支付网关配置指南', type: 'pdf', duration: 'PDF 3页' },
];

export default function PracticeDetailPage() {
  const [currentStep, setCurrentStep] = useState(4);

  const completedSteps = moduleData.steps.filter((s) => s.completed).length;
  const totalSteps = moduleData.steps.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link href="/student/dashboard">
                <ArrowLeft className="h-4 w-4" />
                返回控制台
              </Link>
            </Button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <moduleData.icon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">{moduleData.title}</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              查看帮助
            </Button>
            <Button size="sm" className="gap-2">
              <Play className="h-4 w-4" />
              继续实训
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* 进度概览 */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">{moduleData.title}</h2>
              <p className="text-blue-100">{moduleData.description}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{moduleData.progress}%</p>
              <p className="text-sm text-blue-200">完成进度</p>
            </div>
          </div>
          <Progress value={moduleData.progress} className="h-3 bg-white/20" />
          <div className="flex items-center justify-between mt-4 text-sm text-blue-100">
            <span>已完成 {completedSteps}/{totalSteps} 个步骤</span>
            <span>预计剩余时间：45分钟</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：实训步骤 */}
          <div className="col-span-2">
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>实训步骤</CardTitle>
                <CardDescription>按顺序完成以下步骤，每步完成后自动保存进度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moduleData.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        step.completed
                          ? 'bg-green-50 border-green-200'
                          : step.current
                          ? 'bg-blue-50 border-blue-300 shadow-lg shadow-blue-100'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed
                            ? 'bg-green-500 text-white'
                            : step.current
                            ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                            : 'bg-slate-200 text-slate-400'
                        }`}>
                          {step.completed ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span className="font-medium">{step.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-slate-800">{step.name}</h4>
                            {step.completed && step.score !== null && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-amber-600">{step.score}分</span>
                              </div>
                            )}
                            {step.current && (
                              <Badge className="bg-blue-500">当前步骤</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">{step.description}</p>
                          
                          {step.current && (
                            <div className="mt-3 flex items-center gap-3">
                              <Button size="sm" asChild>
                                <Link href="/builder">开始操作</Link>
                              </Button>
                              <Button size="sm" variant="outline">
                                <BookOpen className="h-4 w-4 mr-1" />
                                查看教程
                              </Button>
                            </div>
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 实训要求 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 mt-6">
              <CardHeader>
                <CardTitle>实训要求</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">商品上传要求</p>
                      <ul className="text-sm text-amber-700 mt-1 space-y-1">
                        <li>• 至少上传 5 个商品</li>
                        <li>• 每个商品需包含：名称、描述、价格、图片</li>
                        <li>• 商品图片需为正方形，分辨率不低于 800x800</li>
                        <li>• 价格需设置对比价（原价/折扣价）</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Trophy className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">评分标准</p>
                      <ul className="text-sm text-blue-700 mt-1 space-y-1">
                        <li>• 商品完整性（40%）：信息完整、图片清晰</li>
                        <li>• 商品描述（30%）：描述准确、有吸引力</li>
                        <li>• 价格策略（20%）：定价合理、有竞争力</li>
                        <li>• 分类管理（10%）：分类清晰、标签准确</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：资源与帮助 */}
          <div className="space-y-6">
            {/* 当前任务 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  当前任务
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold mb-2">商品上传</h3>
                <p className="text-blue-100 text-sm mb-4">
                  上传商品信息、图片、价格，至少完成5个商品的上传
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-200">已完成</span>
                    <span className="font-medium">2/5 商品</span>
                  </div>
                  <Progress value={40} className="h-2 bg-white/20" />
                </div>
                <Button className="w-full" variant="secondary" asChild>
                  <Link href="/builder">
                    <Play className="h-4 w-4 mr-2" />
                    继续操作
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 相关资源 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>相关资源</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedResources.map((resource) => (
                    <div key={resource.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        resource.type === 'video' ? 'bg-red-100 text-red-600' :
                        resource.type === 'article' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {resource.type === 'video' && <Play className="h-5 w-5" />}
                        {resource.type === 'article' && <BookOpen className="h-5 w-5" />}
                        {resource.type === 'pdf' && <BookOpen className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 text-sm">{resource.title}</p>
                        <p className="text-xs text-slate-500">{resource.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 技能掌握 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle>技能掌握</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: '域名配置', level: 95 },
                    { name: '页面设计', level: 88 },
                    { name: '商品管理', level: 40 },
                    { name: '支付配置', level: 0 },
                    { name: '物流配置', level: 0 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600">{skill.name}</span>
                        <span className="font-medium">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 提示卡片 */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amber-800 text-sm">温馨提示</p>
                    <p className="text-xs text-amber-700 mt-1">
                      实训过程中可随时保存进度，如遇问题可点击"查看帮助"或向老师提问
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
