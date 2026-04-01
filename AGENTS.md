# AGENTS.md - 电商实训平台项目指南

## 项目概览

本项目是一个面向中高职、本科院校电商/跨境电商专业的电商实战模拟教学实训平台，采用"教学-实训-考核-就业"全闭环的云端SaaS架构。

### 核心特性
- **三级角色权限体系**：管理员（紫色）、教师（蓝色）、学生（绿色）
- **1:1复刻Shopify**：真实的独立站建站平台操作体验
- **全链路实训**：从市场调研到数据分析的完整流程
- **零成本零风险**：云端模拟环境，无需真实资金投入

## 技术栈

- **框架**: Next.js 16 (App Router)
- **核心**: React 19
- **语言**: TypeScript 5
- **UI组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS 4
- **包管理**: pnpm (禁止使用 npm/yarn)
- **集成服务**: coze-coding-dev-sdk (对象存储、网络检索)

## 项目结构

```
src/
├── app/                          # Next.js App Router
│   ├── login/                    # 登录页面
│   ├── admin/                    # 管理员端
│   │   ├── dashboard/           # 管理员控制台
│   │   ├── users/               # 用户管理
│   │   ├── courses/             # 课程管理
│   │   ├── resources/           # 资源管理
│   │   └── settings/            # 系统设置
│   ├── teacher/                 # 教师端
│   │   ├── dashboard/           # 教师控制台
│   │   ├── courses/             # 课程管理
│   │   ├── students/            # 学生管理
│   │   ├── exams/               # 考核管理
│   │   └── qa/                  # 答疑管理
│   └── student/                 # 学生端
│       ├── dashboard/           # 实训控制台
│       ├── learning/            # 学习中心
│       ├── practice/            # 仿真实训（店铺后台）
│       ├── tasks/               # 实训任务
│       ├── ads/                 # 广告投放模拟器
│       ├── analytics/           # 数据分析面板
│       ├── exam/                # 考核中心
│       ├── achievement/         # 成果中心
│       └── qa/                  # 答疑提问
├── components/                   # 共享组件
│   ├── ui/                      # shadcn/ui 组件
│   └── student-layout.tsx       # 学生端统一布局组件
├── data/                        # 共享数据
│   ├── courses.ts               # 课程数据（15门课程，100+章节）
│   └── practice.ts              # 实训系统数据模型
├── lib/                         # 工具函数
└── hooks/                       # 自定义 Hooks
```

## 核心功能模块

### 1. 课程管理 (courses.ts)
- **五大课程模块**：专业基础、专业核心、实践操作、拓展提升、考证培训
- **15门课程**：涵盖独立站全链路知识
- **100+章节**：系统化课程内容
- **课程属性**：学分、难度等级、知识标签、先修课程

### 2. 实训系统 (practice.ts)
- **8个实训阶段**：
  1. 市场调研与选品
  2. 独立站搭建
  3. 产品上架与优化
  4. 支付与物流配置
  5. 流量推广
  6. 运营与客服
  7. 数据分析与优化
  8. 综合考核

- **模拟店铺数据模型**：店铺设置、产品、订单、客户、流量、广告等
- **实训任务体系**：任务类型、难度、评分标准、自动/人工评估

### 3. Shopify风格店铺后台 (student/practice)
- 首页概览
- 产品管理
- 订单管理
- 数据分析
- 营销推广
- 主题设置
- 支付设置
- 物流设置

### 4. 广告投放模拟器 (student/ads)
- Google Ads 模拟
- Facebook Ads 模拟
- 受众分析
- 效果分析

### 5. 数据分析面板 (student/analytics)
- 核心指标：收入、订单、访客、转化率、客单价、复购率
- 流量来源分析
- 热销产品排行
- 国家/地区分布
- 设备分布

## 开发规范

### 编码风格
- 使用 shadcn/ui 组件库
- 遵循教育产品简洁、层级清晰的设计原则
- 三级角色使用不同主题色：
  - 管理员：紫色 (#8B5CF6)
  - 教师：蓝色 (#3B82F6)
  - 学生：绿色 (#10B981)

### 学生端统一布局组件
学生端所有页面**必须**使用统一的布局组件 `StudentLayout`，确保导航和主题一致：

```tsx
import { StudentLayout } from '@/components/student-layout';

export default function StudentPage() {
  return (
    <StudentLayout activeMenu="page_id">
      {/* 页面内容 */}
    </StudentLayout>
  );
}
```

对于需要自定义布局的页面（如店铺后台），可以使用分离的组件：
- `StudentHeader` - 仅顶部导航栏
- `StudentSidebar` - 仅侧边导航栏

**重要**：学生端主题色统一使用绿色渐变 (`from-emerald-500 to-teal-600`)。

### 数据管理
- 前端采用状态管理模拟数据流转
- 暂未连接真实后端数据库（符合MVP要求）
- 使用对象存储管理视频和文档资源

### 页面布局规范
- 固定顶部导航栏（h-16）
- 固定侧边导航（w-60）
- 响应式布局：ml-60 pt-16
- 统一使用 Card 组件包装内容

### 类型安全
- 严格的 TypeScript 类型检查
- 所有组件参数必须有类型定义
- 禁止使用 `any` 类型（特殊情况除外）

## 常用命令

```bash
# 安装依赖
pnpm install

# 开发模式（端口 5000）
coze dev

# 类型检查
npx tsc --noEmit

# 构建生产版本
coze build

# 启动生产环境
coze start
```

## 环境变量

项目运行在云端沙箱中，使用以下环境变量：

- `COZE_WORKSPACE_PATH`: 项目工作目录
- `COZE_PROJECT_DOMAIN_DEFAULT`: 对外访问域名
- `DEPLOY_RUN_PORT`: 服务监听端口（5000）
- `COZE_PROJECT_ENV`: 环境标识（DEV/PROD）

## 集成服务使用

### 对象存储
用于存储视频、文档等教学资源：
```typescript
// 参考 /skills/public/prod/storage 技能文档
```

### 网络检索
用于课程内容研究和资料获取：
```typescript
// 参考 /skills/public/prod/web-search 技能文档
// API端点: /api/search
```

## 关键文件说明

### courses.ts
- 定义了15门课程的完整数据结构
- 支持模块分类筛选
- 包含课程统计信息（章节数、学时、学分）

### practice.ts
- 定义了8个实训阶段的详细配置
- 包含每个阶段的任务列表和评估标准
- 定义了模拟店铺的完整数据模型

## 注意事项

1. **禁止修改 .coze 配置文件**：这是项目构建和运行的唯一依据
2. **仅使用 pnpm**：禁止使用 npm 或 yarn
3. **端口规范**：服务必须运行在 5000 端口
4. **HMR热更新**：修改代码后自动刷新，无需重启服务
5. **Mock数据策略**：当前使用前端状态管理，后续可对接真实后端

## 已知限制

- 暂未实现真实的用户认证系统
- 数据仅存储在前端状态中，刷新后会丢失
- 广告投放和数据分析使用模拟数据
- 支付和物流配置为模拟界面，无实际功能

## 后续优化方向

1. 接入真实数据库（Supabase）
2. 实现用户认证和权限管理
3. 增加更多实训场景和任务
4. 优化数据可视化图表
5. 增加学生作品展示和分享功能
