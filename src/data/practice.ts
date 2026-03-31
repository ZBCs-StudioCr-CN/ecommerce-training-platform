// 实训系统核心数据模型
// 全链路模拟外贸独立站从0到1的完整流程

// ==================== 实训阶段定义 ====================

export type PracticeStage = 
  | 'market_research'    // 阶段一：市场调研与选品
  | 'store_setup'        // 阶段二：独立站搭建
  | 'product_listing'    // 阶段三：产品上架与优化
  | 'payment_logistics'  // 阶段四：支付与物流配置
  | 'traffic_promotion'  // 阶段五：流量推广
  | 'operation_service'  // 阶段六：运营与客服
  | 'data_analysis'      // 阶段七：数据分析与优化
  | 'final_assessment';  // 阶段八：综合考核

export interface StageConfig {
  id: PracticeStage;
  name: string;
  description: string;
  order: number;
  duration: string; // 预计完成时间
  tasks: PracticeTask[];
  prerequisites?: PracticeStage[];
  rewards: {
    exp: number;
    badge?: string;
  };
}

export interface PracticeTask {
  id: string;
  stageId: PracticeStage;
  name: string;
  description: string;
  type: 'operation' | 'report' | 'quiz' | 'simulation';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  estimatedTime: string;
  requirements: TaskRequirement[];
  hints: string[];
  evaluation: TaskEvaluation;
}

export interface TaskRequirement {
  type: 'field_value' | 'item_count' | 'score_threshold' | 'custom';
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'not_empty';
  value: any;
  description: string;
}

export interface TaskEvaluation {
  autoScore: boolean;
  criteria: EvaluationCriteria[];
  teacherReview?: boolean;
}

export interface EvaluationCriteria {
  name: string;
  maxScore: number;
  weight: number;
  description: string;
}

// ==================== 模拟店铺数据模型 ====================

export interface SimulatedStore {
  id: string;
  studentId: string;
  name: string;
  domain: string;
  status: 'draft' | 'development' | 'launched' | 'suspended';
  
  // 店铺设置
  settings: StoreSettings;
  
  // 产品数据
  products: SimulatedProduct[];
  
  // 页面数据
  pages: StorePage[];
  
  // 导航菜单
  menus: NavigationMenu[];
  
  // 主题设置
  theme: ThemeConfig;
  
  // 支付配置
  paymentMethods: PaymentMethod[];
  
  // 物流配置
  shippingZones: ShippingZone[];
  
  // 模拟订单数据
  orders: SimulatedOrder[];
  
  // 模拟客户数据
  customers: SimulatedCustomer[];
  
  // 模拟流量数据
  trafficData: TrafficData;
  
  // 模拟广告数据
  adCampaigns: AdCampaign[];
  
  // 实训进度
  progress: StoreProgress;
  
  // 创建时间
  createdAt: string;
  updatedAt: string;
}

export interface StoreSettings {
  // 基本信息
  storeName: string;
  legalName: string;
  email: string;
  phone: string;
  
  // 地址信息
  address: {
    address1: string;
    address2?: string;
    city: string;
    province: string;
    zip: string;
    country: string;
  };
  
  // 货币与语言
  currency: string;
  timezone: string;
  language: string;
  
  // 结账设置
  checkout: {
    requirePhone: boolean;
    showShippingAddress: boolean;
    termsAndConditions: boolean;
    customerAccounts: 'disabled' | 'optional' | 'required';
  };
  
  // 通知设置
  notifications: {
    orderConfirmation: boolean;
    shippingConfirmation: boolean;
    abandonedCart: boolean;
  };
}

export interface SimulatedProduct {
  id: string;
  title: string;
  description: string;
  vendor?: string;
  productType: string;
  tags: string[];
  
  // 产品图片
  images: ProductImage[];
  
  // 变体
  variants: ProductVariant[];
  
  // 价格
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;
  
  // 库存
  inventory: {
    quantity: number;
    policy: 'deny' | 'continue';
    tracking: boolean;
  };
  
  // SEO
  seo: {
    title: string;
    description: string;
    handle: string;
  };
  
  // 状态
  status: 'draft' | 'active' | 'archived';
  
  // 销售数据（模拟）
  analytics: {
    views: number;
    addToCart: number;
    purchases: number;
    revenue: number;
  };
  
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  position: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  option1?: string;
  option2?: string;
  option3?: string;
  price: number;
  sku: string;
  inventoryQuantity: number;
  weight: number;
  weightUnit: 'g' | 'kg' | 'oz' | 'lb';
}

export interface StorePage {
  id: string;
  title: string;
  handle: string;
  content: string;
  template: string;
  seo: {
    title: string;
    description: string;
  };
  status: 'draft' | 'published';
}

export interface NavigationMenu {
  id: string;
  title: string;
  handle: string;
  links: MenuLink[];
}

