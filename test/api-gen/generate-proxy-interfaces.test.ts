// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, test, vi } from 'vitest';

import { generateFixture, generateFixtures, sourceOf } from './test-helpers';

describe('upstream resolution', () => {
  test('resolves upstream component with no external imports', () => {
    const files = generateFixture('valid/box', 'empty');
    expect(files.map(file => file.path)).toEqual(['box/interfaces.ts']);
  });

  test('resolves upstream component that imports from another component and from shared types', () => {
    const files = generateFixture('valid/button', 'empty');
    expect(files.map(file => file.path)).toEqual([
      'button/interfaces.ts',
      'icon/interfaces.ts',
      'types/base-component.ts',
      'types/events.ts',
    ]);
  });

  test('throws when patch contains no module augmentation statement', () => {
    expect(() => generateFixture('error/demo', 'no-augmentation')).toThrow(
      'error/demo/no-augmentation.patch.d.ts: The patch must contain ' + 'a `declare module "..."` augmentation.',
    );
  });

  test('throws when declared module is not found', () => {
    expect(() => generateFixture('error/demo', 'no-upstream')).toThrow('Cannot resolve package "@fixtures/unresolved"');
  });

  test('throws when declared module has no interfaces.d.ts', () => {
    expect(() => generateFixture('error/demo', 'no-upstream-dts')).toThrow(
      'fixtures/api-gen/node_modules/@fixtures/upstream/internal/interfaces.d.ts',
    );
  });
});

describe('patch validation', () => {
  test('throws when the patch names an interface the upstream module does not export', () => {
    expect(() => generateFixture('error/button', 'no-upstream-interface')).toThrow(
      'Interface "ButtonPropz" does not exist in "@fixtures/upstream/button".',
    );
  });

  test('throws when the patch names a namespace the upstream module does not declare', () => {
    expect(() => generateFixture('error/button', 'no-upstream-namespace')).toThrow(
      'Namespace "ButtonPropz" does not exist in "@fixtures/upstream/button".',
    );
  });

  test('throws when a removal names an interface property the upstream module does not declare', () => {
    expect(() => generateFixture('error/button', 'remove-missing-property')).toThrow(
      'Property "ButtonProps.altText" cannot be removed (it does not exist).',
    );
  });

  test('throws when a removal names a namespace member the upstream module does not declare', () => {
    expect(() => generateFixture('error/button', 'remove-missing-member')).toThrow(
      'Member "ButtonProps.AltText" cannot be removed (it does not exist).',
    );
  });

  test('throws when a patch declares an enum in a namespace', () => {
    expect(() => generateFixture('error/button', 'add-ns-enum')).toThrow(
      'A namespace patch may declare only type aliases and interfaces; "ButtonProps.Severity" is neither.',
    );
  });

  test('throws when a patch declares a value in a namespace', () => {
    expect(() => generateFixture('error/button', 'add-ns-value')).toThrow(
      'A namespace patch may declare only type aliases and interfaces; "ButtonProps.VariableStatement" is neither.',
    );
  });

  test('throws when a patch declares a nested namespace', () => {
    expect(() => generateFixture('error/button', 'add-ns-ns')).toThrow(
      'A namespace patch may declare only type aliases and interfaces; "ButtonProps.IconProps" is neither.',
    );
  });
});

describe('removals', () => {
  test('removes an interface property', () => {
    const source = sourceOf(generateFixture('valid/button', 'remove-property'), 'button/interfaces.ts');
    expect(source).toMatchSnapshot();
  });

  test('removes an interface property and a namespace member', () => {
    const source = sourceOf(generateFixture('valid/button', 'remove-member'), 'button/interfaces.ts');
    expect(source).toMatchSnapshot();
  });

  test('removes both the interface and the namespace that use the same name', () => {
    const source = sourceOf(generateFixture('valid/box', 'remove-nested-ns'), 'box/interfaces.ts');
    expect(source).toMatchSnapshot();
  });

  test('recognizes the marker imported under an alias and through a namespace import', () => {
    const source = sourceOf(generateFixture('valid/button', 'marker-imports'), 'button/interfaces.ts');
    expect(source).toMatchSnapshot();
  });
});

describe('additions and overrides', () => {
  test('adds new properties and namespace members', () => {
    const source = sourceOf(generateFixture('valid/button', 'add-props'), 'button/interfaces.ts');
    expect(source).toMatchSnapshot();
  });

  test('overrides properties and namespace members of multi-interface upstream component', () => {
    const source = sourceOf(generateFixture('valid/checkbox', 'override-props'), 'checkbox/interfaces.ts');
    expect(source).toMatchSnapshot();
  });

  test('overrides the interface and drops the namespace that uses the same name', () => {
    const source = sourceOf(generateFixture('valid/box', 'override-nested-ns'), 'box/interfaces.ts');
    expect(source).toMatchSnapshot();
  });
});

