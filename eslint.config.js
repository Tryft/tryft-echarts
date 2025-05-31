import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
	// Ignore patterns (equivalent to ignorePatterns)
	{
		ignores: ['dist/**', '.eslintrc.cjs'],
	},

	// Main configuration
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
				// Add React as global for JSX
				React: 'readonly',
			},
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			// ESLint recommended rules
			...js.configs.recommended.rules,

			// TypeScript ESLint recommended rules
			...tseslint.configs.recommended.rules,

			// React hooks recommended rules
			...reactHooks.configs.recommended.rules,

			// Custom rules
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

			// Allow any types in specific contexts (less strict for development)
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
];
