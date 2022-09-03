// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ReferenceReflection } from 'typedoc22';
import { LiteralNode, SectionNode } from '../layout';
import RenderContext from '../render-context';

export const memberReference = (_context: RenderContext, props: ReferenceReflection): SectionNode => {
  const referenced = props.tryGetTargetReflectionDeep();

  if (!referenced) {
    return new SectionNode(null, [new LiteralNode('Re-exports ' + props.name)]);
  }

  if (props.name === referenced.name) {
    return new SectionNode(null, [new LiteralNode('Re-exports ' + referenced.name)]);
  }

  return new SectionNode(null, [new LiteralNode('Renames and re-exports ' + referenced.name)]);
};
