// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let buttonGroup: ComponentDefinition;
let sideNavigation: ComponentDefinition;
let columnLayout: ComponentDefinition;
let table: ComponentDefinition;

beforeAll(() => {
  const result = buildProject('complex-types');
  expect(result).toHaveLength(4);

  [buttonGroup, columnLayout, sideNavigation, table] = result;
});

test('should only have expected properties, regions and events', () => {
  expect(table.properties.map(prop => prop.name)).toEqual(['ariaLabels', 'columns', 'filteringFn', 'items', 'trackBy']);
  expect(table.events.map(prop => prop.name)).toEqual(['onWidthChange']);
  expect(table.regions.map(prop => prop.name)).toEqual(['header']);
});

test('should have correct region definition', () => {
  const header = table.regions[0];
  expect(header).toEqual({
    name: 'header',
    displayName: undefined,
    isDefault: false,
    description: undefined,
  });
});

test('should have correct property types', () => {
  expect(table.properties).toEqual([
    {
      name: 'ariaLabels',
      type: 'TableProps.AriaLabels<T>',
      optional: true,
      defaultValue: undefined,
      description: undefined,
      inlineType: {
        name: 'TableProps.AriaLabels<T>',
        type: 'object',
        properties: [
          {
            name: 'allItemsSelectionLabel',
            optional: true,
            type: '((data: TableProps.SelectionState<T>) => string)',
          },
        ],
      },
    },
    {
      name: 'columns',
      type: 'Array<TableProps.TableColumn<T>>',
      description: 'Testing array literal',
      inlineType: undefined,
      optional: false,
      defaultValue: undefined,
    },
    {
      name: 'filteringFn',
      type: 'TableProps.FilteringFunction<T>',
      inlineType: {
        type: 'function',
        name: 'TableProps.FilteringFunction<T>',
        returnType: 'boolean',
        parameters: [
          {
            name: 'item',
            type: 'T',
          },
        ],
      },
      optional: true,
      defaultValue: undefined,
      description: undefined,
    },
    {
      name: 'items',
      description: 'Testing ReadonlyArray',
      type: 'ReadonlyArray<TableProps.Item>',
      defaultValue: undefined,
      inlineType: undefined,
      optional: false,
    },
    {
      name: 'trackBy',
      type: 'TableProps.TrackBy<T>',
      inlineType: {
        type: 'union',
        name: 'TableProps.TrackBy<T>',
        values: ['string', '(item: T) => boolean'],
      },
      optional: true,
      defaultValue: undefined,
      description: undefined,
    },
  ]);
});

test('should have correct detail type in the event', () => {
  const event = table.events.find(prop => prop.name === 'onWidthChange');
  expect(event).toEqual({
    name: 'onWidthChange',
    detailType: 'TableProps.ColumnWidthsChangeDetail',
    detailInlineType: {
      type: 'object',
      name: 'TableProps.ColumnWidthsChangeDetail',
      properties: [
        {
          name: 'widths',
          optional: false,
          type: 'Array<number>',
        },
      ],
    },
    description: undefined,
    cancelable: false,
  });
});

test('should properly display string union types', () => {
  const eventDetail = sideNavigation.events.find(def => def.name === 'onFollow')!;
  expect(eventDetail.detailType).toEqual('SideNavigationProps.FollowDetail');
  expect(eventDetail.detailInlineType).toEqual({
    type: 'object',
    name: 'SideNavigationProps.FollowDetail',
    properties: [
      {
        name: 'href',
        optional: false,
        type: 'string',
      },
      {
        name: 'type',
        optional: true,
        type: '"link" | "link-group" | "expandable-link-group"',
      },
    ],
  });
});

test('should properly display number and mixed union types', () => {
  expect(columnLayout.properties.find(def => def.name === 'columns')).toEqual({
    name: 'columns',
    optional: false,
    type: 'number',
    inlineType: {
      name: 'ColumnLayoutProps.Columns',
      type: 'union',
      values: ['2', '1', '3', '4'],
    },
  });
  expect(columnLayout.properties.find(def => def.name === 'widths')).toEqual({
    name: 'widths',
    optional: false,
    type: 'ColumnLayoutProps.Widths',
    inlineType: {
      name: 'ColumnLayoutProps.Widths',
      type: 'union',
      values: ['25', '"50%"', '100', '"33%"'],
    },
  });
});

test('should parse string literal type as single-value union', () => {
  expect(buttonGroup.properties).toEqual([
    {
      name: 'items',
      description: 'This is items array',
      type: 'ReadonlyArray<ButtonGroupProps.Item>',
      optional: false,
    },
    {
      name: 'variant',
      description: 'This is variant',
      type: '"icon"',
      optional: false,
    },
  ]);
});
