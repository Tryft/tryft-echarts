// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';

import type { D3DAGNode, D3DAGLink } from '../types';
import { D3DAGChart } from '@/components';

// Automotive Manufacturing Example - Multiple Raw Materials → Semi-Finished → Final Assembly
const automotiveManufacturingData = {
  nodes: [
    // Level 0 - Raw Materials (Multiple Root Nodes)
    { id: 'steel_sheets', name: 'Steel Sheets', value: 500, level: 0, category: 0 },
    { id: 'aluminum_bars', name: 'Aluminum Bars', value: 300, level: 0, category: 0 },
    { id: 'plastic_pellets', name: 'Plastic Pellets', value: 150, level: 0, category: 0 },
    { id: 'rubber_compound', name: 'Rubber Compound', value: 80, level: 0, category: 0 },
    { id: 'glass_sheets', name: 'Glass Sheets', value: 120, level: 0, category: 0 },
    { id: 'copper_wire', name: 'Copper Wire', value: 60, level: 0, category: 0 },
    { id: 'fabric_rolls', name: 'Fabric Rolls', value: 90, level: 0, category: 0 },

    // Level 1 - Basic Components
    { id: 'body_panels', name: 'Body Panels', value: 450, level: 1, category: 1 },
    { id: 'engine_block', name: 'Engine Block', value: 800, level: 1, category: 1 },
    { id: 'dashboard_frame', name: 'Dashboard Frame', value: 200, level: 1, category: 1 },
    { id: 'tire_compound', name: 'Tire Compound', value: 180, level: 1, category: 1 },
    { id: 'wiring_harness', name: 'Wiring Harness', value: 150, level: 1, category: 1 },
    { id: 'seat_foam', name: 'Seat Foam', value: 120, level: 1, category: 1 },

    // Level 2 - Sub-Assemblies (Multiple paths converge)
    { id: 'chassis_assembly', name: 'Chassis Assembly', value: 1200, level: 2, category: 2 },
    { id: 'interior_assembly', name: 'Interior Assembly', value: 600, level: 2, category: 2 },
    { id: 'powertrain', name: 'Powertrain', value: 1000, level: 2, category: 2 },
    { id: 'electrical_system', name: 'Electrical System', value: 300, level: 2, category: 2 },

    // Level 3 - Major Assemblies (Convergence Point)
    { id: 'vehicle_platform', name: 'Vehicle Platform', value: 2500, level: 3, category: 3 },

    // Level 4 - Final Products (Platform branches out)
    { id: 'sedan_model', name: 'Sedan Model', value: 3000, level: 4, category: 4 },
    { id: 'suv_model', name: 'SUV Model', value: 3500, level: 4, category: 4 },
    { id: 'truck_model', name: 'Truck Model', value: 4000, level: 4, category: 4 },
  ] as D3DAGNode[],
  links: [
    // Raw materials to basic components
    { source: 'steel_sheets', target: 'body_panels', value: 300, label: 'stamping' },
    { source: 'steel_sheets', target: 'engine_block', value: 200, label: 'casting' },
    { source: 'aluminum_bars', target: 'body_panels', value: 150, label: 'forming' },
    { source: 'aluminum_bars', target: 'engine_block', value: 100, label: 'machining' },
    { source: 'plastic_pellets', target: 'dashboard_frame', value: 120, label: 'injection molding' },
    { source: 'rubber_compound', target: 'tire_compound', value: 80, label: 'vulcanization' },
    { source: 'copper_wire', target: 'wiring_harness', value: 60, label: 'bundling' },
    { source: 'fabric_rolls', target: 'seat_foam', value: 90, label: 'covering' },

    // Basic components to sub-assemblies (Multiple inputs → Single output)
    { source: 'body_panels', target: 'chassis_assembly', value: 400, label: 'welding' },
    { source: 'engine_block', target: 'powertrain', value: 600, label: 'assembly' },
    { source: 'dashboard_frame', target: 'interior_assembly', value: 150, label: 'mounting' },
    { source: 'seat_foam', target: 'interior_assembly', value: 100, label: 'installation' },
    { source: 'wiring_harness', target: 'electrical_system', value: 120, label: 'routing' },
    { source: 'tire_compound', target: 'chassis_assembly', value: 150, label: 'mounting' },

    // Cross-component dependencies
    { source: 'steel_sheets', target: 'chassis_assembly', value: 100, label: 'reinforcement' },
    { source: 'aluminum_bars', target: 'interior_assembly', value: 50, label: 'trim' },
    { source: 'glass_sheets', target: 'interior_assembly', value: 120, label: 'windows' },

    // Sub-assemblies converge to platform (Major Convergence Point)
    { source: 'chassis_assembly', target: 'vehicle_platform', value: 800, label: 'integration' },
    { source: 'powertrain', target: 'vehicle_platform', value: 700, label: 'mounting' },
    { source: 'interior_assembly', target: 'vehicle_platform', value: 400, label: 'fitting' },
    { source: 'electrical_system', target: 'vehicle_platform', value: 200, label: 'wiring' },

    // Platform branches to final products
    { source: 'vehicle_platform', target: 'sedan_model', value: 1000, label: 'customization' },
    { source: 'vehicle_platform', target: 'suv_model', value: 1200, label: 'modification' },
    { source: 'vehicle_platform', target: 'truck_model', value: 1300, label: 'reinforcement' },

    // Direct material to final products (bypass platform)
    { source: 'steel_sheets', target: 'truck_model', value: 100, label: 'bed reinforcement' },
    { source: 'aluminum_bars', target: 'sedan_model', value: 50, label: 'lightweight trim' },
  ] as D3DAGLink[],
  categories: [
    { name: 'Raw Materials', itemStyle: { color: '#8B4513' } },
    { name: 'Basic Components', itemStyle: { color: '#FF6B35' } },
    { name: 'Sub-Assemblies', itemStyle: { color: '#F7931E' } },
    { name: 'Major Assembly', itemStyle: { color: '#FFD23F' } },
    { name: 'Final Products', itemStyle: { color: '#06A77D' } },
  ],
};

