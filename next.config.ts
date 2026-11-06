import type { NextConfig } from 'next';
import path from 'path';

const isCozeProd = process.env.COZE_PROJECT_ENV === 'PROD';

// 在非 Coze 生产环境中，用本地兼容层替代 coze-coding-dev-sdk
// 保证本地开发 / Vercel / GitHub Pages 等平台构建运行不报错
const alias: Record<string, string> = isCozeProd
  ? {}
  : { 'coze-coding-dev-sdk': path.resolve(__dirname, 'src/lib/coze-compat.ts') };

// GitHub Pages 项目站点部署在子路径 /repo-name/ 下
// 通过 BASE_PATH 环境变量配置，本地和自定义域名部署时留空
const basePath = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  // 静态导出：生成纯 HTML，可部署到任意静态服务器（GitHub Pages / Vercel / Netlify）
  output: 'export',
  // GitHub Pages 项目站点子路径（如 /repo-name），本地留空
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // 静态导出时禁用图片优化
  images: {
    unoptimized: true,
  },
  // 静态导出下每个路由生成独立 index.html，需配合 trailingSlash
  trailingSlash: true,
  allowedDevOrigins: ['*.dev.coze.site'],
  webpack: (config) => {
    if (Object.keys(alias).length > 0) {
      config.resolve.alias = { ...config.resolve.alias, ...alias };
    }
    return config;
  },
  turbopack: {
    resolveAlias: alias,
  },
};

export default nextConfig;
