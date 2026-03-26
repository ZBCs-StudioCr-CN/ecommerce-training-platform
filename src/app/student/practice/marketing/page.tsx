'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, BookOpen, Store, Award, FileText, MessageCircle, Bell, Globe,
  ChevronLeft, ChevronRight, Save, Play, Plus, Trash2, TrendingUp, TrendingDown, Target, DollarSign, Users, Eye, MousePointer, ShoppingCart, BarChart3, PieChart, LineChart, Calendar, Globe2, Search, Zap, Megaphone, Mail, Share2,
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

interface AdCampaign {
  id: string;
  name: string;
  platform: 'google' | 'facebook' | 'tiktok' | 'instagram';
  type: 'search' | 'display' | 'video' | 'shopping';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpc: number;
  ctr: number;
  roas: number;
  status: 'active' | 'paused' | 'draft';
  startDate: string;
  targetAudience: {
    ageRange: string;
    gender: string;
    locations: string[];
    interests: string[];
  };
}

interface SEOSetting {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  score: number;
}

const steps = [
  { id: 1, title: '设置广告目标', status: 'completed' },
  { id: 2, title: '选择广告平台', status: 'completed' },
  { id: 3, title: '创建广告内容', status: 'in_progress' },
  { id: 4, title: '设定预算出价', status: 'pending' },
  { id: 5, title: '精准人群定向', status: 'pending' },
  { id: 6, title: 'SEO优化', status: 'pending' },
  { id: 7, title: '启动投放', status: 'pending' },
];

