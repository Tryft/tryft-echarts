import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';
import { DAGChart } from '../components/DAGChart';
import type { DAGNode, DAGLink } from '../types';

// Complex manufacturing workflow with multiple branches
const complexManufacturingData = {
  nodes: [
    // Level 0 - Raw Materials
    { id: 'steel', name: 'Steel Sheets', value: 20, level: 0, category: 0 },
    { id: 'aluminum', name: 'Aluminum', value: 15, level: 0, category: 0 },
    { id: 'plastic', name: 'ABS Plastic', value: 8, level: 0, category: 0 },
    { id: 'electronics', name: 'Electronics', value: 12, level: 0, category: 0 },
    { id: 'rubber', name: 'Rubber', value: 6, level: 0, category: 0 },

    // Level 1 - Primary Components
    { id: 'frame', name: 'Main Frame', value: 35, level: 1, category: 1 },
    { id: 'housing', name: 'Housing', value: 23, level: 1, category: 1 },
    { id: 'control_unit', name: 'Control Unit', value: 18, level: 1, category: 1 },
    { id: 'seals', name: 'Seals & Gaskets', value: 10, level: 1, category: 1 },

    // Level 2 - Sub-Assemblies
    { id: 'mechanical_assy', name: 'Mechanical Assembly', value: 58, level: 2, category: 2 },
    { id: 'electronic_assy', name: 'Electronic Assembly', value: 41, level: 2, category: 2 },
    { id: 'power_module', name: 'Power Module', value: 25, level: 2, category: 2 },

    // Level 3 - Integration
    { id: 'core_system', name: 'Core System', value: 85, level: 3, category: 3 },
    { id: 'peripherals', name: 'Peripherals', value: 30, level: 3, category: 3 },

    // Level 4 - Final Products
    { id: 'product_a', name: 'Standard Model', value: 100, level: 4, category: 4 },
    { id: 'product_b', name: 'Premium Model', value: 120, level: 4, category: 4 },
    { id: 'product_c', name: 'Enterprise Model', value: 150, level: 4, category: 4 },
  ] as DAGNode[],
  links: [
    // Raw materials to components
    { source: 'steel', target: 'frame', value: 15, label: 'forms' },
    { source: 'aluminum', target: 'frame', value: 10, label: 'reinforces' },
    { source: 'aluminum', target: 'housing', value: 8, label: 'shapes' },
    { source: 'plastic', target: 'housing', value: 6, label: 'molds' },
    { source: 'electronics', target: 'control_unit', value: 12, label: 'integrates' },
    { source: 'rubber', target: 'seals', value: 6, label: 'forms' },

    // Components to sub-assemblies
    { source: 'frame', target: 'mechanical_assy', value: 25, label: 'assembles' },
    { source: 'housing', target: 'mechanical_assy', value: 15, label: 'encloses' },
    { source: 'seals', target: 'mechanical_assy', value: 8, label: 'seals' },
    { source: 'control_unit', target: 'electronic_assy', value: 18, label: 'controls' },
    { source: 'electronics', target: 'power_module', value: 8, label: 'powers' },

    // Sub-assemblies to integration
    { source: 'mechanical_assy', target: 'core_system', value: 40, label: 'forms core' },
    { source: 'electronic_assy', target: 'core_system', value: 35, label: 'operates' },
    { source: 'power_module', target: 'peripherals', value: 20, label: 'powers' },
    { source: 'housing', target: 'peripherals', value: 10, label: 'houses' },

    // Integration to final products
    { source: 'core_system', target: 'product_a', value: 50, label: 'becomes' },
    { source: 'peripherals', target: 'product_a', value: 15, label: 'enhances' },
    { source: 'core_system', target: 'product_b', value: 60, label: 'becomes' },
    { source: 'peripherals', target: 'product_b', value: 25, label: 'enhances' },
    { source: 'core_system', target: 'product_c', value: 70, label: 'becomes' },
    { source: 'peripherals', target: 'product_c', value: 30, label: 'enhances' },
    { source: 'power_module', target: 'product_c', value: 15, label: 'upgrades' },

    // Cross-level dependencies
    { source: 'steel', target: 'core_system', value: 5, label: 'reinforces' },
    { source: 'aluminum', target: 'product_b', value: 3, label: 'lightens' },
  ] as DAGLink[],
  categories: [
    { name: 'Raw Materials', itemStyle: { color: '#3498db' } },
    { name: 'Components', itemStyle: { color: '#e74c3c' } },
    { name: 'Sub-Assemblies', itemStyle: { color: '#f39c12' } },
    { name: 'Integration', itemStyle: { color: '#9b59b6' } },
    { name: 'Final Products', itemStyle: { color: '#2ecc71' } },
  ],
};

