import { forwardRef, useMemo, useCallback } from 'react';
import { BaseEChart } from '@/components/BaseEChart';
import type { DAGChartProps, EChartsRef, DAGNode, DAGLink } from '@/types';
import type { EChartsOption } from 'echarts';

/**
 * DAG (Directed Acyclic Graph) Chart component for manufacturing workflows
 *
 * Features layered layout with proper directionality, interactive node dragging,
 * and detailed tooltips for complex production relationships.
 *
 * @example
 * ```tsx
 * <DAGChart
 *   data={{
 *     nodes: [
 *       { id: 'raw1', name: 'Raw Material 1', level: 0, category: 0 },
 *       { id: 'process1', name: 'Process 1', level: 1, category: 1 },
 *       { id: 'final1', name: 'Final Product', level: 2, category: 2 }
 *     ],
 *     links: [
 *       { source: 'raw1', target: 'process1' },
 *       { source: 'process1', target: 'final1' }
 *     ],
 *     categories: [
 *       { name: 'Raw Materials', itemStyle: { color: '#3498db' } },
 *       { name: 'Processes', itemStyle: { color: '#e74c3c' } },
 *       { name: 'Products', itemStyle: { color: '#2ecc71' } }
 *     ]
 *   }}
 *   layout="layered"
 *   direction="LR"
 *   draggable={true}
 * />
 * ```
 */
