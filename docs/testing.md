# Testing Guide 🧪 测试指南

## Overview 概览 🎯

Our testing strategy encompasses unit tests, integration tests, and end-to-end testing using Jest and React Testing Library.
我们的测试策略包括使用Jest和React Testing Library的单元测试、集成测试和端到端测试。

## Testing Structure 测试结构 📁

```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── __mocks__/
└── setupTests.js
```

## Component Testing 组件测试 🧩

### Basic Component Test 基础组件测试

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

> [!TIP]
> 使用 `data-testid` 作为最后的选择器手段
> Use `data-testid` as a last resort for selectors

## Hook Testing Hook测试 🎣

### Custom Hook Test 自定义Hook测试

```javascript
import { renderHook, act } from '@testing-library/react-hooks';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
```

## Mocking 模拟 🎭

### API Mocking API模拟

```javascript
jest.mock('../api', () => ({
  fetchData: jest.fn(() => Promise.resolve({ data: 'test' })),
}));
```

### Component Mocking 组件模拟

```javascript
jest.mock('./ComplexComponent', () => {
  return function DummyComponent(props) {
    return <div data-testid="mocked">{props.children}</div>;
  };
});
```

## Best Practices 最佳实践 💡

### 1. Test Organization 测试组织

> [!IMPORTANT]
>
> - 按照功能组织测试
> - 使用清晰的测试描述
> - 遵循 AAA 模式（Arrange-Act-Assert）

### 2. Coverage Goals 覆盖率目标

| Type 类型  | Goal 目标 | Priority 优先级 |
| ---------- | --------- | --------------- |
| Components | 80%       | High 高         |
| Hooks      | 90%       | High 高         |
| Utils      | 95%       | Medium 中       |
| Pages      | 70%       | Low 低          |

### 3. Testing Checklist ✅

- [ ] 基本渲染测试 Basic rendering
- [ ] 用户交互测试 User interactions
- [ ] 错误状态测试 Error states
- [ ] 边界条件测试 Edge cases
- [ ] 可访问性测试 Accessibility

## Common Patterns 常见模式 🔄

### 1. Setup/Teardown 设置/清理

```javascript
describe('Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });
});
```

### 2. Async Testing 异步测试

```javascript
it('loads data', async () => {
  render(<DataComponent />);
  await screen.findByText('Loaded');
  expect(screen.getByText('Data')).toBeInTheDocument();
});
```

## Debugging Tips 调试技巧 🔍

> [!TIP]
>
> - 使用 `screen.debug()` 查看DOM
> - 使用 `console.log` 调试测试
> - 使用 `test.only` 运行单个测试

### Common Issues 常见问题

1. **异步测试失败 Async Test Failures**

   ```javascript
   // 错误 Wrong
   expect(element).toBeInTheDocument();

   // 正确 Correct
   await waitFor(() => {
     expect(element).toBeInTheDocument();
   });
   ```

2. **事件测试问题 Event Testing Issues**
   ```javascript
   // 推荐 Recommended
   await userEvent.click(button);
   ```

## Testing Resources 测试资源 📚

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Playground](https://testing-playground.com/)

## CI Integration CI集成 🔄

```yaml
test:
  script:
    - npm test
    - npm run test:coverage

coverage:
  threshold:
    lines: 80
    functions: 80
    branches: 80
```
