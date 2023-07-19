// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const path = require('path');
const fs = require('fs');
const { documentComponents, documentTestUtils } = require('../dist');

// Helper script to validate your changes against a local copy of the components package.

const COMPONENTS_PACKAGE_DIR = '../../components';
const TYPE = 'components';

let contents = null;
switch (TYPE) {
  case 'components':
    contents = documentComponents(
      path.join(__dirname, COMPONENTS_PACKAGE_DIR, 'tsconfig.json'),
      path.join(__dirname, COMPONENTS_PACKAGE_DIR, 'src/*/index.tsx'),
    );
    break;
  case 'test-utils-unit':
    contents = documentTestUtils(
      null,
      path.join(__dirname, COMPONENTS_PACKAGE_DIR, 'src/test-utils/dom/**/*.{ts,tsx}'),
    );
    break;
  case 'test-utils-integ':
    contents = documentTestUtils(
      null,
      path.join(__dirname, COMPONENTS_PACKAGE_DIR, 'src/test-utils/selectors/**/*.{ts,tsx}'),
    );
    break;
}
fs.writeFileSync('docs.json', JSON.stringify(contents, null, 2), 'utf-8');
