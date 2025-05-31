import { forwardRef, useImperativeHandle, useEffect, useCallback } from 'react';
import { useECharts } from '../hooks/useECharts';
import type { BaseEChartsProps, EChartsRef } from '../types';

/**
 * Base ECharts component that provides common functionality for all chart types
 */
export const BaseEChart = forwardRef<EChartsRef, BaseEChartsProps>(
  (
    {
      option,
      width = 'auto',
      height = 400,
      theme,
      loading = false,
      loadingOption,
      onChartReady,
      onEvents = {},
      style,
      className,
      opts,
      notMerge = false,
      lazyUpdate = false,
    },
    ref,
  ) => {
    const { chartRef, chartInstance, updateChart, resizeChart, showLoading, hideLoading } = useECharts(
      option || {},
      theme,
      opts,
    );

    /**
     * Register event listeners
     */
    const registerEvents = useCallback(() => {
      if (chartInstance && onEvents) {
        Object.entries(onEvents).forEach(([eventName, handler]) => {
          chartInstance.on(eventName, handler);
        });
      }
    }, [chartInstance, onEvents]);

    /**
     * Unregister event listeners
     */
    const unregisterEvents = useCallback(() => {
      if (chartInstance && onEvents) {
        Object.keys(onEvents).forEach((eventName) => {
          chartInstance.off(eventName);
        });
      }
    }, [chartInstance, onEvents]);

    // Handle loading state
    useEffect(() => {
      if (loading) {
        showLoading(loadingOption);
      } else {
        hideLoading();
      }
    }, [loading, loadingOption, showLoading, hideLoading]);

    // Register events when chart is ready
    useEffect(() => {
      if (chartInstance) {
        registerEvents();
        onChartReady?.(chartInstance);

        return () => {
          unregisterEvents();
        };
      }
    }, [chartInstance, registerEvents, unregisterEvents, onChartReady]);

    // Update chart options
    useEffect(() => {
      if (chartInstance && option) {
        updateChart(option, notMerge, lazyUpdate);
      }
    }, [chartInstance, option, notMerge, lazyUpdate, updateChart]);

    // Expose chart methods via ref
    useImperativeHandle(ref, () => ({
      getEchartsInstance: () => chartInstance,
      refresh: () => resizeChart(),
    }));

    const containerStyle: React.CSSProperties = {
      width,
      height,
      ...style,
    };

    return <div ref={chartRef} className={className} style={containerStyle} />;
  },
);

BaseEChart.displayName = 'BaseEChart';
