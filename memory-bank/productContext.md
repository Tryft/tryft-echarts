# Product Context: @tryft/echarts

## Why This Project Exists

### Problem Statement

- Data visualization in React applications often requires complex setup and configuration
- Apache ECharts is powerful but has a steep learning curve for React developers
- Most React charting libraries lack rich text formatting and detailed tooltip capabilities
- TypeScript support in existing charting libraries is often incomplete or outdated
- Developers need a simple, prop-based API that abstracts away ECharts complexity

### Market Gap

- Existing React chart libraries either lack advanced features or are too complex to use
- Limited options for rich text labels with mixed font styles, colors, and sizes
- Few libraries provide comprehensive TypeScript support out of the box
- Documentation is often lacking for local development and contribution

## Problems It Solves

### For Developers

- **Complexity Reduction**: Abstracts ECharts configuration into simple React props
- **Type Safety**: Full TypeScript support with IntelliSense and compile-time checks
- **Rich Formatting**: Built-in support for multi-styled text labels and detailed tooltips
- **Developer Experience**: Easy installation, clear documentation, and intuitive API

### For Teams

- **Consistency**: Standardized chart components across applications
- **Maintainability**: Well-documented codebase with clear contribution guidelines
- **Performance**: Tree-shakable imports and optimized builds with Vite
- **Documentation**: Interactive Storybook documentation for design systems

## How It Should Work

### User Experience Goals

#### For End Users (Developers Using the Library)

1. **Simple Installation**: Single npm install command
2. **Intuitive API**: Props that make sense and follow React conventions
3. **Rich Visuals**: Charts that look professional with minimal configuration
4. **Interactive Elements**: Hover tooltips with detailed, well-formatted information
5. **TypeScript First**: Full type support with helpful error messages

#### Example Usage Pattern

```tsx
// Simple case - just pass data
<LineChart data={salesData} />

// Advanced case - with rich formatting
<TreeChart
  data={orgData}
  layout="orthogonal"
  orient="LR"
/>

// Custom case - full ECharts control
<BarChart option={customEChartsConfig} />
```

### Core User Journeys

#### Journey 1: Quick Setup

1. Developer installs library
2. Imports desired chart component
3. Passes data props
4. Gets professional-looking chart immediately

#### Journey 2: Customization

1. Developer starts with basic chart
2. Explores props for customization
3. Uses TypeScript IntelliSense for guidance
4. Achieves desired appearance

#### Journey 3: Advanced Usage

1. Developer needs complex chart
2. Uses custom option prop for full ECharts access
3. Still benefits from React wrapper and TypeScript types
4. Maintains component-based architecture

## User Experience Principles

### Simplicity First

- Default configurations should produce beautiful charts
- Complex features should be opt-in, not required
- API should feel natural to React developers

### Progressive Disclosure

- Basic usage should be trivial
- Advanced features should be discoverable
- Expert-level customization should be possible

### Visual Excellence

- Rich text labels with proper typography
- Detailed tooltips with structured information
- Professional color schemes and styling
- Responsive and interactive by default

### Developer Delight

- Clear error messages with helpful suggestions
- Comprehensive TypeScript support
- Excellent documentation with live examples
- Easy local development setup
