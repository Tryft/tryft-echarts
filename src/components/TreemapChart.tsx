import { forwardRef, useMemo } from 'react';
import { BaseEChart } from './BaseEChart';
import type { TreemapChartProps, EChartsRef } from '../types';
import type { EChartsOption } from 'echarts';

/**
 * Treemap Chart component built on top of Apache ECharts
 *
 * Features hierarchical data visualization with rich text labels and detailed tooltips.
 *
 * @example
 * ```tsx
 * <TreemapChart
 *   data={[
 *     {
 *       name: 'Technology',
 *       value: 500,
 *       children: [
 *         { name: 'Frontend', value: 200 },
 *         { name: 'Backend', value: 300 }
 *       ]
 *     }
 *   ]}
 *   type="squarify"
 * />
 * ```
 */
export const TreemapChart = forwardRef<EChartsRef, TreemapChartProps>(
	({ data, type = 'squarify', breadcrumb = true, option: customOption, ...props }, ref) => {
		const option: EChartsOption = useMemo(() => {
			// If custom option is provided, use it directly
			if (customOption && !data) {
				return customOption;
			}

			// Generate option from simplified props
			const generatedOption: EChartsOption = {
				title: {
					text: 'Hierarchical Data Treemap',
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
						const typedParams = params as {
							data?: { name?: string; value?: number; description?: string };
							percent?: number;
						};
						const data = typedParams.data || {};
						const name = data.name || 'Unknown';
						const value = data.value !== undefined ? data.value : 'N/A';
						const percentage = typedParams.percent ? `${typedParams.percent}%` : 'N/A';

						return `
							<div style="padding: 8px 12px; line-height: 1.6;">
								<div style="font-size: 16px; font-weight: bold; color: #2c5aa0; margin-bottom: 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px;">
									${name}
								</div>
								<div style="margin-bottom: 4px;">
									<span style="font-size: 12px; color: #666; font-weight: normal;">VALUE:</span>
									<span style="font-size: 14px; font-weight: bold; color: #d73027; margin-left: 8px;">${value}</span>
								</div>
								<div style="margin-bottom: 4px;">
									<span style="font-size: 12px; color: #666; font-weight: normal;">PERCENTAGE:</span>
									<span style="font-size: 13px; font-weight: 600; color: #1a9850; margin-left: 8px;">${percentage}</span>
								</div>
								${
									data.description
										? `
									<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0f0f0;">
										<span style="font-size: 11px; color: #999; font-weight: normal;">DESCRIPTION:</span>
										<div style="font-size: 12px; color: #555; margin-top: 2px; font-style: italic;">${data.description}</div>
									</div>
								`
										: ''
								}
							</div>
						`;
					},
				},
				...(breadcrumb && {
					toolbox: {
						feature: {
							breadcrumb: {
								show: true,
								showAllItems: false,
								itemStyle: {
									normal: {
										textStyle: {
											color: '#333',
										},
									},
								},
							},
						},
					},
				}),
				series: [
					{
						type: 'treemap',
						data: data || [],
						top: breadcrumb ? '100px' : '80px',
						left: '2%',
						bottom: '2%',
						right: '2%',
						squareRatio: type === 'squarify' ? 0.5 * (1 + Math.sqrt(5)) : undefined,
						leafDepth: 2,
						label: {
							show: true,
							formatter: (params: unknown) => {
								const typedParams = params as { data?: { name?: string; value?: number } };
								const data = typedParams.data || {};
								const name = data.name || '';
								const value = data.value !== undefined ? data.value : '';

								// Rich text formatting with different styles for name and value
								return [`{title|${name}}`, value !== '' ? `{value|${value}}` : ''].filter(Boolean).join('\n');
							},
							rich: {
								title: {
									fontSize: 14,
									fontWeight: 'bold',
									color: '#fff',
									lineHeight: 20,
									textShadowColor: 'rgba(0,0,0,0.5)',
									textShadowBlur: 2,
								},
								value: {
									fontSize: 12,
									fontWeight: 600,
									color: '#fff',
									lineHeight: 16,
									textShadowColor: 'rgba(0,0,0,0.5)',
									textShadowBlur: 2,
								},
							},
						},
						upperLabel: {
							show: true,
							height: 30,
							formatter: (params: unknown) => {
								const typedParams = params as { data?: { name?: string } };
								const data = typedParams.data || {};
								const name = data.name || '';
								return `{upperTitle|${name}}`;
							},
							rich: {
								upperTitle: {
									fontSize: 16,
									fontWeight: 'bold',
									color: '#333',
									lineHeight: 30,
								},
							},
						},
						itemStyle: {
							borderColor: '#fff',
							borderWidth: 2,
							gapWidth: 2,
						},
						emphasis: {
							itemStyle: {
								borderColor: '#333',
								borderWidth: 3,
							},
							label: {
								fontSize: 16,
								fontWeight: 'bold',
							},
						},
						levels: [
							{
								itemStyle: {
									borderColor: '#777',
									borderWidth: 0,
									gapWidth: 1,
								},
								upperLabel: {
									show: false,
								},
							},
							{
								itemStyle: {
									borderColor: '#555',
									borderWidth: 5,
									gapWidth: 1,
								},
								emphasis: {
									itemStyle: {
										borderColor: '#ddd',
									},
								},
							},
							{
								colorSaturation: [0.35, 0.5],
								itemStyle: {
									borderWidth: 5,
									gapWidth: 1,
									borderColorSaturation: 0.6,
								},
							},
						],
					},
				],
			};

			// Merge with custom option if provided
			return customOption ? { ...generatedOption, ...customOption } : generatedOption;
		}, [data, type, breadcrumb, customOption]);

		return (
			<BaseEChart
				ref={ref}
				option={option}
				{...props}
			/>
		);
	},
);

TreemapChart.displayName = 'TreemapChart';
