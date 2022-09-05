// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

test.each([
  ['Function', 'Table'],
  ['Interface', 'Table'],
  ['Namespace', 'Table'],
])('table definition %s.%s to match snapshot', (kind, name) => {
  const definition = require(path.join(process.cwd(), 'docs', 'components', kind, name));
  expect(definition).toMatchSnapshot();
});
