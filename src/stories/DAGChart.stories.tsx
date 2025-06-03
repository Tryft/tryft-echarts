import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';
import { DAGChart } from '../components/DAGChart';
import type { DAGNode, DAGLink } from '../types';

// Enhanced sample data with proper typing
const manufacturingWorkflowData = {
  nodes: [
    // Level 0 - Raw Materials (source nodes)
    {
      id: 'steel',
      name: 'Steel Sheets',
      value: 20,
      level: 0,
      category: 0,
      description: 'High-grade steel material for chassis construction',
    },
    {
      id: 'aluminum',
      name: 'Aluminum Alloy',
      value: 15,
      level: 0,
      category: 0,
      description: 'Lightweight aluminum for structural components',
    },
    {
      id: 'plastic',
      name: 'ABS Plastic',
      value: 8,
      level: 0,
      category: 0,
      description: 'Durable thermoplastic for housing',
    },
    {
      id: 'electronics',
      name: 'Electronics Kit',
      value: 12,
      level: 0,
      category: 0,
      description: 'Circuit boards, sensors, and control modules',
    },

    // Level 1 - Primary Components
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
      name: 'Protective Housing',
      value: 23,
      level: 1,
      category: 1,
      description: 'Weather-resistant outer shell',
    },
    {
      id: 'control_unit',
      name: 'Control Unit',
      value: 18,
      level: 1,
      category: 1,
      description: 'Electronic control and monitoring system',
    },

    // Level 2 - Sub-Assemblies
    {
      id: 'mechanical_assy',
      name: 'Mechanical Assembly',
      value: 58,
      level: 2,
      category: 2,
      description: 'Integrated mechanical subsystem',
    },
    {
      id: 'electronic_assy',
      name: 'Electronic Assembly',
      value: 41,
      level: 2,
      category: 2,
      description: 'Complete electronic control system',
    },

    // Level 3 - Final Products
    {
      id: 'product_a',
      name: 'Standard Model',
      value: 100,
      level: 3,
      category: 3,
      description: 'Base configuration device',
    },
    {
      id: 'product_b',
      name: 'Premium Model',
      value: 120,
      level: 3,
      category: 3,
      description: 'Enhanced feature set device',
    },
  ] as DAGNode[],
  links: [
    // Raw materials to components
    { source: 'steel', target: 'frame', value: 15, label: 'forms into' },
    { source: 'aluminum', target: 'frame', value: 10, label: 'reinforces' },
    { source: 'aluminum', target: 'housing', value: 8, label: 'shapes into' },
    { source: 'plastic', target: 'housing', value: 6, label: 'molds into' },
    { source: 'electronics', target: 'control_unit', value: 12, label: 'integrates with' },

    // Components to sub-assemblies
    { source: 'frame', target: 'mechanical_assy', value: 25, label: 'assembles into' },
    { source: 'housing', target: 'mechanical_assy', value: 15, label: 'encloses' },
    { source: 'control_unit', target: 'electronic_assy', value: 18, label: 'controls' },
    { source: 'housing', target: 'electronic_assy', value: 8, label: 'protects' },

    // Sub-assemblies to final products
    { source: 'mechanical_assy', target: 'product_a', value: 40, label: 'becomes' },
    { source: 'electronic_assy', target: 'product_a', value: 25, label: 'operates' },
    { source: 'mechanical_assy', target: 'product_b', value: 45, label: 'becomes' },
    { source: 'electronic_assy', target: 'product_b', value: 30, label: 'operates' },

    // Direct dependency
    { source: 'steel', target: 'mechanical_assy', value: 5, label: 'directly reinforces' },
  ] as DAGLink[],
  categories: [
    { name: 'Raw Materials', itemStyle: { color: '#3498db' } },
    { name: 'Components', itemStyle: { color: '#e74c3c' } },
    { name: 'Sub-Assemblies', itemStyle: { color: '#f39c12' } },
    { name: 'Final Products', itemStyle: { color: '#2ecc71' } },
  ],
};

