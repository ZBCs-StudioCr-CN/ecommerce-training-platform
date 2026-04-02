# 独立决策比例计算方案

## 概述

独立决策比例是衡量学生在AI辅助环境下保持独立思考能力的重要指标。核心理念：**调用AI是正常的，关键看怎么用**。

## 计算公式

```
独立决策比例 = 决策行为得分 × 40% + AI交互健康度 × 35% + 内容原创度 × 25%
```

---

## 一、决策行为得分（权重40%）

### 1.1 定义
衡量学生在关键决策节点的独立程度，通过埋点采集决策行为数据。

### 1.2 关键决策节点

| 决策类型 | 场景示例 | 埋点位置 |
|----------|----------|----------|
| 选品决策 | 选择上架商品、确定主推款 | 商品管理-添加商品 |
| 定价决策 | 设置售价、促销价 | 商品定价页面 |
| 渠道决策 | 选择销售渠道、投放平台 | 渠道配置页面 |
| 营销决策 | 活动方案、优惠券设置 | 营销中心 |
| 风险决策 | 投诉处理方案、危机应对 | 风险应对页面 |
| 物流决策 | 物流商选择、运费设置 | 物流配置页面 |

### 1.3 决策行为评分

| 行为类型 | 得分 | 行为描述 | 判定条件 |
|----------|------|----------|----------|
| 完全独立决策 | 100 | 不使用AI，自主完成决策 | 未调用AI助手直接提交 |
| 参考启发 | 90 | AI作为思路参考，独立完成决策 | 调用AI后，输入内容原创度>80% |
| 调整优化 | 100 | 采纳AI建议但做了实质性修改 | AI输出与最终提交相似度<60% |
| 部分采纳 | 70 | 只采纳部分建议并自行补充 | AI输出与最终提交相似度60%-80% |
| 直接采纳 | 30 | 完全照搬AI建议 | AI输出与最终提交相似度>80% |
| 复制粘贴 | 0 | 直接复制AI输出无修改 | 复制粘贴操作 + 相似度>95% |

### 1.4 计算公式

```javascript
决策行为得分 = Σ(单次决策得分 × 决策权重) / 总决策次数

// 不同决策类型的权重（根据重要性）
const decisionWeights = {
  pricing: 1.2,      // 定价决策 - 高权重
  product: 1.0,      // 选品决策 - 标准权重
  marketing: 1.0,    // 营销决策 - 标准权重
  risk: 1.3,         // 风险决策 - 最高权重
  channel: 0.8,      // 渠道决策 - 较低权重
  logistics: 0.7,    // 物流决策 - 较低权重
};
```

---

## 二、AI交互健康度（权重35%）

### 2.1 定义
衡量学生与AI交互的质量，**只考核交互质量，不考核交互数量**。

### 2.2 核心理念
- AI调用次数多不代表依赖度高
- 可能表示学生在认真调研、比较方案
- 关键看每次交互的质量

### 2.3 交互行为评分

| 行为类型 | 得分 | 行为描述 |
|----------|------|----------|
| 调整优化 | 100 | 采纳AI建议但做了修改 |
| 参考启发 | 90 | AI作为思路参考，独立完成 |
| 部分采纳 | 70 | 只采纳部分建议并自行补充 |
| 直接采纳 | 30 | 完全照搬AI建议 |
| 复制粘贴 | 0 | 直接复制AI输出无修改 |

### 2.4 计算公式

```javascript
AI交互健康度 = Σ(单次交互得分) / 总交互次数

// 不再惩罚调用次数，只看每次交互的质量
```

### 2.5 示例计算

**场景A（调用50次AI）**
- 30次调整优化（30 × 100 = 3000）
- 15次部分采纳（15 × 70 = 1050）
- 5次直接采纳（5 × 30 = 150）
- **总分：(3000+1050+150) / 50 = 84%**

**场景B（调用10次AI）**
- 2次调整优化（2 × 100 = 200）
- 3次直接采纳（3 × 30 = 90）
- 5次复制粘贴（5 × 0 = 0）
- **总分：(200+90+0) / 10 = 29%**

**结论**：场景A调用更多，但健康度更高，符合"质量优于数量"的理念。

---

## 三、内容原创度（权重25%）

### 3.1 定义
衡量学生输出内容的原创程度，包括文案、方案、决策说明等。

### 3.2 计算维度

```javascript
内容原创度 = 原创输入占比 × 50% + 修改编辑程度 × 30% + 思考时长系数 × 20%
```

### 3.3 各维度详解

#### 3.3.1 原创输入占比（50%）

