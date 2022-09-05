// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { TypeParameterReflection } from 'typedoc';
import { CodeNode, EmptyNode, LiteralNode, TableNode } from '../layout';

import RenderContext from '../render-context';

export function typeParameters(context: RenderContext, typeParameters?: TypeParameterReflection[]): null | TableNode {
  const typeParametersWithComment = typeParameters?.filter(item => context.comment(item));

  if (!typeParametersWithComment || typeParametersWithComment.length === 0) {
    return null;
  }

  return new TableNode(
    'Type parameters',
    ['Name', 'Type', 'Description'],
    typeParametersWithComment.map(item => [
      new LiteralNode(item.name),
      item.type ? new CodeNode(context.code.type(item.type)) : new EmptyNode(),
      context.comment(item) || new EmptyNode(),
    ])
  );
}
