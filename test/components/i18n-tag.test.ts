// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('i18n-tag');
  expect(result).toHaveLength(1);

  component = result[0];
});

test.only('should have correct region and properties definitions', () => {
  expect(component.properties).toEqual([
    {
      defaultValue: undefined,
      deprecatedTag: undefined,
      i18nTag: undefined,
      description: 'Adds the specified classes to the root element of the component.',
      inlineType: undefined,
      name: 'className',
      optional: true,
      type: 'string',
      visualRefreshTag: undefined,
    },
    {
      defaultValue: undefined,
      deprecatedTag: undefined,
      description: 'Header',
      i18nTag: '',
      inlineType: undefined,
      name: 'header',
      optional: true,
      type: 'string',
      visualRefreshTag: undefined,
    },
  ]);
  expect(component.regions).toEqual([
    {
      i18nTag: 'Special instructions',
      description: 'Main content',
      displayName: 'content',
      isDefault: true,
      name: 'children',
      visualRefreshTag: undefined,
    },
  ]);
});
