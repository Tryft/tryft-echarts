/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { D3DAGChartProps, D3DAGNode, D3DAGPoint, D3DAGLink } from '@/types';

// TypeScript interfaces

/**
 * Renders a directed acyclic graph (DAG) using D3.js with collapsible nodes and Manhattan-style edges.
 *
 * This component provides interactive visualization of hierarchical data with support for:
 * - Force-directed and layered layouts
 * - Node collapsing/expanding
 * - Path highlighting on hover
 * - Customizable tooltips
 * - Zoom and pan interactions
 *
 * @param {D3DAGChartProps} props - Component properties
 * @see [Context7 D3 Documentation](https://context7.io/d3) for D3.js best practices
 * @see [Project Brief](memory-bank/projectbrief.md) for project requirements
 */
const D3DAGChart: React.FC<D3DAGChartProps> = ({
  data,
  width = 800,
  height = 600,
  layout = 'force',
  onNodeClick,
  onNodeDoubleClick,
  onEdgeClick,
  nodeSize = 50,
  edgeInset = 16,
  animationDuration = 750,
  enableZoom = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: string }>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [hiddenCategories, _setHiddenCategories] = useState<Set<string>>(new Set());

  // Enhanced Manhattan Edge Routing Algorithm with proper arrow positioning
  /**
   * Calculates Manhattan-style edge path points between two nodes
   *
   * @param source - Source node
   * @param target - Target node
   * @param [inset=edgeInset] - Edge inset from nodes
   * @returns Array of points defining the edge path
   */
  const manhattanEdge = useCallback(
    (source: D3DAGNode, target: D3DAGNode, inset: number = edgeInset): D3DAGPoint[] => {
      if (!source.x || !source.y || !target.x || !target.y) return [];

      const halfNode = nodeSize / 2;
      const arrowBuffer = 10; // Buffer to prevent arrow overlap with node

      // For left-to-right layout, use right side of source and left side of target
      const sourcePort = { x: source.x + halfNode - inset, y: source.y };
      const targetPort = { x: target.x - halfNode - arrowBuffer, y: target.y }; // Move AWAY from node

      // Create horizontal line then vertical turn
      const horizontalEndX = sourcePort.x + (targetPort.x - sourcePort.x) * 0.7;

      return [sourcePort, { x: horizontalEndX, y: sourcePort.y }, { x: horizontalEndX, y: targetPort.y }, targetPort];
    },
    [nodeSize, edgeInset],
  );

  // Get all nodes in complete paths through a hovered node (simplified)
  /**
   * Gets all nodes in complete paths through a given node
   *
   * @param nodeId - Starting node ID
   * @param links - All links in the graph
   * @returns Set of node IDs in connected paths
   */
  const getFullPaths = useCallback((nodeId: string, links: D3DAGLink[]): Set<string> => {
    const pathNodes = new Set<string>([nodeId]);

    // Get all ancestors (nodes that can reach this node)
    const getAncestors = (id: string, visited: Set<string> = new Set()): Set<string> => {
      if (visited.has(id)) return new Set();
      visited.add(id);

      const ancestors = new Set([id]);
      links
        .filter((l) => l.target.id === id)
        .forEach((link) => {
          const sourceAncestors = getAncestors(link.source.id, new Set(visited));
          sourceAncestors.forEach((a) => ancestors.add(a));
        });
      return ancestors;
    };

    // Get all descendants (nodes reachable from this node)
    const getDescendants = (id: string, visited: Set<string> = new Set()): Set<string> => {
      if (visited.has(id)) return new Set();
      visited.add(id);

      const descendants = new Set([id]);
      links
        .filter((l) => l.source.id === id)
        .forEach((link) => {
          const targetDescendants = getDescendants(link.target.id, new Set(visited));
          targetDescendants.forEach((d) => descendants.add(d));
        });
      return descendants;
    };

    // Add all ancestors and descendants
    const ancestors = getAncestors(nodeId);
    const descendants = getDescendants(nodeId);

    ancestors.forEach((a) => pathNodes.add(a));
    descendants.forEach((d) => pathNodes.add(d));

    return pathNodes;
  }, []);

  // Get descendants that should be hidden when node is collapsed (recursive with alternate path checking)
  /**
   * Gets descendants that should be hidden when a node is collapsed
   *
   * @param nodeId - ID of collapsed node
   * @param links - All links in the graph
   * @returns Set of node IDs to hide
   */
  const getCollapsibleDescendants = useCallback(
    (nodeId: string, links: D3DAGLink[]): Set<string> => {
      const descendants = new Set<string>();
      const toProcess = [nodeId];
      const processed = new Set<string>();

      while (toProcess.length > 0) {
        const currentId = toProcess.shift()!;
        if (processed.has(currentId)) continue;
        processed.add(currentId);

        // Find all direct children of current node
        const directChildren = links.filter((l) => l.source === currentId).map((l) => l.target);

        directChildren.forEach((childId) => {
          // Check if this child has other visible incoming edges (alternate paths)
          const otherIncomingEdges = links.filter(
            (link) =>
              link.target === childId &&
              link.source !== currentId &&
              !collapsedNodes.has(link.source) &&
              !descendants.has(link.source),
          );

          // Only hide if no alternate paths exist
          if (otherIncomingEdges.length === 0) {
            descendants.add(childId);
            toProcess.push(childId); // Continue recursively
          }
        });
      }

      return descendants;
    },
    [collapsedNodes],
  );

  // Toggle collapse for a node
  /**
   * Toggles the collapsed state of a node
   *
   * @param nodeId - ID of node to toggle
   */
  const toggleNodeCollapse = useCallback((nodeId: string) => {
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

  // Toggle category visibility
  // const toggleCategoryVisibility = useCallback((categoryName: string) => {
  //   setHiddenCategories((prev) => {
  //     const newHidden = new Set(prev);
  //     if (newHidden.has(categoryName)) {
  //       newHidden.delete(categoryName);
  //     } else {
  //       newHidden.add(categoryName);
  //     }
  //     return newHidden;
  //   });
  // }, []);

  // Stable layered layout that doesn't rearrange on collapse
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  /**
   * Applies a stable layered layout to nodes
   *
   * @param nodes - Nodes to lay out
   * @param _links - Unused links parameter
   * @param isInitial - Whether this is the initial layout
   */
  const layeredLayout = useCallback(
    (nodes: D3DAGNode[], links: D3DAGLink[], isInitial = false) => {
      // Only recalculate positions on initial render or when explicitly needed
      if (!isInitial && nodePositions.size > 0) {
        // Use existing positions for stability
        nodes.forEach((node) => {
          const pos = nodePositions.get(node.id);
          if (pos) {
            node.x = pos.x;
            node.y = pos.y;
            node.fx = pos.x;
            node.fy = pos.y;
          }
        });
        return;
      }

      const allNodes = data.nodes; // Use original data for consistent layout
      const allLinks = data.links;

      // Calculate levels using all nodes for consistent positioning
      const inDegree = new Map<string, number>();
      const outEdges = new Map<string, string[]>();

      allNodes.forEach((node) => {
        inDegree.set(node.id, 0);
        outEdges.set(node.id, []);
      });

      allLinks.forEach((link) => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        inDegree.set(targetId, (inDegree.get(targetId) || 0) + 1);
        outEdges.get(sourceId)?.push(targetId);
      });

      const queue = allNodes.filter((n) => inDegree.get(n.id) === 0);
      const levels = new Map<string, number>();

      queue.forEach((node) => levels.set(node.id, 0));

      while (queue.length > 0) {
        const node = queue.shift()!;
        const nodeLevel = levels.get(node.id) || 0;

        outEdges.get(node.id)?.forEach((targetId) => {
          const currentDegree = inDegree.get(targetId)! - 1;
          inDegree.set(targetId, currentDegree);

          const targetLevel = Math.max(levels.get(targetId) || 0, nodeLevel + 1);
          levels.set(targetId, targetLevel);

          if (currentDegree === 0) {
            const targetNode = allNodes.find((n) => n.id === targetId)!;
            queue.push(targetNode);
          }
        });
      }

      // Group nodes by level for consistent spacing
      const levelGroups = new Map<number, D3DAGNode[]>();
      allNodes.forEach((node) => {
        const level = levels.get(node.id) || 0;
        if (!levelGroups.has(level)) levelGroups.set(level, []);
        levelGroups.get(level)!.push(node);
        node.level = level;
      });

      const maxLevel = Math.max(...Array.from(levels.values()));
      const levelWidth = width / (maxLevel + 1);
      const centerY = height / 2;

      // Calculate positions for all nodes (keeps layout stable)
      const newPositions = new Map<string, { x: number; y: number }>();

      levelGroups.forEach((nodesInLevel, level) => {
        const x = (level + 0.5) * levelWidth;

        const nodeSpacing = Math.min(80, (height - 100) / Math.max(1, nodesInLevel.length - 1));
        const totalHeight = (nodesInLevel.length - 1) * nodeSpacing;
        const startY = centerY - totalHeight / 2;

        nodesInLevel.forEach((node, index) => {
          const pos = { x, y: startY + index * nodeSpacing };
          newPositions.set(node.id, pos);

          // Apply to current nodes if they exist
          const currentNode = nodes.find((n) => n.id === node.id);
          if (currentNode) {
            currentNode.x = pos.x;
            currentNode.y = pos.y;
            currentNode.fx = pos.x;
            currentNode.fy = pos.y;
            currentNode.level = level;
          }
        });
      });

      setNodePositions(newPositions);
    },
    [width, height, data, nodePositions],
  );

  // Force simulation
  const createForceSimulation = useCallback(
    (nodes: D3DAGNode[], links: D3DAGLink[]) => {
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            .id((d: any) => d.id)
            .distance(100)
            .strength(0.5),
        )
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide(nodeSize / 2 + 5));

      return simulation;
    },
    [width, height, nodeSize],
  );

  // Get category color
  const getCategoryColor = useCallback(
    (category?: string): string => {
      if (!category || !data.categories) return '#1f77b4';
      const cat = data.categories.find((c) => c.name === category);
      return cat?.itemStyle.color || '#1f77b4';
    },
    [data.categories],
  );

  // Process data based on collapsed and hidden states (fixed collapse logic)
  const processedData = useMemo(() => {
    let visibleNodes = data.nodes.filter((node) => !hiddenCategories.has(node.category || ''));

    let hiddenNodeIds = new Set<string>();
    let hiddenLinkIds = new Set<string>();

    // Step 1: Hide all outgoing edges from collapsed nodes
    data.links.forEach((link) => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      if (collapsedNodes.has(sourceId)) {
        hiddenLinkIds.add(`${sourceId}-${link.target}`);
      }
    });

    // Step 2: Find nodes to hide (those with no visible incoming edges)
    const findNodesToHide = () => {
      const currentlyHiddenNodes = new Set(hiddenNodeIds);

      data.nodes.forEach((node) => {
        if (collapsedNodes.has(node.id) || currentlyHiddenNodes.has(node.id)) return;

        // Check if this node has any visible incoming edges
        const incomingLinks = data.links.filter((link) => link.target === node.id);
        const visibleIncoming = incomingLinks.filter((link) => {
          const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
          const linkId = `${sourceId}-${link.target}`;
          return !hiddenLinkIds.has(linkId) && !currentlyHiddenNodes.has(sourceId);
        });

        // If no visible incoming edges and not a root node, hide it
        if (visibleIncoming.length === 0 && incomingLinks.length > 0) {
          hiddenNodeIds.add(node.id);
          // Also hide all outgoing edges from this now-hidden node
          data.links.forEach((outLink) => {
            const outSourceId = typeof outLink.source === 'string' ? outLink.source : outLink.source.id;
            if (outSourceId === node.id) {
              hiddenLinkIds.add(`${outSourceId}-${outLink.target}`);
            }
          });
        }
      });
    };

    // Repeat until no more nodes need hiding
    let previousHiddenCount = -1;
    while (hiddenNodeIds.size !== previousHiddenCount) {
      previousHiddenCount = hiddenNodeIds.size;
      findNodesToHide();
    }

    // Filter out hidden nodes
    visibleNodes = visibleNodes.filter((node) => !hiddenNodeIds.has(node.id));

    // Filter out hidden links
    const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
    const visibleLinks = data.links.filter((link) => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      const linkId = `${sourceId}-${targetId}`;

      return !hiddenLinkIds.has(linkId) && visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });

    return {
      nodes: visibleNodes.map((node) => ({
        ...node,
        collapsed: collapsedNodes.has(node.id),
        descendantCount: collapsedNodes.has(node.id) ? getCollapsibleDescendants(node.id, data.links).size : 0,
      })),
      links: visibleLinks,
    };
  }, [data, collapsedNodes, hiddenCategories, getCollapsibleDescendants]);

  // Show tooltip near cursor
  const showTooltip = useCallback((content: string, event: MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    setTooltip({
      visible: true,
      x: event.clientX - rect.left + 10,
      y: event.clientY - rect.top - 10,
      content,
    });
  }, []);

  // Hide tooltip
  const hideTooltip = useCallback(() => {
    setTooltip({ visible: false, x: 0, y: 0, content: '' });
  }, []);

  // Main effect for rendering
  useEffect(() => {
    if (!svgRef.current || !processedData.nodes.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create working copies of data
    let workingNodes = processedData.nodes.map((n) => ({ ...n }));
    let workingLinks = processedData.links.map((l) => ({ ...l }));

    // Set up zoom
    const g = svg.append('g').attr('class', 'main-group');

    if (enableZoom) {
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 3])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);
    }

    // Apply layout
    if (layout === 'layered') {
      layeredLayout(workingNodes, workingLinks, nodePositions.size === 0);
    }

    // Create force simulation
    const simulation = layout === 'force' ? createForceSimulation(workingNodes, workingLinks) : null;

    // Create link group
    const linkGroup = g.append('g').attr('class', 'links');

    // Create node group
    const nodeGroup = g.append('g').attr('class', 'nodes');

    // Update function
    const update = () => {
      // Filter and prepare links with resolved source/target
      const resolvedLinks = workingLinks
        .map((link) => ({
          ...link,
          source: workingNodes.find((n) => n.id === (typeof link.source === 'string' ? link.source : link.source.id))!,
          target: workingNodes.find((n) => n.id === (typeof link.target === 'string' ? link.target : link.target.id))!,
        }))
        .filter((link) => link.source && link.target);

      // Add arrowhead marker definition
      svg.selectAll('defs').remove();
      const defs = svg.append('defs');
      defs
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#999');

      // Update links
      const linkSelection = linkGroup
        .selectAll('.link')
        .data(resolvedLinks, (d: any) => `${d.source.id}-${d.target.id}`);

      linkSelection.exit().transition().duration(animationDuration).style('opacity', 0).remove();

      const linkEnter = linkSelection
        .enter()
        .append('path')
        .attr('class', 'link')
        .style('fill', 'none')
        .style('stroke', (d) => d.lineStyle?.color || '#666')
        .style('stroke-width', (d) => d.lineStyle?.width || 2)
        .style('opacity', 0)
        .attr('marker-end', 'url(#arrowhead)')
        .on('click', (event, d) => {
          event.stopPropagation();
          onEdgeClick?.(d, event);
        })
        .on('mouseenter', (event, d) => {
          // Highlight full path
          const connectedNodes = getFullPaths(d.source.id, resolvedLinks);
          connectedNodes.add(d.target.id);

          linkSelection.merge(linkEnter).style('stroke-opacity', (l) => {
            return connectedNodes.has(l.source.id) || connectedNodes.has(l.target.id) ? 1 : 0.2;
          });

          nodeSelection.merge(nodeEnter).style('opacity', (n) => (connectedNodes.has(n.id) ? 1 : 0.3));

          const content = `
            <div style="padding: 10px; font-size: 12px; background: white; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="font-size: 14px; font-weight: bold; color: #e74c3c; margin-bottom: 6px;">
                ${d.source.name} → ${d.target.name}
              </div>
              ${d.label ? `<div><span style="color: #666;">Label:</span> <span style="font-weight: bold; color: #0066cc;">${d.label}</span></div>` : ''}
              ${d.value !== undefined ? `<div><span style="color: #666;">Value:</span> <span style="font-weight: bold; color: #d73027;">${d.value}</span></div>` : ''}
            </div>
          `;
          showTooltip(content, event);
        })
        .on('mouseleave', () => {
          linkSelection.merge(linkEnter).style('stroke-opacity', 1);
          nodeSelection.merge(nodeEnter).style('opacity', 1);
          hideTooltip();
        });

      linkEnter.transition().duration(animationDuration).style('opacity', 0.8);

      const linkUpdate = linkEnter.merge(linkSelection);

      // Update link paths using Manhattan routing
      linkUpdate.attr('d', (d) => {
        if (!d.source.x || !d.source.y || !d.target.x || !d.target.y) return '';

        const points = manhattanEdge(d.source, d.target);
        if (points.length === 0) return '';

        const pathData = d3
          .line<D3DAGPoint>()
          .x((p) => p.x)
          .y((p) => p.y)
          .curve(d3.curveLinear);

        return pathData(points) || '';
      });

      // Update nodes
      const nodeSelection = nodeGroup.selectAll('.node').data(workingNodes, (d: any) => d.id);

      nodeSelection.exit().transition().duration(animationDuration).style('opacity', 0).remove();

      const nodeEnter = nodeSelection.enter().append('g').attr('class', 'node').style('opacity', 0);

      // Add square shapes
      nodeEnter
        .append('rect')
        .attr('width', nodeSize)
        .attr('height', nodeSize)
        .attr('x', -nodeSize / 2)
        .attr('y', -nodeSize / 2)
        .attr('rx', 4)
        .style('fill', (d) => getCategoryColor(d.category))
        .style('stroke', (d) => (d.collapsed ? '#ff4444' : '#fff'))
        .style('stroke-width', (d) => (d.collapsed ? 3 : 2))
        .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))');

      // Add labels positioned to avoid edge interference
      nodeEnter
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('x', 0)
        .attr('y', nodeSize / 2 + 15)
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .style('pointer-events', 'none')
        .text((d) => (d.name.length > 8 ? d.name.substring(0, 6) + '...' : d.name));

      // Add collapse indicator
      nodeEnter
        .append('text')
        .attr('class', 'collapse-indicator')
        .attr('text-anchor', 'middle')
        .attr('x', 0)
        .attr('y', nodeSize / 2 + 30)
        .style('font-size', '9px')
        .style('fill', '#ff4444')
        .style('font-weight', 'bold')
        .style('pointer-events', 'none')
        .text((d) => (d.collapsed && d.descendantCount ? `+${d.descendantCount}` : ''));

      nodeEnter.transition().duration(animationDuration).style('opacity', 1);

      const nodeUpdate = nodeEnter.merge(nodeSelection);

      // Update node positions
      nodeUpdate.attr('transform', (d) => `translate(${d.x || 0}, ${d.y || 0})`);

      // Update collapse indicators
      nodeUpdate
        .select('.collapse-indicator')
        .text((d) => (d.collapsed && d.descendantCount ? `+${d.descendantCount}` : ''));

      // Update stroke for collapsed state
      nodeUpdate
        .select('rect')
        .style('stroke', (d) => (d.collapsed ? '#ff4444' : '#fff'))
        .style('stroke-width', (d) => (d.collapsed ? 3 : 2));

      // Event handlers
      nodeUpdate
        .style('cursor', 'pointer')
        .on('click', (event, d) => {
          event.stopPropagation();
          onNodeClick?.(d, event);
        })
        .on('dblclick', (event, d) => {
          event.stopPropagation();
          toggleNodeCollapse(d.id);
          onNodeDoubleClick?.(d, event);
        })
        .on('mouseenter', (event, d) => {
          // Highlight full connected paths
          const connectedNodes = getFullPaths(d.id, resolvedLinks);

          linkUpdate.style('stroke-opacity', (l) => {
            return connectedNodes.has(l.source.id) || connectedNodes.has(l.target.id) ? 1 : 0.2;
          });

          nodeUpdate.style('opacity', (n) => (connectedNodes.has(n.id) ? 1 : 0.3));

          // Calculate proper connection counts from resolved links
          const incomingLinks = resolvedLinks.filter((l) => l.target.id === d.id);
          const outgoingLinks = resolvedLinks.filter((l) => l.source.id === d.id);
          const inDegree = incomingLinks.length;
          const outDegree = outgoingLinks.length;

          const content = `
            <div style="padding: 10px; font-size: 12px; background: white; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="font-size: 14px; font-weight: bold; color: #333; margin-bottom: 6px;">${d.name}</div>
              ${d.category ? `<div><span style="color: #666;">Category:</span> <span style="color: #0066cc; font-weight: bold;">${d.category}</span></div>` : ''}
              ${d.value !== undefined ? `<div><span style="color: #666;">Value:</span> <span style="font-weight: bold; color: #d73027;">${d.value}</span></div>` : ''}
              <div><span style="color: #666;">Connections:</span> <span style="font-weight: bold;">${inDegree} in, ${outDegree} out</span></div>
              ${
                d.collapsed
                  ? '<div style="margin-top: 6px; font-style: italic; color: #666;">Double-click to expand</div>'
                  : outDegree > 0
                    ? '<div style="margin-top: 6px; font-style: italic; color: #666;">Double-click to collapse</div>'
                    : ''
              }
            </div>
          `;
          showTooltip(content, event);
        })
        .on('mouseleave', () => {
          linkUpdate.style('stroke-opacity', 1);
          nodeUpdate.style('opacity', 1);
          hideTooltip();
        });
    };

    // Initial render
    update();

    // Simulation tick handler
    if (simulation) {
      simulation.on('tick', () => {
        // const currentResolvedLinks = workingLinks
        //   .map((link) => ({
        //     ...link,
        //     source: workingNodes.find(
        //       (n) => n.id === (typeof link.source === 'string' ? link.source : link.source.id),
        //     )!,
        //     target: workingNodes.find(
        //       (n) => n.id === (typeof link.target === 'string' ? link.target : link.target.id),
        //     )!,
        //   }))
        //   .filter((link) => link.source && link.target);

        linkGroup.selectAll('.link').attr('d', (d: any) => {
          const points = manhattanEdge(d.source, d.target);
          if (points.length === 0) return '';

          const pathData = d3
            .line<D3DAGPoint>()
            .x((p) => p.x)
            .y((p) => p.y)
            .curve(d3.curveLinear);

          return pathData(points) || '';
        });

        nodeGroup.selectAll('.node').attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
      });
    }

    return () => {
      simulation?.stop();
    };
  }, [
    processedData,
    width,
    height,
    layout,
    nodeSize,
    edgeInset,
    animationDuration,
    enableZoom,
    manhattanEdge,
    layeredLayout,
    createForceSimulation,
    getCategoryColor,
    showTooltip,
    hideTooltip,
    toggleNodeCollapse,
    onNodeClick,
    onNodeDoubleClick,
    onEdgeClick,
    getFullPaths,
    nodePositions,
  ]);

  return (
    <div style={{ position: 'relative', width, height }}>
      <svg ref={svgRef} width={width} height={height} style={{ border: '1px solid #ddd', background: '#fafafa' }} />

      {tooltip.visible && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            maxWidth: '200px',
            border: '1px solid #555',
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
};

export default D3DAGChart;