// Simplified data for Manhattan edge demonstration
const manhattanDemoData = {
  nodes: [
    { id: 'input', name: 'Input Source', level: 0, category: 0, value: 50 },
    { id: 'process1', name: 'Process Alpha', level: 1, category: 1, value: 30 },
    { id: 'process2', name: 'Process Beta', level: 1, category: 1, value: 25 },
    { id: 'process3', name: 'Process Gamma', level: 1, category: 1, value: 20 },
    { id: 'output1', name: 'Output X', level: 2, category: 2, value: 35 },
    { id: 'output2', name: 'Output Y', level: 2, category: 2, value: 40 },
  ] as DAGNode[],
  links: [
    { source: 'input', target: 'process1', value: 15, label: 'feeds' },
    { source: 'input', target: 'process2', value: 12, label: 'supplies' },
    { source: 'input', target: 'process3', value: 10, label: 'distributes' },
    { source: 'process1', target: 'output1', value: 18, label: 'produces' },
    { source: 'process2', target: 'output1', value: 8, label: 'enhances' },
    { source: 'process2', target: 'output2', value: 15, label: 'generates' },
    { source: 'process3', target: 'output2', value: 12, label: 'optimizes' },
  ] as DAGLink[],
  categories: [
    { name: 'Input', itemStyle: { color: '#3498db' } },
    { name: 'Processing', itemStyle: { color: '#e74c3c' } },
    { name: 'Output', itemStyle: { color: '#2ecc71' } },
  ],
};

// Component Meta with Storybook 9 patterns
const meta = {
  title: 'Charts/DAGChart',
  component: DAGChart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Enhanced DAG Chart Component

A sophisticated **Directed Acyclic Graph** visualization component built on Apache ECharts with advanced features:

## Key Features

### 🎯 **Smart Layout Algorithms**
- **Layered Layout**: Hierarchical arrangement with intelligent level-based positioning
- **Force-Directed Layout**: Physics-based node positioning for organic clustering
- **Manhattan Routing**: True right-angled edge routing following Manhattan algorithm

### 🔧 **Interactive Capabilities**
- **Branch Collapsing**: Double-click nodes to collapse/expand downstream branches
- **Drag & Drop**: Reposition nodes with real-time layout updates
- **Zoom & Pan**: Navigate large graphs with smooth interactions
- **Hover Highlighting**: Visual emphasis on connected node networks

### 📊 **Visual Intelligence**
- **Adaptive Label Positioning**: Smart label placement based on node connectivity
- **Edge Styling Options**: Straight, curved, or Manhattan-style connections
- **Category-Based Coloring**: Automatic color coding by node categories
- **Value-Driven Sizing**: Node sizes reflect importance/values

### 🎨 **Customization Options**
- Multiple edge rendering styles
- Configurable layouts and directions
- Custom color schemes per category
- Adjustable force simulation parameters

Perfect for **manufacturing workflows**, **data pipelines**, **system architectures**, and any directed graph visualization needs.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 600, max: 1600, step: 50 },
      description: 'Chart container width in pixels',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: 'auto' },
      },
    },
    height: {
      control: { type: 'range', min: 400, max: 1200, step: 50 },
      description: 'Chart container height in pixels',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '400' },
      },
    },
    layout: {
      control: { type: 'select' },
      options: ['layered', 'force'],
      description: 'Layout algorithm for node positioning',
      table: {
        type: { summary: "'layered' | 'force'" },
        defaultValue: { summary: "'layered'" },
      },
    },
    direction: {
      control: { type: 'select' },
      options: ['LR', 'TB'],
      description: 'Layout direction (Left-to-Right or Top-to-Bottom)',
      table: {
        type: { summary: "'LR' | 'TB'" },
        defaultValue: { summary: "'LR'" },
      },
    },
    edgeStyle: {
      control: { type: 'select' },
      options: ['straight', 'curved', 'manhattan'],
      description: 'Edge rendering style with different visual algorithms',
      table: {
        type: { summary: "'straight' | 'curved' | 'manhattan'" },
        defaultValue: { summary: "'straight'" },
      },
    },
    showEdgeLabels: {
      control: 'boolean',
      description: 'Display relationship labels on edges',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Enable branch collapsing via double-click',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    draggable: {
      control: 'boolean',
      description: 'Allow node repositioning via drag & drop',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    roam: {
      control: 'boolean',
      description: 'Enable chart panning and zooming',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    data: {
      control: false,
      description: 'Chart data structure with nodes, links, and categories',
      table: {
        type: {
          summary: '{ nodes: DAGNode[]; links: DAGLink[]; categories?: Category[] }',
        },
      },
    },
  },
  args: {
    width: 1200,
    height: 700,
    layout: 'layered',
    direction: 'LR',
    edgeStyle: 'straight',
    showEdgeLabels: false,
    collapsible: true,
    draggable: true,
    roam: true,
    loading: false,
  },
} satisfies Meta<typeof DAGChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Enhanced event handlers with proper typing
const createEventHandlers = () => ({
  onChartReady: fn(),
  onNodeClick: fn((nodeData: DAGNode, _params: unknown) => {
    console.log('Node clicked:', nodeData.name);
    const connectivity = (
      nodeData as DAGNode & {
        _connectivity?: { incoming: unknown[]; outgoing: unknown[] };
      }
    )._connectivity;
    alert(
      `🎯 Node: ${nodeData.name}\n` +
        `📊 Value: ${nodeData.value || 'N/A'}\n` +
        `🔗 Connections: ${connectivity?.incoming.length || 0} in, ${connectivity?.outgoing.length || 0} out\n` +
        `📂 Category: ${nodeData.category}`,
    );
  }),
  onNodeDoubleClick: fn((nodeData: DAGNode, _params: unknown) => {
    console.log('Node double-clicked (branch toggle):', nodeData.name);
  }),
  onEdgeClick: fn((linkData: DAGLink, _params: unknown) => {
    console.log('Edge clicked:', linkData.source, '→', linkData.target);
    alert(
      `🔄 Relationship: ${linkData.source} ${linkData.label || 'connects to'} ${linkData.target}\n` +
        `📈 Flow Value: ${linkData.value || 'N/A'}`,
    );
  }),
});