// Data pipeline workflow
const dataPipelineData = {
  nodes: [
    // Data Sources
    { id: 'db1', name: 'User DB', level: 0, category: 0, value: 100 },
    { id: 'db2', name: 'Analytics DB', level: 0, category: 0, value: 80 },
    { id: 'api1', name: 'External API', level: 0, category: 0, value: 60 },
    { id: 'logs', name: 'Server Logs', level: 0, category: 0, value: 40 },

    // ETL Layer
    { id: 'extractor', name: 'Data Extractor', level: 1, category: 1, value: 70 },
    { id: 'validator', name: 'Data Validator', level: 1, category: 1, value: 50 },
    { id: 'transformer', name: 'Transformer', level: 2, category: 1, value: 80 },

    // Processing
    { id: 'cleaner', name: 'Data Cleaner', level: 3, category: 2, value: 60 },
    { id: 'enricher', name: 'Data Enricher', level: 3, category: 2, value: 55 },
    { id: 'aggregator', name: 'Aggregator', level: 4, category: 2, value: 75 },

    // Storage & Analysis
    { id: 'warehouse', name: 'Data Warehouse', level: 5, category: 3, value: 90 },
    { id: 'ml_engine', name: 'ML Engine', level: 5, category: 3, value: 85 },

    // Outputs
    { id: 'dashboard', name: 'Dashboard', level: 6, category: 4, value: 70 },
    { id: 'reports', name: 'Reports', level: 6, category: 4, value: 50 },
    { id: 'alerts', name: 'Alerts', level: 6, category: 4, value: 30 },
    { id: 'predictions', name: 'Predictions', level: 6, category: 4, value: 65 },
  ] as DAGNode[],
  links: [
    // Sources to ETL
    { source: 'db1', target: 'extractor', value: 40, label: 'extracts' },
    { source: 'db2', target: 'extractor', value: 30, label: 'extracts' },
    { source: 'api1', target: 'validator', value: 25, label: 'validates' },
    { source: 'logs', target: 'validator', value: 15, label: 'validates' },

    // ETL processing
    { source: 'extractor', target: 'transformer', value: 35, label: 'transforms' },
    { source: 'validator', target: 'transformer', value: 20, label: 'transforms' },

    // Processing chain
    { source: 'transformer', target: 'cleaner', value: 30, label: 'cleans' },
    { source: 'transformer', target: 'enricher', value: 25, label: 'enriches' },
    { source: 'cleaner', target: 'aggregator', value: 35, label: 'aggregates' },
    { source: 'enricher', target: 'aggregator', value: 30, label: 'aggregates' },

    // Storage & Analysis
    { source: 'aggregator', target: 'warehouse', value: 40, label: 'stores' },
    { source: 'aggregator', target: 'ml_engine', value: 25, label: 'trains' },

    // Outputs
    { source: 'warehouse', target: 'dashboard', value: 35, label: 'displays' },
    { source: 'warehouse', target: 'reports', value: 25, label: 'generates' },
    { source: 'warehouse', target: 'alerts', value: 15, label: 'triggers' },
    { source: 'ml_engine', target: 'predictions', value: 30, label: 'predicts' },
    { source: 'ml_engine', target: 'alerts', value: 10, label: 'triggers' },

    // Cross connections
    { source: 'db1', target: 'ml_engine', value: 10, label: 'feeds' },
    { source: 'predictions', target: 'dashboard', value: 20, label: 'shows' },
  ] as DAGLink[],
  categories: [
    { name: 'Data Sources', itemStyle: { color: '#3498db' } },
    { name: 'ETL Layer', itemStyle: { color: '#e74c3c' } },
    { name: 'Processing', itemStyle: { color: '#f39c12' } },
    { name: 'Storage & ML', itemStyle: { color: '#9b59b6' } },
    { name: 'Outputs', itemStyle: { color: '#2ecc71' } },
  ],
};

