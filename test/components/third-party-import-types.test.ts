// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';

test('should resolve object type coming from node_modules', () => {
  const resultAfter = buildProject('third-party-import-types');
  const buttonAfter = resultAfter.find(component => component.name === 'Button')!;

  expect(buttonAfter.properties).toEqual([
    {
      name: 'iconName',
      type: 'IconProps.Name',
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
