import type { Meta, StoryObj } from '@storybook/react';
import { DAGChart } from '../components/DAGChart';

const meta = {
  title: 'Charts/DAGChart',
  component: DAGChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A Directed Acyclic Graph (DAG) Chart component designed for manufacturing workflows and production processes. Features layered layout with proper directionality, ensuring nodes at the same relationship level are aligned vertically for better understanding of dependencies and flow.',
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
      options: ['layered', 'force'],
    },
    direction: {
      control: 'select',
      options: ['LR', 'TB'],
    },
    draggable: { control: 'boolean' },
    roam: { control: 'boolean' },
  },
} satisfies Meta<typeof DAGChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicManufacturingFlow: Story = {
  name: 'Basic Manufacturing Flow (Layered)',
  args: {
    width: 1000,
    height: 600,
    layout: 'layered',
    direction: 'LR',
    draggable: true,
    roam: true,
    data: {
      nodes: [
        // Level 0 - Raw Materials
        {
          id: 'steel',
          name: 'Steel Sheets',
          value: 20,
          level: 0,
          category: 0,
          description: 'High-grade steel material',
        },
        {
          id: 'aluminum',
          name: 'Aluminum',
          value: 15,
          level: 0,
          category: 0,
          description: 'Lightweight aluminum alloy',
        },
        { id: 'plastic', name: 'ABS Plastic', value: 8, level: 0, category: 0, description: 'Durable plastic resin' },

        // Level 1 - Processed Components
        {
          id: 'frame',
          name: 'Main Frame',
          value: 35,
          level: 1,
          category: 1,
          description: 'Structural chassis assembly',
        },
        { id: 'housing', name: 'Housing', value: 23, level: 1, category: 1, description: 'Protective outer shell' },

        // Level 2 - Sub-Assemblies
        {
          id: 'subassembly',
          name: 'Sub-Assembly',
          value: 58,
          level: 2,
          category: 2,
          description: 'Integrated component unit',
        },

        // Level 3 - Final Product
        {
          id: 'final',
          name: 'Final Product',
          value: 100,
          level: 3,
          category: 3,
          description: 'Complete manufactured item',
        },
      ],
      links: [
        { source: 'steel', target: 'frame', value: 15 },
        { source: 'aluminum', target: 'frame', value: 10 },
        { source: 'aluminum', target: 'housing', value: 8 },
        { source: 'plastic', target: 'housing', value: 6 },
        { source: 'frame', target: 'subassembly', value: 25 },
        { source: 'housing', target: 'subassembly', value: 15 },
        { source: 'subassembly', target: 'final', value: 40 },
      ],
      categories: [
        { name: 'Raw Materials', itemStyle: { color: '#3498db' } },
        { name: 'Components', itemStyle: { color: '#e74c3c' } },
        { name: 'Sub-Assemblies', itemStyle: { color: '#f39c12' } },
        { name: 'Final Products', itemStyle: { color: '#2ecc71' } },
      ],
    },
    onNodeClick: (nodeData, _params) => {
      console.log('DAG Node clicked:', nodeData.name, 'Level:', nodeData.level);
      alert(
        `Node: ${nodeData.name}\nLevel: ${nodeData.level}\nCategory: ${nodeData.category}\nValue: ${nodeData.value}`,
      );
    },
    onEdgeClick: (linkData, _params) => {
      console.log('DAG Edge clicked:', linkData.source, '→', linkData.target);
      alert(`Flow: ${linkData.source} → ${linkData.target}\nValue: ${linkData.value || 'N/A'}`);
    },
  },
};

