// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';
import { ComponentDefinition } from '../../src';
import process from 'node:process';
const cwd = process.cwd();

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

  const resultAfter = buildProject('third-party-import-types', [
    `${cwd}/fixtures/components/third-party-import-types/node_modules/icon/interfaces.d.ts`,
  ]);
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
