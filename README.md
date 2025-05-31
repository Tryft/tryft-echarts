# @tryft/echarts

A powerful React component library built on top of Apache ECharts, providing easy-to-use chart components with rich text labels, detailed tooltips, and TypeScript support.

## Features

🚀 **Easy to Use** - Simple props-based API for quick chart creation  
📊 **Rich Charts** - Line, Bar, Pie, Tree, Treemap, Gauge, and Graph charts  
🎨 **Rich Text Labels** - Multi-styled text with different fonts, colors, and sizes  
💡 **Detailed Tooltips** - Information-rich hover tooltips  
🔧 **TypeScript Support** - Full type safety and IntelliSense  
⚡ **Vite Optimized** - Fast development and build times  
📖 **Storybook Docs** - Interactive component documentation  
🎯 **Tree Shaking** - Import only what you need  
🚀 **Auto Deploy** - GitHub Actions deployment to GitHub Pages

## Live Documentation

📚 **[View Live Storybook Documentation](https://tryft.github.io/echarts/)** - Interactive examples and API documentation

> The documentation is automatically built and deployed to GitHub Pages whenever the main branch is updated.

## Installation

```bash
npm install @tryft/echarts
# or
yarn add @tryft/echarts
# or
pnpm add @tryft/echarts
```

## Quick Start

```tsx
import { LineChart, BarChart, PieChart } from '@tryft/echarts';

function App() {
  return (
    <div>
      {/* Simple Line Chart */}
      <LineChart
        series={[
          {
            name: 'Sales',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
          },
        ]}
        categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        height={400}
      />

      {/* Simple Bar Chart */}
      <BarChart
        data={[
          { name: 'Product A', value: 100 },
          { name: 'Product B', value: 200 },
          { name: 'Product C', value: 150 },
        ]}
        height={400}
      />

      {/* Simple Pie Chart */}
      <PieChart
        data={[
          { name: 'Desktop', value: 1048 },
          { name: 'Mobile', value: 735 },
          { name: 'Tablet', value: 580 },
        ]}
        height={400}
      />
    </div>
  );
}
```

## Available Components

### Basic Charts

#### LineChart

Perfect for showing trends over time.

```tsx
<LineChart
  series={[
    {
      name: 'Revenue',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
    },
  ]}
  categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
/>
```

#### BarChart

Great for comparing values across categories.

```tsx
<BarChart
  data={[
    { name: 'Q1', value: 120 },
    { name: 'Q2', value: 200 },
    { name: 'Q3', value: 150 },
    { name: 'Q4', value: 300 },
  ]}
/>
```

#### PieChart

Ideal for showing parts of a whole.

```tsx
<PieChart
  data={[
    { name: 'Chrome', value: 1048 },
    { name: 'Firefox', value: 735 },
    { name: 'Safari', value: 580 },
    { name: 'Edge', value: 484 },
  ]}
/>
```

### Advanced Charts

#### TreeChart

Perfect for hierarchical data with rich text labels.

```tsx
<TreeChart
  data={{
    name: 'CEO',
    value: 100,
    children: [
      {
        name: 'CTO',
        value: 80,
        children: [
          { name: 'Frontend Team', value: 30 },
          { name: 'Backend Team', value: 50 },
        ],
      },
      {
        name: 'CMO',
        value: 70,
        children: [{ name: 'Marketing Team', value: 40 }],
      },
    ],
  }}
  layout="orthogonal"
  orient="LR"
/>
```

#### TreemapChart

Great for visualizing hierarchical data with size-based rectangles.

```tsx
<TreemapChart
  data={[
    {
      name: 'Technology',
      value: 500,
      children: [
        { name: 'Frontend', value: 200 },
        { name: 'Backend', value: 300 },
      ],
    },
    {
      name: 'Design',
      value: 300,
      children: [
        { name: 'UI/UX', value: 150 },
        { name: 'Graphics', value: 150 },
      ],
    },
  ]}
  type="squarify"
/>
```

#### GaugeChart

Perfect for showing progress or performance metrics.

```tsx
<GaugeChart
  data={[
    {
      name: 'Performance',
      value: 75,
    },
  ]}
  min={0}
  max={100}
  radius="75%"
/>
```

#### GraphChart

Excellent for network visualization with rich node information.

```tsx
<GraphChart
  nodes={[
    { id: '1', name: 'Node 1', value: 10, category: 0 },
    { id: '2', name: 'Node 2', value: 20, category: 1 },
    { id: '3', name: 'Node 3', value: 15, category: 0 },
  ]}
  links={[
    { source: '1', target: '2', value: 5 },
    { source: '2', target: '3', value: 3 },
  ]}
  categories={[{ name: 'Type A' }, { name: 'Type B' }]}
  layout="force"
/>
```

## Advanced Usage

### Custom Options

All components accept a custom `option` prop for advanced ECharts configuration:

```tsx
<LineChart
  option={{
    title: { text: 'Custom Chart' },
    grid: { left: '10%', right: '10%' },
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [
      {
        data: [120, 200, 150],
        type: 'line',
        smooth: true,
      },
    ],
  }}
/>
```

### Chart Events

Handle chart interactions with event callbacks:

```tsx
<BarChart
  data={data}
  onEvents={{
    click: (params) => console.log('Chart clicked:', params),
    mouseover: (params) => console.log('Mouse over:', params),
  }}
/>
```

### Chart Reference

Access the ECharts instance for advanced operations:

```tsx
import { useRef } from 'react';
import { LineChart, EChartsRef } from '@tryft/echarts';

function MyComponent() {
  const chartRef = useRef<EChartsRef>(null);

  const handleExport = () => {
    const instance = chartRef.current?.getEchartsInstance();
    if (instance) {
      const dataURL = instance.getDataURL({
        type: 'png',
        backgroundColor: '#fff',
      });
      // Use dataURL for export
    }
  };

  return <LineChart ref={chartRef} data={data} />;
}
```

## Development

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Local Development Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd tryft-echarts
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development mode:**

   ```bash
   npm run dev
   # This starts Vite dev server with hot reload
   ```

4. **View Storybook documentation:**
   ```bash
   npm run storybook
   # This opens interactive component documentation at http://localhost:6006
   ```

### Automated Workflows

This repository uses GitHub Actions for comprehensive automation:

- ✅ **Build Storybook** when main branch is updated
- ✅ **Deploy to GitHub Pages** for live documentation
- ✅ **Run Quality Checks** (TypeScript + ESLint + Security audits)
- ✅ **Automated Commit History** - Maintains `COMMITS.md` with readable commit logs
- ✅ **Provide Manual Triggers** for on-demand deployment

**Live Documentation:** [https://tryft.github.io/echarts/](https://tryft.github.io/echarts/)

#### Commit History Automation

The repository automatically maintains a human-readable commit history in `COMMITS.md`. Every time you push to the main branch, a GitHub Action:

- Extracts commit information (message, author, hash, timestamp)
- Updates `COMMITS.md` with the latest commit at the top
- Prevents infinite loops with smart filtering
- Provides quick access to recent changes without Git commands

**Example commit entry:**

```markdown
## 2024-12-05 14:30:25 UTC

**Commit:** `abc1234`
**Author:** John Doe
**Message:** feat: add new chart component

---
```

For detailed workflow documentation, see [WORKFLOWS.md](WORKFLOWS.md).

### Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start Storybook development
npm run storybook

# Build Storybook for deployment
npm run build-storybook

# Run type checking
npm run type-check

# Clean build artifacts
npm run clean
```

### Project Structure

```
src/
├── components/          # React chart components
│   ├── BaseEChart.tsx   # Base chart component
│   ├── LineChart.tsx    # Line chart component
│   ├── BarChart.tsx     # Bar chart component
│   ├── PieChart.tsx     # Pie chart component
│   ├── TreeChart.tsx    # Tree chart component
│   ├── TreemapChart.tsx # Treemap chart component
│   ├── GaugeChart.tsx   # Gauge chart component
│   ├── GraphChart.tsx   # Graph chart component
│   └── index.ts         # Component exports
├── hooks/               # React hooks
│   ├── useECharts.ts    # Main ECharts hook
│   └── index.ts         # Hook exports
├── types/               # TypeScript definitions
│   └── index.ts         # Type exports
├── stories/             # Storybook stories
│   └── *.stories.tsx    # Component stories
└── index.ts             # Main library export
```

### Adding New Components

1. **Create the component:**

   ```tsx
   // src/components/MyChart.tsx
   import { forwardRef, useMemo } from 'react';
   import { BaseEChart } from './BaseEChart';
   import type { MyChartProps, EChartsRef } from '../types';

   export const MyChart = forwardRef<EChartsRef, MyChartProps>(({ data, option: customOption, ...props }, ref) => {
     const option = useMemo(() => {
       // Generate ECharts option from props
       return customOption || generatedOption;
     }, [data, customOption]);

     return <BaseEChart ref={ref} option={option} {...props} />;
   });
   ```

2. **Add TypeScript types:**

   ```tsx
   // src/types/index.ts
   export interface MyChartProps extends BaseEChartsProps {
     data?: MyDataType[];
     // ... other props
   }
   ```

3. **Export the component:**

   ```tsx
   // src/components/index.ts
   export { MyChart } from './MyChart';
   ```

4. **Create Storybook story:**

   ```tsx
   // src/stories/MyChart.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { MyChart } from '../components/MyChart';

   const meta: Meta<typeof MyChart> = {
     title: 'Charts/MyChart',
     component: MyChart,
   };

   export default meta;
   ```

### Building for Production

```bash
# Build the library
npm run build

# Check built files
ls -la dist/
```

The build outputs:

- `dist/index.js` - ES modules build
- `dist/index.umd.cjs` - UMD build for browsers
- `dist/index.d.ts` - TypeScript declarations

### Testing

While no testing setup is included by default, you can add testing with:

```bash
# Add testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Add test script to package.json
"scripts": {
  "test": "vitest"
}
```

## API Reference

### Base Props (BaseEChartsProps)

All chart components inherit these props:

| Prop           | Type                          | Default  | Description                  |
| -------------- | ----------------------------- | -------- | ---------------------------- |
| `option`       | `EChartsOption`               | -        | Custom ECharts configuration |
| `width`        | `string \| number`            | `'auto'` | Chart width                  |
| `height`       | `string \| number`            | `400`    | Chart height                 |
| `theme`        | `string \| object`            | -        | ECharts theme                |
| `loading`      | `boolean`                     | -        | Loading state                |
| `onChartReady` | `(instance: ECharts) => void` | -        | Chart ready callback         |
| `onEvents`     | `Record<string, Function>`    | -        | Event handlers               |
| `style`        | `React.CSSProperties`         | -        | Container styles             |
| `className`    | `string`                      | -        | Container CSS class          |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on top of [Apache ECharts](https://echarts.apache.org/)
- Powered by [Vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/)
- Documentation with [Storybook](https://storybook.js.org/)
