'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, BookOpen, Store, Award, FileText, MessageCircle, Bell, Globe,
  ChevronLeft, ChevronRight, Save, Shield, AlertTriangle, CheckCircle, XCircle, FileText as FileIcon, Globe2, Lock, Scale, CreditCard, Truck, AlertCircle, ExternalLink, Play, Clock, User, Building2, BookMarked, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  { id: 1, title: 'GDPR合规设置', status: 'completed' },
  { id: 2, title: '隐私政策配置', status: 'completed' },
  { id: 3, title: '风险场景学习', status: 'in_progress' },
  { id: 4, title: '应急处理演练', status: 'pending' },
  { id: 5, title: '合规检查清单', status: 'pending' },
];

interface RiskScenario {
  id: string;
  title: string;
  category: 'policy' | 'payment' | 'shipping' | 'data' | 'product';
  description: string;
  impact: string;
  solution: string;
  status: 'pending' | 'learning' | 'completed';
}

interface ComplianceCheck {
  id: string;
  category: string;
  items: { name: string; status: 'pass' | 'fail' | 'pending'; details?: string }[];
}

const riskScenarios: RiskScenario[] = [
  {
    id: '1',
    title: '广告账户被封禁',
    category: 'policy',
    description: '您的Facebook广告账户因违反平台政策被封禁，所有广告投放被迫停止。',
    impact: '流量下降80%，订单量减少70%，直接影响当月营收目标。',
    solution: '1. 立即申诉并提供整改证据\n2. 启用备用广告账户\n3. 调整投放策略，分散渠道风险\n4. 检查广告内容合规性',
    status: 'pending',
  },
  {
    id: '2',
    title: '物流延误投诉激增',
    category: 'shipping',
    description: '受国际物流影响，大量订单出现严重延误，客户投诉量激增。',
    impact: '退款率上升15%，客户满意度下降，品牌声誉受损。',
    solution: '1. 主动联系受影响客户说明情况\n2. 提供补偿方案（优惠券/部分退款）\n3. 更新发货时效预期\n4. 储备多家物流渠道',
    status: 'pending',
  },
  {
    id: '3',
    title: '侵权投诉通知',
    category: 'product',
    description: '收到知识产权侵权投诉，某商品涉嫌侵犯第三方商标权。',
    impact: '商品被下架，可能面临法律诉讼和罚款。',
    solution: '1. 立即下架涉诉商品\n2. 核实授权资质\n3. 联系投诉方协商解决\n4. 完善商品审核流程',
    status: 'pending',
  },
  {
    id: '4',
    title: '汇率大幅波动',
    category: 'payment',
    description: '美元汇率出现大幅波动，导致利润空间被压缩。',
    impact: '成本上涨，利润率下降5-10个百分点。',
    solution: '1. 调整定价策略\n2. 使用汇率锁定工具\n3. 优化支付方式选择\n4. 建立汇率预警机制',
    status: 'pending',
  },
  {
    id: '5',
    title: '数据泄露事件',
    category: 'data',
    description: '发现客户信息可能被泄露，涉及姓名、邮箱等敏感数据。',
    impact: '面临GDPR罚款，客户信任度下降，可能引发集体诉讼。',
    solution: '1. 立即启动应急响应\n2. 通知受影响客户\n3. 加强数据安全措施\n4. 配合监管机构调查',
    status: 'pending',
  },
];

const complianceChecks: ComplianceCheck[] = [
  {
    id: '1',
    category: 'GDPR合规',
    items: [
      { name: 'Cookie同意弹窗', status: 'pass' },
      { name: '隐私政策页面', status: 'pass' },
      { name: '数据主体权利说明', status: 'pass' },
      { name: '数据保留政策', status: 'pending' },
    ],
  },
  {
    id: '2',
    category: '支付合规',
    items: [
      { name: 'PCI DSS认证', status: 'pass' },
      { name: '支付方式图标展示', status: 'pass' },
      { name: '安全徽章展示', status: 'pass' },
      { name: '退款政策说明', status: 'pass' },
    ],
  },
  {
    id: '3',
    category: '产品合规',
    items: [
      { name: '产品描述准确性', status: 'pass' },
      { name: '禁止销售商品检查', status: 'pass' },
      { name: '产品认证标识', status: 'pending' },
    ],
  },
  {
    id: '4',
    category: '物流合规',
    items: [
      { name: '发货时效说明', status: 'pass' },
      { name: '物流追踪功能', status: 'pass' },
      { name: '关税说明', status: 'pending' },
    ],
  },
];

const categoryIcons: Record<string, typeof Shield> = {
  policy: FileText,
  payment: CreditCard,
  shipping: Truck,
  data: Lock,
  product: AlertTriangle,
};

