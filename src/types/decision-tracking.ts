/**
 * 独立决策比例 - 数据埋点类型定义
 * 
 * 用于采集学生决策行为、AI交互、内容原创度等数据
 */

// ==================== 基础类型 ====================

/**
 * 决策类型
 */
export type DecisionType = 
  | 'pricing'     // 定价决策
  | 'product'     // 选品决策
  | 'marketing'   // 营销决策
  | 'risk'        // 风险决策
  | 'channel'     // 渠道决策
  | 'logistics';  // 物流决策

/**
 * 决策行为类型（按独立程度排序）
 */
export type BehaviorType = 
  | 'independent'  // 完全独立决策（100分）
  | 'inspired'     // 参考启发（90分）
  | 'adjusted'     // 调整优化（100分）
  | 'partial'      // 部分采纳（70分）
  | 'adopted'      // 直接采纳（30分）
  | 'copied';      // 复制粘贴（0分）

/**
 * AI交互使用类型
 */
export type UsageType = 
  | 'adjusted'   // 调整优化
  | 'inspired'   // 参考启发
  | 'partial'    // 部分采纳
  | 'adopted'    // 直接采纳
  | 'copied';    // 复制粘贴

/**
 * 输入来源类型
 */
export type InputSource = 
  | 'keyboard'    // 键盘输入
  | 'ai-copy'     // AI输出复制
  | 'template'    // 模板
  | 'other';      // 其他

/**
 * 编辑类型
 */
export type EditType = 
  | 'typing'      // 打字输入
  | 'pasting'     // 粘贴
  | 'deleting'    // 删除
  | 'formatting'; // 格式化

/**
 * 页面类型
 */
export type PageType = 
  | 'decision'    // 决策页面
  | 'learning'    // 学习页面
  | 'practice'    // 实训页面
  | 'other';      // 其他

/**
 * 页面行为事件类型
 */
export type PageEventType = 
  | 'page_enter'  // 进入页面
  | 'page_leave'  // 离开页面
  | 'focus'       // 获得焦点
  | 'blur'        // 失去焦点
  | 'submit'      // 提交
  | 'cancel';     // 取消

// ==================== 决策行为埋点 ====================

/**
 * 编辑记录
 */
export interface EditRecord {
  /** 编辑时间戳 */
  timestamp: number;
  /** 编辑前内容 */
  contentBefore: string;
  /** 编辑后内容 */
  contentAfter: string;
  /** 编辑类型 */
  editType: EditType;
}

/**
 * AI交互记录
 */
export interface AIInteraction {
  /** 交互ID */
  interactionId: string;
  /** 时间戳 */
  timestamp: number;
  /** 用户输入 */
  userMessage: string;
  /** AI响应 */
  aiResponse: string;
  /** 是否用于决策 */
  usedInDecision: boolean;
  /** 使用类型 */
  usageType: UsageType;
  /** 最终内容与AI响应的相似度 */
  similarityScore?: number;
  /** 编辑次数 */
  editCount: number;
  /** 编辑历史 */
  editHistory: EditRecord[];
}

/**
 * 决策行为事件
 */
export interface DecisionEvent {
  /** 事件ID */
  eventId: string;
  /** 学生ID */
  studentId: string;
  /** 时间戳 */
  timestamp: number;
  
  // 决策信息
  /** 决策类型 */
  decisionType: DecisionType;
  /** 决策节点ID */
  decisionNodeId: string;
  
  // AI交互记录
  /** 本次决策相关的AI交互 */
  aiInteractions: AIInteraction[];
  
  // 行为判定
  /** 行为类型 */
  behaviorType: BehaviorType;
  /** 与AI输出的相似度 */
  similarityScore?: number;
  
  // 最终决策
  /** 最终提交内容 */
  finalContent: string;
  /** 决策数据 */
  decisionData: Record<string, unknown>;
  
  // 时间数据
  /** 决策开始时间 */
  startTime: number;
  /** 决策提交时间 */
  submitTime: number;
  /** 思考时长（秒） */
  thinkingDuration: number;
  /** 活跃时长（秒） */
  activeDuration: number;
}

// ==================== AI交互埋点 ====================

/**
 * AI对话交互事件
 */
export interface AIInteractionEvent {
  /** 事件ID */
  eventId: string;
  /** 学生ID */
  studentId: string;
  /** 时间戳 */
  timestamp: number;
  
  // 对话内容
  /** 对话模块 */
  module: string;
  /** 用户消息 */
  userMessage: string;
  /** AI响应 */
  aiResponse: string;
  
  // 使用情况
  /** 是否被复制 */
  isCopied: boolean;
  /** 是否被编辑 */
  isEdited: boolean;
  /** 编辑后内容 */
  editedContent?: string;
  /** 相似度分数 */
  similarityScore?: number;
}

// ==================== 页面行为埋点 ====================

/**
 * 页面行为事件
 */
export interface PageBehaviorEvent {
  /** 事件ID */
  eventId: string;
  /** 学生ID */
  studentId: string;
  /** 时间戳 */
  timestamp: number;
  
  // 页面信息
  /** 页面路径 */
  pagePath: string;
  /** 页面类型 */
  pageType: PageType;
  
  // 行为类型
  /** 事件类型 */
  eventType: PageEventType;
  
  // 时间数据
  /** 停留时长（秒） */
  duration?: number;
  /** 活跃时长（秒） */
  activeDuration?: number;
  