const platforms = [
  { id: 'google', name: 'Google Ads', icon: Search, color: '#4285F4' },
  { id: 'facebook', name: 'Facebook Ads', icon: Share2, color: '#1877F2' },
  { id: 'tiktok', name: 'TikTok Ads', icon: Play, color: '#000000' },
  { id: 'instagram', name: 'Instagram Ads', icon: Megaphone, color: '#E4405F' },
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [currentStep, setCurrentStep] = useState(3);
  const [totalBudget, setTotalBudget] = useState(1000);
  const [remainingBudget, setRemainingBudget] = useState(650);

  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    {
      id: '1',
      name: '夏季新品推广',
      platform: 'google',
      type: 'search',
      budget: 300,
      spent: 156.80,
      impressions: 45600,
      clicks: 1234,
      conversions: 45,
      cpc: 0.127,
      ctr: 2.7,
      roas: 3.2,
      status: 'active',
      startDate: '2026-03-20',
      targetAudience: { ageRange: '25-45', gender: 'all', locations: ['US', 'UK'], interests: ['Fashion', 'Shopping'] }
    },
    {
      id: '2',
      name: 'Facebook品牌曝光',
      platform: 'facebook',
      type: 'display',
      budget: 200,
      spent: 89.50,
      impressions: 125000,
      clicks: 875,
      conversions: 28,
      cpc: 0.102,
      ctr: 0.7,
      roas: 2.8,
      status: 'active',
      startDate: '2026-03-22',
      targetAudience: { ageRange: '18-35', gender: 'female', locations: ['US', 'CA', 'AU'], interests: ['Beauty', 'Lifestyle'] }
    },
    {
      id: '3',
      name: 'TikTok短视频推广',
      platform: 'tiktok',
      type: 'video',
      budget: 150,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cpc: 0,
      ctr: 0,
      roas: 0,
      status: 'draft',
      startDate: '2026-03-28',
      targetAudience: { ageRange: '18-24', gender: 'all', locations: ['US'], interests: ['Trending', 'Fashion'] }
    },
  ]);

  const [seoSettings, setSeoSettings] = useState<SEOSetting[]>([
    { id: '1', page: '首页', title: '夏季新品 - My Fashion Store', description: '探索最新夏季时尚单品', keywords: ['夏季服装', '时尚'], score: 85 },
    { id: '2', page: '商品列表', title: '全部商品 - My Fashion Store', description: '浏览全部商品', keywords: ['服装', '购物'], score: 72 },
    { id: '3', page: '关于我们', title: '关于我们 - My Fashion Store', description: '', keywords: [], score: 45 },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<AdCampaign>>({
    platform: 'google',
    type: 'search',
    budget: 100,
    status: 'draft',
  });

  const handleCreateCampaign = () => {
    const campaign: AdCampaign = {
      id: Date.now().toString(),
      name: newCampaign.name || '新广告活动',
      platform: newCampaign.platform as AdCampaign['platform'],
      type: newCampaign.type as AdCampaign['type'],
      budget: newCampaign.budget || 100,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cpc: 0,
      ctr: 0,
      roas: 0,
      status: 'draft',
      startDate: new Date().toISOString().split('T')[0],
      targetAudience: { ageRange: '25-45', gender: 'all', locations: ['US'], interests: [] }
    };
    setCampaigns([...campaigns, campaign]);
    setShowCreateModal(false);
    setNewCampaign({});
  };

  const getPlatformColor = (platform: string) => {
    return platforms.find(p => p.id === platform)?.color || '#6B7280';
  };

  const getPlatformIcon = (platform: string) => {
    return platforms.find(p => p.id === platform)?.icon || Search;
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium">流量推广实训</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
              剩余预算: ${remainingBudget} / ${totalBudget}
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
                    ? 'bg-orange-500 text-white' 
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
          {/* Stats Overview */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[
              { label: '总曝光量', value: '170,600', icon: Eye, change: '+12.5%', color: 'blue' },
              { label: '总点击量', value: '2,109', icon: MousePointer, change: '+8.3%', color: 'emerald' },
              { label: '转化订单', value: '73', icon: ShoppingCart, change: '+15.2%', color: 'violet' },
              { label: '平均CPC', value: '$0.12', icon: DollarSign, change: '-5.1%', color: 'amber' },
              { label: '平均ROAS', value: '3.0x', icon: TrendingUp, change: '+0.5', color: 'rose' },
            ].map((stat, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                      <p className={`text-xs ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stat.change} 较昨日
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                      <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border rounded-lg p-1">
              <TabsTrigger value="campaigns">广告活动</TabsTrigger>
              <TabsTrigger value="seo">SEO优化</TabsTrigger>
              <TabsTrigger value="social">社媒推广</TabsTrigger>
              <TabsTrigger value="email">邮件营销</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">全部</Button>
                  <Button variant="outline" size="sm">进行中</Button>
                  <Button variant="outline" size="sm">已暂停</Button>
                  <Button variant="outline" size="sm">草稿</Button>
                </div>
                <Button size="sm" onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />创建广告活动
                </Button>
              </div>

              <div className="space-y-4">
                {campaigns.map((campaign) => {
                  const PlatformIcon = getPlatformIcon(campaign.platform);
                  return (
                    <Card key={campaign.id} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ background: `${getPlatformColor(campaign.platform)}20` }}
                            >
                              <PlatformIcon className="h-6 w-6" style={{ color: getPlatformColor(campaign.platform) }} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-slate-800">{campaign.name}</h3>
                                <Badge className={
                                  campaign.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                  campaign.status === 'paused' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                                }>
                                  {campaign.status === 'active' ? '投放中' : campaign.status === 'paused' ? '已暂停' : '草稿'}
                                </Badge>
                                <Badge variant="outline">
                                  {campaign.type === 'search' ? '搜索广告' : campaign.type === 'display' ? '展示广告' : campaign.type === 'video' ? '视频广告' : '购物广告'}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span>预算: ${campaign.budget}</span>
                                <span>已花费: ${campaign.spent.toFixed(2)}</span>
                                <span>开始日期: {campaign.startDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {campaign.status === 'active' && (
                              <Button variant="outline" size="sm">暂停</Button>
                            )}
                            {campaign.status === 'paused' && (
                              <Button variant="outline" size="sm">恢复</Button>
                            )}
                            {campaign.status === 'draft' && (
                              <Button size="sm"><Play className="h-4 w-4 mr-1" />启动</Button>
                            )}
                            <Button variant="outline" size="sm">详情</Button>
                          </div>
                        </div>

                        {campaign.status !== 'draft' && (
                          <div className="mt-4 pt-4 border-t grid grid-cols-6 gap-4">
                            <div className="text-center">
                              <p className="text-xs text-slate-500">曝光量</p>
                              <p className="font-bold text-slate-800">{campaign.impressions.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500">点击量</p>
                              <p className="font-bold text-slate-800">{campaign.clicks.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500">CTR</p>
                              <p className="font-bold text-emerald-600">{campaign.ctr}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500">CPC</p>
                              <p className="font-bold text-slate-800">${campaign.cpc.toFixed(3)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500">转化数</p>
                              <p className="font-bold text-blue-600">{campaign.conversions}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500">ROAS</p>
                              <p className="font-bold text-violet-600">{campaign.roas}x</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="seo" className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>SEO评分概览</CardTitle>
                    <CardDescription>各页面SEO优化状态</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {seoSettings.map((seo) => (
                        <div key={seo.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">{seo.page}</p>
                            <p className="text-sm text-slate-500 truncate">{seo.title}</p>
                          </div>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                            seo.score >= 80 ? 'bg-emerald-100 text-emerald-600' :
                            seo.score >= 60 ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {seo.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>优化建议</CardTitle>
                    <CardDescription>根据SEO最佳实践给出优化建议</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { page: '关于我们', issue: '缺少meta描述', priority: 'high' },
                        { page: '商品列表', issue: '关键词数量不足', priority: 'medium' },
                        { page: '首页', issue: '标题长度可优化', priority: 'low' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                          <div className={`w-2 h-2 rounded-full ${
                            item.priority === 'high' ? 'bg-red-500' :
                            item.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.page}</p>
                            <p className="text-xs text-slate-500">{item.issue}</p>
                          </div>
                          <Button variant="outline" size="sm">修复</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>社交媒体推广</CardTitle>
                  <CardDescription>管理社交媒体账号与内容发布</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {platforms.map((platform) => (
                      <div key={platform.id} className="p-4 border rounded-xl text-center hover:border-orange-300 transition-colors cursor-pointer">
                        <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center" style={{ background: `${platform.color}20` }}>
                          <platform.icon className="h-6 w-6" style={{ color: platform.color }} />
                        </div>
                        <p className="font-medium mt-2">{platform.name}</p>
                        <p className="text-xs text-slate-500">点击连接账号</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>邮件营销</CardTitle>
                  <CardDescription>创建邮件活动，触达潜在客户</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">暂无邮件活动</p>
                    <Button><Plus className="h-4 w-4 mr-2" />创建邮件活动</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>创建广告活动</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>活动名称</Label>
                  <Input 
                    value={newCampaign.name || ''} 
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    placeholder="输入活动名称"
                  />
                </div>
                <div>
                  <Label>广告平台</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {platforms.map((p) => (
                      <button
                        key={p.id}
                        className={`p-3 border rounded-lg text-center transition-all ${newCampaign.platform === p.id ? 'border-orange-500 bg-orange-50' : ''}`}
                        onClick={() => setNewCampaign({...newCampaign, platform: p.id as AdCampaign['platform']})}
                      >
                        <p.icon className="h-5 w-5 mx-auto" style={{ color: p.color }} />
                        <p className="text-xs mt-1">{p.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>广告类型</Label>
                  <Select value={newCampaign.type} onValueChange={(v) => setNewCampaign({...newCampaign, type: v as AdCampaign['type']})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="search">搜索广告</SelectItem>
                      <SelectItem value="display">展示广告</SelectItem>
                      <SelectItem value="video">视频广告</SelectItem>
                      <SelectItem value="shopping">购物广告</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>每日预算 (USD)</Label>
                  <Input 
                    type="number"
                    value={newCampaign.budget || ''} 
                    onChange={(e) => setNewCampaign({...newCampaign, budget: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>取消</Button>
                <Button onClick={handleCreateCampaign}>创建</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
