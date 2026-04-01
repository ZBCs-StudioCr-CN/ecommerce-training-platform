'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Store,
  Plus,
  Trash2,
  Eye,
  Settings,
  ExternalLink,
  ShoppingBag,
  Globe,
  Smartphone,
  Search,
  Filter,
  MoreVertical,
  Clock,
  TrendingUp,
  Package,
  Image as ImageIcon,
  Star,
  ChevronRight,
  Building2,
  ShoppingCart,
  MonitorPlay,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentSidebar, StudentHeader } from '@/components/student-layout';

// 三大电商场景配置
const sceneConfigs = {
  domestic: {
    name: '国内电商',
    icon: ShoppingBag,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    platforms: [
      { id: 'taobao', name: '淘宝/天猫', icon: ShoppingCart, desc: '综合电商平台', color: 'bg-orange-500' },
      { id: 'pdd', name: '拼多多', icon: Package, desc: '社交电商平台', color: 'bg-red-500' },
      { id: 'douyin', name: '抖音电商', icon: MonitorPlay, desc: '直播/短视频电商', color: 'bg-pink-500' },
    ],
  },
  crossborder: {
    name: '跨境电商',
    icon: Globe,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    platforms: [
      { id: 'amazon', name: 'Amazon', icon: Globe, desc: '全球电商平台', color: 'bg-amber-500' },
      { id: 'shopee', name: 'Shopee', icon: ShoppingBag, desc: '东南亚电商平台', color: 'bg-orange-500' },
      { id: 'lazada', name: 'Lazada', icon: Store, desc: '东南亚电商平台', color: 'bg-blue-600' },
    ],
  },
  independent: {
    name: '外贸独立站',
    icon: Store,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    platforms: [
      { id: 'shopify', name: 'Shopify', icon: Store, desc: '独立站建站平台', color: 'bg-emerald-500' },
      { id: 'shoplazza', name: 'Shoplazza', icon: Store, desc: '店匠独立站', color: 'bg-blue-500' },
      { id: 'woocommerce', name: 'WooCommerce', icon: Store, desc: 'WordPress电商插件', color: 'bg-purple-500' },
    ],
  },
};

// 模拟店铺数据
const mockStores = [
  {
    id: 'store-1',
    name: '潮流服饰旗舰店',
    platform: 'taobao',
    scene: 'domestic',
    createdAt: '2024-01-15',
    progress: 65,
    products: 48,
    orders: 156,
    revenue: 12850,
    status: 'active',
    tasks: [
      { id: '1', title: '完成店铺装修', completed: true },
      { id: '2', title: '上传10款产品', completed: true },
      { id: '3', title: '设置运费模板', completed: true },
      { id: '4', title: '创建营销活动', completed: false },
      { id: '5', title: '优化产品详情页', completed: false },
    ],
  },
  {
    id: 'store-2',
    name: 'TechGadget Store',
    platform: 'amazon',
    scene: 'crossborder',
    createdAt: '2024-01-10',
    progress: 42,
    products: 32,
    orders: 89,
    revenue: 4560,
    status: 'active',
    tasks: [
      { id: '1', title: '完成Listing优化', completed: true },
      { id: '2', title: '设置FBA配送', completed: true },
      { id: '3', title: '创建广告计划', completed: false },
      { id: '4', title: '获取Buy Box', completed: false },
    ],
  },
  {
    id: 'store-3',
    name: 'Fashion Plus',
    platform: 'shopify',
    scene: 'independent',
    createdAt: '2024-01-08',
    progress: 78,
    products: 86,
    orders: 234,
    revenue: 18500,
    status: 'active',
    tasks: [
      { id: '1', title: '选择主题模板', completed: true },
      { id: '2', title: '配置支付方式', completed: true },
      { id: '3', title: '设置物流方案', completed: true },
      { id: '4', title: '导入产品数据', completed: true },
      { id: '5', title: 'SEO优化', completed: false },
      { id: '6', title: '配置Google Ads', completed: false },
    ],
  },
];

// 获取平台配置
function getPlatformConfig(scene: string, platformId: string) {
  const sceneConfig = sceneConfigs[scene as keyof typeof sceneConfigs];
  return sceneConfig?.platforms.find(p => p.id === platformId);
}

