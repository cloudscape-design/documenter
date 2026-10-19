// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let gallery: ComponentDefinition;
let table: ComponentDefinition;

beforeAll(() => {
  const result = buildProject('generic-type-parameter');
  expect(result).toHaveLength(2);

  [gallery, table] = result;
});

test('should describe a type parameter with a union constraint as the constraint union', () => {
  expect(gallery.properties).toEqual([
    {
      name: 'featuredMedia',
      type: 'T',
      inlineType: {
        name: 'GalleryProps.Media',
        type: 'union',
        values: ['GalleryProps.Image', 'GalleryProps.Video'],
      },
      optional: false,
      description: 'The media shown at full size.',
    },
    {
      name: 'media',
      type: 'ReadonlyArray<T>',
      optional: false,
      description: 'The media to display.',
    },
    {
      name: 'previewMedia',
      type: 'T',
      inlineType: {
        name: 'GalleryProps.Media',
        type: 'union',
        values: ['GalleryProps.Image', 'GalleryProps.Video'],
      },
      optional: true,
      description: 'The media shown in the preview pane.',
    },
  ]);
});

test('should describe a type parameter with an object constraint as an object', () => {
  expect(table.properties).toEqual([
    {
      name: 'rows',
      type: 'ReadonlyArray<T>',
      optional: false,
      description: 'The rows to display.',
    },
    {
      name: 'selectedRow',
      type: 'T',
      inlineType: {
        name: 'T',
        type: 'object',
        properties: [{ name: 'id', optional: false, type: 'string' }],
      },
      optional: true,
      description: 'The currently selected row.',
    },
  ]);
});
