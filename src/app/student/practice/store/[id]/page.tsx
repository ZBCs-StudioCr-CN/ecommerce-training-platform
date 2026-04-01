'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  FileText,
  Wallet,
  Percent,
  Video,
  Radio,
  Box,
  Clock,
  Star,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  MessageCircle,
  Image as ImageIcon,
  FileSpreadsheet,
  PieChart,
  Activity,
  Target,
  Award,
  Zap,
  Layers,
  Grid,
  List,
  Calendar,
  RefreshCw,
  HelpCircle,
  Menu,
  X,
  Crown,
  Gift,
  Ticket,
  PercentCircle,
  BarChart,
  LineChart,
  MousePointer,
  Link2,
  Send,
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  Lock,
  Shield,
  AlertCircle,
  CheckSquare,
  Square,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ============================================
// 平台配置 - 1:1复刻真实后台
// ============================================

const platformConfigs = {
  // 淘宝/天猫 - 千牛卖家中心风格
  taobao: {
    name: '淘宝/天猫',
    scene: 'domestic',
    // 淘宝橙色调
    headerBg: 'bg-gradient-to-r from-orange-500 to-orange-600',
    sidebarBg: 'bg-slate-800',
    activeColor: 'bg-orange-500',
    activeText: 'text-orange-500',
    logo: '千牛',
    menus: [
      { 
        id: 'home', 
        label: '首页概览', 
        icon: Home,
        children: []
      },
      { 
        id: 'products', 
        label: '商品管理', 
        icon: Package,
        children: [
          { id: 'products-list', label: '商品列表' },
          { id: 'products-add', label: '发布商品' },
          { id: 'products-category', label: '类目管理' },
          { id: 'products-inventory', label: '库存管理' },
        ]
      },
      { 
        id: 'orders', 
        label: '交易管理', 
        icon: ShoppingCart,
        children: [
          { id: 'orders-all', label: '全部订单' },
          { id: 'orders-waiting', label: '待付款' },
          { id: 'orders-shipping', label: '待发货' },
          { id: 'orders-shipped', label: '已发货' },
          { id: 'orders-refund', label: '退款管理' },
        ]
      },
      { 
        id: 'marketing', 
        label: '营销推广', 
        icon: Megaphone,
        children: [
          { id: 'marketing-promo', label: '促销活动' },
          { id: 'marketing-coupon', label: '优惠券' },
          { id: 'marketing-live', label: '直播带货' },
          { id: 'marketing-ad', label: '直通车' },
        ]
      },
      { 
        id: 'customers', 
        label: '客户运营', 
        icon: Users,
        children: [
          { id: 'customers-list', label: '客户列表' },
          { id: 'customers-group', label: '客户分组' },
          { id: 'customers-vip', label: '会员管理' },
        ]
      },
      { 
        id: 'analytics', 
        label: '数据中心', 
        icon: BarChart3,
        children: [
          { id: 'analytics-overview', label: '经营概况' },
          { id: 'analytics-traffic', label: '流量分析' },
          { id: 'analytics-product', label: '商品分析' },
          { id: 'analytics-trade', label: '交易分析' },
        ]
      },
      { 
        id: 'finance', 
        label: '财务管理', 
        icon: Wallet,
        children: []
      },
      { 
        id: 'settings', 
        label: '店铺设置', 
        icon: Settings,
        children: []
      },
    ],
  },

  // 拼多多 - 商家后台风格
  pdd: {
    name: '拼多多',
    scene: 'domestic',
    // 拼多多红色调
    headerBg: 'bg-white border-b border-red-100',
    sidebarBg: 'bg-red-600',
    activeColor: 'bg-red-500',
    activeText: 'text-red-500',
    logo: '拼多多商家版',
    menus: [
      { id: 'home', label: '首页', icon: Home, children: [] },
      { id: 'products', label: '商品管理', icon: Package, children: [
        { id: 'products-list', label: '商品列表' },
        { id: 'products-add', label: '发布商品' },
        { id: 'products-stock', label: '库存预警' },
      ]},
      { id: 'orders', label: '订单查询', icon: ShoppingCart, children: [
        { id: 'orders-all', label: '全部订单' },
        { id: 'orders-group', label: '拼团订单' },
        { id: 'orders-refund', label: '售后订单' },
      ]},
      { id: 'marketing', label: '营销工具', icon: Megaphone, children: [
        { id: 'marketing-coupon', label: '优惠券' },
        { id: 'marketing-bargain', label: '砍价活动' },
        { id: 'marketing-seckill', label: '限时秒杀' },
      ]},
      { id: 'duoduo', label: '多多进宝', icon: TrendingUp, children: [] },
      { id: 'analytics', label: '数据中心', icon: BarChart3, children: [
        { id: 'analytics-overview', label: '经营数据' },
        { id: 'analytics-traffic', label: '流量数据' },
        { id: 'analytics-product', label: '商品数据' },
      ]},
      { id: 'finance', label: '资金账户', icon: Wallet, children: [] },
      { id: 'settings', label: '店铺设置', icon: Settings, children: [] },
    ],
  },

  // 抖音电商 - 抖店后台风格
  douyin: {
    name: '抖音电商',
    scene: 'domestic',
    // 抖音粉紫色调
    headerBg: 'bg-white border-b border-slate-100',
    sidebarBg: 'bg-slate-900',
    activeColor: 'bg-pink-500',
    activeText: 'text-pink-500',
    logo: '抖店',
    menus: [
      { id: 'home', label: '首页', icon: Home, children: [] },
      { id: 'products', label: '商品管理', icon: Package, children: [
        { id: 'products-list', label: '商品列表' },
        { id: 'products-add', label: '创建商品' },
      ]},
      { id: 'live', label: '直播带货', icon: Video, children: [
        { id: 'live-room', label: '直播间管理' },
        { id: 'live-products', label: '直播商品' },
        { id: 'live-data', label: '直播数据' },
      ]},
      { id: 'video', label: '短视频', icon: Radio, children: [
        { id: 'video-list', label: '视频管理' },
        { id: 'video-products', label: '视频带货' },
      ]},
      { id: 'orders', label: '订单管理', icon: ShoppingCart, children: [] },
      { id: 'marketing', label: '营销推广', icon: Megaphone, children: [] },
      { id: 'analytics', label: '电商罗盘', icon: PieChart, children: [
        { id: 'analytics-overview', label: '核心数据' },
        { id: 'analytics-content', label: '内容分析' },
        { id: 'analytics-user', label: '用户分析' },
      ]},
      { id: 'finance', label: '结算中心', icon: Wallet, children: [] },
      { id: 'settings', label: '店铺设置', icon: Settings, children: [] },
    ],
  },

  // Amazon - Seller Central风格
  amazon: {
    name: 'Amazon',
    scene: 'crossborder',
    // Amazon深蓝色调
    headerBg: 'bg-slate-900',
    sidebarBg: 'bg-white border-r border-slate-200',
    activeColor: 'bg-amber-500',
    activeText: 'text-amber-600',
    logo: 'Seller Central',
    menus: [
      { id: 'home', label: 'Dashboard', icon: Home, children: [] },
      { id: 'inventory', label: 'Inventory', icon: Package, children: [
        { id: 'inventory-manage', label: 'Manage Inventory' },
        { id: 'inventory-add', label: 'Add a Product' },
        { id: 'inventory-reports', label: 'Inventory Reports' },
      ]},
      { id: 'orders', label: 'Orders', icon: ShoppingCart, children: [
        { id: 'orders-manage', label: 'Manage Orders' },
        { id: 'orders-reports', label: 'Order Reports' },
        { id: 'orders-returns', label: 'Returns' },
      ]},
      { id: 'advertising', label: 'Advertising', icon: Megaphone, children: [
        { id: 'ads-campaigns', label: 'Campaigns' },
        { id: 'ads-sponsored', label: 'Sponsored Products' },
        { id: 'ads-reports', label: 'Advertising Reports' },
      ]},
      { id: 'fba', label: 'Fulfillment', icon: Box, children: [
        { id: 'fba-inventory', label: 'FBA Inventory' },
        { id: 'fba-shipments', label: 'Shipments' },
      ]},
      { id: 'reports', label: 'Reports', icon: BarChart3, children: [
        { id: 'reports-business', label: 'Business Reports' },
        { id: 'reports-finance', label: 'Finance' },
        { id: 'reports-sales', label: 'Sales' },
      ]},
      { id: 'performance', label: 'Performance', icon: Activity, children: [
        { id: 'performance-account', label: 'Account Health' },
        { id: 'performance-feedback', label: 'Feedback' },
        { id: 'performance-reviews', label: 'Reviews' },
      ]},
      { id: 'settings', label: 'Settings', icon: Settings, children: [] },
    ],
  },

  // Shopee - 卖家中心风格
  shopee: {
    name: 'Shopee',
    scene: 'crossborder',
    // Shopee橙色调
    headerBg: 'bg-orange-500',
    sidebarBg: 'bg-white border-r border-slate-200',
    activeColor: 'bg-orange-500',
    activeText: 'text-orange-500',
    logo: 'Shopee Seller',
    menus: [
      { id: 'home', label: '首页', icon: Home, children: [] },
      { id: 'products', label: '商品管理', icon: Package, children: [
        { id: 'products-all', label: '全部商品' },
        { id: 'products-add', label: '新增商品' },
        { id: 'products-banned', label: '违规商品' },
      ]},
      { id: 'orders', label: '订单管理', icon: ShoppingCart, children: [
        { id: 'orders-all', label: '全部订单' },
        { id: 'orders-process', label: '待处理' },
        { id: 'orders-ship', label: '待出货' },
        { id: 'orders-cancel', label: '取消/退货' },
      ]},
      { id: 'marketing', label: '营销中心', icon: Megaphone, children: [
        { id: 'marketing-promo', label: '促销活动' },
        { id: 'marketing-ads', label: '广告' },
        { id: 'marketing-voucher', label: '优惠券' },
      ]},
      { id: 'logistics', label: '物流管理', icon: Truck, children: [] },
      { id: 'analytics', label: '数据中心', icon: BarChart3, children: [
        { id: 'analytics-overview', label: '店铺表现' },
        { id: 'analytics-product', label: '商品分析' },
        { id: 'analytics-traffic', label: '流量来源' },
      ]},
      { id: 'finance', label: '财务中心', icon: Wallet, children: [] },
      { id: 'settings', label: '店铺设置', icon: Settings, children: [] },
    ],
  },

  // Lazada - 卖家中心风格
  lazada: {
    name: 'Lazada',
    scene: 'crossborder',
    // Lazada蓝色调
    headerBg: 'bg-blue-600',
    sidebarBg: 'bg-white border-r border-slate-200',
    activeColor: 'bg-blue-600',
    activeText: 'text-blue-600',
    logo: 'Lazada Seller Center',
    menus: [
      { id: 'home', label: 'Home', icon: Home, children: [] },
      { id: 'products', label: 'Products', icon: Package, children: [
        { id: 'products-manage', label: 'Manage Products' },
        { id: 'products-add', label: 'Add Products' },
        { id: 'products-category', label: 'Category Management' },
      ]},
      { id: 'orders', label: 'Orders', icon: ShoppingCart, children: [
        { id: 'orders-manage', label: 'Manage Orders' },
        { id: 'orders-pending', label: 'Pending Orders' },
        { id: 'orders-returns', label: 'Returns' },
      ]},
      { id: 'marketing', label: 'Marketing', icon: Megaphone, children: [
        { id: 'marketing-promo', label: 'Promotions' },
        { id: 'marketing-ads', label: 'Sponsored Solutions' },
      ]},
      { id: 'logistics', label: 'Logistics', icon: Truck, children: [] },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, children: [
        { id: 'analytics-overview', label: 'Overview' },
        { id: 'analytics-seller', label: 'Seller Metrics' },
      ]},
      { id: 'finance', label: 'Finance', icon: Wallet, children: [] },
      { id: 'settings', label: 'Settings', icon: Settings, children: [] },
    ],
  },

  // Shopify - 经典后台风格
  shopify: {
    name: 'Shopify',
    scene: 'independent',
    // Shopify绿色调
    headerBg: 'bg-slate-900',
    sidebarBg: 'bg-slate-900',
    activeColor: 'bg-emerald-500',
    activeText: 'text-emerald-500',
    logo: 'Shopify',
    menus: [
      { id: 'home', label: 'Home', icon: Home, children: [] },
      { id: 'orders', label: 'Orders', icon: ShoppingCart, children: [
        { id: 'orders-all', label: 'All orders' },
        { id: 'orders-drafts', label: 'Drafts' },
        { id: 'orders-abandoned', label: 'Abandoned checkouts' },
      ]},
      { id: 'products', label: 'Products', icon: Package, children: [
        { id: 'products-all', label: 'All products' },
        { id: 'products-add', label: 'Add product' },
        { id: 'products-collections', label: 'Collections' },
        { id: 'products-inventory', label: 'Inventory' },
      ]},
      { id: 'customers', label: 'Customers', icon: Users, children: [] },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, children: [
        { id: 'analytics-overview', label: 'Overview' },
        { id: 'analytics-reports', label: 'Reports' },
        { id: 'analytics-live', label: 'Live view' },
      ]},
      { id: 'marketing', label: 'Marketing', icon: Megaphone, children: [] },
      { id: 'discounts', label: 'Discounts', icon: Tag, children: [] },
      { id: 'themes', label: 'Online Store', icon: Palette, children: [
        { id: 'themes-main', label: 'Themes' },
        { id: 'themes-blog', label: 'Blog posts' },
        { id: 'themes-pages', label: 'Pages' },
      ]},
      { id: 'settings', label: 'Settings', icon: Settings, children: [] },
    ],
  },

  // Shoplazza 店匠
  shoplazza: {
    name: 'Shoplazza',
    scene: 'independent',
    // 店匠蓝色调
    headerBg: 'bg-white border-b border-slate-200',
    sidebarBg: 'bg-slate-800',
    activeColor: 'bg-blue-500',
    activeText: 'text-blue-500',
    logo: '店匠',
    menus: [
      { id: 'home', label: '首页', icon: Home, children: [] },
      { id: 'products', label: '商品管理', icon: Package, children: [
        { id: 'products-list', label: '商品列表' },
        { id: 'products-add', label: '添加商品' },
        { id: 'products-category', label: '商品分类' },
        { id: 'products-stock', label: '库存管理' },
      ]},
      { id: 'orders', label: '订单管理', icon: ShoppingCart, children: [
        { id: 'orders-all', label: '全部订单' },
        { id: 'orders-pending', label: '待处理订单' },
        { id: 'orders-refund', label: '退款订单' },
      ]},
      { id: 'customers', label: '客户管理', icon: Users, children: [] },
      { id: 'marketing', label: '营销推广', icon: Megaphone, children: [
        { id: 'marketing-promo', label: '促销活动' },
        { id: 'marketing-coupon', label: '优惠券' },
        { id: 'marketing-email', label: '邮件营销' },
      ]},
      { id: 'analytics', label: '数据分析', icon: BarChart3, children: [] },
      { id: 'themes', label: '主题装修', icon: Palette, children: [] },
      { id: 'payments', label: '支付设置', icon: CreditCard, children: [] },
      { id: 'shipping', label: '物流设置', icon: Truck, children: [] },
      { id: 'settings', label: '店铺设置', icon: Settings, children: [] },
    ],
  },

  // WooCommerce
  woocommerce: {
    name: 'WooCommerce',
    scene: 'independent',
    // WooCommerce紫色调
    headerBg: 'bg-slate-700',
    sidebarBg: 'bg-slate-800',
    activeColor: 'bg-purple-500',
    activeText: 'text-purple-400',
    logo: 'WooCommerce',
    menus: [
      { id: 'home', label: 'Dashboard', icon: Home, children: [] },
      { id: 'orders', label: 'Orders', icon: ShoppingCart, children: [
        { id: 'orders-all', label: 'All orders' },
        { id: 'orders-add', label: 'Add new' },
      ]},
      { id: 'products', label: 'Products', icon: Package, children: [
        { id: 'products-all', label: 'All products' },
        { id: 'products-add', label: 'Add new' },
        { id: 'products-categories', label: 'Categories' },
        { id: 'products-tags', label: 'Tags' },
      ]},
      { id: 'customers', label: 'Customers', icon: Users, children: [] },
      { id: 'analytics', label: 'Analytics', icon: BarChart3, children: [
        { id: 'analytics-overview', label: 'Overview' },
        { id: 'analytics-revenue', label: 'Revenue' },
        { id: 'analytics-orders', label: 'Orders' },
        { id: 'analytics-products', label: 'Products' },
      ]},
      { id: 'marketing', label: 'Marketing', icon: Megaphone, children: [] },
      { id: 'extensions', label: 'Extensions', icon: Grid, children: [] },
      { id: 'settings', label: 'Settings', icon: Settings, children: [] },
    ],
  },
};

