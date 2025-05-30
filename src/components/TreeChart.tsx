import { forwardRef, useMemo } from 'react';
import { BaseEChart } from './BaseEChart';
import type { TreeChartProps, EChartsRef } from '../types';
import type { EChartsOption } from 'echarts';

/**
 * Tree Chart component built on top of Apache ECharts
 *
 * Features rich text labels and detailed hover tooltips with mixed font styles,
 * colors, and sizes to indicate importance, labels, and values.
 *
 * @example
 * ```tsx
 * <TreeChart
 *   data={{
 *     name: 'Root',
 *     value: 100,
 *     children: [
 *       { name: 'Child 1', value: 50 },
 *       { name: 'Child 2', value: 30 }
 *     ]
 *   }}
 *   layout="orthogonal"
 *   orient="LR"
 * />
 * ```
 */
export const TreeChart = forwardRef<EChartsRef, TreeChartProps>(
	(
		{
			data,
			layout = 'orthogonal',
			orient = 'LR',
			symbol = 'emptyCircle',
			symbolSize = 20,
			option: customOption,
			...props
		},
		ref,
	) => {
		const option: EChartsOption = useMemo(() => {
			// If custom option is provided, use it directly
			if (customOption && !data) {
				return customOption;
			}

			// Generate option from simplified props
			const generatedOption: EChartsOption = {
				title: {
					text: 'Organizational Tree',
					textStyle: {
						fontSize: 18,
						fontWeight: 'bold',
						color: '#333',
					},
					top: 20,
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
					formatter: (params: any) => {
						const { data } = params;
						const name = data.name || 'Unknown';
						const value = data.value !== undefined ? data.value : 'N/A';
						const level = data.depth !== undefined ? data.depth : 'N/A';
						const children = data.children ? data.children.length : 0;

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
									<span style="font-size: 12px; color: #666; font-weight: normal;">LEVEL:</span>
									<span style="font-size: 13px; font-weight: 600; color: #1a9850; margin-left: 8px;">${level}</span>
								</div>
								<div style="margin-bottom: 4px;">
									<span style="font-size: 12px; color: #666; font-weight: normal;">CHILDREN:</span>
									<span style="font-size: 13px; font-weight: 600; color: #762a83; margin-left: 8px;">${children}</span>
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
				series: [
					{
						type: 'tree',
						data: [data || {}],
						top: '80px',
						left: '7%',
						bottom: '20px',
						right: '20%',
						symbolSize,
						symbol,
						layout,
						orient,
						label: {
							show: true,
							position: orient === 'LR' ? 'right' : orient === 'RL' ? 'left' : orient === 'TB' ? 'bottom' : 'top',
							verticalAlign: 'middle',
							align: orient === 'LR' ? 'left' : orient === 'RL' ? 'right' : 'center',
							fontSize: 12,
							fontWeight: 'normal',
							color: '#333',
							formatter: (params: any) => {
								const { data } = params;
								const name = data.name || '';
								const value = data.value !== undefined ? data.value : '';

								// Rich text formatting with different styles for name and value
								return [`{title|${name}}`, value !== '' ? `{value|${value}}` : ''].filter(Boolean).join('\n');
							},
							rich: {
								title: {
									fontSize: 14,
									fontWeight: 'bold',
									color: '#2c5aa0',
									lineHeight: 20,
								},
								value: {
									fontSize: 12,
									fontWeight: 600,
									color: '#d73027',
									lineHeight: 16,
								},
							},
						},
						leaves: {
							label: {
								position: orient === 'LR' ? 'right' : orient === 'RL' ? 'left' : orient === 'TB' ? 'bottom' : 'top',
								verticalAlign: 'middle',
								align: orient === 'LR' ? 'left' : orient === 'RL' ? 'right' : 'center',
								formatter: (params: any) => {
									const { data } = params;
									const name = data.name || '';
									const value = data.value !== undefined ? data.value : '';

									return [`{leafTitle|${name}}`, value !== '' ? `{leafValue|${value}}` : ''].filter(Boolean).join('\n');
								},
								rich: {
									leafTitle: {
										fontSize: 13,
										fontWeight: 'bold',
										color: '#1a9850',
										lineHeight: 18,
									},
									leafValue: {
										fontSize: 11,
										fontWeight: 500,
										color: '#762a83',
										lineHeight: 14,
									},
								},
							},
						},
						expandAndCollapse: true,
						animationDuration: 550,
						animationDurationUpdate: 750,
						itemStyle: {
							color: '#2c5aa0',
							borderColor: '#1e3f66',
							borderWidth: 2,
						},
						lineStyle: {
							color: '#ccc',
							width: 1.5,
							curveness: 0.5,
						},
						emphasis: {
							itemStyle: {
								color: '#d73027',
								borderColor: '#a02622',
								borderWidth: 3,
							},
							lineStyle: {
								color: '#999',
								width: 2,
							},
						},
					},
				],
			};

			// Merge with custom option if provided
			return customOption ? { ...generatedOption, ...customOption } : generatedOption;
		}, [data, layout, orient, symbol, symbolSize, customOption]);

		return (
			<BaseEChart
				ref={ref}
				option={option}
				{...props}
			/>
		);
	},
);

TreeChart.displayName = 'TreeChart';
