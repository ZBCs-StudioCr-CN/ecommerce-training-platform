// 课程体系数据 - 基于中国高校电商/外贸专业课程标准
// 参考：电子商务专业、国际经济与贸易专业、跨境电子商务专业人才培养方案

export interface Chapter {
  id: number;
  title: string;
  duration: string;
  videoKey?: string;
  documentKeys?: string[];
  description?: string;
  tags?: string[];
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export interface Course {
  id: number;
  name: string;
  description: string;
  chapters: Chapter[];
  duration: string;
  status: 'published' | 'draft';
  category: CourseCategory;
  credit?: number;
  prerequisites?: number[];
  progress?: number;
  completed?: number;
}

export type CourseCategory = 
  | 'foundation'      // 专业基础课程
  | 'core'           // 专业核心课程
  | 'practice'       // 实践操作课程
  | 'extension'      // 拓展提升课程
  | 'certification'; // 考证培训课程

export interface CourseModule {
  id: string;
  name: string;
  description: string;
  category: CourseCategory;
  courses: Course[];
}

// 课程模块划分
export const courseModules: CourseModule[] = [
  {
    id: 'foundation',
    name: '专业基础模块',
    description: '电子商务与国际贸易基础理论知识',
    category: 'foundation',
    courses: [],
  },
  {
    id: 'core',
    name: '专业核心模块',
    description: '独立站建设与运营核心技能',
    category: 'core',
    courses: [],
  },
  {
    id: 'practice',
    name: '实践操作模块',
    description: '全流程模拟实训与项目实战',
    category: 'practice',
    courses: [],
  },
  {
    id: 'extension',
    name: '拓展提升模块',
    description: '进阶运营技巧与行业前沿',
    category: 'extension',
    courses: [],
  },
  {
    id: 'certification',
    name: '考证培训模块',
    description: '行业认证考试辅导',
    category: 'certification',
    courses: [],
  },
];

// 课程数据（模拟数据库）
export const courses: Course[] = [
  // ==================== 专业基础模块 ====================
  {
    id: 1,
    name: '第一章：电子商务概论',
    description: '系统学习电子商务基本概念、发展历程、商业模式，掌握电商行业全貌与发展趋势',
    duration: '6课时',
    status: 'published',
    category: 'foundation',
    credit: 3,
    progress: 100,
    completed: 8,
    chapters: [
      { id: 101, title: '1.1 电子商务概述', duration: '8:00', description: '电子商务的定义、特征与分类', tags: ['基础概念'], difficulty: 'basic' },
      { id: 102, title: '1.2 电子商务发展历程', duration: '10:00', description: '从EDI到移动互联网电商的发展脉络', tags: ['发展历史'], difficulty: 'basic' },
      { id: 103, title: '1.3 电子商务商业模式', duration: '12:00', description: 'B2B、B2C、C2C、O2O等主流模式解析', tags: ['商业模式'], difficulty: 'basic' },
      { id: 104, title: '1.4 跨境电商概述', duration: '10:00', description: '跨境电商的概念、特点与发展趋势', tags: ['跨境电商'], difficulty: 'basic' },
      { id: 105, title: '1.5 独立站与平台店铺对比', duration: '8:00', description: '两种模式的优劣势分析与选择策略', tags: ['独立站'], difficulty: 'basic' },
      { id: 106, title: '1.6 电商法律法规基础', duration: '15:00', description: '电子商务法、消费者权益保护等相关法规', tags: ['法律法规'], difficulty: 'intermediate' },
      { id: 107, title: '1.7 电商行业发展趋势', duration: '10:00', description: 'AI、直播、社交电商等新兴趋势解读', tags: ['行业趋势'], difficulty: 'intermediate' },
      { id: 108, title: '1.8 章节测验', duration: '20题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 2,
    name: '第二章：国际贸易基础',
    description: '掌握国际贸易基本理论、贸易术语、进出口流程，建立外贸业务知识体系',
    duration: '8课时',
    status: 'published',
    category: 'foundation',
    credit: 4,
    progress: 75,
    completed: 5,
    chapters: [
      { id: 201, title: '2.1 国际贸易概述', duration: '10:00', description: '国际贸易的基本概念与分类', tags: ['贸易基础'], difficulty: 'basic' },
      { id: 202, title: '2.2 国际贸易术语(Incoterms 2020)', duration: '20:00', description: 'FOB、CIF、DDP等11种贸易术语详解', tags: ['贸易术语'], difficulty: 'intermediate' },
      { id: 203, title: '2.3 进出口业务流程', duration: '15:00', description: '从询盘到结汇的完整流程解析', tags: ['业务流程'], difficulty: 'intermediate' },
      { id: 204, title: '2.4 国际结算方式', duration: '12:00', description: '信用证、汇款、托收等结算方式对比', tags: ['结算方式'], difficulty: 'intermediate' },
      { id: 205, title: '2.5 报关报检实务', duration: '15:00', description: '海关申报流程与单证准备', tags: ['报关报检'], difficulty: 'intermediate' },
      { id: 206, title: '2.6 国际物流与运输', duration: '12:00', description: '海运、空运、快递等物流方式选择', tags: ['国际物流'], difficulty: 'basic' },
      { id: 207, title: '2.7 外贸函电写作', duration: '10:00', description: '商务英语邮件写作规范与技巧', tags: ['外贸函电'], difficulty: 'intermediate' },
      { id: 208, title: '2.8 章节测验', duration: '25题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 3,
    name: '第三章：市场调研与选品策略',
    description: '学习市场调研方法论、竞品分析、选品策略，掌握数据驱动的选品决策能力',
    duration: '6课时',
    status: 'published',
    category: 'foundation',
    credit: 3,
    progress: 50,
    completed: 4,
    chapters: [
      { id: 301, title: '3.1 市场调研方法论', duration: '12:00', description: '定性与定量调研方法、调研工具使用', tags: ['市场调研'], difficulty: 'basic' },
      { id: 302, title: '3.2 海外市场分析', duration: '15:00', description: '北美、欧洲、东南亚等主要市场特点', tags: ['市场分析'], difficulty: 'intermediate' },
      { id: 303, title: '3.3 竞品分析实战', duration: '12:00', description: '竞品调研框架与分析工具应用', tags: ['竞品分析'], difficulty: 'intermediate' },
      { id: 304, title: '3.4 选品策略与技巧', duration: '15:00', description: '选品原则、选品工具、爆款特征分析', tags: ['选品策略'], difficulty: 'intermediate' },
      { id: 305, title: '3.5 产品定价策略', duration: '10:00', description: '成本定价、竞争定价、价值定价方法', tags: ['定价策略'], difficulty: 'intermediate' },
      { id: 306, title: '3.6 供应链管理基础', duration: '12:00', description: '供应商选择、采购谈判、库存管理', tags: ['供应链'], difficulty: 'intermediate' },
      { id: 307, title: '3.7 章节测验', duration: '20题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },

  // ==================== 专业核心模块 ====================
  {
    id: 4,
    name: '第四章：独立站平台选择与注册',
    description: '深入了解主流建站平台，掌握 Shopify 店铺注册与基础设置',
    duration: '4课时',
    status: 'published',
    category: 'core',
    credit: 2,
    prerequisites: [1, 2],
    progress: 30,
    completed: 2,
    chapters: [
      { id: 401, title: '4.1 主流建站平台对比', duration: '15:00', description: 'Shopify、WooCommerce、Shoplazza等平台对比', tags: ['平台对比'], difficulty: 'basic' },
      { id: 402, title: '4.2 Shopify 账号注册流程', duration: '10:00', description: '注册步骤、注意事项、账户安全', tags: ['账号注册'], difficulty: 'basic' },
      { id: 403, title: '4.3 店铺基础设置', duration: '12:00', description: '店铺名称、货币、时区、语言等基础配置', tags: ['基础设置'], difficulty: 'basic' },
      { id: 404, title: '4.4 域名绑定与解析', duration: '10:00', description: '域名购买、DNS解析、SSL证书配置', tags: ['域名配置'], difficulty: 'intermediate' },
      { id: 405, title: '4.5 后台界面导航', duration: '8:00', description: 'Shopify后台功能模块介绍', tags: ['后台导航'], difficulty: 'basic' },
      { id: 406, title: '4.6 章节测验', duration: '15题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 5,
    name: '第五章：店铺装修与视觉设计',
    description: '掌握 Shopify 主题选择、页面装修、品牌视觉设计，打造专业独立站',
    duration: '8课时',
    status: 'published',
    category: 'core',
    credit: 4,
    prerequisites: [4],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 501, title: '5.1 主题选择与安装', duration: '12:00', description: '免费主题与付费主题选择、安装与切换', tags: ['主题选择'], difficulty: 'basic' },
      { id: 502, title: '5.2 主题编辑器使用', duration: '15:00', description: '可视化编辑器操作、区块布局调整', tags: ['主题编辑'], difficulty: 'intermediate' },
      { id: 503, title: '5.3 首页设计与布局', duration: '20:00', description: '首页结构规划、Banner设计、产品展示区', tags: ['首页设计'], difficulty: 'intermediate' },
      { id: 504, title: '5.4 产品详情页优化', duration: '18:00', description: '产品图片、描述、评价展示优化', tags: ['详情页优化'], difficulty: 'intermediate' },
      { id: 505, title: '5.5 品牌视觉设计', duration: '15:00', description: 'Logo设计、色彩体系、字体规范', tags: ['品牌设计'], difficulty: 'intermediate' },
      { id: 506, title: '5.6 移动端适配优化', duration: '12:00', description: '响应式设计原理、移动端体验优化', tags: ['移动适配'], difficulty: 'intermediate' },
      { id: 507, title: '5.7 Landing Page设计', duration: '15:00', description: '高转化落地页设计原则与技巧', tags: ['落地页'], difficulty: 'advanced' },
      { id: 508, title: '5.8 章节测验', duration: '20题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 6,
    name: '第六章：产品上架与管理',
    description: '系统学习产品信息管理、分类设置、库存管理，建立完整的产品运营体系',
    duration: '6课时',
    status: 'published',
    category: 'core',
    credit: 3,
    prerequisites: [4],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 601, title: '6.1 产品信息录入', duration: '15:00', description: '产品标题、描述、图片、价格设置', tags: ['产品录入'], difficulty: 'basic' },
      { id: 602, title: '6.2 产品分类与标签', duration: '10:00', description: '分类体系规划、标签使用技巧', tags: ['分类标签'], difficulty: 'basic' },
      { id: 603, title: '6.3 产品变体管理', duration: '12:00', description: 'SKU、规格、库存变体设置', tags: ['变体管理'], difficulty: 'intermediate' },
      { id: 604, title: '6.4 批量导入导出', duration: '10:00', description: 'CSV批量导入、产品数据迁移', tags: ['批量操作'], difficulty: 'intermediate' },
      { id: 605, title: '6.5 库存管理', duration: '12:00', description: '库存设置、库存预警、库存盘点', tags: ['库存管理'], difficulty: 'intermediate' },
      { id: 606, title: '6.6 SEO优化设置', duration: '15:00', description: '产品标题SEO、元描述、URL优化', tags: ['SEO优化'], difficulty: 'intermediate' },
      { id: 607, title: '6.7 章节测验', duration: '18题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 7,
    name: '第七章：支付与物流配置',
    description: '掌握跨境支付网关配置、物流方案设置、税费管理，完善交易闭环',
    duration: '6课时',
    status: 'published',
    category: 'core',
    credit: 3,
    prerequisites: [4],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 701, title: '7.1 跨境支付概述', duration: '10:00', description: '主流跨境支付方式与支付网关介绍', tags: ['跨境支付'], difficulty: 'basic' },
      { id: 702, title: '7.2 PayPal支付配置', duration: '12:00', description: 'PayPal账号绑定、支付设置、费率说明', tags: ['PayPal'], difficulty: 'intermediate' },
      { id: 703, title: '7.3 信用卡支付集成', duration: '15:00', description: 'Stripe、OceanPayment等支付网关配置', tags: ['信用卡'], difficulty: 'intermediate' },
      { id: 704, title: '7.4 物流方案设置', duration: '12:00', description: '运费模板、物流区域、时效设置', tags: ['物流设置'], difficulty: 'intermediate' },
      { id: 705, title: '7.5 第三方物流集成', duration: '10:00', description: '云途、燕文、4PX等物流商对接', tags: ['物流集成'], difficulty: 'intermediate' },
      { id: 706, title: '7.6 税费与关税设置', duration: '12:00', description: '销售税、关税、DDP/DDU设置', tags: ['税费设置'], difficulty: 'advanced' },
      { id: 707, title: '7.7 章节测验', duration: '15题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },

  // ==================== 实践操作模块 ====================
  {
    id: 8,
    name: '第八章：流量推广实战 - 搜索引擎优化',
    description: '系统学习独立站SEO优化策略，掌握 Google 搜索引擎排名技巧',
    duration: '8课时',
    status: 'published',
    category: 'practice',
    credit: 4,
    prerequisites: [5, 6],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 801, title: '8.1 SEO基础原理', duration: '12:00', description: '搜索引擎工作原理、排名因素解析', tags: ['SEO基础'], difficulty: 'basic' },
      { id: 802, title: '8.2 关键词研究', duration: '15:00', description: '关键词挖掘工具、关键词布局策略', tags: ['关键词'], difficulty: 'intermediate' },
      { id: 803, title: '8.3 站内SEO优化', duration: '18:00', description: '标题、描述、H标签、内链优化', tags: ['站内优化'], difficulty: 'intermediate' },
      { id: 804, title: '8.4 技术SEO优化', duration: '15:00', description: '网站速度、结构化数据、移动端优化', tags: ['技术SEO'], difficulty: 'advanced' },
      { id: 805, title: '8.5 内容营销策略', duration: '12:00', description: '博客内容规划、外链建设策略', tags: ['内容营销'], difficulty: 'intermediate' },
      { id: 806, title: '8.6 Google Search Console', duration: '10:00', description: 'GSC工具使用、索引监控、问题排查', tags: ['GSC工具'], difficulty: 'intermediate' },
      { id: 807, title: '8.7 SEO效果监测', duration: '10:00', description: '排名监控、流量分析、ROI计算', tags: ['效果监测'], difficulty: 'intermediate' },
      { id: 808, title: '8.8 章节测验', duration: '20题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 9,
    name: '第九章：流量推广实战 - 广告投放',
    description: '掌握 Google Ads、Facebook Ads 等主流广告平台投放技巧',
    duration: '10课时',
    status: 'published',
    category: 'practice',
    credit: 5,
    prerequisites: [8],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 901, title: '9.1 数字广告概述', duration: '10:00', description: '广告类型、计费模式、投放策略基础', tags: ['广告基础'], difficulty: 'basic' },
      { id: 902, title: '9.2 Google Ads 账户搭建', duration: '15:00', description: '账户结构、广告系列、广告组设置', tags: ['Google Ads'], difficulty: 'intermediate' },
      { id: 903, title: '9.3 Google Shopping 广告', duration: '18:00', description: '商品Feed配置、购物广告优化', tags: ['Shopping'], difficulty: 'intermediate' },
      { id: 904, title: '9.4 Google 搜索广告优化', duration: '15:00', description: '关键词匹配、出价策略、质量得分', tags: ['搜索广告'], difficulty: 'intermediate' },
      { id: 905, title: '9.5 Facebook 广告入门', duration: '12:00', description: 'Meta商务套件、广告账户设置', tags: ['Facebook'], difficulty: 'intermediate' },
      { id: 906, title: '9.6 Facebook 受众定位', duration: '15:00', description: '兴趣定位、相似受众、再营销策略', tags: ['受众定位'], difficulty: 'intermediate' },
      { id: 907, title: '9.7 广告创意与素材', duration: '12:00', description: '广告图片、视频、文案创作技巧', tags: ['广告创意'], difficulty: 'intermediate' },
      { id: 908, title: '9.8 广告数据分析', duration: '15:00', description: 'ROAS计算、转化追踪、优化策略', tags: ['数据分析'], difficulty: 'advanced' },
      { id: 909, title: '9.9 章节测验', duration: '25题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 10,
    name: '第十章：流量推广实战 - 社交媒体营销',
    description: '掌握海外主流社交媒体运营技巧，建立社媒营销矩阵',
    duration: '8课时',
    status: 'published',
    category: 'practice',
    credit: 4,
    prerequisites: [8],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 1001, title: '10.1 社交媒体营销概述', duration: '10:00', description: '海外社媒平台特点与选择策略', tags: ['社媒概述'], difficulty: 'basic' },
      { id: 1002, title: '10.2 Instagram 运营', duration: '15:00', description: '账号设置、内容策略、Stories与Reels', tags: ['Instagram'], difficulty: 'intermediate' },
      { id: 1003, title: '10.3 TikTok 营销', duration: '15:00', description: '短视频创作、TikTok Shop、达人合作', tags: ['TikTok'], difficulty: 'intermediate' },
      { id: 1004, title: '10.4 Facebook 社群运营', duration: '12:00', description: 'Facebook Page、Group运营策略', tags: ['Facebook'], difficulty: 'intermediate' },
      { id: 1005, title: '10.5 Pinterest 营销', duration: '12:00', description: 'Pin图制作、Board规划、流量引导', tags: ['Pinterest'], difficulty: 'intermediate' },
      { id: 1006, title: '10.6 YouTube 视频营销', duration: '15:00', description: '频道运营、视频SEO、变现策略', tags: ['YouTube'], difficulty: 'intermediate' },
      { id: 1007, title: '10.7 红人营销合作', duration: '12:00', description: 'KOL筛选、合作谈判、效果评估', tags: ['红人营销'], difficulty: 'advanced' },
      { id: 1008, title: '10.8 章节测验', duration: '20题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 11,
    name: '第十一章：运营与客户服务',
    description: '学习订单管理、客户服务、复购运营，提升店铺转化与留存',
    duration: '6课时',
    status: 'published',
    category: 'practice',
    credit: 3,
    prerequisites: [6, 7],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 1101, title: '11.1 订单处理流程', duration: '12:00', description: '订单确认、发货、退款流程管理', tags: ['订单管理'], difficulty: 'basic' },
      { id: 1102, title: '11.2 客户服务技巧', duration: '15:00', description: '售前咨询、售后处理、纠纷解决', tags: ['客户服务'], difficulty: 'intermediate' },
      { id: 1103, title: '11.3 邮件营销EDM', duration: '15:00', description: '邮件列表建设、自动化邮件、营销活动', tags: ['EDM'], difficulty: 'intermediate' },
      { id: 1104, title: '11.4 弃购挽回策略', duration: '12:00', description: '购物车挽回邮件、优惠券策略', tags: ['弃购挽回'], difficulty: 'intermediate' },
      { id: 1105, title: '11.5 会员体系设计', duration: '10:00', description: '会员等级、积分系统、忠诚度计划', tags: ['会员体系'], difficulty: 'intermediate' },
      { id: 1106, title: '11.6 复购率提升', duration: '10:00', description: '复购分析、复购激励、私域运营', tags: ['复购运营'], difficulty: 'intermediate' },
      { id: 1107, title: '11.7 章节测验', duration: '18题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },

  // ==================== 拓展提升模块 ====================
  {
    id: 12,
    name: '第十二章：数据分析与优化',
    description: '掌握数据分析工具与方法，用数据驱动店铺运营决策',
    duration: '8课时',
    status: 'published',
    category: 'extension',
    credit: 4,
    prerequisites: [8, 9],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 1201, title: '12.1 数据分析思维', duration: '10:00', description: '数据指标体系、分析框架搭建', tags: ['分析思维'], difficulty: 'basic' },
      { id: 1202, title: '12.2 Google Analytics 4', duration: '20:00', description: 'GA4配置、事件追踪、转化设置', tags: ['GA4'], difficulty: 'intermediate' },
      { id: 1203, title: '12.3 Shopify Analytics', duration: '15:00', description: '后台数据解读、销售分析、客户分析', tags: ['Shopify分析'], difficulty: 'intermediate' },
      { id: 1204, title: '12.4 转化漏斗分析', duration: '15:00', description: '漏斗构建、流失分析、优化策略', tags: ['漏斗分析'], difficulty: 'intermediate' },
      { id: 1205, title: '12.5 A/B测试方法', duration: '12:00', description: '测试设计、样本计算、结果解读', tags: ['A/B测试'], difficulty: 'advanced' },
      { id: 1206, title: '12.6 用户行为分析', duration: '12:00', description: '热力图、录屏分析、用户旅程', tags: ['行为分析'], difficulty: 'intermediate' },
      { id: 1207, title: '12.7 ROI计算与优化', duration: '10:00', description: '广告ROI、LTV、CAC计算分析', tags: ['ROI分析'], difficulty: 'advanced' },
      { id: 1208, title: '12.8 章节测验', duration: '20题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 13,
    name: '第十三章：合规风控与政策',
    description: '了解跨境电商合规要求，掌握风险防控策略，规避运营风险',
    duration: '4课时',
    status: 'published',
    category: 'extension',
    credit: 2,
    progress: 0,
    completed: 0,
    chapters: [
      { id: 1301, title: '13.1 GDPR合规要求', duration: '12:00', description: '欧盟数据保护法规、合规措施', tags: ['GDPR'], difficulty: 'intermediate' },
      { id: 1302, title: '13.2 隐私政策制定', duration: '10:00', description: '隐私政策内容要求、模板参考', tags: ['隐私政策'], difficulty: 'basic' },
      { id: 1303, title: '13.3 知识产权保护', duration: '12:00', description: '商标、专利、版权侵权规避', tags: ['知识产权'], difficulty: 'intermediate' },
      { id: 1304, title: '13.4 支付风控', duration: '10:00', description: '欺诈防范、拒付处理、账户安全', tags: ['支付风控'], difficulty: 'intermediate' },
      { id: 1305, title: '13.5 平台政策合规', duration: '10:00', description: 'Shopify政策、支付平台规则、封号风险', tags: ['平台政策'], difficulty: 'intermediate' },
      { id: 1306, title: '13.6 章节测验', duration: '15题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },
  {
    id: 14,
    name: '第十四章：品牌建设与长期运营',
    description: '学习品牌定位、品牌传播、长期运营策略，打造可持续发展的独立站',
    duration: '6课时',
    status: 'published',
    category: 'extension',
    credit: 3,
    prerequisites: [12],
    progress: 0,
    completed: 0,
    chapters: [
      { id: 1401, title: '14.1 品牌定位策略', duration: '12:00', description: '品牌定位方法、差异化竞争策略', tags: ['品牌定位'], difficulty: 'intermediate' },
      { id: 1402, title: '14.2 品牌故事与传播', duration: '15:00', description: '品牌故事撰写、内容传播策略', tags: ['品牌传播'], difficulty: 'intermediate' },
      { id: 1403, title: '14.3 多渠道布局', duration: '12:00', description: '多平台分销、全渠道运营策略', tags: ['多渠道'], difficulty: 'advanced' },
      { id: 1404, title: '14.4 本地化运营', duration: '10:00', description: '多语言、多币种、本地化服务', tags: ['本地化'], difficulty: 'intermediate' },
      { id: 1405, title: '14.5 团队搭建与管理', duration: '12:00', description: '团队配置、岗位分工、绩效考核', tags: ['团队管理'], difficulty: 'advanced' },
      { id: 1406, title: '14.6 行业案例分析', duration: '15:00', description: '成功独立站案例解析与启示', tags: ['案例分析'], difficulty: 'intermediate' },
      { id: 1407, title: '14.7 章节测验', duration: '15题', description: '检验本章学习成果', tags: ['测验'], difficulty: 'basic' },
    ],
  },

  // ==================== 考证培训模块 ====================
  {
    id: 15,
    name: '第十五章：跨境电商职业技能认证',
    description: '跨境电商行业认证考试辅导，助力学生获取职业资格证书',
    duration: '4课时',
    status: 'published',
    category: 'certification',
    credit: 2,
    progress: 0,
    completed: 0,
    chapters: [
      { id: 1501, title: '15.1 跨境电商证书体系', duration: '10:00', description: '主流证书介绍、证书价值分析', tags: ['证书体系'], difficulty: 'basic' },
      { id: 1502, title: '15.2 跨境电商运营师认证', duration: '15:00', description: '考试大纲、重点知识点梳理', tags: ['运营师'], difficulty: 'intermediate' },
      { id: 1503, title: '15.3 Google Ads认证', duration: '12:00', description: '认证考试流程、备考技巧', tags: ['Google Ads'], difficulty: 'intermediate' },
      { id: 1504, title: '15.4 Meta Blueprint认证', duration: '12:00', description: 'Facebook认证考试内容与技巧', tags: ['Meta'], difficulty: 'intermediate' },
      { id: 1505, title: '15.5 模拟考试训练', duration: '20:00', description: '真题模拟、考点强化训练', tags: ['模拟考试'], difficulty: 'intermediate' },
      { id: 1506, title: '15.6 章节测验', duration: '30题', description: '综合能力测试', tags: ['测验'], difficulty: 'basic' },
    ],
  },
];

// 获取已发布的课程（学生端使用）
export function getPublishedCourses(): Course[] {
  return courses.filter(course => course.status === 'published');
}

// 获取所有课程（教师端使用）
export function getAllCourses(): Course[] {
  return courses;
}

// 根据 ID 获取课程
export function getCourseById(id: number): Course | undefined {
  return courses.find(course => course.id === id);
}

// 根据分类获取课程
export function getCoursesByCategory(category: CourseCategory): Course[] {
  return courses.filter(course => course.category === category);
}

// 获取课程模块（含课程列表）
export function getCourseModules(): CourseModule[] {
  return courseModules.map(module => ({
    ...module,
    courses: courses.filter(course => course.category === module.category),
  }));
}

// 计算总学分
export function getTotalCredits(): number {
  return courses.reduce((sum, course) => sum + (course.credit || 0), 0);
}

// 计算总课时
export function getTotalHours(): string {
  const total = courses.reduce((sum, course) => {
    const hours = parseInt(course.duration.replace('课时', '')) || 0;
    return sum + hours;
  }, 0);
  return `${total}课时`;
}
