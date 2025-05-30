# Tech Context: @tryft/echarts

## Technology Stack

### Core Technologies

#### Frontend Framework

- **React 18+**: Modern React with hooks, forwardRef, and concurrent features
- **TypeScript 5+**: Full type safety with strict configuration
- **Apache ECharts**: Powerful charting library as the foundation

#### Build & Development Tools

- **Vite**: Fast development server and optimized production builds
- **Storybook**: Interactive component documentation and development
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Code formatting (via editor integration)

#### Package Manager & Distribution

- **npm**: Package management and publishing
- **ES Modules**: Modern module system for tree shaking
- **UMD**: Browser compatibility build
- **TypeScript Declarations**: Full type definitions for consumers

## Development Setup

### Prerequisites

```bash
Node.js 18+
npm 9+
Git
```

### Installation Process

```bash
# Clone repository
git clone <repository-url>
cd tryft-echarts

# Install dependencies
npm install

# Verify setup
npm run build
npm run type-check
```

### Development Commands

```bash
# Development server (Vite)
npm run dev

# Interactive documentation
npm run storybook

# Production build
npm run build

# Type checking
npm run type-check

# Build Storybook
npm run build-storybook
```

## Technical Constraints

### Browser Support

- Modern browsers supporting ES2020+
- React 18+ compatibility required
- No IE11 support (modern baseline)

### Bundle Size Considerations

- Tree shaking enabled for all exports
- Individual component imports supported
- ECharts peer dependency to avoid duplication
- Target: <50KB gzipped for full library

### Performance Requirements

- Chart rendering: <100ms for typical datasets
- Re-render optimization through memoization
- Memory efficient chart instance management
- Responsive charts that adapt to container changes

### TypeScript Constraints

- Strict mode enabled
- No `any` types in public APIs
- Comprehensive interface coverage
- Generic support for extensibility

## Dependencies Architecture

### Core Dependencies

```json
{
	"react": "^18.0.0",
	"echarts": "^5.4.0"
}
```

### Development Dependencies

```json
{
	"typescript": "^5.0.0",
	"vite": "^5.0.0",
	"@storybook/react": "^7.0.0",
	"eslint": "^8.0.0"
}
```

### Peer Dependencies Strategy

- **React**: Peer dependency to avoid version conflicts
- **ECharts**: Peer dependency for bundle size optimization
- **TypeScript**: Optional peer for development experience

## Tool Usage Patterns

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
	build: {
		lib: {
			entry: 'src/index.ts',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'echarts'],
			output: {
				globals: {
					'react': 'React',
					'react-dom': 'ReactDOM',
					'echarts': 'echarts',
				},
			},
		},
	},
});
```

### TypeScript Configuration

```json
{
	"compilerOptions": {
		"strict": true,
		"target": "ES2020",
		"lib": ["ES2020", "DOM"],
		"module": "ESNext",
		"moduleResolution": "node",
		"jsx": "react-jsx",
		"declaration": true,
		"declarationMap": true,
		"sourceMap": true
	}
}
```

### Storybook Integration

- Component-driven development
- Interactive props testing
- Documentation generation
- Visual regression testing capability

## Development Patterns

### File Organization

```
src/
├── components/          # React components
│   ├── BaseEChart.tsx   # Core wrapper
│   ├── [Chart].tsx      # Specific charts
│   └── index.ts         # Barrel exports
├── hooks/               # React hooks
│   ├── useECharts.ts    # Main hook
│   └── index.ts         # Hook exports
├── types/               # TypeScript definitions
│   └── index.ts         # Type exports
├── stories/             # Storybook stories
│   └── *.stories.tsx    # Component stories
└── index.ts             # Main entry point
```

### Import/Export Strategy

```typescript
// Barrel exports for clean imports
export { LineChart, BarChart } from './components';
export type { LineChartProps } from './types';

// Named exports preferred over default
export const LineChart = forwardRef<...>(...);

// Re-export echarts for convenience
import * as echarts from 'echarts';
export { echarts };
```

### Code Quality Standards

- **ESLint**: React hooks rules, TypeScript rules
- **Prettier**: Via editor integration (no separate tool)
- **TypeScript**: Strict mode, no implicit any
- **Git Hooks**: Type checking on commit (when configured)

## Build Process

### Development Build

- Vite dev server with HMR
- Source maps for debugging
- Fast refresh for React components
- TypeScript compilation checking

### Production Build

```bash
# Generates:
dist/
├── index.esm.js      # ES modules
├── index.umd.js      # UMD for browsers
├── index.d.ts        # TypeScript declarations
└── index.d.ts.map    # Declaration maps
```

### Storybook Build

- Static site generation
- Component documentation
- Interactive examples
- Deployable to any static host

## Environment Considerations

### Development Environment

- Node.js 18+ for modern features
- VS Code recommended with extensions:
  - TypeScript
  - React
  - ESLint
  - Prettier

### CI/CD Considerations

- Type checking in pipeline
- Build verification
- Storybook deployment
- npm publishing automation

### Publishing Workflow

```bash
# Version bump
npm version patch|minor|major

# Build and verify
npm run build
npm run type-check

# Publish to npm
npm publish
```

## Integration Points

### Consumer Integration

```typescript
// Simple import
import { LineChart } from '@tryft/echarts';

// TypeScript support
import type { LineChartProps } from '@tryft/echarts';

// ECharts access if needed
import { echarts } from '@tryft/echarts';
```

### Framework Compatibility

- Next.js: SSR considerations (client-side rendering)
- Create React App: Direct compatibility
- Vite Projects: Optimized integration
- Webpack: Module federation support

## Troubleshooting Patterns

### Common Issues

1. **ECharts not found**: Check peer dependency installation
2. **TypeScript errors**: Verify version compatibility
3. **Build failures**: Check Node.js version
4. **Storybook issues**: Clear cache and restart

### Debug Strategies

- Browser dev tools for chart inspection
- React dev tools for component debugging
- TypeScript compiler for type issues
- Vite debug mode for build problems
