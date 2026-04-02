#!/bin/bash

# 打包脚本 - 将项目打包为可下载的压缩包

echo "正在打包电商实训平台项目..."

# 创建临时打包目录
PACK_DIR="/tmp/ecommerce-platform-package"
rm -rf $PACK_DIR
mkdir -p $PACK_DIR

# 复制必要文件
cp -r /workspace/projects/src $PACK_DIR/
cp -r /workspace/projects/public $PACK_DIR/
cp /workspace/projects/package.json $PACK_DIR/
cp /workspace/projects/pnpm-lock.yaml $PACK_DIR/
cp /workspace/projects/tsconfig.json $PACK_DIR/
cp /workspace/projects/next.config.ts $PACK_DIR/
cp /workspace/projects/tailwind.config.ts $PACK_DIR/
cp /workspace/projects/postcss.config.mjs $PACK_DIR/
cp /workspace/projects/components.json $PACK_DIR/
cp /workspace/projects/.coze $PACK_DIR/
cp -r /workspace/projects/.cozeproj $PACK_DIR/

# 复制 AGENTS.md 文档
cp /workspace/projects/AGENTS.md $PACK_DIR/

# 创建启动说明
cat > $PACK_DIR/README.md << 'EOF'
# AI时代电商运营决策能力培养平台

## 项目说明
这是一个基于 Next.js 16 的电商实训平台，支持学生、教师、管理员三种角色。

## 本地运行步骤

### 1. 环境要求
- Node.js 18+
- pnpm (推荐) 或 npm

### 2. 安装依赖
```bash
pnpm install
# 或
npm install
```

### 3. 启动开发服务器
```bash
pnpm dev
# 或
npm run dev
```

### 4. 访问页面
打开浏览器访问 http://localhost:5000

## 功能模块
- 学生端：实训控制台、学习中心、仿真实训、风险应对、考核中心、能力评估、成果中心、答疑提问、AI助手
- 教师端：数据总览、课程管理、实训管理、考试管理、学情分析、考核评分、教学控制台、答疑社区
- 管理员端：数据总览、账号管理、班级管理、数据报表、竞赛管理、系统设置

## 技术栈
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- shadcn/ui
- Tailwind CSS 4
EOF

# 打包
cd /tmp
tar -czvf ecommerce-platform.tar.gz ecommerce-platform-package

echo "打包完成！文件位置: /tmp/ecommerce-platform.tar.gz"
