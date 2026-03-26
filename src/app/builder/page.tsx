'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  Save,
  Settings,
  LayoutGrid,
  Image,
  Type,
  Square,
  Menu,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Globe,
  Shield,
  Palette,
  MousePointer,
  Undo,
  Redo,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Trash2,
  ChevronDown,
  GripVertical,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedComponent, setSelectedComponent] = useState<string | null>('banner');

  const templateComponents = [
    { id: 'banner', name: '轮播图', icon: Image, category: '布局' },
    { id: 'product-grid', name: '商品网格', icon: LayoutGrid, category: '商品' },
    { id: 'text-block', name: '文本块', icon: Type, category: '内容' },
    { id: 'image-text', name: '图文组合', icon: Square, category: '内容' },
    { id: 'navigation', name: '导航栏', icon: Menu, category: '布局' },
    { id: 'footer', name: '页脚', icon: LayoutGrid, category: '布局' },
  ];

  const productItems = [
    { id: 1, name: '时尚连衣裙', price: '$59.99', status: '已上架', image: '👗' },
    { id: 2, name: '休闲运动鞋', price: '$89.99', status: '已上架', image: '👟' },
    { id: 3, name: '简约手提包', price: '$45.00', status: '草稿', image: '👜' },
    { id: 4, name: '太阳镜', price: '$29.99', status: '已上架', image: '🕶️' },
  ];

  const shopSettings = [
    { id: 'domain', name: '域名设置', icon: Globe, description: '配置店铺域名' },
    { id: 'payment', name: '支付方式', icon: CreditCard, description: '设置收款账户' },
    { id: 'shipping', name: '物流配送', icon: Truck, description: '配送区域与费用' },
    { id: 'policy', name: '政策条款', icon: Shield, description: '退换货、隐私政策' },
  ];

  const completedSteps = [
    { id: 1, name: '品牌定位', completed: true },
    { id: 2, name: '域名申请', completed: true },
    { id: 3, name: '基础配置', completed: true },
    { id: 4, name: '模板选择', completed: true },
    { id: 5, name: '页面装修', completed: false, current: true },
    { id: 6, name: '商品上传', completed: false },
    { id: 7, name: '支付物流', completed: false },
    { id: 8, name: '合规设置', completed: false },
    { id: 9, name: '店铺上线', completed: false },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* 顶部工具栏 */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            返回控制台
          </Button>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">My Fashion Store</p>
              <p className="text-xs text-slate-500">fashion-store.simulation.com</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 视图切换 */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'default' : 'ghost'}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <Button variant="ghost" size="icon">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-slate-200" />

          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            预览
          </Button>
          <Button size="sm" className="gap-2">
            <Save className="h-4 w-4" />
            保存
          </Button>
        </div>
      </header>

      {/* 实训进度条 */}
      <div className="h-12 bg-white border-b px-4 flex items-center gap-4">
        <span className="text-sm text-slate-500">搭建进度</span>
        <div className="flex-1 flex items-center gap-2">
          {completedSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : step.current
                    ? 'bg-blue-500 text-white ring-4 ring-blue-100'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {step.completed ? '✓' : step.id}
              </div>
              {index < completedSteps.length - 1 && (
                <div
                  className={`w-6 h-1 ${
                    step.completed ? 'bg-green-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <Badge className="bg-blue-100 text-blue-700">进行中：页面装修</Badge>
      </div>

      {/* 主编辑区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧组件面板 */}
        <aside className="w-64 bg-white border-r flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start border-b rounded-none p-0 h-12">
              <TabsTrigger value="templates" className="gap-2 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                <LayoutGrid className="h-4 w-4" />
                模板
              </TabsTrigger>
              <TabsTrigger value="products" className="gap-2 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                <Package className="h-4 w-4" />
                商品
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500">
                <Settings className="h-4 w-4" />
                设置
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="flex-1 overflow-y-auto p-4 m-0">
              <div className="space-y-2">
                {templateComponents.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-3 border rounded-lg hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-colors"
                    draggable
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <comp.icon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{comp.name}</p>
                        <p className="text-xs text-slate-500">{comp.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600">
                  💡 提示：拖拽组件到右侧预览区进行装修
                </p>
              </div>
            </TabsContent>

            <TabsContent value="products" className="flex-1 overflow-y-auto p-4 m-0">
              <Button className="w-full mb-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                添加商品
              </Button>

              <div className="space-y-2">
                {productItems.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 border rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-sm text-blue-600 font-medium">{product.price}</p>
                      </div>
                      <Badge variant={product.status === '已上架' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 overflow-y-auto p-4 m-0">
              <div className="space-y-2">
                {shopSettings.map((setting) => (
                  <div
                    key={setting.id}
                    className="p-3 border rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <setting.icon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{setting.name}</p>
                        <p className="text-xs text-slate-500">{setting.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-600">
                  ✓ 已配置GDPR合规设置
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* 中间预览区 */}
        <main className="flex-1 flex items-center justify-center p-8 bg-slate-200/50">
          <div
            className={`bg-white rounded-lg shadow-2xl overflow-hidden ${
              viewMode === 'desktop'
                ? 'w-full max-w-5xl'
                : viewMode === 'tablet'
                ? 'w-[768px]'
                : 'w-[375px]'
            }`}
          >
            {/* 模拟网站 */}
            <div className="aspect-[16/10]">
              {/* 网站头部 */}
              <div className="h-14 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MF</span>
                  </div>
                  <span className="text-white font-medium">My Fashion Store</span>
                </div>
                <div className="flex items-center gap-6 text-white/80 text-sm">
                  <span className="hover:text-white cursor-pointer">首页</span>
                  <span className="hover:text-white cursor-pointer">新品</span>
                  <span className="hover:text-white cursor-pointer">商品</span>
                  <span className="hover:text-white cursor-pointer">关于</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Banner区域 */}
              <div
                className={`h-40 relative cursor-pointer ${
                  selectedComponent === 'banner' ? 'ring-4 ring-blue-400 ring-inset' : ''
                }`}
                onClick={() => setSelectedComponent('banner')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-3xl font-bold mb-2">2026春季新品</p>
                    <p className="text-lg opacity-90">探索最新时尚系列</p>
                    <Button variant="secondary" size="sm" className="mt-4">
                      立即选购
                    </Button>
                  </div>
                </div>
                {selectedComponent === 'banner' && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <GripVertical className="h-3 w-3" />
                    轮播图组件
                  </div>
                )}
              </div>

              {/* 商品网格 */}
              <div
                className={`p-6 cursor-pointer ${
                  selectedComponent === 'products' ? 'ring-4 ring-blue-400 ring-inset' : ''
                }`}
                onClick={() => setSelectedComponent('products')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-800">热门商品</h2>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">查看全部</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {productItems.slice(0, 4).map((product) => (
                    <div key={product.id} className="group">
                      <div className="aspect-square rounded-lg bg-slate-100 flex items-center justify-center text-5xl mb-2 group-hover:shadow-lg transition-shadow">
                        {product.image}
                      </div>
                      <p className="text-sm font-medium text-slate-800">{product.name}</p>
                      <p className="text-sm text-blue-600 font-medium">{product.price}</p>
                    </div>
                  ))}
                </div>
                {selectedComponent === 'products' && (
                  <div className="mt-4 bg-blue-500 text-white text-xs px-2 py-1 rounded inline-flex items-center gap-1">
                    <GripVertical className="h-3 w-3" />
                    商品网格组件
                  </div>
                )}
              </div>

              {/* 页脚 */}
              <div className="h-16 bg-slate-900 flex items-center justify-between px-6">
                <div className="text-white/60 text-sm">
                  © 2026 My Fashion Store. 模拟店铺，仅供实训使用。
                </div>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <span>隐私政策</span>
                  <span>服务条款</span>
                  <span>联系我们</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 右侧属性面板 */}
        <aside className="w-72 bg-white border-l flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold">组件属性</h3>
            <p className="text-sm text-slate-500">
              {selectedComponent === 'banner' ? '轮播图' : selectedComponent === 'products' ? '商品网格' : '选择组件编辑'}
            </p>
          </div>

          {selectedComponent === 'banner' && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">标题文本</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                    defaultValue="2026春季新品"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">副标题</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                    defaultValue="探索最新时尚系列"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">按钮文本</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                    defaultValue="立即选购"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">背景渐变</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 rounded bg-rose-400" />
                    <div className="w-8 h-8 rounded bg-pink-400" />
                    <div className="w-8 h-8 rounded bg-purple-500" />
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Palette className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除组件
                  </Button>
                </div>
              </div>
            </div>
          )}

          {selectedComponent === 'products' && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">标题</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                    defaultValue="热门商品"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">列数</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button variant="outline" size="sm" className="flex-1">2列</Button>
                    <Button variant="default" size="sm" className="flex-1">4列</Button>
                    <Button variant="outline" size="sm" className="flex-1">6列</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">显示数量</label>
                  <input
                    type="number"
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                    defaultValue="4"
                  />
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除组件
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!selectedComponent && (
            <div className="flex-1 flex items-center justify-center text-center p-4">
              <div className="text-slate-400">
                <MousePointer className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">点击预览区的组件<br />进行编辑</p>
              </div>
            </div>
          )}

          {/* 图层列表 */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">图层</span>
              <Layers className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-1">
              <div className="p-2 bg-blue-50 rounded-lg text-sm flex items-center gap-2">
                <GripVertical className="h-3 w-3 text-slate-400" />
                <Image className="h-4 w-4 text-slate-500" />
                <span>轮播图</span>
              </div>
              <div className="p-2 hover:bg-slate-50 rounded-lg text-sm flex items-center gap-2 cursor-pointer">
                <GripVertical className="h-3 w-3 text-slate-400" />
                <LayoutGrid className="h-4 w-4 text-slate-500" />
                <span>商品网格</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