export const ComplexProductionNetwork: Story = {
  name: 'Complex Production Network (Multiple Dependencies)',
  args: {
    width: 1200,
    height: 700,
    layout: 'layered',
    direction: 'LR',
    draggable: true,
    roam: true,
    data: {
      nodes: [
        // Level 0 - Raw Materials
        { id: 'mat1', name: 'Steel', value: 25, level: 0, category: 0, description: 'High-grade steel sheets' },
        { id: 'mat2', name: 'Copper', value: 18, level: 0, category: 0, description: 'Electrical conductor' },
        { id: 'mat3', name: 'Silicon', value: 22, level: 0, category: 0, description: 'Semiconductor base' },
        { id: 'mat4', name: 'Plastic', value: 12, level: 0, category: 0, description: 'ABS polymer' },

        // Level 1 - Primary Processing
        { id: 'comp1', name: 'Chassis', value: 35, level: 1, category: 1, description: 'Steel frame structure' },
        { id: 'comp2', name: 'Wiring', value: 28, level: 1, category: 1, description: 'Copper wire harness' },
        { id: 'comp3', name: 'Circuit Board', value: 40, level: 1, category: 1, description: 'Silicon-based PCB' },
        { id: 'comp4', name: 'Enclosure', value: 20, level: 1, category: 1, description: 'Plastic housing' },

        // Level 2 - Sub-Assemblies
        { id: 'sub1', name: 'Power Unit', value: 63, level: 2, category: 2, description: 'Electrical power system' },
        { id: 'sub2', name: 'Control Module', value: 68, level: 2, category: 2, description: 'Logic processing unit' },
        {
          id: 'sub3',
          name: 'Interface Panel',
          value: 48,
          level: 2,
          category: 2,
          description: 'User interaction system',
        },

        // Level 3 - Final Products
        { id: 'prod1', name: 'Device A', value: 120, level: 3, category: 3, description: 'Standard configuration' },
        { id: 'prod2', name: 'Device B', value: 140, level: 3, category: 3, description: 'Premium configuration' },
      ],
      links: [
        // Raw materials to components
        { source: 'mat1', target: 'comp1', value: 20 },
        { source: 'mat2', target: 'comp2', value: 15 },
        { source: 'mat2', target: 'comp3', value: 8 },
        { source: 'mat3', target: 'comp3', value: 18 },
        { source: 'mat4', target: 'comp4', value: 10 },

        // Components to sub-assemblies
        { source: 'comp1', target: 'sub1', value: 15 },
        { source: 'comp2', target: 'sub1', value: 12 },
        { source: 'comp3', target: 'sub2', value: 20 },
        { source: 'comp2', target: 'sub2', value: 8 },
        { source: 'comp4', target: 'sub3', value: 12 },
        { source: 'comp3', target: 'sub3', value: 10 },

        // Cross-level dependencies
        { source: 'mat1', target: 'sub1', value: 5 },
        { source: 'comp1', target: 'sub2', value: 6 },

        // Sub-assemblies to final products
        { source: 'sub1', target: 'prod1', value: 25 },
        { source: 'sub2', target: 'prod1', value: 30 },
        { source: 'sub1', target: 'prod2', value: 28 },
        { source: 'sub2', target: 'prod2', value: 35 },
        { source: 'sub3', target: 'prod2', value: 20 },

        // Shared components
        { source: 'sub3', target: 'prod1', value: 15 },
      ],
      categories: [
        { name: 'Raw Materials', itemStyle: { color: '#3498db' } },
        { name: 'Components', itemStyle: { color: '#e74c3c' } },
        { name: 'Sub-Assemblies', itemStyle: { color: '#f39c12' } },
        { name: 'Final Products', itemStyle: { color: '#2ecc71' } },
      ],
    },
    onNodeClick: (nodeData, _params) => {
      console.log('Complex DAG Node clicked:', nodeData.name);
      alert(
        `Node: ${nodeData.name}\nLevel: ${nodeData.level}\nValue: ${nodeData.value}\nDescription: ${nodeData.description}`,
      );
    },
  },
};

