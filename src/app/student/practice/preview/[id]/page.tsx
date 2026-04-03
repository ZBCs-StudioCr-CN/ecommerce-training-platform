'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Store,
  ShoppingCart,
  Search,
  User,
  Heart,
  Menu,
  X,
  ChevronRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  Package,
  Sparkles,
  Tag,
  Clock,
  Eye,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  ChevronDown,
  Bell,
  MapPinned,
  Play,
  Grid3X3,
  MessageCircle,
  Share2,
  Minus,
  Plus,
  Zap,
  Gift,
  Crown,
  Percent,
  Flame,
  Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ============================================
// 平台前台风格配置
// ============================================
const platformThemes = {
  // 淘宝/天猫
  taobao: {
    name: '淘宝/天猫',
    theme: 'orange',
    headerBg: 'bg-gradient-to-r from-orange-500 to-red-500',
    accentColor: 'text-orange-500',
    buttonBg: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
    priceColor: 'text-red-500',
    features: ['直播', '短视频', '优惠券', '积分'],
    currency: '¥',
    showOriginalPrice: true,
    showSales: true,
    showRating: true,
    layout: 'grid',
  },
  
  // 拼多多
  pdd: {
    name: '拼多多',
    theme: 'red',
    headerBg: 'bg-gradient-to-r from-red-500 to-pink-500',
    accentColor: 'text-red-500',
    buttonBg: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600',
    priceColor: 'text-red-500',
    features: ['拼团', '百亿补贴', '砍价', '秒杀'],
    currency: '¥',
    showOriginalPrice: true,
    showSales: true,
    showRating: true,
    layout: 'grid',
  },
  
  // 抖音电商
  douyin: {
    name: '抖音电商',
    theme: 'pink',
    headerBg: 'bg-gradient-to-r from-pink-500 to-purple-500',
    accentColor: 'text-pink-500',
    buttonBg: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600',
    priceColor: 'text-pink-500',
    features: ['直播', '短视频', '达人推荐', '品牌号'],
    currency: '¥',
    showOriginalPrice: true,
    showSales: true,
    showRating: true,
    layout: 'video',
  },
  
  // Amazon
  amazon: {
    name: 'Amazon',
    theme: 'amber',
    headerBg: 'bg-slate-900',
    accentColor: 'text-amber-600',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
    priceColor: 'text-slate-900',
    features: ['Prime', 'Best Sellers', 'Deals', 'Subscribe & Save'],
    currency: '$',
    showOriginalPrice: false,
    showSales: false,
    showRating: true,
    layout: 'list',
  },
  
  // Shopee
  shopee: {
    name: 'Shopee',
    theme: 'orange',
    headerBg: 'bg-gradient-to-r from-orange-500 to-orange-600',
    accentColor: 'text-orange-500',
    buttonBg: 'bg-orange-500 hover:bg-orange-600',
    priceColor: 'text-orange-500',
    features: ['Flash Sale', 'Mall', 'Live', 'Games'],
    currency: 'Rp',
    showOriginalPrice: true,
    showSales: true,
    showRating: true,
    layout: 'grid',
  },
  
  // Lazada
  lazada: {
    name: 'Lazada',
    theme: 'blue',
    headerBg: 'bg-gradient-to-r from-blue-600 to-blue-700',
    accentColor: 'text-blue-600',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
    priceColor: 'text-blue-600',
    features: ['Flash Sale', 'Mall', 'Vouchers', 'Collect'],
    currency: 'RM',
    showOriginalPrice: true,
    showSales: true,
    showRating: true,
    layout: 'grid',
  },
  
  // Shopify
  shopify: {
    name: 'Shopify',
    theme: 'emerald',
    headerBg: 'bg-white border-b border-slate-200',
    accentColor: 'text-emerald-600',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
    priceColor: 'text-slate-900',
    features: ['Free Shipping', 'Secure Payment', 'Easy Returns', '24/7 Support'],
    currency: '$',
    showOriginalPrice: true,
    showSales: false,
    showRating: true,
    layout: 'modern',
  },
  
  // Shoplazza
  shoplazza: {
    name: 'Shoplazza',
    theme: 'blue',
    headerBg: 'bg-white border-b border-slate-200',
    accentColor: 'text-blue-600',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
    priceColor: 'text-slate-900',
    features: ['全球配送', '安全支付', '无忧退换', '专属客服'],
    currency: '$',
    showOriginalPrice: true,
    showSales: false,
    showRating: true,
    layout: 'modern',
  },
  
  // WooCommerce
  woocommerce: {
    name: 'WooCommerce',
    theme: 'purple',
    headerBg: 'bg-white border-b border-slate-200',
    accentColor: 'text-purple-600',
    buttonBg: 'bg-purple-600 hover:bg-purple-700',
    priceColor: 'text-slate-900',
    features: ['Free Shipping', 'Money Back', 'Secure Checkout', 'Support'],
    currency: '$',
    showOriginalPrice: true,
    showSales: false,
    showRating: true,
    layout: 'modern',
  },
};

