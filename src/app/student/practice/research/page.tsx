'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, BookOpen, Store, Award, FileText, MessageCircle, Bell, Globe,
  ChevronLeft, ChevronRight, Save, Target, TrendingUp, TrendingDown, Search, BarChart3, PieChart, Users, DollarSign, MapPin, Tag, Star, Filter, Download, RefreshCw, Plus, Check,
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
  { id: 1, title: '市场趋势分析', status: 'completed' },
  { id: 2, title: '竞品调研', status: 'completed' },
  { id: 3, title: '选品决策', status: 'in_progress' },
  { id: 4, title: '定价策略', status: 'pending' },
  { id: 5, title: '品牌定位', status: 'pending' },
];

interface Product {
  id: string;
  name: string;
  category: string;
  trend: number;
  competition: 'low' | 'medium' | 'high';
  profitMargin: number;
  price: { min: number; max: number; avg: number };
  searchVolume: number;
  growthRate: number;
  selected: boolean;
}

const marketTrends = [
  { category: '服装', trend: '+15%', volume: '125K', growth: '上升', icon: '👗' },
  { category: '美妆', trend: '+12%', volume: '89K', growth: '上升', icon: '💄' },
  { category: '电子', trend: '+8%', volume: '156K', growth: '稳定', icon: '📱' },
  { category: '家居', trend: '+18%', volume: '67K', growth: '上升', icon: '🏠' },
  { category: '运动', trend: '+5%', volume: '78K', growth: '稳定', icon: '🏃' },
];

