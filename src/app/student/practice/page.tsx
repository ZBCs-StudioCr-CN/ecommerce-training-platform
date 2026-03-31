'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Megaphone,
  CreditCard,
  Truck,
  Tag,
  Palette,
  Plus,
  CheckCircle2,
  Eye,
  Edit,
  DollarSign,
  TrendingUp,
  Store,
  Globe,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StudentSidebar, StudentHeader } from '@/components/student-layout';

// Shopify风格后台菜单
const adminMenuItems = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'orders', label: '订单', icon: ShoppingCart, badge: 0 },
  { id: 'products', label: '产品', icon: Package },
  { id: 'analytics', label: '分析', icon: BarChart3 },
  { id: 'marketing', label: '营销', icon: Megaphone },
  { id: 'themes', label: '主题', icon: Palette },
  { id: 'payments', label: '支付', icon: CreditCard },
  { id: 'shipping', label: '物流', icon: Truck },
  { id: 'settings', label: '设置', icon: Settings },
];

// 模拟店铺数据
const mockStore = {
  name: 'My Fashion Store',
  domain: 'my-fashion-store.myshopify.com',
  status: 'development',
  products: [
    { id: '1', title: '夏季连衣裙', price: 29.99, inventory: 50, status: 'active' },
    { id: '2', title: '休闲T恤', price: 19.99, inventory: 100, status: 'active' },
    { id: '3', title: '牛仔裤', price: 39.99, inventory: 30, status: 'active' },
  ],
  tasks: [
    { id: '1', title: '添加产品图片', priority: 'high', completed: false },
    { id: '2', title: '配置支付方式', priority: 'high', completed: false },
    { id: '3', title: '设置物流方案', priority: 'medium', completed: false },
  ],
};

