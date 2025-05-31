import type { Meta, StoryObj } from '@storybook/react';
import { TreeChart } from '../components/TreeChart';

const meta = {
  title: 'Charts/TreeChart',
  component: TreeChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A hierarchical tree chart component with rich text labels and detailed tooltips, perfect for organizational charts and family trees.',
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
      options: ['orthogonal', 'radial'],
    },
    orient: {
      control: 'select',
      options: ['LR', 'RL', 'TB', 'BT'],
    },
  },
} satisfies Meta<typeof TreeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrganizationChart: Story = {
  args: {
    width: 800,
    height: 600,
    data: {
      name: 'CEO',
      value: 100,
      children: [
        {
          name: 'CTO',
          value: 80,
          children: [
            {
              name: 'Frontend Team Lead',
              value: 60,
              children: [
                { name: 'React Developer', value: 40 },
                { name: 'Vue Developer', value: 35 },
              ],
            },
            {
              name: 'Backend Team Lead',
              value: 70,
              children: [
                { name: 'Node.js Developer', value: 45 },
                { name: 'Python Developer', value: 50 },
              ],
            },
          ],
        },
        {
          name: 'CMO',
          value: 75,
          children: [
            {
              name: 'Marketing Manager',
              value: 55,
              children: [
                { name: 'Content Creator', value: 30 },
                { name: 'SEO Specialist', value: 35 },
              ],
            },
            {
              name: 'Sales Manager',
              value: 65,
              children: [
                { name: 'Sales Rep A', value: 25 },
                { name: 'Sales Rep B', value: 30 },
              ],
            },
          ],
        },
      ],
    },
    layout: 'orthogonal',
    orient: 'LR',
  },
};

export const FamilyTree: Story = {
  args: {
    width: 700,
    height: 500,
    data: {
      name: 'Grandparents',
      value: 100,
      children: [
        {
          name: 'Parent A',
          value: 80,
          children: [
            { name: 'Child A1', value: 40 },
            { name: 'Child A2', value: 45 },
          ],
        },
        {
          name: 'Parent B',
          value: 75,
          children: [
            { name: 'Child B1', value: 35 },
            { name: 'Child B2', value: 40 },
            { name: 'Child B3', value: 38 },
          ],
        },
      ],
    },
    layout: 'orthogonal',
    orient: 'TB',
  },
};

export const RadialTree: Story = {
  args: {
    width: 600,
    height: 600,
    data: {
      name: 'Root Node',
      value: 100,
      children: [
        {
          name: 'Branch A',
          value: 60,
          children: [
            { name: 'Leaf A1', value: 30 },
            { name: 'Leaf A2', value: 25 },
          ],
        },
        {
          name: 'Branch B',
          value: 70,
          children: [
            { name: 'Leaf B1', value: 35 },
            { name: 'Leaf B2', value: 40 },
          ],
        },
        {
          name: 'Branch C',
          value: 50,
          children: [
            { name: 'Leaf C1', value: 20 },
            { name: 'Leaf C2', value: 25 },
            { name: 'Leaf C3', value: 30 },
          ],
        },
      ],
    },
    layout: 'radial',
  },
};

export const InteractiveTree: Story = {
  args: {
    width: 800,
    height: 600,
    data: {
      name: 'Interactive Root',
      value: 100,
      children: [
        {
          name: 'Department A',
          value: 80,
          children: [
            {
              name: 'Team Alpha',
              value: 40,
              children: [
                { name: 'Member 1', value: 20 },
                { name: 'Member 2', value: 25 },
              ],
            },
            {
              name: 'Team Beta',
              value: 45,
              children: [
                { name: 'Member 3', value: 22 },
                { name: 'Member 4', value: 28 },
              ],
            },
          ],
        },
        {
          name: 'Department B',
          value: 75,
          children: [
            {
              name: 'Team Gamma',
              value: 35,
              children: [
                { name: 'Member 5', value: 18 },
                { name: 'Member 6', value: 20 },
              ],
            },
          ],
        },
      ],
    },
    layout: 'orthogonal',
    orient: 'LR',
    onEvents: {
      click: (params: unknown) => console.log('Node clicked:', params),
    },
  },
};

export const Loading: Story = {
  args: {
    width: 600,
    height: 400,
    loading: true,
    data: {
      name: 'Loading Root',
      value: 100,
      children: [
        { name: 'Child 1', value: 50 },
        { name: 'Child 2', value: 60 },
      ],
    },
  },
};

export const CustomStyling: Story = {
  args: {
    width: 700,
    height: 500,
    option: {
      series: [
        {
          type: 'tree',
          data: [
            {
              name: 'Custom Root',
              value: 100,
              children: [
                {
                  name: 'Custom Branch A',
                  value: 60,
                  children: [
                    { name: 'Custom Leaf A1', value: 30 },
                    { name: 'Custom Leaf A2', value: 35 },
                  ],
                },
                {
                  name: 'Custom Branch B',
                  value: 70,
                  children: [{ name: 'Custom Leaf B1', value: 40 }],
                },
              ],
            },
          ],
          top: '10%',
          left: '10%',
          bottom: '10%',
          right: '20%',
          symbolSize: 12,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 14,
            color: '#2c5aa0',
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
              color: '#d73027',
            },
          },
          emphasis: {
            focus: 'descendant',
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    },
  },
};