export interface MenuLink {
  id: string;
  title: string;
  url: string;
  type: 'frontpage' | 'collection' | 'product' | 'page' | 'blog' | 'http';
  parentId?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  role: 'main' | 'unpublished';
  
  // 主题设置
  settings: {
    // 颜色
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    
    // 字体
    typography: {
      headingFont: string;
      bodyFont: string;
      baseFontSize: number;
    };
    
    // 布局
    layout: {
      maxWidth: number;
      headerStyle: 'centered' | 'left' | 'split';
      footerStyle: 'simple' | 'expanded';
    };
    
    // 首页板块
    sections: HomeSection[];
  };
  
  // 自定义CSS
  customCss?: string;
}

export interface HomeSection {
  id: string;
  type: 'hero' | 'featured_collection' | 'image_banner' | 'text_block' | 'testimonials' | 'newsletter';
  settings: Record<string, any>;
  blocks?: SectionBlock[];
  order: number;
}

export interface SectionBlock {
  id: string;
  type: string;
  settings: Record<string, any>;
}

// ==================== 支付与物流 ====================

export interface PaymentMethod {
  id: string;
  type: 'paypal' | 'stripe' | 'credit_card' | 'bank_transfer' | 'cod';
  name: string;
  enabled: boolean;
  
  // 配置信息（模拟）
  config: {
    accountId?: string;
    apiKey?: string; // 模拟，不存储真实密钥
    webhookUrl?: string;
    testMode: boolean;
  };
  
  // 费率
  fees: {
    percentage: number;
    fixedFee: number;
    currency: string;
  };
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  methods: ShippingMethod[];
}

export interface ShippingMethod {
  id: string;
  name: string;
  type: 'standard' | 'express' | 'overnight';
  price: number;
  minDays: number;
  maxDays: number;
  weightBased?: {
    minWeight: number;
    maxWeight: number;
    pricePerKg: number;
  };
}

// ==================== 模拟数据模型 ====================

export interface SimulatedOrder {
  id: string;
  orderNumber: number;
  
  // 客户信息
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
  
  // 收货地址
  shippingAddress: {
    address1: string;
    address2?: string;
    city: string;
    province: string;
    zip: string;
    country: string;
    country_code: string;
  };
  
  // 订单商品
  lineItems: {
    productId: string;
    variantId: string;
    title: string;
    variantTitle?: string;
    quantity: number;
    price: number;
    sku: string;
  }[];
  
  // 金额
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  
  // 支付信息
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  
  // 履约信息
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled';
  trackingNumber?: string;
  trackingCompany?: string;
  
  // 时间
  createdAt: string;
  updatedAt: string;
  
  // 模拟来源
  source: 'organic' | 'ads' | 'social' | 'email' | 'direct';
  
  // 模拟风险评分
  riskLevel: 'low' | 'medium' | 'high';
}

export interface SimulatedCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  
  // 地址簿
  addresses: {
    address1: string;
    city: string;
    province: string;
    zip: string;
    country: string;
    default: boolean;
  }[];
  
  // 统计数据
  stats: {
    ordersCount: number;
    totalSpent: number;
    lastOrderAt?: string;
  };
  
  // 标签
  tags: string[];
  
  createdAt: string;
}

// ==================== 流量与广告 ====================

export interface TrafficData {
  // 概览
  overview: {
    totalVisitors: number;
    uniqueVisitors: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
  
  // 来源分布
  sources: {
    organic: number;
    direct: number;
    social: number;
    email: number;
    referral: number;
    paid: number;
  };
  
  // 设备分布
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  
  // 国家分布
  countries: {
    country: string;
    visitors: number;
    percentage: number;
  }[];
  
  // 热门页面
  topPages: {
    path: string;
    views: number;
    avgTime: number;
  }[];
  
  // 转化漏斗
  funnel: {
    visitors: number;
    productViews: number;
    addToCart: number;
    checkout: number;
    purchase: number;
  };
  
  // 时间序列数据（近30天）
  dailyStats: {
    date: string;
    visitors: number;
    pageViews: number;
    orders: number;
    revenue: number;
  }[];
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: 'google' | 'facebook' | 'instagram' | 'tiktok';
  status: 'draft' | 'active' | 'paused' | 'completed';
  
  // 预算
  budget: {
    daily: number;
    total: number;
    spent: number;
    remaining: number;
  };
  
  // 时间
  startDate: string;
  endDate?: string;
  
  // 目标
  objective: 'traffic' | 'conversions' | 'awareness' | 'leads';
  
  // 定向
  targeting: {
    locations: string[];
    ageMin: number;
    ageMax: number;
    genders: ('male' | 'female' | 'all')[];
    interests: string[];
    behaviors: string[];
  };
  
  // 广告组
  adGroups: AdGroup[];
  
  // 效果数据
  performance: {
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    conversions: number;
    conversionRate: number;
    roas: number;
    costPerConversion: number;
  };
  
  createdAt: string;
  updatedAt: string;
}

export interface AdGroup {
  id: string;
  name: string;
  bidAmount: number;
  ads: Ad[];
  keywords?: string[]; // Google Ads
}

export interface Ad {
  id: string;
  type: 'image' | 'video' | 'carousel' | 'text';
  headline: string;
  description: string;
  imageUrl?: string;
  destinationUrl: string;
  
