# AI时代电商运营决策能力培养平台 - 开发指南

## 项目概览

### 定位与目标
- **核心定位**：AI时代电商运营决策能力培养平台，面向中高职、本科院校电商/跨境电商专业
- **培养目标**：从"技能端培训"转向"能力端实训"，培养四大不可替代的核心能力
  - 商业决策能力（自主决策能力30%）
  - 流量逻辑思维（AI辅助应用20%）
  - 数据复盘能力（数据复盘与优化25%）
  - 风险应对能力（风险应对15% + 合规与规则意识10%）

### 三大覆盖场景
1. **国内电商**：淘宝/天猫、拼多多、抖音
2. **跨境平台电商**：Amazon、Shopee、Lazada
3. **外贸独立站**：Shopify、店匠、WooCommerce

### 核心设计理念
- **1:1复刻**：真实还原Shopify/Shopyy等主流SaaS建站平台操作界面
- **AI辅助设计**：AI提供选项，学生做决策；AI提供建议，学生承担结果
- **零成本零风险**：全流程模拟，实训效果可直接应用于实际工作

## 技术栈

### 前端框架
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**

### UI组件库
- **shadcn/ui** (基于 Radix UI)
- **Tailwind CSS 4**
- **Lucide React** (图标库)

### 集成服务
- **coze-coding-dev-sdk**：对象存储、网络检索（后续集成）

## 项目结构

```
/workspace/projects/
├── src/
│   ├── app/                      # Next.js App Router页面
│   │   ├── page.tsx              # 首页（产品介绍）
│   │   ├── layout.tsx            # 全局布局
│   │   ├── student/              # 学生端页面
│   │   │   ├── dashboard/        # 学生仪表盘
│   │   │   └── practice/         # 实训模块
│   │   │       ├── page.tsx      # 店铺管理主页面
│   │   │       ├── store/[id]/   # 店铺后台模拟
│   │   │       └── preview/[id]/ # 店铺前台预览
│   │   ├── teacher/              # 教师端页面
│   │   │   └── dashboard/        # 教师仪表盘
│   │   └── admin/                # 管理员端页面
│   │       └── dashboard/        # 管理员仪表盘
│   ├── components/               # React组件
│   │   ├── ui/                   # shadcn/ui组件库
│   │   ├── layout/               # 布局组件
│   │   │   ├── Header.tsx        # 顶部导航栏
│   │   │   ├── Sidebar.tsx       # 侧边栏
│   │   │   └── RoleLayout.tsx    # 角色布局容器
│   │   └── dashboard/            # 仪表盘组件
│   └── lib/                      # 工具函数
│       └── utils.ts              # 通用工具函数
├── public/                       # 静态资源
├── .coze                         # Coze配置文件（项目启动依赖）
├── package.json                  # 项目依赖配置
└── AGENTS.md                     # 本文档
```

## 核心功能模块

### 1. 店铺管理主页面 (`src/app/student/practice/page.tsx`)
- 支持三大场景、9个平台的店铺创建
- 使用localStorage实现数据持久化
- 店铺列表展示、删除、查看功能
- 新建店铺后自动跳转到对应后台

### 2. 店铺后台模拟 (`src/app/student/practice/store/[id]/page.tsx`)
- 1:1复刻真实平台后台界面
- 9个平台差异化设计：
  - 淘宝千牛风格（橙色主题）
  - 拼多多商家版（红色主题）
  - 抖音抖店（黑色主题）
  - Amazon Seller Central（深蓝主题，英文界面）
  - Shopee卖家中心（橙色主题）
  - Lazada卖家中心（蓝色主题）
  - Shopify后台（绿色主题，英文界面）
  - 店匠（紫色主题）
  - WooCommerce（蓝紫主题）
- 完整的后台功能模块：
  - 首页概览（数据统计）
  - 商品管理（商品列表、添加商品）
  - 订单管理（订单列表、订单详情）
  - 营销中心（优惠券、促销活动）
  - 数据分析（流量分析、销售分析）
  - 广告投放（广告管理、预算控制）
  - 店铺设置（基础设置、支付设置）

