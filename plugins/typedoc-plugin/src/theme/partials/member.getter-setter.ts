// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeclarationReflection } from 'typedoc';
import { CodeNode, SectionNode } from '../layout';
import RenderContext from '../render-context';

export const memberGetterSetter = (context: RenderContext, props: DeclarationReflection): SectionNode => {
  const section = new SectionNode(null, []);

  if (props.getSignature) {
    section.addItem(new CodeNode(context.code.memberGetter(props)));
  }
  if (props.setSignature) {
    section.addItem(new CodeNode(context.code.memberSetter(props)));
  }
  if (props.getSignature) {
    section.addItem(context.memberSignatureBody(props.getSignature));
  }
  if (props.setSignature) {
    section.addItem(context.memberSignatureBody(props.setSignature));
  }

  return section;
};
