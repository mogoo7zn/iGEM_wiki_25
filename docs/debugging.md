# Error Handling & Debugging Guide 🔍 错误处理与调试指南

## Error Boundaries 错误边界 🛡️

### Global Error Boundary 全局错误边界

```jsx
class GlobalErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## Common Error Types 常见错误类型 ⚠️

### 1. API Errors API错误

> [!WARNING]
> Handle these errors gracefully to maintain user experience
> 优雅地处理这些错误以维持用户体验

```javascript
try {
  const response = await fetchData();
  if (!response.ok) {
    throw new APIError('Failed to fetch data');
  }
} catch (error) {
  if (error instanceof APIError) {
    showErrorNotification(error.message);
  }
}
```

### 2. Component Errors 组件错误

```jsx
const SafeComponent = ({ fallback = null, children }) => {
  try {
    return children;
  } catch (error) {
    console.error('Component Error:', error);
    return fallback;
  }
};
```

## Debug Tools 调试工具 🛠️

### 1. Browser DevTools 浏览器开发工具

> [!TIP]
> 使用Chrome DevTools的React开发者工具进行组件调试
> Use Chrome DevTools with React Developer Tools for component debugging

Key Features 主要功能:

- Components tab 组件标签页
- Profiler 性能分析器
- Network tab 网络标签页
- Console 控制台

### 2. Logging Utility 日志工具

```javascript
const logger = {
  debug: (message, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error);
  },
};
```

## Performance Monitoring 性能监控 📊

### 1. Component Performance 组件性能

```javascript
const withPerformanceTracking = (WrappedComponent) => {
  return function PerformanceTracking(props) {
    useEffect(() => {
      const start = performance.now();
      return () => {
        const end = performance.now();
        logger.debug(`${WrappedComponent.name} rendered in ${end - start}ms`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};
```

### 2. Memory Leaks 内存泄漏

> [!IMPORTANT]
> Watch for these common causes of memory leaks:
> 注意这些常见的内存泄漏原因：
>
> - Unmounted component updates
> - 未卸载组件的更新
> - Event listeners
> - 事件监听器
> - Setinterval calls
> - 定时器调用

## Debug Process 调试流程 🔄

1. **Identify the Issue 识别问题**

   ```javascript
   logger.debug('Current state:', currentState);
   logger.debug('Props received:', props);
   ```

2. **Isolate the Problem 隔离问题**

   ```jsx
   <ErrorBoundary>
     <ProblemComponent />
   </ErrorBoundary>
   ```

3. **Fix and Verify 修复并验证**

   ```javascript
   // Before fix 修复前
   useEffect(() => {
     const timer = setInterval(callback, 1000);
   }, []);

   // After fix 修复后
   useEffect(() => {
     const timer = setInterval(callback, 1000);
     return () => clearInterval(timer);
   }, [callback]);
   ```

## Development Tools 开发工具 🔨

### 1. VS Code Extensions VS Code扩展

| Extension 扩展      | Purpose 用途                  |
| ------------------- | ----------------------------- |
| ESLint              | Code quality 代码质量         |
| React DevTools      | Component inspection 组件检查 |
| Debugger for Chrome | Runtime debugging 运行时调试  |

### 2. Browser Extensions 浏览器扩展

- React Developer Tools
- Redux DevTools
- Network Panel

## Common Issues & Solutions 常见问题与解决方案 💡

### 1. Infinite Loops 无限循环

```javascript
// Bad Practice 错误示范
useEffect(() => {
  setCount(count + 1);
}); // Missing dependency array

// Good Practice 正确示范
useEffect(() => {
  setCount((prev) => prev + 1);
}, []); // With proper dependency array
```

### 2. State Updates 状态更新

```javascript
// Problematic 有问题的
setState(currentState + 1);

// Better 更好的
setState((prevState) => prevState + 1);
```

## Testing Tips 测试技巧 🧪

### Unit Testing 单元测试

```javascript
describe('Component', () => {
  it('handles errors gracefully', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );
    expect(getByText(/error/i)).toBeInTheDocument();
  });
});
```

## Debugging Checklist 调试清单 ✅

1. **基础检查 Basic Checks**

   - [ ] Console errors 控制台错误
   - [ ] Network requests 网络请求
   - [ ] Component state 组件状态

2. **性能检查 Performance Checks**

   - [ ] Render cycles 渲染周期
   - [ ] Memory usage 内存使用
   - [ ] Network latency 网络延迟

3. **代码检查 Code Checks**
   - [ ] Error boundaries 错误边界
   - [ ] Effect cleanup 效果清理
   - [ ] Props validation 属性验证

## Resources 资源 📚

- [React DevTools Guide](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [Performance Monitoring](https://web.dev/monitor-total-page-memory-usage/)
- [Debugging Best Practices](https://reactjs.org/docs/error-boundaries.html)