// Manhattan routing demonstration data
const manhattanDemoData = {
  nodes: [
    { id: 'A', name: 'Node A', level: 0, category: 0, value: 50, x: 100, y: 100 },
    { id: 'B', name: 'Node B', level: 1, category: 1, value: 40, x: 400, y: 50 },
    { id: 'C', name: 'Node C', level: 1, category: 1, value: 45, x: 400, y: 150 },
    { id: 'D', name: 'Node D', level: 2, category: 2, value: 60, x: 700, y: 75 },
    { id: 'E', name: 'Node E', level: 2, category: 2, value: 55, x: 700, y: 125 },
    { id: 'F', name: 'Node F', level: 3, category: 3, value: 80, x: 1000, y: 100 },
  ] as DAGNode[],
  links: [
    { source: 'A', target: 'B', value: 20, label: 'route 1' },
    { source: 'A', target: 'C', value: 25, label: 'route 2' },
    { source: 'B', target: 'D', value: 30, label: 'path A' },
    { source: 'C', target: 'E', value: 35, label: 'path B' },
    { source: 'B', target: 'E', value: 15, label: 'cross path' },
    { source: 'D', target: 'F', value: 40, label: 'merge 1' },
    { source: 'E', target: 'F', value: 35, label: 'merge 2' },
  ] as DAGLink[],
  categories: [
    { name: 'Input', itemStyle: { color: '#3498db' } },
    { name: 'Layer 1', itemStyle: { color: '#e74c3c' } },
    { name: 'Layer 2', itemStyle: { color: '#f39c12' } },
    { name: 'Output', itemStyle: { color: '#2ecc71' } },
  ],
};

const meta = {
  title: 'Charts/DAGChart Enhanced',
  component: DAGChart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Enhanced DAG Chart with Manhattan Routing & Descendant Collapsing

Advanced directed acyclic graph visualization with sophisticated edge routing and intelligent node collapsing.

## 🚀 Key Features

### Manhattan Edge Algorithm
- **Z-shaped routing** with exactly 2 bends
- **16px port insets** from node edges
- **Grid-like patterns** for clean architectural diagrams
- **Orientation detection** (horizontal/vertical dominance)

### Smart Descendant Collapsing
- **Double-click** to hide ALL descendants (children, grandchildren, etc.)
- **Preserves multi-parent nodes** - won't hide nodes with other visible parents
- **Shows descendant count** in collapsed node labels
- **Nested collapse states** preserved when expanding
- **TreeChart-style animations** with smooth transitions

### Visual Intelligence
- **Adaptive label positioning** based on node connectivity
- **Branch highlighting** on hover
- **Collapsed state indicators** with red borders
- **Enhanced tooltips** with collapse instructions

Perfect for **system architectures**, **data pipelines**, **manufacturing workflows**, and complex **dependency graphs**.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 800, max: 1600, step: 50 },
      description: 'Chart container width',
    },
    height: {
      control: { type: 'range', min: 600, max: 1200, step: 50 },
      description: 'Chart container height',
    },
    layout: {
      control: { type: 'select' },
      options: ['layered', 'force'],
      description: 'Layout algorithm',
    },
    direction: {
      control: { type: 'select' },
      options: ['LR', 'TB'],
      description: 'Layout direction',
    },
    edgeStyle: {
      control: { type: 'select' },
      options: ['straight', 'curved', 'manhattan'],
      description: 'Edge routing algorithm',
    },
    showEdgeLabels: {
      control: 'boolean',
      description: 'Display relationship labels',
    },
    collapsible: {
      control: 'boolean',
      description: 'Enable descendant collapsing',
    },
    draggable: {
      control: 'boolean',
      description: 'Allow node dragging',
    },
    roam: {
      control: 'boolean',
      description: 'Enable pan/zoom',
    },
  },
  args: {
    width: 1400,
    height: 800,
    layout: 'layered',
    direction: 'LR',
    edgeStyle: 'straight',
    showEdgeLabels: false,
    collapsible: true,
    draggable: true,
    roam: true,
  },
} satisfies Meta<typeof DAGChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const createEventHandlers = () => ({
  onChartReady: fn(),
  onNodeClick: fn(),
  onNodeDoubleClick: fn(),
  onEdgeClick: fn(),
});

/**
 * ## Complex Manufacturing Workflow
 *
 * Multi-level manufacturing process with cross-dependencies and multiple product outputs.
 * Demonstrates advanced collapsing behavior with shared dependencies.
 *
 * **Interactive Demo:**
 * - Double-click "Mechanical Assembly" to collapse its descendants
 * - Note how "Core System" stays visible (has multiple parents)
 * - Try collapsing "Core System" to see all final products hide
 */
