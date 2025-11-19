// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import ts from 'typescript';
import { test, expect } from 'vitest';
import { printFlags } from '../../lib/shared/type-utils';

test('serialises node flags', () => {
  const flags = printFlags(
    ts.NodeFlags.HasAsyncFunctions + ts.NodeFlags.HasImplicitReturn + ts.NodeFlags.ContainsThis,
    ts.NodeFlags,
  );
  expect(flags).toContain('HasAsyncFunctions');
  expect(flags).toContain('HasImplicitReturn');
  expect(flags).toContain('ContainsThis');
});

test('serialises type flags', () => {
  const flags = printFlags(ts.TypeFlags.Number + ts.TypeFlags.Enum, ts.TypeFlags);
  expect(flags).toContain('Number');
  expect(flags).toContain('Enum');
});
