/**
 * 独立决策比例计算工具
 * 
 * 实现三大维度的计算：
 * 1. 决策行为得分（40%权重）
 * 2. AI交互健康度（35%权重）
 * 3. 内容原创度（25%权重）
 */

import {
  type DecisionType,
  type BehaviorType,
  type UsageType,
  type DecisionBehaviorStats,
  type AIInteractionStats,
  type ContentOriginalityStats,
  type StudentDecisionStats,
  type DecisionEvent,
  DECISION_WEIGHTS,
  BEHAVIOR_SCORES,
  RATIO_WEIGHTS,
  STANDARD_THINKING_TIME,
  SIMILARITY_THRESHOLDS,
} from '@/types/decision-tracking';

// ==================== 文本相似度计算 ====================

/**
 * 预处理文本（去除空格、标点，转小写）
 */
function preprocessText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s\n\r\t]+/g, '')
    .replace(/[^\u4e00-\u9fa5a-z0-9]/gi, '');
}

/**
 * 计算Levenshtein距离
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // 删除
          dp[i][j - 1] + 1,     // 插入
          dp[i - 1][j - 1] + 1  // 替换
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * 计算文本相似度（0-1）
 */
export function calculateSimilarity(text1: string, text2: string): number {
  if (!text1 || !text2) return 0;
  
  const clean1 = preprocessText(text1);
  const clean2 = preprocessText(text2);
  
  if (clean1.length === 0 || clean2.length === 0) return 0;
  
  const distance = levenshteinDistance(clean1, clean2);
  const maxLength = Math.max(clean1.length, clean2.length);
  
  return 1 - distance / maxLength;
}

/**
 * 根据相似度判定行为类型
 */
export function determineBehaviorType(similarity: number, hasAIInteraction: boolean): BehaviorType {
  if (!hasAIInteraction) return 'independent';
  
  if (similarity > SIMILARITY_THRESHOLDS.copied) return 'copied';
  if (similarity > SIMILARITY_THRESHOLDS.adopted) return 'adopted';
  if (similarity > SIMILARITY_THRESHOLDS.partial) return 'partial';
  return 'adjusted';
}

// ==================== 决策行为得分计算 ====================

/**
 * 计算单次决策得分
 */
export function calculateSingleDecisionScore(
  decisionType: DecisionType,
  behaviorType: BehaviorType
): number {
  const baseScore = BEHAVIOR_SCORES[behaviorType];
  const weight = DECISION_WEIGHTS[decisionType];
  return baseScore * weight;
}

/**
 * 计算决策行为得分
 */
export function calculateDecisionBehaviorScore(
  stats: DecisionBehaviorStats
): number {
  const {
    totalDecisions,
    independentDecisions,
    inspiredDecisions,
    adjustedDecisions,
    partialDecisions,
    adoptedDecisions,
    copiedDecisions,
  } = stats;

  if (totalDecisions === 0) return 0;

  // 计算总得分（每种行为类型乘以对应得分）
  const totalScore = 
    independentDecisions * BEHAVIOR_SCORES.independent +
    inspiredDecisions * BEHAVIOR_SCORES.inspired +
    adjustedDecisions * BEHAVIOR_SCORES.adjusted +
    partialDecisions * BEHAVIOR_SCORES.partial +
    adoptedDecisions * BEHAVIOR_SCORES.adopted +
    copiedDecisions * BEHAVIOR_SCORES.copied;

  // 计算平均得分
  return Math.round(totalScore / totalDecisions);
}

// ==================== AI交互健康度计算 ====================

/**
 * 计算AI交互健康度
 * 
 * 核心理念：只考核交互质量，不考核交互数量
 */
export function calculateAIInteractionHealthScore(
  stats: AIInteractionStats
): number {
  const {
    totalInteractions,
    adjustedInteractions,
    inspiredInteractions,
    partialInteractions,
    adoptedInteractions,
    copiedInteractions,
  } = stats;

  if (totalInteractions === 0) {
    // 没有AI交互，说明完全独立决策，健康度为100
    return 100;
  }

  // 计算总得分（每种使用类型乘以对应得分）
  // 使用与行为类型相同的得分体系
  const totalScore = 
    adjustedInteractions * 100 +   // 调整优化
    inspiredInteractions * 90 +    // 参考启发
    partialInteractions * 70 +     // 部分采纳
    adoptedInteractions * 30 +     // 直接采纳
    copiedInteractions * 0;        // 复制粘贴

  // 计算平均得分
  return Math.round(totalScore / totalInteractions);
}

