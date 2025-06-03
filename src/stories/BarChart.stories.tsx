import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart } from '../components/BarChart';

const meta = {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable bar chart component built on Apache ECharts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'number' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    width: 600,
    height: 400,
    categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    series: [
      {
        name: 'Sales',
        data: [120, 200, 150, 80, 170],
      },
    ],
  },
};

export const MultiSeries: Story = {
  args: {
    width: 600,
    height: 400,
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    series: [
      {
        name: 'Sales',
        data: [120, 200, 150, 80, 170],
      },
      {
        name: 'Profit',
        data: [80, 120, 100, 60, 110],
      },
    ],
  },
};

export const CustomData: Story = {
  args: {
    width: 600,
    height: 400,
    data: [
      { name: 'Desktop', value: 1048 },
      { name: 'Mobile', value: 735 },
      { name: 'Tablet', value: 580 },
      { name: 'Smart TV', value: 484 },
      { name: 'Wearable', value: 300 },
    ],
  },
};

export const Loading: Story = {
  args: {
    width: 600,
    height: 400,
    loading: true,
    categories: ['A', 'B', 'C'],
    series: [
      {
        name: 'Data',
        data: [120, 200, 150],
      },
    ],
  },
};
