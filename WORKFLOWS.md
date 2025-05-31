# GitHub Workflows

This document describes the automated GitHub Actions workflows configured for this repository.

## Overview

The repository uses GitHub Actions for continuous integration, security monitoring, and automated documentation maintenance. All workflows are located in `.github/workflows/` directory.

## Workflows

### 1. CI Workflow (`ci.yml`)

**Trigger:** Push to `main` or `develop` branches, Pull requests to `main` or `develop`

**Purpose:** Continuous Integration pipeline that ensures code quality, security, and build integrity.

#### Jobs:

**Test Job:**

- **Matrix Strategy:** Tests across Node.js versions 18.x, 20.x, 22.x
- **Steps:**
  - Install dependencies with `npm ci`
  - Run TypeScript type checking (`npm run type-check`)
  - Run ESLint linting (`npm run lint`)
  - Build the project (`npm run build`)
  - Build Storybook documentation (`npm run build-storybook`)

**Security Job:**

- **Environment:** Node.js 20.x
- **Steps:**
  - Run security audit (`npm audit --audit-level=moderate`)
  - Check for known vulnerabilities (`npx audit-ci --moderate`)

#### Benefits:

- Prevents broken code from being merged
- Ensures consistent code quality across Node.js versions
- Automatically catches security vulnerabilities
- Validates both library build and documentation build

---

### 2. Update Commits Log Workflow (`update-commits-log.yml`)

**Trigger:** Push to `main` branch

**Purpose:** Automatically maintains a human-readable commit history in `COMMITS.md` file.

#### Features:

**Infinite Loop Prevention:**

- Skips execution if commit is from `github-actions[bot]`
- Skips execution if commit message contains `[skip-commits-log]`

**Commit Information Extraction:**

- Commit message and author name
- Commit hash (short format)
- Commit timestamp in UTC

**File Management:**

- Creates `COMMITS.md` if it doesn't exist
- Prepends new entries to maintain chronological order (newest first)
- Preserves existing commit history

#### Output Format:

```markdown
## 2024-12-05 14:30:25 UTC

**Commit:** `abc1234`
**Author:** John Doe
**Message:** feat: add new chart component

---
```

#### Benefits:

- Quick access to commit history without Git commands
- Human-readable format for project documentation
- Automated maintenance with zero manual intervention
- Prevents accidental infinite loops

---

## Workflow Configuration Details

### Security Considerations

1. **Token Usage:** Uses `GITHUB_TOKEN` for repository access
2. **Permission Scope:** Limited to repository read/write operations
3. **Actor Validation:** Prevents unauthorized workflow triggers

### Performance Optimizations

1. **Conditional Execution:** Workflows only run when necessary
2. **Caching:** Node.js dependencies are cached across runs
3. **Matrix Strategy:** Parallel testing across multiple Node.js versions
4. **Fetch Depth:** Limited git history fetch for performance

### Error Handling

1. **Graceful Failures:** Non-critical steps won't break the workflow
2. **Status Checks:** Required for pull request merging
3. **Audit Levels:** Configurable security vulnerability thresholds

---

## Maintenance

### Adding New Workflows

1. Create `.yml` file in `.github/workflows/` directory
2. Follow existing naming conventions
3. Include appropriate triggers and conditions
4. Test in feature branch before merging to main
5. Update this documentation

### Modifying Existing Workflows

1. Test changes in feature branch
2. Ensure no breaking changes to required status checks
3. Update documentation if behavior changes
4. Consider backward compatibility

### Monitoring

- Check Actions tab in GitHub repository for workflow status
- Review failed workflows and address issues promptly
- Monitor security audit results for new vulnerabilities

---

## Related Files

- `.github/workflows/ci.yml` - Main CI/CD pipeline
- `.github/workflows/update-commits-log.yml` - Commit history automation
- `COMMITS.md` - Auto-generated commit history (created by workflow)
- `package.json` - Scripts used by workflows
- `.husky/pre-commit` - Local pre-commit hooks
