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
          'Enhanced DAG (Directed Acyclic Graph) Chart component with square nodes, Manhattan-style edges, branch collapsing, and intelligent label positioning. Features include edge labels, branch highlighting, and smart positioning based on node connectivity.',
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
    showEdgeLabels: { control: 'boolean' },
    collapsible: { control: 'boolean' },
  },
} satisfies Meta<typeof DAGChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnhancedManufacturingFlow: Story = {
  name: 'Enhanced Manufacturing Flow (All Features)',
  args: {
    width: 1200,
    height: 700,
    layout: 'layered',
    direction: 'LR',
    draggable: true,
    roam: true,
    showEdgeLabels: true,
    collapsible: true,
    data: {
      nodes: [
        // Level 0 - Raw Materials (source nodes - labels on left)
        {
          id: 'steel',
          name: 'Steel Sheets',
          value: 20,
          level: 0,
          category: 0,
          description: 'High-grade steel material for chassis',
        },
        {
          id: 'aluminum',
          name: 'Aluminum',
          value: 15,
          level: 0,
          category: 0,
          description: 'Lightweight aluminum alloy',
        },
        {
          id: 'plastic',
          name: 'ABS Plastic',
          value: 8,
          level: 0,
          category: 0,
          description: 'Durable thermoplastic',
        },
        {
          id: 'electronics',
          name: 'Electronics',
          value: 12,
          level: 0,
          category: 0,
          description: 'Circuit boards and sensors',
        },

        // Level 1 - Primary Components (middle nodes - labels below)
        {
          id: 'frame',
          name: 'Main Frame',
          value: 35,
          level: 1,
          category: 1,
          description: 'Structural chassis assembly',
        },
        {
          id: 'housing',
          name: 'Housing',
          value: 23,
          level: 1,
          category: 1,
          description: 'Protective outer shell',
        },
        {
          id: 'control_unit',
          name: 'Control Unit',
          value: 18,
          level: 1,
          category: 1,
          description: 'Electronic control system',
        },

        // Level 2 - Sub-Assemblies (middle nodes - labels below)
        {
          id: 'mechanical_assy',
          name: 'Mechanical Assembly',
          value: 58,
          level: 2,
          category: 2,
          description: 'Integrated mechanical components',
        },
        {
          id: 'electronic_assy',
          name: 'Electronic Assembly',
          value: 41,
          level: 2,
          category: 2,
          description: 'Integrated electronic systems',
        },

        // Level 3 - Final Products (terminal nodes - labels on right)
        {
          id: 'product_a',
          name: 'Product A',
          value: 100,
          level: 3,
          category: 3,
          description: 'Standard configuration device',
        },
        {
          id: 'product_b',
          name: 'Product B',
          value: 120,
          level: 3,
          category: 3,
          description: 'Premium configuration device',
        },

        // Isolated node (label above)
        {
          id: 'quality_cert',
          name: 'Quality Certificate',
          value: 5,
          level: 1,
          category: 4,
          description: 'Quality assurance documentation',
        },
      ],
      links: [
        // Raw materials to components with relationship labels
        { source: 'steel', target: 'frame', value: 15, label: 'forms' },
        { source: 'aluminum', target: 'frame', value: 10, label: 'reinforces' },
        { source: 'aluminum', target: 'housing', value: 8, label: 'shapes' },
        { source: 'plastic', target: 'housing', value: 6, label: 'protects' },
        { source: 'electronics', target: 'control_unit', value: 12, label: 'powers' },

        // Components to sub-assemblies
        { source: 'frame', target: 'mechanical_assy', value: 25, label: 'integrates into' },
        { source: 'housing', target: 'mechanical_assy', value: 15, label: 'encloses' },
        { source: 'control_unit', target: 'electronic_assy', value: 18, label: 'controls' },
        { source: 'housing', target: 'electronic_assy', value: 8, label: 'houses' },

        // Sub-assemblies to final products
        { source: 'mechanical_assy', target: 'product_a', value: 40, label: 'assembles into' },
        { source: 'electronic_assy', target: 'product_a', value: 25, label: 'operates' },
        { source: 'mechanical_assy', target: 'product_b', value: 45, label: 'assembles into' },
        { source: 'electronic_assy', target: 'product_b', value: 30, label: 'operates' },

        // Cross-level dependency
        { source: 'steel', target: 'mechanical_assy', value: 5, label: 'directly reinforces' },
      ],
      categories: [
        { name: 'Raw Materials', itemStyle: { color: '#3498db' } },
        { name: 'Components', itemStyle: { color: '#e74c3c' } },
        { name: 'Sub-Assemblies', itemStyle: { color: '#f39c12' } },
        { name: 'Final Products', itemStyle: { color: '#2ecc71' } },
        { name: 'Documentation', itemStyle: { color: '#9b59b6' } },
      ],
    },
    onNodeClick: (nodeData, _params) => {
      console.log('Node clicked:', nodeData.name);
      alert(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        `Node: ${nodeData.name}\nConnections: ${(nodeData as any)._connectivity?.incoming.length || 0} in, ${(nodeData as any)._connectivity?.outgoing.length || 0} out`,
      );
    },
    onNodeDoubleClick: (nodeData, _params) => {
      console.log('Node double-clicked (branch toggle):', nodeData.name);
    },
    onEdgeClick: (linkData, _params) => {
      console.log('Edge clicked:', linkData.source, '→', linkData.target);
      alert(`Relationship: ${linkData.source} ${linkData.label || 'connects to'} ${linkData.target}`);
    },
  },
};

