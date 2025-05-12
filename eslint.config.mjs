// @ts-check
import {fixupPluginRules} from '@eslint/compat';
import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.{jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react/jsx-key': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-no-bind': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    plugins: {
      ['unused-imports']: fixupPluginRules(unusedImports),
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
        parserOptions: {
          parser: tsParser,
        },
      },
    },
    rules: {
      'no-async-promise-executor': 'off',
      'no-nested-ternary': 'off',
      'class-methods-use-this': 'off',
      'import/extensions': 'off',
      'default-case': 'off',
      'no-fallthrough': 'off',
      'object-shorthand': 'error',
      'newline-before-return': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        {
          allowDefaultCaseForExhaustiveSwitch: true,
          considerDefaultExhaustiveForUnions: true,
          requireDefaultForNonUnion: true,
        },
      ],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      'react/style-prop-object': 'off',
      camelcase: 'off',
      'no-console': 'warn',
      'react/static-property-placement': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-case-declarations': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'warn',
    },
  },
);
