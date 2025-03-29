# Animations & Transitions Guide 🎬 动画与过渡指南

## Overview 概述 🌟

Our wiki uses consistent animations to enhance user experience while maintaining performance. This guide outlines our animation standards and implementation details.
我们的wiki使用一致的动画来增强用户体验，同时保持良好性能。本指南概述了我们的动画标准和实现细节。

## Animation Standards 动画标准 📋

### Timing Guidelines 时间指南

| Type 类型                | Duration 持续时间 | Easing 缓动函数         |
| ------------------------ | ----------------- | ----------------------- |
| Hover 悬停               | 200ms             | ease-in-out             |
| Page Transition 页面切换 | 300ms             | ease-out                |
| Modal 模态框             | 250ms             | cubic-bezier(.4,0,.2,1) |
| Menu 菜单                | 200ms             | ease                    |

### Common Animations 常用动画

```css
/* Base Transitions 基础过渡 */
.transition-base {
  transition: all 0.2s ease-in-out;
}

/* Fade Effects 淡入淡出效果 */
.fade-enter {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 300ms,
    transform 300ms;
}

/* Scale Effects 缩放效果 */
.scale-hover {
  transition: transform 0.2s ease;
}

.scale-hover:hover {
  transform: scale(1.05);
}
```

## Implementation 实现方式 ⚙️

### 1. React Components React组件

> [!TIP]
> Use React's built-in transitions for component-level animations
> 使用React的内置过渡功能实现组件级动画

```jsx
import { CSSTransition } from 'react-transition-group';

const AnimatedComponent = ({ isVisible }) => (
  <CSSTransition in={isVisible} timeout={300} classNames="fade" unmountOnExit>
    <div className="content">{/* Content here 内容 */}</div>
  </CSSTransition>
);
```

### 2. Page Transitions 页面过渡

```jsx
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
```

### 3. Scroll Animations 滚动动画

```jsx
const ScrollReveal = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
```

## Performance Tips 性能提示 ⚡

> [!IMPORTANT]
>
> - Only animate transform and opacity properties
> - 只对transform和opacity属性进行动画处理
> - Use hardware acceleration when possible
> - 尽可能使用硬件加速
> - Avoid animating layout properties
> - 避免对布局属性进行动画处理

### CSS Performance CSS性能

```css
/* Good Practice 好的实践 */
.optimized-animation {
  transform: translateZ(0);
  will-change: transform;
  transition: transform 0.3s;
}

/* Avoid 避免 */
.poor-performance {
  transition: margin-left 0.3s;
}
```

## Animation Components 动画组件 🎨

### 1. Fade In 淡入

```jsx
export const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay }}
  >
    {children}
  </motion.div>
);
```

### 2. Slide Up 向上滑动

```jsx
export const SlideUp = ({ children }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);
```

## Interaction States 交互状态 🎯

### Hover States 悬停状态

```css
.interactive-element {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

### Active States 激活状态

```css
.button {
  transition: transform 0.1s;
}

.button:active {
  transform: scale(0.98);
}
```

## Accessibility 无障碍性 ♿

> [!NOTE]
>
> - Respect user's reduced motion preferences
> - 尊重用户的减少动画偏好
> - Provide alternatives for motion-sensitive users
> - 为对动画敏感的用户提供替代方案

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Examples 示例 📝

### Modal Animation 模态框动画

```jsx
const Modal = ({ isOpen, onClose, children }) => (
  <CSSTransition in={isOpen} timeout={250} classNames="modal" unmountOnExit>
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  </CSSTransition>
);
```

### List Animation 列表动画

```jsx
const AnimatedList = ({ items }) => (
  <motion.ul>
    {items.map((item, index) => (
      <motion.li
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {item.content}
      </motion.li>
    ))}
  </motion.ul>
);
```

## Troubleshooting 故障排除 🔧

### Common Issues 常见问题

1. **Janky Animations 卡顿动画**

   - Use transform instead of position properties
   - 使用transform代替位置属性

2. **Flash of Content 内容闪烁**

   - Set initial styles before animation starts
   - 在动画开始前设置初始样式

3. **Mobile Performance 移动端性能**
   - Reduce animation complexity on mobile
   - 在移动端减少动画复杂度

## Resources 资源 📚

- [React Transition Group](https://reactcommunity.org/react-transition-group/)
- [Framer Motion](https://www.framer.com/motion/)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
