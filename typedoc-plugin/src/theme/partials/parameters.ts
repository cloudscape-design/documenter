// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ParameterReflection } from 'typedoc22';
import { CodeNode, EmptyNode, LiteralNode, TableNode } from '../layout';

import RenderContext from '../render-context';

export function parameters(context: RenderContext, parameters?: ParameterReflection[]): null | TableNode {
  if (!parameters || parameters.length === 0) {
    return null;
  }
  return new TableNode(
    'Parameters',
    ['Name', 'Type', 'Description', 'Default', 'Required'],
    parameters.map(item => [
      new LiteralNode(item.flags.isRest ? `...${item.name}` : item.name),
      item.type ? new CodeNode(context.code.type(item.type)) : new EmptyNode(),
      context.comment(item) || new EmptyNode(),
      item.defaultValue ? new CodeNode(context.code.literal(item.defaultValue)) : new EmptyNode(),
      new CodeNode(context.code.literal(item.flags.isOptional ? 'true' : 'false')),
    ])
  );
}
