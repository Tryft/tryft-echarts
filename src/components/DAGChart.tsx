import { forwardRef, useMemo, useCallback, useState } from 'react';
import { BaseEChart } from '@/components/BaseEChart';
import type { DAGChartProps, EChartsRef, DAGNode, DAGLink } from '@/types';
import type { EChartsOption, GraphSeriesOption } from 'echarts';

/**
 * Enhanced DAG (Directed Acyclic Graph) Chart component for manufacturing workflows
 *
 * Features:
 * - Square nodes with intelligent label positioning
 * - Manhattan-style (right-angled) edges
 * - Branch collapsing on double-click
 * - Enhanced branch highlighting on hover
 * - Edge labels with toggle visibility
 * - Smart label positioning based on node connectivity
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
 *       { source: 'raw1', target: 'process1', label: 'flows to' },
 *       { source: 'process1', target: 'final1', label: 'produces' }
 *     ],
 *     categories: [
 *       { name: 'Raw Materials', itemStyle: { color: '#3498db' } },
 *       { name: 'Processes', itemStyle: { color: '#e74c3c' } },
 *       { name: 'Products', itemStyle: { color: '#2ecc71' } }
 *     ]
 *   }}
 *   layout="layered"
 *   direction="LR"
 *   showEdgeLabels={true}
 *   collapsible={true}
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
      showEdgeLabels = false,
      collapsible = true,
      onNodeClick,
      onNodeDoubleClick,
      onEdgeClick,
      _onNodeDrag,
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
    const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
    const [highlightedBranch, setHighlightedBranch] = useState<Set<string>>(new Set());

    /**
     * Get node connectivity information
     */
    const getNodeConnectivity = useCallback((nodeId: string, links: DAGLink[]) => {
      const incoming = links.filter((link) => link.target === nodeId && !link.hidden);
      const outgoing = links.filter((link) => link.source === nodeId && !link.hidden);

      return {
        hasIncoming: incoming.length > 0,
        hasOutgoing: outgoing.length > 0,
        incoming,
        outgoing,
        isTerminal: incoming.length === 0 || outgoing.length === 0,
        isIsolated: incoming.length === 0 && outgoing.length === 0,
      };
    }, []);

    /**
     * Calculate intelligent label positioning based on node connectivity
     */
    const calculateLabelPosition = useCallback(
      (connectivity: ReturnType<typeof getNodeConnectivity>, direction: 'LR' | 'TB') => {
        const { hasIncoming, hasOutgoing, isTerminal, isIsolated } = connectivity;

        if (isIsolated) {
          return direction === 'LR' ? 'top' : 'top';
        }

        if (hasIncoming && hasOutgoing) {
          return direction === 'LR' ? 'bottom' : 'bottom';
        }

        if (isTerminal) {
          if (hasIncoming && !hasOutgoing) {
            // Terminal node with only incoming edges - label on the right/bottom
            return direction === 'LR' ? 'right' : 'bottom';
          } else if (!hasIncoming && hasOutgoing) {
            // Source node with only outgoing edges - label on the left/top
            return direction === 'LR' ? 'left' : 'top';
          }
        }

        return direction === 'LR' ? 'bottom' : 'bottom';
      },
      [],
    );

    /**
     * Get all nodes in a branch (downstream from a given node)
     */
    const getBranchNodes = useCallback((nodeId: string, links: DAGLink[]): Set<string> => {
      const visited = new Set<string>();
      const queue = [nodeId];

      while (queue.length > 0) {
        const currentNodeId = queue.shift()!;
        if (visited.has(currentNodeId)) {
          continue;
        }

        visited.add(currentNodeId);

        const outgoingLinks = links.filter((link) => link.source === currentNodeId && !link.hidden);

        outgoingLinks.forEach((link) => {
          if (!visited.has(link.target)) {
            queue.push(link.target);
          }
        });
      }

      return visited;
    }, []);

    /**
     * Toggle branch collapse for a node
     */
    const toggleBranchCollapse = useCallback((nodeId: string) => {
      setCollapsedNodes((prev) => {
        const newCollapsed = new Set(prev);
        if (newCollapsed.has(nodeId)) {
          newCollapsed.delete(nodeId);
        } else {
          newCollapsed.add(nodeId);
        }
        return newCollapsed;
      });
    }, []);

    /**
     * Calculate layered positions with manhattan-style layout support
     */
    const calculateLayeredPositions = useCallback(
      (nodes: DAGNode[], direction: 'LR' | 'TB') => {
        // Group nodes by level
        const levelGroups: { [level: number]: DAGNode[] } = {};

        nodes.forEach((node) => {
          if (node.hidden) {
            return;
          }
          const level = node.level || 0;
          if (!levelGroups[level]) {
            levelGroups[level] = [];
          }
          levelGroups[level].push(node);
        });

        // Calculate positions with more space for manhattan edges
        const margin = 150;
        const levelSpacing = direction === 'LR' ? 300 : 200;
        const nodeSpacing = direction === 'LR' ? 100 : 150;

        return nodes.map((node) => {
          if (node.hidden) {
            return { ...node, x: -1000, y: -1000 }; // Hide off-screen
          }

          const level = node.level || 0;
          const nodesInLevel = levelGroups[level];
          const indexInLevel = nodesInLevel.indexOf(node);
          const totalInLevel = nodesInLevel.length;

          let x: number, y: number;

          if (direction === 'LR') {
            x = margin + level * levelSpacing;
            y = margin + (indexInLevel - (totalInLevel - 1) / 2) * nodeSpacing + 250;
          } else {
            x = margin + (indexInLevel - (totalInLevel - 1) / 2) * nodeSpacing + 400;
            y = margin + level * levelSpacing;
          }

          return {
            ...node,
            x,
            y,
            symbolSize: 25, // Fixed square size
            draggable: node.draggable !== false ? draggable : false,
          };
        });
      },
      [draggable],
    );

    /**
     * Process data to handle collapsed branches
     */
    const processedData = useMemo(() => {
      const hiddenNodes = new Set<string>();
      const hiddenLinks = new Set<string>();

      // Find all nodes and links to hide based on collapsed branches
      collapsedNodes.forEach((collapsedNodeId) => {
        const branchNodes = getBranchNodes(collapsedNodeId, data.links);
        branchNodes.forEach((nodeId) => {
          if (nodeId !== collapsedNodeId) {
            hiddenNodes.add(nodeId);
          }
        });

        data.links.forEach((link) => {
          if (branchNodes.has(link.source) && link.source !== collapsedNodeId) {
            hiddenLinks.add(`${link.source}-${link.target}`);
          }
          if (branchNodes.has(link.target) && link.target !== collapsedNodeId) {
            hiddenLinks.add(`${link.source}-${link.target}`);
          }
        });
      });

      const processedNodes = data.nodes.map((node) => ({
        ...node,
        hidden: hiddenNodes.has(node.id),
        collapsed: collapsedNodes.has(node.id),
      }));

      const processedLinks = data.links.map((link) => ({
        ...link,
        hidden: hiddenLinks.has(`${link.source}-${link.target}`),
      }));

      return { nodes: processedNodes, links: processedLinks };
    }, [data, collapsedNodes, getBranchNodes]);

    const option: EChartsOption = useMemo(() => {
      if (customOption && !data) {
        return customOption;
      }

      // Calculate node positions for layered layout
      const positionedNodes =
        layout === 'layered'
          ? calculateLayeredPositions(processedData.nodes, direction)
          : processedData.nodes.map((node) => ({
            ...node,
            symbolSize: 25,
            draggable: node.draggable !== false ? draggable : false,
          }));

      // Create ECharts compatible links without our custom label property
      const echartsLinks = processedData.links
        .filter((link) => !link.hidden)
        .map((link) => ({
          source: link.source,
          target: link.target,
          value: link.value,
          lineStyle: {
            ...link.lineStyle,
            type: 'solid' as const,
            curveness: 0, // Manhattan style - no curves
          },
          // Handle edge labels separately in edgeLabel
          edgeLabel:
            showEdgeLabels && link.label
              ? {
                show: true,
                formatter: link.label,
                fontSize: 10,
                color: '#666',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 3,
                padding: [2, 4],
              }
              : { show: false },
        }));

      // Create node data with intelligent label positioning
      const echartsNodes = positionedNodes
        .filter((node) => !node.hidden)
        .map((node) => {
          const connectivity = getNodeConnectivity(node.id, processedData.links);
          const labelPosition = calculateLabelPosition(connectivity, direction);
          const nodeColor = data.categories?.[node.category || 0]?.itemStyle?.color || '#5470c6';

          return {
            id: node.id,
            name: node.name,
            value: node.value,
            x: node.x,
            y: node.y,
            symbolSize: node.symbolSize || 25,
            category: node.category,
            // Custom properties for our logic
            _connectivity: connectivity,
            _collapsed: node.collapsed || false,
            // ECharts properties
            symbol: 'rect', // Square nodes
            itemStyle: {
              color: nodeColor,
              borderColor: node.collapsed ? '#ff4444' : '#fff',
              borderWidth: node.collapsed ? 3 : 2,
              shadowBlur: highlightedBranch.has(node.id) ? 15 : 8,
              shadowColor: highlightedBranch.has(node.id) ? nodeColor : 'rgba(0, 0, 0, 0.3)',
            },
            label: {
              show: true,
              position: labelPosition,
              fontSize: 11,
              fontWeight: 'bold',
              color: nodeColor, // Same color as node
              formatter: (params: { data: { name: string } }) => {
                const name = params.data.name;
                return name.length > 12 ? name.substring(0, 10) + '...' : name;
              },
              distance: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 3,
              padding: [2, 4],
              borderColor: nodeColor,
              borderWidth: 1,
            },
          };
        });

      const generatedOption: EChartsOption = {
        title: {
          text: 'Enhanced Manufacturing Workflow (DAG)',
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (params: any) => {
            if (params.dataType === 'edge') {
              const link = processedData.links.find(
                (l) => l.source === params.data.source && l.target === params.data.target,
              );
              return `
                <div style="padding: 8px 12px; line-height: 1.6;">
                  <div style="font-size: 14px; font-weight: bold; color: #e74c3c; margin-bottom: 6px;">
                    ${params.data.source} → ${params.data.target}
                  </div>
                  ${link?.label ? `<div><span style="color: #666;">Relationship: </span><span style="font-weight: bold;">${link.label}</span></div>` : ''}
                  ${params.data.value ? `<div><span style="color: #666;">Flow: </span><span style="font-weight: bold;">${params.data.value}</span></div>` : ''}
                </div>
              `;
            }

            const node = params.data;
            const categoryName = data.categories?.[node.category || 0]?.name || 'Unknown';
            const connectivity = node._connectivity;

            return `
              <div style="padding: 8px 12px; line-height: 1.6;">
                <div style="font-size: 16px; font-weight: bold; color: #2c5aa0; margin-bottom: 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px;">
                  ${node.name} ${node._collapsed ? '(Collapsed)' : ''}
                </div>
                <div style="margin-bottom: 4px;">
                  <span style="font-size: 12px; color: #666;">CATEGORY:</span>
                  <span style="font-size: 13px; font-weight: 600; color: #1a9850; margin-left: 8px;">${categoryName}</span>
                </div>
                <div style="margin-bottom: 4px;">
                  <span style="font-size: 12px; color: #666;">CONNECTIONS:</span>
                  <span style="font-size: 13px; margin-left: 8px;">
                    ↓${connectivity.incoming.length} ↑${connectivity.outgoing.length}
                  </span>
                </div>
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
  collapsible
    ? `
                  <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0f0f0; font-size: 11px; color: #999;">
                    Double-click to ${node._collapsed ? 'expand' : 'collapse'} branch
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
            data: echartsNodes,
            links: echartsLinks,
            categories: data.categories,
            roam: roam,
            focusNodeAdjacency: false, // We handle highlighting manually
            draggable: draggable,

            ...(layout === 'force' && {
              force: {
                repulsion: force.repulsion,
                gravity: force.gravity,
                edgeLength: force.edgeLength,
                friction: force.friction,
                layoutAnimation: force.layoutAnimation,
              },
            }),

            lineStyle: {
              color: '#999',
              width: 2,
              curveness: 0, // Manhattan style
              opacity: 0.8,
            },

            emphasis: {
              focus: 'none', // We handle this manually
              itemStyle: {
                borderWidth: 4,
                shadowBlur: 15,
              },
              lineStyle: {
                width: 4,
                opacity: 1,
              },
            },

            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [0, 10],
            animation: true,
            animationDuration: 800,
            animationEasing: 'cubicOut',
          } as GraphSeriesOption,
        ],
      };

      return customOption ? { ...generatedOption, ...customOption } : generatedOption;
    }, [
      data,
      layout,
      direction,
      draggable,
      roam,
      force,
      customOption,
      calculateLayeredPositions,
      processedData,
      collapsedNodes,
      showEdgeLabels,
      getNodeConnectivity,
      calculateLabelPosition,
      highlightedBranch,
      collapsible,
    ]);

    /**
     * Enhanced event handling
     */
    const enhancedProps = {
      ...props,
      onEvents: {
        ...props.onEvents,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        click: (params: any) => {
          if (params.dataType === 'node' && params.data && onNodeClick) {
            onNodeClick(params.data, params);
          } else if (params.dataType === 'edge' && params.data && onEdgeClick) {
            const linkData = processedData.links.find(
              (l) => l.source === params.data.source && l.target === params.data.target,
            );
            if (linkData) {
              onEdgeClick(linkData, params);
            }
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dblclick: (params: any) => {
          if (params.dataType === 'node' && params.data && collapsible) {
            toggleBranchCollapse(params.data.id);
            if (onNodeDoubleClick) {
              onNodeDoubleClick(params.data, params);
            }
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mouseover: (params: any) => {
          if (params.dataType === 'node' || params.dataType === 'edge') {
            let branchNodes: Set<string>;

            if (params.dataType === 'node') {
              branchNodes = getBranchNodes(params.data.id, processedData.links);
            } else {
              // For edges, highlight the branch from source
              branchNodes = getBranchNodes(params.data.source, processedData.links);
            }

            setHighlightedBranch(branchNodes);
          }
        },
        mouseout: () => {
          setHighlightedBranch(new Set());
        },
      },
    };

    return <BaseEChart ref={ref} option={option} {...enhancedProps} />;
  },
);

DAGChart.displayName = 'DAGChart';
