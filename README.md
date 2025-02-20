# Wiki-React

## 简介

本项目是2025 iGEM wiki的一个简单尝试，采用Node.js + React + WebPack搭建，具有较好的组件化网页设计和样式扩展能力。

## 配置环境(Windows)

### 1. 下载项目

若计算机未安装 `git`，请先安装 `git` ：[git下载官网](https://git-scm.com/)
使用 `git` 下载代码

```bash
git clone https://github.com/mogoo7zn/iGEM_wiki_25.git
cd iGEM_wiki_25
```

### 2. 安装 Node.js

首先，确保系统已经安装 Node.js 和 npm（Node.js的包管理器）。可以从 [Node.js官网](https://nodejs.org/) 下载并安装最新的稳定版。

### 3. 初始化项目

运行脚本，当前所有依赖参见 `package.json` 文件:

```shell
# 下载安装依赖文件
npm install
```

### 4. 启动开发环境

现在，可以通过以下步骤启动项目：

- 运行 `npm start` 启动开发服务器。
- 运行 `npm run build` 构建项目。
- 运行 `npm run preview` 查看构建结果。
- 运行 `npm analyze` 分析打包结果。
- 运行 `npm run lint` 运行代码检查。
- 运行 `npm run format` 格式化代码。

> 前端运行在 `http://localhost:3000`

## 项目结构

```txt
wiki_react_js/
├── .babelrc                  # Babel配置
├── .eslintignore             # ESLint忽略文件
├── .gitignore                # Git忽略文件
├── .prettierrc               # Prettier配置
├── LICENSE                   # 许可证文件
├── README.md                 # 项目说明文件
├── eslint.config.js          # ESLint配置文件
├── package.json              # 项目配置文件
├── webpack.config.js         # Webpack配置文件
├── public/                   # 静态资源
│   ├── index.html            # HTML模板
│   └── assets/               # 静态资源
│       ├── css/              # CSS文件
│       ├── fonts/            # 字体文件
│       │   ├── coluna/
│       │   └── ...           # 其他字体文件
│       └── images/           # 图片文件
├── src/                      # 客户端源码
│   ├── App.jsx               # 根组件
│   ├── components/           # 通用组件
│   │   ├── Common/           # 公共组件
│   │   ├── Layout/           # 布局组件
│   │   └── Loading/          # 加载组件
│   ├── features/             # 功能模块
│   ├── hooks/                # 自定义Hooks
│   ├── services/             # API服务
│   ├── styles/               # 样式文件
│   ├── utils/                # 工具函数
│   └── index.jsx             # 入口文件
```

## 开发指南

### 基础绘画网页界面指南

_面向所有非网页组成员和初步接触该项目的网页组成员_

写在开头：

**$\Large 注意$**：`public/assets/css` 目录下存放的是项目外部依赖样式文件，请勿将自己写的css文件置于此文件夹下

**$\Large 注意$**：`public` 文件夹下的 `index.html` **不要** 改动，它只是人畜无害的模板

**$\Large 注意$**：`src/components` 文件夹下所有内容请勿个人修改，如果你有任何好的改进想法，请和我(mogoo7zn)联系，我会统一修改

---

你目前需要关心的文件夹只有 `public` 和 `src` ，其余文件夹和文件不必关注。

`public` 文件夹用来存放全局共享静态资源，包括图像、影像、音频、外部依赖css等资源； `src` 文件夹用来存放网页路由（简单理解为如何跳转）逻辑，页面布局代码和工具

`public` 文件夹下，你只需要在 `assets` 中选择或添加你想用的图像，`css`，字体等静态资源，然后在 `src` 文件夹下编写代码的地方引用即可。

`src` 文件夹下，你会看到被"肢解"的网页:

`components` 下是所有组件共享的资源，而每张网页都是由一个个小的组件拼搭而成。`Common` 文件夹下定义了基本处理办法和边界纠正方法，这个文件夹你可以暂时不用管。 `Layout` 文件夹下包含所有页面通用的页眉和页尾，以及一个网页布局模板。

重点是 `features` 文件夹，将 `features` 比做一个书架，里面每一个低一层级的文件夹都像是一本书，这本书对应的就是一张网页，点开任意一个网页的文件夹，就像翻开一本书，`index.jsx` 就是这本书的目录，而 `components` 文件夹下存放的就是这本书的各个章节， 每个章节都是一个文件夹，里面有章节主要故事情节（网页组件结构）和细腻的描述修辞（css样式文件），它们合在一起构成了整个组件，一个个组件经过 `index.jsx` 链接形成完整的网页。

`hooks` 放置了网页功能效果类，如果你有想要的功能但目前没有，联系我(mogoo7zn)或网页组成员开发，`styles` 存放的是全局样式css，大概率步需要改动， `utils` 目前开发较少，如果有兴趣可以一些开发小工具放在里面

### 项目代码提交要求

_网页组成员代码**规范**，请务必在提交前至少阅读一遍_

$\large {规范}$

> **使用有意义的英文命名变量和函数，一定不要使用汉语拼音命名！**

> **详细注释，在设变量的时候加注释解释变量含义，函数需要写其功能描述！**

---

_网页组成员代码**提交要求**，请务必在提交前至少阅读一遍_

> **一定不要把无法运行的程序推到github仓库里，造成团队整体开发的麻烦！**

> **代码一定不要直接推到 main 分支，请向已有的 branch 或新建 branch 提交，由管理员审核后合并！**

> **`push` 代码之前一定先 `pull` 或 `update`，*绝对不允许* 未更新的强制 `push` ！**

> **请不要频繁的 `push` 代码到远程，确认有较大更新、修正bug或长时间未上传的零碎添加内容后才 `push` ，每一次推送请详细备注推送更新主要内容或修复的主要问题！**

### 本项目网页前端架构详解

_供需要理解改进项目的网页组成员参考_

暂无

## F&Qs

Q：我的环境用着用着被污染（安装了新的内容版本不兼容）怎么办？

A：建议执行以下指令

```cmd
# 删除现有的 node_modules 和 lock 文件
rd /s /q node_modules
# 如果使用的是powershell，则执行以下命令
remove-item -path ".\node_modules\" -recurse

del package-lock.json

# 清除 npm 缓存
npm cache clean --force

# 重新安装依赖
npm install
```

---

Q:

A:

## 附录

暂无
