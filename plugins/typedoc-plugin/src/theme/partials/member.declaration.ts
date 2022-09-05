// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeclarationReflection } from 'typedoc';
import { CodeNode, SectionNode } from '../layout';
import RenderContext from '../render-context';

export const memberDeclaration = (context: RenderContext, props: DeclarationReflection): SectionNode => {
  const section = new SectionNode(null, []);

  section.addItem(new CodeNode(context.code.memberDeclaration(props)));

  section.addItem(context.comment(props));

  section.addItem(context.typeParameters(props.typeParameters));

  return section;
};