### 3. 店铺前台预览 (`src/app/student/practice/preview/[id]/page.tsx`)
- 支持桌面/平板/手机三种设备预览
- 三种差异化风格：
  - 淘宝风格（顶部条+搜索+分类导航）
  - Amazon风格（配送地址+分类搜索）
  - Shopify风格（Hero大图+品牌展示）
- 响应式设计，实时预览效果

### 4. 角色权限体系
- **管理员**（紫色标识）：系统管理、教师管理、数据统计
- **教师**（蓝色标识）：班级管理、学生管理、任务发布、成绩查看
- **学生**（绿色标识）：实训操作、数据分析、考核评分

### 5. AI智能助手 (`src/app/student/ai-assistant/page.tsx`)
- **9大核心功能模块**：
  1. 市场分析 - 行业趋势、竞品分析、市场机会洞察
  2. 选品建议 - 爆款挖掘、利润分析、供应链评估
  3. 智能店铺搭建 - 店铺装修、页面优化、转化率提升
  4. 投放建议 - 广告策略、预算分配、ROI优化
  5. 运营策略 - 日常运营、活动策划、增长策略
  6. 营销话术 - 文案撰写、话术优化、内容创意
  7. 客户服务 - 客服培训、投诉处理、满意度提升
  8. 数据复盘 - 数据分析、问题诊断、优化建议
  9. 危机处理 - 风险预警、危机应对、舆情管理
- **通用对话区域**：主页底部自由问答，无需选择模块即可直接向AI提问
- **核心特性**：
  - 流式AI对话（SSE协议）
  - 每个模块独立的系统提示词
  - 快捷问题引导
  - 消息反馈机制（点赞/点踩）
  - 使用统计记录

### 6. 风险应对实训 (`src/app/student/risk-events/page.tsx`)
- **6大风险类型**：
  1. 客户投诉 - 产品质量、物流延迟、服务态度等
  2. 差评处理 - 恶意差评、真实差评的识别与应对
  3. 平台处罚 - 违规处罚、侵权投诉、售后纠纷
  4. 舆情危机 - 负面传播、品牌形象危机
  5. 运营风险 - 库存积压、价格错误、活动异常
  6. 合规风险 - 广告法违规、知识产权、数据合规
- **风险等级**：低风险、中风险、高风险、紧急
- **评分维度**（总分100分）：
  - 响应速度（20%）- 处理时效是否合理
  - 方案合理性（30%）- 解决方案是否可执行
  - 沟通技巧（20%）- 沟通是否专业、有同理心
  - 合规意识（15%）- 是否考虑法规和平台规则
  - 风险控制（15%）- 是否有效降低事态升级风险
- **实训流程**：查看风险详情 → 分析问题 → 提交应对方案 → AI评分点评

## 数据持久化策略

### localStorage使用规范
```typescript
// 存储Key（注意：必须保持一致）
const STORES_KEY = 'ecommerce_practice_stores';

// 保存店铺列表
localStorage.setItem(STORES_KEY, JSON.stringify(stores));

// 读取店铺列表
const stores = JSON.parse(localStorage.getItem(STORES_KEY) || '[]');
```

### 数据流转逻辑
1. 用户创建店铺 → 保存到localStorage
2. 跳转到店铺后台 → 从localStorage读取店铺信息
3. 后台操作 → 模拟数据流转（前端状态管理）
4. 刷新页面 → 数据从localStorage恢复

### AI助手API (`src/app/api/ai-assistant/route.ts`)
- **请求方式**：POST
- **请求参数**：
  ```typescript
  {
    message: string;    // 用户消息
    module: string;     // 模块ID（market-analysis, product-selection等）
    history?: Message[] // 历史对话（可选，最多10条）
  }
  ```
- **响应格式**：SSE流式响应（text/event-stream）
- **支持模块**：9个功能模块 + general通用对话

### 风险应对评分API (`src/app/api/risk-evaluation/route.ts`)
- **请求方式**：POST
- **请求参数**：
  ```typescript
  {
    riskId: string;      // 风险事件ID
    solution: string;    // 学生应对方案
    riskDetails: object; // 风险事件详情
  }
  ```
