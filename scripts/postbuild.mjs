// GitHub Pages SPA 回退：将首页复制为 404.html
// 这样刷新或直接访问任意路由时，GitHub Pages 会返回应用外壳，由客户端路由接管
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.cwd();
const indexPath = join(outDir, 'out', 'index.html');
const notFoundPath = join(outDir, 'out', '404.html');

if (existsSync(indexPath)) {
  copyFileSync(indexPath, notFoundPath);
  console.log('✓ Created out/404.html for GitHub Pages SPA fallback');
} else {
  console.warn('⚠ out/index.html not found, skipping 404.html creation');
}