/**
 * ## Default Manufacturing Workflow
 *
 * A comprehensive example showing a manufacturing process from raw materials to final products.
 * Features intelligent label positioning, branch highlighting, and relationship labeling.
 *
 * **Try these interactions:**
 * - Click nodes to see connectivity information
 * - Double-click to collapse/expand branches
 * - Hover to highlight connected networks
 * - Use controls to change layout and styling
 */
export const Default: Story = {
  args: {
    data: manufacturingWorkflowData,
    showEdgeLabels: true,
    ...createEventHandlers(),
  },
};

/**
 * ## Manhattan Edge Routing
 *
 * Demonstrates the sophisticated Manhattan layout algorithm with true right-angled routing.
 * This creates clean, architectural-style connections perfect for system diagrams.
 *
 * **Manhattan Algorithm Features:**
 * - True right-angled paths following bpmn-io algorithm
 * - Optimized waypoint calculation
 * - Redundant point elimination
 * - Professional diagram aesthetics
 */
export const ManhattanRouting: Story = {
  args: {
    data: manhattanDemoData,
    edgeStyle: 'curved',
    showEdgeLabels: true,
    collapsible: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compare with other edge styles using the controls above. Manhattan routing provides the cleanest, most professional appearance for system architecture diagrams.',
      },
    },
  },
};

/**
 * ## Interactive Branch Collapsing
 *
 * Complex hierarchical data with collapsible branches for managing information density.
 * Double-click any node to hide/show its downstream connections.
 */
