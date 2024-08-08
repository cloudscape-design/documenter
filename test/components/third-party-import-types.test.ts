// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';
import { ComponentDefinition } from '../../src';
import * as bootstrap from '../../src/bootstrap';
import process from 'node:process';
const cwd = process.cwd();
const nodeModulesPath = `${cwd}/fixtures/components/third-party-import-types/node_modules_mock/icon/interfaces.d.ts`;

test('should resolve object type to string', () => {
  const resultBefore = buildProject('third-party-import-types');
  const buttonBefore: ComponentDefinition | undefined = resultBefore.find(component => component.name === 'Button');

  expect(buttonBefore?.properties).toEqual([
    {
      name: 'iconName',
      type: 'IconProps.Name',
      inlineType: undefined,
      optional: false,
      description: 'This is icon name',
      defaultValue: undefined,
      visualRefreshTag: undefined,
      deprecatedTag: undefined,
      i18nTag: undefined,
      analyticsTag: undefined,
    },
  ]);

  const resultAfter = buildProject('third-party-import-types', [nodeModulesPath]);
  const buttonAfter: ComponentDefinition | undefined = resultAfter.find(component => component.name === 'Button');

  expect(buttonAfter?.properties).toEqual([
    {
      name: 'iconName',
      type: 'string',
      inlineType: { name: 'IconProps.Name', type: 'union', values: ['icon1', 'icon2', 'icon3'] },
      optional: false,
      description: 'This is icon name',
      defaultValue: undefined,
      visualRefreshTag: undefined,
      deprecatedTag: undefined,
      i18nTag: undefined,
      analyticsTag: undefined,
    },
  ]);
});

test('passing nodeModulesDependencyFilePaths should enable includeDeclarations and excludeExternals', () => {
  const bootstrapProjectSpy = jest.spyOn(bootstrap, 'bootstrapProject');
  buildProject('third-party-import-types', [nodeModulesPath]);

  expect(bootstrapProjectSpy.mock.calls[0][0].includeDeclarations).toBe(true);
  expect(bootstrapProjectSpy.mock.calls[0][0].excludeExternals).toBe(true);

  jest.restoreAllMocks();
});
