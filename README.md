# iGEM 2025 Wiki Project

## 项目简介 🌟

本项目是2025 iGEM wiki的一个简单尝试，基于Next.js 14，为iGEM团队提供现代化、组件化的网页开发框架。

## 技术文档 📚

> 📖 完整文档请查看 [文档索引](docs/index.md)

### 快速入门

- [项目结构指南](docs/projectStructure.md) - 了解项目架构和工作流
- [前端基础指南](docs/basicFrontEnd.md) - 前端开发必备知识
- [组件开发规范](docs/components.md) - 组件开发标准和实践

### 核心特性

- [状态管理](docs/state-and-api.md) - 全局状态和API集成方案
- [样式指南](docs/styling.md) - CSS模块化和主题配置
- [性能优化](docs/performance.md) - 性能监控和优化策略

### 开发工具

- [测试指南](docs/testing.md) - 单元测试和集成测试
- [调试技巧](docs/debugging.md) - 常见问题和调试方法
- [部署流程](docs/deployment.md) - 构建和部署说明

## 快速开始 🚀

### 环境要求

```bash
node -v    # >= 18.17.0
npm -v     # >= 9.0.0
```

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/mogoo7zn/iGEM_wiki_25.git
cd iGEM_wiki_25

# 安装依赖
npm install

# 启动开发
npm run dev
```

访问 http://localhost:3000 查看结果

## 项目结构 📂

```txt
.
├── docs/               # 项目文档
├── public/            # 静态资源
└── src/
    ├── components/   # React 组件
    ├── hooks/        # 自定义 Hooks
    ├── lib/          # 工具函数
    ├── pages/        # Next.js 页面路由
    └── styles/       # 全局样式
```

## 开发规范 ⚙️

### 代码规范

- 使用 ESLint 和 Prettier 进行代码格式化
- 组件使用 JavaScript 编写
- 样式采用 CSS Modules
- 遵循 React Hooks 标准规范

### Git 工作流

1. 创建功能分支

```bash
git checkout -b feature/your-feature
```

2. 提交代码

```bash
git add .
git commit -m "feat: your feature description"
```

~~3. 合并主分支~~

<!-- ```bash
git checkout main
git pull
git merge feature/your-feature
``` -->

## 常见问题 ❓

### 环境问题

```bash
# 重置环境
rm -rf node_modules
npm cache clean --force
npm install
```

### 构建问题

```bash
# 清理构建缓存
npm run clean
npm run build
```

## 更新日志 📝

- 2025-03-31: Next.js 14 升级完成
- 2025-03-25: 引入分子可视化模块
- 2025-03-06: 完成 MPA 架构转型

## 联系我们 📮

- Issue 提交: [GitHub Issues](https://github.com/mogoo7zn/iGEM_wiki_25/issues)
