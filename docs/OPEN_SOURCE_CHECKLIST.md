# 开源准备清单

本文档帮助你完成项目开源前的所有准备工作。

## ✅ 开源前检查清单

### 1. 代码清理

- [ ] 移除所有硬编码的敏感信息（API 密钥、密码、数据库连接字符串）
- [ ] 检查 `.env` 文件是否已添加到 `.gitignore`
- [ ] 移除调试代码和 `console.log` 语句
- [ ] 清理注释中的敏感信息
- [ ] 检查是否有本地路径硬编码（如 `/workspace/projects`）

### 2. 文档完善

- [x] README.md - 项目介绍、安装说明、使用指南
- [x] LICENSE - 开源许可证
- [x] CONTRIBUTING.md - 贡献指南
- [x] .env.example - 环境变量示例
- [ ] CHANGELOG.md - 版本更新日志（可选）
- [ ] CODE_OF_CONDUCT.md - 行为准则（可选）

### 3. 依赖检查

- [ ] 检查 `package.json` 中的依赖是否都是必要的
- [ ] 移除开发环境中特有的依赖
- [ ] 更新依赖到最新稳定版本
- [ ] 运行 `pnpm audit` 检查安全漏洞

### 4. 测试验证

- [ ] 所有功能测试通过
- [ ] TypeScript 类型检查通过 (`pnpm ts-check`)
- [ ] ESLint 代码检查通过 (`pnpm lint`)
- [ ] 构建成功 (`pnpm build`)

### 5. Git 配置

- [ ] 设置正确的 `.gitignore`
- [ ] 清理 Git 历史中的敏感文件
- [ ] 配置 `.gitattributes`（可选）

### 6. 仓库设置

- [ ] 创建 GitHub 仓库
- [ ] 设置仓库描述
- [ ] 添加主题标签（topics）
- [ ] 配置分支保护规则
- [ ] 设置 Issue 模板
- [ ] 设置 PR 模板

---

##  上传到 GitHub 步骤

### 步骤 1: 初始化 Git 仓库（如果还没有）

```bash
cd /workspace/projects
git init
git add .
git commit -m "feat: initial commit"
```

### 步骤 2: 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/new)
2. 创建新仓库，名称建议：`ecommerce-training-platform`
3. 选择 Public（公开）
4. **不要** 初始化 README、.gitignore 或 license（我们已经有这些文件）

### 步骤 3: 关联远程仓库

```bash
# 添加远程仓库
git remote add origin https://github.com/your-username/ecommerce-training-platform.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 4: 配置仓库信息

在 GitHub 仓库设置中：

1. **Description**: AI时代电商运营决策能力培养平台 - 面向中高职、本科院校电商/跨境电商专业的AI融合实训系统
2. **Topics**: `ecommerce`, `education`, `training`, `AI`, `nextjs`, `react`, `typescript`, `shadcn-ui`, `tailwindcss`, `saaS`
3. **Website**: 你的演示网站 URL
4. **License**: MIT License

---

##  安全检查

### 敏感信息扫描

```bash
# 检查是否有硬编码的密钥
grep -r "password\|secret\|key\|token" src/ --include="*.ts" --include="*.tsx" | grep -v "test\|example\|demo"

# 检查环境变量文件
cat .env.local 2>/dev/null || echo "No .env.local found (good!)"
```

### 依赖安全审计

```bash
# 检查依赖漏洞
pnpm audit

# 修复自动可修复的漏洞
pnpm audit fix
```

---

## 📝 后续维护

### 版本发布

```bash
# 更新 package.json 中的版本号
npm version patch  # 或 minor, major

# 创建 Git 标签
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### 持续集成（可选）

创建 `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [24.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 9
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Type check
      run: pnpm ts-check
    
    - name: Lint
      run: pnpm lint
    
    - name: Build
      run: pnpm build
```

---

## 📊 项目指标

开源后建议关注以下指标：

- **Stars**: 项目受欢迎程度
- **Forks**: 其他开发者复制项目的数量
- **Issues**: 报告的 Bug 和功能请求
- **Pull Requests**: 社区贡献
- **Downloads**: npm 包下载量（如果发布）

---

## 🤝 社区建设

1. **及时回复 Issues**：保持活跃的社区互动
2. **定期更新**：发布新版本和修复
3. **文档维护**：保持文档与代码同步
4. **欢迎贡献者**：感谢所有贡献者

---

## 📞 需要帮助？

如果在开源过程中遇到问题，可以：

1. 查看 [GitHub 文档](https://docs.github.com/)
2. 搜索相关问题的解决方案
3. 在项目中提交 Issue 讨论

祝你开源顺利！