const competitors = [
  { name: 'Fashion Nova', domain: 'fashionnova.com', traffic: '15.2M', topProducts: ['连衣裙', '泳衣', '牛仔裤'], priceRange: '$20-$80', strength: '社交媒体营销' },
  { name: 'Shein', domain: 'shein.com', traffic: '89.5M', topProducts: ['女装', '配饰', '美妆'], priceRange: '$5-$50', strength: '供应链效率' },
  { name: 'Zara', domain: 'zara.com', traffic: '42.1M', topProducts: ['正装', '休闲装', '鞋履'], priceRange: '$25-$150', strength: '品牌认知' },
];

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState('trends');
  const [currentStep, setCurrentStep] = useState(3);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: '夏季连衣裙', category: '服装', trend: 85, competition: 'medium', profitMargin: 45, price: { min: 25, max: 89, avg: 45 }, searchVolume: 45000, growthRate: 18, selected: true },
    { id: '2', name: '休闲T恤', category: '服装', trend: 78, competition: 'high', profitMargin: 35, price: { min: 15, max: 45, avg: 28 }, searchVolume: 78000, growthRate: 12, selected: false },
    { id: '3', name: '高腰牛仔裤', category: '服装', trend: 82, competition: 'high', profitMargin: 40, price: { min: 30, max: 120, avg: 65 }, searchVolume: 56000, growthRate: 8, selected: false },
    { id: '4', name: '运动套装', category: '运动', trend: 72, competition: 'medium', profitMargin: 50, price: { min: 35, max: 95, avg: 55 }, searchVolume: 32000, growthRate: 22, selected: false },
    { id: '5', name: '防晒霜', category: '美妆', trend: 88, competition: 'low', profitMargin: 55, price: { min: 12, max: 60, avg: 28 }, searchVolume: 89000, growthRate: 25, selected: true },
  ]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>(['1', '5']);
  const [pricingStrategy, setPricingStrategy] = useState('competitive');
  const [brandPosition, setBrandPosition] = useState('');

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium">市场调研与选品实训</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
              已选 {selectedProducts.length} 个商品
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
                    ? 'bg-blue-500 text-white' 
                    : step.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-slate-100 text-slate-500'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                {step.status === 'completed' ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{step.id}</span>}
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
              <TabsTrigger value="trends">市场趋势</TabsTrigger>
              <TabsTrigger value="competitors">竞品分析</TabsTrigger>
              <TabsTrigger value="products">选品决策</TabsTrigger>
              <TabsTrigger value="pricing">定价策略</TabsTrigger>
              <TabsTrigger value="brand">品牌定位</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="mt-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {marketTrends.map((trend, i) => (
                  <Card key={i} className="border-0 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{trend.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{trend.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-sm font-medium ${trend.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{trend.trend}</span>
                            <span className="text-xs text-slate-400">搜索量 {trend.volume}</span>
                          </div>
                        </div>
                        <Badge variant={trend.growth === '上升' ? 'default' : 'secondary'}>{trend.growth}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>全球市场趋势洞察</CardTitle>
                  <CardDescription>基于Google Trends和行业数据分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-500">趋势图表区域</p>
                      <p className="text-sm text-slate-400">显示近12个月的搜索趋势数据</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="mt-4">
              <div className="space-y-4">
                {competitors.map((comp, i) => (
                  <Card key={i} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {comp.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-slate-800">{comp.name}</h3>
                            <a href={`https://${comp.domain}`} target="_blank" className="text-sm text-blue-500 hover:underline">{comp.domain}</a>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500">月流量</p>
                              <p className="font-medium">{comp.traffic}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">热销品类</p>
                              <p className="font-medium">{comp.topProducts.join('、')}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">价格区间</p>
                              <p className="font-medium">{comp.priceRange}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">核心优势</p>
                              <p className="font-medium">{comp.strength}</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">详细分析</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-slate-500" />
                  <select className="h-9 px-3 border rounded-lg text-sm">
                    <option>全部品类</option>
                    <option>服装</option>
                    <option>美妆</option>
                    <option>运动</option>
                  </select>
                  <select className="h-9 px-3 border rounded-lg text-sm">
                    <option>竞争程度</option>
                    <option>低竞争</option>
                    <option>中等竞争</option>
                    <option>高竞争</option>
                  </select>
                </div>
                <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />刷新数据</Button>
              </div>

              <div className="space-y-3">
                {products.map((product) => (
                  <Card key={product.id} className={`border-0 shadow-lg cursor-pointer transition-all ${selectedProducts.includes(product.id) ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => handleSelectProduct(product.id)}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedProducts.includes(product.id) ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                          {selectedProducts.includes(product.id) && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-800">{product.name}</h3>
                            <Badge variant="outline">{product.category}</Badge>
                            <Badge className={getCompetitionColor(product.competition)}>
                              {product.competition === 'low' ? '低竞争' : product.competition === 'medium' ? '中等竞争' : '高竞争'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-slate-500">
                            <span>搜索量: {product.searchVolume.toLocaleString()}</span>
                            <span>增长率: <span className="text-emerald-500">+{product.growthRate}%</span></span>
                            <span>利润率: {product.profitMargin}%</span>
                            <span>均价: ${product.price.avg}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-500">{product.trend}</div>
                          <p className="text-xs text-slate-400">趋势指数</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>定价策略选择</CardTitle>
                    <CardDescription>根据市场定位选择合适的定价策略</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { id: 'competitive', name: '竞争定价', desc: '参考竞品价格，略低于市场平均' },
                        { id: 'premium', name: '溢价定价', desc: '强调品质和服务，高于市场平均' },
                        { id: 'penetration', name: '渗透定价', desc: '低价进入市场，快速获客' },
                        { id: 'value', name: '价值定价', desc: '基于客户感知价值定价' },
                      ].map((strategy) => (
                        <div 
                          key={strategy.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${pricingStrategy === strategy.id ? 'border-blue-500 bg-blue-50' : ''}`}
                          onClick={() => setPricingStrategy(strategy.id)}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 ${pricingStrategy === strategy.id ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`} />
                            <span className="font-medium">{strategy.name}</span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1 ml-6">{strategy.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>价格计算器</CardTitle>
                    <CardDescription>根据成本和目标利润计算售价</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>产品成本 ($)</Label>
                        <Input type="number" placeholder="输入成本" defaultValue="15" />
                      </div>
                      <div>
                        <Label>目标利润率 (%)</Label>
                        <Input type="number" placeholder="输入利润率" defaultValue="40" />
                      </div>
                      <div>
                        <Label>运费 ($)</Label>
                        <Input type="number" placeholder="输入运费" defaultValue="5" />
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <p className="text-sm text-slate-500">建议售价</p>
                        <p className="text-3xl font-bold text-emerald-600">$33.33</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="brand" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>品牌定位声明</CardTitle>
                  <CardDescription>定义你的品牌核心价值和目标客户</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label>品牌名称</Label>
                      <Input placeholder="输入品牌名称" defaultValue="My Fashion Store" />
                    </div>
                    <div>
                      <Label>目标市场</Label>
                      <Select defaultValue="us">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">美国</SelectItem>
                          <SelectItem value="uk">英国</SelectItem>
                          <SelectItem value="eu">欧洲</SelectItem>
                          <SelectItem value="global">全球</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>目标客户画像</Label>
                      <Textarea 
                        placeholder="描述你的目标客户（年龄、性别、兴趣、消费习惯等）"
                        defaultValue="18-35岁女性，追求时尚，喜欢社交媒体购物，中等收入水平，注重性价比和品质..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>品牌核心价值</Label>
                      <Textarea 
                        placeholder="描述你的品牌核心价值和差异化优势"
                        defaultValue="提供时尚、高性价比的女装，专注于快时尚与品质的结合，让每位女性都能轻松拥有时尚穿搭..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button>保存品牌定位</Button>
                      <Button variant="outline">生成品牌报告</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