// 模拟店铺数据
const mockStoreData: Record<string, { name: string; platform: string; products: any[]; orders: any[]; stats: any }> = {
  'store-1': {
    name: '潮流服饰旗舰店',
    platform: 'taobao',
    products: [
      { id: '1', title: '2024夏季新款连衣裙', price: 299, originalPrice: 599, inventory: 50, status: 'active', sales: 1280, views: 15600 },
      { id: '2', title: '纯棉休闲T恤', price: 99, originalPrice: 199, inventory: 100, status: 'active', sales: 2560, views: 28900 },
      { id: '3', title: '高腰牛仔裤显瘦修身', price: 199, originalPrice: 399, inventory: 30, status: 'active', sales: 890, views: 12400 },
      { id: '4', title: '针织开衫外套春秋薄款', price: 159, originalPrice: 299, inventory: 45, status: 'active', sales: 678, views: 8900 },
    ],
    orders: [],
    stats: { 
      visitors: 15680, 
      orders: 156, 
      revenue: 42850, 
      conversion: 3.2,
      pendingOrders: 12,
      waitingShip: 8,
      waitingPay: 5,
    },
  },
  'store-2': {
    name: 'TechGadget Store',
    platform: 'amazon',
    products: [
      { id: '1', title: 'Wireless Bluetooth Earbuds Pro', price: 29.99, inventory: 200, status: 'active', sales: 4560, views: 89200 },
      { id: '2', title: 'Silicone Phone Case for iPhone 15', price: 9.99, inventory: 500, status: 'active', sales: 8920, views: 156000 },
      { id: '3', title: 'USB-C Fast Charging Cable 3-Pack', price: 14.99, inventory: 300, status: 'active', sales: 6780, views: 98400 },
    ],
    orders: [],
    stats: { visitors: 32000, orders: 89, revenue: 4560, conversion: 2.8 },
  },
  'store-3': {
    name: 'Fashion Plus',
    platform: 'shopify',
    products: [
      { id: '1', title: 'Summer Floral Dress', price: 49.99, inventory: 80, status: 'active', sales: 2340, views: 45000 },
      { id: '2', title: 'Casual Cotton Top', price: 29.99, inventory: 150, status: 'active', sales: 4560, views: 78000 },
      { id: '3', title: 'Classic Denim Jeans', price: 59.99, inventory: 60, status: 'active', sales: 1780, views: 34000 },
      { id: '4', title: 'Elegant Blouse', price: 39.99, inventory: 90, status: 'active', sales: 1230, views: 28000 },
      { id: '5', title: 'Cozy Cardigan', price: 44.99, inventory: 70, status: 'active', sales: 890, views: 19000 },
    ],
    orders: [],
    stats: { visitors: 45000, orders: 234, revenue: 18500, conversion: 5.2 },
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
  
  const [activeMenu, setActiveMenu] = useState('home');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['products']);
  const [store] = useState(mockStoreData[storeId as keyof typeof mockStoreData] || mockStoreData['store-3']);
  
  const platformConfig = platformConfigs[store.platform as keyof typeof platformConfigs] || platformConfigs.shopify;

  const completedTasks = mockTasks.filter(t => t.completed).length;
  const progress = Math.round((completedTasks / mockTasks.length) * 100);

  // 切换菜单展开
  const toggleMenuExpand = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  // 判断是否为国内平台（显示中文）
  const isChinesePlatform = ['taobao', 'pdd', 'douyin', 'shoplazza'].includes(store.platform);
  const isDarkSidebar = ['taobao', 'douyin', 'shopify', 'shoplazza', 'woocommerce'].includes(store.platform);

  // ========================================
  // 渲染首页概览（根据不同平台风格）
  // ========================================
  const renderHomeContent = () => {
    // Amazon风格首页
    if (store.platform === 'amazon') {
      return (
        <div className="p-6 space-y-6">
          {/* Amazon风格欢迎卡片 */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 text-white">
            <h2 className="text-xl font-medium">Welcome to Seller Central</h2>
            <p className="text-slate-300 mt-1">Manage your Amazon seller account</p>
          </div>

          {/* 关键指标卡片 */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Today's Orders</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">{store.stats.orders}</div>
              <div className="text-xs text-green-600 mt-1">↑ 12% vs last week</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Today's Sales</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">${store.stats.revenue.toLocaleString()}</div>
              <div className="text-xs text-green-600 mt-1">↑ 8% vs last week</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Sessions</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">{store.stats.visitors.toLocaleString()}</div>
              <div className="text-xs text-green-600 mt-1">↑ 15% vs last week</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Buy Box %</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">78%</div>
              <div className="text-xs text-slate-500 mt-1">Last 7 days</div>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-medium text-slate-800 mb-3">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => setActiveMenu('inventory-add')} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm text-slate-600 flex items-center gap-2">
                  <Package className="h-4 w-4" /> Add a Product
                </button>
                <button onClick={() => setActiveMenu('orders-manage')} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm text-slate-600 flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> Manage Orders
                </button>
                <button onClick={() => setActiveMenu('ads-campaigns')} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm text-slate-600 flex items-center gap-2">
                  <Megaphone className="h-4 w-4" /> Advertising Campaigns
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-medium text-slate-800 mb-3">Account Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Order Defect Rate</span>
                  <span className="text-sm font-medium text-green-600">0.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Late Shipment Rate</span>
                  <span className="text-sm font-medium text-green-600">1.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Customer Feedback</span>
                  <span className="text-sm font-medium text-amber-500">4.5 ★</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-medium text-slate-800 mb-3">FBA Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">FBA Inventory</span>
                  <span className="font-medium text-slate-800">{store.products.length} items</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">FBA Orders</span>
                  <span className="font-medium text-slate-800">{Math.round(store.stats.orders * 0.7)}</span>
                </div>
                <button className="w-full mt-2 px-3 py-2 bg-slate-800 text-white rounded text-sm hover:bg-slate-700">
                  View FBA Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* 产品列表 */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-medium text-slate-800">Top Products</h3>
              <button onClick={() => setActiveMenu('inventory-manage')} className="text-sm text-blue-600 hover:underline">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Product Name</th>
                    <th className="px-4 py-3 text-left">SKU</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Units Sold</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {store.products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-800">{product.title}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">SKU-{product.id}</td>
                      <td className="px-4 py-3 text-sm text-slate-800 text-right">${product.price}</td>
                      <td className="px-4 py-3 text-sm text-slate-800 text-right">{product.sales}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // 淘宝/天猫风格首页
    if (store.platform === 'taobao') {
      return (
        <div className="p-4 space-y-4 bg-slate-100 min-h-screen">
          {/* 淘宝风格顶部数据卡 */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-80">待付款订单</div>
                  <div className="text-2xl font-bold mt-1">{store.stats.waitingPay}</div>
                </div>
                <ShoppingCart className="h-8 w-8 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-80">待发货订单</div>
                  <div className="text-2xl font-bold mt-1">{store.stats.waitingShip}</div>
                </div>
                <Package className="h-8 w-8 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-80">今日销售额</div>
                  <div className="text-2xl font-bold mt-1">¥{(store.stats.revenue * 7).toLocaleString()}</div>
                </div>
                <DollarSign className="h-8 w-8 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-80">今日访客</div>
                  <div className="text-2xl font-bold mt-1">{store.stats.visitors.toLocaleString()}</div>
                </div>
                <Users className="h-8 w-8 opacity-50" />
              </div>
            </div>
          </div>

          {/* 快捷入口 */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-800">快捷入口</h3>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="grid grid-cols-8 gap-4">
              {[
                { icon: Package, label: '发布商品', menu: 'products-add' },
                { icon: ShoppingCart, label: '订单管理', menu: 'orders-all' },
                { icon: Megaphone, label: '促销活动', menu: 'marketing-promo' },
                { icon: Video, label: '直播带货', menu: 'marketing-live' },
                { icon: Ticket, label: '优惠券', menu: 'marketing-coupon' },
                { icon: BarChart3, label: '经营分析', menu: 'analytics-overview' },
                { icon: Users, label: '客户管理', menu: 'customers-list' },
                { icon: Settings, label: '店铺设置', menu: 'settings' },
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveMenu(item.menu)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-xs text-slate-600">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 经营数据 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-800">经营概况</h3>
                <span className="text-xs text-slate-400">今日</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">浏览量</span>
                  <span className="font-medium text-slate-800">{store.stats.visitors.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">访客数</span>
                  <span className="font-medium text-slate-800">{Math.round(store.stats.visitors * 0.7).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">支付金额</span>
                  <span className="font-medium text-slate-800">¥{(store.stats.revenue * 7).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">支付转化率</span>
                  <span className="font-medium text-orange-500">{store.stats.conversion}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-800">热销商品</h3>
                <button onClick={() => setActiveMenu('products-list')} className="text-xs text-orange-500">查看全部</button>
              </div>
              <div className="space-y-3">
                {store.products.slice(0, 3).map((product, i) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-500 text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800 truncate">{product.title}</p>
                      <p className="text-xs text-slate-500">销量 {product.sales}</p>
                    </div>
                    <span className="text-sm font-medium text-slate-800">¥{product.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 待办事项 */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-800">待办事项</h3>
              <Badge variant="secondary">{completedTasks}/{mockTasks.length} 已完成</Badge>
            </div>
            <div className="space-y-2">
              {mockTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                  {task.completed ? (
                    <CheckSquare className="h-5 w-5 text-green-500" />
                  ) : (
                    <Square className="h-5 w-5 text-slate-300" />
                  )}
                  <span className={`text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {task.title}
                  </span>
                  {!task.completed && task.priority === 'high' && (
                    <Badge className="bg-red-100 text-red-600 text-xs">紧急</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 抖音电商风格首页
    if (store.platform === 'douyin') {
      return (
        <div className="p-4 space-y-4 bg-slate-50 min-h-screen">
          {/* 抖店风格数据卡片 */}
          <div className="grid grid-cols-5 gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl p-4 text-white">
              <div className="text-sm opacity-80">今日成交金额</div>
              <div className="text-2xl font-bold mt-1">¥{(store.stats.revenue * 7).toLocaleString()}</div>
              <div className="text-xs opacity-70 mt-1">较昨日 +15%</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="text-sm text-slate-500">今日订单数</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">{store.stats.orders}</div>
              <div className="text-xs text-green-500 mt-1">↑ 12%</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="text-sm text-slate-500">今日直播间观看</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">8.5k</div>
              <div className="text-xs text-green-500 mt-1">↑ 23%</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="text-sm text-slate-500">今日新增粉丝</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">256</div>
              <div className="text-xs text-green-500 mt-1">↑ 8%</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="text-sm text-slate-500">退货率</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">2.3%</div>
              <div className="text-xs text-slate-400 mt-1">正常</div>
            </div>
          </div>

          {/* 快捷功能 */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-medium text-slate-800 mb-4">快捷功能</h3>
            <div className="grid grid-cols-5 gap-4">
              {[
                { icon: Video, label: '创建直播', color: 'bg-pink-500' },
                { icon: Radio, label: '发布视频', color: 'bg-purple-500' },
                { icon: Package, label: '上架商品', color: 'bg-blue-500' },
                { icon: Megaphone, label: '营销活动', color: 'bg-orange-500' },
                { icon: BarChart3, label: '数据分析', color: 'bg-green-500' },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-slate-600">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 直播间状态 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-800">直播间数据</h3>
                <Badge className="bg-pink-100 text-pink-600">直播中</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-800">1,256</div>
                  <div className="text-xs text-slate-500">在线人数</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-500">¥12,580</div>
                  <div className="text-xs text-slate-500">直播成交</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">89</div>
                  <div className="text-xs text-slate-500">成交订单</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-800">热门视频</h3>
                <button className="text-xs text-pink-500">查看全部</button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <div className="w-16 h-10 bg-slate-200 rounded flex items-center justify-center">
                    <Radio className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">新品开箱视频</p>
                    <p className="text-xs text-slate-500">播放 12.5k · 点赞 890</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <div className="w-16 h-10 bg-slate-200 rounded flex items-center justify-center">
                    <Radio className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">产品使用教程</p>
                    <p className="text-xs text-slate-500">播放 8.2k · 点赞 567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Shopify风格首页
    if (store.platform === 'shopify') {
      return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
          {/* Shopify风格欢迎卡 */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium">Welcome back</h2>
                <p className="text-emerald-100 mt-1">Here's what's happening with your store today.</p>
              </div>
              <Button 
                variant="secondary" 
                onClick={() => router.push(`/student/practice/preview/${storeId}`)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View store
              </Button>
            </div>
          </div>

          {/* 关键指标 */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total sales</p>
                  <p className="text-2xl font-bold text-slate-800">${store.stats.revenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12.5% from last week</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Orders</p>
                  <p className="text-2xl font-bold text-slate-800">{store.stats.orders}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8.3% from last week</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Visitors</p>
                  <p className="text-2xl font-bold text-slate-800">{store.stats.visitors.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+15.2% from last week</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Conversion</p>
                  <p className="text-2xl font-bold text-slate-800">{store.stats.conversion}%</p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+0.5% from last week</span>
              </div>
            </div>
          </div>

          {/* 快捷操作和订单 */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="font-medium text-slate-800 mb-4">Top products this month</h3>
              <div className="space-y-3">
                {store.products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Package className="h-6 w-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{product.title}</p>
                      <p className="text-sm text-slate-500">${product.price} · {product.inventory} in stock</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-800">{product.sales} sold</p>
                      <p className="text-sm text-emerald-600">${(product.price * product.sales).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-medium text-slate-800 mb-3">Quick actions</h3>
                <div className="space-y-2">
                  <button onClick={() => setActiveMenu('products-add')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-left">
                    <Plus className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-slate-700">Add a product</span>
                  </button>
                  <button onClick={() => setActiveMenu('themes-main')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-left">
                    <Palette className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-slate-700">Customize theme</span>
                  </button>
                  <button onClick={() => setActiveMenu('discounts')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-left">
                    <Tag className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-slate-700">Create discount</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-medium text-slate-800 mb-3">Setup guide</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-slate-600">Add product</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-slate-600">Customize theme</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    <span className="text-sm text-slate-600">Add a domain</span>
                  </div>
                  <Progress value={67} className="h-2 mt-2" />
                  <p className="text-xs text-slate-500">2 of 3 completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 默认通用首页
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 text-white">
          <h2 className="text-xl font-medium">欢迎来到{platformConfig.name}后台</h2>
          <p className="text-slate-300 mt-1">开始您的电商运营实训</p>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-500">今日订单</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{store.stats.orders}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-500">今日销售</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">${store.stats.revenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-500">今日访客</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{store.stats.visitors.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-500">转化率</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{store.stats.conversion}%</p>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // 渲染产品管理页面
  // ========================================
  const renderProductsContent = () => {
    const isAmazon = store.platform === 'amazon';
    const isTaobao = store.platform === 'taobao';
    
    return (
      <div className="p-4 space-y-4">
        {/* 工具栏 */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder={isAmazon ? "Search products..." : "搜索商品..."} className="pl-10 w-64" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isAmazon ? "All status" : "全部状态"}</SelectItem>
                <SelectItem value="active">{isAmazon ? "Active" : "在售"}</SelectItem>
                <SelectItem value="inactive">{isAmazon ? "Inactive" : "下架"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              {isAmazon ? "Import" : "批量导入"}
            </Button>
            <Button size="sm" className={`text-white ${platformConfig.activeColor}`}>
              <Plus className="h-4 w-4 mr-2" />
              {isAmazon ? "Add product" : "发布商品"}
            </Button>
          </div>
        </div>

        {/* 产品表格 */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    {isAmazon ? "Product" : "商品信息"}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    {isAmazon ? "SKU" : "SKU"}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                    {isAmazon ? "Price" : "价格"}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                    {isAmazon ? "Inventory" : "库存"}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                    {isAmazon ? "Sales" : "销量"}
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase">
                    {isAmazon ? "Status" : "状态"}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                    {isAmazon ? "Actions" : "操作"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {store.products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{product.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">SKU-{product.id}</td>
                    <td className="px-4 py-4 text-right font-medium text-slate-800">
                      ${product.price}
                    </td>
                    <td className="px-4 py-4 text-right text-slate-600">
                      {product.inventory}
                    </td>
                    <td className="px-4 py-4 text-right text-slate-600">
                      {product.sales}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        {isAmazon ? "Active" : "在售"}
                      </span>
                    </td>
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
          
          {/* 分页 */}
          <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {isAmazon ? `Showing ${store.products.length} products` : `共 ${store.products.length} 个商品`}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // 渲染订单管理页面
  // ========================================
  const renderOrdersContent = () => {
    const isAmazon = store.platform === 'amazon';
    
    return (
      <div className="p-4 space-y-4">
        {/* 订单状态标签 */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-4">
            {[
              { key: 'all', label: isAmazon ? 'All Orders' : '全部订单', count: 156 },
              { key: 'pending', label: isAmazon ? 'Pending' : '待付款', count: 5 },
              { key: 'processing', label: isAmazon ? 'Unshipped' : '待发货', count: 8 },
              { key: 'shipped', label: isAmazon ? 'Shipped' : '已发货', count: 12 },
              { key: 'completed', label: isAmazon ? 'Delivered' : '已完成', count: 128 },
              { key: 'refund', label: isAmazon ? 'Returns' : '退款/售后', count: 3 },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab.key === 'all' 
                    ? `${platformConfig.activeColor} text-white` 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 订单列表 */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-medium text-slate-800 mb-2">
            {isAmazon ? 'No orders yet' : '暂无订单'}
          </h3>
          <p className="text-sm text-slate-500">
            {isAmazon 
              ? 'Orders will appear here when customers make purchases' 
              : '完成推广任务后，将生成模拟订单数据'}
          </p>
        </div>
      </div>
    );
  };

  // ========================================
  // 渲染数据分析页面
  // ========================================
  const renderAnalyticsContent = () => {
    return (
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-medium text-slate-800 mb-4">销售趋势</h3>
            <div className="h-40 flex items-end gap-2">
              {[35, 45, 38, 52, 48, 62, 55, 68, 72, 65, 78, 85].map((height, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>1月</span>
              <span>12月</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-medium text-slate-800 mb-4">流量来源</h3>
            <div className="space-y-3">
              {[
                { label: '自然搜索', value: 45, color: 'bg-blue-500' },
                { label: '付费广告', value: 30, color: 'bg-green-500' },
                { label: '社交媒体', value: 15, color: 'bg-purple-500' },
                { label: '直接访问', value: 10, color: 'bg-orange-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-medium text-slate-800">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // 根据菜单渲染内容
  // ========================================
  const renderContent = () => {
    // 判断当前菜单类型
    if (activeMenu.startsWith('products') || activeMenu.startsWith('inventory')) {
      return renderProductsContent();
    }
    if (activeMenu.startsWith('orders')) {
      return renderOrdersContent();
    }
    if (activeMenu.startsWith('analytics') || activeMenu.startsWith('reports')) {
      return renderAnalyticsContent();
    }
    
    return renderHomeContent();
  };

  // ========================================
  // 主渲染
  // ========================================
  return (
    <div className="min-h-screen bg-slate-100">
      {/* 顶部导航栏 */}
      <header className={`fixed top-0 left-0 right-0 h-14 ${platformConfig.headerBg} z-50`}>
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/student/practice')}
              className={`${
                ['taobao', 'douyin', 'shopify', 'shoplazza', 'woocommerce'].includes(store.platform)
                  ? 'text-white hover:bg-white/10'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
            
            <div className="h-6 w-px bg-white/20" />
            
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded ${platformConfig.activeColor} flex items-center justify-center`}>
                <Store className="h-4 w-4 text-white" />
              </div>
              <span className={`font-medium ${
                ['taobao', 'douyin', 'shopify', 'shoplazza', 'woocommerce', 'amazon'].includes(store.platform)
                  ? 'text-white'
                  : 'text-slate-800'
              }`}>
                {store.name}
              </span>
              <Badge variant="outline" className={`${
                ['taobao', 'douyin', 'shopify', 'shoplazza', 'woocommerce'].includes(store.platform)
                  ? 'border-white/30 text-white'
                  : 'border-slate-300 text-slate-600'
              }`}>
                {platformConfig.name}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/student/practice/preview/${storeId}`)}
              className={`${
                ['taobao', 'douyin', 'shopify', 'shoplazza', 'woocommerce'].includes(store.platform)
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-slate-300'
              }`}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isChinesePlatform ? '预览前台' : 'View Store'}
            </Button>
            
            <Button variant="ghost" size="icon" className={`${
              ['taobao', 'douyin', 'shopify', 'shoplazza', 'woocommerce'].includes(store.platform)
                ? 'text-white hover:bg-white/10'
                : 'text-slate-600 hover:bg-slate-100'
            }`}>
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">
              张
            </div>
          </div>
        </div>
      </header>

      {/* 左侧导航栏 */}
      <aside className={`fixed left-0 top-14 bottom-0 w-52 ${platformConfig.sidebarBg} overflow-y-auto z-40`}>
        {/* Logo区域 */}
        <div className={`p-4 border-b ${
          isDarkSidebar ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${platformConfig.activeColor} flex items-center justify-center`}>
              <Store className="h-4 w-4 text-white" />
            </div>
            <span className={`font-bold ${isDarkSidebar ? 'text-white' : 'text-slate-800'}`}>
              {platformConfig.logo}
            </span>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="p-2">
          {platformConfig.menus.map((menu) => {
            const hasChildren = menu.children && menu.children.length > 0;
            const isExpanded = expandedMenus.includes(menu.id);
            const isActive = activeMenu === menu.id || activeMenu.startsWith(menu.id + '-');

            return (
              <div key={menu.id}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleMenuExpand(menu.id);
                    } else {
                      setActiveMenu(menu.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    isActive
                      ? isDarkSidebar 
                        ? 'bg-white/10 text-white' 
                        : `${platformConfig.activeColor} text-white`
                      : isDarkSidebar
                        ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <menu.icon className="h-5 w-5" />
                  <span className="flex-1 text-sm font-medium">{menu.label}</span>
                  {hasChildren && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* 子菜单 */}
                {hasChildren && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {menu.children!.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setActiveMenu(child.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                          activeMenu === child.id
                            ? isDarkSidebar
                              ? 'bg-white/10 text-white'
                              : `${platformConfig.activeColor} text-white`
                            : isDarkSidebar
                              ? 'text-slate-400 hover:bg-white/5 hover:text-white'
                              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          activeMenu === child.id ? 'bg-white' : isDarkSidebar ? 'bg-slate-600' : 'bg-slate-300'
                        }`} />
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 实训进度 */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
          isDarkSidebar ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="mb-2">
            <span className={`text-xs font-medium ${isDarkSidebar ? 'text-slate-400' : 'text-slate-500'}`}>
              实训进度
            </span>
            <span className={`text-xs font-medium float-right ${isDarkSidebar ? 'text-white' : 'text-slate-800'}`}>
              {progress}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className={`text-xs mt-2 ${isDarkSidebar ? 'text-slate-400' : 'text-slate-500'}`}>
            {completedTasks}/{mockTasks.length} 任务完成
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-52 mt-14 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
}
