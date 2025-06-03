import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart } from '../components/LineChart';

const meta = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable line chart component built on Apache ECharts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'number' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    width: 600,
    height: 400,
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Sales',
        data: [120, 200, 150, 80, 70, 110],
      },
    ],
  },
};

export const MultiSeries: Story = {
  args: {
    width: 600,
    height: 400,
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Sales',
        data: [120, 200, 150, 80, 70, 110],
      },
      {
        name: 'Profit',
        data: [80, 120, 100, 60, 50, 80],
      },
    ],
  },
};

export const CustomOption: Story = {
  args: {
    width: 600,
    height: 400,
    option: {
      title: {
        text: 'Custom Line Chart',
        subtext: 'With custom styling',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads'],
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    },
  },
};

export const Loading: Story = {
  args: {
    width: 600,
    height: 400,
    loading: true,
    categories: ['Jan', 'Feb', 'Mar'],
    series: [
      {
        name: 'Sales',
        data: [120, 200, 150],
      },
    ],
  },
};