// Smartphone Manufacturing - Electronics Assembly Example
const smartphoneManufacturingData = {
  nodes: [
    // Level 0 - Raw Materials & Components
    { id: 'silicon_wafers', name: 'Silicon Wafers', value: 200, level: 0, category: 0 },
    { id: 'rare_earth_metals', name: 'Rare Earth Metals', value: 50, level: 0, category: 0 },
    { id: 'glass_substrate', name: 'Glass Substrate', value: 80, level: 0, category: 0 },
    { id: 'plastic_polymers', name: 'Plastic Polymers', value: 60, level: 0, category: 0 },
    { id: 'lithium_compounds', name: 'Lithium Compounds', value: 40, level: 0, category: 0 },
    { id: 'copper_foil', name: 'Copper Foil', value: 30, level: 0, category: 0 },

    // Level 1 - Processed Components
    { id: 'processor_chips', name: 'Processor Chips', value: 150, level: 1, category: 1 },
    { id: 'memory_chips', name: 'Memory Chips', value: 100, level: 1, category: 1 },
    { id: 'display_panel', name: 'Display Panel', value: 120, level: 1, category: 1 },
    { id: 'battery_cells', name: 'Battery Cells', value: 80, level: 1, category: 1 },
    { id: 'camera_sensors', name: 'Camera Sensors', value: 60, level: 1, category: 1 },
    { id: 'circuit_board', name: 'Circuit Board', value: 70, level: 1, category: 1 },

    // Level 2 - Module Assemblies (Convergence starts)
    { id: 'main_board', name: 'Main Board', value: 300, level: 2, category: 2 },
    { id: 'display_module', name: 'Display Module', value: 180, level: 2, category: 2 },
    { id: 'camera_module', name: 'Camera Module', value: 90, level: 2, category: 2 },
    { id: 'power_module', name: 'Power Module', value: 110, level: 2, category: 2 },

    // Level 3 - Core Assembly (Major Convergence)
    { id: 'phone_core', name: 'Phone Core Assembly', value: 600, level: 3, category: 3 },

    // Level 4 - Final Products
    { id: 'budget_phone', name: 'Budget Phone', value: 700, level: 4, category: 4 },
    { id: 'flagship_phone', name: 'Flagship Phone', value: 1000, level: 4, category: 4 },
    { id: 'pro_phone', name: 'Pro Phone', value: 1200, level: 4, category: 4 },
  ] as D3DAGNode[],
  links: [
    // Raw materials to components
    { source: 'silicon_wafers', target: 'processor_chips', value: 100, label: 'fabrication' },
    { source: 'silicon_wafers', target: 'memory_chips', value: 80, label: 'etching' },
    { source: 'rare_earth_metals', target: 'camera_sensors', value: 30, label: 'deposition' },
    { source: 'glass_substrate', target: 'display_panel', value: 80, label: 'coating' },
    { source: 'plastic_polymers', target: 'circuit_board', value: 40, label: 'molding' },
    { source: 'lithium_compounds', target: 'battery_cells', value: 40, label: 'synthesis' },
    { source: 'copper_foil', target: 'circuit_board', value: 30, label: 'layering' },

    // Components to modules (Multiple → Single convergence)
    { source: 'processor_chips', target: 'main_board', value: 120, label: 'mounting' },
    { source: 'memory_chips', target: 'main_board', value: 80, label: 'soldering' },
    { source: 'circuit_board', target: 'main_board', value: 60, label: 'integration' },
    { source: 'display_panel', target: 'display_module', value: 100, label: 'assembly' },
    { source: 'camera_sensors', target: 'camera_module', value: 50, label: 'calibration' },
    { source: 'battery_cells', target: 'power_module', value: 60, label: 'packaging' },

    // Cross-dependencies
    { source: 'rare_earth_metals', target: 'main_board', value: 20, label: 'components' },
    { source: 'plastic_polymers', target: 'camera_module', value: 20, label: 'housing' },

    // Modules converge to core (Major Convergence Point)
    { source: 'main_board', target: 'phone_core', value: 250, label: 'integration' },
    { source: 'display_module', target: 'phone_core', value: 150, label: 'attachment' },
    { source: 'camera_module', target: 'phone_core', value: 70, label: 'mounting' },
    { source: 'power_module', target: 'phone_core', value: 90, label: 'connection' },

    // Core branches to final products
    { source: 'phone_core', target: 'budget_phone', value: 200, label: 'basic config' },
    { source: 'phone_core', target: 'flagship_phone', value: 300, label: 'enhanced config' },
    { source: 'phone_core', target: 'pro_phone', value: 350, label: 'premium config' },

    // Direct components to specific models
    { source: 'camera_sensors', target: 'pro_phone', value: 10, label: 'extra sensor' },
    { source: 'memory_chips', target: 'flagship_phone', value: 20, label: 'upgrade' },
  ] as D3DAGLink[],
  categories: [
    { name: 'Raw Materials', itemStyle: { color: '#2E86AB' } },
    { name: 'Components', itemStyle: { color: '#A23B72' } },
    { name: 'Modules', itemStyle: { color: '#F18F01' } },
    { name: 'Core Assembly', itemStyle: { color: '#C73E1D' } },
    { name: 'Final Products', itemStyle: { color: '#592E83' } },
  ],
};