- **响应格式**：JSON
  ```typescript
  {
    scores: {
      responseSpeed: number;    // 0-20
      reasonability: number;    // 0-30
      communication: number;    // 0-20
      compliance: number;       // 0-15
      riskControl: number;      // 0-15
      total: number;            // 0-100
    },
    feedback: string;           // 具体反馈
    aiEvaluation: string;       // 能力评估建议
  }
  ```

### 五维能力评分来源机制（方案二）

#### 核心设计思路
**考试评估维度，实训评估具体能力**：考试只考五维能力（一级标签），具体能力通过实训任务评估。

#### 综合评定公式
```
维度分 = 考试得分 × 50% + 具体能力平均分 × 50%
```

#### 五维能力权重分配
1. **自主决策能力** (35%)
   - 市场分析决策、选品决策、定价策略、渠道选择、物流供应链管理、营销与活动决策
2. **AI辅助应用** (20%)
   - AI工具选择、内容审核能力、效率优化、AI耦合度控制、AI视觉策划设计、AI文案创意撰写
3. **数据复盘与优化** (20%)
   - 数据采集、数据分析、问题诊断、优化迭代
4. **风险应对** (15%)
   - 风险识别、应对方案制定、客户投诉处理、舆情管理
5. **合规与规则意识** (10%)
   - 平台规则理解、法律法规意识、知识产权保护、数据合规

#### 具体能力得分来源（单一来源）

**类型一：实训任务评估**（大部分能力）
```typescript
{
  practice: { 
    name: '市场调研报告', 
    score: 85, 
    weight: 100,
    detail: '完成市场调研报告撰写，AI评分+教师评分' 
  }
}
// 得分 = 实训任务得分
```

**类型二：系统自动计算**（如AI耦合度控制）
```typescript
{
  system: { 
    name: 'AI使用行为分析', 
    score: 68, 
    weight: 100, 
    detail: '基于AI使用频率、复制粘贴比例、原创度等指标系统自动计算' 
  }
}
// 得分 = 系统评分
```

**类型三：专项测试**（如法律法规意识）
```typescript
{
  exam: { 
    name: '法律法规测试', 
    score: 85, 
    weight: 100,
    detail: '电商相关法律法规专项测试' 
  }
}
// 得分 = 专项测试得分
```

#### 维度分计算示例
```
自主决策能力维度分计算：
- 考试得分：82分（来自五维能力统一测试）
- 实训平均分：(85+78+76+80+72+75) ÷ 6 = 78分
- 维度分 = 82 × 50% + 78 × 50% = 80分
```

#### 教师端展示功能
- **学情分析页面**：展示五维能力总览（考试vs实训双列展示）
- **得分来源弹窗**：点击「查看得分来源」按钮，查看具体能力的评估方式
- **维度分计算展示**：清晰展示考试得分和实训平均分的贡献比例

#### 数据流转逻辑
1. **考试得分**：来自五维能力统一测试（一级维度测试）
2. **具体能力得分**：
   - 实训任务 → AI自动评分 + 教师人工评分
   - 专项测试 → 客观题自动评分 + 主观题教师评分
   - 系统计算 → 学习行为数据自动分析
3. **维度分计算**：前端根据权重配置实时计算并展示

#### 方案优势
1. **题库简洁**：只需维护5个一级标签，AI归类准确率95%+
2. **评估精准**：具体能力通过实训任务直接评估，避免题目边界模糊
3. **教学闭环**：实训任务与具体能力一一对应，便于针对性训练
4. **兼容现有题库**：完全对接现有题库系统

## 开发规范

### 命名规范
- **文件名**：小写kebab-case（如 `store-admin.tsx`）
- **组件名**：PascalCase（如 `StoreAdminPage`）
- **函数名**：camelCase（如 `getStoreData`）
- **常量**：UPPER_SNAKE_CASE（如 `STORES_KEY`）

