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
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
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

// 平台前台样式配置
const platformThemes = {
  // 国内电商
  taobao: {
    name: '淘宝/天猫',
    theme: 'orange',
    headerBg: 'bg-gradient-to-r from-orange-500 to-red-500',
    accentColor: 'text-orange-500',
    buttonBg: 'bg-orange-500 hover:bg-orange-600',
    features: ['直播', '短视频', '优惠券', '积分'],
  },
  pdd: {
    name: '拼多多',
    theme: 'red',
    headerBg: 'bg-gradient-to-r from-red-500 to-pink-500',
    accentColor: 'text-red-500',
    buttonBg: 'bg-red-500 hover:bg-red-600',
    features: ['拼团', '百亿补贴', '砍价', '秒杀'],
  },
  douyin: {
    name: '抖音电商',
    theme: 'pink',
    headerBg: 'bg-gradient-to-r from-pink-500 to-purple-500',
    accentColor: 'text-pink-500',
    buttonBg: 'bg-pink-500 hover:bg-pink-600',
    features: ['直播', '短视频', '达人推荐', '品牌号'],
  },
  // 跨境电商
  amazon: {
    name: 'Amazon',
    theme: 'amber',
    headerBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
    accentColor: 'text-amber-600',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
    features: ['Prime', 'Best Sellers', 'Deals', 'Subscribe & Save'],
  },
  shopee: {
    name: 'Shopee',
    theme: 'orange',
    headerBg: 'bg-gradient-to-r from-orange-500 to-red-500',
    accentColor: 'text-orange-500',
    buttonBg: 'bg-orange-500 hover:bg-orange-600',
    features: ['Flash Sale', 'Mall', 'Live', 'Games'],
  },
  lazada: {
    name: 'Lazada',
    theme: 'blue',
    headerBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    accentColor: 'text-blue-600',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
    features: ['Flash Sale', 'Mall', 'Vouchers', 'Collect'],
  },
  // 外贸独立站
  shopify: {
    name: 'Shopify',
    theme: 'emerald',
    headerBg: 'bg-white border-b border-slate-200',
    accentColor: 'text-emerald-600',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
    features: ['Free Shipping', 'Secure Payment', 'Easy Returns', '24/7 Support'],
  },
  shoplazza: {
    name: 'Shoplazza',
    theme: 'blue',
    headerBg: 'bg-white border-b border-slate-200',
    accentColor: 'text-blue-600',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
    features: ['全球配送', '安全支付', '无忧退换', '专属客服'],
  },
  woocommerce: {
    name: 'WooCommerce',
    theme: 'purple',
    headerBg: 'bg-white border-b border-slate-200',
    accentColor: 'text-purple-600',
    buttonBg: 'bg-purple-600 hover:bg-purple-700',
    features: ['Free Shipping', 'Money Back', 'Secure Checkout', 'Support'],
  },
};