export default function PracticePage() {
  const router = useRouter();
  const [stores, setStores] = useState(mockStores);
  const [activeScene, setActiveScene] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [newStoreName, setNewStoreName] = useState('');

  // 筛选店铺
  const filteredStores = stores.filter(store => {
    const matchScene = activeScene === 'all' || store.scene === activeScene;
    const matchSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchScene && matchSearch;
  });

  // 删除店铺
  const handleDeleteStore = (storeId: string) => {
    setStores(stores.filter(s => s.id !== storeId));
  };

  // 创建新店铺
  const handleCreateStore = () => {
    if (!selectedPlatform || !newStoreName.trim()) return;

    // 确定场景
    let scene = 'independent';
    for (const [key, config] of Object.entries(sceneConfigs)) {
      if (config.platforms.some(p => p.id === selectedPlatform)) {
        scene = key;
        break;
      }
    }

    const newStore = {
      id: `store-${Date.now()}`,
      name: newStoreName,
      platform: selectedPlatform,
      scene,
      createdAt: new Date().toISOString().split('T')[0],
      progress: 0,
      products: 0,
      orders: 0,
      revenue: 0,
      status: 'development',
      tasks: [
        { id: '1', title: '完成店铺基础设置', completed: false },
        { id: '2', title: '上传产品', completed: false },
        { id: '3', title: '配置支付方式', completed: false },
      ],
    };

    setStores([newStore, ...stores]);
    setShowCreateDialog(false);
    setNewStoreName('');
    setSelectedPlatform(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentHeader />
      <StudentSidebar />
      
      <main className="ml-60 pt-16 p-6 min-h-screen">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">仿真实训</h1>
          <p className="text-slate-500 mt-1">创建和管理您的电商店铺，进行全流程实训操作</p>
        </div>

          {/* 场景切换 */}
          <div className="mb-6">
            <Tabs value={activeScene} onValueChange={setActiveScene}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="bg-white border border-slate-200">
                  <TabsTrigger value="all" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm">
                    全部
                  </TabsTrigger>
                  {Object.entries(sceneConfigs).map(([key, config]) => (
                    <TabsTrigger key={key} value={key} className="data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm">
                      <config.icon className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">{config.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="搜索店铺..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64 bg-white border-slate-200"
                    />
                  </div>

                  <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-slate-900 to-slate-700">
                        <Plus className="h-4 w-4 mr-2" />
                        新建店铺
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>创建新店铺</DialogTitle>
                        <DialogDescription>
                          选择电商场景和平台类型，开始您的实训之旅
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 py-4">
                        {/* 场景选择 */}
                        <div className="space-y-3">
                          <Label className="text-base font-semibold">选择电商场景</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {Object.entries(sceneConfigs).map(([key, config]) => (
                              <button
                                key={key}
                                onClick={() => {
                                  // 默认选择该场景的第一个平台
                                  setSelectedPlatform(config.platforms[0].id);
                                }}
                                className={`p-4 rounded-xl border-2 transition-all text-left ${
                                  selectedPlatform && config.platforms.some(p => p.id === selectedPlatform)
                                    ? 'border-slate-900 bg-slate-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center mb-2`}>
                                  <config.icon className={`h-5 w-5 ${config.textColor}`} />
                                </div>
                                <p className="font-medium text-slate-800">{config.name}</p>
                                <p className="text-xs text-slate-500 mt-1">{config.platforms.length}个平台可选</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 平台选择 */}
                        {selectedPlatform && (
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">选择平台类型</Label>
                            <div className="grid grid-cols-3 gap-3">
                              {Object.values(sceneConfigs).flatMap(config => 
                                config.platforms.map(platform => (
                                  <button
                                    key={platform.id}
                                    onClick={() => setSelectedPlatform(platform.id)}
                                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                                      selectedPlatform === platform.id
                                        ? 'border-slate-900 bg-slate-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className={`w-8 h-8 rounded ${platform.color} flex items-center justify-center`}>
                                        <platform.icon className="h-4 w-4 text-white" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-sm text-slate-800">{platform.name}</p>
                                        <p className="text-xs text-slate-500">{platform.desc}</p>
                                      </div>
                                    </div>
                                  </button>
                                ))
                              )}
                            </div>
                          </div>
                        )}

                        {/* 店铺名称 */}
                        <div className="space-y-2">
                          <Label htmlFor="storeName" className="text-base font-semibold">店铺名称</Label>
                          <Input
                            id="storeName"
                            placeholder="输入您的店铺名称"
                            value={newStoreName}
                            onChange={(e) => setNewStoreName(e.target.value)}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                          取消
                        </Button>
                        <Button 
                          onClick={handleCreateStore}
                          disabled={!selectedPlatform || !newStoreName.trim()}
                          className="bg-gradient-to-r from-slate-900 to-slate-700"
                        >
                          创建店铺
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Tabs>
          </div>

          {/* 店铺列表 */}
          {filteredStores.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-16 text-center">
                <Store className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium text-slate-800 mb-2">暂无店铺</h3>
                <p className="text-sm text-slate-500 mb-4">
                  创建您的第一个店铺，开始电商实训之旅
                </p>
                <Button onClick={() => setShowCreateDialog(true)} className="bg-gradient-to-r from-slate-900 to-slate-700">
                  <Plus className="h-4 w-4 mr-2" />
                  新建店铺
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => {
                const platformConfig = getPlatformConfig(store.scene, store.platform);
                const sceneConfig = sceneConfigs[store.scene as keyof typeof sceneConfigs];
                const completedTasks = store.tasks.filter(t => t.completed).length;

                return (
                  <Card key={store.id} className="border-0 shadow-sm hover:shadow-md transition-all group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sceneConfig.color} flex items-center justify-center`}>
                            {platformConfig ? (
                              <platformConfig.icon className="h-6 w-6 text-white" />
                            ) : (
                              <Store className="h-6 w-6 text-white" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-base">{store.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {platformConfig?.name || store.platform}
                              </Badge>
                              <span className="text-xs">
                                {store.status === 'active' ? '运营中' : '开发中'}
                              </span>
                            </CardDescription>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/student/practice/store/${store.id}`)}>
                              <Settings className="h-4 w-4 mr-2" />
                              进入后台
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/student/practice/preview/${store.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              预览前台
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteStore(store.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              删除店铺
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* 进度条 */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">实训进度</span>
                          <span className="font-medium text-slate-800">{store.progress}%</span>
                        </div>
                        <Progress value={store.progress} className="h-2" />
                      </div>

                      {/* 数据指标 */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-lg bg-slate-50">
                          <p className="text-lg font-bold text-slate-800">{store.products}</p>
                          <p className="text-xs text-slate-500">产品</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50">
                          <p className="text-lg font-bold text-slate-800">{store.orders}</p>
                          <p className="text-xs text-slate-500">订单</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50">
                          <p className="text-lg font-bold text-slate-800">
                            {store.revenue >= 1000 ? `${(store.revenue / 1000).toFixed(1)}k` : store.revenue}
                          </p>
                          <p className="text-xs text-slate-500">营收</p>
                        </div>
                      </div>

                      {/* 任务进度 */}
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-4 w-4" />
                        <span>{completedTasks}/{store.tasks.length} 任务完成</span>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-slate-900 to-slate-700"
                          onClick={() => router.push(`/student/practice/store/${store.id}`)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          后台管理
                        </Button>
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => router.push(`/student/practice/preview/${store.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          前台预览
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* 实训说明 */}
          <Card className="mt-8 border-0 shadow-sm bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">全流程实训体系</h3>
                  <p className="text-slate-300 mb-4">
                    从店铺搭建、产品上架、运营推广到数据分析，完整模拟真实电商运营全流程。
                    AI辅助决策，学生主导操作，在仿真环境中培养电商运营核心能力。
                  </p>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium">国内电商</p>
                        <p className="text-xs text-slate-400">淘宝/拼多多/抖音</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">跨境电商</p>
                        <p className="text-xs text-slate-400">Amazon/Shopee/Lazada</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Store className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium">外贸独立站</p>
                        <p className="text-xs text-slate-400">Shopify/店匠/WooCommerce</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
    </div>
  );
}
