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
  parameters: {
    docs: {
      source: {
        code: `<TreeChart
  width={900}
  height={700}
  data={{
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
          // ... more divisions
        ],
      },
      // ... more C-level executives
    ],
  }}
  layout="orthogonal"
  orient="LR"
  onNodeClick={(nodeData, params) => {
    console.log('Node clicked:', nodeData.name, 'Value:', nodeData.value);
    alert(\`Clicked on: \${nodeData.name}\\nValue: \${nodeData.value}\`);
  }}
/>`,
      },
    },
  },
};

export const MultipleRootNodes: Story = {
  name: 'Forest Structure (Multiple Root Nodes)',
  args: {
    width: 1000,
    height: 800,
    data: [
      {
        name: 'Technology Division',
        value: 100,
        description: 'Independent technology unit',
        children: [
          {
            name: 'Engineering',
            value: 80,
            children: [
              { name: 'Senior Engineer A', value: 60, description: 'Full-stack development' },
              { name: 'Senior Engineer B', value: 58, description: 'Backend specialist' },
              { name: 'Junior Engineer A', value: 35, description: 'Frontend development' },
              { name: 'Junior Engineer B', value: 32, description: 'Mobile development' },
              { name: 'Intern A', value: 20, description: 'Learning & support' },
            ],
          },
          {
            name: 'Design',
            value: 60,
            children: [
              { name: 'UI Designer', value: 45, description: 'User interface design' },
              { name: 'UX Designer', value: 50, description: 'User experience design' },
              { name: 'Graphic Designer', value: 40, description: 'Visual design' },
            ],
          },
        ],
      },
      {
        name: 'Research Division',
        value: 90,
        description: 'Independent research unit',
        children: [
          {
            name: 'AI Research',
            value: 75,
            children: [
              { name: 'ML Researcher A', value: 65, description: 'Machine learning research' },
              { name: 'ML Researcher B', value: 62, description: 'Deep learning research' },
              { name: 'Data Scientist A', value: 55, description: 'Data analysis & modeling' },
              { name: 'Data Scientist B', value: 58, description: 'Statistical modeling' },
            ],
          },
          {
            name: 'Product Research',
            value: 70,
            children: [
              { name: 'Market Researcher', value: 50, description: 'Market analysis' },
              { name: 'User Researcher', value: 52, description: 'User behavior research' },
              { name: 'Product Analyst', value: 48, description: 'Product analytics' },
            ],
          },
        ],
      },
      {
        name: 'Innovation Lab',
        value: 85,
        description: 'Experimental innovation unit',
        children: [
          {
            name: 'Prototyping',
            value: 65,
            children: [
              { name: 'Hardware Prototyper', value: 45, description: 'Hardware prototyping' },
              { name: 'Software Prototyper', value: 48, description: 'Software prototyping' },
              { name: 'Design Prototyper', value: 42, description: 'Design prototyping' },
            ],
          },
          {
            name: 'Emerging Tech',
            value: 70,
            children: [
              { name: 'Blockchain Specialist', value: 55, description: 'Blockchain technology' },
              { name: 'IoT Specialist', value: 52, description: 'Internet of Things' },
              { name: 'AR/VR Specialist', value: 58, description: 'Augmented & Virtual Reality' },
              { name: 'Quantum Researcher', value: 60, description: 'Quantum computing research' },
            ],
          },
        ],
      },
    ],
    layout: 'orthogonal',
    orient: 'TB',
    onNodeClick: (nodeData, _params) => {
      console.log('Multi-root node clicked:', nodeData.name);
      alert(`Forest Node: ${nodeData.name}\nValue: ${nodeData.value}\nType: ${nodeData.description || 'Department'}`);
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeChart
  width={1000}
  height={800}
  data={[
    {
      name: 'Technology Division',
      value: 100,
      description: 'Independent technology unit',
      children: [
        {
          name: 'Engineering',
          value: 80,
          children: [
            { name: 'Senior Engineer A', value: 60, description: 'Full-stack development' },
            { name: 'Senior Engineer B', value: 58, description: 'Backend specialist' },
            { name: 'Junior Engineer A', value: 35, description: 'Frontend development' },
            { name: 'Junior Engineer B', value: 32, description: 'Mobile development' },
            { name: 'Intern A', value: 20, description: 'Learning & support' },
          ],
        },
        // ... more teams
      ],
    },
    {
      name: 'Research Division',
      value: 90,
      description: 'Independent research unit',
      children: [
        // ... research teams
      ],
    },
    {
      name: 'Innovation Lab',
      value: 85,
      description: 'Experimental innovation unit',
      children: [
        // ... innovation teams
      ],
    },
  ]}
  layout="orthogonal"
  orient="TB"
  onNodeClick={(nodeData, params) => {
    console.log('Multi-root node clicked:', nodeData.name);
    alert(\`Forest Node: \${nodeData.name}\\nValue: \${nodeData.value}\`);
  }}
/>`,
      },
    },
  },
};

export const ExtendedFamilyTree: Story = {
  name: 'Extended Family Tree (Many Generations)',
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
                { name: 'Child A2-1', value: 34, description: 'Third generation' },
                { name: 'Child A2-2', value: 37, description: 'Third generation' },
                { name: 'Child A2-3', value: 35, description: 'Third generation' },
              ],
            },
          ],
        },
        {
          name: 'Grandparent B',
          value: 82,
          description: 'First generation descendant',
          children: [
            {
              name: 'Parent B1',
              value: 65,
              description: 'Second generation - Branch B',
              children: [
                { name: 'Child B1-1', value: 30, description: 'Third generation' },
                { name: 'Child B1-2', value: 33, description: 'Third generation' },
                { name: 'Child B1-3', value: 31, description: 'Third generation' },
                { name: 'Child B1-4', value: 34, description: 'Third generation' },
                { name: 'Child B1-5', value: 29, description: 'Third generation' },
              ],
            },
            {
              name: 'Parent B2',
              value: 72,
              description: 'Second generation - Branch B',
              children: [
                { name: 'Child B2-1', value: 36, description: 'Third generation' },
                { name: 'Child B2-2', value: 39, description: 'Third generation' },
              ],
            },
            {
              name: 'Parent B3',
              value: 69,
              description: 'Second generation - Branch B',
              children: [
                { name: 'Child B3-1', value: 35, description: 'Third generation' },
                { name: 'Child B3-2', value: 33, description: 'Third generation' },
                { name: 'Child B3-3', value: 37, description: 'Third generation' },
              ],
            },
          ],
        },
        {
          name: 'Grandparent C',
          value: 80,
          description: 'First generation descendant',
          children: [
            {
              name: 'Parent C1',
              value: 66,
              description: 'Second generation - Branch C',
              children: [
                { name: 'Child C1-1', value: 32, description: 'Third generation' },
                { name: 'Child C1-2', value: 35, description: 'Third generation' },
                { name: 'Child C1-3', value: 33, description: 'Third generation' },
                { name: 'Child C1-4', value: 31, description: 'Third generation' },
              ],
            },
          ],
        },
      ],
    },
    layout: 'orthogonal',
    orient: 'TB',
    onNodeClick: (nodeData, _params) => {
      console.log('Family member clicked:', nodeData.name);
      alert(
        `Family Member: ${nodeData.name}\nGeneration Value: ${nodeData.value}\nDescription: ${nodeData.description}`,
      );
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeChart
  width={800}
  height={700}
  data={{
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
          // ... more parents
        ],
      },
      // ... more grandparents
    ],
  }}
  layout="orthogonal"
  orient="TB"
  onNodeClick={(nodeData, params) => {
    console.log('Family member clicked:', nodeData.name);
    alert(\`Family Member: \${nodeData.name}\\nGeneration Value: \${nodeData.value}\`);
  }}
/>`,
      },
    },
  },
};

