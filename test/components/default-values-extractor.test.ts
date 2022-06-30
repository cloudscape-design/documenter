// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { extractFromSource } from '../../src/components/default-values-extractor';

test('should return empty result for unrecognized value', () => {
  expect(extractFromSource('class Something {}')).toEqual({});
});

test('should return empty result if there is no argument destructuring', () => {
  expect(extractFromSource('React.forwardRef((props) => {})')).toEqual({});
});

test('should extract boolean values', () => {
  expect(extractFromSource('React.forwardRef(({truthy = true, falsy = false}) => {})')).toEqual({
    truthy: 'true',
    falsy: 'false',
  });
});

test('should extract string values', () => {
  expect(extractFromSource('React.forwardRef(({variant = "aaa"}) => {})')).toEqual({ variant: '"aaa"' });
});

test('should extract number values', () => {
  expect(extractFromSource('React.forwardRef(({columns = 4}) => {})')).toEqual({ columns: '4' });
});

test('should extract other data types as raw source', () => {
  expect(extractFromSource('React.forwardRef(({items = []}) => {})')).toEqual({ items: '[]' });
});

test('should work with es5-functions', () => {
  expect(extractFromSource('React.forwardRef(function ({works = "ok"}) {return {}})')).toEqual({ works: '"ok"' });
});

test('should extract values from type-casted forwardRefs', () => {
  expect(extractFromSource(`React.forwardRef(({ works = "ok" }) => {}) as (props: any) => JSX.Element`)).toEqual({
    works: '"ok"',
  });
});
