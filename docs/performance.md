# Performance Optimization Guide 🚀 性能优化指南

## Core Web Vitals 核心性能指标 📊

> [!IMPORTANT]
> 优化目标 Optimization Targets:
>
> - LCP (Largest Contentful Paint): < 2.5s
> - FID (First Input Delay): < 100ms
> - CLS (Cumulative Layout Shift): < 0.1

### Performance Metrics 性能指标

| Metric 指标 | Target 目标 | Current 当前 | Status 状态 |
| ----------- | ----------- | ------------ | ----------- |
| LCP         | < 2.5s      | 1.8s         | ✅ Good     |
| FID         | < 100ms     | 45ms         | ✅ Good     |
| CLS         | < 0.1       | 0.05         | ✅ Good     |

## Image Optimization 图片优化 🖼️

### 1. Next.js Image Component

```jsx
import Image from 'next/image';

// Good Practice 好的实践
<Image
  src="/team.jpg"
  alt="Team Photo"
  width={800}
  height={600}
  placeholder="blur"
  priority={isAboveTheFold}
/>;
```

### 2. Image Loading Strategy 图片加载策略

- Above the fold: `priority={true}`
- Below the fold: Lazy loading
- Background images: CSS loading with blur-up

## Code Splitting 代码分割 📦

### Dynamic Imports 动态导入

```javascript
// Component level splitting 组件级分割
const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

// Route level splitting 路由级分割
const TeamPage = dynamic(() => import('../pages/team'));
```

## State Management 状态管理 💾

### Performance Tips 性能提示

```javascript
// Optimize re-renders 优化重渲染
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Prevent unnecessary updates 防止不必要的更新
const memoizedCallback = useCallback((param) => {
  doSomething(param);
}, []);
```

## Build Optimization 构建优化 ⚙️

### 1. Bundle Analysis 打包分析

```bash
# Install analyzer 安装分析器
npm install --save-dev @next/bundle-analyzer

# Run analysis 运行分析
ANALYZE=true npm run build
```

### 2. Chunk Optimization 块优化

```javascript
// next.config.js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
    return config;
  },
};
```

## Caching Strategy 缓存策略 🗄️

### 1. HTTP Cache Headers

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 2. Local Storage Cache 本地存储缓存

```javascript
const useLocalCache = (key, initialValue) => {
  // Implementation
  // 实现详情
};
```

## Loading Optimization 加载优化 ⚡

### 1. Critical CSS 关键CSS

```javascript
// Pages/_document.js
<style
  dangerouslySetInnerHTML={{
    __html: `
      /* Critical CSS here */
      .header { /* ... */ }
      .hero { /* ... */ }
    `,
  }}
/>
```

### 2. Font Loading 字体加载

```javascript
// next.config.js
module.exports = {
  optimizeFonts: true,
  fontOptimization: {
    preload: true,
    preconnect: true,
  },
};
```

## Performance Monitoring 性能监控 📈

### Real User Monitoring (RUM) 真实用户监控

```javascript
// Implementation in _app.js
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP':
      // Handle First Contentful Paint
      break;
    case 'LCP':
      // Handle Largest Contentful Paint
      break;
    // ... other metrics
  }
}
```

## Debug Tools 调试工具 🔧

> [!TIP]
> 使用以下工具进行性能调试：
>
> - Chrome DevTools Performance Tab
> - Lighthouse
> - WebPageTest
> - React DevTools Profiler

### Performance Checklist ✅

- [ ] 实现图片优化
- [ ] 配置代码分割
- [ ] 优化字体加载
- [ ] 配置缓存策略
- [ ] 实现懒加载
- [ ] 监控性能指标

## Common Issues 常见问题 ⚠️

### 1. Memory Leaks 内存泄漏

```javascript
// 防止内存泄漏 Prevent memory leaks
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

### 2. Render Blocking 渲染阻塞

```javascript
// 避免渲染阻塞 Avoid render blocking
const deferredValue = useDeferredValue(value);
```

## Best Practices 最佳实践 💡

1. **Component Optimization 组件优化**

   - 使用 `React.memo` 缓存组件
   - 实现合理的代码分割
   - 避免不必要的重渲染

2. **Resource Loading 资源加载**

   - 优先加载关键资源
   - 延迟加载非关键资源
   - 预加载重要资源

3. **State Management 状态管理**
   - 合理使用状态管理
   - 避免状态冗余
   - 优化更新逻辑

## Resources 参考资源 📚

- [Next.js Documentation](https://nextjs.org/docs/advanced-features/measuring-performance)
- [React Performance](https://reactjs.org/docs/optimizing-performance.html)
- [Web Vitals](https://web.dev/vitals/)
- [Performance Testing Tools](https://developers.google.com/web/tools/chrome-devtools/performance)
