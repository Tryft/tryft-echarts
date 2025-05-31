import { forwardRef, useMemo } from 'react';
import { BaseEChart } from './BaseEChart';
import type { LineChartProps, EChartsRef } from '../types';
import type { EChartsOption } from 'echarts';

/**
 * Line Chart component built on top of Apache ECharts
 *
 * @example
 * ```tsx
 * <LineChart
 *   data={[
 *     { name: 'Jan', value: [0, 100] },
 *     { name: 'Feb', value: [1, 120] },
 *   ]}
 *   categories={['Jan', 'Feb', 'Mar']}
 * />
 * ```
 */
export const LineChart = forwardRef<EChartsRef, LineChartProps>(
  ({ data, categories, series, option: customOption, ...props }, ref) => {
    const option: EChartsOption = useMemo(() => {
      // If custom option is provided, use it directly
      if (customOption && !data && !categories && !series) {
        return customOption;
      }

      // Generate option from simplified props
      const generatedOption: EChartsOption = {
        title: {
          text: 'Line Chart',
        },
        tooltip: {
          trigger: 'axis',
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
          boundaryGap: false,
          data: categories || data?.map((d) => d.name) || [],
        },
        yAxis: {
          type: 'value',
        },
        series: series?.map((s) => ({
          ...s,
          type: 'line',
        })) || [
          {
            name: 'Line',
            type: 'line',
            data: data?.map((d) => (Array.isArray(d.value) ? d.value[1] : d.value)) || [],
          },
        ],
      };

      // Merge with custom option if provided
      return customOption ? { ...generatedOption, ...customOption } : generatedOption;
    }, [data, categories, series, customOption]);

    return <BaseEChart ref={ref} option={option} {...props} />;
  },
);

LineChart.displayName = 'LineChart';