export const BranchCollapsingDemo: Story = {
  name: 'Branch Collapsing & Manhattan Edges',
  args: {
    width: 1000,
    height: 600,
    layout: 'layered',
    direction: 'LR',
    draggable: true,
    roam: true,
    showEdgeLabels: false,
    collapsible: true,
    data: {
      nodes: [
        // Source
        { id: 'source', name: 'Source System', level: 0, category: 0, value: 50 },

        // Level 1 - Three branches
        { id: 'branch_a', name: 'Branch A', level: 1, category: 1, value: 30 },
        { id: 'branch_b', name: 'Branch B', level: 1, category: 1, value: 25 },
        { id: 'branch_c', name: 'Branch C', level: 1, category: 1, value: 20 },

        // Level 2 - Sub-branches
        { id: 'sub_a1', name: 'Sub A1', level: 2, category: 2, value: 15 },
        { id: 'sub_a2', name: 'Sub A2', level: 2, category: 2, value: 12 },
        { id: 'sub_b1', name: 'Sub B1', level: 2, category: 2, value: 18 },
        { id: 'sub_c1', name: 'Sub C1', level: 2, category: 2, value: 10 },
        { id: 'sub_c2', name: 'Sub C2', level: 2, category: 2, value: 8 },

        // Level 3 - Terminals
        { id: 'term_a', name: 'Terminal A', level: 3, category: 3, value: 27 },
        { id: 'term_b', name: 'Terminal B', level: 3, category: 3, value: 18 },
        { id: 'term_c', name: 'Terminal C', level: 3, category: 3, value: 18 },
      ],
      links: [
        { source: 'source', target: 'branch_a', value: 15 },
        { source: 'source', target: 'branch_b', value: 12 },
        { source: 'source', target: 'branch_c', value: 10 },

        { source: 'branch_a', target: 'sub_a1', value: 8 },
        { source: 'branch_a', target: 'sub_a2', value: 7 },
        { source: 'branch_b', target: 'sub_b1', value: 12 },
        { source: 'branch_c', target: 'sub_c1', value: 5 },
        { source: 'branch_c', target: 'sub_c2', value: 5 },

        { source: 'sub_a1', target: 'term_a', value: 8 },
        { source: 'sub_a2', target: 'term_a', value: 7 },
        { source: 'sub_b1', target: 'term_b', value: 12 },
        { source: 'sub_c1', target: 'term_c', value: 5 },
        { source: 'sub_c2', target: 'term_c', value: 8 },
      ],
      categories: [
        { name: 'Source', itemStyle: { color: '#3498db' } },
        { name: 'Primary Branches', itemStyle: { color: '#e74c3c' } },
        { name: 'Sub-Branches', itemStyle: { color: '#f39c12' } },
        { name: 'Terminals', itemStyle: { color: '#2ecc71' } },
      ],
    },
  },
};