export const ComplexManufacturing: Story = {
  args: {
    data: complexManufacturingData,
    showEdgeLabels: true,
    ...createEventHandlers(),
  },
};

/**
 * ## Manhattan Routing Showcase
 *
 * Pure demonstration of the enhanced Manhattan edge algorithm with Z-shaped routing.
 * Shows 16px port insets and clean right-angled connections.
 *
 * **Algorithm Features:**
 * - Port calculation based on nearest node sides
 * - Optimal bend point positioning
 * - Grid-like professional appearance
 */
export const ManhattanRouting: Story = {
  args: {
    data: manhattanDemoData,
    edgeStyle: 'curved',
    showEdgeLabels: true,
    height: 600,
    ...createEventHandlers(),
  },
};

/**
 * ## Data Pipeline Architecture
 *
 * Real-world data processing pipeline showing ETL, processing, and output stages.
 * Demonstrates complex multi-parent relationships and collapsing behavior.
 *
 * **Try This:**
 * - Collapse "Data Extractor" - see how it preserves "Transformer"
 * - Collapse "Aggregator" - watch storage and ML branches disappear
 * - Notice cross-connections between layers
 */
export const DataPipeline: Story = {
  args: {
    data: dataPipelineData,
    direction: 'LR',
    showEdgeLabels: true,
    ...createEventHandlers(),
  },
};

/**
 * ## Top-to-Bottom Manhattan
 *
 * Vertical layout with Manhattan routing for hierarchical system views.
 * Shows how the algorithm adapts to different orientations.
 */
export const VerticalManhattan: Story = {
  args: {
    data: manhattanDemoData,
    direction: 'TB',
    edgeStyle: 'curved',
    showEdgeLabels: true,
    height: 900,
    ...createEventHandlers(),
  },
};

/**
 * ## Force Layout with Collapsing
 *
 * Physics-based positioning with descendant collapsing capabilities.
 * Demonstrates that collapsing works across all layout types.
 */
export const ForceLayoutCollapsing: Story = {
  args: {
    data: dataPipelineData,
    layout: 'force',
    showEdgeLabels: false,
    force: {
      repulsion: 1500,
      gravity: 0.1,
      edgeLength: [150, 250],
      friction: 0.6,
      layoutAnimation: true,
    },
    ...createEventHandlers(),
  },
};

/**
 * ## Edge Style Comparison
 *
 * Interactive comparison of all three edge rendering algorithms.
 * Switch between styles to see visual differences.
 */
export const EdgeStyleComparison: Story = {
  args: {
    data: manhattanDemoData,
    edgeStyle: 'curved',
    showEdgeLabels: true,
    height: 600,
    ...createEventHandlers(),
  },
  parameters: {
    docs: {
      description: {
        story: `
**Edge Style Guide:**
- **Straight**: Direct lines, minimal visual noise
- **Curved**: Smooth bezier curves, organic feel
- **Manhattan**: Z-shaped right-angled routing, architectural precision

Use the edge style control to compare!
        `,
      },
    },
  },
};

/**
 * ## Nested Collapse Behavior
 *
 * Demonstrates advanced collapsing with preserved nested states.
 * Shows how expanding a parent doesn't affect separately collapsed children.
 */
