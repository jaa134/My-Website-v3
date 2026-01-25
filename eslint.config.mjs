import eslintJS from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import vuePlugin from 'eslint-plugin-vue'

export default defineConfig([
  globalIgnores([
    'node_modules',
    'dist',
    '*.config.*{js,ts}',
  ]),

  eslintJS.configs.recommended,

  {
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side-effect imports.
            ['^\\u0000'],

            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ['^@?\\w'],

            // Internal modules.
            ['^@/common/types(/|\\.|$)'],
            ['^@/common/utilities(/|\\.|$)'],
            ['^@/common/router(/|\\.|$)'],
            ['^@/common/desktop(/|\\.|$)'],
            ['^@/common/mobile(/|\\.|$)'],

            // Absolute imports and other imports such as `@/foo`.
            // Anything not matched in another group.
            ['^'],

            // Relative (parent) imports.
            ['^\\.\\.'],

            // Relative (sibling) imports.
            ['^\\.'],
          ],
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  ...vuePlugin.configs['flat/recommended-error'],

  prettier,
])
