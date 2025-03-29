# Styling Guide 🎨 样式指南

## CSS Modules System 📦 CSS模块系统

### Structure 结构

```
styles/
├── globals/
│   ├── variables.css   # Global variables 全局变量
│   ├── reset.css      # CSS reset 样式重置
│   └── utilities.css  # Utility classes 工具类
├── components/
│   ├── Button.module.css
│   ├── Card.module.css
│   └── Navigation.module.css
└── pages/
    ├── Home.module.css
    └── Team.module.css
```

## Design Tokens 🎯 设计令牌

> [!NOTE]
> 使用CSS变量确保样式一致性
> Use CSS variables to ensure styling consistency

### Colors 颜色

```css
:root {
  --primary-100: #ebf8ff;
  --primary-500: #4299e1;
  --primary-900: #1a365d;

  --accent-100: #faf5ff;
  --accent-500: #9f7aea;
  --accent-900: #44337a;

  --gray-100: #f7fafc;
  --gray-500: #718096;
  --gray-900: #1a202c;
}
```

### Typography 排版

```css
:root {
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
}
```

## Best Practices 💡 最佳实践

### CSS Modules Usage CSS模块使用

```jsx
import styles from './Component.module.css';

const Component = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Title</h1>
  </div>
);
```

### Responsive Design 响应式设计

> [!TIP]
> 使用移动优先的设计方法
> Use mobile-first design approach

```css
.container {
  /* Mobile styles */
  padding: 1rem;

  /* Tablet styles */
  @media (min-width: 768px) {
    padding: 2rem;
  }

  /* Desktop styles */
  @media (min-width: 1024px) {
    padding: 3rem;
  }
}
```

## Animation System 🎬 动画系统

### Keyframes 关键帧

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
```

### Transitions 过渡

```css
.button {
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
}
```

## Dark Mode Support 🌓 暗色模式支持

```css
:root[data-theme='dark'] {
  --bg-primary: var(--gray-900);
  --text-primary: var(--gray-100);
}

:root[data-theme='light'] {
  --bg-primary: var(--gray-100);
  --text-primary: var(--gray-900);
}
```

## Layout Utilities 📐 布局工具

### Grid System 网格系统

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

### Flexbox Utilities Flexbox工具

```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Performance Tips ⚡ 性能提示

> [!WARNING]
> 避免以下性能陷阱：
>
> - 过度使用阴影和模糊
> - 复杂的动画
> - 大量的媒体查询

### Optimization Checklist ✅ 优化清单

- [x] 使用CSS压缩
- [ ] 实现关键CSS
- [ ] 延迟加载非关键样式
- [ ] 优化选择器性能

## Component Examples 🎯 组件示例

### Button 按钮

```css
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;

  &.primary {
    background: var(--primary-500);
    color: white;
  }

  &.secondary {
    background: var(--accent-500);
    color: white;
  }
}
```

### Card 卡片

```css
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
```

## Resources 📚 资源

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