export const BranchCollapsing: Story = {
  args: {
    data: {
      nodes: [
        { id: 'root', name: 'System Core', level: 0, category: 0, value: 100 },

        // Primary branches
        { id: 'branch_a', name: 'Module Alpha', level: 1, category: 1, value: 60 },
        { id: 'branch_b', name: 'Module Beta', level: 1, category: 1, value: 45 },
        { id: 'branch_c', name: 'Module Gamma', level: 1, category: 1, value: 30 },

        // Secondary level
        { id: 'sub_a1', name: 'Alpha Processor', level: 2, category: 2, value: 25 },
        { id: 'sub_a2', name: 'Alpha Cache', level: 2, category: 2, value: 20 },
        { id: 'sub_b1', name: 'Beta Controller', level: 2, category: 2, value: 30 },
        { id: 'sub_c1', name: 'Gamma Interface', level: 2, category: 2, value: 15 },
        { id: 'sub_c2', name: 'Gamma Monitor', level: 2, category: 2, value: 12 },

        // Terminals
        { id: 'output_1', name: 'Output Stream A', level: 3, category: 3, value: 45 },
        { id: 'output_2', name: 'Output Stream B', level: 3, category: 3, value: 30 },
        { id: 'output_3', name: 'Output Stream C', level: 3, category: 3, value: 27 },
      ] as DAGNode[],
      links: [
        { source: 'root', target: 'branch_a', value: 35 },
        { source: 'root', target: 'branch_b', value: 25 },
        { source: 'root', target: 'branch_c', value: 20 },

        { source: 'branch_a', target: 'sub_a1', value: 18 },
        { source: 'branch_a', target: 'sub_a2', value: 15 },
        { source: 'branch_b', target: 'sub_b1', value: 22 },
        { source: 'branch_c', target: 'sub_c1', value: 12 },
        { source: 'branch_c', target: 'sub_c2', value: 8 },

        { source: 'sub_a1', target: 'output_1', value: 20 },
        { source: 'sub_a2', target: 'output_1', value: 15 },
        { source: 'sub_b1', target: 'output_2', value: 22 },
        { source: 'sub_c1', target: 'output_3', value: 12 },
        { source: 'sub_c2', target: 'output_3', value: 10 },
      ] as DAGLink[],
      categories: [
        { name: 'Core', itemStyle: { color: '#e74c3c' } },
        { name: 'Modules', itemStyle: { color: '#3498db' } },
        { name: 'Processors', itemStyle: { color: '#f39c12' } },
        { name: 'Outputs', itemStyle: { color: '#2ecc71' } },
      ],
    },
    showEdgeLabels: false,
    ...createEventHandlers(),
  },
  parameters: {
    docs: {
      description: {
        story:
          '**💡 Tip:** Double-click on "Module Alpha" or "Module Beta" to see branch collapsing in action. This feature helps manage complex diagrams by temporarily hiding sections.',
      },
    },
  },
};

/**
 * ## Top-to-Bottom Layout
 *
 * Vertical flow diagram perfect for representing hierarchical processes,
 * organizational charts, or sequential workflows.
 */
export const TopBottomLayout: Story = {
  args: {
    data: {
      nodes: [
        { id: 'strategy', name: 'Strategic Planning', level: 0, category: 0, value: 100 },

        { id: 'design', name: 'Design Phase', level: 1, category: 1, value: 70 },
        { id: 'procurement', name: 'Procurement', level: 1, category: 1, value: 50 },

        { id: 'development', name: 'Development', level: 2, category: 2, value: 80 },
        { id: 'testing', name: 'Quality Testing', level: 2, category: 2, value: 60 },

        { id: 'deployment', name: 'Deployment', level: 3, category: 3, value: 90 },
        { id: 'maintenance', name: 'Maintenance', level: 3, category: 3, value: 40 },
      ] as DAGNode[],
      links: [
        { source: 'strategy', target: 'design', value: 30, label: 'informs' },
        { source: 'strategy', target: 'procurement', value: 20, label: 'guides' },

        { source: 'design', target: 'development', value: 40, label: 'specifies' },
        { source: 'procurement', target: 'development', value: 25, label: 'supplies' },
        { source: 'development', target: 'testing', value: 35, label: 'delivers to' },

        { source: 'testing', target: 'deployment', value: 45, label: 'approves for' },
        { source: 'deployment', target: 'maintenance', value: 20, label: 'transitions to' },
      ] as DAGLink[],
      categories: [
        { name: 'Planning', itemStyle: { color: '#9b59b6' } },
        { name: 'Preparation', itemStyle: { color: '#3498db' } },
        { name: 'Execution', itemStyle: { color: '#e74c3c' } },
        { name: 'Operations', itemStyle: { color: '#2ecc71' } },
      ],
    },
    direction: 'TB',
    height: 800,
    showEdgeLabels: true,
    ...createEventHandlers(),
  },
};

/**
 * ## Force-Directed Layout
 *
 * Physics-based node positioning creates organic clustering and natural grouping.
 * Ideal for exploring relationships in complex networks without rigid hierarchy.
 */