// localStorage存储Key - 必须与店铺管理页面保持一致
const STORES_STORAGE_KEY = 'ecommerce_practice_stores';

// 默认店铺模板数据（用于新创建的店铺）
const defaultStoreTemplates: Record<string, any> = {
  taobao: {
    name: '新店铺',
    platform: 'taobao',
    slogan: '品质生活，从这里开始',
    products: [
      { id: '1', title: '2024夏季新款连衣裙 优雅气质修身显瘦中长款', price: 299, originalPrice: 599, sales: 1280, rating: 4.8, reviews: 256, stock: 50, tags: ['新品', '热销'] },
      { id: '2', title: '纯棉休闲T恤 简约百搭款 纯色短袖上衣', price: 99, originalPrice: 199, sales: 2560, rating: 4.9, reviews: 512, stock: 100, tags: ['热销'] },
      { id: '3', title: '高腰牛仔裤 显瘦修身 直筒长裤女', price: 199, originalPrice: 399, sales: 890, rating: 4.7, reviews: 178, stock: 30, tags: [] },
      { id: '4', title: '针织开衫外套 春秋薄款 V领修身', price: 159, originalPrice: 299, sales: 678, rating: 4.8, reviews: 136, stock: 45, tags: ['新品'] },
    ],
    categories: ['连衣裙', 'T恤', '裤装', '外套', '衬衫', '套装'],
  },
  pdd: {
    name: '新店铺',
    platform: 'pdd',
    slogan: '拼着买，更便宜',
    products: [
      { id: '1', title: '百亿补贴 纯棉T恤男女同款', price: 29.9, originalPrice: 99, sales: 50000, rating: 4.8, reviews: 10000, stock: 500, tags: ['百亿补贴'] },
      { id: '2', title: '爆款牛仔裤 高腰显瘦', price: 49.9, originalPrice: 199, sales: 30000, rating: 4.7, reviews: 6000, stock: 300, tags: ['热销'] },
      { id: '3', title: '夏季连衣裙 气质优雅', price: 59.9, originalPrice: 299, sales: 25000, rating: 4.9, reviews: 5000, stock: 200, tags: ['秒杀'] },
    ],
    categories: ['服饰', '鞋包', '美妆', '家居', '食品', '数码'],
  },
  douyin: {
    name: '新店铺',
    platform: 'douyin',
    slogan: '发现好物，分享生活',
    products: [
      { id: '1', title: '抖音爆款 网红连衣裙', price: 168, originalPrice: 299, sales: 8000, rating: 4.9, reviews: 1600, stock: 100, tags: ['直播热卖'] },
      { id: '2', title: '短视频推荐 休闲套装', price: 138, originalPrice: 258, sales: 6500, rating: 4.8, reviews: 1300, stock: 80, tags: ['爆款'] },
      { id: '3', title: '达人同款 潮流卫衣', price: 198, originalPrice: 358, sales: 4200, rating: 4.7, reviews: 840, stock: 60, tags: ['新品'] },
    ],
    categories: ['推荐', '服饰', '美妆', '食品', '家居', '数码'],
  },
  amazon: {
    name: 'New Store',
    platform: 'amazon',
    slogan: 'Shop Quality Products',
    products: [
      { id: '1', title: 'Wireless Bluetooth Earbuds Pro with Active Noise Cancelling', price: 29.99, originalPrice: 49.99, sales: 4560, rating: 4.5, reviews: 892, stock: 200, tags: ['Best Seller'] },
      { id: '2', title: 'Silicone Phone Case for iPhone 15 Pro Max - Shockproof', price: 9.99, originalPrice: 19.99, sales: 8920, rating: 4.3, reviews: 1784, stock: 500, tags: ['Best Seller'] },
      { id: '3', title: 'USB-C Fast Charging Cable 3-Pack - 6ft Nylon Braided', price: 14.99, originalPrice: 24.99, sales: 6780, rating: 4.4, reviews: 1356, stock: 300, tags: [] },
    ],
    categories: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys'],
  },
  shopee: {
    name: '新店铺',
    platform: 'shopee',
    slogan: 'Shopee - 享受购物的乐趣',
    products: [
      { id: '1', title: '韩国进口护肤品套装 保湿补水', price: 128, originalPrice: 258, sales: 3500, rating: 4.8, reviews: 700, stock: 150, tags: ['热卖'] },
      { id: '2', title: '日系简约双肩包 大容量通勤', price: 89, originalPrice: 168, sales: 2800, rating: 4.7, reviews: 560, stock: 100, tags: ['新品'] },
      { id: '3', title: '泰式风格连衣裙 夏季新款', price: 68, originalPrice: 138, sales: 4200, rating: 4.6, reviews: 840, stock: 80, tags: ['秒杀'] },
    ],
    categories: ['美妆', '服饰', '鞋包', '数码', '家居', '食品'],
  },
  lazada: {
    name: '新店铺',
    platform: 'lazada',
    slogan: 'Lazada - 品质生活，轻松购物',
    products: [
      { id: '1', title: '东南亚风格休闲裤 宽松舒适', price: 79, originalPrice: 158, sales: 3200, rating: 4.7, reviews: 640, stock: 120, tags: ['热卖'] },
      { id: '2', title: '轻便运动鞋 透气防滑', price: 129, originalPrice: 259, sales: 2500, rating: 4.8, reviews: 500, stock: 90, tags: ['新品'] },
      { id: '3', title: '防晒衣 轻薄透气 夏季必备', price: 59, originalPrice: 119, sales: 5800, rating: 4.6, reviews: 1160, stock: 200, tags: ['爆款'] },
    ],
    categories: ['服饰', '鞋靴', '箱包', '运动', '家居', '美妆'],
  },
  shopify: {
    name: 'New Store',
    platform: 'shopify',
    slogan: 'Express Your Style',
    products: [
      { id: '1', title: 'Summer Floral Dress', price: 49.99, originalPrice: 79.99, sales: 2340, rating: 4.8, reviews: 468, stock: 80, tags: ['New'] },
      { id: '2', title: 'Casual Cotton Top', price: 29.99, originalPrice: 49.99, sales: 4560, rating: 4.7, reviews: 912, stock: 150, tags: ['Best Seller'] },
      { id: '3', title: 'Classic Denim Jeans', price: 59.99, originalPrice: 89.99, sales: 1780, rating: 4.6, reviews: 356, stock: 60, tags: [] },
      { id: '4', title: 'Elegant Blouse', price: 39.99, originalPrice: 69.99, sales: 1230, rating: 4.8, reviews: 246, stock: 90, tags: ['New'] },
    ],
    categories: ['Dresses', 'Tops', 'Pants', 'Skirts', 'Outerwear', 'Accessories'],
  },
  shoplazza: {
    name: '新店铺',
    platform: 'shoplazza',
    slogan: '跨境电商，从店匠开始',
    products: [
      { id: '1', title: '北欧风格连衣裙 简约设计', price: 189, originalPrice: 358, sales: 1800, rating: 4.8, reviews: 360, stock: 80, tags: ['新品'] },
      { id: '2', title: '纯棉T恤 男女同款 百搭款', price: 99, originalPrice: 198, sales: 3200, rating: 4.7, reviews: 640, stock: 150, tags: ['热卖'] },
      { id: '3', title: '设计师款外套 春秋新款', price: 399, originalPrice: 698, sales: 980, rating: 4.9, reviews: 196, stock: 50, tags: ['设计师'] },
    ],
    categories: ['新品', '热卖', '女装', '男装', '配饰', '设计师'],
  },
  woocommerce: {
    name: '新店铺',
    platform: 'woocommerce',
    slogan: 'Powered by WooCommerce',
    products: [
      { id: '1', title: 'Premium WordPress Theme', price: 59, originalPrice: 99, sales: 4500, rating: 4.8, reviews: 900, stock: 999, tags: ['Popular'] },
      { id: '2', title: 'E-commerce Plugin Bundle', price: 79, originalPrice: 149, sales: 3200, rating: 4.7, reviews: 640, stock: 999, tags: ['Best Seller'] },
      { id: '3', title: 'Website Security Package', price: 29, originalPrice: 59, sales: 5600, rating: 4.6, reviews: 1120, stock: 999, tags: ['New'] },
    ],
    categories: ['Themes', 'Plugins', 'Services', 'Support', 'Customization'],
  },
};

