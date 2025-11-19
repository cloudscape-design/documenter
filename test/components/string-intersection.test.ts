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

test('should properly handle union types with string intersection for custom values', () => {
  const languageProp = codeEditor.properties.find(def => def.name === 'language');

  expect(languageProp?.name).toBe('language');
  expect(languageProp?.description).toBe('Specifies the programming language.');
  expect(languageProp?.optional).toBe(false);
  expect(languageProp?.type).toBe('string');

  // Check inline type structure
  expect(languageProp?.inlineType?.name).toBe('CodeEditorProps.Language');
  expect(languageProp?.inlineType?.type).toBe('union');
  if (languageProp?.inlineType?.type === 'union') {
    expect(languageProp.inlineType.valueDescriptions).toBeUndefined();
  }

  // The intersection type "string & { _?: undefined; }" should be converted to "string"
  // String literal values should appear without quotes
  const values = (languageProp?.inlineType as any)?.values;
  expect(values).toHaveLength(6);
  expect(values).toContain('javascript');
  expect(values).toContain('html');
  expect(values).toContain('ruby');
  expect(values).toContain('python');
  expect(values).toContain('java');
  expect(values).toContain('string'); // The intersection type becomes "string" to indicate custom values are allowed
});

test('should treat the union as primitive string type', () => {
  const languageProp = codeEditor.properties.find(def => def.name === 'language');

  // The type should be 'string' not the full union name
  expect(languageProp?.type).toBe('string');
});

test('should convert intersection helper to "string" in values array', () => {
  const languageProp = codeEditor.properties.find(def => def.name === 'language');

  // Should not contain the raw "string & { _?: undefined; }" syntax
  const hasRawIntersectionType =
    languageProp?.inlineType?.type === 'union' &&
    languageProp.inlineType.values.some((value: string) => value.includes('string &') || value.includes('_?:'));

  expect(hasRawIntersectionType).toBe(false);

  // But should contain "string" to indicate custom values are allowed
  const hasStringValue =
    languageProp?.inlineType?.type === 'union' && languageProp.inlineType.values.includes('string');

  expect(hasStringValue).toBe(true);
});

test('should detect intersection types with string & pattern', () => {
  const languageProp = codeEditor.properties.find(def => def.name === 'language');

  // Verify that the union contains both string literals and the intersection type
  expect(languageProp?.inlineType?.type).toBe('union');

  if (languageProp?.inlineType?.type === 'union') {
    const values = languageProp.inlineType.values;

    // Should have the literal values
    expect(values).toContain('javascript');
    expect(values).toContain('html');
    expect(values).toContain('ruby');
    expect(values).toContain('python');
    expect(values).toContain('java');

    // Should have 'string' representing the intersection type
    expect(values).toContain('string');

    // All values should be treated as string type (primitive detection)
    expect(languageProp.type).toBe('string');
  }
});

test('should recognize intersection type as string-compatible', () => {
  const languageProp = codeEditor.properties.find(def => def.name === 'language');

  // The union with intersection type should be recognized as primitive string
  expect(languageProp?.type).toBe('string');

  if (languageProp?.inlineType?.type === 'union') {
    // All values in the union should be compatible with string type
    const allValuesAreStrings = languageProp.inlineType.values.every((value: string) => typeof value === 'string');
    expect(allValuesAreStrings).toBe(true);
  }
});