// Food Production - Multi-Ingredient Processing Example
const foodProductionData = {
  nodes: [
    // Level 0 - Raw Ingredients (Multiple roots)
    { id: 'wheat_grain', name: 'Wheat Grain', value: 1000, level: 0, category: 0 },
    { id: 'milk_raw', name: 'Raw Milk', value: 500, level: 0, category: 0 },
    { id: 'sugar_cane', name: 'Sugar Cane', value: 300, level: 0, category: 0 },
    { id: 'cocoa_beans', name: 'Cocoa Beans', value: 200, level: 0, category: 0 },
    { id: 'eggs_fresh', name: 'Fresh Eggs', value: 150, level: 0, category: 0 },
    { id: 'vanilla_beans', name: 'Vanilla Beans', value: 50, level: 0, category: 0 },

    // Level 0 - Packaging Materials
    { id: 'cardboard_sheets', name: 'Cardboard Sheets', value: 100, level: 0, category: 5 },
    { id: 'plastic_film', name: 'Plastic Film', value: 80, level: 0, category: 5 },
    { id: 'aluminum_foil', name: 'Aluminum Foil', value: 60, level: 0, category: 5 },

    // Level 1 - Processed Ingredients
    { id: 'flour', name: 'Flour', value: 800, level: 1, category: 1 },
    { id: 'butter', name: 'Butter', value: 200, level: 1, category: 1 },
    { id: 'milk_powder', name: 'Milk Powder', value: 150, level: 1, category: 1 },
    { id: 'sugar_refined', name: 'Refined Sugar', value: 250, level: 1, category: 1 },
    { id: 'chocolate_liquor', name: 'Chocolate Liquor', value: 180, level: 1, category: 1 },
    { id: 'vanilla_extract', name: 'Vanilla Extract', value: 40, level: 1, category: 1 },

    // Level 1 - Packaging Components
    { id: 'boxes', name: 'Boxes', value: 90, level: 1, category: 5 },
    { id: 'wrappers', name: 'Wrappers', value: 70, level: 1, category: 5 },

    // Level 2 - Semi-Finished Products (Multiple inputs converge)
    { id: 'cake_mix', name: 'Cake Mix', value: 400, level: 2, category: 2 },
    { id: 'chocolate_base', name: 'Chocolate Base', value: 300, level: 2, category: 2 },
    { id: 'cream_filling', name: 'Cream Filling', value: 180, level: 2, category: 2 },

    // Level 3 - Final Food Products (Convergence point branches out)
    { id: 'chocolate_cake', name: 'Chocolate Cake', value: 600, level: 3, category: 3 },
    { id: 'vanilla_cake', name: 'Vanilla Cake', value: 550, level: 3, category: 3 },
    { id: 'chocolate_bars', name: 'Chocolate Bars', value: 400, level: 3, category: 3 },

    // Level 4 - Packaged Products
    { id: 'boxed_cake', name: 'Boxed Cake', value: 650, level: 4, category: 4 },
    { id: 'wrapped_bars', name: 'Wrapped Bars', value: 450, level: 4, category: 4 },
  ] as D3DAGNode[],
  links: [
    // Raw ingredients to processed
    { source: 'wheat_grain', target: 'flour', value: 800, label: 'milling' },
    { source: 'milk_raw', target: 'butter', value: 200, label: 'churning' },
    { source: 'milk_raw', target: 'milk_powder', value: 150, label: 'dehydrating' },
    { source: 'sugar_cane', target: 'sugar_refined', value: 250, label: 'refining' },
    { source: 'cocoa_beans', target: 'chocolate_liquor', value: 180, label: 'grinding' },
    { source: 'vanilla_beans', target: 'vanilla_extract', value: 40, label: 'extracting' },

    // Packaging materials to components
    { source: 'cardboard_sheets', target: 'boxes', value: 90, label: 'cutting & folding' },
    { source: 'plastic_film', target: 'wrappers', value: 70, label: 'printing & cutting' },

    // Multiple processed ingredients → Semi-finished (Convergence)
    { source: 'flour', target: 'cake_mix', value: 300, label: 'mixing' },
    { source: 'sugar_refined', target: 'cake_mix', value: 100, label: 'blending' },
    { source: 'eggs_fresh', target: 'cake_mix', value: 50, label: 'binding' },
    { source: 'chocolate_liquor', target: 'chocolate_base', value: 150, label: 'tempering' },
    { source: 'sugar_refined', target: 'chocolate_base', value: 100, label: 'sweetening' },
    { source: 'butter', target: 'cream_filling', value: 80, label: 'whipping' },
    { source: 'milk_powder', target: 'cream_filling', value: 60, label: 'enriching' },
    { source: 'vanilla_extract', target: 'cream_filling', value: 20, label: 'flavoring' },

    // Semi-finished to final products (Further convergence)
    { source: 'cake_mix', target: 'chocolate_cake', value: 200, label: 'baking' },
    { source: 'chocolate_base', target: 'chocolate_cake', value: 150, label: 'coating' },
    { source: 'cream_filling', target: 'chocolate_cake', value: 80, label: 'filling' },
    { source: 'cake_mix', target: 'vanilla_cake', value: 200, label: 'baking' },
    { source: 'vanilla_extract', target: 'vanilla_cake', value: 20, label: 'flavoring' },
    { source: 'chocolate_base', target: 'chocolate_bars', value: 250, label: 'molding' },

    // Final products + packaging → Packaged products
    { source: 'chocolate_cake', target: 'boxed_cake', value: 400, label: 'packaging' },
    { source: 'vanilla_cake', target: 'boxed_cake', value: 250, label: 'packaging' },
    { source: 'boxes', target: 'boxed_cake', value: 50, label: 'containing' },
    { source: 'chocolate_bars', target: 'wrapped_bars', value: 350, label: 'wrapping' },
    { source: 'wrappers', target: 'wrapped_bars', value: 40, label: 'sealing' },

    // Cross-dependencies
    { source: 'aluminum_foil', target: 'wrapped_bars', value: 20, label: 'inner wrap' },
    { source: 'sugar_refined', target: 'chocolate_bars', value: 50, label: 'direct sweetening' },
  ] as D3DAGLink[],
  categories: [
    { name: 'Raw Ingredients', itemStyle: { color: '#8FBC8F' } },
    { name: 'Processed Ingredients', itemStyle: { color: '#DDA0DD' } },
    { name: 'Semi-Finished', itemStyle: { color: '#F0E68C' } },
    { name: 'Final Products', itemStyle: { color: '#FFA07A' } },
    { name: 'Packaged Products', itemStyle: { color: '#20B2AA' } },
    { name: 'Packaging Materials', itemStyle: { color: '#778899' } },
  ],
};