export const ForceDirectedLayout: Story = {
  args: {
    data: {
      nodes: [
        { id: 'hub', name: 'Central Hub', value: 80, category: 0 },
        { id: 'input_a', name: 'Data Source A', value: 40, category: 1 },
        { id: 'input_b', name: 'Data Source B', value: 35, category: 1 },
        { id: 'input_c', name: 'Data Source C', value: 30, category: 1 },
        { id: 'proc_x', name: 'Processor X', value: 50, category: 2 },
        { id: 'proc_y', name: 'Processor Y', value: 45, category: 2 },
        { id: 'proc_z', name: 'Processor Z', value: 40, category: 2 },
        { id: 'result_1', name: 'Result Alpha', value: 60, category: 3 },
        { id: 'result_2', name: 'Result Beta', value: 55, category: 3 },
        { id: 'result_3', name: 'Result Gamma', value: 50, category: 3 },
      ] as DAGNode[],
      links: [
        { source: 'input_a', target: 'hub', value: 15, label: 'feeds' },
        { source: 'input_b', target: 'hub', value: 12, label: 'supplies' },
        { source: 'input_c', target: 'hub', value: 10, label: 'provides' },
        { source: 'hub', target: 'proc_x', value: 18, label: 'distributes' },
        { source: 'hub', target: 'proc_y', value: 15, label: 'routes' },
        { source: 'hub', target: 'proc_z', value: 12, label: 'channels' },
        { source: 'proc_x', target: 'result_1', value: 20, label: 'generates' },
        { source: 'proc_x', target: 'result_2', value: 10, label: 'produces' },
        { source: 'proc_y', target: 'result_2', value: 15, label: 'enhances' },
        { source: 'proc_y', target: 'result_3', value: 12, label: 'creates' },
        { source: 'proc_z', target: 'result_3', value: 14, label: 'optimizes' },
      ] as DAGLink[],
      categories: [
        { name: 'Hub', itemStyle: { color: '#e74c3c' } },
        { name: 'Inputs', itemStyle: { color: '#3498db' } },
        { name: 'Processors', itemStyle: { color: '#f39c12' } },
        { name: 'Results', itemStyle: { color: '#2ecc71' } },
      ],
    },
    layout: 'force',
    showEdgeLabels: true,
    force: {
      repulsion: 1200,
      gravity: 0.15,
      edgeLength: [120, 180],
      friction: 0.6,
      layoutAnimation: true,
    },
    ...createEventHandlers(),
  },
  parameters: {
    docs: {
      description: {
        story:
          '**🔬 Physics Simulation:** Nodes automatically organize based on force simulation. Drag nodes to see the physics engine in action!',
      },
    },
  },
};

/**
 * ## Edge Style Comparison
 *
 * Interactive demonstration of all three edge rendering styles.
 * Use the controls to switch between straight, curved, and Manhattan routing.
 */
export const EdgeStyleComparison: Story = {
  args: {
    data: manhattanDemoData,
    edgeStyle: 'curved',
    showEdgeLabels: true,
    collapsible: false,
    ...createEventHandlers(),
  },
  parameters: {
    docs: {
      description: {
        story: `
**🎨 Edge Style Guide:**

- **Straight**: Direct lines, minimal visual noise
- **Curved**: Smooth bezier curves, organic feel  
- **Manhattan**: Right-angled routing, architectural precision

Try switching between styles using the edge style control above!
        `,
      },
    },
  },
};

/**
 * ## Loading State
 *
 * Demonstrates the loading overlay functionality for async data scenarios.
 */
export const Loading: Story = {
  args: {
    loading: true,
    data: {
      nodes: [{ id: 'loading', name: 'Loading...', value: 50, level: 0, category: 0 }] as DAGNode[],
      links: [] as DAGLink[],
      categories: [{ name: 'Loading', itemStyle: { color: '#95a5a6' } }],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the loading overlay that appears while chart data is being fetched or processed.',
      },
    },
  },
};

/**
 * ## Minimal Configuration
 *
 * Simplest possible setup demonstrating default behaviors with minimal data.
 */
export const Minimal: Story = {
  args: {
    data: {
      nodes: [
        { id: 'start', name: 'Start', level: 0, category: 0 },
        { id: 'end', name: 'End', level: 1, category: 1 },
      ] as DAGNode[],
      links: [{ source: 'start', target: 'end' }] as DAGLink[],
      categories: [
        { name: 'Begin', itemStyle: { color: '#3498db' } },
        { name: 'Finish', itemStyle: { color: '#2ecc71' } },
      ],
    },
    width: 600,
    height: 400,
  },
};
