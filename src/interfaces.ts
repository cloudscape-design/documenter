// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// Component interfaces

export interface ComponentDefinition {
  name: string;
  releaseStatus: string;
  version?: string;
  description?: string;
  properties: ComponentProperty[];
  regions: ComponentRegion[];
  functions: ComponentFunction[];
  events: EventHandler[];
}

export interface ComponentProperty {
  name: string;
  description?: string;
  optional: boolean;
  type: string;
  inlineType?: InlineTypeDefinition;
  defaultValue?: string;
  deprecatedTag?: string;
  visualRefreshTag?: string;
  i18nTag?: true;
}

export interface ComponentRegion {
  name: string;
  isDefault: boolean;
  displayName?: string;
  description?: string;
  deprecatedTag: string | undefined;
  inlineType?: InlineTypeDefinition;
  visualRefreshTag: string | undefined;
  i18nTag?: true;
}

export interface ComponentFunction {
  name: string;
  description?: string;
  parameters: FunctionParameter[];
  returnType: string;
}

export type InlineTypeDefinition = ObjectDefinition | FunctionDefinition | UnionTypeDefinition;

export interface ObjectDefinition {
  name: string;
  type: 'object';
  properties: ObjectDefinitionProperty[];
}

export interface ObjectDefinitionProperty {
  name: string;
  optional: boolean;
  type: string;
}

export interface FunctionDefinition {
  name: string;
  type: 'function';
  returnType: string;
  parameters: FunctionParameter[];
}

export interface FunctionParameter {
  name: string;
  type: string;
}

export interface UnionTypeDefinition {
  name: string;
  type: 'union';
  values: string[];
}

export interface EventHandler {
  name: string;
  description?: string;
  detailType?: string;
  detailInlineType?: InlineTypeDefinition;
  cancelable: boolean;
  deprecatedTag?: string;
}

// Test utils interfaces

export interface TestUtilParameter {
  name: string;
  typeName?: string;
  description?: string;
  flags: { isOptional?: boolean };
  defaultValue?: string;
}

export interface TestUtilMethod {
  name: string;
  description?: string;
  returnType?: string;
  parameters: Array<TestUtilParameter>;
  inheritedFrom?: {
    name: string;
  };
}

export interface TestUtilsDoc {
  name: string;
  methods: Array<TestUtilMethod>;
}
