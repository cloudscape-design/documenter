// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from 'vitest';
import { buildCustomProject } from '../components/test-helpers';
import schema from '../../src/schema';
import { DeclarationReflection, ReflectionKind } from 'typedoc';

describe('Build code from type', () => {
  const project = buildCustomProject('../../fixtures/hooks/tsconfig.json', 'fixtures/hooks/*');

  ['useContainerQuery', 'useResizeObserver', 'useStableEventHandler'].forEach(name =>
    test(`Snapshot: ${name}`, () => {
      const reflection = project.findReflectionByName(name);

      const code: any = { returnType: '', parameters: [] };
      if (reflection && reflection.kind === ReflectionKind.Function) {
        const signature = (reflection as DeclarationReflection).signatures?.[0];
        code.returnType = schema.code.buildType(signature?.type);
        code.parameters = signature?.parameters?.map(p => ({ name: p.name, type: schema.code.buildType(p.type) }));
      }

      expect(code).toMatchSnapshot();
    })
  );
});