// ==================== 内容原创度计算 ====================

/**
 * 计算原创输入占比
 */
function calculateOriginalInputRatio(stats: ContentOriginalityStats): number {
  const { totalInputChars, originalInputChars } = stats;
  if (totalInputChars === 0) return 100;
  return Math.round((originalInputChars / totalInputChars) * 100);
}

/**
 * 计算编辑程度系数
 */
function calculateEditDegreeCoefficient(stats: ContentOriginalityStats): number {
  const { editCount } = stats;
  
  if (editCount === 0) return 0;
  if (editCount <= 2) return 40;
  if (editCount <= 5) return 70;
  return 100;
}

/**
 * 计算思考时长系数
 */
function calculateThinkingTimeCoefficient(
  avgThinkingTime: number,
  decisionType: DecisionType
): number {
  const standardTime = STANDARD_THINKING_TIME[decisionType];
  const ratio = avgThinkingTime / standardTime;
  
  // 限制在0.5-1.5之间
  return Math.min(1.5, Math.max(0.5, ratio));
}

/**
 * 计算内容原创度得分
 */
export function calculateContentOriginalityScore(
  stats: ContentOriginalityStats,
  decisionType: DecisionType = 'product'
): number {
  const {
    totalInputChars,
    editCount,
    avgThinkingTime,
  } = stats;

  if (totalInputChars === 0) return 100;

  // 1. 原创输入占比（50%权重）
  const originalInputRatio = calculateOriginalInputRatio(stats);
  const originalInputScore = originalInputRatio * 0.5;

  // 2. 编辑程度（30%权重）
  const editCoefficient = calculateEditDegreeCoefficient(stats);
  const editScore = editCoefficient * 0.3;

  // 3. 思考时长系数（20%权重）
  const thinkingCoefficient = calculateThinkingTimeCoefficient(avgThinkingTime, decisionType);
  const thinkingScore = thinkingCoefficient * 100 * 0.2;

  // 综合得分
  return Math.round(originalInputScore + editScore + thinkingScore);
}

// ==================== 综合得分计算 ====================

/**
 * 计算独立决策比例（综合得分）
 */
export function calculateAutonomousDecisionRatio(
  decisionBehavior: DecisionBehaviorStats,
  aiInteraction: AIInteractionStats,
  contentOriginality: ContentOriginalityStats,
  decisionType: DecisionType = 'product'
): number {
  // 1. 决策行为得分（40%权重）
  const decisionScore = calculateDecisionBehaviorScore(decisionBehavior);
  const weightedDecisionScore = decisionScore * RATIO_WEIGHTS.decisionBehavior;

  // 2. AI交互健康度（35%权重）
  const aiHealthScore = calculateAIInteractionHealthScore(aiInteraction);
  const weightedAIScore = aiHealthScore * RATIO_WEIGHTS.aiInteraction;

  // 3. 内容原创度（25%权重）
  const originalityScore = calculateContentOriginalityScore(contentOriginality, decisionType);
  const weightedOriginalityScore = originalityScore * RATIO_WEIGHTS.contentOriginality;

  // 综合得分
  return Math.round(weightedDecisionScore + weightedAIScore + weightedOriginalityScore);
}

// ==================== 统计数据生成 ====================

/**
 * 从决策事件列表生成统计数据
 */