export const TopBottomLayout: Story = {
  name: 'Top-to-Bottom with Edge Labels',
  args: {
    width: 900,
    height: 800,
    layout: 'layered',
    direction: 'TB',
    draggable: true,
    roam: true,
    showEdgeLabels: true,
    collapsible: true,
    data: {
      nodes: [
        // Level 0 - Suppliers (source nodes)
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

        // Level 1 - Warehouses (middle nodes)
        {
          id: 'warehouse_central',
          name: 'Central Warehouse',
          value: 55,
          level: 1,
          category: 1,
          description: 'Main storage facility',
        },
        {
          id: 'warehouse_regional',
          name: 'Regional Warehouse',
          value: 25,
          level: 1,
          category: 1,
          description: 'Regional distribution center',
        },

        // Level 2 - Production Lines (middle nodes)
        { id: 'line1', name: 'Assembly Line 1', value: 40, level: 2, category: 2, description: 'Primary assembly' },
        { id: 'line2', name: 'Assembly Line 2', value: 35, level: 2, category: 2, description: 'Secondary assembly' },

        // Level 3 - Quality Control (middle nodes)
        {
          id: 'qc',
          name: 'Quality Control',
          value: 75,
          level: 3,
          category: 3,
          description: 'Quality assurance checkpoint',
        },

        // Level 4 - Distribution (terminal nodes)
        {
          id: 'dist_domestic',
          name: 'Domestic Distribution',
          value: 45,
          level: 4,
          category: 4,
          description: 'Local market distribution',
        },
        {
          id: 'dist_export',
          name: 'Export Distribution',
          value: 30,
          level: 4,
          category: 4,
          description: 'International market distribution',
        },
      ],
      links: [
        { source: 'supplier1', target: 'warehouse_central', value: 20, label: 'delivers to' },
        { source: 'supplier2', target: 'warehouse_central', value: 15, label: 'supplies' },
        { source: 'supplier2', target: 'warehouse_regional', value: 10, label: 'stocks' },

        { source: 'warehouse_central', target: 'line1', value: 18, label: 'feeds' },
        { source: 'warehouse_central', target: 'line2', value: 15, label: 'supplies' },
        { source: 'warehouse_regional', target: 'line2', value: 8, label: 'supports' },

        { source: 'line1', target: 'qc', value: 16, label: 'sends for testing' },
        { source: 'line2', target: 'qc', value: 14, label: 'submits to' },

        { source: 'qc', target: 'dist_domestic', value: 18, label: 'approves for' },
        { source: 'qc', target: 'dist_export', value: 12, label: 'certifies for' },
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

export const SmartLabelPositioning: Story = {
  name: 'Smart Label Positioning Demo',
  args: {
    width: 1000,
    height: 600,
    layout: 'layered',
    direction: 'LR',
    draggable: true,
    roam: true,
    showEdgeLabels: false,
    collapsible: false,
    data: {
      nodes: [
        // Source nodes (left labels)
        { id: 'input1', name: 'Input Source A', level: 0, category: 0, value: 25 },
        { id: 'input2', name: 'Input Source B', level: 0, category: 0, value: 20 },

        // Middle nodes with both incoming and outgoing (bottom labels)
        { id: 'processor1', name: 'Processor 1', level: 1, category: 1, value: 35 },
        { id: 'processor2', name: 'Processor 2', level: 1, category: 1, value: 30 },

        // Another middle layer (bottom labels)
        { id: 'aggregator', name: 'Aggregator', level: 2, category: 2, value: 65 },

        // Terminal nodes (right labels)
        { id: 'output1', name: 'Final Output A', level: 3, category: 3, value: 40 },
        { id: 'output2', name: 'Final Output B', level: 3, category: 3, value: 25 },

        // Isolated node (top label)
        { id: 'isolated', name: 'Isolated Node', level: 1, category: 4, value: 10 },
      ],
      links: [
        { source: 'input1', target: 'processor1', value: 12 },
        { source: 'input1', target: 'processor2', value: 8 },
        { source: 'input2', target: 'processor2', value: 15 },

        { source: 'processor1', target: 'aggregator', value: 20 },
        { source: 'processor2', target: 'aggregator', value: 18 },

        { source: 'aggregator', target: 'output1', value: 25 },
        { source: 'aggregator', target: 'output2', value: 15 },
      ],
      categories: [
        { name: 'Inputs (Left Labels)', itemStyle: { color: '#3498db' } },
        { name: 'Processors (Bottom Labels)', itemStyle: { color: '#e74c3c' } },
        { name: 'Aggregators (Bottom Labels)', itemStyle: { color: '#f39c12' } },
        { name: 'Outputs (Right Labels)', itemStyle: { color: '#2ecc71' } },
        { name: 'Isolated (Top Labels)', itemStyle: { color: '#9b59b6' } },
      ],
    },
  },
};

export const ForceDirectedLayout: Story = {
  name: 'Force-Directed with Branch Highlighting',
  args: {
    width: 900,
    height: 600,
    layout: 'force',
    draggable: true,
    roam: true,
    showEdgeLabels: true,
    collapsible: true,
    force: {
      repulsion: 1200,
      gravity: 0.1,
      edgeLength: [80, 150],
      friction: 0.6,
      layoutAnimation: true,
    },
    data: {
      nodes: [
        { id: 'core', name: 'Core System', value: 50, category: 0, description: 'Central processing hub' },
        { id: 'input1', name: 'Input A', value: 30, category: 1, description: 'Data stream A' },
        { id: 'input2', name: 'Input B', value: 25, category: 1, description: 'Data stream B' },
        { id: 'input3', name: 'Input C', value: 20, category: 1, description: 'Data stream C' },
        { id: 'proc1', name: 'Processor 1', value: 40, category: 2, description: 'Primary processor' },
        { id: 'proc2', name: 'Processor 2', value: 35, category: 2, description: 'Secondary processor' },
        { id: 'proc3', name: 'Processor 3', value: 28, category: 2, description: 'Tertiary processor' },
        { id: 'output1', name: 'Output X', value: 45, category: 3, description: 'Result stream X' },
        { id: 'output2', name: 'Output Y', value: 40, category: 3, description: 'Result stream Y' },
        { id: 'output3', name: 'Output Z', value: 35, category: 3, description: 'Result stream Z' },
      ],
      links: [
        { source: 'input1', target: 'core', value: 10, label: 'feeds' },
        { source: 'input2', target: 'core', value: 8, label: 'supplies' },
        { source: 'input3', target: 'core', value: 6, label: 'provides' },
        { source: 'core', target: 'proc1', value: 12, label: 'distributes to' },
        { source: 'core', target: 'proc2', value: 10, label: 'routes to' },
        { source: 'core', target: 'proc3', value: 8, label: 'sends to' },
        { source: 'proc1', target: 'output1', value: 15, label: 'produces' },
        { source: 'proc1', target: 'output2', value: 8, label: 'generates' },
        { source: 'proc2', target: 'output2', value: 12, label: 'creates' },
        { source: 'proc2', target: 'output3', value: 10, label: 'outputs' },
        { source: 'proc3', target: 'output3', value: 8, label: 'delivers' },
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
      alert(`Node: ${nodeData.name}\nHover over nodes/edges to see branch highlighting!`);
    },
  },
};

export const Loading: Story = {
  args: {
    width: 800,
    height: 500,
    loading: true,
    showEdgeLabels: false,
    collapsible: false,
    data: {
      nodes: [{ id: 'node1', name: 'Loading Node', value: 50, level: 0, category: 0 }],
      links: [],
      categories: [{ name: 'Loading', itemStyle: { color: '#3498db' } }],
    },
  },
};
