// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import ts from 'typescript';
import { test, expect } from 'vitest';
import { printFlags } from '../../lib/components/type-utils';

test('serialises node flags', () => {
  expect(
    printFlags(
      ts.NodeFlags.HasAsyncFunctions + ts.NodeFlags.HasImplicitReturn + ts.NodeFlags.ContainsThis,
      ts.NodeFlags
    )
  ).toEqual('ContainsThis | HasImplicitReturn | ReachabilityCheckFlags | HasAsyncFunctions | ReachabilityAndEmitFlags');
});

test('serialises type flags', () => {
  expect(printFlags(ts.TypeFlags.Number + ts.TypeFlags.Enum, ts.TypeFlags)).toEqual(
    'Number | Enum | NumberLike | EnumLike | PossiblyFalsy | Primitive | NotPrimitiveUnion | Singleton | Intrinsic | IncludesMask | DisjointDomains | DefinitelyNonNullable | Narrowable'
  );
});
