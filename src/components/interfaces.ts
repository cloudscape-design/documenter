// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export interface ComponentDefinition {
  name: string;
  /** @deprecated */
  releaseStatus: string;
  /** @deprecated */
  version?: string;
  /** @deprecated */
  description?: string;
  systemTag?: Array<string>;
  properties: ComponentProperty[];
  regions: ComponentRegion[];
  functions: ComponentFunction[];
  events: EventHandler[];
}

interface Taggable {
  analyticsTag?: string;
  deprecatedTag?: string;
  visualRefreshTag?: string;
  i18nTag?: true | undefined;
  systemTag?: Array<string>;
}

export interface ValueDescription {
  systemTag: Array<string>;
}

export interface ComponentProperty extends Taggable {
  name: string;
  description?: string;
  optional: boolean;
  type: string;
  inlineType?: TypeDefinition;
  defaultValue?: string;
}

export interface ComponentRegion extends Taggable {
  name: string;
  description?: string;
  displayName?: string;
  isDefault: boolean;
}

export interface ComponentFunction {
  name: string;
  description?: string;
  parameters: FunctionParameter[];
  returnType: string;
}

export type TypeDefinition = ObjectDefinition | FunctionDefinition | UnionTypeDefinition;

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
  valueDescriptions?: Record<string, ValueDescription>;
  values: string[];
}

export interface EventHandler extends Taggable {
  name: string;
  description?: string;
  detailType?: string;
  detailInlineType?: TypeDefinition;
  cancelable: boolean;
}