const meta = {
  title: 'Charts/DAG Chart Enhanced',
  component: D3DAGChart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Enhanced DAG Chart - Manufacturing Workflow Visualization

Advanced directed acyclic graph component for complex manufacturing and process visualization with intelligent collapsing and Manhattan routing.

## 🏭 Manufacturing Features

### Multi-Root Convergence Patterns
- **Multiple raw materials** converge through layered processing
- **Semi-finished products** combine with additional inputs
- **Platform-based manufacturing** where single assemblies branch to multiple products
- **Cross-level dependencies** showing direct material-to-product flows

### Smart Interaction
- **Double-click nodes** to collapse entire descendant trees
- **Hover highlighting** shows complete supply chains
- **Category filtering** to focus on specific material types
- **Stable positioning** prevents layout shifts during interactions

Perfect for **automotive**, **electronics**, **food production**, and **pharmaceutical** manufacturing visualization.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Graph data with nodes, links, and categories',
      control: false,
      table: {
        category: 'Data',
        type: { summary: 'DAGData' },
      },
    },
    width: {
      control: { type: 'range', min: 800, max: 2000, step: 50 },
      description: 'Chart container width in pixels',
      table: {
        category: 'Layout',
        defaultValue: { summary: '800' },
      },
    },
    height: {
      control: { type: 'range', min: 600, max: 1200, step: 50 },
      description: 'Chart container height in pixels',
      table: {
        category: 'Layout',
        defaultValue: { summary: '600' },
      },
    },
    layout: {
      control: { type: 'select' },
      options: ['layered', 'force'],
      description: 'Layout algorithm: layered for hierarchical, force for physics-based',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'layered' },
      },
    },
    direction: {
      control: { type: 'select' },
      options: ['LR', 'TB'],
      description: 'Layout direction: LR (Left-Right) or TB (Top-Bottom)',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'LR' },
      },
    },
    nodeSize: {
      control: { type: 'range', min: 30, max: 80, step: 5 },
      description: 'Size of node squares in pixels',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '50' },
      },
    },
    edgeInset: {
      control: { type: 'range', min: 8, max: 24, step: 2 },
      description: 'Inset distance for edge connection points',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '16' },
      },
    },
    animationDuration: {
      control: { type: 'range', min: 200, max: 2000, step: 100 },
      description: 'Animation duration for transitions in milliseconds',
      table: {
        category: 'Animation',
        defaultValue: { summary: '750' },
      },
    },
    enableZoom: {
      control: 'boolean',
      description: 'Enable pan and zoom functionality',
      table: {
        category: 'Interaction',
        defaultValue: { summary: 'true' },
      },
    },
    enableDrag: {
      control: 'boolean',
      description: 'Enable node dragging (force layout only)',
      table: {
        category: 'Interaction',
        defaultValue: { summary: 'false' },
      },
    },
    onNodeClick: {
      description: 'Callback fired when a node is clicked',
      action: 'nodeClicked',
      table: {
        category: 'Events',
      },
    },
    onNodeDoubleClick: {
      description: 'Callback fired when a node is double-clicked (triggers collapse/expand)',
      action: 'nodeDoubleClicked',
      table: {
        category: 'Events',
      },
    },
    onEdgeClick: {
      description: 'Callback fired when an edge is clicked',
      action: 'edgeClicked',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    width: 1200,
    height: 800,
    layout: 'layered',
    direction: 'LR',
    nodeSize: 50,
    edgeInset: 16,
    animationDuration: 750,
    enableZoom: true,
    enableDrag: false,
    onNodeClick: fn(),
    onNodeDoubleClick: fn(),
    onEdgeClick: fn(),
  },
} satisfies Meta<typeof D3DAGChart>;