  // 效果
  performance: {
    impressions: number;
    clicks: number;
    spend: number;
    conversions: number;
  };
}

// ==================== 实训进度 ====================

export interface StoreProgress {
  // 各阶段完成情况
  stages: {
    [key in PracticeStage]?: {
      started: boolean;
      completed: boolean;
      startedAt?: string;
      completedAt?: string;
      score?: number;
      tasks: {
        taskId: string;
        completed: boolean;
        score?: number;
        submittedAt?: string;
      }[];
    };
  };
  
  // 总体进度
  overallProgress: number; // 0-100
  
  // 经验值
  experience: number;
  level: number;
  
  // 成就
  achievements: string[];
  
  // 实训时长
  totalTimeSpent: number; // 分钟
}

// ==================== 实训任务配置 ====================

export const PRACTICE_STAGES: StageConfig[] = [
  {
    id: 'market_research',
    name: '阶段一：市场调研与选品',
    description: '完成市场分析报告，确定目标市场和产品定位',
    order: 1,
    duration: '4课时',
    tasks: [
      {
        id: 'mr_01',
        stageId: 'market_research',
        name: '目标市场分析报告',
        description: '选择一个目标市场（北美/欧洲/东南亚等），分析市场规模、消费习惯、竞争格局',
        type: 'report',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '90分钟',
        requirements: [
          { type: 'field_value', field: 'report.market', operator: 'not_empty', value: null, description: '选择目标市场' },
          { type: 'field_value', field: 'report.marketSize', operator: 'not_empty', value: null, description: '分析市场规模' },
          { type: 'item_count', field: 'report.competitors', operator: 'greater_than', value: 2, description: '分析至少3个竞品' },
          { type: 'field_value', field: 'report.summary', operator: 'not_empty', value: null, description: '撰写总结' },
        ],
        hints: [
          '使用 Google Trends 分析关键词趋势',
          '使用 SimilarWeb 分析竞品流量来源',
          '参考 Statista 获取市场数据',
        ],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '数据准确性', maxScore: 5, weight: 0.25, description: '数据来源可靠，分析准确' },
            { name: '分析深度', maxScore: 5, weight: 0.30, description: '分析全面深入' },
            { name: '逻辑结构', maxScore: 5, weight: 0.20, description: '报告结构清晰' },
            { name: '结论合理性', maxScore: 5, weight: 0.25, description: '结论有理有据' },
          ],
          teacherReview: true,
        },
      },
      {
        id: 'mr_02',
        stageId: 'market_research',
        name: '选品方案设计',
        description: '基于市场分析，设计产品选品方案，包括产品定位、定价策略、差异化卖点',
        type: 'report',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '60分钟',
        requirements: [
          { type: 'item_count', field: 'products', operator: 'greater_than', value: 4, description: '选择5-10款产品' },
          { type: 'field_value', field: 'pricing', operator: 'not_empty', value: null, description: '制定定价策略' },
          { type: 'field_value', field: 'differentiation', operator: 'not_empty', value: null, description: '明确差异化卖点' },
        ],
        hints: [
          '考虑目标市场的价格敏感度',
          '分析竞品定价区间',
          '关注产品利润空间',
        ],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '选品合理性', maxScore: 5, weight: 0.35, description: '产品符合市场需求' },
            { name: '定价策略', maxScore: 5, weight: 0.35, description: '定价有竞争力且利润合理' },
            { name: '差异化分析', maxScore: 5, weight: 0.30, description: '差异化定位清晰' },
          ],
          teacherReview: true,
        },
      },
    ],
    rewards: { exp: 100, badge: '市场分析师' },
  },
  {
    id: 'store_setup',
    name: '阶段二：独立站搭建',
    description: '完成店铺注册、主题配置、页面设计，建立完整的独立站',
    order: 2,
    duration: '8课时',
    tasks: [
      {
        id: 'ss_01',
        stageId: 'store_setup',
        name: '店铺基础设置',
        description: '完成店铺名称、Logo、联系方式、货币时区等基础设置',
        type: 'operation',
        difficulty: 'easy',
        points: 10,
        estimatedTime: '30分钟',
        requirements: [
          { type: 'field_value', field: 'store.name', operator: 'not_empty', value: null, description: '设置店铺名称' },
          { type: 'field_value', field: 'store.logo', operator: 'not_empty', value: null, description: '上传店铺Logo' },
          { type: 'field_value', field: 'store.email', operator: 'not_empty', value: null, description: '设置联系邮箱' },
          { type: 'field_value', field: 'store.currency', operator: 'not_empty', value: null, description: '设置货币单位' },
          { type: 'field_value', field: 'store.timezone', operator: 'not_empty', value: null, description: '设置时区' },
        ],
        hints: [
          '店铺名称要简洁易记',
          'Logo 尺寸建议 400x400px',
          '货币应与目标市场匹配',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '完整性', maxScore: 5, weight: 0.40, description: '所有必填项都已填写' },
            { name: '规范性', maxScore: 5, weight: 0.30, description: '信息格式正确' },
            { name: '一致性', maxScore: 5, weight: 0.30, description: '信息与品牌定位一致' },
          ],
        },
      },
      {
        id: 'ss_02',
        stageId: 'store_setup',
        name: '主题配置与首页设计',
        description: '选择主题，配置颜色字体，设计首页布局（Banner、产品展示区、品牌故事等）',
        type: 'operation',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '120分钟',
        requirements: [
          { type: 'field_value', field: 'theme.id', operator: 'not_empty', value: null, description: '选择并应用主题' },
          { type: 'item_count', field: 'theme.sections', operator: 'greater_than', value: 3, description: '首页至少4个板块' },
          { type: 'field_value', field: 'theme.heroImage', operator: 'not_empty', value: null, description: '设置首页Banner' },
          { type: 'score_threshold', field: 'designScore', operator: 'greater_than', value: 60, description: '设计评分≥60分' },
        ],
        hints: [
          '选择与品牌调性匹配的主题',
          '首页Banner要突出核心卖点',
          '注意移动端适配',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '视觉美观度', maxScore: 5, weight: 0.30, description: '整体视觉效果' },
            { name: '品牌一致性', maxScore: 5, weight: 0.25, description: '设计与品牌定位一致' },
            { name: '用户体验', maxScore: 5, weight: 0.25, description: '导航清晰，布局合理' },
            { name: '移动端适配', maxScore: 5, weight: 0.20, description: '移动端显示效果' },
          ],
        },
      },
      {
        id: 'ss_03',
        stageId: 'store_setup',
        name: '导航菜单设置',
        description: '创建主导航和页脚导航，设置分类页面链接',
        type: 'operation',
        difficulty: 'easy',
        points: 10,
        estimatedTime: '20分钟',
        requirements: [
          { type: 'item_count', field: 'menus.main.links', operator: 'greater_than', value: 3, description: '主导航至少4个链接' },
          { type: 'item_count', field: 'menus.footer.links', operator: 'greater_than', value: 4, description: '页脚导航至少5个链接' },
          { type: 'field_value', field: 'menus.hasDropdown', operator: 'equals', value: true, description: '至少有一个下拉菜单' },
        ],
        hints: [
          '导航结构要清晰',
          '重要页面放在显著位置',
          '页脚添加政策页面链接',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '结构清晰', maxScore: 5, weight: 0.40, description: '导航层级合理' },
            { name: '链接有效', maxScore: 5, weight: 0.40, description: '所有链接可访问' },
            { name: '用户体验', maxScore: 5, weight: 0.20, description: '便于用户浏览' },
          ],
        },
      },
    ],
    prerequisites: ['market_research'],
    rewards: { exp: 150, badge: '建站达人' },
  },
  {
    id: 'product_listing',
    name: '阶段三：产品上架与优化',
    description: '上架产品、撰写优化产品详情页、设置分类和标签',
    order: 3,
    duration: '6课时',
    tasks: [
      {
        id: 'pl_01',
        stageId: 'product_listing',
        name: '产品上架',
        description: '上架至少10款产品，填写完整的产品信息',
        type: 'operation',
        difficulty: 'medium',
        points: 25,
        estimatedTime: '90分钟',
        requirements: [
          { type: 'item_count', field: 'products', operator: 'greater_than', value: 9, description: '至少上架10款产品' },
          { type: 'field_value', field: 'products.images', operator: 'not_empty', value: null, description: '每个产品至少1张图片' },
          { type: 'field_value', field: 'products.description', operator: 'not_empty', value: null, description: '每个产品都有描述' },
          { type: 'field_value', field: 'products.price', operator: 'greater_than', value: 0, description: '每个产品都设置了价格' },
        ],
        hints: [
          '产品图片要清晰、多角度',
          '描述要突出产品特点和卖点',
          '价格设置要考虑利润空间',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '信息完整性', maxScore: 5, weight: 0.30, description: '所有必填信息完整' },
            { name: '图片质量', maxScore: 5, weight: 0.25, description: '图片清晰美观' },
            { name: '描述质量', maxScore: 5, weight: 0.25, description: '描述详细有吸引力' },
            { name: '分类合理', maxScore: 5, weight: 0.20, description: '产品分类清晰' },
          ],
        },
      },
      {
        id: 'pl_02',
        stageId: 'product_listing',
        name: '产品SEO优化',
        description: '为产品页面设置SEO标题、描述、URL，优化关键词',
        type: 'operation',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '45分钟',
        requirements: [
          { type: 'field_value', field: 'products.seo.title', operator: 'not_empty', value: null, description: '每个产品都有SEO标题' },
          { type: 'field_value', field: 'products.seo.description', operator: 'not_empty', value: null, description: '每个产品都有SEO描述' },
          { type: 'score_threshold', field: 'seoScore', operator: 'greater_than', value: 70, description: 'SEO评分≥70分' },
        ],
        hints: [
          '标题包含核心关键词',
          '描述要吸引人且包含关键词',
          'URL简洁易读',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '关键词优化', maxScore: 5, weight: 0.35, description: '关键词布局合理' },
            { name: '标题优化', maxScore: 5, weight: 0.30, description: '标题吸引且包含关键词' },
            { name: '描述优化', maxScore: 5, weight: 0.35, description: '描述完整有吸引力' },
          ],
        },
      },
      {
        id: 'pl_03',
        stageId: 'product_listing',
        name: '产品分类设置',
        description: '创建产品分类集合，将产品合理分类',
        type: 'operation',
        difficulty: 'easy',
        points: 10,
        estimatedTime: '20分钟',
        requirements: [
          { type: 'item_count', field: 'collections', operator: 'greater_than', value: 2, description: '至少创建3个分类' },
          { type: 'field_value', field: 'collections.image', operator: 'not_empty', value: null, description: '分类都有封面图' },
          { type: 'field_value', field: 'collections.description', operator: 'not_empty', value: null, description: '分类都有描述' },
        ],
        hints: [
          '分类要符合用户浏览习惯',
          '每个分类添加描述和封面图',
          '避免分类过多或过少',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '分类合理性', maxScore: 5, weight: 0.50, description: '分类逻辑清晰' },
            { name: '分类完整性', maxScore: 5, weight: 0.50, description: '所有产品都有分类' },
          ],
        },
      },
    ],
    prerequisites: ['store_setup'],
    rewards: { exp: 150, badge: '产品运营官' },
  },
  {
    id: 'payment_logistics',
    name: '阶段四：支付与物流配置',
    description: '配置支付网关、设置物流方案、完善结账流程',
    order: 4,
    duration: '4课时',
    tasks: [
      {
        id: 'pm_01',
        stageId: 'payment_logistics',
        name: '支付方式配置',
        description: '配置PayPal和信用卡支付方式',
        type: 'operation',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '30分钟',
        requirements: [
          { type: 'item_count', field: 'paymentMethods', operator: 'greater_than', value: 1, description: '至少配置2种支付方式' },
          { type: 'field_value', field: 'paymentMethods.paypal', operator: 'equals', value: true, description: '启用PayPal支付' },
          { type: 'field_value', field: 'paymentMethods.creditCard', operator: 'equals', value: true, description: '启用信用卡支付' },
        ],
        hints: [
          'PayPal是跨境必备支付方式',
          '信用卡支付提升转化率',
          '注意支付方式费率对比',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '配置完整', maxScore: 5, weight: 0.50, description: '支付方式配置完整' },
            { name: '费率设置', maxScore: 5, weight: 0.50, description: '了解各支付方式费率' },
          ],
        },
      },
      {
        id: 'pm_02',
        stageId: 'payment_logistics',
        name: '物流方案设置',
        description: '配置物流区域、运费模板、配送时效',
        type: 'operation',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '45分钟',
        requirements: [
          { type: 'item_count', field: 'shippingZones', operator: 'greater_than', value: 0, description: '至少配置1个物流区域' },
          { type: 'item_count', field: 'shippingMethods', operator: 'greater_than', value: 1, description: '每个区域至少2种配送方式' },
          { type: 'field_value', field: 'shippingZones.countries', operator: 'not_empty', value: null, description: '设置配送国家' },
        ],
        hints: [
          '主要市场设置免运费门槛',
          '提供多种配送速度选择',
          '偏远地区设置额外运费',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '覆盖范围', maxScore: 5, weight: 0.30, description: '配送覆盖目标市场' },
            { name: '定价合理', maxScore: 5, weight: 0.40, description: '运费定价合理' },
            { name: '时效清晰', maxScore: 5, weight: 0.30, description: '配送时效明确' },
          ],
        },
      },
      {
        id: 'pm_03',
        stageId: 'payment_logistics',
        name: '结账流程优化',
        description: '优化结账页面设置，提升转化率',
        type: 'operation',
        difficulty: 'easy',
        points: 10,
        estimatedTime: '20分钟',
        requirements: [
          { type: 'field_value', field: 'checkout.guestCheckout', operator: 'equals', value: true, description: '启用访客结账' },
          { type: 'field_value', field: 'checkout.showShippingAddress', operator: 'equals', value: true, description: '显示配送地址表单' },
          { type: 'field_value', field: 'checkout.termsAndConditions', operator: 'equals', value: true, description: '添加条款确认' },
        ],
        hints: [
          '简化结账流程提升转化',
          '添加信任元素',
          '支持多种结账选项',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '流程简洁', maxScore: 5, weight: 0.50, description: '结账步骤精简' },
            { name: '用户友好', maxScore: 5, weight: 0.50, description: '结账体验良好' },
          ],
        },
      },
    ],
    prerequisites: ['product_listing'],
    rewards: { exp: 100, badge: '支付物流专员' },
  },
  {
    id: 'traffic_promotion',
    name: '阶段五：流量推广',
    description: '学习SEO优化、广告投放、社媒营销，获取流量',
    order: 5,
    duration: '10课时',
    tasks: [
      {
        id: 'tp_01',
        stageId: 'traffic_promotion',
        name: 'SEO优化实施',
        description: '优化网站SEO，提交站点地图，配置搜索引擎收录',
        type: 'operation',
        difficulty: 'hard',
        points: 20,
        estimatedTime: '60分钟',
        requirements: [
          { type: 'field_value', field: 'seo.sitemap', operator: 'equals', value: true, description: '生成站点地图' },
          { type: 'field_value', field: 'seo.robots', operator: 'not_empty', value: null, description: '配置robots.txt' },
          { type: 'field_value', field: 'seo.googleVerification', operator: 'not_empty', value: null, description: '完成Google验证' },
          { type: 'score_threshold', field: 'seoScore', operator: 'greater_than', value: 80, description: 'SEO评分≥80分' },
        ],
        hints: [
          '提交站点地图到Google Search Console',
          '优化页面加载速度',
          '添加结构化数据',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '技术SEO', maxScore: 5, weight: 0.40, description: '技术配置完善' },
            { name: '内容SEO', maxScore: 5, weight: 0.40, description: '内容优化到位' },
            { name: '外链建设', maxScore: 5, weight: 0.20, description: '了解外链策略' },
          ],
        },
      },
      {
        id: 'tp_02',
        stageId: 'traffic_promotion',
        name: 'Google广告投放模拟',
        description: '创建Google Ads广告系列，设置预算、定向、关键词',
        type: 'simulation',
        difficulty: 'hard',
        points: 25,
        estimatedTime: '90分钟',
        requirements: [
          { type: 'item_count', field: 'adCampaigns.google', operator: 'greater_than', value: 0, description: '创建Google广告系列' },
          { type: 'field_value', field: 'campaign.budget', operator: 'greater_than', value: 0, description: '设置广告预算' },
          { type: 'item_count', field: 'campaign.keywords', operator: 'greater_than', value: 4, description: '添加至少5个关键词' },
          { type: 'field_value', field: 'campaign.ads', operator: 'not_empty', value: null, description: '创建广告素材' },
        ],
        hints: [
          '关键词选择要精准',
          '广告文案要吸引人',
          '设置转化追踪',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '广告结构', maxScore: 5, weight: 0.25, description: '广告系列结构合理' },
            { name: '关键词选择', maxScore: 5, weight: 0.30, description: '关键词相关性高' },
            { name: '广告创意', maxScore: 5, weight: 0.25, description: '广告素材质量高' },
            { name: '定向设置', maxScore: 5, weight: 0.20, description: '定向设置精准' },
          ],
        },
      },
      {
        id: 'tp_03',
        stageId: 'traffic_promotion',
        name: '社媒营销策划',
        description: '制定社交媒体营销计划，创建社媒账号矩阵',
        type: 'report',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '60分钟',
        requirements: [
          { type: 'item_count', field: 'socialAccounts', operator: 'greater_than', value: 1, description: '至少规划2个社媒平台' },
          { type: 'field_value', field: 'socialPlan.content', operator: 'not_empty', value: null, description: '制定内容策略' },
          { type: 'field_value', field: 'socialPlan.calendar', operator: 'not_empty', value: null, description: '制定发布日历' },
        ],
        hints: [
          '选择适合目标市场的社媒平台',
          '制定内容发布计划',
          '规划互动策略',
        ],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '平台选择', maxScore: 5, weight: 0.25, description: '平台选择合理' },
            { name: '内容策略', maxScore: 5, weight: 0.35, description: '内容规划详细' },
            { name: '执行计划', maxScore: 5, weight: 0.40, description: '计划可执行性强' },
          ],
          teacherReview: true,
        },
      },
    ],
    prerequisites: ['payment_logistics'],
    rewards: { exp: 200, badge: '流量运营专家' },
  },
  {
    id: 'operation_service',
    name: '阶段六：运营与客服',
    description: '学习订单处理、客户服务、邮件营销等运营技能',
    order: 6,
    duration: '6课时',
    tasks: [
      {
        id: 'os_01',
        stageId: 'operation_service',
        name: '订单处理模拟',
        description: '处理模拟订单，包括确认、发货、退款等操作',
        type: 'simulation',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '45分钟',
        requirements: [
          { type: 'score_threshold', field: 'orderProcessRate', operator: 'greater_than', value: 90, description: '订单处理率≥90%' },
          { type: 'score_threshold', field: 'orderAccuracy', operator: 'greater_than', value: 95, description: '处理准确率≥95%' },
          { type: 'score_threshold', field: 'responseTime', operator: 'less_than', value: 24, description: '响应时间<24小时' },
        ],
        hints: [
          '及时处理订单',
          '准确记录物流信息',
          '妥善处理退款申请',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '处理效率', maxScore: 5, weight: 0.35, description: '订单处理速度快' },
            { name: '操作准确', maxScore: 5, weight: 0.35, description: '操作无误' },
            { name: '客户沟通', maxScore: 5, weight: 0.30, description: '沟通专业及时' },
          ],
        },
      },
      {
        id: 'os_02',
        stageId: 'operation_service',
        name: '客服话术设计',
        description: '设计常见问题回复模板，处理客户咨询',
        type: 'report',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '60分钟',
        requirements: [
          { type: 'item_count', field: 'faqTemplates', operator: 'greater_than', value: 9, description: '至少10个常见问题模板' },
          { type: 'field_value', field: 'returnPolicy', operator: 'not_empty', value: null, description: '制定退换货政策' },
          { type: 'field_value', field: 'refundProcess', operator: 'not_empty', value: null, description: '制定退款流程' },
        ],
        hints: [
          '回复要专业友好',
          '解决客户核心问题',
          '制定标准流程',
        ],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '覆盖全面', maxScore: 5, weight: 0.30, description: '问题覆盖全面' },
            { name: '语言专业', maxScore: 5, weight: 0.35, description: '回复语言专业' },
            { name: '解决方案', maxScore: 5, weight: 0.35, description: '解决方案合理' },
          ],
          teacherReview: true,
        },
      },
      {
        id: 'os_03',
        stageId: 'operation_service',
        name: '邮件营销设置',
        description: '配置自动邮件，包括订单确认、发货通知、弃购挽回',
        type: 'operation',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '45分钟',
        requirements: [
          { type: 'field_value', field: 'emails.orderConfirmation', operator: 'not_empty', value: null, description: '配置订单确认邮件' },
          { type: 'field_value', field: 'emails.shippingNotification', operator: 'not_empty', value: null, description: '配置发货通知邮件' },
          { type: 'field_value', field: 'emails.abandonedCart', operator: 'not_empty', value: null, description: '配置弃购挽回邮件' },
        ],
        hints: [
          '邮件主题要吸引人',
          '内容简洁明了',
          '添加CTA按钮',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '内容质量', maxScore: 5, weight: 0.40, description: '邮件内容专业' },
            { name: '设计美观', maxScore: 5, weight: 0.30, description: '邮件设计美观' },
            { name: '自动化设置', maxScore: 5, weight: 0.30, description: '触发条件合理' },
          ],
        },
      },
    ],
    prerequisites: ['traffic_promotion'],
    rewards: { exp: 150, badge: '运营客服专家' },
  },
  {
    id: 'data_analysis',
    name: '阶段七：数据分析与优化',
    description: '学习数据分析方法，优化店铺运营策略',
    order: 7,
    duration: '6课时',
    tasks: [
      {
        id: 'da_01',
        stageId: 'data_analysis',
        name: '数据分析报告',
        description: '分析店铺流量、转化、销售数据，输出分析报告',
        type: 'report',
        difficulty: 'hard',
        points: 25,
        estimatedTime: '90分钟',
        requirements: [
          { type: 'field_value', field: 'report.trafficAnalysis', operator: 'not_empty', value: null, description: '流量分析' },
          { type: 'field_value', field: 'report.conversionAnalysis', operator: 'not_empty', value: null, description: '转化分析' },
          { type: 'field_value', field: 'report.productAnalysis', operator: 'not_empty', value: null, description: '产品分析' },
          { type: 'field_value', field: 'report.optimization', operator: 'not_empty', value: null, description: '优化建议' },
        ],
        hints: [
          '使用Google Analytics分析数据',
          '关注核心指标趋势',
          '提出可执行的优化建议',
        ],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '数据分析', maxScore: 5, weight: 0.35, description: '数据分析深入' },
            { name: '洞察发现', maxScore: 5, weight: 0.30, description: '发现关键问题' },
            { name: '优化建议', maxScore: 5, weight: 0.35, description: '建议切实可行' },
          ],
          teacherReview: true,
        },
      },
      {
        id: 'da_02',
        stageId: 'data_analysis',
        name: 'A/B测试方案',
        description: '设计并执行A/B测试，优化转化率',
        type: 'simulation',
        difficulty: 'hard',
        points: 20,
        estimatedTime: '60分钟',
        requirements: [
          { type: 'field_value', field: 'abTest.hypothesis', operator: 'not_empty', value: null, description: '提出测试假设' },
          { type: 'field_value', field: 'abTest.variants', operator: 'not_empty', value: null, description: '设计测试变体' },
          { type: 'field_value', field: 'abTest.result', operator: 'not_empty', value: null, description: '分析测试结果' },
        ],
        hints: [
          '每次只测试一个变量',
          '确保样本量充足',
          '关注统计显著性',
        ],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '假设合理', maxScore: 5, weight: 0.30, description: '测试假设有依据' },
            { name: '设计科学', maxScore: 5, weight: 0.35, description: '测试设计科学' },
            { name: '结论正确', maxScore: 5, weight: 0.35, description: '结论分析正确' },
          ],
        },
      },
    ],
    prerequisites: ['operation_service'],
    rewards: { exp: 150, badge: '数据分析师' },
  },
  {
    id: 'final_assessment',
    name: '阶段八：综合考核',
    description: '完成独立站综合运营考核，输出完整运营方案',
    order: 8,
    duration: '8课时',
    tasks: [
      {
        id: 'fa_01',
        stageId: 'final_assessment',
        name: '独立站综合运营方案',
        description: '输出一份完整的独立站运营方案，涵盖选品、推广、运营全链路',
        type: 'report',
        difficulty: 'hard',
        points: 50,
        estimatedTime: '180分钟',
        requirements: [
          { type: 'field_value', field: 'plan.marketAnalysis', operator: 'not_empty', value: null, description: '市场分析' },
          { type: 'field_value', field: 'plan.productStrategy', operator: 'not_empty', value: null, description: '产品策略' },
          { type: 'field_value', field: 'plan.marketingStrategy', operator: 'not_empty', value: null, description: '营销策略' },
          { type: 'field_value', field: 'plan.operationStrategy', operator: 'not_empty', value: null, description: '运营策略' },
          { type: 'field_value', field: 'plan.budget', operator: 'not_empty', value: null, description: '预算规划' },
          { type: 'field_value', field: 'plan.kpi', operator: 'not_empty', value: null, description: 'KPI目标' },
        ],
        hints: [
          '方案要系统全面',
          '数据支撑有依据',
          '策略可执行性强',
        ],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '完整性', maxScore: 10, weight: 0.20, description: '方案内容完整' },
            { name: '专业性', maxScore: 10, weight: 0.25, description: '分析专业深入' },
            { name: '可行性', maxScore: 10, weight: 0.30, description: '方案可执行' },
            { name: '创新性', maxScore: 10, weight: 0.15, description: '有创新亮点' },
            { name: '规范性', maxScore: 10, weight: 0.10, description: '格式规范美观' },
          ],
          teacherReview: true,
        },
      },
      {
        id: 'fa_02',
        stageId: 'final_assessment',
        name: '独立站实操答辩',
        description: '展示独立站运营成果，回答评委提问',
        type: 'quiz',
        difficulty: 'hard',
        points: 30,
        estimatedTime: '30分钟',
        requirements: [
          { type: 'score_threshold', field: 'presentationScore', operator: 'greater_than', value: 60, description: '答辩评分≥60分' },
        ],
        hints: [
          '准备详细的演示文稿',
          '展示关键数据和成果',
          '准备常见问题答案',
        ],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '展示能力', maxScore: 10, weight: 0.30, description: '表达清晰有条理' },
            { name: '专业知识', maxScore: 10, weight: 0.35, description: '回答专业准确' },
            { name: '应变能力', maxScore: 10, weight: 0.35, description: '问题回答流畅' },
          ],
          teacherReview: true,
        },
      },
    ],
    prerequisites: ['data_analysis'],
    rewards: { exp: 300, badge: '独立站运营专家' },
  },
];