export const TopBottomLayout: Story = {
  name: 'Top-to-Bottom Layout',
  args: {
    width: 800,
    height: 800,
    layout: 'layered',
    direction: 'TB',
    draggable: true,
    roam: true,
    data: {
      nodes: [
        // Level 0 - Suppliers
        {
          id: 'supplier1',
          name: 'Supplier A',
          value: 30,
          level: 0,
          category: 0,
          description: 'Primary material supplier',
        },
        {
          id: 'supplier2',
          name: 'Supplier B',
          value: 25,
          level: 0,
          category: 0,
          description: 'Secondary material supplier',
        },

        // Level 1 - Warehouses
        {
          id: 'warehouse',
          name: 'Central Warehouse',
          value: 55,
          level: 1,
          category: 1,
          description: 'Material storage facility',
        },

        // Level 2 - Production Lines
        { id: 'line1', name: 'Line 1', value: 40, level: 2, category: 2, description: 'Assembly line A' },
        { id: 'line2', name: 'Line 2', value: 35, level: 2, category: 2, description: 'Assembly line B' },

        // Level 3 - Quality Control
        {
          id: 'qc',
          name: 'Quality Control',
          value: 75,
          level: 3,
          category: 3,
          description: 'Quality assurance checkpoint',
        },

        // Level 4 - Distribution
        {
          id: 'dist',
          name: 'Distribution',
          value: 90,
          level: 4,
          category: 4,
          description: 'Product distribution center',
        },
      ],
      links: [
        { source: 'supplier1', target: 'warehouse', value: 20 },
        { source: 'supplier2', target: 'warehouse', value: 15 },
        { source: 'warehouse', target: 'line1', value: 18 },
        { source: 'warehouse', target: 'line2', value: 15 },
        { source: 'line1', target: 'qc', value: 16 },
        { source: 'line2', target: 'qc', value: 14 },
        { source: 'qc', target: 'dist', value: 30 },
      ],
      categories: [
        { name: 'Suppliers', itemStyle: { color: '#9b59b6' } },
        { name: 'Warehouses', itemStyle: { color: '#3498db' } },
        { name: 'Production', itemStyle: { color: '#e74c3c' } },
        { name: 'Quality Control', itemStyle: { color: '#f39c12' } },
        { name: 'Distribution', itemStyle: { color: '#2ecc71' } },
      ],
    },
  },
};

export const ForceDirectedLayout: Story = {
  name: 'Force-Directed Layout (Physics Simulation)',
  args: {
    width: 900,
    height: 600,
    layout: 'force',
    draggable: true,
    roam: true,
    force: {
      repulsion: 800,
      gravity: 0.1,
      edgeLength: [80, 150],
      friction: 0.6,
      layoutAnimation: true,
    },
    data: {
      nodes: [
        { id: 'core', name: 'Core System', value: 50, category: 0, description: 'Central processing unit' },
        { id: 'input1', name: 'Input A', value: 30, category: 1, description: 'Data input stream A' },
        { id: 'input2', name: 'Input B', value: 25, category: 1, description: 'Data input stream B' },
        { id: 'input3', name: 'Input C', value: 20, category: 1, description: 'Data input stream C' },
        { id: 'proc1', name: 'Processor 1', value: 40, category: 2, description: 'Primary data processor' },
        { id: 'proc2', name: 'Processor 2', value: 35, category: 2, description: 'Secondary data processor' },
        { id: 'output1', name: 'Output X', value: 45, category: 3, description: 'Processed output X' },
        { id: 'output2', name: 'Output Y', value: 40, category: 3, description: 'Processed output Y' },
      ],
      links: [
        { source: 'input1', target: 'core', value: 10 },
        { source: 'input2', target: 'core', value: 8 },
        { source: 'input3', target: 'core', value: 6 },
        { source: 'core', target: 'proc1', value: 12 },
        { source: 'core', target: 'proc2', value: 10 },
        { source: 'proc1', target: 'output1', value: 15 },
        { source: 'proc1', target: 'output2', value: 8 },
        { source: 'proc2', target: 'output2', value: 12 },
      ],
      categories: [
        { name: 'Core', itemStyle: { color: '#e74c3c' } },
        { name: 'Inputs', itemStyle: { color: '#3498db' } },
        { name: 'Processors', itemStyle: { color: '#f39c12' } },
        { name: 'Outputs', itemStyle: { color: '#2ecc71' } },
      ],
    },
    onNodeClick: (nodeData, _params) => {
      console.log('Force layout node clicked:', nodeData.name);
      alert(`Node: ${nodeData.name}\nValue: ${nodeData.value}\nDescription: ${nodeData.description}`);
    },
  },
};

export const Loading: Story = {
  args: {
    width: 800,
    height: 500,
    loading: true,
    data: {
      nodes: [{ id: 'node1', name: 'Loading Node', value: 50, level: 0, category: 0 }],
      links: [],
      categories: [{ name: 'Loading', itemStyle: { color: '#3498db' } }],
    },
  },
};
