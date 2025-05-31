import type { Meta, StoryObj } from '@storybook/react';
import { TreemapChart } from '../components/TreemapChart';

const meta = {
  title: 'Charts/TreemapChart',
  component: TreemapChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A treemap chart component that visualizes hierarchical data as nested rectangles, with rich text labels and detailed tooltips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'number' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof TreemapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompanyStructure: Story = {
  args: {
    width: 800,
    height: 600,
    data: [
      {
        name: 'Engineering',
        value: 120,
        children: [
          {
            name: 'Frontend',
            value: 60,
            children: [
              { name: 'React Team', value: 35 },
              { name: 'Vue Team', value: 25 },
            ],
          },
          {
            name: 'Backend',
            value: 60,
            children: [
              { name: 'Node.js Team', value: 30 },
              { name: 'Python Team', value: 30 },
            ],
          },
        ],
      },
      {
        name: 'Marketing',
        value: 80,
        children: [
          {
            name: 'Digital Marketing',
            value: 50,
            children: [
              { name: 'SEO Team', value: 20 },
              { name: 'Social Media', value: 15 },
              { name: 'Content', value: 15 },
            ],
          },
          {
            name: 'Traditional Marketing',
            value: 30,
            children: [
              { name: 'Print Ads', value: 15 },
              { name: 'Events', value: 15 },
            ],
          },
        ],
      },
      {
        name: 'Sales',
        value: 100,
        children: [
          {
            name: 'Enterprise Sales',
            value: 70,
            children: [
              { name: 'B2B Sales', value: 40 },
              { name: 'Enterprise Support', value: 30 },
            ],
          },
          {
            name: 'SMB Sales',
            value: 30,
            children: [
              { name: 'Inside Sales', value: 20 },
              { name: 'Channel Partners', value: 10 },
            ],
          },
        ],
      },
    ],
  },
};

export const MarketShare: Story = {
  args: {
    width: 700,
    height: 500,
    data: [
      {
        name: 'Technology Sector',
        value: 450,
        children: [
          {
            name: 'Cloud Computing',
            value: 180,
            children: [
              { name: 'AWS', value: 80 },
              { name: 'Azure', value: 60 },
              { name: 'Google Cloud', value: 40 },
            ],
          },
          {
            name: 'Mobile Devices',
            value: 150,
            children: [
              { name: 'Apple', value: 70 },
              { name: 'Samsung', value: 50 },
              { name: 'Others', value: 30 },
            ],
          },
          {
            name: 'Software',
            value: 120,
            children: [
              { name: 'Microsoft', value: 50 },
              { name: 'Oracle', value: 30 },
              { name: 'SAP', value: 25 },
              { name: 'Others', value: 15 },
            ],
          },
        ],
      },
      {
        name: 'Finance Sector',
        value: 300,
        children: [
          {
            name: 'Banking',
            value: 180,
            children: [
              { name: 'JPMorgan Chase', value: 50 },
              { name: 'Bank of America', value: 45 },
              { name: 'Wells Fargo', value: 40 },
              { name: 'Others', value: 45 },
            ],
          },
          {
            name: 'Insurance',
            value: 120,
            children: [
              { name: 'Berkshire Hathaway', value: 60 },
              { name: 'AIG', value: 35 },
              { name: 'Others', value: 25 },
            ],
          },
        ],
      },
    ],
  },
};

export const WebsiteAnalytics: Story = {
  args: {
    width: 600,
    height: 400,
    data: [
      {
        name: 'Website Traffic',
        value: 10000,
        children: [
          {
            name: 'Organic Search',
            value: 4500,
            children: [
              { name: 'Google', value: 3500 },
              { name: 'Bing', value: 600 },
              { name: 'Others', value: 400 },
            ],
          },
          {
            name: 'Direct Traffic',
            value: 2500,
            children: [
              { name: 'Returning Users', value: 1800 },
              { name: 'New Users', value: 700 },
            ],
          },
          {
            name: 'Social Media',
            value: 2000,
            children: [
              { name: 'Facebook', value: 800 },
              { name: 'Twitter', value: 500 },
              { name: 'LinkedIn', value: 400 },
              { name: 'Instagram', value: 300 },
            ],
          },
          {
            name: 'Paid Advertising',
            value: 1000,
            children: [
              { name: 'Google Ads', value: 600 },
              { name: 'Facebook Ads', value: 250 },
              { name: 'Others', value: 150 },
            ],
          },
        ],
      },
    ],
  },
};

export const CustomSquareRatio: Story = {
  args: {
    width: 600,
    height: 400,

    data: [
      {
        name: 'Product Categories',
        value: 1000,
        children: [
          {
            name: 'Electronics',
            value: 400,
            children: [
              { name: 'Phones', value: 200 },
              { name: 'Laptops', value: 150 },
              { name: 'Tablets', value: 50 },
            ],
          },
          {
            name: 'Clothing',
            value: 300,
            children: [
              { name: 'Men', value: 150 },
              { name: 'Women', value: 120 },
              { name: 'Kids', value: 30 },
            ],
          },
          {
            name: 'Home & Garden',
            value: 200,
            children: [
              { name: 'Furniture', value: 120 },
              { name: 'Garden Tools', value: 80 },
            ],
          },
          {
            name: 'Books',
            value: 100,
            children: [
              { name: 'Fiction', value: 60 },
              { name: 'Non-fiction', value: 40 },
            ],
          },
        ],
      },
    ],
  },
};

export const SingleLevel: Story = {
  args: {
    width: 600,
    height: 400,

    data: [
      {
        name: 'Revenue by Quarter',
        value: 1000,
        children: [
          { name: 'Q1 2024', value: 250 },
          { name: 'Q2 2024', value: 300 },
          { name: 'Q3 2024', value: 280 },
          { name: 'Q4 2024', value: 170 },
        ],
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    width: 600,
    height: 400,
    loading: true,
    data: [
      {
        name: 'Loading Data',
        value: 100,
        children: [
          { name: 'Category 1', value: 50 },
          { name: 'Category 2', value: 50 },
        ],
      },
    ],
  },
};

export const CustomStyling: Story = {
  args: {
    width: 700,
    height: 500,
    option: {
      title: {
        text: 'Custom Treemap',
        subtext: 'With custom styling and colors',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textStyle: {
          color: '#fff',
        },
      },
      series: [
        {
          type: 'treemap',
          data: [
            {
              name: 'Custom Root',
              value: 300,
              children: [
                {
                  name: 'Branch A',
                  value: 150,
                  itemStyle: { color: '#FF6B6B' },
                  children: [
                    { name: 'Leaf A1', value: 80, itemStyle: { color: '#FF8E8E' } },
                    { name: 'Leaf A2', value: 70, itemStyle: { color: '#FFB1B1' } },
                  ],
                },
                {
                  name: 'Branch B',
                  value: 150,
                  itemStyle: { color: '#4ECDC4' },
                  children: [
                    { name: 'Leaf B1', value: 90, itemStyle: { color: '#71D7D0' } },
                    { name: 'Leaf B2', value: 60, itemStyle: { color: '#94E1DC' } },
                  ],
                },
              ],
            },
          ],
          top: '80px',
          left: 'center',
          width: '80%',
          height: '80%',
          roam: false,
          breadcrumb: {
            show: true,
            height: 30,
            itemStyle: {
              color: '#333',
              textStyle: {
                color: '#fff',
              },
            },
          },
          label: {
            show: true,
            formatter: '{b}: {c}',
            fontSize: 12,
            fontWeight: 'bold',
          },
          upperLabel: {
            show: true,
            height: 30,
            formatter: '{b}',
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
      ],
    },
  },
};