// 获取实训阶段
export function getPracticeStage(stageId: PracticeStage): StageConfig | undefined {
  return PRACTICE_STAGES.find(s => s.id === stageId);
}

// 获取所有实训阶段
export function getAllPracticeStages(): StageConfig[] {
  return PRACTICE_STAGES;
}

// 获取下一个阶段
export function getNextStage(currentStage: PracticeStage): PracticeStage | null {
  const currentIndex = PRACTICE_STAGES.findIndex(s => s.id === currentStage);
  if (currentIndex < PRACTICE_STAGES.length - 1) {
    return PRACTICE_STAGES[currentIndex + 1].id;
  }
  return null;
}

// 检查阶段是否可以开始
export function canStartStage(stageId: PracticeStage, progress: StoreProgress): boolean {
  const stage = getPracticeStage(stageId);
  if (!stage) return false;
  
  if (!stage.prerequisites || stage.prerequisites.length === 0) {
    return true;
  }
  
  return stage.prerequisites.every(preId => {
    const preStage = progress.stages[preId];
    return preStage?.completed;
  });
}

// 计算总经验值
export function getTotalExp(): number {
  return PRACTICE_STAGES.reduce((sum, stage) => sum + stage.rewards.exp, 0);
}

// 计算等级
export function calculateLevel(exp: number): number {
  if (exp < 100) return 1;
  if (exp < 300) return 2;
  if (exp < 600) return 3;
  if (exp < 1000) return 4;
  if (exp < 1500) return 5;
  return Math.floor(exp / 500) + 5;
}