### 样式规范
- 使用Tailwind CSS类名
- 遵循shadcn/ui组件库风格
- 教育产品设计原则：简洁、层级清晰
- 平台差异化配色：
  ```typescript
  // 淘宝：橙色
  headerBg: 'bg-orange-500'
  // 拼多多：红色
  headerBg: 'bg-red-500'
  // 抖音：黑色
  headerBg: 'bg-black'
  // Shopify：绿色
  headerBg: 'bg-green-600'
  ```

### TypeScript规范
- 所有组件必须标注Props类型
- 避免使用any，使用具体类型或泛型
- 优先使用interface定义对象类型

## 构建与部署

### 开发环境
```bash
# 启动开发服务器（端口5000）
coze dev

# 类型检查
npx tsc --noEmit

# 安装依赖
pnpm install
```

### 环境变量
- `COZE_WORKSPACE_PATH`：项目工作目录
- `DEPLOY_RUN_PORT`：服务监听端口（5000）
- `COZE_PROJECT_DOMAIN_DEFAULT`：对外访问域名

## 待开发功能（TODO）

1. **实训任务与评分系统**
   - 任务创建与发布
   - 学生任务完成度跟踪
   - 多维度自动评分（决策、AI应用、数据复盘、风险应对、合规意识）

2. **模拟数据分析面板**
   - 实时数据展示
   - 数据趋势分析
   - AI数据洞察

3. **广告投放模拟器**
   - 广告创建流程
   - 预算分配决策
   - 效果数据分析

4. **全链路实训流程整合**
   - 任务发布 → 店铺创建 → 运营决策 → 数据分析 → 成绩评定
   - 实训报告生成
   - 能力雷达图展示

## 常见问题

### Q: 刷新页面后店铺数据丢失？
A: 确保使用localStorage持久化数据，避免将数据仅保存在React状态中。

### Q: 店铺后台样式不正确？
A: 检查`platformConfig`配置，确保使用了正确的平台标识符。

### Q: 预览前台显示错误的店铺或平台？
A: 确保三个页面使用相同的localStorage存储键名 `ecommerce_practice_stores`：
- 店铺管理页面 (`src/app/student/practice/page.tsx`)
- 店铺后台页面 (`src/app/student/practice/store/[id]/page.tsx`)
- 店铺预览页面 (`src/app/student/practice/preview/[id]/page.tsx`)

### Q: TypeScript类型错误？
A: 运行`npx tsc --noEmit`检查类型，确保所有Props都有正确的类型定义。

## 更新日志

### 2026-04-02
- ✅ 采用方案二更新五维能力评分机制：考试评估维度，实训评估具体能力
- ✅ 更新学情分析页面：展示考试vs实训双列得分
- ✅ 新增五维能力实训配置文件（src/data/ability-practice.ts）
- ✅ 更新学生端dashboard：五维能力雷达图、实训阶段关联能力标签
- ✅ 实训阶段重新设计为9个阶段，每个阶段对应具体能力培养
- ✅ 独立决策比例计算方案设计完成（docs/autonomous-decision-calculation.md）
- ✅ 数据埋点类型定义（src/types/decision-tracking.ts）
- ✅ 后端计算工具函数（src/lib/autonomous-decision-calculator.ts）
- ✅ 前端展示更新：添加独立决策详情弹窗，展示三大维度得分来源
- ✅ 危机处理能力卡片改造：等级根据处理的风险事件数量计算

### 2026-04-01
- ✅ 完成店铺管理主页面开发
- ✅ 完成9个平台的后台模拟界面
- ✅ 完成店铺前台预览功能
- ✅ 实现localStorage数据持久化
- ✅ 修复首页样式问题（深色风格统一）
- ✅ 修复新建店铺跳转问题
- ✅ 修复预览页面localStorage键名不一致问题（统一为 `ecommerce_practice_stores`）
- ✅ 修复预览页面抖音/Shopee/Lazada平台渲染错误（更新renderHeader逻辑）
- ✅ 完成AI智能助手页面开发（9大核心功能模块）
- ✅ 集成LLM实现流式AI对话功能
- ✅ 添加通用对话区域，支持主页底部自由问答
- ✅ 完成风险应对实训页面开发（6大风险类型、5维评分体系）
- ✅ 实现AI自动评分和点评功能
