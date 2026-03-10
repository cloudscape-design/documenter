// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll, describe } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let components: ComponentDefinition[];
beforeAll(() => {
  components = buildProject('mapped-types');
});

describe('icon-provider (mapped type via union constraint in namespace)', () => {
  let component: ComponentDefinition;
  beforeAll(() => {
    component = components.find(c => c.name === 'IconProvider')!;
  });

  test('should extract component', () => {
    expect(component).toBeDefined();
  });

  test('should have icons property with mapped type members expanded', () => {
    const iconsProp = component.properties.find(p => p.name === 'icons');
    expect(iconsProp).toBeDefined();
    expect(iconsProp!.inlineType).toBeDefined();
    expect(iconsProp!.inlineType!.type).toBe('object');

    if (iconsProp!.inlineType!.type === 'object') {
      const propNames = iconsProp!.inlineType!.properties.map(p => p.name);
      expect(propNames).toEqual(['add-plus', 'arrow-left', 'close', 'search']);

      for (const prop of iconsProp!.inlineType!.properties) {
        expect(prop.optional).toBe(true);
      }
    }
  });

  test('should have children as a region', () => {
    const childrenRegion = component.regions.find(r => r.name === 'children');
    expect(childrenRegion).toBeDefined();
    expect(childrenRegion!.isDefault).toBe(true);
  });
});

describe('record-props (Record<K,V> and inline mapped type)', () => {
  let component: ComponentDefinition;
  beforeAll(() => {
    component = components.find(c => c.name === 'RecordProps')!;
  });

  test('should extract component', () => {
    expect(component).toBeDefined();
  });

  test('should have labels property with Record mapped type members', () => {
    const labelsProp = component.properties.find(p => p.name === 'labels');
    expect(labelsProp).toBeDefined();
    expect(labelsProp!.inlineType).toBeDefined();
    expect(labelsProp!.inlineType!.type).toBe('object');

    if (labelsProp!.inlineType!.type === 'object') {
      const propNames = labelsProp!.inlineType!.properties.map(p => p.name);
      expect(propNames).toEqual(['ap-south-1', 'eu-west-1', 'us-east-1']);

      for (const prop of labelsProp!.inlineType!.properties) {
        expect(prop.type).toBe('string');
        expect(prop.optional).toBe(false);
      }
    }
  });

  test('should have config property with inline mapped type members', () => {
    const configProp = component.properties.find(p => p.name === 'config');
    expect(configProp).toBeDefined();
    expect(configProp!.optional).toBe(true);
    expect(configProp!.inlineType).toBeDefined();
    expect(configProp!.inlineType!.type).toBe('object');

    if (configProp!.inlineType!.type === 'object') {
      const propNames = configProp!.inlineType!.properties.map(p => p.name);
      expect(propNames).toEqual(['debug', 'verbose']);

      for (const prop of configProp!.inlineType!.properties) {
        expect(prop.type).toBe('boolean');
        expect(prop.optional).toBe(true);
      }
    }
  });
});

describe('mapped-ref (forwardRef with mapped Ref type)', () => {
  let component: ComponentDefinition;
  beforeAll(() => {
    component = components.find(c => c.name === 'MappedRef')!;
  });

  test('should extract component', () => {
    expect(component).toBeDefined();
  });

  test('should extract functions from mapped Ref type', () => {
    expect(component.functions).toEqual([
      {
        description: undefined,
        name: 'blur',
        parameters: [],
        returnType: 'void',
      },
      {
        description: undefined,
        name: 'focus',
        parameters: [],
        returnType: 'void',
      },
    ]);
  });
});
