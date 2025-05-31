# Deployment Guide

## GitHub Pages Setup

This repository is configured to automatically deploy Storybook documentation to GitHub Pages whenever the `main` branch is updated.

### Prerequisites

1. **Enable GitHub Pages in Repository Settings:**

   - Go to your repository on GitHub
   - Navigate to `Settings` → `Pages`
   - Under "Source", select `GitHub Actions`
   - Save the settings

2. **Repository Permissions:**
   - Ensure the repository has `Actions` enabled
   - The workflow uses `GITHUB_TOKEN` with appropriate permissions (already configured)

### Automatic Deployment

The deployment happens automatically through GitHub Actions:

1. **Trigger:** Push to `main` branch or manual trigger
2. **Build Process:**
   - Install Node.js dependencies
   - Run TypeScript type checking
   - Run ESLint code linting
   - Build Storybook static files
3. **Deploy:** Upload to GitHub Pages

### Workflow Features

- **Quality Checks:** TypeScript and ESLint validation before deployment
- **Manual Trigger:** Can be run manually from Actions tab
- **Concurrent Protection:** Only one deployment at a time
- **Artifact Upload:** Builds are stored as artifacts for debugging

### Accessing Your Storybook

After successful deployment, your Storybook will be available at:

```
https://<username>.github.io/<repository-name>/
```

For example: `https://Tryft.github.io/tryft-echarts/`

### Local Testing

Test the build process locally before pushing:

```bash
# Install dependencies
npm install

# Run quality checks
npm run type-check
npm run lint

# Build Storybook
npm run build-storybook

# Preview locally (optional)
npx serve storybook-static
```

### Troubleshooting

#### Common Issues

1. **GitHub Pages not enabled:**

   - Check repository Settings → Pages → Source is set to "GitHub Actions"

2. **Workflow fails on type check:**

   - Run `npm run type-check` locally to fix TypeScript errors

3. **Workflow fails on lint:**

   - Run `npm run lint:fix` to auto-fix linting issues

4. **Build fails:**
   - Check that all dependencies are properly installed
   - Ensure all story files are valid

#### Viewing Workflow Logs

1. Go to the `Actions` tab in your GitHub repository
2. Click on the latest "Deploy Storybook to GitHub Pages" workflow
3. View logs for detailed error information

### Manual Deployment

You can also trigger deployment manually:

1. Go to `Actions` tab in GitHub
2. Select "Deploy Storybook to GitHub Pages"
3. Click "Run workflow"
4. Select the branch (usually `main`)
5. Click "Run workflow"

### Configuration

The workflow configuration is in `.github/workflows/deploy-storybook.yml`:

- **Node.js Version:** 18 (LTS)
- **Build Output:** `storybook-static/` directory
- **Quality Checks:** TypeScript + ESLint
- **Deployment:** GitHub Pages using official actions

### Security

- Uses GitHub's official actions (`actions/checkout@v4`, `actions/setup-node@v4`, etc.)
- Minimal required permissions (contents: read, pages: write, id-token: write)
- No external dependencies or custom tokens required