export default function StudentPracticePage() {
  const [adminSection, setAdminSection] = useState('home');
  const [store] = useState(mockStore);

  const completedTasks = store.tasks.filter(t => t.completed).length;
  const progress = Math.round((completedTasks / 10) * 100);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-slate-800 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Store className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-semibold">{store.name}</span>
            </Link>
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              开发中
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Eye className="h-4 w-4 mr-2" />
              预览店铺
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">
              张
            </div>
          </div>
        </div>
      </header>

      {/* 左侧平台导航 */}
      <aside className="fixed left-0 top-14 bottom-0 w-16 bg-white border-r border-slate-200 z-40">
        <nav className="py-4 flex flex-col items-center space-y-2">
          <Link
            href="/student/dashboard"
            className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100"
            title="实训控制台"
          >
            <BarChart3 className="h-5 w-5" />
          </Link>
          <Link
            href="/student/learning"
            className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100"
            title="学习中心"
          >
            <Package className="h-5 w-5" />
          </Link>
          <Link
            href="/student/practice"
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
            title="仿真实训"
          >
            <Store className="h-5 w-5" />
          </Link>
        </nav>
      </aside>

      {/* 店铺后台侧边栏 */}
      <aside className="fixed left-16 top-14 bottom-0 w-56 bg-white border-r border-slate-200 overflow-y-auto z-30">
        <div className="p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            店铺管理
          </h3>
          <nav className="space-y-1">
            {adminMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setAdminSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  adminSection === item.id
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <Badge className="bg-emerald-500 text-white text-xs">{item.badge}</Badge>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* 实训任务面板 */}
        <div className="border-t border-slate-200 p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            实训任务
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">完成进度</span>
              <span className="font-medium text-slate-900">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="mt-3 space-y-2">
            {store.tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.completed 
                    ? 'border-emerald-500 bg-emerald-500' 
                    : task.priority === 'high' 
                    ? 'border-red-400' 
                    : 'border-slate-300'
                }`}>
                  {task.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                </div>
                <span className={`text-xs ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-72 mt-14 p-6">
        {/* 首页 */}
        {adminSection === 'home' && (
          <div className="space-y-6">
            {/* 欢迎卡片 */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">欢迎来到店铺后台！</h2>
                    <p className="text-emerald-100 mt-1">这是您的Shopify风格模拟店铺管理界面</p>
                    <div className="mt-4 flex gap-3">
                      <Button variant="secondary" size="sm" onClick={() => setAdminSection('products')}>
                        <Plus className="h-4 w-4 mr-2" />
                        添加产品
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        <Eye className="h-4 w-4 mr-2" />
                        预览店铺
                      </Button>
                    </div>
                  </div>
                  <Store className="h-20 w-20 text-white/30" />
                </div>
              </CardContent>
            </Card>

            {/* 数据概览 */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">今日销售额</p>
                      <p className="text-xl font-bold text-slate-800">$0.00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">今日订单</p>
                      <p className="text-xl font-bold text-slate-800">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">今日访客</p>
                      <p className="text-xl font-bold text-slate-800">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">转化率</p>
                      <p className="text-xl font-bold text-slate-800">0%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 快速操作 */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">快速操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: '添加产品', icon: Package, section: 'products' },
                    { label: '配置支付', icon: CreditCard, section: 'payments' },
                    { label: '设置物流', icon: Truck, section: 'shipping' },
                    { label: '选择主题', icon: Palette, section: 'themes' },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={() => setAdminSection(action.section)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                      <action.icon className="h-5 w-5 text-slate-400" />
                      <span className="text-sm text-slate-700">{action.label}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">产品列表</CardTitle>
                  <CardDescription>{store.products.length} 个产品</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {store.products.map((product) => (
                      <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                        <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                          <Package className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{product.title}</p>
                          <p className="text-xs text-slate-500">${product.price} · 库存 {product.inventory}</p>
                        </div>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {product.status === 'active' ? '上架' : '下架'}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setAdminSection('products')}>
                      查看全部产品
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">实训指南</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="text-sm font-medium text-emerald-800">当前任务</p>
                      <p className="text-sm text-emerald-600 mt-1">完成产品上架，添加至少10款产品</p>
                      <Progress value={30} className="h-1.5 mt-2" />
                    </div>
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-sm font-medium text-amber-800">提示</p>
                      <p className="text-sm text-amber-600 mt-1">点击左侧菜单探索店铺后台功能</p>
                    </div>
                    <Button size="sm" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600">
                      查看完整教程
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 产品管理 */}
        {adminSection === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">产品</h2>
                <p className="text-slate-500">管理您的产品信息</p>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                <Plus className="h-4 w-4 mr-2" />
                添加产品
              </Button>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">产品</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">状态</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">库存</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">价格</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {store.products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center">
                                <Package className="h-6 w-6 text-slate-400" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{product.title}</p>
                                <p className="text-xs text-slate-500">SKU-{product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                              {product.status === 'active' ? '上架' : '下架'}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-slate-600">{product.inventory} 件</td>
                          <td className="px-4 py-4 text-slate-600">${product.price}</td>
                          <td className="px-4 py-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 支付设置 */}
        {adminSection === 'payments' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">支付设置</h2>
              <p className="text-slate-500">配置支付方式</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">PayPal</CardTitle>
                      <CardDescription>跨境支付首选</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      <p>状态：<Badge variant="secondary">未配置</Badge></p>
                      <p className="mt-1">费率：2.9% + $0.30</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600">配置</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Stripe</CardTitle>
                      <CardDescription>信用卡支付</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      <p>状态：<Badge variant="secondary">未配置</Badge></p>
                      <p className="mt-1">费率：2.9% + $0.30</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600">配置</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 物流设置 */}
        {adminSection === 'shipping' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">物流设置</h2>
                <p className="text-slate-500">配置配送区域和运费</p>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                <Plus className="h-4 w-4 mr-2" />
                添加配送区域
              </Button>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Truck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium text-slate-800 mb-2">暂无配送区域</h3>
                <p className="text-sm text-slate-500 mb-4">
                  创建配送区域，设置不同地区的运费方案
                </p>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">创建配送区域</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 主题设置 */}
        {adminSection === 'themes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">主题</h2>
              <p className="text-slate-500">自定义店铺外观</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['Dawn', 'Debut', 'Brooklyn', 'Narrative', 'Minimal', 'Simple'].map((theme, index) => (
                <Card key={theme} className={`border-0 shadow-lg ${index === 0 ? 'ring-2 ring-emerald-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center">
                      <Palette className="h-8 w-8 text-slate-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-800">{theme}</p>
                        <p className="text-xs text-slate-500">免费主题</p>
                      </div>
                      {index === 0 ? (
                        <Badge className="bg-emerald-500">当前使用</Badge>
                      ) : (
                        <Button size="sm" variant="outline">使用</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 分析 */}
        {adminSection === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">分析</h2>
              <p className="text-slate-500">查看店铺数据和表现</p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium text-slate-800 mb-2">数据积累中</h3>
                <p className="text-sm text-slate-500">
                  完成更多实训任务后，您将看到店铺运营数据
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 营销 */}
        {adminSection === 'marketing' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">营销</h2>
              <p className="text-slate-500">推广您的店铺</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Google Ads</CardTitle>
                  <CardDescription>搜索引擎广告</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 mb-3">
                    创建搜索广告，吸引精准流量
                  </p>
                  <Link href="/student/ads">
                    <Button size="sm" variant="outline" className="w-full">创建广告</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Facebook Ads</CardTitle>
                  <CardDescription>社交媒体广告</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 mb-3">
                    在社交平台推广您的产品
                  </p>
                  <Link href="/student/ads">
                    <Button size="sm" variant="outline" className="w-full">创建广告</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 设置 */}
        {adminSection === 'settings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">设置</h2>
              <p className="text-slate-500">管理店铺设置</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: '基本信息', desc: '店铺名称、联系方式' },
                { label: '域名设置', desc: '自定义域名绑定' },
                { label: '货币设置', desc: '货币和汇率' },
                { label: '结账设置', desc: '结账流程配置' },
                { label: '通知设置', desc: '邮件通知模板' },
                { label: '法律政策', desc: '隐私政策、服务条款' },
              ].map((item) => (
                <Card key={item.label} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <p className="font-medium text-slate-800">{item.label}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 订单 */}
        {adminSection === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">订单</h2>
              <p className="text-slate-500">管理客户订单</p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium text-slate-800 mb-2">暂无订单</h3>
                <p className="text-sm text-slate-500">
                  完成实训推广任务后，将生成模拟订单
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