```javascript
原创输入占比 = 自己输入字数 / (自己输入字数 + AI生成字数)

// 数据来源：
// - 自己输入字数：键盘输入事件统计
// - AI生成字数：AI助手输出字数统计
```

#### 3.3.2 修改编辑程度（30%）

```javascript
修改编辑程度 = 编辑次数系数 × 平均修改幅度

// 编辑次数系数：
// - 0次编辑：0%
// - 1-2次编辑：40%
// - 3-5次编辑：70%
// - 6次以上编辑：100%

// 平均修改幅度：
// - 计算每次编辑前后文本的差异度（Levenshtein距离）
// - 差异度越大，说明修改越实质性
```

#### 3.3.3 思考时长系数（20%）

```javascript
思考时长系数 = 实际思考时长 / 标准思考时长

// 标准思考时长：
// - 根据决策类型设定标准时间
// - 例如：定价决策标准时长5分钟，选品决策标准时长10分钟

// 思考时长：
// - 从打开决策页面到提交决策的时间
// - 扣除页面切换、浏览其他页面的时间

// 系数限制：0.5 - 1.5
// - 过短（<50%标准时长）：可能草率决策，系数降低
// - 适中（50%-150%标准时长）：正常思考，系数正常
// - 过长（>150%标准时长）：不额外加分，上限1.5
```

---

## 四、数据埋点设计

### 4.1 决策行为埋点

```typescript
interface DecisionEvent {
  eventId: string;           // 事件ID
  studentId: string;         // 学生ID
  timestamp: number;         // 时间戳
  
  // 决策信息
  decisionType: DecisionType;    // 决策类型
  decisionNodeId: string;        // 决策节点ID
  
  // AI交互记录
  aiInteractions: AIInteraction[]; // 本次决策相关的AI交互
  
  // 行为判定
  behaviorType: BehaviorType;    // 行为类型
  similarityScore?: number;      // 与AI输出的相似度
  
  // 最终决策
  finalContent: string;          // 最终提交内容
  decisionData: Record<string, unknown>; // 决策数据
}

type DecisionType = 'pricing' | 'product' | 'marketing' | 'risk' | 'channel' | 'logistics';
type BehaviorType = 'independent' | 'inspired' | 'adjusted' | 'partial' | 'adopted' | 'copied';
```

### 4.2 AI交互埋点

```typescript
interface AIInteraction {
  interactionId: string;      // 交互ID
  timestamp: number;          // 时间戳
  
  // 交互内容
  userMessage: string;        // 用户输入
  aiResponse: string;         // AI响应
  
  // 使用情况
  usedInDecision: boolean;    // 是否用于决策
  usageType: UsageType;       // 使用类型
  similarityScore?: number;   // 最终内容与AI响应的相似度
  
  // 编辑行为
  editCount: number;          // 编辑次数
  editHistory: EditRecord[];  // 编辑历史
}

type UsageType = 'adjusted' | 'inspired' | 'partial' | 'adopted' | 'copied';

interface EditRecord {
  timestamp: number;
  contentBefore: string;
  contentAfter: string;
  editType: 'typing' | 'pasting' | 'deleting' | 'formatting';
}
```

### 4.3 页面行为埋点

```typescript
interface PageBehaviorEvent {
  eventId: string;
  studentId: string;
  timestamp: number;
  
  // 页面信息
  pagePath: string;           // 页面路径
  pageType: 'decision' | 'learning' | 'practice' | 'other';
  
  // 行为类型
  eventType: 'page_enter' | 'page_leave' | 'focus' | 'blur' | 'submit' | 'cancel';
  
  // 时间数据
  duration?: number;          // 停留时长
  activeDuration?: number;    // 活跃时长（页面聚焦）
}
```

### 4.4 键盘输入埋点

```typescript
interface InputEvent {
  eventId: string;
  studentId: string;
  timestamp: number;
  
  // 输入位置
  inputField: string;         // 输入框标识
  pagePath: string;           // 页面路径
  
  // 输入类型
  inputType: 'typing' | 'pasting' | 'dictation';
  
  // 内容统计
  charCount: number;          // 字符数
  isAIGenerated: boolean;     // 是否AI生成（粘贴时判断）
  
  // 来源追踪
  source?: 'keyboard' | 'ai-copy' | 'template' | 'other';
}
```

---

## 五、相似度计算算法

### 5.1 文本相似度（用于判定行为类型）