export const DAGChart = forwardRef<EChartsRef, DAGChartProps>(
  (
    {
      data,
      layout = 'layered',
      direction = 'LR',
      draggable = true,
      roam = true,
      onNodeClick,
      onEdgeClick,
      onNodeDrag,
      force = {
        repulsion: 1000,
        gravity: 0.1,
        edgeLength: [100, 200],
        friction: 0.6,
        layoutAnimation: true,
      },
      option: customOption,
      ...props
    },
    ref,
  ) => {
    /**
     * Calculate layered positions for nodes based on their level
     */
    const calculateLayeredPositions = useCallback(
      (nodes: DAGNode[], direction: 'LR' | 'TB') => {
        // Group nodes by level
        const levelGroups: { [level: number]: DAGNode[] } = {};

        nodes.forEach((node) => {
          const level = node.level || 0;
          if (!levelGroups[level]) {
            levelGroups[level] = [];
          }
          levelGroups[level].push(node);
        });

        // Calculate positions
        const margin = 100;
        const levelSpacing = direction === 'LR' ? 250 : 150;
        const nodeSpacing = direction === 'LR' ? 80 : 120;

        return nodes.map((node) => {
          const level = node.level || 0;
          const nodesInLevel = levelGroups[level];
          const indexInLevel = nodesInLevel.indexOf(node);
          const totalInLevel = nodesInLevel.length;

          let x: number, y: number;

          if (direction === 'LR') {
            x = margin + level * levelSpacing;
            y = margin + (indexInLevel - (totalInLevel - 1) / 2) * nodeSpacing + 200;
          } else {
            x = margin + (indexInLevel - (totalInLevel - 1) / 2) * nodeSpacing + 300;
            y = margin + level * levelSpacing;
          }

          return {
            ...node,
            x,
            y,
            symbolSize: node.symbolSize || 30 + (node.value || 0) / 10,
            draggable: node.draggable !== false ? draggable : false,
          };
        });
      },
      [draggable],
    );

    const option: EChartsOption = useMemo(() => {
      if (customOption && !data) {
        return customOption;
      }

      // Calculate node positions for layered layout
      const processedNodes =
        layout === 'layered'
          ? calculateLayeredPositions(data.nodes, direction)
          : data.nodes.map((node) => ({
            ...node,
            symbolSize: node.symbolSize || 30 + (node.value || 0) / 10,
            draggable: node.draggable !== false ? draggable : false,
          }));

      const generatedOption: EChartsOption = {
        title: {
          text: 'Manufacturing Workflow (DAG)',
          subtext:
            layout === 'layered'
              ? `Layered Layout (${direction === 'LR' ? 'Left-to-Right' : 'Top-to-Bottom'})`
              : 'Force-Directed Layout',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          },
          top: 20,
          left: 20,
        },
        legend: {
          data: data.categories?.map((cat) => cat.name) || [],
          orient: 'horizontal',
          top: 70,
          left: 20,
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#ccc',
          borderWidth: 1,
          textStyle: {
            color: '#333',
          },
          formatter: (params: unknown) => {
            const typedParams = params as {
              dataType?: 'node' | 'edge';
              data?: DAGNode & DAGLink;
            };

            if (typedParams.dataType === 'edge') {
              const link = typedParams.data as DAGLink;
              return `
                <div style="padding: 8px 12px; line-height: 1.6;">
                  <div style="font-size: 14px; font-weight: bold; color: #e74c3c; margin-bottom: 6px;">
                    ${link.source} → ${link.target}
                  </div>
                  ${link.value ? `<div><span style="color: #666;">Flow: </span><span style="font-weight: bold;">${link.value}</span></div>` : ''}
                </div>
              `;
            }

            const node = typedParams.data as DAGNode;
            const categoryName = data.categories?.[node.category || 0]?.name || 'Unknown';

            return `
              <div style="padding: 8px 12px; line-height: 1.6;">
                <div style="font-size: 16px; font-weight: bold; color: #2c5aa0; margin-bottom: 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px;">
                  ${node.name}
                </div>
                <div style="margin-bottom: 4px;">
                  <span style="font-size: 12px; color: #666;">CATEGORY:</span>
                  <span style="font-size: 13px; font-weight: 600; color: #1a9850; margin-left: 8px;">${categoryName}</span>
                </div>
                ${
  node.level !== undefined
    ? `
                  <div style="margin-bottom: 4px;">
                    <span style="font-size: 12px; color: #666;">LEVEL:</span>
                    <span style="font-size: 13px; font-weight: 600; color: #762a83; margin-left: 8px;">${node.level}</span>
                  </div>
                `
    : ''
}
                ${
  node.value !== undefined
    ? `
                  <div style="margin-bottom: 4px;">
                    <span style="font-size: 12px; color: #666;">VALUE:</span>
                    <span style="font-size: 14px; font-weight: bold; color: #d73027; margin-left: 8px;">${node.value}</span>
                  </div>
                `
    : ''
}
                ${
  node.description
    ? `
                  <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0f0f0;">
                    <span style="font-size: 11px; color: #999;">DESCRIPTION:</span>
                    <div style="font-size: 12px; color: #555; margin-top: 2px; font-style: italic;">${node.description}</div>
                  </div>
                `
    : ''
}
              </div>
            `;
          },
        },
        series: [
          {
            type: 'graph',
            layout: layout === 'force' ? 'force' : 'none',
            data: processedNodes,
            links: data.links,
            categories: data.categories,
            roam: roam,
            focusNodeAdjacency: true,
            draggable: draggable,
            symbol: 'circle',
            symbolSize: (_value: unknown, params: unknown) => {
              const typedParams = params as { data?: DAGNode };
              return typedParams.data?.symbolSize || 40;
            },
            ...(layout === 'force' && {
              force: {
                repulsion: force.repulsion,
                gravity: force.gravity,
                edgeLength: force.edgeLength,
                friction: force.friction,
                layoutAnimation: force.layoutAnimation,
              },
            }),
            label: {
              show: true,
              position: 'inside',
              fontSize: 11,
              fontWeight: 'bold',
              color: '#fff',
              formatter: (params: unknown) => {
                const typedParams = params as { data?: DAGNode };
                const node = typedParams.data;
                if (!node) {
                  return '';
                }

                // Truncate long names
                const name = node.name.length > 10 ? node.name.substring(0, 8) + '...' : node.name;
                return name;
              },
            },
            labelLayout: {
              hideOverlap: true,
            },
            lineStyle: {
              color: '#999',
              width: 2,
              curveness: layout === 'layered' ? 0.1 : 0.3,
              opacity: 0.8,
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              shadowBlur: 8,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
            emphasis: {
              focus: 'adjacency',
              itemStyle: {
                borderWidth: 4,
                shadowBlur: 12,
              },
              lineStyle: {
                width: 4,
                opacity: 1,
              },
              label: {
                fontSize: 12,
                fontWeight: 'bold',
              },
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [0, 8],
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicOut',
          },
        ],
      };

      return customOption ? { ...generatedOption, ...customOption } : generatedOption;
    }, [data, layout, direction, draggable, roam, force, customOption, calculateLayeredPositions]);

    const enhancedProps = {
      ...props,
      onEvents: {
        ...props.onEvents,
        ...(onNodeClick && {
          click: (params: unknown) => {
            const typedParams = params as { dataType?: 'node' | 'edge'; data?: DAGNode & DAGLink };
            if (typedParams.dataType === 'node' && typedParams.data && onNodeClick) {
              onNodeClick(typedParams.data as DAGNode, params);
            } else if (typedParams.dataType === 'edge' && typedParams.data && onEdgeClick) {
              onEdgeClick(typedParams.data as DAGLink, params);
            }
          },
        }),
        ...(onNodeDrag && {
          dataZoom: (params: unknown) => {
            // Handle drag events if needed
            console.log('Node drag event:', params);
          },
        }),
      },
    };

    return <BaseEChart ref={ref} option={option} {...enhancedProps} />;
  },
);

DAGChart.displayName = 'DAGChart';
