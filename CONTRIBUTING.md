# 贡献指南

感谢你对 **AI时代电商运营决策能力培养平台** 项目的关注！我们欢迎所有形式的贡献。

##  如何贡献

### 报告 Bug

如果你发现了 Bug，请通过 [Issues](https://github.com/your-username/ecommerce-training-platform/issues) 提交，并包含以下信息：

1. **问题描述**：清晰描述你遇到的问题
2. **复现步骤**：如何重现这个 Bug
3. **预期行为**：你期望的正确行为
4. **实际行为**：实际发生的情况
5. **环境信息**：操作系统、浏览器版本、Node.js 版本等
6. **截图**：如果可能，提供相关截图

### 提出新功能

如果你有新的功能想法，请先通过 [Issues](https://github.com/your-username/ecommerce-training-platform/issues) 或 [Discussions](https://github.com/your-username/ecommerce-training-platform/discussions) 讨论，确保该功能符合项目方向。

### 提交代码

1. **Fork** 本仓库
2. 创建你的特性分支：`git checkout -b feature/your-feature-name`
3. 提交你的更改：`git commit -m 'feat: add your feature'`
4. 推送到分支：`git push origin feature/your-feature-name`
5. 开启 **Pull Request**

## 📝 代码规范

### Git 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

**示例：**
```bash
feat(student): 添加学习中心分类筛选功能
fix(teacher): 修复课程管理页面学分显示问题
docs(readme): 更新项目文档
style(ui): 统一按钮样式
```

### TypeScript 规范

- 所有组件必须标注 Props 类型
- 避免使用 `any`，使用具体类型或泛型
- 优先使用 `interface` 定义对象类型
- 函数参数必须标注类型

### 命名规范

- **文件名**：小写 kebab-case（如 `store-admin.tsx`）
- **组件名**：PascalCase（如 `StoreAdminPage`）
- **函数名**：camelCase（如 `getStoreData`）
- **常量**：UPPER_SNAKE_CASE（如 `STORES_KEY`）

### 样式规范

- 使用 Tailwind CSS 类名
- 遵循 shadcn/ui 组件库风格
- 教育产品设计原则：简洁、层级清晰

## 🧪 测试

提交 PR 前，请确保：

```bash
# TypeScript 类型检查
pnpm ts-check

# ESLint 代码检查
pnpm lint

# 构建检查
pnpm build

# 并行执行所有检查
pnpm validate
```

## 📋 PR 模板

提交 Pull Request 时，请包含以下信息：

```markdown
## 变更类型
- [ ] 新功能 (feat)
- [ ] Bug 修复 (fix)
- [ ] 文档更新 (docs)
- [ ] 代码重构 (refactor)
- [ ] 性能优化 (perf)
- [ ] 测试相关 (test)

## 变更描述
<!-- 简要描述本次变更的内容 -->

## 相关 Issue
<!-- 关联的 Issue 编号，如 #123 -->

## 截图（如适用）
<!-- 如果是 UI 变更，请提供前后对比截图 -->

## 测试
- [ ] 已通过 TypeScript 类型检查
- [ ] 已通过 ESLint 代码检查
- [ ] 已通过构建检查
- [ ] 已进行手动测试
```

## 🤝 行为准则

- 尊重所有贡献者
- 接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

##  需要帮助？

如果你有任何问题，可以通过以下方式联系我们：

- 提交 [Issue](https://github.com/your-username/ecommerce-training-platform/issues)
- 发起 [Discussion](https://github.com/your-username/ecommerce-training-platform/discussions)
- 发送邮件至 [你的邮箱]

---

感谢你的贡献！
