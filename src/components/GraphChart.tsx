import { forwardRef, useMemo } from 'react';
import { BaseEChart } from './BaseEChart';
import type { GraphChartProps, EChartsRef } from '../types';
import type { EChartsOption } from 'echarts';

/**
 * Graph Chart component built on top of Apache ECharts
 *
 * Features network visualization with force layout, rich text labels, and detailed node tooltips.
 * Supports community detection through modularity when enabled.
 *
 * @example
 * ```tsx
 * <GraphChart
 *   nodes={[
 *     { id: '1', name: 'Node 1', value: 10, category: 0 },
 *     { id: '2', name: 'Node 2', value: 20, category: 1 }
 *   ]}
 *   links={[
 *     { source: '1', target: '2', value: 5 }
 *   ]}
 *   categories={[
 *     { name: 'Type A' },
 *     { name: 'Type B' }
 *   ]}
 *   layout="force"
 * />
 * ```
 */
export const GraphChart = forwardRef<EChartsRef, GraphChartProps>(
  (
    { nodes, links, categories, layout = 'force', force = {}, modularity = false, option: customOption, ...props },
    ref,
  ) => {
    const option: EChartsOption = useMemo(() => {
      // If custom option is provided, use it directly
      if (customOption && !nodes) {
        return customOption;
      }

      // Default force layout options
      const defaultForce = {
        repulsion: 100,
        gravity: 0.2,
        edgeLength: 30,
        friction: 0.6,
        layoutAnimation: true,
        ...force,
      };

      // Generate option from simplified props
      const generatedOption: EChartsOption = {
        title: {
          text: 'Network Graph',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          },
          top: 20,
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#ccc',
          borderWidth: 1,
          textStyle: {
            color: '#333',
          },
          formatter: (params: unknown) => {
            const typedParams = params as { data?: unknown; dataType?: string };
            const { data, dataType } = typedParams;

            if (dataType === 'node') {
              const nodeData = data as {
                name?: string;
                value?: number;
                category?: number;
                id?: string;
                description?: string;
              };
              const name = nodeData.name || 'Unknown';
              const value = nodeData.value !== undefined ? nodeData.value : 'N/A';
              const category =
                nodeData.category !== undefined && categories?.[nodeData.category]
                  ? categories[nodeData.category].name
                  : 'N/A';
              const connections =
                links?.filter((link) => link.source === nodeData.id || link.target === nodeData.id).length || 0;

              return `
								<div style="padding: 10px 14px; line-height: 1.6;">
									<div style="font-size: 18px; font-weight: bold; color: #2c5aa0; margin-bottom: 10px; border-bottom: 2px solid #e0e0e0; padding-bottom: 6px;">
										🔵 ${name}
									</div>
									<div style="margin-bottom: 6px;">
										<span style="font-size: 12px; color: #666; font-weight: normal; text-transform: uppercase;">VALUE:</span>
										<span style="font-size: 16px; font-weight: bold; color: #d73027; margin-left: 10px;">${value}</span>
									</div>
									<div style="margin-bottom: 6px;">
										<span style="font-size: 12px; color: #666; font-weight: normal; text-transform: uppercase;">CATEGORY:</span>
										<span style="font-size: 14px; font-weight: 600; color: #1a9850; margin-left: 10px;">${category}</span>
									</div>
									<div style="margin-bottom: 6px;">
										<span style="font-size: 12px; color: #666; font-weight: normal; text-transform: uppercase;">CONNECTIONS:</span>
										<span style="font-size: 14px; font-weight: 600; color: #762a83; margin-left: 10px;">${connections}</span>
									</div>
									${
  nodeData.description
    ? `
										<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #f0f0f0;">
											<span style="font-size: 11px; color: #999; font-weight: normal; text-transform: uppercase;">DESCRIPTION:</span>
											<div style="font-size: 13px; color: #555; margin-top: 4px; font-style: italic; line-height: 1.4;">${nodeData.description}</div>
										</div>
									`
    : ''
}
								</div>
							`;
            } else if (dataType === 'edge') {
              const edgeData = data as { source?: string; target?: string; value?: number };
              const sourceName = nodes?.find((n) => n.id === edgeData.source)?.name || edgeData.source;
              const targetName = nodes?.find((n) => n.id === edgeData.target)?.name || edgeData.target;
              const value = edgeData.value !== undefined ? edgeData.value : 'N/A';

              return `
								<div style="padding: 8px 12px; line-height: 1.6;">
									<div style="font-size: 16px; font-weight: bold; color: #2c5aa0; margin-bottom: 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px;">
										🔗 Connection
									</div>
									<div style="margin-bottom: 4px;">
										<span style="font-size: 12px; color: #666; font-weight: normal;">FROM:</span>
										<span style="font-size: 14px; font-weight: 600; color: #1a9850; margin-left: 8px;">${sourceName}</span>
									</div>
									<div style="margin-bottom: 4px;">
										<span style="font-size: 12px; color: #666; font-weight: normal;">TO:</span>
										<span style="font-size: 14px; font-weight: 600; color: #762a83; margin-left: 8px;">${targetName}</span>
									</div>
									<div style="margin-bottom: 4px;">
										<span style="font-size: 12px; color: #666; font-weight: normal;">WEIGHT:</span>
										<span style="font-size: 14px; font-weight: bold; color: #d73027; margin-left: 8px;">${value}</span>
									</div>
								</div>
							`;
            }

            return '';
          },
        },
        legend: categories
          ? {
            show: true,
            data: categories.map((cat) => cat.name),
            orient: 'vertical',
            right: 10,
            top: 'center',
            textStyle: {
              fontSize: 12,
              fontWeight: 600,
            },
          }
          : undefined,
        series: [
          {
            type: 'graph',
            layout,
            data: nodes || [],
            links: links || [],
            categories,
            roam: true,
            focusNodeAdjacency: true,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              show: true,
              position: 'right',
              formatter: (params: unknown) => {
                const typedParams = params as { data?: { name?: string; value?: number } };
                const data = typedParams.data || { name: 'Unknown', value: 0 };
                const name = data.name || '';
                const value = data.value !== undefined ? data.value : '';

                // Rich text formatting with different styles for name and value
                return [`{nodeName|${name}}`, value !== '' ? `{nodeValue|${value}}` : ''].filter(Boolean).join('\n');
              },
              rich: {
                nodeName: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#333',
                  lineHeight: 16,
                },
                nodeValue: {
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#666',
                  lineHeight: 14,
                },
              },
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
              opacity: 0.9,
              width: 2,
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 4,
              },
              label: {
                fontSize: 14,
                fontWeight: 'bold',
              },
            },
            ...(layout === 'force' && {
              force: defaultForce,
            }),
            ...(modularity && {
              modularity: typeof modularity === 'boolean' ? true : modularity,
            }),
          },
        ],
      };

      // Merge with custom option if provided
      return customOption ? { ...generatedOption, ...customOption } : generatedOption;
    }, [nodes, links, categories, layout, force, modularity, customOption]);

    return <BaseEChart ref={ref} option={option} {...props} />;
  },
);

GraphChart.displayName = 'GraphChart';
