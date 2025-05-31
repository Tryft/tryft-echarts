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
          'A hierarchical tree chart component with rich text labels and detailed tooltips. Supports single trees, forests (multiple root nodes), and interactive node clicking with animation support.',
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

export const LargeOrganization: Story = {
  name: 'Large Organization (Many Children)',
  args: {
    width: 900,
    height: 700,
    data: {
      name: 'CEO',
      value: 100,
      description: 'Chief Executive Officer - Company Leadership',
      children: [
        {
          name: 'CTO',
          value: 85,
          description: 'Chief Technology Officer',
          children: [
            {
              name: 'Frontend Division',
              value: 70,
              children: [
                { name: 'React Team Lead', value: 50, description: 'Leading React development' },
                { name: 'Vue Team Lead', value: 45, description: 'Leading Vue development' },
                { name: 'Angular Team Lead', value: 48, description: 'Leading Angular development' },
                { name: 'Mobile Team Lead', value: 52, description: 'Leading mobile development' },
              ],
            },
            {
              name: 'Backend Division',
              value: 75,
              children: [
                { name: 'API Team Lead', value: 55, description: 'REST & GraphQL APIs' },
                { name: 'Database Team Lead', value: 60, description: 'Database architecture' },
                { name: 'DevOps Team Lead', value: 65, description: 'Infrastructure & deployment' },
                { name: 'Security Team Lead', value: 58, description: 'Application security' },
                { name: 'Microservices Lead', value: 62, description: 'Microservices architecture' },
              ],
            },
            {
              name: 'QA Division',
              value: 60,
              children: [
                { name: 'Manual Testing Lead', value: 40, description: 'Manual testing processes' },
                { name: 'Automation Lead', value: 45, description: 'Test automation' },
                { name: 'Performance Lead', value: 48, description: 'Performance testing' },
              ],
            },
          ],
        },
        {
          name: 'CMO',
          value: 80,
          description: 'Chief Marketing Officer',
          children: [
            {
              name: 'Digital Marketing',
              value: 65,
              children: [
                { name: 'SEO Specialist', value: 35, description: 'Search engine optimization' },
                { name: 'SEM Manager', value: 40, description: 'Search engine marketing' },
                { name: 'Social Media Manager', value: 38, description: 'Social media strategy' },
                { name: 'Content Creator', value: 32, description: 'Content creation & strategy' },
                { name: 'Email Marketing Lead', value: 36, description: 'Email campaigns' },
              ],
            },
            {
              name: 'Traditional Marketing',
              value: 55,
              children: [
                { name: 'PR Manager', value: 42, description: 'Public relations' },
                { name: 'Event Coordinator', value: 38, description: 'Event planning & execution' },
                { name: 'Brand Manager', value: 45, description: 'Brand strategy & management' },
              ],
            },
          ],
        },
        {
          name: 'COO',
          value: 82,
          description: 'Chief Operating Officer',
          children: [
            {
              name: 'Sales Division',
              value: 70,
              children: [
                { name: 'Enterprise Sales', value: 55, description: 'B2B enterprise sales' },
                { name: 'SMB Sales', value: 45, description: 'Small & medium business sales' },
                { name: 'Inside Sales', value: 42, description: 'Inbound sales team' },
                { name: 'Sales Engineering', value: 50, description: 'Technical sales support' },
              ],
            },
            {
              name: 'Customer Success',
              value: 60,
              children: [
                { name: 'Onboarding Team', value: 35, description: 'Customer onboarding' },
                { name: 'Support Team', value: 40, description: 'Customer support' },
                { name: 'Account Management', value: 45, description: 'Account management' },
              ],
            },
          ],
        },
      ],
    },
    layout: 'orthogonal',
    orient: 'LR',
    onNodeClick: (nodeData, _params) => {
      console.log('Node clicked:', nodeData.name, 'Value:', nodeData.value);
      alert(
        `Clicked on: ${nodeData.name}\nValue: ${nodeData.value}\nDescription: ${nodeData.description || 'No description'}`,
      );
    },
  },
};

