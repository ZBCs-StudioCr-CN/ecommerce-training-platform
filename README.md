# 🛒 AI时代电商运营决策能力培养平台

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**面向中高职、本科院校电商/跨境电商专业的 AI 融合实训平台**

[在线演示](https://b483925b-0ed9-4f10-9031-89ecff6258b2.dev.coze.site) · [功能文档](./docs) · [贡献指南](./CONTRIBUTING.md)

</div>

---

##  项目简介

**AI时代电商运营决策能力培养平台** 是一款专为电商教育设计的云端 SaaS 实训系统。平台以"驾驭AI，培养不可替代的核心能力"为核心理念，从传统的"技能端培训"转向"能力端实训"，帮助学生在 AI 时代建立真正的竞争优势。

### 🎯 核心定位

- **培养目标**：培养四大不可替代的核心能力
  - 🧠 **商业决策能力**（35%）- 自主决策、选品、定价、渠道选择
  -  **AI辅助应用**（20%）- AI工具选择、内容审核、效率优化
  - 📊 **数据复盘能力**（20%）- 数据采集、分析、问题诊断、优化迭代
  - 🛡️ **风险应对能力**（15%）- 风险识别、应对方案、客户投诉处理
  - ⚖️ **合规与规则意识**（10%）- 平台规则、法律法规、知识产权

### 🌐 三大覆盖场景

| 场景 | 平台 | 特色 |
|------|------|------|
| **国内电商** | 淘宝/天猫、拼多多、抖音 | 1:1复刻千牛/抖店后台 |
| **跨境平台电商** | Amazon、Shopee、Lazada | 英文界面，跨境运营流程 |
| **外贸独立站** | Shopify、店匠、WooCommerce | SaaS建站平台操作界面 |

---

## ✨ 核心功能

### 🏫 三级角色体系

```
┌─────────────────────────────────────────────────────────────┐
│  👨‍💼 管理员（院校端）                                        │
│  ├─ 账号管理 · 班级管理 · 数据报表 · 竞赛管理                │
├─────────────────────────────────────────────────────────────┤
│  ‍🏫 教师端                                                  │
│  ├─ 课程管理 · 实训任务 · 考核评分 · 学情分析 · 答疑互动    │
├─────────────────────────────────────────────────────────────┤
│  👨‍ 学生端                                                  │
│  ├─ 学习中心 · 仿真实训 · 考核中心 · AI助手 · 风险应对      │
└─────────────────────────────────────────────────────────────┘
```

### 📚 学生端功能模块

| 模块 | 功能说明 |
|------|---------|
| **实训控制台** | 五维能力雷达图、实训进度、AI使用统计 |
| **学习中心** | 分类课程浏览、章节学习、视频播放 |
| **仿真实训** | 9大平台店铺创建、后台模拟、前台预览 |
| **考核中心** | 在线考试、自动评分、答案解析 |
| **能力评估** | 五维能力详细评估、得分来源分析 |
| **风险应对** | 6大风险类型模拟、AI自动评分点评 |
| **AI助手** | 9大功能模块、流式对话、快捷问题 |
| **成果中心** | 实训作品展示、能力成长轨迹 |
| **答疑提问** | 师生互动、问题解答 |

### 👩‍🏫 教师端功能模块

| 模块 | 功能说明 |
|------|---------|
| **课程管理** | 课程创建、章节编辑、分类管理 |
| **实训管理** | 分项技能实训、综合项目实战发布 |
| **考核管理** | 试卷创建、考试监控、自动阅卷 |
| **学情分析** | 班级数据、个人分析、能力评估 |
| **答疑互动** | 问题回复、学生指导 |

### 👨‍💼 管理员端功能模块

| 模块 | 功能说明 |
|------|---------|
| **数据报表** | 多维分类筛选、实时/周/月/学期/年报 |
| **账号管理** | 教师/学生账号管理 |
| **班级管理** | 班级创建、学生分配 |
| **竞赛管理** | 电商竞赛组织、成绩管理 |

---

## 🛠️ 技术栈

### 前端框架
- **Next.js 16.1.1** (App Router)
- **React 19.2.3**
- **TypeScript 5.x**

### UI 组件
- **shadcn/ui** (基于 Radix UI)
- **Tailwind CSS 4.x**
- **Lucide React** (图标库)
- **Recharts** (数据可视化)

### 表单与验证
- **React Hook Form** + **Zod**

### 数据库与ORM
- **Drizzle ORM** + **PostgreSQL**

### 其他
- **date-fns** (日期处理)
- **sonner** (Toast通知)
- **embla-carousel-react** (轮播)

---

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 24.x
- **pnpm**: >= 9.0.0
- **Git**: 任意版本

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/your-username/ecommerce-training-platform.git
cd ecommerce-training-platform

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填写必要配置

# 4. 启动开发服务器
pnpm dev

# 5. 打开浏览器访问
# http://localhost:5000
```

### 构建生产版本

```bash
# 构建
pnpm build

# 启动生产服务器
pnpm start
```

### 代码检查

```bash
# TypeScript 类型检查
pnpm ts-check

# ESLint 代码检查
pnpm lint

# 并行执行所有检查
pnpm validate
```

---

## 📁 项目结构

```
ecommerce-training-platform/
├── src/
│   ├── app/                      # Next.js App Router 页面
│   │   ├── page.tsx              # 首页（产品介绍）
│   │   ├── login/page.tsx        # 登录页
│   │   ├── student/              # 学生端页面
│   │   │   ├── dashboard/        # 实训控制台
│   │   │   ├── learning/         # 学习中心
│   │   │   ├── practice/         # 仿真实训
│   │   │   │   ├── store/[id]/   # 店铺后台模拟
│   │   │   │   └── preview/[id]/ # 店铺前台预览
│   │   │   ├── exam/             # 考核中心
│   │   │   ├── assessment/       # 能力评估
│   │   │   ├── risk-events/      # 风险应对
│   │   │   ├── ai-assistant/     # AI助手
│   │   │   ├── achievement/      # 成果中心
│   │   │   └── qa/               # 答疑提问
│   │   ├── teacher/              # 教师端页面
│   │   │   ├── dashboard/        # 教师仪表盘
│   │   │   ├── courses/          # 课程管理
│   │   │   ├── practice/         # 实训管理
│   │   │   ├── exam/             # 考核管理
│   │   │   ├── analysis/         # 学情分析
│   │   │   └── qa/               # 答疑互动
│   │   ── admin/                # 管理员端页面
│   │       ├── dashboard/        # 管理员仪表盘
│   │       ├── accounts/         # 账号管理
│   │       ├── classes/          # 班级管理
│   │       ├── reports/          # 数据报表
│   │       └── competitions/     # 竞赛管理
│   ├── components/               # React 组件
│   │   ├── ui/                   # shadcn/ui 基础组件
│   │   └── student-layout.tsx    # 学生端布局
│   ├── lib/                      # 工具函数
│   │   ├── utils.ts              # 通用工具
│   │   └── auth.ts               # 认证工具
│   ├── data/                     # 模拟数据
│   │   ├── courses.ts            # 课程数据
│   │   └── ability-practice.ts   # 能力实训配置
│   └── types/                    # TypeScript 类型定义
├── public/                       # 静态资源
├── docs/                         # 项目文档
├── scripts/                      # 构建脚本
├── .coze                         # Coze 配置文件
├── package.json
├── tsconfig.json
── README.md
```

---

##  设计特色

### 1:1 平台复刻

平台后台界面 1:1 复刻真实电商平台的视觉风格：

| 平台 | 主题色 | 界面风格 |
|------|--------|---------|
| 淘宝千牛 |  橙色 | 千牛工作台风格 |
| 拼多多商家版 | 🔴 红色 | 拼多多商家后台 |
| 抖音抖店 | ⚫ 黑色 | 抖店后台风格 |
| Amazon Seller | 🔵 深蓝 | 英文界面，Amazon风格 |
| Shopee | 🟠 橙色 | Shopee卖家中心 |
| Lazada | 🔵 蓝色 | Lazada卖家中心 |
| Shopify | 🟢 绿色 | 英文界面，Shopify风格 |
| 店匠 | 🟣 紫色 | 店匠后台风格 |
| WooCommerce | 🟣 蓝紫 | WooCommerce风格 |

### AI 辅助设计原则

- **AI 提供选项，学生做决策**
- **AI 提供建议，学生承担结果**
- **全流程模拟，零成本零风险**

---

##  五维能力评估模型

```
综合评定 = 考试成绩 × 50% + 实训成绩 × 50%

┌─────────────────────────────────────────────────────────┐
│  自主决策能力 (35%)                                      │
│  ├─ 市场分析决策 · 选品决策 · 定价策略                   │
│  ├─ 渠道选择 · 物流供应链管理 · 营销与活动决策           │
├─────────────────────────────────────────────────────────┤
│  AI辅助应用 (20%)                                        │
│  ├─ AI工具选择 · 内容审核 · 效率优化                     │
│  ├─ AI耦合度控制 · AI视觉策划 · AI文案创意              │
├─────────────────────────────────────────────────────────┤
│  数据复盘与优化 (20%)                                    │
│  ├─ 数据采集 · 数据分析 · 问题诊断 · 优化迭代            │
├─────────────────────────────────────────────────────────┤
│  风险应对 (15%)                                          │
│  ├─ 风险识别 · 应对方案 · 客户投诉处理 · 舆情管理        │
├─────────────────────────────────────────────────────────┤
│  合规与规则意识 (10%)                                    │
│  ├─ 平台规则 · 法律法规 · 知识产权 · 数据合规            │
└─────────────────────────────────────────────────────────┘
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何参与项目开发。

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 [MIT License](./LICENSE) 开源协议。

---

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Radix UI](https://www.radix-ui.com/) - 无样式组件库
- [Lucide](https://lucide.dev/) - 图标库

---

## 📬 联系方式

- **项目维护**: [你的GitHub用户名]
- **问题反馈**: [Issues](https://github.com/your-username/ecommerce-training-platform/issues)
- **功能建议**: [Discussions](https://github.com/your-username/ecommerce-training-platform/discussions)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个 Star！**

Made with ❤️ for E-commerce Education

</div>
