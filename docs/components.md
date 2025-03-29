# 组件开发指南 Component Development Guide 🧩

> [⬅️ 返回文档索引](index.md) · [样式指南 ➡️](styling.md)

## Component Architecture 📐 组件架构

### Directory Structure 目录结构

```
components/
├── common/           # 通用组件
├── layout/          # 布局组件
├── molecules/       # 分子相关组件
└── sections/        # 页面区块组件
```

## Common Components 🛠️ 通用组件

### Button 按钮

> [!TIP]
> 使用组合模式实现灵活的按钮样式
> Use composition pattern for flexible button styling

```jsx
const Button = ({ children, variant = 'primary', size = 'medium', ...props }) => (
  <button className={`btn btn-${variant} btn-${size}`} {...props}>
    {children}
  </button>
);
```

### Card 卡片

```jsx
const Card = ({ title, content, image, footer }) => (
  <div className={styles.card}>
    {image && <img src={image} alt={title} />}
    <h3>{title}</h3>
    <div>{content}</div>
    {footer && <div className={styles.footer}>{footer}</div>}
  </div>
);
```

## Interactive Components 🎮 交互组件

### Dropdown 下拉菜单

```jsx
const Dropdown = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      {isOpen && (
        <ul>
          {items.map((item) => (
            <li key={item.id} onClick={() => onSelect(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Layout Components 📏 布局组件

### Container 容器

```jsx
const Container = ({ children, maxWidth = 'lg', padding = true }) => (
  <div
    className={`
    container 
    max-w-${maxWidth}
    ${padding ? 'px-4' : ''}
  `}
  >
    {children}
  </div>
);
```

## Best Practices 💡 最佳实践

### Component Organization 组件组织

> [!IMPORTANT]
>
> 1. 保持组件职责单一
> 2. 实现合理的默认值
> 3. 提供完整的PropTypes
> 4. 使用有意义的命名

### Performance Optimization 性能优化

- 使用 React.memo() 缓存组件
- 实现合理的代码分割
- 优化渲染逻辑
- 避免不必要的重渲染

## Testing Guidelines ✅ 测试指南

```javascript
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Accessibility 🌐 无障碍

> [!NOTE]
> 确保所有组件遵循WCAG准则：
>
> - 提供适当的ARIA标签
> - 确保键盘可访问性
> - 维持适当的颜色对比度

## Documentation Standards 📚 文档标准

每个组件都应包含：

- 组件描述
- Props文档
- 使用示例
- 注意事项
- 测试说明

### Example Documentation 示例文档

```jsx
/**
 * Button component that follows the design system
 *
 * @component
 * @example
 * return (
 *   <Button
 *     variant="primary"
 *     size="medium"
 *     onClick={() => console.log('clicked')}
 *   >
 *     Click Me
 *   </Button>
 * )
 */
```

## Error Handling 🔧 错误处理

```jsx
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div>Something went wrong</div>;
  }

  return children;
};
```

## Resources 📖 资源

- React Documentation
- Component Design Patterns
- Accessibility Guidelines
- Testing Best Practices
