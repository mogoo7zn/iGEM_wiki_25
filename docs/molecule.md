# 分子可视化组件 / Molecule Visualization Components

## 概述 / Overview

该分子可视化系统提供了一种灵活而强大的方式，可以在浏览器中渲染分子结构。它使用React和D3.js构建，能够提供高质量的、互动式的二维视觉展示，适用于各种分子，从简单的结构如乙醇到复杂的分子如青霉素。

This molecule visualization system provides a flexible and powerful way to render molecular structures in the browser. Built using React and D3.js, it offers high-quality, interactive 2D visualization of various molecules from simple structures like ethanol to complex molecules like penicillin.

## 组件 / Components

### 1. 分子查看器 / MoleculeViewer

核心组件，使用D3.js渲染具有3D视觉效果的分子。

#### 特性 / Features

- **自动布局** / **Automatic Layout**: 从SMILES或原子/键数据智能确定分子结构
- **增强视觉效果** / **Enhanced Visuals**: 带有渐变、阴影和适当缩放的3D效果原子
- **键的可视化** / **Bond Visualization**: 准确表示单键、双键和三键
- **可自定义** / **Customizable**: 通过`options`属性提供广泛的样式选项
- **智能检测** / **Smart Detection**: 自动识别常见分子模式（苯环等）
- **响应式** / **Responsive**: 适应容器大小并优化分子位置

#### 使用方法 / Usage

```jsx
import MoleculeViewer from '../components/common/Molecules/MoleculeViewer';

// 简单用法 / Simple usage
<MoleculeViewer
  molecule={{
    name: "水分子/Water",
    atoms: {
      "1": { element: "O" },
      "2": { element: "H" },
      "3": { element: "H" }
    },
    bonds: {
      "1": { source: "1", target: "2", order: 1 },
      "2": { source: "1", target: "3", order: 1 }
    },
    properties: {
      smiles: "O"
    }
  }}
/>

// 高级用法 / Advanced usage
<MoleculeViewer
  molecule={complexMolecule}
  options={{
    backgroundColor: "#f5f5f5",
    showHydrogens: true,
    atomRadiusMultiplier: 0.8,
    bondScaleFactor: 1.5,
    enableLabels: true,
    useEnhancedColors: true,
    scaleFactor: 0.9,
    viewportPadding: 30
  }}
  className="my-custom-viewer"
/>
```

#### 必需属性 / Required Props

- `molecule`: 包含分子结构数据的对象，格式如下：
  ```javascript
  {
    name: "分子名称",
    atoms: {
      "id1": { element: "C" },
      "id2": { element: "O" },
      // 更多原子...
    },
    bonds: {
      "id1": { source: "id1", target: "id2", order: 1 },
      // 更多化学键...
    },
    properties: {
      smiles: "CC(=O)O" // 可选但推荐
    }
  }
  ```

#### 可选属性 / Optional Props

| 属性/Property | 类型/Type | 默认值/Default | 描述/Description                                   |
| ------------- | --------- | -------------- | -------------------------------------------------- |
| `className`   | string    | -              | 容器的额外CSS类/Additional CSS class for container |
| `options`     | object    | -              | 自定义选项（见下文）/Customization options         |

#### 可用选项 / Available Options

| 选项/Option            | 类型/Type | 默认值/Default | 描述/Description                                                           |
| ---------------------- | --------- | -------------- | -------------------------------------------------------------------------- |
| `backgroundColor`      | string    | "transparent"  | 查看器背景色/Background color                                              |
| `width`                | string    | "100%"         | 查看器宽度/Viewer width                                                    |
| `height`               | string    | "100%"         | 查看器高度/Viewer height                                                   |
| `bondScaleFactor`      | number    | 1.2            | 键的粗细倍数/Bond thickness multiplier                                     |
| `atomRadiusMultiplier` | number    | 0.6            | 原子半径倍数/Atom radius multiplier                                        |
| `enableLabels`         | boolean   | true           | 是否显示元素符号/Show element symbols                                      |
| `scaleFactor`          | number    | 0.75           | 分子的整体缩放因子/Overall scale factor for the molecule                   |
| `viewportPadding`      | number    | 25             | 分子周围的填充/Padding around the molecule                                 |
| `showHydrogens`        | boolean   | true           | 是否显示氢原子/Display hydrogen atoms                                      |
| `simulationIterations` | number    | 300            | 复杂布局的力学模拟迭代次数/Force simulation iterations for complex layouts |
| `bondDistance`         | number    | 15             | 力导向布局中原子间的距离/Distance between atoms in force-directed layout   |
| `useEnhancedColors`    | boolean   | false          | 使用增强的颜色调色板/Use enhanced color palette                            |

