import { forwardRef, useMemo, useCallback, useState } from 'react';
import { BaseEChart } from '@/components/BaseEChart';
import type { DAGChartProps, EChartsRef, DAGNode, DAGLink } from '@/types';
import type { EChartsOption, GraphSeriesOption } from 'echarts';

// Enhanced type definitions for better type safety
interface NodeConnectivity {
  hasIncoming: boolean;
  hasOutgoing: boolean;
  incoming: DAGLink[];
  outgoing: DAGLink[];
  isTerminal: boolean;
  isIsolated: boolean;
}

interface ProcessedNode extends DAGNode {
  hidden?: boolean;
  collapsed?: boolean;
  descendantCount?: number;
}

interface ProcessedLink extends DAGLink {
  hidden?: boolean;
}

interface ProcessedData {
  nodes: ProcessedNode[];
  links: ProcessedLink[];
}

interface EChartsNodeData {
  id: string;
  name: string;
  value?: number;
  x?: number;
  y?: number;
  symbolSize: number;
  category?: number;
  _connectivity: NodeConnectivity;
  _collapsed: boolean;
  _descendantCount?: number;
  symbol: string;
  itemStyle: {
    color: string;
    borderColor: string;
    borderWidth: number;
    shadowBlur: number;
    shadowColor: string;
  };
  label: {
    show: boolean;
    position: string;
    fontSize: number;
    fontWeight: string;
    color: string;
    formatter: (params: { data: { name: string } }) => string;
    distance: number;
    backgroundColor: string;
    borderRadius: number;
    padding: number[];
    borderColor: string;
    borderWidth: number;
  };
}

interface EChartsEventParams {
  dataType: 'node' | 'edge';
  data: EChartsNodeData | EdgeData;
}

interface EdgeData {
  source: string;
  target: string;
  value?: number;
}

/**
 * Enhanced DAG Chart component with curved and straight edge support
 */
