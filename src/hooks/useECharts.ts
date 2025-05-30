import { useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

/**
 * Custom hook for managing ECharts instances
 *
 * @param option - Chart configuration options
 * @param theme - Chart theme (optional)
 * @param opts - Chart initialization options (optional)
 * @returns Object containing chart instance and utility functions
 */
export const useECharts = (
	option: EChartsOption,
	theme?: string | object,
	opts?: {
		devicePixelRatio?: number;
		renderer?: 'canvas' | 'svg';
		useDirtyRect?: boolean;
		width?: number;
		height?: number;
	},
) => {
	const chartRef = useRef<HTMLDivElement>(null);
	const chartInstanceRef = useRef<ECharts | null>(null);

	/**
	 * Initialize the chart instance
	 */
	const initChart = useCallback(() => {
		if (chartRef.current && !chartInstanceRef.current) {
			chartInstanceRef.current = echarts.init(chartRef.current, theme, opts);
		}
	}, [theme, opts]);

	/**
	 * Update chart options
	 */
	const updateChart = useCallback((newOption: EChartsOption, notMerge?: boolean, lazyUpdate?: boolean) => {
		if (chartInstanceRef.current) {
			chartInstanceRef.current.setOption(newOption, notMerge, lazyUpdate);
		}
	}, []);

	/**
	 * Resize the chart
	 */
	const resizeChart = useCallback(() => {
		if (chartInstanceRef.current) {
			chartInstanceRef.current.resize();
		}
	}, []);

	/**
	 * Dispose the chart instance
	 */
	const disposeChart = useCallback(() => {
		if (chartInstanceRef.current) {
			chartInstanceRef.current.dispose();
			chartInstanceRef.current = null;
		}
	}, []);

	/**
	 * Show loading animation
	 */
	const showLoading = useCallback((loadingOption?: object) => {
		if (chartInstanceRef.current) {
			chartInstanceRef.current.showLoading(loadingOption);
		}
	}, []);

	/**
	 * Hide loading animation
	 */
	const hideLoading = useCallback(() => {
		if (chartInstanceRef.current) {
			chartInstanceRef.current.hideLoading();
		}
	}, []);

	// Initialize chart on mount
	useEffect(() => {
		initChart();

		// Handle window resize
		const handleResize = () => resizeChart();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			disposeChart();
		};
	}, [initChart, resizeChart, disposeChart]);

	// Update chart when option changes
	useEffect(() => {
		if (chartInstanceRef.current && option) {
			updateChart(option);
		}
	}, [option, updateChart]);

	return {
		chartRef,
		chartInstance: chartInstanceRef.current,
		initChart,
		updateChart,
		resizeChart,
		disposeChart,
		showLoading,
		hideLoading,
	};
};
