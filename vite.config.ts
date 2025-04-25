// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 15000,
    coverage: {
      enabled: process.env.CI === 'true',
      provider: 'v8',
      include: ['src/**', 'lib/**'],
    },
  },
});