const categoryColors: Record<string, string> = {
  policy: 'from-red-500 to-orange-500',
  payment: 'from-green-500 to-emerald-500',
  shipping: 'from-blue-500 to-cyan-500',
  data: 'from-violet-500 to-purple-500',
  product: 'from-amber-500 to-yellow-500',
};

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('scenarios');
  const [currentStep, setCurrentStep] = useState(3);
  const [scenarios, setScenarios] = useState(riskScenarios);
  const [selectedScenario, setSelectedScenario] = useState<RiskScenario | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  // GDPR Settings State
  const [gdprSettings, setGdprSettings] = useState({
    cookieConsent: true,
    privacyPolicy: true,
    dataRetention: '12',
    rightToAccess: true,
    rightToDelete: true,
    rightToPortability: true,
  });

  const handleStartScenario = (scenario: RiskScenario) => {
    setSelectedScenario(scenario);
    setShowSolution(false);
    setUserAnswer('');
    setScenarios(scenarios.map(s => 
      s.id === scenario.id ? { ...s, status: 'learning' } : s
    ));
  };

  const handleSubmitAnswer = () => {
    setShowSolution(true);
    if (selectedScenario) {
      setScenarios(scenarios.map(s => 
        s.id === selectedScenario.id ? { ...s, status: 'completed' } : s
      ));
    }
  };

  const getComplianceScore = () => {
    let total = 0;
    let passed = 0;
    complianceChecks.forEach(check => {
      check.items.forEach(item => {
        total++;
        if (item.status === 'pass') passed++;
      });
    });
    return Math.round((passed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-slate-700 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <Link href="/student/practice" className="flex items-center gap-2 text-slate-400 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm">返回实训列表</span>
            </Link>
            <div className="w-px h-6 bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-zinc-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium">合规风控实训</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
              合规评分: {getComplianceScore()}%
            </div>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Save className="h-4 w-4 mr-2" />保存进度
            </Button>
          </div>
        </div>
      </header>

      {/* Steps */}
      <div className="fixed top-14 left-0 right-0 h-12 bg-white border-b z-40">
        <div className="flex items-center h-full px-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                  currentStep === step.id 
                    ? 'bg-slate-800 text-white' 
                    : step.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-slate-100 text-slate-500'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <span className="text-xs font-bold">{step.id}</span>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && <ChevronRight className="h-4 w-4 text-slate-300 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border rounded-lg p-1">
              <TabsTrigger value="scenarios">风险场景</TabsTrigger>
              <TabsTrigger value="gdpr">GDPR设置</TabsTrigger>
              <TabsTrigger value="privacy">隐私政策</TabsTrigger>
              <TabsTrigger value="checklist">合规检查</TabsTrigger>
              <TabsTrigger value="knowledge">知识库</TabsTrigger>
            </TabsList>

            <TabsContent value="scenarios" className="mt-4">
              <div className="grid grid-cols-3 gap-6">
                {/* Scenario List */}
                <div className="col-span-2 space-y-4">
                  {scenarios.map((scenario) => {
                    const Icon = categoryIcons[scenario.category];
                    return (
                      <Card 
                        key={scenario.id} 
                        className={`border-0 shadow-lg cursor-pointer transition-all ${
                          selectedScenario?.id === scenario.id ? 'ring-2 ring-slate-500' : ''
                        }`}
                        onClick={() => handleStartScenario(scenario)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[scenario.category]} flex items-center justify-center`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-slate-800">{scenario.title}</h3>
                                <Badge className={
                                  scenario.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                  scenario.status === 'learning' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                }>
                                  {scenario.status === 'completed' ? '已完成' : scenario.status === 'learning' ? '学习中' : '待学习'}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 line-clamp-2">{scenario.description}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              {scenario.status === 'completed' ? '复习' : '开始学习'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Scenario Detail */}
                <div>
                  <Card className="border-0 shadow-lg sticky top-32">
                    <CardHeader>
                      <CardTitle>场景详情</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedScenario ? (
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-bold text-slate-800 mb-2">{selectedScenario.title}</h3>
                            <p className="text-sm text-slate-600">{selectedScenario.description}</p>
                          </div>
                          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-sm font-medium text-red-800">影响</p>
                            <p className="text-sm text-red-600">{selectedScenario.impact}</p>
                          </div>
                          
                          <div>
                            <Label>你的处理方案</Label>
                            <Textarea 
                              className="mt-1" 
                              placeholder="请描述你会如何处理这个风险场景..."
                              rows={4}
                              value={userAnswer}
                              onChange={(e) => setUserAnswer(e.target.value)}
                            />
                          </div>

                          {!showSolution ? (
                            <Button className="w-full" onClick={handleSubmitAnswer} disabled={!userAnswer.trim()}>
                              提交答案
                            </Button>
                          ) : (
                            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                              <p className="text-sm font-medium text-emerald-800 mb-2">参考解决方案</p>
                              <pre className="text-sm text-emerald-700 whitespace-pre-wrap">{selectedScenario.solution}</pre>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-400">
                          <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                          <p>选择一个风险场景开始学习</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gdpr" className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>GDPR合规设置</CardTitle>
                    <CardDescription>配置符合欧盟GDPR法规的网站设置</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { key: 'cookieConsent', label: 'Cookie同意弹窗', desc: '首次访问时显示Cookie使用说明' },
                        { key: 'privacyPolicy', label: '隐私政策页面', desc: '创建并链接隐私政策页面' },
                        { key: 'rightToAccess', label: '数据访问权', desc: '用户可请求查看其个人数据' },
                        { key: 'rightToDelete', label: '数据删除权', desc: '用户可请求删除其个人数据' },
                        { key: 'rightToPortability', label: '数据可携带权', desc: '用户可导出其个人数据' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-800">{item.label}</p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </div>
                          <button
                            className={`w-12 h-6 rounded-full transition-colors ${
                              gdprSettings[item.key as keyof typeof gdprSettings] ? 'bg-emerald-500' : 'bg-slate-300'
                            }`}
                            onClick={() => setGdprSettings({
                              ...gdprSettings,
                              [item.key]: !gdprSettings[item.key as keyof typeof gdprSettings]
                            })}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              gdprSettings[item.key as keyof typeof gdprSettings] ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      ))}

                      <div>
                        <Label>数据保留期限（月）</Label>
                        <Select value={gdprSettings.dataRetention} onValueChange={(v) => setGdprSettings({...gdprSettings, dataRetention: v})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6个月</SelectItem>
                            <SelectItem value="12">12个月</SelectItem>
                            <SelectItem value="24">24个月</SelectItem>
                            <SelectItem value="36">36个月</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>合规状态预览</CardTitle>
                    <CardDescription>当前GDPR设置合规状态</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
                        Object.values(gdprSettings).every(v => v || v === gdprSettings.dataRetention) 
                          ? 'bg-emerald-100' : 'bg-amber-100'
                      }`}>
                        {Object.values(gdprSettings).every(v => v || v === gdprSettings.dataRetention) ? (
                          <CheckCircle className="h-12 w-12 text-emerald-500" />
                        ) : (
                          <AlertTriangle className="h-12 w-12 text-amber-500" />
                        )}
                      </div>
                      <p className="text-lg font-bold mt-4">
                        {Object.values(gdprSettings).every(v => v || v === gdprSettings.dataRetention) 
                          ? 'GDPR合规' : '需要完善'}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        {Object.values(gdprSettings).filter(v => v || v === gdprSettings.dataRetention).length} / {Object.keys(gdprSettings).length} 项已完成
                      </p>
                    </div>

                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-slate-800 mb-2">待完成项目</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {!gdprSettings.cookieConsent && <li>• 启用Cookie同意弹窗</li>}
                        {!gdprSettings.rightToAccess && <li>• 实现数据访问权功能</li>}
                        {!gdprSettings.rightToDelete && <li>• 实现数据删除权功能</li>}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>隐私政策编辑器</CardTitle>
                  <CardDescription>创建符合国际标准的隐私政策</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>隐私政策内容</Label>
                      <Textarea 
                        className="mt-1 min-h-64 font-mono text-sm"
                        placeholder="输入隐私政策内容..."
                        defaultValue={`隐私政策

最后更新日期：2026年3月26日

1. 信息收集
我们收集您在购物过程中提供的信息，包括姓名、邮箱、地址、电话等。

2. 信息使用
您的信息将用于处理订单、发送促销邮件、改善服务体验等。

3. 信息保护
我们采用SSL加密等技术保护您的个人信息安全。

4. Cookie使用
我们使用Cookie来改善您的浏览体验，您可以在浏览器中禁用Cookie。

5. 第三方服务
我们可能使用第三方支付、物流等服务，这些服务商有其独立的隐私政策。

6. 您的权利
根据GDPR，您有权访问、更正、删除您的个人数据。

7. 联系我们
如有隐私相关问题，请联系：privacy@myfashionstore.com`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button>保存政策</Button>
                      <Button variant="outline">预览页面</Button>
                      <Button variant="outline">生成PDF</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checklist" className="mt-4">
              <div className="space-y-4">
                {complianceChecks.map((check, i) => (
                  <Card key={i} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{check.category}</span>
                        <span className="text-sm font-normal text-slate-500">
                          {check.items.filter(item => item.status === 'pass').length}/{check.items.length} 通过
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {check.items.map((item, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            {item.status === 'pass' ? (
                              <CheckCircle className="h-5 w-5 text-emerald-500" />
                            ) : item.status === 'fail' ? (
                              <XCircle className="h-5 w-5 text-red-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-amber-500" />
                            )}
                            <span className="flex-1 text-slate-700">{item.name}</span>
                            {item.status === 'pending' && (
                              <Button size="sm" variant="outline">检查</Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="knowledge" className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: 'GDPR完整指南', icon: BookMarked, type: 'document' },
                  { title: '跨境电商合规要点', icon: FileIcon, type: 'document' },
                  { title: '广告投放政策解读', icon: FileText, type: 'document' },
                  { title: '知识产权保护指南', icon: Shield, type: 'document' },
                  { title: '风险案例分析', icon: AlertTriangle, type: 'video' },
                  { title: '应急处理流程', icon: Play, type: 'video' },
                ].map((item, i) => (
                  <Card key={i} className="border-0 shadow-lg cursor-pointer hover:ring-2 ring-slate-300 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <item.icon className="h-6 w-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{item.title}</p>
                          <p className="text-sm text-slate-500">{item.type === 'document' ? '文档' : '视频'}</p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-slate-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
