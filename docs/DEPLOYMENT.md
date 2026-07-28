# 部署指南

本文档提供项目的部署说明，支持多种部署方式。

##  本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:5000
```

## 📦 生产构建

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

##  部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 点击部署

### Vercel 环境变量配置

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `DATABASE_URL` | 数据库连接字符串 | `postgresql://...` |
| `AUTH_SECRET` | 认证密钥 | `your-secret-key` |

## 🐳 Docker 部署

### 创建 Dockerfile

```dockerfile
FROM node:24-alpine AS base

# 依赖安装
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# 构建
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# 生产运行
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

### 构建和运行

```bash
# 构建镜像
docker build -t ecommerce-training-platform .

# 运行容器
docker run -p 3000:3000 ecommerce-training-platform
```

## ️ 部署到云服务器

### 环境要求

- **Node.js**: >= 24.x
- **pnpm**: >= 9.0.0
- **PM2** (可选，用于进程管理)

### 部署步骤

```bash
# 1. 克隆代码
git clone https://github.com/your-username/ecommerce-training-platform.git
cd ecommerce-training-platform

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local

# 4. 构建
pnpm build

# 5. 使用 PM2 启动（可选）
npm install -g pm2
pm2 start npm --name "ecommerce-training" -- start

# 6. 设置开机自启（可选）
pm2 startup
pm2 save
```

### Nginx 反向代理配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 环境变量说明

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `DATABASE_URL` | 否 | 数据库连接字符串 |
| `AUTH_SECRET` | 否 | 认证密钥 |
| `AI_API_KEY` | 否 | AI 服务 API 密钥 |
| `OSS_ENDPOINT` | 否 | 对象存储端点 |
| `OSS_ACCESS_KEY_ID` | 否 | 对象存储 Access Key |
| `OSS_ACCESS_KEY_SECRET` | 否 | 对象存储 Secret Key |
| `OSS_BUCKET_NAME` | 否 | 对象存储 Bucket 名称 |

## 📊 性能优化建议

1. **启用 CDN**：静态资源使用 CDN 加速
2. **图片优化**：使用 Next.js Image 组件
3. **代码分割**：使用动态导入减少初始包大小
4. **缓存策略**：配置合理的缓存头
5. **数据库连接池**：使用连接池管理数据库连接

## 🔒 安全建议

1. **环境变量**：不要将敏感信息硬编码在代码中
2. **HTTPS**：生产环境必须使用 HTTPS
3. **依赖更新**：定期更新依赖包
4. **安全扫描**：使用 `npm audit` 检查安全漏洞

---

如有部署问题，请提交 [Issue](https://github.com/your-username/ecommerce-training-platform/issues)。