export const BasicExample: Story = {
  name: 'Basic Tree Example',
  args: {
    width: 600,
    height: 400,
    data: {
      name: 'Root',
      value: 100,
      children: [
        {
          name: 'Branch 1',
          value: 75,
          children: [
            { name: 'Leaf 1-1', value: 50 },
            { name: 'Leaf 1-2', value: 45 },
          ],
        },
        {
          name: 'Branch 2',
          value: 80,
          children: [
            { name: 'Leaf 2-1', value: 55 },
            { name: 'Leaf 2-2', value: 60 },
            { name: 'Leaf 2-3', value: 52 },
          ],
        },
      ],
    },
    layout: 'orthogonal',
    orient: 'LR',
  },
};

export const RadialLayout: Story = {
  name: 'Radial Layout Example',
  args: {
    width: 600,
    height: 600,
    data: {
      name: 'Center',
      value: 100,
      children: [
        {
          name: 'Branch A',
          value: 75,
          children: [
            { name: 'Leaf A1', value: 30 },
            { name: 'Leaf A2', value: 25 },
            { name: 'Leaf A3', value: 35 },
          ],
        },
        {
          name: 'Branch B',
          value: 85,
          children: [
            { name: 'Leaf B1', value: 40 },
            { name: 'Leaf B2', value: 45 },
          ],
        },
        {
          name: 'Branch C',
          value: 65,
          children: [
            { name: 'Leaf C1', value: 20 },
            { name: 'Leaf C2', value: 25 },
            { name: 'Leaf C3', value: 30 },
            { name: 'Leaf C4', value: 15 },
          ],
        },
      ],
    },
    layout: 'radial',
  },
};

export const ExtendedFamilyTree: Story = {
  name: 'Extended Family Tree',
  args: {
    width: 800,
    height: 700,
    data: {
      name: 'Great Grandparents',
      value: 100,
      description: 'Founded the family lineage',
      children: [
        {
          name: 'Grandparent A',
          value: 85,
          description: 'First generation descendant',
          children: [
            {
              name: 'Parent A1',
              value: 70,
              description: 'Second generation - Branch A',
              children: [
                { name: 'Child A1-1', value: 35, description: 'Third generation' },
                { name: 'Child A1-2', value: 38, description: 'Third generation' },
                { name: 'Child A1-3', value: 32, description: 'Third generation' },
                { name: 'Child A1-4', value: 36, description: 'Third generation' },
              ],
            },
            {
              name: 'Parent A2',
              value: 68,
              description: 'Second generation - Branch A',
              children: [
                { name: 'Child A2-1', value: 33, description: 'Third generation' },
                { name: 'Child A2-2', value: 37, description: 'Third generation' },
              ],
            },
          ],
        },
        {
          name: 'Grandparent B',
          value: 80,
          description: 'First generation descendant',
          children: [
            {
              name: 'Parent B1',
              value: 65,
              description: 'Second generation - Branch B',
              children: [
                { name: 'Child B1-1', value: 30, description: 'Third generation' },
                { name: 'Child B1-2', value: 34, description: 'Third generation' },
                { name: 'Child B1-3', value: 31, description: 'Third generation' },
              ],
            },
          ],
        },
        {
          name: 'Grandparent C',
          value: 88,
          description: 'First generation descendant',
          children: [
            {
              name: 'Parent C1',
              value: 72,
              description: 'Second generation - Branch C',
              children: [
                { name: 'Child C1-1', value: 32, description: 'Third generation' },
                { name: 'Child C1-2', value: 35, description: 'Third generation' },
                { name: 'Child C1-3', value: 33, description: 'Third generation' },
              ],
            },
          ],
        },
      ],
    },
    layout: 'orthogonal',
    orient: 'LR',
    onNodeClick: (nodeData, _params) => {
      console.log('Family tree node clicked:', nodeData.name);
      alert(
        `Family Member: ${nodeData.name}\nValue: ${nodeData.value}\nGeneration: ${nodeData.description || 'Unknown'}`,
      );
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
