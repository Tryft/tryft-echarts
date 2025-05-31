import { forwardRef, useMemo } from 'react';
import { BaseEChart } from './BaseEChart';
import type { PieChartProps, EChartsRef } from '../types';
import type { EChartsOption } from 'echarts';

/**
 * Pie Chart component built on top of Apache ECharts
 *
 * @example
 * ```tsx
 * <PieChart
 *   data={[
 *     { name: 'Category A', value: 100 },
 *     { name: 'Category B', value: 120 },
 *   ]}
 * />
 * ```
 */
export const PieChart = forwardRef<EChartsRef, PieChartProps>(({ data, option: customOption, ...props }, ref) => {
  const option: EChartsOption = useMemo(() => {
    // If custom option is provided, use it directly
    if (customOption && !data) {
      return customOption;
    }

    // Generate option from simplified props
    const generatedOption: EChartsOption = {
      title: {
        text: 'Pie Chart',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      series: [
        {
          name: 'Pie',
          type: 'pie',
          radius: '50%',
          data: data || [],
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
  }, [data, customOption]);

  return <BaseEChart ref={ref} option={option} {...props} />;
});

PieChart.displayName = 'PieChart';
