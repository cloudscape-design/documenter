// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import headerPlugin from 'eslint-plugin-header';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import path from 'node:path';
import tsEslint from 'typescript-eslint';

// https://github.com/Stuk/eslint-plugin-header/issues/57
headerPlugin.rules.header.meta.schema = false;

export default tsEslint.config(
  includeIgnoreFile(path.resolve('.gitignore')),
  {
    settings: {
      react: { version: 'detect' },
    },
  },
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  eslintPrettier,
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      unicorn: unicornPlugin,
      header: headerPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'header/header': [
        'error',
        'line',
        [' Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.', ' SPDX-License-Identifier: Apache-2.0'],
      ],
      'no-warning-comments': 'warn',
      'react/display-name': 'off',
    },
  },
);
