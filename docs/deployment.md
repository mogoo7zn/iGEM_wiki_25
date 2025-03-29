# Deployment Guide 🚀 部署指南

## Overview 概述 🌟

This guide covers the deployment process for our Next.js based iGEM Wiki.
本指南涵盖了基于Next.js的iGEM Wiki的部署流程。

## Pre-deployment Checklist 部署前检查清单 ✅

### 1. Environment Setup 环境设置

```bash
# 检查 Node.js 版本 Check Node.js version
node -v  # Should be >=16.0.0

# 安装依赖 Install dependencies
npm install

# 验证构建 Verify build
npm run build
```

### 2. Configuration Verification 配置验证

> [!IMPORTANT]
> Check these critical files:
> 检查这些关键文件：

```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ...其他配置 other configurations
};
```

## Build Process 构建流程 🏗️

### 1. Production Build 生产构建

```bash
# 清理缓存 Clean cache
npm run clean

# 构建项目 Build project
npm run build

# 导出静态文件 Export static files
npm run export
```

### 2. Output Validation 输出验证

Generated files structure 生成的文件结构:

```
out/
├── _next/
├── images/
├── static/
└── index.html
```

## Deployment Steps 部署步骤 📋

### 1. Static File Upload 静态文件上传

> [!NOTE]
> Upload contents of `out` directory to hosting service
> 将 `out` 目录的内容上传到托管服务

### 2. DNS Configuration DNS配置

| Type 类型 | Name 名称 | Value 值  |
| --------- | --------- | --------- |
| A         | @         | Server IP |
| CNAME     | www       | @         |

## Environment Variables 环境变量 🔐

Create `.env.production`:
创建 `.env.production`：

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ASSETS_URL=https://assets.example.com
```

## Performance Optimization 性能优化 ⚡

### 1. Asset Optimization 资源优化

```javascript
// 图片优化 Image optimization
import Image from 'next/image';

<Image src="/team.jpg" alt="Team" width={800} height={600} priority={true} />;
```

### 2. Caching Strategy 缓存策略

```nginx
# Nginx configuration Nginx配置
location /_next/static {
    expires 1y;
    add_header Cache-Control "public, no-transform";
}
```

## Monitoring 监控 📊

### 1. Performance Metrics 性能指标

- Core Web Vitals 核心网站性能
- Loading speed 加载速度
- Error rates 错误率

### 2. Error Tracking 错误追踪

```javascript
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.error('Error: ' + msg + '\nURL: ' + url);
  return false;
};
```

## Troubleshooting 故障排除 🔧

### Common Issues 常见问题

1. **404 Errors 404错误**

   ```nginx
   # Add to nginx.conf
   try_files $uri $uri.html $uri/index.html =404;
   ```

2. **Asset Loading Issues 资源加载问题**
   ```javascript
   // Update next.config.js
   basePath: '/2024',
   assetPrefix: '/2024',
   ```

### Error Recovery 错误恢复

> [!TIP]
> Keep previous deployment for quick rollback
> 保留前一次部署以便快速回滚

## Security Measures 安全措施 🔒

### 1. Headers 头部

```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";
```

### 2. Content Security Policy CSP内容安全策略

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src 'self' data: https:;"
/>
```

## Backup Strategy 备份策略 💾

### 1. Automated Backups 自动备份

```bash
# 备份脚本 Backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf backup_$DATE.tar.gz out/
```

### 2. Version Control 版本控制

```bash
# 标记发布版本 Tag release version
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Post-deployment Tasks 部署后任务 📝

### 1. Verification 验证

- [ ] Test all pages 测试所有页面
- [ ] Verify assets loading 验证资源加载
- [ ] Check performance 检查性能
- [ ] Validate links 验证链接

### 2. Documentation 文档

```markdown
## Release Notes 发布说明

Version: 1.0.0
Date: YYYY-MM-DD
Changes:

- Feature A
- Bug fix B
```

## Resources 资源 📚

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Performance Optimization](https://web.dev/optimize-website-speed/)
- [Security Best Practices](https://www.npmjs.com/package/helmet)
