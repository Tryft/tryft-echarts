import type { Meta, StoryObj } from '@storybook/react-vite';
import { GraphChart } from '../components/GraphChart';

const meta = {
  title: 'Charts/GraphChart',
  component: GraphChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A graph chart component for visualizing network relationships, organizational structures, and flow diagrams with rich text labels and detailed tooltips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'number' },
    loading: { control: 'boolean' },
    layout: {
      control: 'select',
      options: ['force', 'circular', 'none'],
    },
  },
} satisfies Meta<typeof GraphChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NetworkDiagram: Story = {
  args: {
    width: 800,
    height: 600,
    nodes: [
      { id: 'node1', name: 'Server 1', value: 10, category: 0 },
      { id: 'node2', name: 'Server 2', value: 15, category: 0 },
      { id: 'node3', name: 'Database', value: 20, category: 1 },
      { id: 'node4', name: 'Load Balancer', value: 12, category: 2 },
      { id: 'node5', name: 'Cache', value: 8, category: 2 },
      { id: 'node6', name: 'Client 1', value: 5, category: 3 },
      { id: 'node7', name: 'Client 2', value: 5, category: 3 },
    ],
    links: [
      { source: 'node4', target: 'node1', value: 1 },
      { source: 'node4', target: 'node2', value: 1 },
      { source: 'node1', target: 'node3', value: 1 },
      { source: 'node2', target: 'node3', value: 1 },
      { source: 'node1', target: 'node5', value: 1 },
      { source: 'node2', target: 'node5', value: 1 },
      { source: 'node6', target: 'node4', value: 1 },
      { source: 'node7', target: 'node4', value: 1 },
    ],
    categories: [{ name: 'Servers' }, { name: 'Database' }, { name: 'Infrastructure' }, { name: 'Clients' }],
    layout: 'force',
  },
};

export const OrganizationalChart: Story = {
  args: {
    width: 700,
    height: 500,
    nodes: [
      { id: 'ceo', name: 'CEO', value: 30, category: 0 },
      { id: 'cto', name: 'CTO', value: 25, category: 1 },
      { id: 'cmo', name: 'CMO', value: 25, category: 1 },
      { id: 'frontend', name: 'Frontend Lead', value: 20, category: 2 },
      { id: 'backend', name: 'Backend Lead', value: 20, category: 2 },
      { id: 'marketing', name: 'Marketing Lead', value: 20, category: 2 },
      { id: 'dev1', name: 'Developer 1', value: 15, category: 3 },
      { id: 'dev2', name: 'Developer 2', value: 15, category: 3 },
      { id: 'dev3', name: 'Developer 3', value: 15, category: 3 },
      { id: 'marketer1', name: 'Marketer 1', value: 15, category: 3 },
    ],
    links: [
      { source: 'ceo', target: 'cto', value: 1 },
      { source: 'ceo', target: 'cmo', value: 1 },
      { source: 'cto', target: 'frontend', value: 1 },
      { source: 'cto', target: 'backend', value: 1 },
      { source: 'cmo', target: 'marketing', value: 1 },
      { source: 'frontend', target: 'dev1', value: 1 },
      { source: 'frontend', target: 'dev2', value: 1 },
      { source: 'backend', target: 'dev3', value: 1 },
      { source: 'marketing', target: 'marketer1', value: 1 },
    ],
    categories: [
      { name: 'Executive' },
      { name: 'Directors' },
      { name: 'Managers' },
      { name: 'Individual Contributors' },
    ],
    layout: 'force',
  },
};

export const SocialNetwork: Story = {
  args: {
    width: 600,
    height: 600,
    nodes: [
      { id: 'user1', name: 'Alice', value: 20, category: 0 },
      { id: 'user2', name: 'Bob', value: 15, category: 0 },
      { id: 'user3', name: 'Charlie', value: 18, category: 0 },
      { id: 'user4', name: 'Diana', value: 12, category: 1 },
      { id: 'user5', name: 'Eve', value: 10, category: 1 },
      { id: 'user6', name: 'Frank', value: 8, category: 1 },
      { id: 'user7', name: 'Grace', value: 14, category: 0 },
    ],
    links: [
      { source: 'user1', target: 'user2', value: 3 },
      { source: 'user1', target: 'user3', value: 2 },
      { source: 'user2', target: 'user3', value: 1 },
      { source: 'user1', target: 'user7', value: 2 },
      { source: 'user4', target: 'user5', value: 3 },
      { source: 'user4', target: 'user6', value: 1 },
      { source: 'user5', target: 'user6', value: 2 },
      { source: 'user3', target: 'user4', value: 1 },
    ],
    categories: [{ name: 'Core Users' }, { name: 'Casual Users' }],
    layout: 'force',
  },
};

