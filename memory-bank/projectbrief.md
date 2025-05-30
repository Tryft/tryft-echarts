# Project Brief: @tryft/echarts

## Project Overview

**tryft/echarts** is a React component library that provides a powerful wrapper on top of Apache ECharts, designed to make data visualization easy and developer-friendly.

## Core Requirements

### Primary Goals

- Create a React component library using Apache ECharts as the foundation
- Provide simple, prop-based API for common chart types
- Include rich text labels and detailed hover tooltips with mixed font styles, colors, and sizes
- Ensure full TypeScript support for type safety and developer experience
- Use Vite for fast development and optimized builds
- Include Storybook for interactive component documentation
- Make the library easy for developers to use and integrate

### Target Audience

- React developers who need data visualization components
- Teams looking for a type-safe charting solution
- Developers who want rich, interactive charts without complex configuration

### Success Criteria

- Easy installation via npm/yarn/pnpm
- Simple component API that abstracts ECharts complexity
- Rich visual components with detailed tooltips and formatting
- Comprehensive TypeScript support
- Clear documentation for both usage and local development
- Tree-shakable imports for optimal bundle size

## Scope Definition

### Included Features

- Basic chart components: Line, Bar, Pie
- Advanced chart components: Tree, Treemap, Gauge, Graph
- Rich text labels with multiple font styles and colors
- Detailed hover tooltips with structured information display
- TypeScript definitions for all components and props
- Event handling capabilities
- Custom ECharts option override support
- Chart reference access for advanced operations

### Technical Constraints

- Must be built on Apache ECharts
- Must use TypeScript for development
- Must use Vite as build tool
- Must include Storybook for documentation
- Must support tree shaking
- Must be easy to use for developers

### Out of Scope (Initial Release)

- Server-side rendering (SSR) optimization
- Built-in themes beyond basic styling
- Real-time data streaming capabilities
- Chart animations beyond ECharts defaults
- Mobile-specific optimizations