/**
 * ## Interactive Demo with Category Controls
 *
 * Full-featured demo showing **category filtering**, **layout switching**, and **collapse behavior**.
 * Includes the complete interactive controls from the original demo component.
 *
 * **Interactive Features:**
 * - **Category toggles** to show/hide node types
 * - **Layout switching** between layered and force
 * - **Double-click collapse** with preserved multi-parent nodes
 * - **Path highlighting** on hover
 */
export const InteractiveDemoWithControls: Story = {
  render: (args) => {
    const sampleData = {
      nodes: [
        { id: 'A', name: 'Start', category: 'input', value: 100, level: 0 },
        { id: 'B', name: 'Process 1', category: 'process', value: 80, level: 1 },
        { id: 'C', name: 'Process 2', category: 'process', value: 60, level: 1 },
        { id: 'D', name: 'Decision', category: 'decision', value: 40, level: 2 },
        { id: 'E', name: 'Output 1', category: 'output', value: 30, level: 3 },
        { id: 'F', name: 'Output 2', category: 'output', value: 10, level: 3 },
        { id: 'G', name: 'Final', category: 'output', value: 40, level: 4 },
        { id: 'H', name: 'Monitor', category: 'process', value: 20, level: 2 },
        { id: 'I', name: 'Log', category: 'output', value: 15, level: 3 },
      ] as D3DAGNode[],
      links: [
        { source: 'A', target: 'B', value: 10, label: 'init' },
        { source: 'A', target: 'C', value: 8, label: 'parallel' },
        { source: 'B', target: 'D', value: 6, label: 'result' },
        { source: 'C', target: 'D', value: 4, label: 'merge' },
        { source: 'D', target: 'E', value: 5, label: 'path1' },
        { source: 'D', target: 'F', value: 3, label: 'path2' },
        { source: 'E', target: 'G', value: 2, label: 'combine' },
        { source: 'F', target: 'G', value: 1, label: 'combine' },
        { source: 'B', target: 'H', value: 2, label: 'monitor' },
        { source: 'H', target: 'I', value: 1, label: 'log' },
        { source: 'C', target: 'H', value: 1, label: 'track' },
      ] as D3DAGLink[],
      categories: [
        { name: 'input', itemStyle: { color: '#5470c6' } },
        { name: 'process', itemStyle: { color: '#91cc75' } },
        { name: 'decision', itemStyle: { color: '#fac858' } },
        { name: 'output', itemStyle: { color: '#ee6666' } },
      ],
    };

    const [layout, setLayout] = React.useState<'force' | 'layered'>('layered');
    const [hiddenCategories, setHiddenCategories] = React.useState<Set<string>>(new Set());

    const toggleCategory = (categoryName: string) => {
      setHiddenCategories((prev) => {
        const newHidden = new Set(prev);
        if (newHidden.has(categoryName)) {
          newHidden.delete(categoryName);
        } else {
          newHidden.add(categoryName);
        }
        return newHidden;
      });
    };

    const filteredData = {
      ...sampleData,
      nodes: sampleData.nodes.filter((node) => !hiddenCategories.has(node.category || '')),
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3>Interactive DAG Chart Demo</h3>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            Layout:
            <select value={layout} onChange={(e) => setLayout(e.target.value as 'force' | 'layered')}>
              <option value="layered">Layered</option>
              <option value="force">Force</option>
            </select>
          </label>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Categories:</span>
            {sampleData.categories?.map((category) => (
              <label
                key={category.name}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  checked={!hiddenCategories.has(category.name)}
                  onChange={() => toggleCategory(category.name)}
                />
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: category.itemStyle.color,
                    border: '1px solid #ccc',
                    borderRadius: '2px',
                  }}
                />
                <span style={{ fontSize: '14px' }}>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
          <strong>Features:</strong>
          <br />• <strong>Double-click</strong> nodes to collapse/expand descendants
          <br />• <strong>Hover</strong> over nodes/edges to highlight full paths
          <br />• <strong>Toggle categories</strong> to show/hide node types
          <br />• <strong>Switch layouts</strong> between layered and force-directed
        </div>

        <D3DAGChart {...args} data={filteredData} layout={layout} width={900} height={600} />
      </div>
    );
  },
  args: {
    direction: 'LR',
    nodeSize: 50,
    enableDrag: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete interactive demo with all original features:
- Category filtering with visual checkboxes
- Layout switching between algorithms
- Full collapse/expand functionality
- Path highlighting on hover

Perfect for testing all chart capabilities in one interface.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Automotive Manufacturing Workflow
 *
 * Complete automotive production line showing how **7 raw materials** flow through **3 processing levels**
 * to create a **unified vehicle platform** that branches into **3 final products**.
 *
 * **Key Convergence Points:**
 * - Multiple raw materials → Basic components
 * - Basic components → Sub-assemblies
 * - Sub-assemblies → **Vehicle Platform** (major convergence)
 * - Vehicle Platform → Final vehicle models
 *
 * **Try This:**
 * 1. **Double-click "Chassis Assembly"** - see body panels, tires disappear but platform stays (has multiple inputs)
 * 2. **Double-click "Vehicle Platform"** - all final products disappear
 * 3. **Hover any node** - trace complete supply chain from raw materials to final products
 */
export const AutomotiveManufacturing: Story = {
  args: {
    data: automotiveManufacturingData,
    width: 1400,
    height: 900,
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates complex manufacturing convergence where multiple raw materials (steel, aluminum, plastic, rubber, glass, copper, fabric) flow through layered processing to create basic components, then sub-assemblies, finally converging into a single vehicle platform that branches out to different vehicle models.

**Manufacturing Flow:**
- **Level 0**: 7 raw materials (multiple roots)
- **Level 1**: 6 basic components  
- **Level 2**: 4 sub-assemblies (convergence begins)
- **Level 3**: 1 vehicle platform (major convergence point)
- **Level 4**: 3 final products (platform branches out)
        `,
      },
    },
  },
};

/**
 * ## Smartphone Manufacturing Process
 *
 * Electronics manufacturing showing **silicon wafers & rare earth metals** processed through
 * **component fabrication → module assembly → core integration → final product variants**.
 *
 * **Convergence Pattern:**
 * - Raw materials → Individual components (chips, displays, batteries)
 * - Components → Modules (main board, display module, camera module)
 * - Modules → **Phone Core Assembly** (convergence point)
 * - Core → Product variants (budget/flagship/pro)
 *
 * **Interactive Features:**
 * - Collapse "Main Board" to see processor/memory disappear
 * - Collapse "Phone Core" to hide all final products
 * - Notice cross-dependencies (rare earth metals used in multiple components)
 */
export const SmartphoneManufacturing: Story = {
  args: {
    data: smartphoneManufacturingData,
    width: 1300,
    height: 800,
  },
  parameters: {
    docs: {
      description: {
        story: `
Electronics manufacturing example showing how raw materials like silicon wafers and rare earth metals are processed into components (chips, sensors), then assembled into modules, converged into a core assembly, and finally differentiated into product variants.
        `,
      },
    },
  },
};

/**
 * ## Food Production with Packaging
 *
 * Multi-ingredient food manufacturing showing **raw ingredients + packaging materials** flowing through
 * **processing → semi-finished products → final products → packaged goods**.
 *
 * **Dual Convergence Pattern:**
 * - Multiple ingredients → Semi-finished products (cake mix, chocolate base, cream filling)
 * - Semi-finished → Final products (cakes, chocolate bars)
 * - Final products + Packaging → Packaged goods
 *
 * **Complex Dependencies:**
 * - Wheat grain → Flour → Cake Mix → Multiple cake types
 * - Milk → Both butter AND milk powder → Different products
 * - Sugar used in multiple semi-finished products
 */
export const FoodProductionWorkflow: Story = {
  args: {
    data: foodProductionData,
    width: 1400,
    height: 900,
  },
  parameters: {
    docs: {
      description: {
        story: `
Food production workflow showing ingredients and packaging materials flowing through multiple processing stages. Demonstrates how raw ingredients like wheat, milk, and sugar are processed into intermediate products (flour, butter, refined sugar) then combined into semi-finished products (cake mix, chocolate base) before final assembly and packaging.

**Multi-Stream Convergence:**
- Raw ingredients → Processed ingredients
- Multiple processed ingredients → Semi-finished products  
- Semi-finished products → Final food products
- Final products + Packaging materials → Consumer-ready products
        `,
      },
    },
  },
};

/**
 * ## Manhattan Routing Demonstration
 *
 * Clean demonstration of the Manhattan edge routing algorithm with optimized **Z-shaped paths**,
 * **90-degree turns**, and **16px port insets**.
 *
 * **Algorithm Features:**
 * - Horizontal segments merge before branching vertically
 * - Clean right-angled connections to node sides
 * - Arrows positioned outside node boundaries
 * - Grid-like architectural appearance
 */
export const ManhattanRoutingDemo: Story = {
  args: {
    data: {
      nodes: [
        { id: 'A', name: 'Input A', level: 0, category: 0, value: 50 },
        { id: 'B', name: 'Input B', level: 0, category: 0, value: 45 },
        { id: 'C', name: 'Process C', level: 1, category: 1, value: 60 },
        { id: 'D', name: 'Process D', level: 1, category: 1, value: 55 },
        { id: 'E', name: 'Convergence', level: 2, category: 2, value: 80 },
        { id: 'F', name: 'Output F', level: 3, category: 3, value: 70 },
        { id: 'G', name: 'Output G', level: 3, category: 3, value: 65 },
      ] as D3DAGNode[],
      links: [
        { source: 'A', target: 'C', value: 25, label: 'route 1' },
        { source: 'B', target: 'C', value: 20, label: 'route 2' },
        { source: 'A', target: 'D', value: 25, label: 'route 3' },
        { source: 'C', target: 'E', value: 40, label: 'merge 1' },
        { source: 'D', target: 'E', value: 35, label: 'merge 2' },
        { source: 'E', target: 'F', value: 35, label: 'split 1' },
        { source: 'E', target: 'G', value: 30, label: 'split 2' },
      ] as D3DAGLink[],
      categories: [
        { name: 'Inputs', itemStyle: { color: '#3498db' } },
        { name: 'Processing', itemStyle: { color: '#e74c3c' } },
        { name: 'Convergence', itemStyle: { color: '#f39c12' } },
        { name: 'Outputs', itemStyle: { color: '#2ecc71' } },
      ],
    },
    width: 1000,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: `
Pure demonstration of Manhattan routing algorithm showing clean Z-shaped paths with 90-degree turns. Perfect for architectural diagrams requiring grid-like precision.
        `,
      },
    },
  },
};

/**
 * ## Force Layout Manufacturing
 *
 * Same automotive data using **physics-based positioning** instead of layered layout.
 * Shows how the component handles complex convergence patterns with dynamic positioning.
 *
 * **Physics Features:**
 * - Nodes repel each other for clear spacing
 * - Connected nodes attract via edge forces
 * - Collision detection prevents overlap
 * - Interactive repositioning with drag
 */
export const ForceLayoutManufacturing: Story = {
  args: {
    data: automotiveManufacturingData,
    layout: 'force',
    enableDrag: true,
    width: 1400,
    height: 900,
  },
  parameters: {
    docs: {
      description: {
        story: `
Physics-based layout of the automotive manufacturing workflow. Nodes position themselves based on attraction/repulsion forces while maintaining the same convergence logic and interaction patterns.
        `,
      },
    },
  },
};

/**
 * ## Multi-Level Convergence Analysis
 *
 * Complex convergence pattern showing **multiple materials** flowing through **3 processing levels**
 * into **single convergence points** that then **branch to multiple outputs**.
 *
 * **Pattern Analysis:**
 * - **8 raw materials** (Level 0)
 * - **5 basic components** (Level 1)
 * - **3 sub-assemblies** (Level 2)
 * - **1 core product** (Level 3) - Major convergence
 * - **4 final variants** (Level 4) - Divergence
 *
 * Perfect for analyzing **manufacturing bottlenecks** and **dependency chains**.
 */
export const MultiLevelConvergence: Story = {
  args: {
    data: {
      nodes: [
        // Level 0 - Multiple raw materials (8 roots)
        { id: 'mat1', name: 'Material 1', level: 0, category: 0, value: 100 },
        { id: 'mat2', name: 'Material 2', level: 0, category: 0, value: 90 },
        { id: 'mat3', name: 'Material 3', level: 0, category: 0, value: 80 },
        { id: 'mat4', name: 'Material 4', level: 0, category: 0, value: 70 },
        { id: 'mat5', name: 'Material 5', level: 0, category: 0, value: 60 },
        { id: 'mat6', name: 'Material 6', level: 0, category: 0, value: 50 },
        { id: 'mat7', name: 'Material 7', level: 0, category: 0, value: 40 },
        { id: 'mat8', name: 'Material 8', level: 0, category: 0, value: 30 },

        // Level 1 - Basic components (5 nodes)
        { id: 'comp1', name: 'Component 1', level: 1, category: 1, value: 150 },
        { id: 'comp2', name: 'Component 2', level: 1, category: 1, value: 130 },
        { id: 'comp3', name: 'Component 3', level: 1, category: 1, value: 120 },
        { id: 'comp4', name: 'Component 4', level: 1, category: 1, value: 110 },
        { id: 'comp5', name: 'Component 5', level: 1, category: 1, value: 100 },

        // Level 2 - Sub-assemblies (3 nodes)
        { id: 'sub1', name: 'Sub-Assembly 1', level: 2, category: 2, value: 250 },
        { id: 'sub2', name: 'Sub-Assembly 2', level: 2, category: 2, value: 220 },
        { id: 'sub3', name: 'Sub-Assembly 3', level: 2, category: 2, value: 200 },

        // Level 3 - Core product (1 node - major convergence)
        { id: 'core', name: 'Core Product', level: 3, category: 3, value: 500 },

        // Level 4 - Final products (4 nodes - divergence)
        { id: 'final1', name: 'Variant A', level: 4, category: 4, value: 600 },
        { id: 'final2', name: 'Variant B', level: 4, category: 4, value: 650 },
        { id: 'final3', name: 'Variant C', level: 4, category: 4, value: 700 },
        { id: 'final4', name: 'Variant D', level: 4, category: 4, value: 750 },
      ] as D3DAGNode[],
      links: [
        // Raw materials to components (many-to-many)
        { source: 'mat1', target: 'comp1', value: 50 },
        { source: 'mat2', target: 'comp1', value: 40 },
        { source: 'mat3', target: 'comp2', value: 45 },
        { source: 'mat4', target: 'comp2', value: 35 },
        { source: 'mat5', target: 'comp3', value: 40 },
        { source: 'mat6', target: 'comp3', value: 30 },
        { source: 'mat7', target: 'comp4', value: 25 },
        { source: 'mat8', target: 'comp4', value: 20 },
        { source: 'mat1', target: 'comp5', value: 30 },
        { source: 'mat5', target: 'comp5', value: 20 },

        // Components to sub-assemblies (convergence)
        { source: 'comp1', target: 'sub1', value: 80 },
        { source: 'comp2', target: 'sub1', value: 70 },
        { source: 'comp2', target: 'sub2', value: 60 },
        { source: 'comp3', target: 'sub2', value: 70 },
        { source: 'comp4', target: 'sub3', value: 65 },
        { source: 'comp5', target: 'sub3', value: 50 },

        // Sub-assemblies to core (major convergence point)
        { source: 'sub1', target: 'core', value: 150 },
        { source: 'sub2', target: 'core', value: 130 },
        { source: 'sub3', target: 'core', value: 115 },

        // Core to final products (divergence)
        { source: 'core', target: 'final1', value: 120 },
        { source: 'core', target: 'final2', value: 130 },
        { source: 'core', target: 'final3', value: 140 },
        { source: 'core', target: 'final4', value: 150 },

        // Cross-level dependencies
        { source: 'mat1', target: 'core', value: 20 },
        { source: 'comp1', target: 'final4', value: 30 },
      ] as D3DAGLink[],
      categories: [
        { name: 'Raw Materials', itemStyle: { color: '#34495e' } },
        { name: 'Components', itemStyle: { color: '#e67e22' } },
        { name: 'Sub-Assemblies', itemStyle: { color: '#f39c12' } },
        { name: 'Core Product', itemStyle: { color: '#e74c3c' } },
        { name: 'Final Products', itemStyle: { color: '#27ae60' } },
      ],
    },
    width: 1500,
    height: 900,
  },
  parameters: {
    docs: {
      description: {
        story: `
Analysis of multi-level convergence patterns in manufacturing. Shows how 8 raw materials flow through 3 processing levels to converge into a single core product, which then branches into 4 final variants. Perfect for bottleneck analysis and supply chain optimization.

**Test Collapse Behavior:**
- Double-click "Core Product" → All final variants disappear
- Double-click "Sub-Assembly 1" → Components 1&2 disappear, but Core Product stays (has other inputs)
- Double-click "Component 1" → Material 1&2 disappear from that path
        `,
      },
    },
  },
};