### 2. 分子信息 / MoleculeInfo

显示从SMILES字符串派生的分子信息的组件。

#### 使用方法 / Usage

```jsx
import MoleculeInfo from '../components/common/Molecules/MoleculeInfo';

// 基本用法 / Basic usage
<MoleculeInfo smiles="CC(=O)O" />

// 带拓扑指数 / With topology indices
<MoleculeInfo smiles="c1ccccc1" showTopology={true} />
```

#### 属性 / Props

- `smiles`: 分子的SMILES字符串表示（必需）/SMILES string representation of the molecule (required)
- `showTopology`: 显示拓扑指数的布尔值（默认：false）/Boolean to display topological indices (default: false)

## 实现细节 / Implementation Details

### 渲染管道 / Rendering Pipeline

分子渲染过程遵循以下步骤：

1. **数据准备** / **Data Preparation**: 输入的分子数据转换为图结构（节点和链接）
2. **结构检测** / **Structure Detection**: 系统分析SMILES模式以检测特殊结构
3. **布局计算** / **Layout Calculation**:
   - 对于简单分子：预定义布局（苯的六边形，乙醇的线性等）
   - 对于复杂分子：使用D3的物理引擎进行力导向模拟
4. **视觉增强** / **Visual Enhancement**: 为原子添加渐变、阴影和3D效果
5. **键渲染** / **Bond Rendering**: 根据键的顺序生成化学键的视觉表示
6. **缩放和定位** / **Scaling & Positioning**: 将分子居中并缩放以获得最佳视图

### 智能分子检测 / Smart Molecule Detection

组件可以识别常见的分子模式：

| 模式/Pattern                  | 检测方法/Detection Method                          | 布局/Layout                                     |
| ----------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| 苯/Benzene                    | SMILES模式 `C1=CC=CC=C1`                           | 交替键的六边形/Hexagonal with alternating bonds |
| 环己烷/Cyclohexane            | SMILES模式 `C1CCCCC1`                              | 单键的六边形/Hexagonal with single bonds        |
| 乙醇/Ethanol                  | SMILES模式 `CCO`                                   | 线性排列/Linear arrangement                     |
| 双环化合物/Bicyclic compounds | SMILES中的多个环号/Multiple ring numbers in SMILES | 力导向/Force-directed                           |
| 青霉素/Penicillin             | 名称或结构模式/Name or structure pattern           | 力导向与优化/Force-directed with optimizations  |

### 元素样式 / Element Styling

原子以逼真的样式渲染：

- **3D效果** / **3D Effect**: 径向渐变模拟球形外观
- **元素特定颜色** / **Element-specific Colors**: 标准化学颜色方案（C:灰色，O:红色，N:蓝色等）
- **尺寸差异** / **Size Differences**: 根据相对原子半径缩放原子
- **阴影效果** / **Shadow Effects**: 细微阴影增强深度感知
- **高亮效果** / **Highlight Effects**: 原子表面光反射模拟

### 键表示 / Bond Representation

化学键根据其类型进行可视化：

- **单键** / **Single Bond**: 与连接原子匹配的渐变颜色的单线
- **双键** / **Double Bond**: 适当间距的两条平行线
- **三键** / **Triple Bond**: 三条平行线

### 力导向布局 / Force-Directed Layout

对于复杂分子，组件使用D3的物理引擎：