export const RadialMultiBranch: Story = {
  name: 'Radial Layout (Many Branches)',
  args: {
    width: 700,
    height: 700,
    data: {
      name: 'Central Hub',
      value: 100,
      description: 'Main coordination center',
      children: [
        {
          name: 'North Division',
          value: 80,
          children: [
            { name: 'North Team A', value: 40, description: 'Northern operations A' },
            { name: 'North Team B', value: 42, description: 'Northern operations B' },
            { name: 'North Team C', value: 38, description: 'Northern operations C' },
          ],
        },
        {
          name: 'South Division',
          value: 75,
          children: [
            { name: 'South Team A', value: 35, description: 'Southern operations A' },
            { name: 'South Team B', value: 37, description: 'Southern operations B' },
            { name: 'South Team C', value: 39, description: 'Southern operations C' },
            { name: 'South Team D', value: 33, description: 'Southern operations D' },
          ],
        },
        {
          name: 'East Division',
          value: 70,
          children: [
            { name: 'East Team A', value: 32, description: 'Eastern operations A' },
            { name: 'East Team B', value: 35, description: 'Eastern operations B' },
            { name: 'East Team C', value: 30, description: 'Eastern operations C' },
            { name: 'East Team D', value: 34, description: 'Eastern operations D' },
            { name: 'East Team E', value: 31, description: 'Eastern operations E' },
          ],
        },
        {
          name: 'West Division',
          value: 85,
          children: [
            { name: 'West Team A', value: 45, description: 'Western operations A' },
            { name: 'West Team B', value: 43, description: 'Western operations B' },
            { name: 'West Team C', value: 41, description: 'Western operations C' },
          ],
        },
        {
          name: 'Central Division',
          value: 78,
          children: [
            { name: 'Central Team A', value: 36, description: 'Central operations A' },
            { name: 'Central Team B', value: 38, description: 'Central operations B' },
            { name: 'Central Team C', value: 40, description: 'Central operations C' },
            { name: 'Central Team D', value: 35, description: 'Central operations D' },
          ],
        },
      ],
    },
    layout: 'radial',
    onNodeClick: (nodeData, _params) => {
      console.log('Radial node clicked:', nodeData.name);
      alert(
        `Radial Node: ${nodeData.name}\nValue: ${nodeData.value}\nLocation: ${nodeData.description || 'Central hub'}`,
      );
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeChart
  width={700}
  height={700}
  data={{
    name: 'Central Hub',
    value: 100,
    description: 'Main coordination center',
    children: [
      {
        name: 'North Division',
        value: 80,
        children: [
          { name: 'North Team A', value: 40, description: 'Northern operations A' },
          { name: 'North Team B', value: 42, description: 'Northern operations B' },
          { name: 'North Team C', value: 38, description: 'Northern operations C' },
        ],
      },
      // ... more divisions (South, East, West, Central)
    ],
  }}
  layout="radial"
  onNodeClick={(nodeData, params) => {
    console.log('Radial node clicked:', nodeData.name);
    alert(\`Radial Node: \${nodeData.name}\\nValue: \${nodeData.value}\`);
  }}
/>`,
      },
    },
  },
};

export const InteractiveTree: Story = {
  name: 'Interactive Tree with Click Events',
  args: {
    width: 800,
    height: 600,
    data: {
      name: 'Interactive Root',
      value: 100,
      description: 'Click any node to see interaction',
      children: [
        {
          name: 'Department A',
          value: 80,
          description: 'First department - click to explore',
          children: [
            {
              name: 'Team Alpha',
              value: 40,
              description: 'Alpha team specializing in innovation',
              children: [
                { name: 'Member 1', value: 20, description: 'Senior developer' },
                { name: 'Member 2', value: 25, description: 'Lead designer' },
                { name: 'Member 3', value: 22, description: 'Product manager' },
              ],
            },
            {
              name: 'Team Beta',
              value: 45,
              description: 'Beta team focusing on optimization',
              children: [
                { name: 'Member 4', value: 22, description: 'Data analyst' },
                { name: 'Member 5', value: 28, description: 'Systems architect' },
                { name: 'Member 6', value: 24, description: 'DevOps engineer' },
                { name: 'Member 7', value: 26, description: 'Quality assurance' },
              ],
            },
          ],
        },
        {
          name: 'Department B',
          value: 75,
          description: 'Second department - click to explore',
          children: [
            {
              name: 'Team Gamma',
              value: 35,
              description: 'Gamma team handling research',
              children: [
                { name: 'Researcher 1', value: 18, description: 'Machine learning specialist' },
                { name: 'Researcher 2', value: 20, description: 'Data scientist' },
                { name: 'Researcher 3', value: 19, description: 'Algorithm designer' },
                { name: 'Researcher 4', value: 21, description: 'Statistical analyst' },
                { name: 'Researcher 5', value: 17, description: 'Research assistant' },
              ],
            },
          ],
        },
      ],
    },
    layout: 'orthogonal',
    orient: 'LR',
    onNodeClick: (nodeData, _params) => {
      const childrenCount = nodeData.children ? nodeData.children.length : 0;
      const nodeType = childrenCount > 0 ? 'Branch' : 'Leaf';
      console.log('Interactive node clicked:', {
        name: nodeData.name,
        value: nodeData.value,
        type: nodeType,
        children: childrenCount,
        description: nodeData.description,
      });

      alert(`🎯 Node Interaction Detected!
      
Node: ${nodeData.name}
Type: ${nodeType} (${childrenCount} children)
Value: ${nodeData.value}
Description: ${nodeData.description || 'No description available'}

💡 This callback is triggered after the expansion animation completes!`);
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeChart
  width={800}
  height={600}
  data={{
    name: 'Interactive Root',
    value: 100,
    description: 'Click any node to see interaction',
    children: [
      {
        name: 'Department A',
        value: 80,
        description: 'First department - click to explore',
        children: [
          {
            name: 'Team Alpha',
            value: 40,
            description: 'Alpha team specializing in innovation',
            children: [
              { name: 'Member 1', value: 20, description: 'Senior developer' },
              { name: 'Member 2', value: 25, description: 'Lead designer' },
              { name: 'Member 3', value: 22, description: 'Product manager' },
            ],
          },
          // ... more teams
        ],
      },
      // ... more departments
    ],
  }}
  layout="orthogonal"
  orient="LR"
  onNodeClick={(nodeData, params) => {
    const childrenCount = nodeData.children ? nodeData.children.length : 0;
    const nodeType = childrenCount > 0 ? 'Branch' : 'Leaf';
    
    console.log('Interactive node clicked:', {
      name: nodeData.name,
      value: nodeData.value,
      type: nodeType,
      children: childrenCount,
      description: nodeData.description,
    });
    
    alert(\`🎯 Node Interaction Detected!
    
Node: \${nodeData.name}
Type: \${nodeType} (\${childrenCount} children)
Value: \${nodeData.value}
Description: \${nodeData.description || 'No description available'}

💡 This callback is triggered after the expansion animation completes!\`);
  }}
/>`,
      },
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
  parameters: {
    docs: {
      source: {
        code: `<TreeChart
  width={600}
  height={400}
  loading={true}
  data={{
    name: 'Loading Root',
    value: 100,
    children: [
      { name: 'Child 1', value: 50 },
      { name: 'Child 2', value: 60 },
    ],
  }}
/>`,
      },
    },
  },
};
