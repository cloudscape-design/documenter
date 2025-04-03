// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';
import { extractDefaultValues } from '../../src/components/extractor';

function extractFromSource(source: string) {
  const host = ts.createCompilerHost({});
  const mockFs = new Map<string, string>([['temp.ts', source]]);
  // mock file system access
  host.readFile = name => mockFs.get(name);
  host.writeFile = () => {};
  const program = ts.createProgram(['temp.ts'], {}, host);
  const checker = program.getTypeChecker();

  const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile('temp.ts')!)!;

  return extractDefaultValues(checker.getExportsOfModule(moduleSymbol)[0], checker);
}

test('should throw on unsupported syntax', () => {
  expect(() => extractFromSource('export class Component {}')).toThrow(
    /Unsupported component declaration type ClassDeclaration/
  );
});

describe('forwardRef', () => {
  test('should return empty result if there is no argument destructuring', () => {
    expect(extractFromSource('export const Component = React.forwardRef((props) => {})')).toEqual({});
  });

  test('should extract default values', () => {
    expect(
      extractFromSource(
        `export const Component = React.forwardRef(({
          truthy = true,
          falsy = false,
          variant = "aaa",
          columns = 4,
          items = [],
          nothing,
        }) => {})`
      )
    ).toEqual({
      truthy: 'true',
      falsy: 'false',
      variant: '"aaa"',
      columns: '4',
      items: '[]',
    });
  });

  test('should work with es5-functions', () => {
    expect(
      extractFromSource('export const Component = React.forwardRef(function ({works = "ok"}) {return {}})')
    ).toEqual({
      works: '"ok"',
    });
  });

  test('should extract values from type-casted forwardRefs', () => {
    expect(
      extractFromSource(
        `export const Component = React.forwardRef(({ works = "ok" }) => {}) as (props: any) => JSX.Element`
      )
    ).toEqual({
      works: '"ok"',
    });
  });
});

describe('arrow function', () => {
  test('should return empty result if there is no argument', () => {
    expect(extractFromSource('export const Component = () => {}')).toEqual({});
  });

  test('should return empty result if there is no argument destructuring', () => {
    expect(extractFromSource('export const Component = props => {}')).toEqual({});
  });

  test('should extract default values', () => {
    expect(
      extractFromSource(
        `export const Component = ({
          truthy = true,
          falsy = false,
          variant = "aaa",
          columns = 4,
          items = [],
          nothing,
        }) => {}`
      )
    ).toEqual({
      truthy: 'true',
      falsy: 'false',
      variant: '"aaa"',
      columns: '4',
      items: '[]',
    });
  });
});

describe('function declaration', () => {
  test('should return empty result if there are no arguments', () => {
    expect(extractFromSource('export function Component () {}')).toEqual({});
  });

  test('should return empty result if there is no argument destructuring', () => {
    expect(extractFromSource('export function Component (props) {}')).toEqual({});
  });

  test('should extract default values', () => {
    expect(
      extractFromSource(
        `export function Component ({
          truthy = true,
          falsy = false,
          variant = "aaa",
          columns = 4,
          items = [],
          nothing,
        }) {}`
      )
    ).toEqual({
      truthy: 'true',
      falsy: 'false',
      variant: '"aaa"',
      columns: '4',
      items: '[]',
    });
  });
});