export const CircularLayout: Story = {
  args: {
    width: 500,
    height: 500,
    nodes: [
      { id: 'center', name: 'Central Hub', value: 30, category: 0 },
      { id: 'node1', name: 'Node 1', value: 15, category: 1 },
      { id: 'node2', name: 'Node 2', value: 15, category: 1 },
      { id: 'node3', name: 'Node 3', value: 15, category: 1 },
      { id: 'node4', name: 'Node 4', value: 15, category: 1 },
      { id: 'node5', name: 'Node 5', value: 15, category: 1 },
      { id: 'node6', name: 'Node 6', value: 15, category: 1 },
    ],
    links: [
      { source: 'center', target: 'node1', value: 1 },
      { source: 'center', target: 'node2', value: 1 },
      { source: 'center', target: 'node3', value: 1 },
      { source: 'center', target: 'node4', value: 1 },
      { source: 'center', target: 'node5', value: 1 },
      { source: 'center', target: 'node6', value: 1 },
      { source: 'node1', target: 'node2', value: 0.5 },
      { source: 'node2', target: 'node3', value: 0.5 },
      { source: 'node3', target: 'node4', value: 0.5 },
      { source: 'node4', target: 'node5', value: 0.5 },
      { source: 'node5', target: 'node6', value: 0.5 },
      { source: 'node6', target: 'node1', value: 0.5 },
    ],
    categories: [{ name: 'Hub' }, { name: 'Satellites' }],
    layout: 'circular',
  },
};

export const DataFlow: Story = {
  args: {
    width: 800,
    height: 500,
    nodes: [
      { id: 'source', name: 'Data Source', value: 25, category: 0 },
      { id: 'etl', name: 'ETL Process', value: 20, category: 1 },
      { id: 'warehouse', name: 'Data Warehouse', value: 30, category: 2 },
      { id: 'analytics', name: 'Analytics Engine', value: 20, category: 1 },
      { id: 'dashboard', name: 'Dashboard', value: 15, category: 3 },
      { id: 'reports', name: 'Reports', value: 15, category: 3 },
      { id: 'api', name: 'API', value: 10, category: 3 },
    ],
    links: [
      { source: 'source', target: 'etl', value: 2 },
      { source: 'etl', target: 'warehouse', value: 2 },
      { source: 'warehouse', target: 'analytics', value: 2 },
      { source: 'analytics', target: 'dashboard', value: 1 },
      { source: 'analytics', target: 'reports', value: 1 },
      { source: 'warehouse', target: 'api', value: 1 },
    ],
    categories: [{ name: 'Source' }, { name: 'Processing' }, { name: 'Storage' }, { name: 'Output' }],
    layout: 'force',
  },
};

export const Loading: Story = {
  args: {
    width: 600,
    height: 400,
    loading: true,
    nodes: [
      { id: 'node1', name: 'Node 1', value: 10, category: 0 },
      { id: 'node2', name: 'Node 2', value: 15, category: 1 },
    ],
    links: [{ source: 'node1', target: 'node2', value: 1 }],
    categories: [{ name: 'Category 1' }, { name: 'Category 2' }],
    layout: 'force',
  },
};

export const CustomStyling: Story = {
  args: {
    width: 700,
    height: 500,
    option: {
      title: {
        text: 'Custom Graph',
        subtext: 'With custom styling and interactions',
        left: 'center',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Custom Category 1', 'Custom Category 2', 'Custom Category 3'],
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: [
            {
              id: 'node1',
              name: 'Custom Node 1',
              value: 20,
              symbolSize: 40,
              itemStyle: {
                color: '#FF6B6B',
              },
              category: 0,
            },
            {
              id: 'node2',
              name: 'Custom Node 2',
              value: 25,
              symbolSize: 50,
              itemStyle: {
                color: '#4ECDC4',
              },
              category: 1,
            },
            {
              id: 'node3',
              name: 'Custom Node 3',
              value: 15,
              symbolSize: 30,
              itemStyle: {
                color: '#45B7D1',
              },
              category: 2,
            },
          ],
          links: [
            {
              source: 'node1',
              target: 'node2',
              lineStyle: {
                color: '#999',
                width: 3,
              },
            },
            {
              source: 'node2',
              target: 'node3',
              lineStyle: {
                color: '#666',
                width: 2,
              },
            },
          ],
          categories: [{ name: 'Custom Category 1' }, { name: 'Custom Category 2' }, { name: 'Custom Category 3' }],
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            fontSize: 12,
            fontWeight: 'bold',
          },
          force: {
            repulsion: 1000,
            gravity: 0.1,
            edgeLength: 100,
            layoutAnimation: true,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 5,
            },
          },
        },
      ],
    },
  },
};
