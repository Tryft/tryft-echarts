import { forwardRef, useMemo } from 'react';
import { BaseEChart } from './BaseEChart';
import type { GaugeChartProps, EChartsRef } from '../types';
import type { EChartsOption } from 'echarts';

/**
 * Gauge Chart component built on top of Apache ECharts
 *
 * Features customizable gauge displays with rich text labels and detailed formatting.
 *
 * @example
 * ```tsx
 * <GaugeChart
 *   data={[
 *     {
 *       name: 'Performance',
 *       value: 75,
 *       title: { show: true, color: '#333' },
 *       detail: { show: true, formatter: '{value}%' }
 *     }
 *   ]}
 *   min={0}
 *   max={100}
 *   radius="75%"
 * />
 * ```
 */
export const GaugeChart = forwardRef<EChartsRef, GaugeChartProps>(
	(
		{ data, min = 0, max = 100, startAngle = 225, endAngle = -45, radius = '75%', option: customOption, ...props },
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
					text: 'Performance Gauge',
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
						const typedParams = params as { data?: { name?: string; value?: number } };
						const data = typedParams.data || { name: 'Unknown', value: 0 };
						const name = data.name || 'Unknown';
						const value = typeof data.value === 'number' ? data.value : 0;
						const percentage = max > 0 ? ((value / max) * 100).toFixed(1) : '0';

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
									<span style="font-size: 13px; font-weight: 600; color: #1a9850; margin-left: 8px;">${percentage}%</span>
								</div>
								<div style="margin-bottom: 4px;">
									<span style="font-size: 12px; color: #666; font-weight: normal;">RANGE:</span>
									<span style="font-size: 13px; font-weight: 600; color: #762a83; margin-left: 8px;">${min} - ${max}</span>
								</div>
							</div>
						`;
					},
				},
				series: [
					{
						type: 'gauge',
						min,
						max,
						startAngle,
						endAngle,
						radius,
						data: data || [],
						center: ['50%', '60%'],
						clockwise: true,
						splitNumber: 10,
						axisLine: {
							lineStyle: {
								width: 15,
								color: [
									[0.2, '#67e0e3'],
									[0.4, '#37a2da'],
									[0.6, '#fd666d'],
									[0.8, '#ffb64d'],
									[1, '#67e0e3'],
								],
							},
						},
						pointer: {
							icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
							length: '12%',
							width: 20,
							offsetCenter: [0, '-60%'],
							itemStyle: {
								color: '#C23531',
								shadowColor: 'rgba(0, 0, 0, 0.5)',
								shadowBlur: 5,
							},
						},
						axisTick: {
							length: 8,
							lineStyle: {
								color: 'auto',
								width: 2,
							},
						},
						splitLine: {
							length: 12,
							lineStyle: {
								color: 'auto',
								width: 5,
							},
						},
						axisLabel: {
							color: '#464646',
							fontSize: 12,
							distance: -60,
							formatter: (value: number) => {
								return `{label|${value}}`;
							},
							rich: {
								label: {
									fontSize: 12,
									fontWeight: 600,
									color: '#464646',
								},
							},
						},
						title: {
							offsetCenter: [0, '-10%'],
							fontSize: 16,
							fontWeight: 'bold',
							color: '#333',
						},
						detail: {
							offsetCenter: [0, '-35%'],
							valueAnimation: true,
							formatter: (value: number) => {
								return `{value|${value}}\n{unit|${data?.[0]?.name || 'Value'}}`;
							},
							rich: {
								value: {
									fontSize: 50,
									fontWeight: 'bold',
									color: '#d73027',
									lineHeight: 50,
								},
								unit: {
									fontSize: 14,
									fontWeight: 600,
									color: '#999',
									lineHeight: 20,
								},
							},
						},
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
					},
				],
			};

			// Merge with custom option if provided
			return customOption ? { ...generatedOption, ...customOption } : generatedOption;
		}, [data, min, max, startAngle, endAngle, radius, customOption]);

		return (
			<BaseEChart
				ref={ref}
				option={option}
				{...props}
			/>
		);
	},
);

GaugeChart.displayName = 'GaugeChart';
