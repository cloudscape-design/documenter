// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverage: process.env.CI === 'true',
  globals: {
    'ts-jest': {
      tsconfig: 'test/tsconfig.json',
    },
  },
};