// 从localStorage获取店铺数据
function getStoreData(storeId: string): any {
  if (typeof window === 'undefined') {
    return defaultStoreTemplates['shopify'];
  }
  
  try {
    const savedStores = localStorage.getItem(STORES_STORAGE_KEY);
    if (savedStores) {
      const stores = JSON.parse(savedStores);
      const storeInfo = stores.find((s: any) => s.id === storeId);
      
      if (storeInfo) {
        const template = defaultStoreTemplates[storeInfo.platform] || defaultStoreTemplates['shopify'];
        return {
          ...template,
          name: storeInfo.name,
          platform: storeInfo.platform,
        };
      }
    }
  } catch (e) {
    console.error('Failed to load store data:', e);
  }
  
  return defaultStoreTemplates['shopify'];
}

export default function StorePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;
  
  // 使用稳定的初始状态，避免 hydration mismatch
  const [store, setStore] = useState(defaultStoreTemplates['shopify']);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 客户端加载店铺数据
  useEffect(() => {
    const storeData = getStoreData(storeId);
    setStore(storeData);
    setIsLoading(false);
  }, [storeId]);
  
  // 使用稳定的配置选择逻辑
  const theme = platformThemes[store.platform as keyof typeof platformThemes] 
    ? platformThemes[store.platform as keyof typeof platformThemes] 
    : platformThemes.shopify;
  
  // 判断是否为独立站
  const isIndependentSite = ['shopify', 'shoplazza', 'woocommerce'].includes(store.platform);
  const isChinese = ['taobao', 'pdd', 'douyin', 'shoplazza'].includes(store.platform);

  // 添加到购物车
  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  // ============================================
  // 渲染淘宝风格头部
  // ============================================
  const renderTaobaoHeader = () => (
    <header className={`${theme.headerBg} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* 顶部条 */}
        <div className="flex items-center justify-between h-10 text-white text-xs border-b border-white/10">
          <div className="flex items-center gap-4">
            <span>欢迎来到{store.name}！</span>
            <span className="text-white/70">|</span>
            <button className="flex items-center gap-1 hover:underline">
              <User className="h-3 w-3" />
              登录
            </button>
            <button className="hover:underline">注册</button>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:underline">
              <ShoppingCart className="h-3 w-3" />
              购物车 ({cartCount})
            </button>
            <button className="hover:underline">收藏夹</button>
            <button className="hover:underline">我的订单</button>
          </div>
        </div>
        
        {/* 主导航 */}
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Store className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">{store.name}</span>
            </div>
          </div>
          
          {/* 搜索框 */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="flex">
              <input
                type="text"
                placeholder="搜索店铺内商品"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg text-sm focus:outline-none"
              />
              <button className={`px-6 py-2 ${theme.buttonBg} text-white rounded-r-lg text-sm font-medium`}>
                搜索
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Bell className="h-4 w-4 mr-1" />
              消息
            </Button>
          </div>
        </div>
        
        {/* 分类导航 */}
        <div className="flex items-center gap-4 h-10 overflow-x-auto">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`text-sm font-medium whitespace-nowrap ${
              selectedCategory === 'all' ? 'text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            全部商品
          </button>
          {store.categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm font-medium whitespace-nowrap ${
                selectedCategory === cat ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );

  // ============================================
  // 渲染Amazon风格头部
  // ============================================
  const renderAmazonHeader = () => (
    <header className="bg-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* 主导航 */}
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-1">
            <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center">
              <Store className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl">{store.name}</span>
          </Link>
          
          {/* 配送地址 */}
          <button className="flex items-center gap-1 text-white hover:text-amber-400">
            <MapPinned className="h-5 w-5" />
            <div className="text-left">
              <div className="text-xs text-slate-400">Deliver to</div>
              <div className="text-sm font-medium">United States</div>
            </div>
          </button>
          
          {/* 搜索框 */}
          <div className="flex-1 flex">
            <select className="px-3 py-2 bg-slate-100 text-sm rounded-l-lg border-r border-slate-300 focus:outline-none">
              <option>All</option>
              {store.categories.map((cat: string) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button className={`px-4 py-2 ${theme.buttonBg} rounded-r-lg`}>
              <Search className="h-5 w-5 text-white" />
            </button>
          </div>
          
          {/* 右侧菜单 */}
          <button className="text-white hover:text-amber-400 text-left">
            <div className="text-xs">Hello, Sign in</div>
            <div className="text-sm font-medium flex items-center gap-1">
              Account & Lists <ChevronDown className="h-3 w-3" />
            </div>
          </button>
          
          <button className="text-white hover:text-amber-400 text-left">
            <div className="text-xs">Returns</div>
            <div className="text-sm font-medium">& Orders</div>
          </button>
          
          <button className="flex items-center gap-1 text-white hover:text-amber-400 relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-900 text-xs rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
      
      {/* 子导航 */}
      <div className="bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 h-10 overflow-x-auto">
          <button className="text-white text-sm font-medium hover:text-amber-400 flex items-center gap-1">
            <Menu className="h-4 w-4" />
            All
          </button>
          {['Best Sellers', 'Today\'s Deals', 'Prime', 'Customer Service', 'New Releases', 'Books'].map((item) => (
            <button key={item} className="text-white text-sm hover:text-amber-400 whitespace-nowrap">
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );

  // ============================================
  // 渲染Shopify风格头部
  // ============================================
  const renderShopifyHeader = () => (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* 公告栏 */}
      <div className={`${theme.buttonBg} text-white text-center py-2 text-sm`}>
        Free shipping on orders over $50 | Use code WELCOME15 for 15% off
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg ${theme.buttonBg} flex items-center justify-center`}>
              <Store className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">{store.name}</h1>
              <p className="text-xs text-slate-500">{store.slogan}</p>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Shop', 'New Arrivals', 'Best Sellers', 'Sale', 'About'].map((item) => (
              <Link key={item} href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                {item}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-slate-600 hover:text-slate-900">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-slate-600 hover:text-slate-900">
              <User className="h-5 w-5" />
            </button>
            <button className="text-slate-600 hover:text-slate-900 relative" onClick={addToCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-slate-900 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // ============================================
  // 渲染头部（根据平台选择）
  // ============================================
  const renderHeader = () => {
    // 国内电商平台（淘宝、拼多多、抖音）
    if (store.platform === 'taobao' || store.platform === 'pdd' || store.platform === 'douyin') {
      return renderTaobaoHeader();
    }
    // Amazon
    if (store.platform === 'amazon') {
      return renderAmazonHeader();
    }
    // 东南亚平台（Shopee、Lazada）- 使用类似淘宝的风格
    if (store.platform === 'shopee' || store.platform === 'lazada') {
      return renderTaobaoHeader();
    }
    // 独立站
    if (isIndependentSite) {
      return renderShopifyHeader();
    }
    // 默认风格
    return (
      <header className={`${theme.headerBg} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-white" />
              <span className="font-bold text-white">{store.name}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索..."
                className="px-4 py-1.5 rounded-lg text-sm bg-white/20 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 w-64"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
            </div>
            <button className="text-white relative" onClick={addToCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 text-slate-900 text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="text-white">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    );
  };

  // ============================================
  // 渲染淘宝风格Banner
  // ============================================
  const renderTaobaoBanner = () => (
    <div className="relative bg-gradient-to-r from-orange-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-4">
          {/* 主Banner */}
          <div className="col-span-3 aspect-[3/1] rounded-lg bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative text-center text-white">
              <Sparkles className="h-10 w-10 mx-auto mb-2" />
              <p className="text-2xl font-bold">618年中大促</p>
              <p className="text-sm mt-1">全场低至5折起</p>
              <button className={`mt-4 px-6 py-2 ${theme.buttonBg} rounded-lg text-sm font-medium`}>
                立即抢购
              </button>
            </div>
          </div>
          
          {/* 侧边活动 */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex flex-col items-center justify-center text-white p-4">
              <Timer className="h-8 w-8 mb-2" />
              <p className="font-bold">限时秒杀</p>
              <p className="text-xs mt-1">距结束 02:35:18</p>
            </div>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex flex-col items-center justify-center text-white p-4">
              <Gift className="h-8 w-8 mb-2" />
              <p className="font-bold">领券中心</p>
              <p className="text-xs mt-1">满199减50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // 渲染Shopify风格Hero
  // ============================================
  const renderShopifyHero = () => (
    <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-4">{store.slogan}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Discover Your Perfect Style
            </h2>
            <p className="text-slate-600 mb-6 text-lg">
              Curated collection of premium products designed for modern living.
              Quality meets style in every piece.
            </p>
            <div className="flex gap-3">
              <Button className={`${theme.buttonBg} text-white px-8 py-6 text-lg`}>
                Shop Collection
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg">
                View Lookbook
              </Button>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <Package className="h-32 w-32 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // 渲染Banner/Hero区域
  // ============================================
  const renderHero = () => {
    if (isIndependentSite) {
      return renderShopifyHero();
    }
    if (store.platform === 'amazon') {
      return (
        <div className="relative bg-gradient-to-r from-slate-100 to-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="aspect-[4/1] rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center text-white">
              <div className="text-center">
                <Crown className="h-10 w-10 mx-auto mb-2 text-amber-400" />
                <p className="text-2xl font-bold">Prime Day Deals</p>
                <p className="text-sm mt-1 text-slate-300">Exclusive savings for Prime members</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return renderTaobaoBanner();
  };

  // ============================================
  // 渲染淘宝风格商品网格
  // ============================================
  const renderTaobaoProducts = () => (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 排序和筛选 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">排序：</span>
          <button className="px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded">综合</button>
          <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-50 rounded">销量</button>
          <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-50 rounded">新品</button>
          <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-50 rounded">价格</button>
        </div>
        <div className="text-sm text-slate-500">共 {store.products.length} 件商品</div>
      </div>
      
      {/* 商品网格 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {store.products.map((product: any) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg overflow-hidden border border-slate-100 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="aspect-square bg-slate-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="h-12 w-12 text-slate-300" />
              </div>
              {product.tags && product.tags.length > 0 && (
                <div className="absolute top-2 left-2">
                  {product.tags.map((tag: string) => (
                    <Badge key={tag} className="bg-red-500 text-white text-xs mr-1">{tag}</Badge>
                  ))}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                <Button size="sm" className={`w-full ${theme.buttonBg} text-white`} onClick={(e) => { e.stopPropagation(); addToCart(); }}>
                  <ShoppingCart className="h-3 w-3 mr-1" /> 加入购物车
                </Button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm text-slate-700 line-clamp-2 h-10 group-hover:text-orange-600 transition-colors">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 mt-2">
                <Star className={`h-3 w-3 ${theme.accentColor} fill-current`} />
                <span className="text-xs text-slate-500">{product.rating}</span>
                {theme.showSales && (
                  <span className="text-xs text-slate-400 ml-auto">已售 {product.sales}</span>
                )}
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className={`text-lg font-bold ${theme.priceColor}`}>
                  {theme.currency}{product.price}
                </span>
                {theme.showOriginalPrice && product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {theme.currency}{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // 渲染Amazon风格商品列表
  // ============================================
  const renderAmazonProducts = () => (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* 左侧筛选 */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="font-medium text-slate-800 mb-3">Department</h3>
            <div className="space-y-2">
              {store.categories.map((cat: string) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block text-sm text-left w-full ${
                    selectedCategory === cat ? 'text-amber-600 font-medium' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 商品列表 */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-500">Results</span>
            <select className="text-sm border border-slate-200 rounded px-3 py-1.5">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Avg. Customer Review</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {store.products.map((product: any) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg border border-slate-200 p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-40 h-40 bg-slate-100 rounded flex items-center justify-center flex-shrink-0">
                  <Package className="h-12 w-12 text-slate-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base text-slate-800 hover:text-amber-600 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className={`h-4 w-4 ${i <= Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">{product.reviews}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xl font-bold text-slate-900">{theme.currency}{product.price}</span>
                    {product.tags?.includes('Prime') && (
                      <Badge className="ml-2 bg-blue-600 text-white text-xs">Prime</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">FREE delivery Tomorrow, Mar 15</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className={`px-4 py-1.5 rounded-lg text-sm ${theme.buttonBg} text-white`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // 渲染Shopify风格商品网格
  // ============================================
  const renderShopifyProducts = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 标题 */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Featured Collection</h2>
        <p className="text-slate-500 mt-2">Discover our most loved pieces</p>
      </div>
      
      {/* 商品网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {store.products.map((product: any) => (
          <div 
            key={product.id}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] bg-slate-100 rounded-xl relative overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="h-16 w-16 text-slate-300" />
              </div>
              {product.tags && product.tags.length > 0 && (
                <div className="absolute top-3 left-3">
                  {product.tags.map((tag: string) => (
                    <Badge key={tag} className="bg-slate-900 text-white text-xs mr-1">{tag}</Badge>
                  ))}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className={`w-full ${theme.buttonBg} text-white`} onClick={(e) => { e.stopPropagation(); addToCart(); }}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-800 group-hover:text-slate-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className={`h-3 w-3 ${theme.accentColor} fill-current`} />
              <span className="text-xs text-slate-500">{product.rating} ({product.reviews})</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-base font-semibold text-slate-900">{theme.currency}{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">{theme.currency}{product.originalPrice}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // 渲染商品区域
  // ============================================
  const renderProducts = () => {
    if (isIndependentSite) {
      return renderShopifyProducts();
    }
    if (store.platform === 'amazon') {
      return renderAmazonProducts();
    }
    return renderTaobaoProducts();
  };

  // ============================================
  // 渲染底部
  // ============================================
  const renderFooter = () => {
    if (isIndependentSite) {
      return (
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${theme.buttonBg} flex items-center justify-center`}>
                    <Store className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold">{store.name}</span>
                </div>
                <p className="text-sm text-slate-400">{store.slogan}</p>
                <div className="flex gap-3 mt-4">
                  <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                  <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                  <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Shop</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="#">New Arrivals</Link></li>
                  <li><Link href="#">Best Sellers</Link></li>
                  <li><Link href="#">Sale</Link></li>
                  <li><Link href="#">All Products</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Help</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="#">Shipping & Returns</Link></li>
                  <li><Link href="#">FAQ</Link></li>
                  <li><Link href="#">Contact Us</Link></li>
                  <li><Link href="#">Size Guide</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Newsletter</h4>
                <p className="text-sm text-slate-400 mb-3">Subscribe to get special offers.</p>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg text-sm bg-slate-800 border border-slate-700 focus:outline-none" />
                  <button className={`px-4 py-2 ${theme.buttonBg} rounded-r-lg text-sm`}>Join</button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
              <p>© 2024 {store.name}. All rights reserved. | 模拟店铺仅供实训使用</p>
            </div>
          </div>
        </footer>
      );
    }
    
    // 平台电商底部
    return (
      <footer className="bg-slate-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            © 2024 {store.name} | 模拟店铺仅供实训使用
          </p>
        </div>
      </footer>
    );
  };

  // 获取预览容器样式
  const getPreviewStyle = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-[375px] mx-auto';
      case 'tablet':
        return 'max-w-[768px] mx-auto';
      default:
        return 'w-full';
    }
  };

  // 加载状态检查 - 确保 hydration 一致性
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">加载店铺数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200">
      {/* 预览控制栏 */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-slate-900 border-b border-slate-700 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push(`/student/practice/store/${storeId}`)}
              className="text-slate-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回后台
            </Button>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">前台预览</span>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {theme.name}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 设备切换 */}
            <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className={viewMode === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
                className={viewMode === 'tablet' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className={viewMode === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <button
              onClick={() => router.push(`/student/practice/store/${storeId}`)}
              className="inline-flex items-center justify-center h-8 px-3 rounded-md text-sm font-medium border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <Settings className="h-4 w-4 mr-2" />
              编辑店铺
            </button>
          </div>
        </div>
      </div>

      {/* 预览内容 */}
      <div className="pt-12">
        <div className={getPreviewStyle()}>
          <div className="bg-white min-h-screen shadow-xl">
            {renderHeader()}
            {renderHero()}
            {renderProducts()}
            {renderFooter()}
          </div>
        </div>
      </div>
    </div>
  );
}
