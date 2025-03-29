# Custom Hooks Guide 🎣 自定义Hook指南

## Overview 概览 🌟

Custom hooks allow us to extract component logic into reusable functions.
自定义Hook允许我们将组件逻辑提取为可重用的函数。

## Core Hooks 核心Hook 📌

### useScrollPosition 滚动位置Hook

```javascript
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};
```

> [!NOTE]
> 用于跟踪页面滚动位置
> Used to track page scroll position

### useWindowSize 窗口尺寸Hook

```javascript
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
```

## Data Hooks 数据Hook 💾

### useLocalStorage 本地存储Hook

```javascript
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
```

## UI Hooks 界面Hook 🎨

### useTheme 主题Hook

```javascript
const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};
```

## Best Practices 最佳实践 💡

### 1. Naming Conventions 命名约定

> [!TIP]
>
> - 使用 `use` 前缀
> - 采用驼峰命名法
> - 名称应表明用途

### 2. Composition Pattern 组合模式

```javascript
// 好的实践 Good Practice
const useComposedHook = () => {
  const scrollPosition = useScrollPosition();
  const { width } = useWindowSize();

  return {
    isScrolled: scrollPosition > 50,
    isMobile: width < 768,
  };
};
```

## Performance Tips 性能提示 ⚡

### 1. Dependencies 依赖项

```javascript
// 避免 Avoid
useEffect(() => {
  // ...
}); // 没有依赖数组

// 推荐 Recommended
useEffect(() => {
  // ...
}, [dependency]); // 明确的依赖
```

### 2. Memoization 记忆化

```javascript
const useMemoizedValue = (value) => {
  return useMemo(() => {
    return expensiveCalculation(value);
  }, [value]);
};
```

## Hook Guidelines Hook指南 📋

### Do's ✅

1. 在组件顶层调用Hooks
2. 只在React函数中使用Hooks
3. 使用描述性名称
4. 保持Hooks简单且专注

### Don'ts ❌

1. 在条件语句中使用Hooks
2. 在循环中使用Hooks
3. 在常规函数中使用Hooks
4. 破坏Hooks的调用顺序

## Testing Hooks 测试Hook 🧪

```javascript
import { renderHook, act } from '@testing-library/react-hooks';

describe('useCustomHook', () => {
  it('updates value', () => {
    const { result } = renderHook(() => useCustomHook());

    act(() => {
      result.current.update();
    });

    expect(result.current.value).toBe(expected);
  });
});
```

## Error Handling 错误处理 🔧

```javascript
const useSafeHook = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      // 操作 operations
    } catch (err) {
      setError(err);
      console.error('Hook Error:', err);
    }
  }, []);

  return { data, error };
};
```

## Resources 资源 📚

- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Custom Hooks Guide](https://reactjs.org/docs/hooks-custom.html)
- [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)