- **电荷力** / **Charge Forces**: 确保原子适当地相互排斥
- **链接力** / **Link Forces**: 保持适当的键距离
- **碰撞检测** / **Collision Detection**: 根据范德华半径防止原子重叠
- **居中** / **Centering**: 确保分子在视口中居中

## 可扩展性 / Extensibility

分子系统设计为可扩展：

1. **自定义分子数据** / **Custom Molecular Data**: 从各种来源导入，包括PDB、MOL或自定义JSON
2. **样式扩展** / **Style Extensions**: 添加自定义CSS以满足特殊的可视化需求
3. **新分子类型** / **New Molecule Types**: 扩展检测逻辑以适应特殊的分子结构
4. **集成** / **Integration**: 与其他组件和框架无缝协作

## 实现说明 / Implementation Notes

### 技术栈 / Technology Stack

- **React**: 组件架构和状态管理
- **D3.js**: 可视化和物理模拟
- **CSS Modules**: 样式隔离和组织

### 性能考虑 / Performance Considerations

- **优化渲染** / **Optimized Rendering**: 使用React的useCallback和useRef进行高效更新
- **延迟力学模拟** / **Lazy Force Simulation**: 仅在需要时运行物理模拟
- **SVG优化** / **SVG Optimization**: 最小化不必要的DOM元素

### 浏览器兼容性 / Browser Compatibility

组件经过测试并在所有现代浏览器中工作：

- Chrome, Firefox, Safari, Edge（最新两个版本）
- IE11，带适当的polyfills

## 示例 / Examples

### 基本示例：水分子 / Basic Example: Water Molecule

```jsx
<MoleculeViewer
  molecule={{
    name: '水分子/Water',
    atoms: {
      1: { element: 'O' },
      2: { element: 'H' },
      3: { element: 'H' },
    },
    bonds: {
      1: { source: '1', target: '2', order: 1 },
      2: { source: '1', target: '3', order: 1 },
    },
  }}
/>
```

### 复杂示例：带有自定义样式的咖啡因 / Complex Example: Caffeine with Custom Styling

```jsx
<MoleculeViewer
  molecule={{
    name: '咖啡因/Caffeine',
    properties: {
      smiles: 'CN1C=NC2=C1C(=O)N(C)C(=O)N2C',
    },
    // 如果提供了SMILES，可以省略原子和键/atoms and bonds can be omitted if SMILES is provided
  }}
  options={{
    backgroundColor: '#f8f8f8',
    atomRadiusMultiplier: 0.7,
    bondScaleFactor: 1.3,
    enableLabels: true,
    showHydrogens: false,
    useEnhancedColors: true,
  }}
/>
```

## 未来增强 / Future Enhancements

- **3D可视化** / **3D Visualization**: 使用WebGL的完整3D渲染
- **动画支持** / **Animation Support**: 分子构象之间的过渡
- **交互功能** / **Interaction Features**: 点击/悬停信息，键旋转等
- **反应可视化** / **Reaction Visualization**: 显示化学反应和过渡
- **能量可视化** / **Energy Visualization**: 显示电子密度和其他属性

## 贡献 / Contributing

要扩展或修改分子可视化系统：

1. 了解`MoleculeViewer.jsx`中的核心架构
2. 遵循已建立的模式来检测分子结构
3. 以模块化方式添加新功能，以保持代码清晰
4. 为新功能编写测试
5. 记录你的更改

## 故障排除 / Troubleshooting

### 常见问题 / Common Issues

- **分子不显示** / **Molecule not displaying**: 检查分子数据格式，特别是原子ID和键的引用
- **布局不正确** / **Incorrect layout**: 提供SMILES字符串以改善结构检测
- **性能问题** / **Performance issues**: 通过隐藏氢原子或简化大分子来减少复杂性
- **样式冲突** / **Styling conflicts**: 使用提供的className属性添加自定义样式

## 最后说明 / Final Notes

分子可视化系统在灵活性、性能和视觉质量之间取得了平衡。它设计用于教育和科学可视化需求，同时在处理复杂分子结构时保持良好的性能。
