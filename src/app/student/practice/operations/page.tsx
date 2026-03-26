'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, BookOpen, Store, Award, FileText, MessageCircle, Bell, Globe,
  ChevronLeft, ChevronRight, Save, Plus, Trash2, TrendingUp, DollarSign, Users, Eye, ShoppingCart, Gift, Percent, Clock, Tag, Mail, MessageSquare, AlertCircle, CheckCircle, XCircle, Send, Phone, Calendar, Star,
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

interface Promotion {
  id: string;
  name: string;
  type: 'discount' | 'coupon' | 'flash_sale' | 'bundle' | 'free_shipping';
  discount: number;
  discountType: 'percent' | 'fixed';
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'ended';
  usageCount: number;
  revenue: number;
  orders: number;
}

interface CustomerTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  status: 'pending' | 'processing' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  category: 'order' | 'refund' | 'product' | 'shipping' | 'other';
  createdAt: string;
  response?: string;
  orderNumber?: string;
}

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipientCount: number;
  openRate: number;
  clickRate: number;
  sentAt?: string;
}

const steps = [
  { id: 1, title: '创建营销活动', status: 'completed' },
  { id: 2, title: '设置优惠券', status: 'completed' },
  { id: 3, title: '邮件营销', status: 'in_progress' },
  { id: 4, title: '弃购挽回', status: 'pending' },
  { id: 5, title: '客诉处理', status: 'pending' },
];

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState('promotions');
  const [currentStep, setCurrentStep] = useState(3);

  const [promotions, setPromotions] = useState<Promotion[]>([
    { id: '1', name: '春季大促', type: 'discount', discount: 20, discountType: 'percent', startDate: '2026-03-01', endDate: '2026-03-31', status: 'active', usageCount: 156, revenue: 4580, orders: 89 },
    { id: '2', name: '新人优惠券', type: 'coupon', discount: 15, discountType: 'percent', startDate: '2026-03-01', endDate: '2026-06-30', status: 'active', usageCount: 234, revenue: 3200, orders: 67 },
    { id: '3', name: '限时闪购', type: 'flash_sale', discount: 30, discountType: 'percent', startDate: '2026-03-28', endDate: '2026-03-29', status: 'scheduled', usageCount: 0, revenue: 0, orders: 0 },
    { id: '4', name: '满99包邮', type: 'free_shipping', discount: 0, discountType: 'fixed', startDate: '2026-01-01', endDate: '2026-12-31', status: 'active', usageCount: 450, revenue: 0, orders: 150 },
  ]);

  const [tickets, setTickets] = useState<CustomerTicket[]>([
    { id: '1', customerId: 'C001', customerName: 'John Smith', customerEmail: 'john@email.com', subject: '订单未收到', message: '我3月20日下的订单到现在还没收到，订单号是#12345，请帮忙查询物流状态。', status: 'pending', priority: 'high', category: 'shipping', createdAt: '2026-03-26 10:30', orderNumber: '#12345' },
    { id: '2', customerId: 'C002', customerName: 'Emma Wilson', customerEmail: 'emma@email.com', subject: '商品尺码不符', message: '收到的商品尺码和描述不一致，我需要换货。', status: 'processing', priority: 'medium', category: 'product', createdAt: '2026-03-25 15:20', orderNumber: '#12346' },
    { id: '3', customerId: 'C003', customerName: 'Michael Brown', customerEmail: 'michael@email.com', subject: '申请退款', message: '商品质量有问题，我想申请退款。', status: 'pending', priority: 'high', category: 'refund', createdAt: '2026-03-26 09:15', orderNumber: '#12347' },
    { id: '4', customerId: 'C004', customerName: 'Sarah Davis', customerEmail: 'sarah@email.com', subject: '使用优惠券遇到问题', message: '结账时优惠券无法使用，提示已过期，但我的优惠券显示还有效。', status: 'resolved', priority: 'low', category: 'order', createdAt: '2026-03-24 14:00' },
  ]);

  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([
    { id: '1', name: '新品上线通知', subject: '春季新品已上线，立即探索！', status: 'sent', recipientCount: 1250, openRate: 32.5, clickRate: 8.2, sentAt: '2026-03-20' },
    { id: '2', name: '弃购挽回邮件', subject: '您的购物车还在等您~', status: 'sent', recipientCount: 89, openRate: 45.2, clickRate: 12.5, sentAt: '2026-03-25' },
    { id: '3', name: '会员专享优惠', subject: '会员专属：全场8折', status: 'draft', recipientCount: 0, openRate: 0, clickRate: 0 },
  ]);

  const [selectedTicket, setSelectedTicket] = useState<CustomerTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showCreatePromotion, setShowCreatePromotion] = useState(false);
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    type: 'discount',
    discountType: 'percent',
    status: 'scheduled',
  });

  const getPromotionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      discount: '折扣活动',
      coupon: '优惠券',
      flash_sale: '限时闪购',
      bundle: '组合优惠',
      free_shipping: '包邮活动',
    };
    return labels[type] || type;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const handleReplyTicket = () => {
    if (!selectedTicket || !replyMessage.trim()) return;
    const updated = tickets.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, status: 'resolved' as const, response: replyMessage }
        : t
    );
    setTickets(updated);
    setSelectedTicket(null);
    setReplyMessage('');
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium">转化运营实训</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
              转化率: 3.2% (+0.5%)
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
                    ? 'bg-violet-500 text-white' 
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
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: '活动收入', value: '$7,780', icon: DollarSign, change: '+23%', color: 'emerald' },
              { label: '活动订单', value: '306', icon: ShoppingCart, change: '+18%', color: 'blue' },
              { label: '待处理工单', value: '3', icon: MessageSquare, change: '-2', color: 'amber' },
              { label: '邮件打开率', value: '38.9%', icon: Mail, change: '+5.2%', color: 'violet' },
            ].map((stat, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                      <p className={`text-xs ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stat.change} 较上周
                      </p>
                    </div>
                    <stat.icon className="h-8 w-8 text-slate-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border rounded-lg p-1">
              <TabsTrigger value="promotions">营销活动</TabsTrigger>
              <TabsTrigger value="coupons">优惠券管理</TabsTrigger>
              <TabsTrigger value="email">邮件营销</TabsTrigger>
              <TabsTrigger value="tickets">客诉处理</TabsTrigger>
              <TabsTrigger value="abandoned">弃购挽回</TabsTrigger>
            </TabsList>

            <TabsContent value="promotions" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">活动列表</h3>
                <Button size="sm" onClick={() => setShowCreatePromotion(true)}>
                  <Plus className="h-4 w-4 mr-2" />创建活动
                </Button>
              </div>

              <div className="space-y-4">
                {promotions.map((promo) => (
                  <Card key={promo.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            promo.status === 'active' ? 'bg-emerald-100' : promo.status === 'scheduled' ? 'bg-blue-100' : 'bg-slate-100'
                          }`}>
                            {promo.type === 'flash_sale' ? <Clock className="h-6 w-6 text-blue-500" /> : 
                             promo.type === 'free_shipping' ? <Gift className="h-6 w-6 text-violet-500" /> :
                             <Percent className="h-6 w-6 text-emerald-500" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-800">{promo.name}</h3>
                              <Badge className={
                                promo.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                promo.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                              }>
                                {promo.status === 'active' ? '进行中' : promo.status === 'scheduled' ? '待开始' : '已结束'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                              <span>{getPromotionTypeLabel(promo.type)}</span>
                              {promo.discount > 0 && (
                                <span className="text-emerald-600 font-medium">
                                  {promo.discountType === 'percent' ? `${promo.discount}% OFF` : `$${promo.discount} OFF`}
                                </span>
                              )}
                              <span>{promo.startDate} ~ {promo.endDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-slate-500">使用次数</p>
                            <p className="font-bold text-slate-800">{promo.usageCount}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-slate-500">带来订单</p>
                            <p className="font-bold text-blue-600">{promo.orders}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-slate-500">活动收入</p>
                            <p className="font-bold text-emerald-600">${promo.revenue}</p>
                          </div>
                          <Button variant="outline" size="sm">编辑</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="coupons" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>优惠券管理</CardTitle>
                    <Button size="sm"><Plus className="h-4 w-4 mr-2" />创建优惠券</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { code: 'SPRING20', discount: '20%', used: 156, remaining: 844, status: 'active' },
                      { code: 'NEW15', discount: '15%', used: 234, remaining: 766, status: 'active' },
                      { code: 'VIP30', discount: '30%', used: 45, remaining: 155, status: 'active' },
                    ].map((coupon, i) => (
                      <div key={i} className="p-4 border rounded-xl bg-gradient-to-r from-violet-50 to-purple-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-bold text-lg text-violet-600">{coupon.code}</span>
                          <Badge className="bg-emerald-100 text-emerald-700">有效</Badge>
                        </div>
                        <p className="text-2xl font-bold text-slate-800 mb-2">{coupon.discount} OFF</p>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>已用 {coupon.used}</span>
                          <span>剩余 {coupon.remaining}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>邮件活动</CardTitle>
                    <Button size="sm"><Plus className="h-4 w-4 mr-2" />新建邮件</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emailCampaigns.map((email) => (
                      <div key={email.id} className="flex items-center gap-4 p-4 border rounded-xl">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          email.status === 'sent' ? 'bg-emerald-100' : 'bg-slate-100'
                        }`}>
                          <Mail className={`h-5 w-5 ${email.status === 'sent' ? 'text-emerald-600' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{email.name}</span>
                            <Badge className={
                              email.status === 'sent' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                            }>
                              {email.status === 'sent' ? '已发送' : '草稿'}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500">{email.subject}</p>
                        </div>
                        {email.status === 'sent' && (
                          <>
                            <div className="text-center">
                              <p className="text-xs text-slate-500">收件人</p>
                              <p className="font-bold">{email.recipientCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500">打开率</p>
                              <p className="font-bold text-blue-600">{email.openRate}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500">点击率</p>
                              <p className="font-bold text-emerald-600">{email.clickRate}%</p>
                            </div>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          {email.status === 'sent' ? '查看报告' : '编辑'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets" className="mt-4">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>工单列表</CardTitle>
                        <div className="flex items-center gap-2">
                          <select className="h-9 px-3 border rounded-lg text-sm">
                            <option>全部状态</option>
                            <option>待处理</option>
                            <option>处理中</option>
                            <option>已解决</option>
                          </select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {tickets.map((ticket) => (
                          <div 
                            key={ticket.id} 
                            className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedTicket?.id === ticket.id ? 'border-violet-500 bg-violet-50' : ''}`}
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">{ticket.subject}</span>
                                  <Badge className={getPriorityColor(ticket.priority)}>
                                    {ticket.priority === 'high' ? '高优先' : ticket.priority === 'medium' ? '中优先' : '低优先'}
                                  </Badge>
                                  <Badge className={getStatusColor(ticket.status)}>
                                    {ticket.status === 'pending' ? '待处理' : ticket.status === 'processing' ? '处理中' : ticket.status === 'resolved' ? '已解决' : '已关闭'}
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-1">{ticket.message}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                  <span>{ticket.customerName}</span>
                                  <span>{ticket.customerEmail}</span>
                                  <span>{ticket.createdAt}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>工单详情</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedTicket ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs text-slate-500">客户信息</Label>
                            <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                              <p className="font-medium">{selectedTicket.customerName}</p>
                              <p className="text-sm text-slate-500">{selectedTicket.customerEmail}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-slate-500">问题描述</Label>
                            <p className="mt-1 text-sm text-slate-700">{selectedTicket.message}</p>
                          </div>
                          {selectedTicket.orderNumber && (
                            <div>
                              <Label className="text-xs text-slate-500">关联订单</Label>
                              <p className="mt-1 text-sm font-medium text-blue-600">{selectedTicket.orderNumber}</p>
                            </div>
                          )}
                          <div>
                            <Label className="text-xs text-slate-500">回复内容</Label>
                            <Textarea 
                              className="mt-1" 
                              placeholder="输入回复内容..."
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1" onClick={handleReplyTicket}>
                              <Send className="h-4 w-4 mr-2" />发送回复
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-400">
                          <MessageSquare className="h-12 w-12 mx-auto mb-2" />
                          <p>选择一个工单查看详情</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="abandoned" className="mt-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>弃购挽回</CardTitle>
                  <CardDescription>跟踪未完成订单的购物车，发送挽回邮件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, customer: 'Lisa Wang', email: 'lisa@email.com', cartValue: '$156.00', items: 3, abandonedAt: '2小时前', status: 'pending' },
                      { id: 2, customer: 'Tom Chen', email: 'tom@email.com', cartValue: '$89.50', items: 2, abandonedAt: '5小时前', status: 'email_sent' },
                      { id: 3, customer: 'Amy Liu', email: 'amy@email.com', cartValue: '$234.00', items: 4, abandonedAt: '1天前', status: 'recovered' },
                    ].map((cart, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 border rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-medium">
                          {cart.customer.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{cart.customer}</span>
                            <Badge className={
                              cart.status === 'recovered' ? 'bg-emerald-100 text-emerald-700' :
                              cart.status === 'email_sent' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                            }>
                              {cart.status === 'recovered' ? '已挽回' : cart.status === 'email_sent' ? '邮件已发' : '待挽回'}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500">{cart.email}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500">购物车金额</p>
                          <p className="font-bold text-slate-800">{cart.cartValue}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500">商品数</p>
                          <p className="font-bold">{cart.items}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500">放弃时间</p>
                          <p className="text-sm">{cart.abandonedAt}</p>
                        </div>
                        {cart.status === 'pending' && (
                          <Button size="sm"><Mail className="h-4 w-4 mr-1" />发送挽回邮件</Button>
                        )}
                      </div>
                    ))}
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
