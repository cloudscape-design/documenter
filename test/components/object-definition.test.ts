// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let codeEditor: ComponentDefinition;

beforeAll(() => {
  const result = buildProject('string-intersection');
  expect(result).toHaveLength(1);
  [codeEditor] = result;
});

test('string intersection union should be treated as primitive string type', () => {
  const languageProp = codeEditor.properties.find(def => def.name === 'language');

  // The new getPrimitiveType function should identify this as a string type
  expect(languageProp?.type).toBe('string');
});

test('string intersection values should include "string" for custom values', () => {
  const languageProp = codeEditor.properties.find(def => def.name === 'language');

  if (languageProp?.inlineType?.type === 'union') {
    // Should contain literal values
    expect(languageProp.inlineType.values).toContain('javascript');
    expect(languageProp.inlineType.values).toContain('html');

    // Should contain "string" to indicate custom values are allowed
    expect(languageProp.inlineType.values).toContain('string');

    // Should not contain raw intersection syntax
    const hasRawIntersection = languageProp.inlineType.values.some(
      (value: string) => value.includes('string &') || value.includes('_?:')
    );
    expect(hasRawIntersection).toBe(false);
  }
});

test('union type name should be preserved in inlineType', () => {
  const languageProp = codeEditor.properties.find(def => def.name === 'language');

  expect(languageProp?.inlineType?.name).toBe('CodeEditorProps.Language');
  expect(languageProp?.inlineType?.type).toBe('union');
});
