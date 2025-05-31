import type { Meta, StoryObj } from '@storybook/react-vite';
import { PieChart } from '../components/PieChart';

const meta = {
  title: 'Charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable pie chart component built on Apache ECharts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'number' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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

export const SimpleData: Story = {
  args: {
    width: 600,
    height: 400,
    data: [
      { name: 'Chrome', value: 65 },
      { name: 'Firefox', value: 15 },
      { name: 'Safari', value: 12 },
      { name: 'Edge', value: 8 },
    ],
  },
};

export const CustomOption: Story = {
  args: {
    width: 600,
    height: 400,
    option: {
      title: {
        text: 'Sales Distribution',
        subtext: 'By Region',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Sales',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 30,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'North America' },
            { value: 735, name: 'Europe' },
            { value: 580, name: 'Asia Pacific' },
            { value: 484, name: 'Latin America' },
            { value: 300, name: 'Africa' },
          ],
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
    data: [
      { name: 'A', value: 100 },
      { name: 'B', value: 200 },
    ],
  },
};
