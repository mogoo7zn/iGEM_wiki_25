# Next.js Configuration Guide 🛠️ Next.js 配置指南

## Configuration Philosophy 配置理念 🎯

> [!NOTE]
> Our configuration focuses on three main aspects:
> 我们的配置主要关注三个方面：
>
> 1. Static Export Optimization 静态导出优化
> 2. Performance Enhancement 性能提升
> 3. Development Experience 开发体验

## Base Configuration 基础配置 ⚙️

```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true, // Enable strict mode 启用严格模式
  poweredByHeader: false, // Remove X-Powered-By header 移除特征响应头
  output: 'export', // Static HTML Export 静态HTML导出
  distDir: '.next', // Build output directory 构建输出目录
};
```

### Why These Choices? 为什么这样配置？ 🤔

| Configuration 配置项     | Purpose 目的                         | Benefit 好处                                  |
| ------------------------ | ------------------------------------ | --------------------------------------------- |
| `output: 'export'`       | Static site generation 静态站点生成  | Better hosting compatibility 更好的托管兼容性 |
| `reactStrictMode: true`  | Early problem detection 早期问题检测 | More robust code 更健壮的代码                 |
| `poweredByHeader: false` | Security enhancement 安全性增强      | Reduced attack surface 减少攻击面             |

## Path Aliases 路径别名 🗂️

> [!TIP]
> Path aliases improve code organization and maintainability
> 路径别名改善代码组织和可维护性

```javascript
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),
      '@components': path.join(__dirname, 'src/components'),
      '@styles': path.join(__dirname, 'src/styles'),
    };
    return config;
  },
};
```

### Usage Example 使用示例 💡

```javascript
// Before 之前
import Button from '../../../components/Button';

// After 之后
import Button from '@components/Button';
```

## Performance Optimizations 性能优化 ⚡

### 1. Image Optimization 图片优化

```javascript
{
  images: {
    domains: ['localhost'],    // Allowed image domains 允许的图片域名
    unoptimized: true,        // Required for static export 静态导出所需
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive sizes 响应式尺寸
  }
}
```

### 2. Bundle Optimization 打包优化

> [!IMPORTANT]
> Webpack optimization focuses on:
> Webpack优化主要关注：
>
> - Code splitting 代码分割
> - Tree shaking 树摇优化
> - Bundle size reduction 包大小减少

```javascript
{
  webpack: (config, { dev, isServer }) => {
    // Production optimizations 生产环境优化
    if (!dev && !isServer) {
      config.optimization = {
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
        },
      };
    }
    return config;
  };
}
```

## Development Tools 开发工具 🔧

### Hot Reload Enhancement 热重载增强

```javascript
{
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second 每秒检查变更
      aggregateTimeout: 300, // Delay before rebuilding 重建延迟
    };
    return config;
  };
}
```

## Environment Configuration 环境配置 🌍

### Development vs Production 开发环境与生产环境

> [!WARNING]
> Always test configuration in both environments
> 始终在两种环境中测试配置

```javascript
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Different settings for dev/prod 开发/生产环境不同设置
  assetPrefix: isProd ? '/2024' : '',
  basePath: isProd ? '/2024' : '',
};
```

## Build Process 构建流程 🏗️

1. **Development 开发环境**

   ```bash
   npm run dev     # Start development server 启动开发服务器
   ```

2. **Production 生产环境**
   ```bash
   npm run build   # Create production build 创建生产构建
   npm run export  # Generate static files 生成静态文件
   ```

## Troubleshooting 故障排除 🔍

### Common Issues 常见问题

1. **Image Optimization Issues 图片优化问题**

   > Solution: Set `unoptimized: true` for static export
   > 解决方案：静态导出时设置 `unoptimized: true`

2. **Path Alias Not Working 路径别名不生效**
   > Solution: Check tsconfig.json/jsconfig.json configuration
   > 解决方案：检查 tsconfig.json/jsconfig.json 配置

## Best Practices 最佳实践 ✨

1. **Keep It Simple 保持简单**

   - Avoid unnecessary complexity 避免不必要的复杂性
   - Document all custom configurations 记录所有自定义配置

2. **Performance First 性能优先**
   - Optimize bundle size 优化包大小
   - Enable code splitting 启用代码分割
   - Implement caching strategies 实现缓存策略

## Resources 资源 📚

- [Next.js Configuration Documentation](https://nextjs.org/docs/api-reference/next.config.js/introduction)
- [Webpack Documentation](https://webpack.js.org/configuration/)
- [Performance Optimization Guide](https://nextjs.org/docs/advanced-features/performance)