describe('carried imports', () => {
  test('carries the imports the patch declares, leaving out the marker module', () => {
    const source = sourceOf(generateFixture('valid/button', 'carry-imports'), 'button/interfaces.ts');
    expect(source).toMatchSnapshot();
  });

  test('does not offer carried imports to resolveImport, nor follow them as dependencies', () => {
    const resolveImport = vi.fn();
    const files = generateFixture('valid/box', 'carry-imports', { resolveImport });
    expect(files).toHaveLength(1);
    expect(resolveImport).not.toHaveBeenCalled();
    expect(sourceOf(files, 'box/interfaces.ts')).toContain("from '@fixtures/upstream/icon'");
  });
});

describe('resolved imports', () => {
  test('offers every relative import that resolves, with the file holding it and the file it reaches', () => {
    const offered: Array<[string, string, string]> = [];
    generateFixture('valid/button', 'empty', {
      resolveImport: ({ sourcePath, importSpecifier, resolvedPath }) => {
        offered.push([sourcePath, importSpecifier, resolvedPath.replace(/.*node_modules\//, '')]);
        return {};
      },
    });
    expect(offered).toEqual([
      ['button/interfaces.ts', '../types/base-component', '@fixtures/upstream/types/base-component.d.ts'],
      ['button/interfaces.ts', '../types/events.js', '@fixtures/upstream/types/events.d.ts'],
      ['button/interfaces.ts', '../icon/interfaces.js', '@fixtures/upstream/icon/interfaces.d.ts'],
      ['icon/interfaces.ts', '../types/base-component', '@fixtures/upstream/types/base-component.d.ts'],
    ]);
  });

  test('writes the specifier resolveImport returns into the emitted source', () => {
    const source = sourceOf(
      generateFixture('valid/button', 'empty', {
        resolveImport: ({ importSpecifier }) =>
          importSpecifier === '../icon/interfaces.js' ? { importSpecifier: '@fixtures/upstream/icon' } : {},
      }),
      'button/interfaces.ts',
    );
    expect(source).toContain("from '@fixtures/upstream/icon'");
    expect(source).not.toContain("from '../icon/interfaces.js'");
  });

  test('keeps a specifier unchanged when resolveImport returns no override', () => {
    const source = sourceOf(
      generateFixture('valid/button', 'empty', { resolveImport: () => ({}) }),
      'button/interfaces.ts',
    );
    expect(source).toContain("from '../icon/interfaces.js'");
  });

  test('emits the same tree whether or not specifiers are rewritten', () => {
    const rewritten = generateFixture('valid/button', 'empty', {
      resolveImport: ({ importSpecifier }) => ({ importSpecifier: importSpecifier.replace('types', 'shared') }),
    });
    expect(rewritten.map(file => file.path)).toEqual(generateFixture('valid/button', 'empty').map(file => file.path));
  });
});

describe('emitted tree', () => {
  test('emits a dependency once when several patches reach it', () => {
    const files = generateFixtures([
      ['valid/button', 'empty'],
      ['valid/checkbox', 'override-props'],
    ]);

    expect(files.map(file => file.path)).toEqual([
      'button/interfaces.ts',
      'checkbox/interfaces.ts',
      'icon/interfaces.ts',
      'types/base-component.ts',
      'types/events.ts',
    ]);
  });

  test('proxies one upstream component at every place the consumer gives it', () => {
    const files = generateFixtures([['valid/button', 'remove-property'], ['valid/button-alpha']]);

    expect(files.map(file => file.path)).toContain('button/interfaces.ts');
    expect(sourceOf(files, 'button/interfaces.ts')).toContain('children?: React.ReactNode;');

    expect(files.map(file => file.path)).toContain('button-alpha/interfaces.ts');
    expect(sourceOf(files, 'button-alpha/interfaces.ts')).not.toContain('children');
  });

  test('throws when two patches claim one place in the proxy tree', () => {
    expect(() =>
      generateFixtures([
        ['valid/button', 'empty'],
        ['valid/button', 'remove-property'],
      ]),
    ).toThrow('Two declarations claim the place "button/interfaces.ts" in the proxy tree.');
  });

  test('throws when a patch is named after a component the proxied one reaches', () => {
    expect(() => generateFixture('error/icon', 'place-taken-by-upstream')).toThrow(
      'Two declarations claim the place "icon/interfaces.ts" in the proxy tree.',
    );
  });
});