  // 关联信息
  /** 关联的决策节点ID */
  decisionNodeId?: string;
}

// ==================== 键盘输入埋点 ====================

/**
 * 输入事件
 */
export interface InputEvent {
  /** 事件ID */
  eventId: string;
  /** 学生ID */
  studentId: string;
  /** 时间戳 */
  timestamp: number;
  
  // 输入位置
  /** 输入框标识 */
  inputField: string;
  /** 页面路径 */
  pagePath: string;
  
  // 输入类型
  /** 输入方式 */
  inputType: 'typing' | 'pasting' | 'dictation';
  
  // 内容统计
  /** 字符数 */
  charCount: number;
  /** 是否AI生成 */
  isAIGenerated: boolean;
  
  // 来源追踪
  /** 来源类型 */
  source: InputSource;
  
  // 关联信息
  /** 关联的决策节点ID */
  decisionNodeId?: string;
}

// ==================== 统计数据类型 ====================

/**
 * 决策行为统计
 */
export interface DecisionBehaviorStats {
  /** 总决策次数 */
  totalDecisions: number;
  /** 完全独立决策次数 */
  independentDecisions: number;
  /** 参考启发次数 */
  inspiredDecisions: number;
  /** 调整优化次数 */
  adjustedDecisions: number;
  /** 部分采纳次数 */
  partialDecisions: number;
  /** 直接采纳次数 */
  adoptedDecisions: number;
  /** 复制粘贴次数 */
  copiedDecisions: number;
  /** 决策行为得分（0-100） */
  decisionScore: number;
}

/**
 * AI交互统计
 */
export interface AIInteractionStats {
  /** 总AI交互次数 */
  totalInteractions: number;
  /** 调整优化次数 */
  adjustedInteractions: number;
  /** 参考启发次数 */
  inspiredInteractions: number;
  /** 部分采纳次数 */
  partialInteractions: number;
  /** 直接采纳次数 */
  adoptedInteractions: number;
  /** 复制粘贴次数 */
  copiedInteractions: number;
  /** AI交互健康度（0-100） */
  healthScore: number;
}

/**
 * 内容原创度统计
 */
export interface ContentOriginalityStats {
  /** 总输入字符数 */
  totalInputChars: number;
  /** 原创输入字符数 */
  originalInputChars: number;
  /** AI生成字符数 */
  aiGeneratedChars: number;
  /** 编辑次数 */
  editCount: number;
  /** 平均编辑幅度 */
  avgEditMagnitude: number;
  /** 平均思考时长（秒） */
  avgThinkingTime: number;
  /** 内容原创度得分（0-100） */
  originalityScore: number;
}

/**
 * 学生决策统计（日级别）
 */
export interface StudentDecisionStats {
  /** 学生ID */
  studentId: string;
  /** 统计日期 */
  statDate: string;
  
  // 三大维度统计
  /** 决策行为统计 */
  decisionBehavior: DecisionBehaviorStats;
  /** AI交互统计 */
  aiInteraction: AIInteractionStats;
  /** 内容原创度统计 */
  contentOriginality: ContentOriginalityStats;
  
  // 综合得分
  /** 独立决策比例（0-100） */
  autonomousDecisionRatio: number;
  
  // 时间戳
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
}

// ==================== 配置常量 ====================

/**
 * 决策类型权重配置
 */
export const DECISION_WEIGHTS: Record<DecisionType, number> = {
  pricing: 1.2,     // 定价决策 - 高权重
  risk: 1.3,        // 风险决策 - 最高权重
  marketing: 1.0,   // 营销决策 - 标准权重
  product: 1.0,     // 选品决策 - 标准权重
  channel: 0.8,     // 渠道决策 - 较低权重
  logistics: 0.7,   // 物流决策 - 较低权重
};

/**
 * 行为类型得分配置
 */
export const BEHAVIOR_SCORES: Record<BehaviorType, number> = {
  independent: 100,  // 完全独立决策
  inspired: 90,      // 参考启发
  adjusted: 100,     // 调整优化
  partial: 70,       // 部分采纳
  adopted: 30,       // 直接采纳
  copied: 0,         // 复制粘贴
};

/**
 * 独立决策比例计算权重
 */
export const RATIO_WEIGHTS = {
  decisionBehavior: 0.40,    // 决策行为权重 40%
  aiInteraction: 0.35,       // AI交互健康度权重 35%
  contentOriginality: 0.25,  // 内容原创度权重 25%
} as const;

/**
 * 标准思考时长配置（秒）
 */
export const STANDARD_THINKING_TIME: Record<DecisionType, number> = {
  pricing: 300,      // 定价决策：5分钟
  product: 600,      // 选品决策：10分钟
  marketing: 480,    // 营销决策：8分钟
  risk: 600,         // 风险决策：10分钟
  channel: 240,      // 渠道决策：4分钟
  logistics: 180,    // 物流决策：3分钟
};

/**
 * 相似度阈值配置
 */
export const SIMILARITY_THRESHOLDS = {
  copied: 0.95,      // 相似度>95%判定为复制
  adopted: 0.80,     // 相似度80%-95%判定为直接采纳
  partial: 0.60,     // 相似度60%-80%判定为部分采纳
  adjusted: 0,       // 相似度<60%判定为调整优化
} as const;