export const DAGChart = forwardRef<EChartsRef, DAGChartProps>(
  (
    {
      data,
      layout = 'layered',
      direction = 'LR',
      edgeStyle = 'straight',
      draggable = true,
      roam = true,
      showEdgeLabels = false,
      collapsible = true,
      onNodeClick,
      onNodeDoubleClick,
      onEdgeClick,
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
    const getNodeConnectivity = useCallback((nodeId: string, links: DAGLink[]): NodeConnectivity => {
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
    const calculateLabelPosition = useCallback((connectivity: NodeConnectivity, direction: 'LR' | 'TB'): string => {
      const { hasIncoming, hasOutgoing, isTerminal, isIsolated } = connectivity;

      if (isIsolated) {
        return 'top';
      }

      if (hasIncoming && hasOutgoing) {
        return direction === 'LR' ? 'bottom' : 'bottom';
      }

      if (isTerminal) {
        if (hasIncoming && !hasOutgoing) {
          return direction === 'LR' ? 'right' : 'bottom';
        } else if (!hasIncoming && hasOutgoing) {
          return direction === 'LR' ? 'left' : 'top';
        }
      }

      return 'bottom';
    }, []);

    /**
     * Get all descendant nodes (nodes that can be reached by following outgoing edges)
     */
    const getDescendantNodes = useCallback((nodeId: string, links: DAGLink[]): Set<string> => {
      const descendants = new Set<string>();
      const visited = new Set<string>();
      const queue = [nodeId];

      while (queue.length > 0) {
        const currentNodeId = queue.shift()!;
        if (visited.has(currentNodeId)) continue;

        visited.add(currentNodeId);
        const outgoingLinks = links.filter((link) => link.source === currentNodeId);

        outgoingLinks.forEach((link) => {
          if (!visited.has(link.target)) {
            descendants.add(link.target);
            queue.push(link.target);
          }
        });
      }

      return descendants;
    }, []);

    /**
     * Get all connected nodes (ancestors and descendants)
     */
    const getConnectedNodes = useCallback((nodeId: string, links: DAGLink[]): Set<string> => {
      const visited = new Set<string>();
      const queue = [nodeId];

      // Get descendants
      while (queue.length > 0) {
        const current = queue.shift()!;
        if (visited.has(current)) continue;

        visited.add(current);
        links.filter((l) => l.source === current && !l.hidden).forEach((l) => queue.push(l.target));
      }

      // Get ancestors
      const reverseQueue = [nodeId];
      while (reverseQueue.length > 0) {
        const current = reverseQueue.shift()!;
        if (visited.has(current)) continue;

        visited.add(current);
        links.filter((l) => l.target === current && !l.hidden).forEach((l) => reverseQueue.push(l.source));
      }

      return visited;
    }, []);

    /**
     * Check if a node should be hidden (has no visible parents)
     */
    const shouldHideNode = useCallback((nodeId: string, links: DAGLink[], hiddenNodes: Set<string>): boolean => {
      const incomingLinks = links.filter((link) => link.target === nodeId);

      // If no incoming links, it's a root node, don't hide
      if (incomingLinks.length === 0) return false;

      // If all parents are hidden, hide this node
      const visibleParents = incomingLinks.filter((link) => !hiddenNodes.has(link.source));
      return visibleParents.length === 0;
    }, []);

    /**
     * Process data to handle collapsed branches - only hide descendants that have no other visible parents
     */
    const processedData: ProcessedData = useMemo(() => {
      const hiddenNodes = new Set<string>();
      const hiddenLinks = new Set<string>();
      const nodeDescendantCounts = new Map<string, number>();

      // Calculate descendants for collapsed nodes
      collapsedNodes.forEach((collapsedNodeId) => {
        const descendants = getDescendantNodes(collapsedNodeId, data.links);
        nodeDescendantCounts.set(collapsedNodeId, descendants.size);

        // Only hide descendants that don't have other visible parents
        descendants.forEach((descendantId) => {
          if (shouldHideNode(descendantId, data.links, hiddenNodes)) {
            hiddenNodes.add(descendantId);
          }
        });
      });

      // Hide links involving hidden nodes
      data.links.forEach((link) => {
        if (hiddenNodes.has(link.source) || hiddenNodes.has(link.target)) {
          hiddenLinks.add(`${link.source}-${link.target}`);
        }
        // Also hide outgoing links from collapsed nodes
        if (collapsedNodes.has(link.source)) {
          hiddenLinks.add(`${link.source}-${link.target}`);
        }
      });

      return {
        nodes: data.nodes.map((node) => ({
          ...node,
          hidden: hiddenNodes.has(node.id),
          collapsed: collapsedNodes.has(node.id),
          descendantCount: nodeDescendantCounts.get(node.id) || 0,
        })),
        links: data.links.map((link) => ({
          ...link,
          hidden: hiddenLinks.has(`${link.source}-${link.target}`),
        })),
      };
    }, [data, collapsedNodes, getDescendantNodes, shouldHideNode]);

    /**
     * Toggle collapse for a node - hide/show all descendants
     */
    const toggleNodeCollapse = useCallback((nodeId: string) => {
      setCollapsedNodes((prev) => {
        const newCollapsed = new Set(prev);

        if (newCollapsed.has(nodeId)) {
          // Expand: remove from collapsed set
          newCollapsed.delete(nodeId);
        } else {
          // Collapse: add to collapsed set
          newCollapsed.add(nodeId);
        }

        return newCollapsed;
      });
    }, []);

    /**
     * Calculate layered positions
     */
    const calculateLayeredPositions = useCallback(
      (nodes: ProcessedNode[], direction: 'LR' | 'TB'): ProcessedNode[] => {
        const levelGroups: { [level: number]: ProcessedNode[] } = {};

        nodes.forEach((node) => {
          if (node.hidden) return;
          const level = node.level || 0;
          if (!levelGroups[level]) {
            levelGroups[level] = [];
          }
          levelGroups[level].push(node);
        });

        const margin = 150;
        const levelSpacing = direction === 'LR' ? 300 : 200;
        const nodeSpacing = direction === 'LR' ? 100 : 150;

        return nodes.map((node) => {
          if (node.hidden) {
            return { ...node, x: -1000, y: -1000 };
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
            symbolSize: 25,
            draggable: node.draggable !== false ? draggable : false,
          };
        });
      },
      [draggable],
    );

    const option: EChartsOption = useMemo(() => {
      if (customOption && !data) return customOption;

      const positionedNodes =
        layout === 'layered'
          ? calculateLayeredPositions(processedData.nodes, direction)
          : processedData.nodes.map((node) => ({
              ...node,
              symbolSize: 25,
              draggable: node.draggable !== false ? draggable : false,
            }));

      const getEdgeStyleProperties = () => {
        switch (edgeStyle) {
          case 'curved':
            return { curveness: 0.3, type: 'solid' as const, width: 2 };
          default:
            return { curveness: 0, type: 'solid' as const, width: 2 };
        }
      };

      const echartsLinks = processedData.links
        .filter((link) => !link.hidden)
        .map((link) => {
          const baseEdgeStyle = getEdgeStyleProperties();

          return {
            source: link.source,
            target: link.target,
            value: link.value,
            lineStyle: {
              ...baseEdgeStyle,
              ...link.lineStyle,
            },
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
          };
        });

      const echartsNodes: EChartsNodeData[] = positionedNodes
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
            _connectivity: connectivity,
            _collapsed: node.collapsed || false,
            _descendantCount: node.descendantCount || 0,
            symbol: 'rect',
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
              color: nodeColor,
              formatter: (params: { data: { name: string; _collapsed?: boolean; _descendantCount?: number } }) => {
                const name = params.data.name;
                const collapsed = params.data._collapsed;
                const count = params.data._descendantCount ?? 0;

                let displayName = name.length > 12 ? name.substring(0, 10) + '...' : name;
                if (collapsed && count > 0) {
                  displayName += ` (${count})`;
                }
                return displayName;
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
              ? `Layered Layout (${direction === 'LR' ? 'Left-to-Right' : 'Top-to-Bottom'}) - Edge Style: ${edgeStyle}`
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
          formatter: (params: EChartsEventParams) => {
            if (params.dataType === 'edge') {
              const data = params.data as EdgeData;
              const link = processedData.links.find((l) => l.source === data.source && l.target === data.target);
              return `
                <div style="padding: 8px 12px; line-height: 1.6;">
                  <div style="font-size: 14px; font-weight: bold; color: #e74c3c; margin-bottom: 6px;">
                    ${data.source} → ${data.target}
                  </div>
                  ${link?.label ? `<div><span style="color: #666;">Relationship: </span><span style="font-weight: bold;">${link.label}</span></div>` : ''}
                  ${data.value ? `<div><span style="color: #666;">Flow: </span><span style="font-weight: bold;">${data.value}</span></div>` : ''}
                </div>
              `;
            }

            const node = params.data as EChartsNodeData;
            const categoryName = data.categories?.[node.category || 0]?.name || 'Unknown';
            const connectivity = node._connectivity;

            return `
              <div style="padding: 8px 12px; line-height: 1.6;">
                <div style="font-size: 16px; font-weight: bold; color: #2c5aa0; margin-bottom: 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px;">
                  ${node.name} ${node._collapsed ? `(${node._descendantCount} hidden)` : ''}
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
                    ? `<div style="margin-bottom: 4px;">
                        <span style="font-size: 12px; color: #666;">VALUE:</span>
                        <span style="font-size: 14px; font-weight: bold; color: #d73027; margin-left: 8px;">${node.value}</span>
                      </div>`
                    : ''
                }
                ${
                  collapsible && connectivity.outgoing.length > 0
                    ? `<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0f0f0; font-size: 11px; color: #999;">
                        Double-click to ${node._collapsed ? 'expand' : 'collapse'} descendants
                      </div>`
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
            focusNodeAdjacency: false,
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
              curveness: edgeStyle === 'curved' ? 0.3 : 0,
              opacity: 0.8,
            },
            emphasis: {
              focus: 'none',
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
      showEdgeLabels,
      getNodeConnectivity,
      calculateLabelPosition,
      highlightedBranch,
      collapsible,
      edgeStyle,
    ]);

    /**
     * Enhanced event handling with proper types and TreeChart-style animation
     */
    const enhancedProps = {
      ...props,
      onEvents: {
        ...props.onEvents,
        click: (params: unknown) => {
          const eventParams = params as EChartsEventParams;
          if (eventParams.dataType === 'node' && onNodeClick) {
            onNodeClick(eventParams.data as EChartsNodeData, eventParams);
          } else if (eventParams.dataType === 'edge' && onEdgeClick) {
            onEdgeClick(eventParams.data as EdgeData, eventParams);
          }
        },
        dblclick: (params: unknown) => {
          const eventParams = params as EChartsEventParams;
          if (eventParams.dataType === 'node' && eventParams.data && collapsible) {
            const nodeData = eventParams.data as EChartsNodeData;
            // Add delay for smooth animation like TreeChart
            setTimeout(() => {
              toggleNodeCollapse(nodeData.id);
              if (onNodeDoubleClick) {
                onNodeDoubleClick(nodeData, eventParams);
              }
            }, 100);
          }
        },
        mouseover: (params: unknown) => {
          const eventParams = params as EChartsEventParams;
          if (eventParams.dataType === 'node') {
            const nodeData = eventParams.data as EChartsNodeData;
            const connectedNodes = getConnectedNodes(nodeData.id, processedData.links);
            setHighlightedBranch(connectedNodes);
          } else if (eventParams.dataType === 'edge') {
            const edgeData = eventParams.data as EdgeData;
            const edgeNodes = new Set([edgeData.source, edgeData.target]);
            setHighlightedBranch(edgeNodes);
          }
        },
        mouseout: () => {
          setHighlightedBranch(new Set());
        },
      } as Record<string, (params: unknown) => void>,
    };

    return <BaseEChart ref={ref} option={option} {...enhancedProps} />;
  },
);

DAGChart.displayName = 'DAGChart';