// 模拟店铺数据
const mockStoreData = {
  'store-1': {
    name: '潮流服饰旗舰店',
    platform: 'taobao',
    slogan: '时尚前沿，品质生活',
    products: [
      { id: '1', title: '2024夏季新款连衣裙 优雅气质修身', price: 299, originalPrice: 599, sales: 1280, rating: 4.8, image: null },
      { id: '2', title: '纯棉休闲T恤 简约百搭款', price: 99, originalPrice: 199, sales: 2560, rating: 4.9, image: null },
      { id: '3', title: '高腰牛仔裤 显瘦修身', price: 199, originalPrice: 399, sales: 890, rating: 4.7, image: null },
      { id: '4', title: '针织开衫外套 春秋薄款', price: 159, originalPrice: 299, sales: 678, rating: 4.8, image: null },
      { id: '5', title: '西装裤直筒 职场通勤', price: 179, originalPrice: 359, sales: 456, rating: 4.6, image: null },
      { id: '6', title: '雪纺衬衫女 气质优雅', price: 139, originalPrice: 279, sales: 890, rating: 4.7, image: null },
    ],
    categories: ['连衣裙', 'T恤', '裤装', '外套', '衬衫', '套装'],
  },
  'store-2': {
    name: 'TechGadget Store',
    platform: 'amazon',
    slogan: 'Quality Tech, Better Life',
    products: [
      { id: '1', title: 'Wireless Bluetooth Earbuds Pro', price: 29.99, originalPrice: 49.99, sales: 4560, rating: 4.5, image: null },
      { id: '2', title: 'Silicone Phone Case for iPhone 15', price: 9.99, originalPrice: 19.99, sales: 8920, rating: 4.3, image: null },
      { id: '3', title: 'USB-C Fast Charging Cable 3-Pack', price: 14.99, originalPrice: 24.99, sales: 6780, rating: 4.4, image: null },
      { id: '4', title: 'Portable Power Bank 20000mAh', price: 39.99, originalPrice: 59.99, sales: 2340, rating: 4.6, image: null },
    ],
    categories: ['Audio', 'Phone Accessories', 'Chargers', 'Power Banks', 'Smart Home'],
  },
  'store-3': {
    name: 'Fashion Plus',
    platform: 'shopify',
    slogan: 'Express Your Style',
    products: [
      { id: '1', title: 'Summer Floral Dress', price: 49.99, originalPrice: 79.99, sales: 2340, rating: 4.8, image: null },
      { id: '2', title: 'Casual Cotton Top', price: 29.99, originalPrice: 49.99, sales: 4560, rating: 4.7, image: null },
      { id: '3', title: 'Classic Denim Jeans', price: 59.99, originalPrice: 89.99, sales: 1780, rating: 4.6, image: null },
      { id: '4', title: 'Elegant Blouse', price: 39.99, originalPrice: 69.99, sales: 1230, rating: 4.8, image: null },
      { id: '5', title: 'Cozy Cardigan', price: 44.99, originalPrice: 74.99, sales: 890, rating: 4.5, image: null },
      { id: '6', title: 'Stylish Skirt', price: 34.99, originalPrice: 59.99, sales: 1560, rating: 4.7, image: null },
    ],
    categories: ['Dresses', 'Tops', 'Pants', 'Skirts', 'Outerwear', 'Accessories'],
  },
};

