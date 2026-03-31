// 共享课程数据 - 教师端管理，学生端展示

export interface Chapter {
  id: number;
  title: string;
  duration: string;
  videoKey?: string;
  documentKeys?: string[];
  description?: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  chapters: Chapter[];
  duration: string;
  status: 'published' | 'draft';
  progress?: number; // 学生端使用：学习进度
  completed?: number; // 学生端使用：已完成章节数
}

// 课程数据（模拟数据库）
export const courses: Course[] = [
  {
    id: 1,
    name: '第一章：独立站认知与市场调研',
    description: '了解独立站基本概念，学习市场调研方法和选品策略，掌握竞品分析技能',
    duration: '45分钟',
    status: 'published',
    progress: 100,
    completed: 6,
    chapters: [
      { id: 101, title: '1.1 什么是独立站', duration: '8:20', description: '了解独立站的基本概念和特点' },
      { id: 102, title: '1.2 独立站 vs 平台店铺', duration: '7:15', description: '对比独立站与传统电商平台的优劣势' },
      { id: 103, title: '1.3 市场调研方法论', duration: '10:30', description: '学习科学的市场调研方法和工具' },
      { id: 104, title: '1.4 竞品分析实战', duration: '9:45', description: '掌握竞品分析的核心技巧' },
      { id: 105, title: '1.5 选品策略与技巧', duration: '12:00', description: '学习选品的核心策略和方法' },
      { id: 106, title: '1.6 章节测验', duration: '10题', description: '检验本章学习成果' },
    ],
  },
  {
    id: 2,
    name: '第二章：独立站搭建基础',
    description: '从零开始搭建独立站，掌握 Shopify 店铺装修技巧，配置支付和物流',
    duration: '60分钟',
    status: 'published',
    progress: 62,
    completed: 5,
    chapters: [
      { id: 201, title: '2.1 Shopify 账号注册', duration: '5:30', description: '完成 Shopify 账号注册流程' },
      { id: 202, title: '2.2 店铺基础设置', duration: '8:15', description: '配置店铺的基本信息和设置' },
      { id: 203, title: '2.3 主题选择与安装', duration: '7:20', description: '选择并安装适合的主题模板' },
      { id: 204, title: '2.4 页面装修技巧', duration: '12:00', description: '学习页面装修的核心技巧' },
      { id: 205, title: '2.5 商品上架流程', duration: '10:30', description: '完成商品的添加和管理' },
      { id: 206, title: '2.6 支付与物流配置', duration: '9:00', description: '配置支付网关和物流方案' },
      { id: 207, title: '2.7 域名绑定设置', duration: '6:45', description: '绑定自定义域名' },
      { id: 208, title: '2.8 章节测验', duration: '15题', description: '检验本章学习成果' },
    ],
  },
  {
    id: 3,
    name: '第三章：流量推广策略',
    description: '学习多渠道流量获取方法，掌握 SEO 和广告投放技巧',
    duration: '75分钟',
    status: 'published',
    progress: 0,
    completed: 0,
    chapters: [
      { id: 301, title: '3.1 流量渠道概览', duration: '6:00', description: '了解主流流量渠道及其特点' },
      { id: 302, title: '3.2 Google SEO 优化', duration: '15:00', description: '掌握 Google 搜索引擎优化技巧' },
      { id: 303, title: '3.3 Google Ads 投放', duration: '12:00', description: '学习 Google 广告投放策略' },
      { id: 304, title: '3.4 Facebook 广告入门', duration: '10:00', description: '掌握 Facebook 广告投放基础' },
      { id: 305, title: '3.5 TikTok 营销策略', duration: '8:30', description: '学习 TikTok 平台营销技巧' },
      { id: 306, title: '3.6 Instagram 推广技巧', duration: '7:00', description: '掌握 Instagram 营销方法' },
      { id: 307, title: '3.7 红人营销合作', duration: '9:00', description: '学习网红营销的合作方式' },
      { id: 308, title: '3.8 邮件营销 EDM', duration: '6:30', description: '掌握邮件营销的核心技巧' },
      { id: 309, title: '3.9 联盟营销入门', duration: '5:30', description: '了解联盟营销的基本概念' },
      { id: 310, title: '3.10 章节测验', duration: '20题', description: '检验本章学习成果' },
    ],
  },
  {
    id: 4,
    name: '第四章：转化运营技巧',
    description: '提升店铺转化率，掌握客户运营和复购策略',
    duration: '50分钟',
    status: 'published',
    progress: 0,
    completed: 0,
    chapters: [
      { id: 401, title: '4.1 转化率优化基础', duration: '8:00', description: '理解转化率优化的核心概念' },
      { id: 402, title: '4.2 弃购挽回策略', duration: '10:00', description: '学习弃购挽回的有效方法' },
      { id: 403, title: '4.3 客服与售后', duration: '12:00', description: '提升客服质量的方法' },
      { id: 404, title: '4.4 会员体系建设', duration: '8:00', description: '搭建会员体系和积分系统' },
      { id: 405, title: '4.5 复购率提升', duration: '7:00', description: '提高复购率的实用技巧' },
      { id: 406, title: '4.6 章节测验', duration: '15题', description: '检验本章学习成果' },
    ],
  },
  {
    id: 5,
    name: '第五章：数据分析与优化',
    description: '学会看懂数据，用数据驱动决策优化',
    duration: '55分钟',
    status: 'published',
    progress: 0,
    completed: 0,
    chapters: [
      { id: 501, title: '5.1 数据指标解读', duration: '10:00', description: '理解核心数据指标的含义' },
      { id: 502, title: '5.2 Google Analytics', duration: '12:00', description: '使用 GA 进行数据分析' },
      { id: 503, title: '5.3 转化漏斗分析', duration: '10:00', description: '构建和分析转化漏斗' },
      { id: 504, title: '5.4 A/B 测试方法', duration: '8:00', description: '进行科学的 A/B 测试' },
      { id: 505, title: '5.5 数据驱动决策', duration: '10:00', description: '用数据指导运营决策' },
      { id: 506, title: '5.6 章节测验', duration: '15题', description: '检验本章学习成果' },
    ],
  },
  {
    id: 6,
    name: '第六章：合规风控与政策',
    description: '了解跨境电商合规要求，规避运营风险',
    duration: '35分钟',
    status: 'published',
    progress: 0,
    completed: 0,
    chapters: [
      { id: 601, title: '6.1 GDPR 合规要求', duration: '8:00', description: '了解 GDPR 数据保护法规' },
      { id: 602, title: '6.2 隐私政策制定', duration: '6:00', description: '制定符合要求的隐私政策' },
      { id: 603, title: '6.3 知识产权保护', duration: '7:00', description: '避免侵权和品牌保护' },
      { id: 604, title: '6.4 风险场景应对', duration: '8:00', description: '应对常见运营风险' },
      { id: 605, title: '6.5 章节测验', duration: '10题', description: '检验本章学习成果' },
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
