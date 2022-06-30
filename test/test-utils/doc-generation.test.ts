// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildTestUtilsProject } from '../components/test-helpers';

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
    expect(noOpMethod?.returnType).toEqual({ name: 'void', type: 'intrinsic' });
    expect(noOpMethod?.parameters).toEqual([]);
    expect(noOpMethod?.description).toBeUndefined();
    expect(noOpMethod?.inheritedFrom).toBeUndefined();

    const findStringMethod = methods.find(method => method.name === 'findString');
    expect(findStringMethod).toBeDefined;
    expect(findStringMethod?.returnType).toEqual({ name: 'string', type: 'intrinsic' });
    expect(findStringMethod?.parameters).toEqual([]);
    expect(findStringMethod?.description).toBe(
      'Finds a string.\nThe function may look trivial but people have been losing their words\nsince centuries.\n'
    );
    expect(findStringMethod?.inheritedFrom).toBeUndefined();

    const setStringMethod = methods.find(method => method.name === 'setString');
    expect(setStringMethod).toBeDefined;
    expect(setStringMethod?.returnType).toEqual({ name: 'void', type: 'intrinsic' });
    expect(setStringMethod?.parameters).toMatchSnapshot();
    expect(setStringMethod?.description).toBe('Short Text');
    expect(setStringMethod?.inheritedFrom).toBeUndefined();

    const findObjectMethod = methods.find(method => method.name === 'findObject');
    expect(findObjectMethod).toBeDefined;
    expect(findObjectMethod?.returnType).toEqual({ name: 'TestReturnType', type: 'reference' });
    expect(findObjectMethod?.parameters).toEqual([]);
    expect(findObjectMethod?.description).toBe('Short Text.\nLong Text.\n');
    expect(findObjectMethod?.inheritedFrom).toBeUndefined();
  });

  // TODO: Testing here could me more exhaustive, but we do testing for types in different tests already.
  // Try to reuse existing type extraction utils in another step. Adjust testing accordingly.
  test('deal with more complex types', () => {
    const results = buildTestUtilsProject('advanced-types');

    expect(results.length).toBe(1);
    const classDoc = results[0];

    expect(classDoc.name).toBe('TestUtilWrapper');

    const methods = classDoc.methods;
    expect(methods.length).toBe(2);

    const findAllMethod = methods.find(method => method.name === 'findAll');
    expect(findAllMethod).toBeDefined;
    expect(findAllMethod?.returnType).toEqual({
      name: 'Array',
      type: 'reference',
      typeArguments: [
        {
          type: 'reference',
          name: 'HTMLElement',
        },
      ],
    });
    expect(findAllMethod?.parameters).toEqual([]);
    expect(findAllMethod?.description).toBeUndefined();
    expect(findAllMethod?.inheritedFrom).toBeUndefined();

    const setAllMethod = methods.find(method => method.name === 'setAll');
    expect(setAllMethod).toBeDefined;
    expect(setAllMethod?.returnType).toEqual({
      name: 'void',
      type: 'intrinsic',
    });
    expect(setAllMethod?.parameters).toMatchSnapshot();
    expect(setAllMethod?.description).toBeUndefined();
    expect(setAllMethod?.inheritedFrom).toBeUndefined();
  });

  test('and deal with inheritance', () => {
    const results = buildTestUtilsProject('inheritance');

    expect(results.length).toBe(2);
    const classDoc = results.find(classDoc => classDoc.name === 'TestUtilWrapper');

    expect(classDoc).toBeDefined();

    const methods = classDoc?.methods || [];
    expect(methods.length).toBe(2);

    const inheritedMethod = methods.find(method => method.name === 'inheritedMethod');
    expect(inheritedMethod).toBeDefined;
    expect(inheritedMethod?.inheritedFrom).toEqual({
      name: 'AbstractWrapper.inheritedMethod',
    });

    const childClassMethod = methods.find(method => method.name === 'childClassMethod');
    expect(childClassMethod).toBeDefined;
    expect(childClassMethod?.inheritedFrom).toBeUndefined();
  });
});
