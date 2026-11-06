// 零依赖静态服务器 - 仅用 Node.js 内置模块
// 用法: node static-server.js [端口] [静态目录]
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.argv[2]) || 5000;
const ROOT = path.resolve(process.argv[3] || 'out');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.mjs':  'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.map':  'application/json',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
};

function sendFile(res, filePath, status = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(status, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  // 安全：防止目录穿越
  if (urlPath.includes('..')) {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  let filePath = path.join(ROOT, urlPath);

  // 如果是目录，尝试 index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(res, filePath);
  } else {
    // SPA 回退：返回 404.html（应用外壳），让客户端路由接管
    const notFoundPath = path.join(ROOT, '404.html');
    if (fs.existsSync(notFoundPath)) {
      sendFile(res, notFoundPath, 200);
    } else {
      const indexPath = path.join(ROOT, 'index.html');
      sendFile(res, indexPath, 200);
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  电商实训平台已启动`);
  console.log(`  地址: http://localhost:${PORT}`);
  console.log(`  目录: ${ROOT}`);
  console.log(`  按 Ctrl+C 停止`);
  console.log(`========================================\n`);
});
