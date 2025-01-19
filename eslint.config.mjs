import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { config, configs } from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default config(
  eslint.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ),
  ...configs.recommended,
  {
    ignores: [
      '**/**/node_modules',
      '**/**/.next',
      '**/**/public',
      'components/ui',
      'env.js',
    ],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
);
