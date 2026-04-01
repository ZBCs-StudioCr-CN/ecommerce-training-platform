'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  ArrowLeft,
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Users2,
  Wallet,
  Percent,
  Sparkles,
  Video,
  Radio,
  Grid3X3,
  Box,
  ShoppingCart as CartIcon,
  Headphones,
  PercentCircle,
  RefreshCw,
  MapPin,
  Truck as TruckIcon,
  Clock,
  Star,
  ExternalLink,
  Monitor,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 平台配置
const platformConfigs = {
  // 国内电商
  taobao: {
    name: '淘宝/天猫',
    scene: 'domestic',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500',
    menus: [
      { id: 'home', label: '首页', icon: Home },
      { id: 'products', label: '商品管理', icon: Package },
      { id: 'orders', label: '订单管理', icon: ShoppingCart },
      { id: 'customers', label: '客户管理', icon: Users },
      { id: 'marketing', label: '营销推广', icon: Megaphone },
      { id: 'live', label: '直播中心', icon: Video },
      { id: 'analytics', label: '数据分析', icon: BarChart3 },
      { id: 'finance', label: '财务管理', icon: Wallet },
      { id: 'settings', label: '店铺设置', icon: Settings },
    ],
  },
  pdd: {
    name: '拼多多',
    scene: 'domestic',
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500',
    menus: [
      { id: 'home', label: '首页', icon: Home },
      { id: 'products', label: '商品列表', icon: Package },
      { id: 'orders', label: '订单查询', icon: ShoppingCart },
      { id: 'marketing', label: '营销工具', icon: Megaphone },
      { id: 'duoduo', label: '多多进宝', icon: TrendingUp },
      { id: 'analytics', label: '数据中心', icon: BarChart3 },
      { id: 'finance', label: '资金账户', icon: Wallet },
      { id: 'settings', label: '店铺设置', icon: Settings },
    ],
  },
  douyin: {
    name: '抖音电商',
    scene: 'domestic',
    color: 'from-pink-500 to-purple-500',
    bgColor: 'bg-pink-500',
    menus: [
      { id: 'home', label: '首页', icon: Home },
      { id: 'products', label: '商品管理', icon: Package },
      { id: 'live', label: '直播带货', icon: Radio },
      { id: 'video', label: '短视频', icon: Video },
      { id: 'orders', label: '订单管理', icon: ShoppingCart },
      { id: 'marketing', label: '营销推广', icon: Megaphone },
      { id: 'analytics', label: '电商罗盘', icon: BarChart3 },
      { id: 'finance', label: '结算中心', icon: Wallet },
      { id: 'settings', label: '店铺设置', icon: Settings },
    ],
  },
  // 跨境电商
  amazon: {
    name: 'Amazon',
    scene: 'crossborder',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500',
    menus: [
      { id: 'home', label: 'Dashboard', icon: Home },
      { id: 'inventory', label: 'Inventory', icon: Package },
      { id: 'orders', label: 'Orders', icon: ShoppingCart },
      { id: 'advertising', label: 'Advertising', icon: Megaphone },
      { id: 'fba', label: 'FBA', icon: Box },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
      { id: 'performance', label: 'Performance', icon: TrendingUp },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
  shopee: {
    name: 'Shopee',
    scene: 'crossborder',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500',
    menus: [
      { id: 'home', label: '首页', icon: Home },
      { id: 'products', label: '商品管理', icon: Package },
      { id: 'orders', label: '订单管理', icon: ShoppingCart },
      { id: 'marketing', label: '营销中心', icon: Megaphone },
      { id: 'logistics', label: '物流管理', icon: Truck },
      { id: 'analytics', label: '数据中心', icon: BarChart3 },
      { id: 'finance', label: '财务中心', icon: Wallet },
      { id: 'settings', label: '店铺设置', icon: Settings },
    ],
  },
  lazada: {
    name: 'Lazada',
    scene: 'crossborder',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-600',
    menus: [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'products', label: 'Products', icon: Package },
      { id: 'orders', label: 'Orders', icon: ShoppingCart },
      { id: 'marketing', label: 'Marketing', icon: Megaphone },
      { id: 'logistics', label: 'Logistics', icon: Truck },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'finance', label: 'Finance', icon: Wallet },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
  // 外贸独立站
  shopify: {
    name: 'Shopify',
    scene: 'independent',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500',
    menus: [
      { id: 'home', label: '首页', icon: Home },
      { id: 'orders', label: '订单', icon: ShoppingCart },
      { id: 'products', label: '产品', icon: Package },
      { id: 'customers', label: '客户', icon: Users },
      { id: 'analytics', label: '分析', icon: BarChart3 },
      { id: 'marketing', label: '营销', icon: Megaphone },
      { id: 'themes', label: '主题', icon: Palette },
      { id: 'payments', label: '支付', icon: CreditCard },
      { id: 'shipping', label: '物流', icon: Truck },
      { id: 'settings', label: '设置', icon: Settings },
    ],
  },
  shoplazza: {
    name: 'Shoplazza',
    scene: 'independent',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500',
    menus: [
      { id: 'home', label: '首页', icon: Home },
      { id: 'products', label: '商品管理', icon: Package },
      { id: 'orders', label: '订单管理', icon: ShoppingCart },
      { id: 'customers', label: '客户管理', icon: Users },
      { id: 'marketing', label: '营销推广', icon: Megaphone },
      { id: 'analytics', label: '数据分析', icon: BarChart3 },
      { id: 'themes', label: '主题装修', icon: Palette },
      { id: 'payments', label: '支付设置', icon: CreditCard },
      { id: 'shipping', label: '物流设置', icon: Truck },
      { id: 'settings', label: '店铺设置', icon: Settings },
    ],
  },
  woocommerce: {
    name: 'WooCommerce',
    scene: 'independent',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500',
    menus: [
      { id: 'home', label: 'Dashboard', icon: Home },
      { id: 'orders', label: 'Orders', icon: ShoppingCart },
      { id: 'products', label: 'Products', icon: Package },
      { id: 'customers', label: 'Customers', icon: Users },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'marketing', label: 'Marketing', icon: Megaphone },
      { id: 'extensions', label: 'Extensions', icon: Grid3X3 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
};

// 模拟店铺数据
const mockStoreData = {
  'store-1': {
    name: '潮流服饰旗舰店',
    platform: 'taobao',
    products: [
      { id: '1', title: '夏季连衣裙', price: 299, inventory: 50, status: 'active', sales: 128 },
      { id: '2', title: '休闲T恤', price: 99, inventory: 100, status: 'active', sales: 256 },
      { id: '3', title: '牛仔裤', price: 199, inventory: 30, status: 'active', sales: 89 },
    ],
    orders: [],
    stats: { visitors: 1560, orders: 48, revenue: 12850, conversion: 3.1 },
  },
  'store-2': {
    name: 'TechGadget Store',
    platform: 'amazon',
    products: [
      { id: '1', title: 'Wireless Earbuds', price: 29.99, inventory: 200, status: 'active', sales: 456 },
      { id: '2', title: 'Phone Case', price: 9.99, inventory: 500, status: 'active', sales: 892 },
    ],
    orders: [],
    stats: { visitors: 3200, orders: 89, revenue: 4560, conversion: 2.8 },
  },
  'store-3': {
    name: 'Fashion Plus',
    platform: 'shopify',
    products: [
      { id: '1', title: 'Summer Dress', price: 49.99, inventory: 80, status: 'active', sales: 234 },
      { id: '2', title: 'Casual Top', price: 29.99, inventory: 150, status: 'active', sales: 456 },
      { id: '3', title: 'Denim Jeans', price: 59.99, inventory: 60, status: 'active', sales: 178 },
    ],
    orders: [],
    stats: { visitors: 4500, orders: 234, revenue: 18500, conversion: 5.2 },
  },
};

// 实训任务
const mockTasks = [
  { id: '1', title: '完成店铺基础设置', completed: true, priority: 'high' },
  { id: '2', title: '上传至少10款产品', completed: true, priority: 'high' },
  { id: '3', title: '配置支付方式', completed: true, priority: 'high' },
  { id: '4', title: '设置物流方案', completed: false, priority: 'medium' },
  { id: '5', title: '创建营销活动', completed: false, priority: 'medium' },
  { id: '6', title: '优化产品详情页', completed: false, priority: 'low' },
];

export default function StoreAdminPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;
  
  const [adminSection, setAdminSection] = useState('home');
  const [store, setStore] = useState(mockStoreData[storeId as keyof typeof mockStoreData] || mockStoreData['store-3']);
  
  const platformConfig = platformConfigs[store.platform as keyof typeof platformConfigs] || platformConfigs.shopify;

  // 更新店铺信息（模拟API）
  useEffect(() => {
    // 这里可以从API获取店铺数据
  }, [storeId]);

  const completedTasks = mockTasks.filter(t => t.completed).length;
  const progress = Math.round((completedTasks / mockTasks.length) * 100);

  // 获取场景颜色
  const getSceneColor = () => {
    switch (platformConfig.scene) {
      case 'domestic': return 'from-orange-500 to-red-500';
      case 'crossborder': return 'from-blue-500 to-indigo-500';
      case 'independent': return 'from-emerald-500 to-teal-500';
      default: return 'from-slate-700 to-slate-900';
    }
  };

  // 渲染首页内容
  const renderHomeContent = () => (
    <div className="space-y-6">
      {/* 欢迎卡片 */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">欢迎来到{platformConfig.name}后台！</h2>
              <p className="text-slate-300 mt-1">开始您的电商运营实训之旅</p>
              <div className="mt-4 flex gap-3">
                <Button variant="secondary" size="sm" onClick={() => setAdminSection('products')}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加产品
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => router.push(`/student/practice/preview/${storeId}`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  预览店铺
                </Button>
              </div>
            </div>
            <Store className="h-20 w-20 text-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* 数据概览 */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">今日访客</p>
                <p className="text-xl font-bold text-slate-800">{store.stats.visitors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">今日订单</p>
                <p className="text-xl font-bold text-slate-800">{store.stats.orders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">今日销售额</p>
                <p className="text-xl font-bold text-slate-800">${store.stats.revenue.toLocaleString()}</p>
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
                <p className="text-xl font-bold text-slate-800">{store.stats.conversion}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快速操作和产品列表 */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">快速操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: '添加产品', icon: Package, section: 'products' },
              { label: '查看订单', icon: ShoppingCart, section: 'orders' },
              { label: '营销推广', icon: Megaphone, section: 'marketing' },
              { label: '数据分析', icon: BarChart3, section: 'analytics' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => setAdminSection(action.section)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <action.icon className="h-5 w-5 text-slate-400" />
                <span className="text-sm text-slate-700">{action.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-300 ml-auto" />
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
              {store.products.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                    <Package className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{product.title}</p>
                    <p className="text-xs text-slate-500">
                      ${product.price} · 库存 {product.inventory} · 销量 {product.sales}
                    </p>
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
                <p className="text-sm font-medium text-emerald-800">当前进度</p>
                <Progress value={progress} className="h-1.5 mt-2" />
                <p className="text-xs text-emerald-600 mt-1">{completedTasks}/{mockTasks.length} 任务完成</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm font-medium text-amber-800">下一步</p>
                <p className="text-sm text-amber-600 mt-1">设置物流配送方案</p>
              </div>
              <Button size="sm" className={`w-full bg-gradient-to-r ${getSceneColor()}`}>
                查看完整教程
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // 渲染产品管理
  const renderProductsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">产品管理</h2>
          <p className="text-slate-500">管理您的产品信息和库存</p>
        </div>
        <Button className={`bg-gradient-to-r ${getSceneColor()}`}>
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">销量</th>
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
                    <td className="px-4 py-4 text-slate-600">{product.sales}</td>
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
  );

  // 渲染订单管理
  const renderOrdersContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">订单管理</h2>
        <p className="text-slate-500">处理客户订单和售后</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-medium text-slate-800 mb-2">暂无订单</h3>
          <p className="text-sm text-slate-500">
            完成推广任务后，将生成模拟订单数据
          </p>
        </CardContent>
      </Card>
    </div>
  );

  // 渲染营销推广
  const renderMarketingContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">营销推广</h2>
        <p className="text-slate-500">创建营销活动，推广您的产品</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {platformConfig.scene === 'domestic' && (
          <>
            <Card className="border-0 shadow-lg hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <Video className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">直播带货</CardTitle>
                    <CardDescription>开启直播，实时互动销售</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button size="sm" className={`w-full bg-gradient-to-r ${getSceneColor()}`}>
                  开始直播
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Percent className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">促销活动</CardTitle>
                    <CardDescription>创建限时折扣、优惠券等</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button size="sm" className={`w-full bg-gradient-to-r ${getSceneColor()}`}>
                  创建活动
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {platformConfig.scene === 'crossborder' && (
          <>
            <Card className="border-0 shadow-lg hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Megaphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">站内广告</CardTitle>
                    <CardDescription>平台搜索广告、展示广告</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button size="sm" className={`w-full bg-gradient-to-r ${getSceneColor()}`}>
                  创建广告
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Percent className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">促销活动</CardTitle>
                    <CardDescription>秒杀、优惠券、满减活动</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button size="sm" className={`w-full bg-gradient-to-r ${getSceneColor()}`}>
                  创建活动
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {platformConfig.scene === 'independent' && (
          <>
            <Card className="border-0 shadow-lg hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Google Ads</CardTitle>
                    <CardDescription>搜索引擎广告投放</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/student/ads">
                  <Button size="sm" className={`w-full bg-gradient-to-r ${getSceneColor()}`}>
                    创建广告
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Facebook Ads</CardTitle>
                    <CardDescription>社交媒体广告投放</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/student/ads">
                  <Button size="sm" className={`w-full bg-gradient-to-r ${getSceneColor()}`}>
                    创建广告
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );

  // 渲染数据分析
  const renderAnalyticsContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">数据分析</h2>
        <p className="text-slate-500">查看店铺运营数据</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">流量趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end gap-2">
              {[35, 45, 38, 52, 48, 62, 55].map((height, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(day => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">销售概览</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">总销售额</span>
              <span className="font-bold text-slate-800">${store.stats.revenue.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">总订单数</span>
              <span className="font-bold text-slate-800">{store.stats.orders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">平均客单价</span>
              <span className="font-bold text-slate-800">${(store.stats.revenue / store.stats.orders).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">转化率</span>
              <span className="font-bold text-slate-800">{store.stats.conversion}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // 渲染设置页面
  const renderSettingsContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">店铺设置</h2>
        <p className="text-slate-500">管理店铺基本信息和配置</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '基本信息', desc: '店铺名称、联系方式', icon: Store },
          { label: '支付设置', desc: '支付方式配置', icon: CreditCard },
          { label: '物流设置', desc: '配送方案管理', icon: Truck },
          { label: '主题装修', desc: '店铺外观设计', icon: Palette },
          { label: '通知设置', desc: '消息通知配置', icon: Bell },
          { label: '法律政策', desc: '隐私政策、服务条款', icon: FileText },
        ].map((item) => (
          <Card key={item.label} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // 根据section渲染内容
  const renderContent = () => {
    switch (adminSection) {
      case 'home':
        return renderHomeContent();
      case 'products':
      case 'inventory':
        return renderProductsContent();
      case 'orders':
        return renderOrdersContent();
      case 'marketing':
      case 'advertising':
        return renderMarketingContent();
      case 'analytics':
      case 'reports':
        return renderAnalyticsContent();
      case 'settings':
        return renderSettingsContent();
      default:
        return (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Settings className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-medium text-slate-800 mb-2">功能开发中</h3>
              <p className="text-sm text-slate-500">该模块正在开发中，敬请期待</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/student/practice')}
              className="text-slate-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回店铺列表
            </Button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getSceneColor()} flex items-center justify-center`}>
                <Store className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-slate-800">{store.name}</span>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                {platformConfig.name}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.push(`/student/practice/preview/${storeId}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              预览前台
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">
              张
            </div>
          </div>
        </div>
      </header>

      {/* 平台侧边导航 */}
      <aside className="fixed left-0 top-14 bottom-0 w-56 bg-white border-r border-slate-200 overflow-y-auto z-40">
        <div className="p-4">
          <nav className="space-y-1">
            {platformConfig.menus.map((item) => (
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
            {mockTasks.slice(0, 4).map((task) => (
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
      <main className="ml-56 mt-14 p-6">
        {renderContent()}
      </main>
    </div>
  );
}