export const NestedCollapse: Story = {
  args: {
    data: {
      nodes: [
        { id: 'root', name: 'System Root', level: 0, category: 0, value: 100 },

        // Level 1
        { id: 'moduleA', name: 'Module A', level: 1, category: 1, value: 70 },
        { id: 'moduleB', name: 'Module B', level: 1, category: 1, value: 60 },

        // Level 2 - Module A children
        { id: 'subA1', name: 'Sub A1', level: 2, category: 2, value: 35 },
        { id: 'subA2', name: 'Sub A2', level: 2, category: 2, value: 30 },

        // Level 2 - Module B children
        { id: 'subB1', name: 'Sub B1', level: 2, category: 2, value: 40 },

        // Level 3 - Sub A1 children
        { id: 'leafA1a', name: 'Leaf A1a', level: 3, category: 3, value: 15 },
        { id: 'leafA1b', name: 'Leaf A1b', level: 3, category: 3, value: 20 },

        // Level 3 - Sub A2 children
        { id: 'leafA2a', name: 'Leaf A2a', level: 3, category: 3, value: 25 },

        // Level 3 - Sub B1 children
        { id: 'leafB1a', name: 'Leaf B1a', level: 3, category: 3, value: 30 },
        { id: 'leafB1b', name: 'Leaf B1b', level: 3, category: 3, value: 35 },
      ] as DAGNode[],
      links: [
        { source: 'root', target: 'moduleA', value: 40 },
        { source: 'root', target: 'moduleB', value: 35 },

        { source: 'moduleA', target: 'subA1', value: 20 },
        { source: 'moduleA', target: 'subA2', value: 18 },

        { source: 'moduleB', target: 'subB1', value: 25 },

        { source: 'subA1', target: 'leafA1a', value: 10 },
        { source: 'subA1', target: 'leafA1b', value: 12 },

        { source: 'subA2', target: 'leafA2a', value: 15 },

        { source: 'subB1', target: 'leafB1a', value: 18 },
        { source: 'subB1', target: 'leafB1b', value: 20 },
      ] as DAGLink[],
      categories: [
        { name: 'Root', itemStyle: { color: '#e74c3c' } },
        { name: 'Modules', itemStyle: { color: '#3498db' } },
        { name: 'Sub-modules', itemStyle: { color: '#f39c12' } },
        { name: 'Leaves', itemStyle: { color: '#2ecc71' } },
      ],
    },
    showEdgeLabels: false,
    ...createEventHandlers(),
  },
  parameters: {
    docs: {
      description: {
        story: `
**Nested Collapse Demo:**
1. Collapse "Sub A1" (hides its leaves)
2. Collapse "Module A" (hides Sub A1 & Sub A2, but preserves Sub A1's collapsed state)
3. Expand "Module A" (Sub A1 stays collapsed, Sub A2 expands)

This preserves user intentions across hierarchical operations.
        `,
      },
    },
  },
};

/**
 * ## Multi-Parent Dependencies
 *
 * Shows how nodes with multiple parents are preserved during collapsing.
 * Demonstrates intelligent dependency handling.
 */
export const MultiParentDependencies: Story = {
  args: {
    data: {
      nodes: [
        { id: 'sourceA', name: 'Source A', level: 0, category: 0, value: 50 },
        { id: 'sourceB', name: 'Source B', level: 0, category: 0, value: 45 },
        { id: 'sourceC', name: 'Source C', level: 0, category: 0, value: 40 },

        { id: 'processor1', name: 'Processor 1', level: 1, category: 1, value: 60 },
        { id: 'processor2', name: 'Processor 2', level: 1, category: 1, value: 55 },

        { id: 'shared', name: 'Shared Resource', level: 2, category: 2, value: 80 },

        { id: 'outputA', name: 'Output A', level: 3, category: 3, value: 70 },
        { id: 'outputB', name: 'Output B', level: 3, category: 3, value: 65 },
      ] as DAGNode[],
      links: [
        { source: 'sourceA', target: 'processor1', value: 25 },
        { source: 'sourceB', target: 'processor1', value: 20 },
        { source: 'sourceB', target: 'processor2', value: 25 },
        { source: 'sourceC', target: 'processor2', value: 30 },

        // Multiple parents for shared resource
        { source: 'processor1', target: 'shared', value: 35 },
        { source: 'processor2', target: 'shared', value: 40 },

        { source: 'shared', target: 'outputA', value: 35 },
        { source: 'shared', target: 'outputB', value: 30 },

        // Direct connections
        { source: 'processor1', target: 'outputA', value: 15 },
        { source: 'processor2', target: 'outputB', value: 20 },
      ] as DAGLink[],
      categories: [
        { name: 'Sources', itemStyle: { color: '#3498db' } },
        { name: 'Processors', itemStyle: { color: '#e74c3c' } },
        { name: 'Shared', itemStyle: { color: '#f39c12' } },
        { name: 'Outputs', itemStyle: { color: '#2ecc71' } },
      ],
    },
    showEdgeLabels: false,
    ...createEventHandlers(),
  },
  parameters: {
    docs: {
      description: {
        story: `
**Multi-Parent Demo:**
- Collapse "Processor 1" - "Shared Resource" stays visible (has Processor 2 as parent)
- Collapse "Processor 2" - now "Shared Resource" disappears (no visible parents)
- Shows intelligent dependency preservation
        `,
      },
    },
  },
};