export default function StorePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;
  
  const [store, setStore] = useState(mockStoreData[storeId as keyof typeof mockStoreData] || mockStoreData['store-3']);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  
  const theme = platformThemes[store.platform as keyof typeof platformThemes] || platformThemes.shopify;

  // 判断是否为独立站
  const isIndependentSite = ['shopify', 'shoplazza', 'woocommerce'].includes(store.platform);

  // 添加到购物车
  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  // 渲染平台特定的头部
  const renderHeader = () => {
    if (isIndependentSite) {
      // 独立站风格头部
      return (
        <header className={`${theme.headerBg} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-lg ${theme.buttonBg} flex items-center justify-center`}>
                  <Store className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-slate-800">{store.name}</h1>
                  <p className="text-xs text-slate-500">{store.slogan}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">首页</Link>
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">新品</Link>
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">热销</Link>
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">关于我们</Link>
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button className="text-slate-600 hover:text-slate-900">
                  <Search className="h-5 w-5" />
                </button>
                <button className="text-slate-600 hover:text-slate-900">
                  <User className="h-5 w-5" />
                </button>
                <button className="text-slate-600 hover:text-slate-900 relative" onClick={() => setShowCart(!showCart)}>
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
      );
    } else {
      // 平台电商风格头部
      return (
        <header className={`${theme.headerBg} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-white text-lg">{store.name}</h1>
                <div className="hidden md:flex items-center gap-2 text-white/80 text-sm">
                  {theme.features.slice(0, 3).map((feature, i) => (
                    <Badge key={i} variant="secondary" className="bg-white/20 text-white border-0">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="text-white">
                  <Search className="h-5 w-5" />
                </button>
                <button className="text-white relative" onClick={() => setShowCart(!showCart)}>
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
            
            {/* 分类导航 */}
            <div className="flex items-center gap-4 py-2 overflow-x-auto">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`text-sm font-medium whitespace-nowrap ${
                  selectedCategory === 'all' ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                全部
              </button>
              {store.categories.map((cat) => (
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
    }
  };

  // 渲染Hero区域
  const renderHero = () => {
    if (isIndependentSite) {
      return (
        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4">{store.slogan}</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  发现您的专属风格
                </h2>
                <p className="text-slate-600 mb-6">
                  精选优质商品，为您提供极致购物体验
                </p>
                <div className="flex gap-3">
                  <Button className={`${theme.buttonBg}`}>
                    立即选购
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline">了解更多</Button>
                </div>
              </div>
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <Package className="h-32 w-32 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative bg-gradient-to-r from-slate-100 to-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-4 gap-4">
              {/* 主Banner */}
              <div className="col-span-4 md:col-span-3 aspect-[3/1] rounded-lg bg-gradient-to-r from-slate-300 to-slate-400 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-white mx-auto mb-2" />
                  <p className="text-white text-xl font-bold">限时特惠 全场低至5折</p>
                </div>
              </div>
              
              {/* 侧边活动 */}
              <div className="col-span-4 md:col-span-1 space-y-4">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-bold">限时秒杀</p>
                  </div>
                </div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Tag className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-bold">领券中心</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // 渲染产品网格
  const renderProducts = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          {isIndependentSite ? '精选商品' : '热销商品'}
        </h2>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>排序：</span>
          <Select defaultValue="sales">
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">销量优先</SelectItem>
              <SelectItem value="price-asc">价格升序</SelectItem>
              <SelectItem value="price-desc">价格降序</SelectItem>
              <SelectItem value="rating">好评优先</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {store.products.map((product) => (
          <Card 
            key={product.id} 
            className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden"
          >
            <div className="aspect-square bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="h-16 w-16 text-slate-300" />
              </div>
              {/* 折扣标签 */}
              {product.originalPrice > product.price && (
                <div className={`absolute top-2 left-2 ${theme.buttonBg} text-white text-xs px-2 py-1 rounded`}>
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </div>
              )}
              {/* 快速操作 */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                <Button size="sm" className={`w-full ${theme.buttonBg}`} onClick={(e) => {
                  e.stopPropagation();
                  addToCart();
                }}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  加入购物车
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-slate-800 line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className={`h-3 w-3 ${theme.accentColor} fill-current`} />
                <span className="text-xs text-slate-600">{product.rating}</span>
                <span className="text-xs text-slate-400">| 已售 {product.sales}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`${theme.accentColor} font-bold`}>
                  {store.platform === 'taobao' || store.platform === 'pdd' || store.platform === 'douyin' ? '¥' : '$'}
                  {product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through">
                    {store.platform === 'taobao' || store.platform === 'pdd' || store.platform === 'douyin' ? '¥' : '$'}
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // 渲染特色服务
  const renderFeatures = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 border-t border-slate-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {theme.features.map((feature, index) => {
          const icons = [Truck, Shield, RefreshCw, CreditCard];
          const Icon = icons[index % icons.length];
          return (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${theme.buttonBg} bg-opacity-10 flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${theme.accentColor}`} />
              </div>
              <div>
                <p className="font-medium text-slate-800">{feature}</p>
                <p className="text-xs text-slate-500">优质服务保障</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // 渲染底部
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
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">快速链接</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="#">关于我们</Link></li>
                  <li><Link href="#">新品上市</Link></li>
                  <li><Link href="#">热销商品</Link></li>
                  <li><Link href="#">联系我们</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">客户服务</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="#">配送说明</Link></li>
                  <li><Link href="#">退换政策</Link></li>
                  <li><Link href="#">常见问题</Link></li>
                  <li><Link href="#">隐私政策</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">联系方式</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    support@example.com
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    400-888-8888
                  </li>
                </ul>
                <div className="flex gap-3 mt-4">
                  <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                  <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                  <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                  <Youtube className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
              <p>© 2024 {store.name}. All rights reserved. | 模拟店铺仅供实训使用</p>
            </div>
          </div>
        </footer>
      );
    } else {
      return (
        <footer className="bg-slate-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-slate-400">
              © 2024 {store.name} | 模拟店铺仅供实训使用
            </p>
          </div>
        </footer>
      );
    }
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

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/student/practice/store/${storeId}`)}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Settings className="h-4 w-4 mr-2" />
              编辑店铺
            </Button>
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
            {renderFeatures()}
            {renderFooter()}
          </div>
        </div>
      </div>
    </div>
  );
}
