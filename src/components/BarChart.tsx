import { forwardRef, useMemo } from 'react';
import { BaseEChart } from './BaseEChart';
import type { BarChartProps, EChartsRef } from '../types';
import type { EChartsOption } from 'echarts';

/**
 * Bar Chart component built on top of Apache ECharts
 *
 * @example
 * ```tsx
 * <BarChart
 *   data={[
 *     { name: 'Product A', value: 100 },
 *     { name: 'Product B', value: 120 },
 *   ]}
 *   categories={['Product A', 'Product B', 'Product C']}
 * />
 * ```
 */
export const BarChart = forwardRef<EChartsRef, BarChartProps>(
  ({ data, categories, series, option: customOption, ...props }, ref) => {
    const option: EChartsOption = useMemo(() => {
      // If custom option is provided, use it directly
      if (customOption && !data && !categories && !series) {
        return customOption;
      }

      // Generate option from simplified props
      const generatedOption: EChartsOption = {
        title: {
          text: 'Bar Chart',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: series?.map((s) => s.name) || [],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          data: categories || data?.map((d) => d.name) || [],
        },
        yAxis: {
          type: 'value',
        },
        series: series?.map((s) => ({
          ...s,
          type: 'bar',
        })) || [
          {
            name: 'Bar',
            type: 'bar',
            data: data?.map((d) => d.value) || [],
          },
        ],
      };

      // Merge with custom option if provided
      return customOption ? { ...generatedOption, ...customOption } : generatedOption;
    }, [data, categories, series, customOption]);

    return <BaseEChart ref={ref} option={option} {...props} />;
  },
);

BarChart.displayName = 'BarChart';
