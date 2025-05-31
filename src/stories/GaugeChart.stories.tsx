import type { Meta, StoryObj } from '@storybook/react';
import { GaugeChart } from '../components/GaugeChart';

const meta = {
  title: 'Charts/GaugeChart',
  component: GaugeChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A gauge chart component for displaying KPIs, progress indicators, and performance metrics with rich text labels and detailed tooltips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'number' },
    loading: { control: 'boolean' },
    startAngle: { control: 'number' },
    endAngle: { control: 'number' },

    radius: { control: 'text' },
  },
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicGauge: Story = {
  args: {
    width: 400,
    height: 400,
    data: [
      {
        name: 'Performance',
        value: 75,
      },
    ],
    min: 0,
    max: 100,
  },
};

export const CPUUsage: Story = {
  args: {
    width: 450,
    height: 400,
    data: [
      {
        name: 'CPU Usage',
        value: 68,
      },
    ],
    min: 0,
    max: 100,
    startAngle: 180,
    endAngle: 0,
    radius: '75%',
  },
};

export const SpeedGauge: Story = {
  args: {
    width: 500,
    height: 400,
    data: [
      {
        name: 'Speed',
        value: 85,
      },
    ],
    min: 0,
    max: 120,
    startAngle: 225,
    endAngle: -45,
  },
};

export const MultipleGauges: Story = {
  args: {
    width: 800,
    height: 400,
    option: {
      series: [
        {
          type: 'gauge',
          center: ['25%', '50%'],
          radius: '60%',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          data: [{ name: 'CPU', value: 65 }],
          title: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#333',
          },
          detail: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#d73027',
          },
        },
        {
          type: 'gauge',
          center: ['75%', '50%'],
          radius: '60%',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          data: [{ name: 'Memory', value: 45 }],
          title: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#333',
          },
          detail: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#d73027',
          },
        },
      ],
    },
  },
};

export const TemperatureGauge: Story = {
  args: {
    width: 400,
    height: 400,
    data: [
      {
        name: 'Temperature',
        value: 25,
      },
    ],
    min: -20,
    max: 50,
    startAngle: 180,
    endAngle: 0,
  },
};

export const ProgressIndicator: Story = {
  args: {
    width: 400,
    height: 400,
    data: [
      {
        name: 'Project Progress',
        value: 42,
      },
    ],
    min: 0,
    max: 100,
    startAngle: 90,
    endAngle: -270,
  },
};

export const CustomerSatisfaction: Story = {
  args: {
    width: 450,
    height: 400,
    data: [
      {
        name: 'Customer Satisfaction',
        value: 8.7,
      },
    ],
    min: 0,
    max: 10,
    startAngle: 225,
    endAngle: -45,
  },
};

export const Loading: Story = {
  args: {
    width: 400,
    height: 400,
    loading: true,
    data: [
      {
        name: 'Loading',
        value: 50,
      },
    ],
    min: 0,
    max: 100,
  },
};

export const CustomStyling: Story = {
  args: {
    width: 500,
    height: 400,
    option: {
      title: {
        text: 'Custom Gauge',
        subtext: 'With custom styling',
        left: 'center',
        top: '10%',
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          splitNumber: 10,
          itemStyle: {
            color: '#58D9F9',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
          progress: {
            show: true,
            roundCap: true,
            width: 18,
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '75%',
            width: 16,
            offsetCenter: [0, '5%'],
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            splitNumber: 2,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            length: 12,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: 30,
            color: '#999',
            fontSize: 20,
          },
          title: {
            show: false,
          },
          detail: {
            backgroundColor: '#fff',
            borderColor: '#999',
            borderWidth: 2,
            width: '60%',
            lineHeight: 40,
            height: 40,
            borderRadius: 8,
            offsetCenter: [0, '35%'],
            valueAnimation: true,
            formatter: function(value: number) {
              return '{value|' + value.toFixed(0) + '}{unit|%}';
            },
            rich: {
              value: {
                fontSize: 50,
                fontWeight: 'bolder',
                color: '#777',
              },
              unit: {
                fontSize: 20,
                color: '#999',
                padding: [0, 0, -20, 10],
              },
            },
          },
          data: [
            {
              value: 85,
              name: 'Custom Score',
            },
          ],
        },
      ],
    },
  },
};
