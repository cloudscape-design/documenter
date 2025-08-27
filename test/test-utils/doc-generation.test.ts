// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from 'vitest';
import { buildTestUtilsProject } from './test-helpers';

describe('Generate documentation', () => {
  test('For simple cases', () => {
    const results = buildTestUtilsProject('simple');

    expect(results.length).toBe(1);
    const classDoc = results[0];

    expect(classDoc.name).toBe('TestUtilWrapper');

    // There are more functions in the file, this assures that protected and private
    // methods are not included
    const methods = classDoc.methods;
    expect(methods.length).toBe(4);

    const noOpMethod = methods.find(method => method.name === 'noOp');
    expect(noOpMethod).toBeDefined();
    expect(noOpMethod?.returnType).toEqual({ name: 'void', isNullable: false });
    expect(noOpMethod?.parameters).toEqual([]);
    expect(noOpMethod?.description).toBeUndefined();
    expect(noOpMethod?.inheritedFrom).toBeUndefined();

    const findStringMethod = methods.find(method => method.name === 'findString');
    expect(findStringMethod).toBeDefined();
    expect(findStringMethod?.returnType).toEqual({ name: 'string', isNullable: false });
    expect(findStringMethod?.parameters).toEqual([]);
    expect(findStringMethod?.description).toBe(
      'Finds a string.\n\nThe function may look trivial but people have been losing their words\nsince centuries.'
    );
    expect(findStringMethod?.inheritedFrom).toBeUndefined();

    const setStringMethod = methods.find(method => method.name === 'setString');
    expect(setStringMethod).toBeDefined();
    expect(setStringMethod?.returnType).toEqual({ name: 'void', isNullable: false });
    expect(setStringMethod?.parameters).toMatchSnapshot();
    expect(setStringMethod?.description).toBe('Short Text');
    expect(setStringMethod?.inheritedFrom).toBeUndefined();

    const findObjectMethod = methods.find(method => method.name === 'findObject');
    expect(findObjectMethod).toBeDefined();
    expect(findObjectMethod?.returnType).toEqual({ name: 'TestReturnType', isNullable: false });
    expect(findObjectMethod?.parameters).toEqual([]);
    expect(findObjectMethod?.description).toBe('Short Text.\n\nLong Text.');
    expect(findObjectMethod?.inheritedFrom).toBeUndefined();
  });

  test('deal with more complex types', () => {
    const results = buildTestUtilsProject('advanced-types', { extraExports: ['default'] });

    expect(results.length).toBe(1);
    const classDoc = results[0];

    expect(classDoc.name).toBe('TestUtilWrapper');

    const methods = classDoc.methods;
    expect(methods.length).toBe(5);
    expect(methods).toMatchSnapshot();
  });

  test('and deal with inheritance', () => {
    const results = buildTestUtilsProject('inheritance');

    expect(results.length).toBe(1);
    const classDoc = results.find(classDoc => classDoc.name === 'TestUtilWrapper');

    expect(classDoc).toBeDefined();

    const methods = classDoc?.methods || [];
    expect(methods.length).toBe(2);

    const inheritedMethod = methods.find(method => method.name === 'inheritedMethod');
    expect(inheritedMethod).toBeDefined();
    expect(inheritedMethod?.inheritedFrom).toEqual({
      name: 'AbstractWrapper.inheritedMethod',
    });

    const childClassMethod = methods.find(method => method.name === 'childClassMethod');
    expect(childClassMethod).toBeDefined();
    expect(childClassMethod?.inheritedFrom).toBeUndefined();
  });

  test('deal with re-exports', () => {
    const results = buildTestUtilsProject('exports');
    expect(results.map(classDoc => classDoc.name)).toEqual([
      'AlertWrapper',
      'ButtonWrapper',
      'CardsWrapper',
      'CardWrapper',
      'DropdownWrapper',
    ]);
    const alertWrapper = results.find(classDoc => classDoc.name === 'AlertWrapper')!;
    expect(alertWrapper.methods.map(method => method.name)).toEqual(['findContent']);
    const buttonWrapper = results.find(classDoc => classDoc.name === 'ButtonWrapper')!;
    expect(buttonWrapper.methods.map(method => method.name)).toEqual(['findText']);
    const cardsWrapper = results.find(classDoc => classDoc.name === 'CardsWrapper')!;
    expect(cardsWrapper.methods.map(method => method.name)).toEqual(['findItems']);
    const cardItemWrapper = results.find(classDoc => classDoc.name === 'CardWrapper')!;
    expect(cardItemWrapper.methods.map(method => method.name)).toEqual(['findContent', 'findHeader']);
    const dropdownWrapper = results.find(classDoc => classDoc.name === 'DropdownWrapper')!;
    expect(dropdownWrapper.methods.map(method => method.name)).toEqual(['findItemGroup', 'findItems']);
  });

  test('default value rendering', () => {
    const results = buildTestUtilsProject('default-values');
    expect(results.length).toBe(1);

    const classDoc = results.find(classDoc => classDoc.name === 'DefaultValueWrapper');
    expect(classDoc).toBeDefined();

    expect(classDoc!.methods).toEqual([
      {
        name: 'getColumns',
        parameters: [
          {
            name: 'order',
            typeName: '"first" | "last"',
            flags: { isOptional: false },
            defaultValue: "'first'",
          },
        ],
        returnType: { name: 'void', isNullable: false },
      },
      {
        name: 'openDropdown',
        parameters: [
          {
            name: 'expandToViewport',
            typeName: 'boolean',
            flags: { isOptional: false },
            defaultValue: 'false',
          },
        ],
        returnType: { name: 'void', isNullable: false },
      },
      {
        name: 'selectOption',
        parameters: [
          {
            name: 'index',
            typeName: 'number',
            flags: { isOptional: false },
            defaultValue: '1',
          },
        ],
        returnType: { name: 'void', isNullable: false },
      },
    ]);
  });
});