```javascript
// 使用Levenshtein距离计算文本差异度
function calculateSimilarity(text1: string, text2: string): number {
  // 1. 预处理：去除空格、标点，转小写
  const clean1 = preprocess(text1);
  const clean2 = preprocess(text2);
  
  // 2. 计算Levenshtein距离
  const distance = levenshteinDistance(clean1, clean2);
  
  // 3. 转换为相似度（0-1）
  const maxLength = Math.max(clean1.length, clean2.length);
  const similarity = 1 - distance / maxLength;
  
  return similarity;
}

// 行为类型判定
function determineBehaviorType(similarity: number): BehaviorType {
  if (similarity > 0.95) return 'copied';      // 相似度>95%
  if (similarity > 0.80) return 'adopted';     // 相似度80%-95%
  if (similarity > 0.60) return 'partial';     // 相似度60%-80%
  return 'adjusted';                           // 相似度<60%
}
```

### 5.2 语义相似度（可选，更精确）

```javascript
// 使用向量嵌入计算语义相似度
async function calculateSemanticSimilarity(text1: string, text2: string): Promise<number> {
  // 调用嵌入API获取向量
  const embedding1 = await getEmbedding(text1);
  const embedding2 = await getEmbedding(text2);
  
  // 计算余弦相似度
  return cosineSimilarity(embedding1, embedding2);
}
```

---

## 六、实时计算与存储

### 6.1 数据存储结构

```sql
-- 学生决策统计表
CREATE TABLE student_decision_stats (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  stat_date DATE NOT NULL,
  
  -- 决策行为统计
  total_decisions INT DEFAULT 0,
  independent_decisions INT DEFAULT 0,
  adjusted_decisions INT DEFAULT 0,
  partial_decisions INT DEFAULT 0,
  adopted_decisions INT DEFAULT 0,
  copied_decisions INT DEFAULT 0,
  decision_score DECIMAL(5,2) DEFAULT 0,
  
  -- AI交互统计
  total_ai_interactions INT DEFAULT 0,
  adjusted_interactions INT DEFAULT 0,
  inspired_interactions INT DEFAULT 0,
  partial_interactions INT DEFAULT 0,
  adopted_interactions INT DEFAULT 0,
  copied_interactions INT DEFAULT 0,
  ai_health_score DECIMAL(5,2) DEFAULT 0,
  
  -- 内容原创度统计
  total_input_chars BIGINT DEFAULT 0,
  original_input_chars BIGINT DEFAULT 0,
  ai_generated_chars BIGINT DEFAULT 0,
  edit_count INT DEFAULT 0,
  avg_edit_magnitude DECIMAL(5,2) DEFAULT 0,
  avg_thinking_time INT DEFAULT 0,  -- 秒
  originality_score DECIMAL(5,2) DEFAULT 0,
  
  -- 综合得分
  autonomous_decision_ratio DECIMAL(5,2) DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(student_id, stat_date)
);
```

### 6.2 实时更新策略

```javascript
// 每次决策提交时实时更新统计
async function updateDecisionStats(studentId: string, decision: DecisionEvent) {
  // 1. 获取当日统计记录（不存在则创建）
  const today = new Date().toISOString().split('T')[0];
  let stats = await getStats(studentId, today);
  
  // 2. 更新决策行为统计
  stats.total_decisions += 1;
  stats[`${decision.behaviorType}_decisions`] += 1;
  
  // 3. 重新计算决策行为得分
  stats.decision_score = calculateDecisionScore(stats);
  
  // 4. 重新计算综合得分
  stats.autonomous_decision_ratio = calculateOverallScore(stats);
  
  // 5. 保存更新
  await saveStats(stats);
}
```

---

## 七、展示与反馈

### 7.1 学生端展示

**卡片展示**
- 独立决策比例：78%
- 说明：基于决策行为、AI交互健康度、内容原创度综合计算

**详情弹窗**
- 决策行为得分：82分（40%权重）
  - 完全独立决策：5次
  - 调整优化：12次
  - 部分采纳：3次
  - 直接采纳：2次
  
- AI交互健康度：84分（35%权重）
  - 调用50次AI，质量评分84分
  - 调整优化：30次
  - 部分采纳：15次
  - 直接采纳：5次
  
- 内容原创度：75分（25%权重）
  - 原创输入占比：72%
  - 编辑修改次数：平均3次/决策
  - 思考时长：正常范围

### 7.2 教师端展示

- 班级独立决策比例分布
- 预警学生名单（独立决策比例<60%）
- AI依赖度异常学生（AI交互健康度<50%）

---

## 八、版本记录

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| v1.0 | 2026-04-02 | 初始版本，移除AI调用次数惩罚，改为只考核交互质量 |
