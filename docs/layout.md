# Layout System Documentation 📚 布局系统文档

## Overview 总览 🌟

The layout system provides a consistent structure for all pages in our iGEM wiki. It consists of three main components:
布局系统为我们的iGEM wiki的所有页面提供了一致的结构。它由三个主要组件组成：

- 🏗️ Layout (Main container 主容器)
- 📍 Header (Navigation bar 导航栏)
- 📋 Footer (Page footer 页脚)

## Component Structure 组件结构 🔨

```
Layout
├── Header
│   ├── Logo
│   ├── Navigation Menu
│   └── Theme Toggle
├── Main Content Area
└── Footer
    ├── Quick Links
    ├── Resources
    ├── Contact Info
    └── Copyright
```

## Key Features 主要特性 ✨

### 1. Responsive Design 响应式设计 📱

- Adapts to different screen sizes 适应不同屏幕尺寸
- Mobile-friendly navigation 移动端友好的导航
- Flexible content container 灵活的内容容器

### 2. Theme Support 主题支持 🎨

- Light/Dark mode toggle 明/暗模式切换
- Smooth theme transitions 平滑的主题过渡
- Persistent theme preference 持久的主题偏好保存

### 3. Smart Header 智能头部 🎯

- Transparent on banner sections 在横幅区域透明化
- Auto-hide on scroll down 向下滚动时自动隐藏
- Dynamic height adjustment 动态高度调整

## Implementation Details 实现细节 🛠️

### Layout Component Layout组件

```jsx
<Layout>
  <Header />
  <main>{children}</main>
  <Footer />
  <ScrollToTop />
</Layout>
```

The Layout component manages:
Layout组件负责管理：

- 📏 Page structure 页面结构
- 🎭 Theme application 主题应用
- 📊 Scroll events 滚动事件
- 📐 Header height calculations 头部高度计算

### Header Component 头部组件

Features 特性：

- 🔄 Dynamic transparency 动态透明度
- 📱 Responsive navigation menu 响应式导航菜单
- 🌓 Theme toggle button 主题切换按钮
- 🔗 Navigation links 导航链接

### Footer Component 页脚组件

Sections 区块：

- ℹ️ Team information 团队信息
- 🔗 Quick links 快速链接
- 📚 Resources 资源链接
- 📞 Contact information 联系方式

## Usage Example 使用示例 💡

```jsx
// In your page file 在你的页面文件中
import Layout from '../components/layout/Layout';

const HomePage = () => {
  return (
    <Layout>
      <YourPageContent />
    </Layout>
  );
};
```

## Best Practices 最佳实践 👌

1. 🎯 Always wrap page content with Layout
   始终使用Layout包装页面内容

2. 🔍 Use semantic HTML elements
   使用语义化HTML元素

3. 📱 Test on multiple devices
   在多个设备上测试

4. ⚡ Optimize for performance
   注重性能优化

## Common Issues & Solutions 常见问题与解决方案 🔧

### Header Height Issues 头部高度问题

**Problem 问题**: Content being hidden under header
内容被头部遮挡

**Solution 解决方案**:

```css
padding-top: var(--current-header-height, 70px);
```

### Mobile Menu Issues 移动端菜单问题

**Problem 问题**: Menu not closing on navigation
导航时菜单不关闭

**Solution 解决方案**:

```jsx
onClick={() => setMenuOpen(false)}
```

## Contributing 贡献指南 🤝

When modifying the layout system, please:
修改布局系统时，请：

1. 📝 Document your changes 记录你的更改
2. 🧪 Test thoroughly 充分测试
3. 📱 Verify mobile compatibility 验证移动端兼容性
4. 🎨 Maintain theme consistency 保持主题一致性

## Need Help? 需要帮助？ 💬

Contact the development team:
联系开发团队：

- 📧 Email: team@example.edu
- 💻 GitHub: [Repository Link]
