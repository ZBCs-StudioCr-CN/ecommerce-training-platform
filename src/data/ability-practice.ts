// 五维能力实训阶段配置
// 每个阶段对应一个或多个具体能力的培养和评估

// ==================== 五维能力定义 ====================

export type AbilityDimension = 
  | 'decision'     // 自主决策能力
  | 'ai'           // AI辅助应用
  | 'analysis'     // 数据复盘与优化
  | 'risk'         // 风险应对
  | 'compliance';  // 合规与规则意识

export interface AbilityConfig {
  id: AbilityDimension;
  name: string;
  weight: number;
  color: string;
  icon: string;
  subAbilities: SubAbilityConfig[];
}

export interface SubAbilityConfig {
  id: string;
  name: string;
  description: string;
  evaluationType: 'practice' | 'exam' | 'system';
  evaluationSource: string;
  weight: number;
}

// 五维能力配置
export const FIVE_DIMENSIONS: AbilityConfig[] = [
  {
    id: 'decision',
    name: '自主决策能力',
    weight: 35,
    color: '#3b82f6',
    icon: 'Target',
    subAbilities: [
      {
        id: 'market_analysis',
        name: '市场分析决策',
        description: '市场趋势判断、竞争分析',
        evaluationType: 'practice',
        evaluationSource: '市场调研报告',
        weight: 100,
      },
      {
        id: 'product_selection',
        name: '选品决策',
        description: '产品选择、利润空间评估',
        evaluationType: 'practice',
        evaluationSource: '选品方案制定',
        weight: 100,
      },
      {
        id: 'pricing_strategy',
        name: '定价策略',
        description: '价格制定、促销策略',
        evaluationType: 'practice',
        evaluationSource: '定价方案设计',
        weight: 100,
      },
      {
        id: 'channel_selection',
        name: '渠道选择',
        description: '销售渠道布局、资源配置',
        evaluationType: 'practice',
        evaluationSource: '渠道布局实训',
        weight: 100,
      },
      {
        id: 'logistics_supply',
        name: '物流供应链管理',
        description: '物流选择、供应链优化、成本控制',
        evaluationType: 'practice',
        evaluationSource: '物流配置实训',
        weight: 100,
      },
      {
        id: 'marketing_decision',
        name: '营销与活动决策',
        description: '营销策略制定、活动策划执行',
        evaluationType: 'practice',
        evaluationSource: '营销活动策划',
        weight: 100,
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI辅助应用',
    weight: 20,
    color: '#8b5cf6',
    icon: 'Brain',
    subAbilities: [
      {
        id: 'ai_tool_selection',
        name: 'AI工具选择',
        description: 'AI工具识别与选择',
        evaluationType: 'exam',
        evaluationSource: 'AI工具知识测试',
        weight: 100,
      },
      {
        id: 'content_review',
        name: '内容审核能力',
        description: 'AI生成内容审核与优化',
        evaluationType: 'practice',
        evaluationSource: 'AI内容审核实训',
        weight: 100,
      },
      {
        id: 'efficiency_optimization',
        name: '效率优化',
        description: 'AI辅助提升工作效率',
        evaluationType: 'practice',
        evaluationSource: '效率优化实训',
        weight: 100,
      },
      {
        id: 'ai_coupling_control',
        name: 'AI耦合度控制',
        description: '避免过度依赖AI',
        evaluationType: 'system',
        evaluationSource: 'AI使用行为分析',
        weight: 100,
      },
      {
        id: 'ai_visual_design',
        name: 'AI视觉策划设计',
        description: 'AI辅助图片设计、视频制作、视觉优化',
        evaluationType: 'practice',
        evaluationSource: '视觉设计实训',
        weight: 100,
      },
      {
        id: 'ai_copywriting',
        name: 'AI文案创意撰写',
        description: 'AI辅助文案创作、内容优化、创意生成',
        evaluationType: 'practice',
        evaluationSource: '文案撰写实训',
        weight: 100,
      },
    ],
  },
  {
    id: 'analysis',
    name: '数据复盘与优化',
    weight: 20,
    color: '#22c55e',
    icon: 'TrendingUp',
    subAbilities: [
      {
        id: 'data_collection',
        name: '数据采集',
        description: '关键数据识别与收集',
        evaluationType: 'practice',
        evaluationSource: '数据采集实训',
        weight: 100,
      },
      {
        id: 'data_analysis',
        name: '数据分析',
        description: '数据趋势分析与洞察',
        evaluationType: 'practice',
        evaluationSource: '数据分析报告',
        weight: 100,
      },
      {
        id: 'problem_diagnosis',
        name: '问题诊断',
        description: '问题定位与根因分析',
        evaluationType: 'practice',
        evaluationSource: '问题诊断实训',
        weight: 100,
      },
      {
        id: 'optimization_iteration',
        name: '优化迭代',
        description: '基于数据的优化策略',
        evaluationType: 'practice',
        evaluationSource: '优化方案设计',
        weight: 100,
      },
    ],
  },
  {
    id: 'risk',
    name: '风险应对',
    weight: 15,
    color: '#f59e0b',
    icon: 'AlertTriangle',
    subAbilities: [
      {
        id: 'risk_identification',
        name: '风险识别',
        description: '潜在风险预判',
        evaluationType: 'exam',
        evaluationSource: '风险识别测试',
        weight: 100,
      },
      {
        id: 'response_planning',
        name: '应对方案制定',
        description: '危机处理方案设计',
        evaluationType: 'practice',
        evaluationSource: '风险应对实训',
        weight: 100,
      },
      {
        id: 'customer_complaint',
        name: '客户投诉处理',
        description: '投诉响应与解决',
        evaluationType: 'practice',
        evaluationSource: '投诉处理实训',
        weight: 100,
      },
      {
        id: 'public_opinion',
        name: '舆情管理',
        description: '负面舆情应对',
        evaluationType: 'practice',
        evaluationSource: '舆情处理实训',
        weight: 100,
      },
    ],
  },
  {
    id: 'compliance',
    name: '合规与规则意识',
    weight: 10,
    color: '#ef4444',
    icon: 'Shield',
    subAbilities: [
      {
        id: 'platform_rules',
        name: '平台规则理解',
        description: '电商平台规则掌握',
        evaluationType: 'exam',
        evaluationSource: '平台规则测试',
        weight: 100,
      },
      {
        id: 'legal_awareness',
        name: '法律法规意识',
        description: '广告法、消费者权益保护',
        evaluationType: 'exam',
        evaluationSource: '法律法规测试',
        weight: 100,
      },
      {
        id: 'ip_protection',
        name: '知识产权保护',
        description: '商标、专利、版权',
        evaluationType: 'exam',
        evaluationSource: '知识产权测试',
        weight: 100,
      },
      {
        id: 'data_compliance',
        name: '数据合规',
        description: '用户数据保护与合规',
        evaluationType: 'exam',
        evaluationSource: '数据合规测试',
        weight: 100,
      },
    ],
  },
];

// ==================== 实训阶段定义（基于五维能力） ====================

export type PracticeStage = 
  | 'market_research'    // 阶段一：市场调研与选品（自主决策能力）
  | 'store_setup'        // 阶段二：渠道布局与店铺搭建（自主决策能力 + AI辅助应用）
  | 'product_listing'    // 阶段三：产品上架与优化（自主决策能力 + AI辅助应用）
  | 'logistics_config'   // 阶段四：物流配置（自主决策能力）
  | 'marketing_promotion' // 阶段五：营销推广（自主决策能力）
  | 'risk_management'    // 阶段六：风险应对实训（风险应对）
  | 'data_analysis'      // 阶段七：数据分析与优化（数据复盘与优化）
  | 'compliance_training' // 阶段八：合规培训与测试（合规与规则意识）
  | 'final_assessment';  // 阶段九：综合考核

export interface StageConfig {
  id: PracticeStage;
  name: string;
  description: string;
  order: number;
  duration: string;
  // 关联的五维能力和具体能力
  abilities: {
    dimension: AbilityDimension;
    subAbilities: string[]; // 具体能力ID列表
  }[];
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
  // 关联的具体能力
  relatedAbility: {
    dimension: AbilityDimension;
    subAbility: string;
  };
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

// ==================== 实训阶段配置 ====================

export const PRACTICE_STAGES: StageConfig[] = [
  {
    id: 'market_research',
    name: '阶段一：市场调研与选品',
    description: '培养市场分析决策和选品决策能力，学会定价策略制定',
    order: 1,
    duration: '4课时',
    abilities: [
      {
        dimension: 'decision',
        subAbilities: ['market_analysis', 'product_selection', 'pricing_strategy'],
      },
    ],
    tasks: [
      {
        id: 'mr_01',
        stageId: 'market_research',
        name: '市场分析报告',
        description: '选择一个目标市场，分析市场规模、消费习惯、竞争格局，完成市场调研报告',
        type: 'report',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '90分钟',
        relatedAbility: {
          dimension: 'decision',
          subAbility: 'market_analysis',
        },
        requirements: [
          { type: 'field_value', field: 'report.market', operator: 'not_empty', value: null, description: '选择目标市场' },
          { type: 'field_value', field: 'report.marketSize', operator: 'not_empty', value: null, description: '分析市场规模' },
          { type: 'item_count', field: 'report.competitors', operator: 'greater_than', value: 2, description: '分析至少3个竞品' },
        ],
        hints: ['使用 Google Trends 分析关键词趋势', '参考 Statista 获取市场数据'],
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
        description: '基于市场分析，设计产品选品方案，包括产品定位、利润分析',
        type: 'report',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '60分钟',
        relatedAbility: {
          dimension: 'decision',
          subAbility: 'product_selection',
        },
        requirements: [
          { type: 'item_count', field: 'products', operator: 'greater_than', value: 4, description: '选择5-10款产品' },
          { type: 'field_value', field: 'profitMargin', operator: 'greater_than', value: 20, description: '利润率不低于20%' },
        ],
        hints: ['考虑目标市场的价格敏感度', '关注产品利润空间'],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '选品合理性', maxScore: 5, weight: 0.35, description: '产品符合市场需求' },
            { name: '利润分析', maxScore: 5, weight: 0.35, description: '利润率合理' },
            { name: '差异化分析', maxScore: 5, weight: 0.30, description: '差异化定位清晰' },
          ],
          teacherReview: true,
        },
      },
      {
        id: 'mr_03',
        stageId: 'market_research',
        name: '定价策略制定',
        description: '为选定的产品制定定价策略，包括定价方法、促销策略',
        type: 'report',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '45分钟',
        relatedAbility: {
          dimension: 'decision',
          subAbility: 'pricing_strategy',
        },
        requirements: [
          { type: 'field_value', field: 'pricingMethod', operator: 'not_empty', value: null, description: '选择定价方法' },
          { type: 'field_value', field: 'promotionStrategy', operator: 'not_empty', value: null, description: '制定促销策略' },
        ],
        hints: ['分析竞品定价区间', '考虑成本和利润目标'],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '定价合理性', maxScore: 5, weight: 0.40, description: '定价有竞争力且利润合理' },
            { name: '策略可行性', maxScore: 5, weight: 0.40, description: '促销策略可执行' },
            { name: '分析依据', maxScore: 5, weight: 0.20, description: '有数据支撑' },
          ],
          teacherReview: true,
        },
      },
    ],
    rewards: { exp: 100, badge: '市场分析师' },
  },
  {
    id: 'store_setup',
    name: '阶段二：渠道布局与店铺搭建',
    description: '培养渠道选择能力，学会使用AI辅助视觉设计',
    order: 2,
    duration: '6课时',
    abilities: [
      {
        dimension: 'decision',
        subAbilities: ['channel_selection'],
      },
      {
        dimension: 'ai',
        subAbilities: ['ai_visual_design'],
      },
    ],
    tasks: [
      {
        id: 'ss_01',
        stageId: 'store_setup',
        name: '渠道选择决策',
        description: '分析不同电商渠道的优劣，制定渠道布局方案',
        type: 'report',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '60分钟',
        relatedAbility: {
          dimension: 'decision',
          subAbility: 'channel_selection',
        },
        requirements: [
          { type: 'item_count', field: 'channels', operator: 'greater_than', value: 1, description: '分析至少2个渠道' },
          { type: 'field_value', field: 'channelDecision', operator: 'not_empty', value: null, description: '做出渠道选择决策' },
        ],
        hints: ['比较各渠道的流量成本', '考虑产品与渠道的匹配度'],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '分析全面性', maxScore: 5, weight: 0.35, description: '多维度分析渠道优劣' },
            { name: '决策合理性', maxScore: 5, weight: 0.40, description: '决策有理有据' },
            { name: '资源配置', maxScore: 5, weight: 0.25, description: '资源分配合理' },
          ],
          teacherReview: true,
        },
      },
      {
        id: 'ss_02',
        stageId: 'store_setup',
        name: '店铺搭建与视觉设计',
        description: '使用AI工具辅助完成店铺主题配置、页面设计',
        type: 'operation',
        difficulty: 'medium',
        points: 25,
        estimatedTime: '120分钟',
        relatedAbility: {
          dimension: 'ai',
          subAbility: 'ai_visual_design',
        },
        requirements: [
          { type: 'field_value', field: 'theme.id', operator: 'not_empty', value: null, description: '选择并应用主题' },
          { type: 'item_count', field: 'theme.sections', operator: 'greater_than', value: 3, description: '首页至少4个板块' },
          { type: 'score_threshold', field: 'designScore', operator: 'greater_than', value: 60, description: '设计评分≥60分' },
        ],
        hints: ['使用AI工具生成Banner图', 'AI辅助选择配色方案'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '视觉美观度', maxScore: 5, weight: 0.30, description: '整体视觉效果' },
            { name: '品牌一致性', maxScore: 5, weight: 0.25, description: '设计与品牌定位一致' },
            { name: '用户体验', maxScore: 5, weight: 0.25, description: '导航清晰，布局合理' },
            { name: 'AI工具使用', maxScore: 5, weight: 0.20, description: '合理使用AI辅助设计' },
          ],
        },
      },
    ],
    prerequisites: ['market_research'],
    rewards: { exp: 120, badge: '渠道规划师' },
  },
  {
    id: 'product_listing',
    name: '阶段三：产品上架与优化',
    description: '培养AI文案创意撰写能力，学会内容审核',
    order: 3,
    duration: '6课时',
    abilities: [
      {
        dimension: 'ai',
        subAbilities: ['ai_copywriting', 'content_review'],
      },
    ],
    tasks: [
      {
        id: 'pl_01',
        stageId: 'product_listing',
        name: 'AI辅助文案撰写',
        description: '使用AI工具辅助撰写产品标题、描述、卖点',
        type: 'operation',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '90分钟',
        relatedAbility: {
          dimension: 'ai',
          subAbility: 'ai_copywriting',
        },
        requirements: [
          { type: 'item_count', field: 'products', operator: 'greater_than', value: 9, description: '至少上架10款产品' },
          { type: 'field_value', field: 'products.description', operator: 'not_empty', value: null, description: '每个产品都有描述' },
        ],
        hints: ['使用AI生成文案初稿', '结合产品特点进行优化'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '文案吸引力', maxScore: 5, weight: 0.30, description: '文案有吸引力' },
            { name: '信息完整性', maxScore: 5, weight: 0.25, description: '产品信息完整' },
            { name: 'AI辅助程度', maxScore: 5, weight: 0.25, description: '合理使用AI且不过度依赖' },
            { name: '原创性', maxScore: 5, weight: 0.20, description: '有个性化修改' },
          ],
        },
      },
      {
        id: 'pl_02',
        stageId: 'product_listing',
        name: 'AI内容审核与优化',
        description: '审核AI生成的内容，检查合规性，进行优化',
        type: 'operation',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '45分钟',
        relatedAbility: {
          dimension: 'ai',
          subAbility: 'content_review',
        },
        requirements: [
          { type: 'field_value', field: 'contentReviewed', operator: 'equals', value: true, description: '内容已审核' },
          { type: 'score_threshold', field: 'complianceScore', operator: 'greater_than', value: 80, description: '合规评分≥80分' },
        ],
        hints: ['检查是否有违禁词', '确保信息真实准确'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '审核准确性', maxScore: 5, weight: 0.40, description: '识别问题准确' },
            { name: '优化效果', maxScore: 5, weight: 0.40, description: '优化后内容质量提升' },
            { name: '合规性', maxScore: 5, weight: 0.20, description: '符合平台规则' },
          ],
        },
      },
    ],
    prerequisites: ['store_setup'],
    rewards: { exp: 120, badge: '内容运营官' },
  },
  {
    id: 'logistics_config',
    name: '阶段四：物流配置',
    description: '培养物流供应链管理能力，优化物流成本',
    order: 4,
    duration: '4课时',
    abilities: [
      {
        dimension: 'decision',
        subAbilities: ['logistics_supply'],
      },
    ],
    tasks: [
      {
        id: 'lc_01',
        stageId: 'logistics_config',
        name: '物流方案设计',
        description: '选择物流服务商，设计物流方案，优化物流成本',
        type: 'report',
        difficulty: 'medium',
        points: 20,
        estimatedTime: '60分钟',
        relatedAbility: {
          dimension: 'decision',
          subAbility: 'logistics_supply',
        },
        requirements: [
          { type: 'item_count', field: 'shippingMethods', operator: 'greater_than', value: 1, description: '配置至少2种物流方式' },
          { type: 'field_value', field: 'costOptimized', operator: 'equals', value: true, description: '完成成本优化' },
        ],
        hints: ['比较不同物流商的费率', '考虑时效和成本平衡'],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '方案合理性', maxScore: 5, weight: 0.35, description: '物流方案可行' },
            { name: '成本优化', maxScore: 5, weight: 0.35, description: '有效控制物流成本' },
            { name: '时效保障', maxScore: 5, weight: 0.30, description: '时效满足客户需求' },
          ],
          teacherReview: true,
        },
      },
    ],
    prerequisites: ['product_listing'],
    rewards: { exp: 80, badge: '供应链管理员' },
  },
  {
    id: 'marketing_promotion',
    name: '阶段五：营销推广',
    description: '培养营销与活动决策能力，制定推广策略',
    order: 5,
    duration: '6课时',
    abilities: [
      {
        dimension: 'decision',
        subAbilities: ['marketing_decision'],
      },
    ],
    tasks: [
      {
        id: 'mp_01',
        stageId: 'marketing_promotion',
        name: '营销活动策划',
        description: '策划一场营销活动，包括活动目标、预算、执行方案',
        type: 'report',
        difficulty: 'hard',
        points: 25,
        estimatedTime: '90分钟',
        relatedAbility: {
          dimension: 'decision',
          subAbility: 'marketing_decision',
        },
        requirements: [
          { type: 'field_value', field: 'campaignGoal', operator: 'not_empty', value: null, description: '设定活动目标' },
          { type: 'field_value', field: 'budget', operator: 'greater_than', value: 0, description: '制定预算' },
          { type: 'field_value', field: 'executionPlan', operator: 'not_empty', value: null, description: '制定执行方案' },
        ],
        hints: ['设定可量化的目标', '预算分配要合理'],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '目标合理性', maxScore: 5, weight: 0.25, description: '目标清晰可达成' },
            { name: '预算分配', maxScore: 5, weight: 0.30, description: '预算分配合理' },
            { name: '方案可行性', maxScore: 5, weight: 0.30, description: '执行方案可操作' },
            { name: '创新性', maxScore: 5, weight: 0.15, description: '有创意亮点' },
          ],
          teacherReview: true,
        },
      },
      {
        id: 'mp_02',
        stageId: 'marketing_promotion',
        name: '广告投放决策',
        description: '制定广告投放策略，包括平台选择、预算分配、效果预估',
        type: 'simulation',
        difficulty: 'hard',
        points: 20,
        estimatedTime: '60分钟',
        relatedAbility: {
          dimension: 'decision',
          subAbility: 'marketing_decision',
        },
        requirements: [
          { type: 'field_value', field: 'adPlatform', operator: 'not_empty', value: null, description: '选择广告平台' },
          { type: 'field_value', field: 'adBudget', operator: 'greater_than', value: 0, description: '设定广告预算' },
          { type: 'score_threshold', field: 'roiEstimate', operator: 'greater_than', value: 1.5, description: '预估ROI≥1.5' },
        ],
        hints: ['参考历史数据', '测试不同投放策略'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '平台选择', maxScore: 5, weight: 0.30, description: '平台选择合理' },
            { name: '预算优化', maxScore: 5, weight: 0.35, description: '预算分配最优' },
            { name: 'ROI预估', maxScore: 5, weight: 0.35, description: 'ROI预估准确' },
          ],
        },
      },
    ],
    prerequisites: ['logistics_config'],
    rewards: { exp: 130, badge: '营销策划师' },
  },
  {
    id: 'risk_management',
    name: '阶段六：风险应对实训',
    description: '培养风险识别、应对能力，学会处理客户投诉和舆情',
    order: 6,
    duration: '4课时',
    abilities: [
      {
        dimension: 'risk',
        subAbilities: ['risk_identification', 'response_planning', 'customer_complaint', 'public_opinion'],
      },
    ],
    tasks: [
      {
        id: 'rm_01',
        stageId: 'risk_management',
        name: '风险应对实训',
        description: '模拟处理各类电商风险事件，包括客户投诉、舆情危机、平台处罚等',
        type: 'simulation',
        difficulty: 'hard',
        points: 30,
        estimatedTime: '60分钟',
        relatedAbility: {
          dimension: 'risk',
          subAbility: 'response_planning',
        },
        requirements: [
          { type: 'score_threshold', field: 'riskScore', operator: 'greater_than', value: 60, description: '风险应对得分≥60分' },
        ],
        hints: ['冷静分析问题', '制定全面解决方案'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '响应速度', maxScore: 20, weight: 0.20, description: '处理时效合理' },
            { name: '方案合理性', maxScore: 30, weight: 0.30, description: '解决方案可行' },
            { name: '沟通技巧', maxScore: 20, weight: 0.20, description: '沟通专业有同理心' },
            { name: '合规意识', maxScore: 15, weight: 0.15, description: '考虑法规和平台规则' },
            { name: '风险控制', maxScore: 15, weight: 0.15, description: '有效降低事态升级风险' },
          ],
        },
      },
    ],
    prerequisites: ['marketing_promotion'],
    rewards: { exp: 100, badge: '风险管理师' },
  },
  {
    id: 'data_analysis',
    name: '阶段七：数据分析与优化',
    description: '培养数据采集、分析、问题诊断和优化迭代能力',
    order: 7,
    duration: '6课时',
    abilities: [
      {
        dimension: 'analysis',
        subAbilities: ['data_collection', 'data_analysis', 'problem_diagnosis', 'optimization_iteration'],
      },
    ],
    tasks: [
      {
        id: 'da_01',
        stageId: 'data_analysis',
        name: '数据分析报告',
        description: '分析店铺运营数据，发现问题并提出优化建议',
        type: 'report',
        difficulty: 'hard',
        points: 25,
        estimatedTime: '90分钟',
        relatedAbility: {
          dimension: 'analysis',
          subAbility: 'data_analysis',
        },
        requirements: [
          { type: 'field_value', field: 'dataMetrics', operator: 'not_empty', value: null, description: '采集关键数据指标' },
          { type: 'field_value', field: 'problemAnalysis', operator: 'not_empty', value: null, description: '问题诊断分析' },
          { type: 'field_value', field: 'optimizationPlan', operator: 'not_empty', value: null, description: '优化方案' },
        ],
        hints: ['关注关键转化指标', '用数据说话'],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '数据采集', maxScore: 5, weight: 0.20, description: '数据完整准确' },
            { name: '分析深度', maxScore: 5, weight: 0.30, description: '分析深入透彻' },
            { name: '问题诊断', maxScore: 5, weight: 0.25, description: '问题定位准确' },
            { name: '优化建议', maxScore: 5, weight: 0.25, description: '建议切实可行' },
          ],
          teacherReview: true,
        },
      },
      {
        id: 'da_02',
        stageId: 'data_analysis',
        name: '优化迭代实施',
        description: '基于数据分析结果，实施优化方案并验证效果',
        type: 'operation',
        difficulty: 'hard',
        points: 20,
        estimatedTime: '60分钟',
        relatedAbility: {
          dimension: 'analysis',
          subAbility: 'optimization_iteration',
        },
        requirements: [
          { type: 'field_value', field: 'optimizationImplemented', operator: 'equals', value: true, description: '已实施优化' },
          { type: 'score_threshold', field: 'improvementRate', operator: 'greater_than', value: 5, description: '提升率≥5%' },
        ],
        hints: ['小步快跑，持续迭代', 'A/B测试验证效果'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '方案执行', maxScore: 5, weight: 0.30, description: '方案执行完整' },
            { name: '效果验证', maxScore: 5, weight: 0.40, description: '效果提升明显' },
            { name: '迭代优化', maxScore: 5, weight: 0.30, description: '持续改进' },
          ],
        },
      },
    ],
    prerequisites: ['risk_management'],
    rewards: { exp: 130, badge: '数据分析师' },
  },
  {
    id: 'compliance_training',
    name: '阶段八：合规培训与测试',
    description: '培养合规与规则意识，掌握平台规则和法律法规',
    order: 8,
    duration: '4课时',
    abilities: [
      {
        dimension: 'compliance',
        subAbilities: ['platform_rules', 'legal_awareness', 'ip_protection', 'data_compliance'],
      },
    ],
    tasks: [
      {
        id: 'ct_01',
        stageId: 'compliance_training',
        name: '平台规则测试',
        description: '完成电商平台规则测试，掌握各平台运营规范',
        type: 'quiz',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '30分钟',
        relatedAbility: {
          dimension: 'compliance',
          subAbility: 'platform_rules',
        },
        requirements: [
          { type: 'score_threshold', field: 'platformRulesScore', operator: 'greater_than', value: 60, description: '测试得分≥60分' },
        ],
        hints: ['仔细阅读平台规则', '注意违规处罚条款'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '规则理解', maxScore: 100, weight: 1.0, description: '客观题自动评分' },
          ],
        },
      },
      {
        id: 'ct_02',
        stageId: 'compliance_training',
        name: '法律法规测试',
        description: '完成电商相关法律法规测试，包括广告法、消费者权益保护等',
        type: 'quiz',
        difficulty: 'medium',
        points: 15,
        estimatedTime: '30分钟',
        relatedAbility: {
          dimension: 'compliance',
          subAbility: 'legal_awareness',
        },
        requirements: [
          { type: 'score_threshold', field: 'legalScore', operator: 'greater_than', value: 60, description: '测试得分≥60分' },
        ],
        hints: ['了解广告法禁用词', '熟悉消费者权益保护条款'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '法规掌握', maxScore: 100, weight: 1.0, description: '客观题自动评分' },
          ],
        },
      },
      {
        id: 'ct_03',
        stageId: 'compliance_training',
        name: '知识产权测试',
        description: '完成知识产权保护测试，了解商标、专利、版权保护',
        type: 'quiz',
        difficulty: 'medium',
        points: 10,
        estimatedTime: '20分钟',
        relatedAbility: {
          dimension: 'compliance',
          subAbility: 'ip_protection',
        },
        requirements: [
          { type: 'score_threshold', field: 'ipScore', operator: 'greater_than', value: 60, description: '测试得分≥60分' },
        ],
        hints: ['注意商标侵权风险', '了解版权保护范围'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '知识掌握', maxScore: 100, weight: 1.0, description: '客观题自动评分' },
          ],
        },
      },
      {
        id: 'ct_04',
        stageId: 'compliance_training',
        name: '数据合规测试',
        description: '完成数据保护和合规操作测试',
        type: 'quiz',
        difficulty: 'medium',
        points: 10,
        estimatedTime: '20分钟',
        relatedAbility: {
          dimension: 'compliance',
          subAbility: 'data_compliance',
        },
        requirements: [
          { type: 'score_threshold', field: 'dataComplianceScore', operator: 'greater_than', value: 60, description: '测试得分≥60分' },
        ],
        hints: ['了解数据保护法规', '掌握数据合规操作'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '合规知识', maxScore: 100, weight: 1.0, description: '客观题自动评分' },
          ],
        },
      },
    ],
    prerequisites: ['data_analysis'],
    rewards: { exp: 80, badge: '合规专员' },
  },
  {
    id: 'final_assessment',
    name: '阶段九：综合考核',
    description: '五维能力综合测试，完成综合评定',
    order: 9,
    duration: '4课时',
    abilities: [
      { dimension: 'decision', subAbilities: ['market_analysis', 'product_selection', 'pricing_strategy', 'channel_selection', 'logistics_supply', 'marketing_decision'] },
      { dimension: 'ai', subAbilities: ['ai_tool_selection', 'content_review', 'efficiency_optimization', 'ai_coupling_control', 'ai_visual_design', 'ai_copywriting'] },
      { dimension: 'analysis', subAbilities: ['data_collection', 'data_analysis', 'problem_diagnosis', 'optimization_iteration'] },
      { dimension: 'risk', subAbilities: ['risk_identification', 'response_planning', 'customer_complaint', 'public_opinion'] },
      { dimension: 'compliance', subAbilities: ['platform_rules', 'legal_awareness', 'ip_protection', 'data_compliance'] },
    ],
    tasks: [
      {
        id: 'fa_01',
        stageId: 'final_assessment',
        name: '五维能力统一测试',
        description: '完成五维能力综合测试（考试得分计入维度分计算）',
        type: 'quiz',
        difficulty: 'hard',
        points: 50,
        estimatedTime: '90分钟',
        relatedAbility: {
          dimension: 'decision',
          subAbility: 'market_analysis',
        },
        requirements: [
          { type: 'score_threshold', field: 'finalScore', operator: 'greater_than', value: 60, description: '综合得分≥60分' },
        ],
        hints: ['认真复习各维度知识', '注意时间分配'],
        evaluation: {
          autoScore: true,
          criteria: [
            { name: '自主决策能力', maxScore: 100, weight: 0.35, description: '35道题' },
            { name: 'AI辅助应用', maxScore: 100, weight: 0.20, description: '20道题' },
            { name: '数据复盘与优化', maxScore: 100, weight: 0.20, description: '20道题' },
            { name: '风险应对', maxScore: 100, weight: 0.15, description: '15道题' },
            { name: '合规与规则意识', maxScore: 100, weight: 0.10, description: '10道题' },
          ],
        },
      },
      {
        id: 'fa_02',
        stageId: 'final_assessment',
        name: '综合实训报告',
        description: '撰写全链路实训总结报告，展示五维能力提升成果',
        type: 'report',
        difficulty: 'hard',
        points: 50,
        estimatedTime: '60分钟',
        relatedAbility: {
          dimension: 'analysis',
          subAbility: 'data_analysis',
        },
        requirements: [
          { type: 'field_value', field: 'summary', operator: 'not_empty', value: null, description: '撰写实训总结' },
          { type: 'item_count', field: 'achievements', operator: 'greater_than', value: 2, description: '列出至少3个能力提升点' },
        ],
        hints: ['回顾整个实训过程', '总结经验教训'],
        evaluation: {
          autoScore: false,
          criteria: [
            { name: '总结完整性', maxScore: 5, weight: 0.30, description: '覆盖全链路' },
            { name: '能力分析', maxScore: 5, weight: 0.40, description: '五维能力分析透彻' },
            { name: '反思深度', maxScore: 5, weight: 0.30, description: '有深入反思' },
          ],
          teacherReview: true,
        },
      },
    ],
    prerequisites: ['compliance_training'],
    rewards: { exp: 200, badge: '电商运营师' },
  },
];
