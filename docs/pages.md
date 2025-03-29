# Next.js Pages Router Documentation / 页面路由文档

## 1. Pages Structure Overview / 页面结构概览

```
pages/
├── _app.jsx     # Application wrapper | 应用程序包装器
├── _document.jsx # Custom document | 自定义文档
├── index.jsx    # Home page (/) | 主页
└── team.jsx     # Team page (/team) | 团队页面
```

## 2. Special Pages / 特殊页面

### 2.1 \_app.jsx

- Main application wrapper that initializes pages
- 初始化页面的主应用程序包装器

- Manages global state through multiple context providers:
- 通过多个上下文提供器管理全局状态：

  - PageProvider (页面提供器)
  - ThemeProvider (主题提供器)
  - InteractionProvider (交互提供器)

- Handles performance monitoring
- 处理性能监控
- Loads global styles
- 加载全局样式
- Configures service worker for production
- 配置生产环境的服务工作器

### 2.2 \_document.jsx

- Customizes the HTML document structure
- 自定义HTML文档结构
- Manages meta tags and performance optimizations
- 管理元标签和性能优化
- Handles font loading and critical CSS
- 处理字体加载和关键CSS
- Configures external resources like FontAwesome
- 配置FontAwesome等外部资源
- Provides fallback for users with JavaScript disabled
- 为禁用JavaScript的用户提供降级方案

## 3. Route Pages / 路由页面

### 3.1 index.jsx (/)

- Home page of the wiki
- Wiki的主页
- Features multiple sections:
- 包含多个部分：
  - Banner (横幅)
  - One through Five components (一到五号组件)
- Implements scroll-based navigation
- 实现基于滚动的导航
- Uses custom layout through `getLayout`
- 通过`getLayout`使用自定义布局
- Updates active section based on scroll position
- 根据滚动位置更新活动部分

### 3.2 team.jsx (/team)

- Team information page
- 团队信息页面
- Displays team members and roles
- 显示团队成员和角色
- Components:
- 组件：
  - Banner (横幅)
  - Members list (成员列表)
  - Roles section (角色部分)
- Uses static data for team members and roles
- 使用静态数据存储团队成员和角色信息
- Implements custom layout through `getLayout`
- 通过`getLayout`实现自定义布局

## 4. Routing Features / 路由特性

### 4.1 File-based Routing / 基于文件的路由

- URLs are automatically created based on file names
- URL根据文件名自动创建
- `index.jsx` → `/`
- `team.jsx` → `/team`

### 4.2 Layout System / 布局系统

- Uses `getLayout` pattern for custom layouts
- 使用`getLayout`模式实现自定义布局
- Example 示例:

```javascript
Page.getLayout = (page) => <Layout>{page}</Layout>;
```

### 4.3 Performance Optimization / 性能优化

- Dynamic imports for non-critical components
- 非关键组件的动态导入
- Preloaded fonts and critical CSS
- 预加载字体和关键CSS
- Performance monitoring and reporting
- 性能监控和报告

## 5. Best Practices / 最佳实践

### 5.1 Code Organization / 代码组织

1. Always use the `getLayout` pattern for consistent page layouts
   始终使用`getLayout`模式以保持页面布局一致性

2. Keep page components focused on page-specific logic
   保持页面组件专注于页面特定逻辑

### 5.2 Performance & SEO / 性能与SEO

1. Use context providers for global state management
   使用上下文提供器进行全局状态管理

2. Implement proper meta tags for SEO
   实现适当的元标签以优化SEO

3. Monitor and optimize page performance
   监控和优化页面性能

## 6. Adding New Pages / 添加新页面

### 6.1 Step-by-Step Guide / 步骤指南

1. Create a new file in the `pages` directory
   在`pages`目录中创建新文件

2. Name it according to desired URL path
   根据所需的URL路径命名文件

3. Export a default React component
   导出默认的React组件

### 6.2 Example / 示例

```javascript
import React from 'react';
import Layout from '../components/layout/Layout';

const NewPage = () => {
  return <div>New Page Content</div>;
};

NewPage.getLayout = (page) => <Layout>{page}</Layout>;

export default NewPage;
```
