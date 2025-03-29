# State Management & API Integration 📊 状态管理与API集成

## Context System 上下文系统 🌍

### Available Contexts 可用的上下文

```jsx
// Page Context 页面上下文
const PageContext = React.createContext({
  currentSection: '',
  setCurrentSection: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

// Theme Context 主题上下文
const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Interaction Context 交互上下文
const InteractionContext = React.createContext({
  activeElement: null,
  setActiveElement: () => {},
  isAnimating: false,
});
```

## State Management 状态管理 💾

### Local State 局部状态

> [!TIP]
> 使用 useState 管理组件级别的状态
> Use useState for component-level state management

```jsx
const [isOpen, setIsOpen] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);
```

### Global State 全局状态

> [!IMPORTANT]
> 使用 Context 管理全局状态
> Use Context for global state management

```jsx
const PageProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PageContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
```

## API Integration API集成 🔌

### API Client API客户端

```javascript
const api = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};
```

### Data Fetching Hook 数据获取Hook

```javascript
const useData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(endpoint);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
```

## Error Handling 错误处理 🚨

### Error Boundaries 错误边界

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Error Component 错误组件

```jsx
const ErrorFallback = ({ error }) => (
  <div role="alert" className={styles.error}>
    <h2>Something went wrong 出错了</h2>
    <pre>{error.message}</pre>
  </div>
);
```

## Loading States 加载状态 ⌛

### Loading Component 加载组件

```jsx
const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.spinner}></div>
    <p>Loading... 加载中...</p>
  </div>
);
```

## Best Practices 最佳实践 💡

### 1. State Management 状态管理

> [!NOTE]
>
> - 局部状态用于UI控制
> - 全局状态用于共享数据
> - 避免状态重复

### 2. API Calls API调用

> [!WARNING]
>
> - 使用错误边界捕获错误
> - 实现请求重试机制
> - 缓存频繁请求的数据

### 3. Performance Tips 性能提示

| 优化点 Optimization | 实现方式 Implementation |
| ------------------- | ----------------------- |
| 状态更新批处理      | 使用 useCallback        |
| 避免重复渲染        | 使用 useMemo            |
| 数据缓存            | 使用 缓存策略           |

## Examples 示例 📝

### Context Usage 上下文使用

```jsx
const Section = () => {
  const { currentSection, setCurrentSection } = useContext(PageContext);
  const { theme } = useContext(ThemeContext);

  return <div className={`section ${theme}`}>{/* Content */}</div>;
};
```

### Data Fetching 数据获取

```jsx
const TeamPage = () => {
  const { data, loading, error } = useData('/api/team');

  if (loading) return <Loading />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div className={styles.team}>
      {data.members.map((member) => (
        <TeamMember key={member.id} {...member} />
      ))}
    </div>
  );
};
```

## Troubleshooting 故障排除 🔧

### Common Issues 常见问题

1. **状态更新延迟** State Update Delays

   ```jsx
   // 使用函数更新
   setCount((prev) => prev + 1);
   ```

2. **内存泄漏** Memory Leaks
   ```jsx
   useEffect(() => {
     let mounted = true;
     // ...
     return () => {
       mounted = false;
     };
   }, []);
   ```

## Resources 资源 📚

- [React Context Documentation](https://reactjs.org/docs/context.html)
- [Error Boundaries Guide](https://reactjs.org/docs/error-boundaries.html)
- [Data Fetching Best Practices](https://nextjs.org/docs/basic-features/data-fetching)
