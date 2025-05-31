import type { EChartsOption, ECharts } from 'echarts';

/**
 * Base props for all ECharts components
 */
export interface BaseEChartsProps {
	/** Chart options configuration */
	option?: EChartsOption;
	/** Chart width (default: auto) */
	width?: string | number;
	/** Chart height (default: 400px) */
	height?: string | number;
	/** Chart theme name or theme object */
	theme?: string | object;
	/** Loading state */
	loading?: boolean;
	/** Loading options */
	loadingOption?: object;
	/** Callback when chart is ready */
	onChartReady?: (instance: ECharts) => void;
	/** Callback when chart events occur */
	onEvents?: Record<string, (params: unknown) => void>;
	/** Additional style for the container */
	style?: React.CSSProperties;
	/** Additional class name for the container */
	className?: string;
	/** Options for chart initialization */
	opts?: {
		devicePixelRatio?: number;
		renderer?: 'canvas' | 'svg';
		useDirtyRect?: boolean;
		width?: number;
		height?: number;
	};
	/** Whether to not merge with previous option */
	notMerge?: boolean;
	/** Whether to lazy update */
	lazyUpdate?: boolean;
}

/**
 * Specific chart type props
 */
export interface LineChartProps extends BaseEChartsProps {
	/** Data for the line chart */
	data?: Array<{
		name: string;
		value: number[];
	}>;
	/** X-axis categories */
	categories?: string[];
	/** Series data */
	series?: Array<{
		name: string;
		data: number[];
		type?: 'line';
	}>;
}

export interface BarChartProps extends BaseEChartsProps {
	/** Data for the bar chart */
	data?: Array<{
		name: string;
		value: number;
	}>;
	/** X-axis categories */
	categories?: string[];
	/** Series data */
	series?: Array<{
		name: string;
		data: number[];
		type?: 'bar';
	}>;
}

export interface PieChartProps extends BaseEChartsProps {
	/** Data for the pie chart */
	data?: Array<{
		name: string;
		value: number;
	}>;
}

export interface TreeNodeData {
	name: string;
	value?: number;
	children?: TreeNodeData[];
	description?: string;
	[key: string]: unknown;
}

export interface TreeChartProps extends BaseEChartsProps {
	/** Data for the tree chart */
	data?: TreeNodeData;
	/** Tree layout orientation */
	layout?: 'orthogonal' | 'radial';
	/** Tree orientation */
	orient?: 'LR' | 'RL' | 'TB' | 'BT';
	/** Symbol type for nodes */
	symbol?: string;
	/** Symbol size for nodes */
	symbolSize?: number | number[];
}

export interface TreemapChartProps extends BaseEChartsProps {
	/** Data for the treemap chart */
	data?: Array<{
		name: string;
		value: number;
		children?: TreemapChartProps['data'];
		[key: string]: unknown;
	}>;
	/** Treemap layout algorithm */
	type?: 'binary' | 'dice' | 'slice' | 'sliceDice' | 'squarify';
	/** Show breadcrumb navigation */
	breadcrumb?: boolean;
}

export interface GaugeChartProps extends BaseEChartsProps {
	/** Data for the gauge chart */
	data?: Array<{
		name?: string;
		value: number;
	}>;
	/** Minimum value */
	min?: number;
	/** Maximum value */
	max?: number;
	/** Start angle */
	startAngle?: number;
	/** End angle */
	endAngle?: number;
	/** Gauge radius */
	radius?: string | number;
}

export interface GraphChartProps extends BaseEChartsProps {
	/** Nodes data */
	nodes?: Array<{
		id: string;
		name: string;
		value?: number;
		category?: number;
		[key: string]: unknown;
	}>;
	/** Links/edges data */
	links?: Array<{
		source: string;
		target: string;
		value?: number;
		[key: string]: unknown;
	}>;
	/** Categories for node grouping */
	categories?: Array<{
		name: string;
	}>;
	/** Layout type */
	layout?: 'none' | 'circular' | 'force';
	/** Force layout options */
	force?: {
		repulsion?: number;
		gravity?: number;
		edgeLength?: number;
		friction?: number;
		layoutAnimation?: boolean;
	};
	/** Enable modularity for community detection */
	modularity?:
		| boolean
		| {
				resolution?: number;
				sort?: boolean;
		  };
}

/**
 * Chart component ref methods
 */
export interface EChartsRef {
	/** Get the ECharts instance */
	getEchartsInstance: () => ECharts | null;
	/** Refresh the chart */
	refresh: () => void;
}
