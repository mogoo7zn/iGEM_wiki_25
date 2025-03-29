import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import * as d3 from 'd3';
import styles from './molecules.module.scss';

// Define elementRadii at the component level so it's available everywhere
const elementRadii = {
  C: 5.5,
  H: 3.5,
  O: 6.0,
  N: 6.0,
  P: 6.5,
  S: 6.5,
  F: 5.5,
  Cl: 6.0,
  Br: 6.5,
  I: 7.0,
};

const MoleculeViewer = React.memo(
  ({ molecule, className, options = {} }) => {
    const viewerRef = useRef(null);
    // 添加状态保存图形数据，避免重新计算
    const [graphData, setGraphData] = useState(null);
    // 添加状态记录初始渲染是否完成
    const [rendered, setRendered] = useState(false);
    // 保存容器尺寸信息
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    // Add ref to track if initial render was completed
    const initialRenderDoneRef = useRef(false);

    // 简化的清理函数
    const cleanup = useCallback(() => {
      if (viewerRef.current) {
        d3.select(viewerRef.current).selectAll('*').remove();
      }
    }, []);

    // 修改函数签名，确保接收和使用options参数
    const createGraphDataFromMolecule = useMemo(() => {
      return (molecule, userOptions = {}) => {
        if (!molecule || !molecule.atoms || Object.keys(molecule.atoms).length === 0) {
          console.warn('Invalid molecule provided');
          return { nodes: [], links: [] };
        }

        // 使用传入的选项而不是外部变量
        const opts = userOptions;

        console.log('Creating graph data for molecule:', molecule.name);

        // 提取SMILES获取更好的结构检测
        const smiles = molecule.properties?.smiles || '';
        console.log('SMILES:', smiles);

        // 检测分子类型
        const ringNumbers = smiles.match(/\d/g) || [];
        const uniqueRingNumbers = new Set(ringNumbers);
        const isBicyclic =
          smiles === 'C1CCCCC1=C1CC1' ||
          (smiles.includes('C1') && smiles.includes('=C1')) ||
          (uniqueRingNumbers.size > 1 && smiles.includes('='));

        const isComplexRing =
          uniqueRingNumbers.size > 1 ||
          ringNumbers.length > uniqueRingNumbers.size * 2 ||
          (smiles.includes('=') && smiles.includes('1')) ||
          smiles.includes('@') ||
          (smiles.match(/C1|1C/g) || []).length > 1;

        const isBenzene = smiles === 'C1=CC=CC=C1';
        const isCyclohexane = smiles === 'C1CCCCC1';
        const isEthanol = smiles === 'CCO';
        const isPenicillin = molecule.name?.includes('Penicillin') || smiles.includes('N2C(S1)');
        const isFusedRing = smiles.includes('C12') || smiles.includes('C21');

        // 获取所有原子
        const allAtoms = Object.entries(molecule.atoms);
        const nodes = [];
        const links = [];
        const nodeMap = new Map();

        // 对于复杂分子，使用力导向布局
        if (isComplexRing || isPenicillin || isFusedRing || allAtoms.length > 15) {
          console.log('Using force-directed layout for complex molecule');

          // 创建节点
          allAtoms.forEach(([id, atom]) => {
            // 根据选项跳过氢原子
            if (!opts.showHydrogens && (atom.element === 'H' || atom.name === 'H')) {
              return;
            }

            const element = atom.element || atom.name || 'C';
            const node = {
              id: id,
              element: element,
              x: Math.random() * 50 - 25, // 随机初始位置
              y: Math.random() * 50 - 25,
            };

            nodes.push(node);
            nodeMap.set(id, node);
          });

          // 创建键
          if (molecule.bonds) {
            Object.entries(molecule.bonds).forEach(([id, bond]) => {
              const sourceId = bond.source || bond.atoms?.[0] || bond.from || '';
              const targetId = bond.target || bond.atoms?.[1] || bond.to || '';

              if (!sourceId || !targetId) return;

              const source = nodeMap.get(sourceId.toString());
              const target = nodeMap.get(targetId.toString());

              if (!source || !target) return;

              const order = bond.order || 1;

              links.push({
                id: id,
                source: source,
                target: target,
                order: order,
              });
            });
          }

          // 使用D3力导向模拟来确定原子位置
          const simulation = d3
            .forceSimulation(nodes)
            .force(
              'link',
              d3
                .forceLink(links)
                .id((d) => d.id)
                .distance(opts.bondDistance || 8) // 使用配置的键距离
            )
            .force('charge', d3.forceManyBody().strength(-130)) // 减弱排斥力，使分子更紧凑
            .force('center', d3.forceCenter(0, 0))
            .force(
              'collision',
              d3.forceCollide().radius((d) => {
                // 避免原子重叠，更精确地计算碰撞半径
                const element = d.element || 'C';
                const atomMultiplier = opts.atomRadiusMultiplier || 0.6;
                const radius = elementRadii[element] || 5;
                // 减小碰撞半径以允许原子更紧凑
                return radius * atomMultiplier * 0.7;
              })
            )
            .stop();

          // 同步运行模拟一次性计算布局
          const iterations = opts.simulationIterations || 300;
          for (let i = 0; i < iterations; i++) {
            simulation.tick();
          }
        } else {
          // 对于简单分子，使用手动布局（环或线性）
          // ...保留现有的简单分子布局代码...
          const heavyAtoms = allAtoms.filter(([id, atom]) => {
            return atom.element !== 'H' && atom.name !== 'H';
          });

          const mainAtoms = heavyAtoms.map(([id]) => id);
          const mainAtomCount = mainAtoms.length;

          // 根据分子类型计算适当的半径
          let radius = 25;

          // 为主要结构原子创建节点并适当定位
          heavyAtoms.forEach(([id, atom], index) => {
            let x, y;

            if (isBenzene || isCyclohexane || smiles.includes('1')) {
              // 环状结构的六边形排列
              const angle = (2 * Math.PI * index) / mainAtomCount;
              x = radius * Math.cos(angle);
              y = radius * Math.sin(angle);
            } else if (isEthanol) {
              // 乙醇(CCO)的特定排列
              if (index === 0)
                (x = -radius), (y = 0); // 第一个C
              else if (index === 1)
                (x = 0), (y = 0); // 第二个C
              else (x = radius), (y = 0); // O
            } else {
              // 其他分子的线性或锯齿形排列
              const step = mainAtomCount > 1 ? (2 * radius) / (mainAtomCount - 1) : 0;
              x = -radius + index * step;
              y = (index % 2) * 10; // 小锯齿增加可见度
            }

            // 确保元素正确
            const element = atom.element || atom.name || 'C';

            const node = {
              id: id,
              element: element,
              x: x,
              y: y,
            };

            nodes.push(node);
            nodeMap.set(id, node);
          });

          // 在主要结构原子之间创建键
          if (molecule.bonds) {
            // ...处理键的代码...
            Object.entries(molecule.bonds).forEach(([id, bond]) => {
              const sourceId = bond.source || bond.atoms?.[0] || bond.from || '';
              const targetId = bond.target || bond.atoms?.[1] || bond.to || '';

              if (!nodeMap.has(sourceId.toString()) || !nodeMap.has(targetId.toString())) {
                return;
              }

              const source = nodeMap.get(sourceId.toString());
              const target = nodeMap.get(targetId.toString());

              let order = bond.order || 1;

              if (isBenzene && mainAtomCount === 6) {
                // 苯的特殊处理，交替的单/双键
                const sourceIndex = mainAtoms.indexOf(sourceId.toString());
                const targetIndex = mainAtoms.indexOf(targetId.toString());

                if (
                  (Math.abs(sourceIndex - targetIndex) === 1 ||
                    (sourceIndex === 0 && targetIndex === 5) ||
                    (sourceIndex === 5 && targetIndex === 0)) &&
                  sourceIndex !== -1 &&
                  targetIndex !== -1
                ) {
                  const minIndex = Math.min(sourceIndex, targetIndex);
                  const maxIndex = Math.max(sourceIndex, targetIndex);
                  const isLastBond = minIndex === 0 && maxIndex === 5;

                  if (isLastBond) {
                    order = 1;
                  } else {
                    order = minIndex % 2 === 0 ? 2 : 1;
                  }
                }
              }

              links.push({
                id: id,
                source: source,
                target: target,
                order: order,
              });
            });
          } else if (isBenzene || isCyclohexane || smiles.includes('1')) {
            // 如果没有明确的键信息，创建环键
            for (let i = 0; i < mainAtomCount; i++) {
              const nextIndex = (i + 1) % mainAtomCount;

              const source = nodeMap.get(mainAtoms[i]);
              const target = nodeMap.get(mainAtoms[nextIndex]);

              if (!source || !target) continue;

              let order = 1;
              if (isBenzene && mainAtomCount === 6) {
                order = i % 2 === 0 ? 2 : 1;
              }

              links.push({
                id: `bond_${i}_${nextIndex}`,
                source: source,
                target: target,
                order: order,
              });
            }
          } else if (mainAtomCount > 1) {
            // 没有明确键时创建线性链键
            for (let i = 0; i < mainAtomCount - 1; i++) {
              const source = nodeMap.get(mainAtoms[i]);
              const target = nodeMap.get(mainAtoms[i + 1]);

              if (!source || !target) continue;

              links.push({
                id: `bond_${i}_${i + 1}`,
                source: source,
                target: target,
                order: 1,
              });
            }
          }
        }

        // 如果启用了，添加氢原子
        if (opts.showHydrogens !== false) {
          // ...处理氢原子的代码...
          const hydrogenAtoms = allAtoms.filter(([id, atom]) => {
            return atom.element === 'H' || atom.name === 'H';
          });

          console.log(`Found ${hydrogenAtoms.length} hydrogen atoms`);

          hydrogenAtoms.forEach(([id, atom]) => {
            if (nodeMap.has(id)) return;

            let connectedAtomId = null;

            if (atom.bonds && atom.bonds.atoms && atom.bonds.atoms.length > 0) {
              connectedAtomId = atom.bonds.atoms[0];
            }

            if (!connectedAtomId && molecule.bonds) {
              for (const [bondId, bond] of Object.entries(molecule.bonds)) {
                const sourceId = bond.source || bond.atoms?.[0] || bond.from || '';
                const targetId = bond.target || bond.atoms?.[1] || bond.to || '';

                if (sourceId === id && nodeMap.has(targetId.toString())) {
                  connectedAtomId = targetId.toString();
                  break;
                } else if (targetId === id && nodeMap.has(sourceId.toString())) {
                  connectedAtomId = sourceId.toString();
                  break;
                }
              }
            }

            if (!connectedAtomId || !nodeMap.has(connectedAtomId)) {
              return;
            }

            const connectedAtom = nodeMap.get(connectedAtomId);

            connectedAtom.hCount = (connectedAtom.hCount || 0) + 1;
            const hCount = connectedAtom.hCount;

            const hRadius = 10;

            const angle =
              (2 * Math.PI * (hCount - 1)) / Math.max(4, connectedAtom.element === 'C' ? 4 : 2);
            const hx = connectedAtom.x + hRadius * Math.cos(angle);
            const hy = connectedAtom.y + hRadius * Math.sin(angle);

            const hNode = {
              id: id,
              element: 'H',
              x: hx,
              y: hy,
            };

            nodes.push(hNode);
            nodeMap.set(id, hNode);

            links.push({
              id: `h_bond_${id}`,
              source: hNode,
              target: connectedAtom,
              order: 1,
            });
          });
        }

        console.log(`Created graph data with ${nodes.length} atoms and ${links.length} bonds`);
        return { nodes, links };
      };
    }, []);

    // Memoize the graph data to prevent recalculation on every render
    const memoizedGraphData = useMemo(() => {
      if (!molecule) return null;
      if (graphData && graphData.moleculeId === molecule.name) return graphData;

      const newGraphData = createGraphDataFromMolecule(molecule, options);
      newGraphData.moleculeId = molecule.name;
      return newGraphData;
    }, [molecule, options, createGraphDataFromMolecule, graphData]);

    // Set the graph data in state when it changes
    useEffect(() => {
      if (
        memoizedGraphData &&
        (!graphData || graphData.moleculeId !== memoizedGraphData.moleculeId)
      ) {
        setGraphData(memoizedGraphData);
      }
    }, [memoizedGraphData, graphData]);

    // Store container dimensions to detect size changes
    useEffect(() => {
      if (viewerRef.current) {
        const { width, height } = viewerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    }, []);

    // Main rendering effect - only run on initial render or when data changes
    useEffect(() => {
      // Skip if already rendered and molecule hasn't changed
      if (
        initialRenderDoneRef.current &&
        rendered &&
        graphData &&
        graphData.moleculeId === molecule?.name &&
        viewerRef.current.querySelector('svg')
      ) {
        return;
      }

      if (!viewerRef.current || !molecule) {
        console.error('Missing reference or molecule data');
        return cleanup;
      }

      console.log('Rendering molecule:', molecule.name);

      // Reset the rendered state when molecule changes
      if (graphData?.moleculeId !== molecule.name) {
        setRendered(false);
      }

      // 清理先前的渲染
      cleanup();

      const container = viewerRef.current;
      const defaultOptions = {
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        bondScaleFactor: 1.2,
        atomRadiusMultiplier: 0.6,
        enableLabels: true,
        scaleFactor: 0.75,
        viewportPadding: 25,
        showHydrogens: true,
        simulationIterations: 300,
        bondDistance: 15,
      };

      const mergedOptions = { ...defaultOptions, ...options };

      // 获取尺寸
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;

      // 使用缓存的图形数据或创建新的
      const data = graphData || createGraphDataFromMolecule(molecule, mergedOptions);

      // Add safety check for data validity
      if (!data || !data.nodes || !data.links) {
        console.error('Invalid graph data', data);
        return cleanup;
      }

      // 创建SVG容器
      const svg = d3
        .select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', mergedOptions.backgroundColor);

      // 元素颜色和大小
      const elementColors = mergedOptions.useEnhancedColors
        ? {
            C: '#555555', // 更深的灰色
            H: '#FFFFFF', // 纯白色
            O: '#FF2200', // 更鲜艳的红色
            N: '#304FFF', // 更亮的蓝色
            P: '#FFA200', // 更鲜艳的橙色
            S: '#FFFF00', // 鲜艳的黄色
            F: '#7FFF00', // 更亮的绿色
            Cl: '#00FF00', // 亮绿色
            Br: '#B83D00', // 更鲜艳的棕色
            I: '#940094', // 紫色
            Na: '#0086FF', // 蓝色
            K: '#8F40D4', // 紫色
            Ca: '#00FF8C', // 青绿色
            Mg: '#8AFF00', // 浅绿色
            Fe: '#DB7F00', // 铁锈色
            B: '#FFAA77', // 浅橙色
            Li: '#CC80FF', // 紫罗兰色
          }
        : {
            C: '#444444',
            H: '#E0E0E0',
            O: '#FF0000',
            N: '#3050F8',
            P: '#FF8000',
            S: '#FFFF30',
            F: '#90E050',
            Cl: '#1FF01F',
            Br: '#A62929',
            I: '#940094',
          };

      // 使用已定义的全局elementRadii并根据atomRadiusMultiplier进行调整
      const scaledElementRadii = Object.entries(elementRadii).reduce((acc, [element, radius]) => {
        acc[element] = radius * mergedOptions.atomRadiusMultiplier;
        return acc;
      }, {});

      // 添加渐变定义以获得3D球形效果（仅添加一次）
      const defs = svg.append('defs');

      Object.keys(elementColors).forEach((element) => {
        const color = elementColors[element];
        // 更强的高光效果
        const lightColor = d3.color(color).brighter(1.5);
        // 更暗的阴影效果
        const darkColor = d3.color(color).darker(1.8);

        const gradient = defs
          .append('radialGradient')
          .attr('id', `atom-${element}-gradient`)
          .attr('cx', '30%')
          .attr('cy', '30%')
          .attr('r', '70%')
          .attr('fx', '15%') // 移动焦点使高光更明显
          .attr('fy', '15%');

        // 更多的渐变停止点以获得更平滑的3D效果
        gradient.append('stop').attr('offset', '0%').attr('stop-color', lightColor.toString());
        gradient
          .append('stop')
          .attr('offset', '35%')
          .attr('stop-color', d3.color(color).brighter(0.4).toString());
        gradient.append('stop').attr('offset', '70%').attr('stop-color', color);
        gradient.append('stop').attr('offset', '100%').attr('stop-color', darkColor.toString());

        // 强化阴影效果
        if (mergedOptions.enableShadows) {
          const filter = defs
            .append('filter')
            .attr('id', `shadow-${element}`)
            .attr('x', '-50%')
            .attr('y', '-50%')
            .attr('width', '200%')
            .attr('height', '200%');

          filter.append('feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', 2.5);
          filter.append('feOffset').attr('dx', 3).attr('dy', 3).attr('result', 'offsetblur');

          const feComponentTransfer = filter.append('feComponentTransfer');
          feComponentTransfer.append('feFuncA').attr('type', 'linear').attr('slope', 0.5);

          const feMerge = filter.append('feMerge');
          feMerge.append('feMergeNode');
          feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
        }
      });

      // 创建分子组
      const g = svg.append('g');

      // 首先添加键 - FIXED: use data.links instead of graphData.links
      const bondsGroup = g
        .selectAll('.bond-group')
        .data(data.links)
        .enter()
        .append('g')
        .attr('class', styles.bondGroup);

      // 然后添加原子（在顶层） - FIXED: use data.nodes instead of graphData.nodes
      const atoms = g
        .selectAll('.atom')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', styles.atomGroup)
        .attr('transform', (d) => `translate(${d.x},${d.y})`);

      // 渲染键
      bondsGroup.each(function (d) {
        const sourcePos = { x: d.source.x, y: d.source.y };
        const targetPos = { x: d.target.x, y: d.target.y };

        // 计算键的方向和长度
        const dx = targetPos.x - sourcePos.x;
        const dy = targetPos.y - sourcePos.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const length = Math.sqrt(dx * dx + dy * dy);

        // 计算原子中心到键起始点的距离（避免键与原子重叠）
        const sourceElement = d.source.element || 'C';
        const targetElement = d.target.element || 'C';
        const sourceRadius = elementRadii[sourceElement] || 5;
        const targetRadius = elementRadii[targetElement] || 5;

        // 调整键的起点和终点，避免与原子重叠
        const bondPadding = 0.8; // 微调这个值可以调整键与原子的间距
        const sourceOffset = sourceRadius * bondPadding;
        const targetOffset = targetRadius * bondPadding;

        // 重新计算实际键的长度和中点
        const actualLength = length - sourceOffset - targetOffset;

        // 键的宽度
        const bondWidth = 1.8 * mergedOptions.bondScaleFactor;

        const bondGroup = d3.select(this);

        // 调整键的颜色使用渐变
        const sourceColor = elementColors[sourceElement] || '#444444';
        const targetColor = elementColors[targetElement] || '#444444';

        // 创建键的线性渐变
        const bondGradientId = `bond-gradient-${d.id}`;
        defs
          .append('linearGradient')
          .attr('id', bondGradientId)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '0%')
          .selectAll('stop')
          .data([
            { offset: '0%', color: sourceColor },
            { offset: '100%', color: targetColor },
          ])
          .enter()
          .append('stop')
          .attr('offset', (d) => d.offset)
          .attr('stop-color', (d) => d.color);

        // 计算键的实际位置
        const bondStart = {
          x: sourcePos.x + (dx * sourceOffset) / length,
          y: sourcePos.y + (dy * sourceOffset) / length,
        };

        const bondEnd = {
          x: targetPos.x - (dx * targetOffset) / length,
          y: targetPos.y - (dy * targetOffset) / length,
        };

        // 单键、双键或三键渲染
        const order = d.order || 1;

        if (order === 1) {
          // 单键
          bondGroup
            .append('line')
            .attr('x1', bondStart.x)
            .attr('y1', bondStart.y)
            .attr('x2', bondEnd.x)
            .attr('y2', bondEnd.y)
            .attr('stroke', `url(#${bondGradientId})`)
            .attr('stroke-width', bondWidth)
            .attr('stroke-linecap', 'round');
        } else if (order === 2) {
          // 双键 - 两条平行线
          const perpX = -dy / length;
          const perpY = dx / length;
          const offset = bondWidth * 0.8;

          // 第一条线
          bondGroup
            .append('line')
            .attr('x1', bondStart.x + perpX * offset)
            .attr('y1', bondStart.y + perpY * offset)
            .attr('x2', bondEnd.x + perpX * offset)
            .attr('y2', bondEnd.y + perpY * offset)
            .attr('stroke', `url(#${bondGradientId})`)
            .attr('stroke-width', bondWidth * 0.7)
            .attr('stroke-linecap', 'round');

          // 第二条线
          bondGroup
            .append('line')
            .attr('x1', bondStart.x - perpX * offset)
            .attr('y1', bondStart.y - perpY * offset)
            .attr('x2', bondEnd.x - perpX * offset)
            .attr('y2', bondEnd.y - perpY * offset)
            .attr('stroke', `url(#${bondGradientId})`)
            .attr('stroke-width', bondWidth * 0.7)
            .attr('stroke-linecap', 'round');
        } else if (order === 3) {
          // 三键 - 三条平行线
          const perpX = -dy / length;
          const perpY = dx / length;
          const offset = bondWidth;

          // 中间线
          bondGroup
            .append('line')
            .attr('x1', bondStart.x)
            .attr('y1', bondStart.y)
            .attr('x2', bondEnd.x)
            .attr('y2', bondEnd.y)
            .attr('stroke', `url(#${bondGradientId})`)
            .attr('stroke-width', bondWidth * 0.7)
            .attr('stroke-linecap', 'round');

          // 上线
          bondGroup
            .append('line')
            .attr('x1', bondStart.x + perpX * offset)
            .attr('y1', bondStart.y + perpY * offset)
            .attr('x2', bondEnd.x + perpX * offset)
            .attr('y2', bondEnd.y + perpY * offset)
            .attr('stroke', `url(#${bondGradientId})`)
            .attr('stroke-width', bondWidth * 0.7)
            .attr('stroke-linecap', 'round');

          // 下线
          bondGroup
            .append('line')
            .attr('x1', bondStart.x - perpX * offset)
            .attr('y1', bondStart.y - perpY * offset)
            .attr('x2', bondEnd.x - perpX * offset)
            .attr('y2', bondEnd.y - perpY * offset)
            .attr('stroke', `url(#${bondGradientId})`)
            .attr('stroke-width', bondWidth * 0.7)
            .attr('stroke-linecap', 'round');
        }
      });

      // 为原子添加阴影效果
      atoms
        .append('circle')
        .attr('r', (d) => {
          // 计算实际半径，确保使用正确的缩放
          const baseRadius = elementRadii[d.element] || 4;
          return baseRadius * mergedOptions.atomRadiusMultiplier * 1.05;
        })
        .attr('fill', 'rgba(0,0,0,0.3)')
        .attr('transform', 'translate(3,3)') // 增加阴影偏移
        .attr('filter', 'blur(2px)'); // 增加模糊度

      // 添加具有3D效果的原子
      atoms
        .append('circle')
        .attr('r', (d) => {
          // 确保使用正确的缩放值
          const baseRadius = elementRadii[d.element] || 4;
          return baseRadius * mergedOptions.atomRadiusMultiplier;
        })
        .attr('fill', (d) => `url(#atom-${d.element}-gradient)`) // 修复这里使用正确的渐变ID
        .attr('stroke', (d) => d3.color(elementColors[d.element] || '#444444').darker(0.5))
        .attr('stroke-width', 0.5);

      // 如果启用了标签则添加
      // if (mergedOptions.enable3DEffect) {
      //   atoms
      //     .append('circle')
      //     .attr('r', (d) => {
      //       const baseRadius = elementRadii[d.element] || 4;
      //       return baseRadius * mergedOptions.atomRadiusMultiplier * 0.33;
      //     })
      //     .attr('cx', (d) => {
      //       const baseRadius = elementRadii[d.element] || 4;
      //       return -baseRadius * mergedOptions.atomRadiusMultiplier * 0.35;
      //     })
      //     .attr('cy', (d) => {
      //       const baseRadius = elementRadii[d.element] || 4;
      //       return -baseRadius * mergedOptions.atomRadiusMultiplier * 0.35;
      //     })
      //     .attr('fill', 'white')
      //     .attr('opacity', 0.7);
      // }

      if (mergedOptions.enableLabels) {
        atoms
          .append('text')
          .attr('dy', '0.3em')
          .attr('text-anchor', 'middle')
          .attr('fill', (d) => {
            // 根据元素背景色调整文本颜色以保证可读性
            const element = d.element || 'C';
            return ['C', 'H', 'S'].includes(element) ? '#000' : '#fff';
          })
          .attr('stroke', (d) => {
            const element = d.element || 'C';
            return ['C', 'H', 'S'].includes(element) ? '#000' : 'none';
          })
          .attr('stroke-width', '0.5px')
          .style('font-size', (d) => {
            // 调整字体大小以适应原子大小
            const baseRadius = elementRadii[d.element] || 4;
            const fontSize = Math.max(8, baseRadius * mergedOptions.atomRadiusMultiplier * 0.7);
            return `${fontSize}px`;
          })
          .style('font-weight', 'bold')
          .text((d) => d.element);
      }

      // 计算边界框 - FIXED: use data.nodes instead of graphData.nodes
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      data.nodes.forEach((node) => {
        minX = Math.min(minX, node.x);
        maxX = Math.max(maxX, node.x);
        minY = Math.min(minY, node.y);
        maxY = Math.max(maxY, node.y);
      });

      // 添加内边距
      const padding = mergedOptions.viewportPadding;
      minX -= padding;
      maxX += padding;
      minY -= padding;
      maxY += padding;

      // 计算中心点和宽高
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      const moleculeWidth = maxX - minX;
      const moleculeHeight = maxY - minY;

      // 计算缩放
      const scale =
        Math.min(width / moleculeWidth, height / moleculeHeight) * mergedOptions.scaleFactor;

      // 居中分子（静态）
      const staticTransform = `translate(${width / 2 - centerX * scale},${height / 2 - centerY * scale}) scale(${scale})`;
      g.attr('transform', staticTransform);

      // Mark as rendered
      setRendered(true);
      initialRenderDoneRef.current = true;

      return cleanup;
    }, [molecule, options, cleanup, createGraphDataFromMolecule, graphData, rendered]);

    return (
      <div
        ref={viewerRef}
        className={`${styles.moleculeViewer} ${className || ''}`}
        style={{ width: options.width || '100%', height: options.height || '100%' }}
      ></div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for React.memo
    // Only re-render if the molecule name changes or if options have changed meaningfully
    const prevMolecule = prevProps.molecule;
    const nextMolecule = nextProps.molecule;

    const moleculeEqual = prevMolecule?.name === nextMolecule?.name;

    // Compare relevant option properties
    const relevantOptionKeys = [
      'atomRadiusMultiplier',
      'bondScaleFactor',
      'scaleFactor',
      'showHydrogens',
    ];
    const optionsEqual = relevantOptionKeys.every(
      (key) => prevProps.options[key] === nextProps.options[key]
    );

    return moleculeEqual && optionsEqual;
  }
);

export default MoleculeViewer;