export function generateStatsFromEvents(
  studentId: string,
  statDate: string,
  events: DecisionEvent[]
): StudentDecisionStats {
  // 初始化统计数据
  const decisionBehavior: DecisionBehaviorStats = {
    totalDecisions: 0,
    independentDecisions: 0,
    inspiredDecisions: 0,
    adjustedDecisions: 0,
    partialDecisions: 0,
    adoptedDecisions: 0,
    copiedDecisions: 0,
    decisionScore: 0,
  };

  const aiInteraction: AIInteractionStats = {
    totalInteractions: 0,
    adjustedInteractions: 0,
    inspiredInteractions: 0,
    partialInteractions: 0,
    adoptedInteractions: 0,
    copiedInteractions: 0,
    healthScore: 0,
  };

  const contentOriginality: ContentOriginalityStats = {
    totalInputChars: 0,
    originalInputChars: 0,
    aiGeneratedChars: 0,
    editCount: 0,
    avgEditMagnitude: 0,
    avgThinkingTime: 0,
    originalityScore: 0,
  };

  let totalThinkingTime = 0;
  let totalEditMagnitude = 0;

  // 遍历事件进行统计
  events.forEach((event) => {
    // 1. 决策行为统计
    decisionBehavior.totalDecisions += 1;
    switch (event.behaviorType) {
      case 'independent':
        decisionBehavior.independentDecisions += 1;
        break;
      case 'inspired':
        decisionBehavior.inspiredDecisions += 1;
        break;
      case 'adjusted':
        decisionBehavior.adjustedDecisions += 1;
        break;
      case 'partial':
        decisionBehavior.partialDecisions += 1;
        break;
      case 'adopted':
        decisionBehavior.adoptedDecisions += 1;
        break;
      case 'copied':
        decisionBehavior.copiedDecisions += 1;
        break;
    }

    // 2. AI交互统计
    event.aiInteractions.forEach((interaction) => {
      aiInteraction.totalInteractions += 1;
      switch (interaction.usageType) {
        case 'adjusted':
          aiInteraction.adjustedInteractions += 1;
          break;
        case 'inspired':
          aiInteraction.inspiredInteractions += 1;
          break;
        case 'partial':
          aiInteraction.partialInteractions += 1;
          break;
        case 'adopted':
          aiInteraction.adoptedInteractions += 1;
          break;
        case 'copied':
          aiInteraction.copiedInteractions += 1;
          break;
      }

      // 3. 内容原创度统计
      if (interaction.similarityScore !== undefined) {
        if (interaction.similarityScore < 0.6) {
          // 原创内容
          contentOriginality.originalInputChars += interaction.aiResponse.length;
        } else {
          // AI生成内容
          contentOriginality.aiGeneratedChars += interaction.aiResponse.length;
        }
        contentOriginality.totalInputChars += interaction.aiResponse.length;
      }

      // 编辑统计
      contentOriginality.editCount += interaction.editCount;
      interaction.editHistory.forEach((edit) => {
        const magnitude = calculateSimilarity(edit.contentBefore, edit.contentAfter);
        totalEditMagnitude += magnitude;
      });
    });

    // 思考时长统计
    totalThinkingTime += event.thinkingDuration;
  });

  // 计算平均值
  if (decisionBehavior.totalDecisions > 0) {
    contentOriginality.avgThinkingTime = Math.round(totalThinkingTime / decisionBehavior.totalDecisions);
  }

  if (contentOriginality.editCount > 0) {
    contentOriginality.avgEditMagnitude = totalEditMagnitude / contentOriginality.editCount;
  }

  // 计算各维度得分
  decisionBehavior.decisionScore = calculateDecisionBehaviorScore(decisionBehavior);
  aiInteraction.healthScore = calculateAIInteractionHealthScore(aiInteraction);
  contentOriginality.originalityScore = calculateContentOriginalityScore(contentOriginality);

  // 计算综合得分
  const autonomousDecisionRatio = calculateAutonomousDecisionRatio(
    decisionBehavior,
    aiInteraction,
    contentOriginality
  );

  return {
    studentId,
    statDate,
    decisionBehavior,
    aiInteraction,
    contentOriginality,
    autonomousDecisionRatio,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

// ==================== 模拟数据生成 ====================

/**
 * 生成模拟统计数据（用于开发测试）
 */
export function generateMockStats(studentId: string): StudentDecisionStats {
  // 模拟决策行为统计
  const decisionBehavior: DecisionBehaviorStats = {
    totalDecisions: 22,
    independentDecisions: 5,
    inspiredDecisions: 3,
    adjustedDecisions: 12,
    partialDecisions: 3,
    adoptedDecisions: 2,
    copiedDecisions: 0,
    decisionScore: 0,
  };
  decisionBehavior.decisionScore = calculateDecisionBehaviorScore(decisionBehavior);

  // 模拟AI交互统计
  const aiInteraction: AIInteractionStats = {
    totalInteractions: 50,
    adjustedInteractions: 30,
    inspiredInteractions: 5,
    partialInteractions: 15,
    adoptedInteractions: 5,
    copiedInteractions: 0,
    healthScore: 0,
  };
  aiInteraction.healthScore = calculateAIInteractionHealthScore(aiInteraction);

  // 模拟内容原创度统计
  const contentOriginality: ContentOriginalityStats = {
    totalInputChars: 15000,
    originalInputChars: 10800,
    aiGeneratedChars: 4200,
    editCount: 45,
    avgEditMagnitude: 0.35,
    avgThinkingTime: 360,
    originalityScore: 0,
  };
  contentOriginality.originalityScore = calculateContentOriginalityScore(contentOriginality);

  // 计算综合得分
  const autonomousDecisionRatio = calculateAutonomousDecisionRatio(
    decisionBehavior,
    aiInteraction,
    contentOriginality
  );

  return {
    studentId,
    statDate: new Date().toISOString().split('T')[0],
    decisionBehavior,
    aiInteraction,
    contentOriginality,
    autonomousDecisionRatio,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/**
 * 生成详细的得分来源说明（用于前端展示）
 */
export function generateScoreBreakdown(stats: StudentDecisionStats) {
  return {
    autonomousDecisionRatio: stats.autonomousDecisionRatio,
    components: [
      {
        name: '决策行为得分',
        weight: 40,
        score: stats.decisionBehavior.decisionScore,
        weightedScore: Math.round(stats.decisionBehavior.decisionScore * 0.4),
        details: [
          { label: '完全独立决策', value: stats.decisionBehavior.independentDecisions, unit: '次', score: 100 },
          { label: '参考启发', value: stats.decisionBehavior.inspiredDecisions, unit: '次', score: 90 },
          { label: '调整优化', value: stats.decisionBehavior.adjustedDecisions, unit: '次', score: 100 },
          { label: '部分采纳', value: stats.decisionBehavior.partialDecisions, unit: '次', score: 70 },
          { label: '直接采纳', value: stats.decisionBehavior.adoptedDecisions, unit: '次', score: 30 },
          { label: '复制粘贴', value: stats.decisionBehavior.copiedDecisions, unit: '次', score: 0 },
        ],
      },
      {
        name: 'AI交互健康度',
        weight: 35,
        score: stats.aiInteraction.healthScore,
        weightedScore: Math.round(stats.aiInteraction.healthScore * 0.35),
        details: [
          { label: '总交互次数', value: stats.aiInteraction.totalInteractions, unit: '次', score: '-' },
          { label: '调整优化', value: stats.aiInteraction.adjustedInteractions, unit: '次', score: 100 },
          { label: '参考启发', value: stats.aiInteraction.inspiredInteractions, unit: '次', score: 90 },
          { label: '部分采纳', value: stats.aiInteraction.partialInteractions, unit: '次', score: 70 },
          { label: '直接采纳', value: stats.aiInteraction.adoptedInteractions, unit: '次', score: 30 },
          { label: '复制粘贴', value: stats.aiInteraction.copiedInteractions, unit: '次', score: 0 },
        ],
        note: '只考核交互质量，不考核交互数量',
      },
      {
        name: '内容原创度',
        weight: 25,
        score: stats.contentOriginality.originalityScore,
        weightedScore: Math.round(stats.contentOriginality.originalityScore * 0.25),
        details: [
          { 
            label: '原创输入占比', 
            value: Math.round(stats.contentOriginality.originalInputChars / stats.contentOriginality.totalInputChars * 100), 
            unit: '%',
            weight: 50 
          },
          { 
            label: '编辑次数', 
            value: stats.contentOriginality.editCount, 
            unit: '次',
            weight: 30 
          },
          { 
            label: '平均思考时长', 
            value: Math.round(stats.contentOriginality.avgThinkingTime / 60), 
            unit: '分钟',
            weight: 20 
          },
        ],
      },
    ],
    formula: '独立决策比例 = 决策行为得分 × 40% + AI交互健康度 × 35% + 内容原创度 × 25%',
  };
}
