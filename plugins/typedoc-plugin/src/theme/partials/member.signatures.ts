// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeclarationReflection } from 'typedoc';
import { CodeNode, SectionNode } from '../layout';

import { mergeSections } from './utils';
import RenderContext from '../render-context';

export const memberSignatures = (context: RenderContext, props: DeclarationReflection): SectionNode => {
  if (!props.signatures || props.signatures.length === 0) {
    return new SectionNode(null, []);
  }

  const section = new SectionNode(null, []);

  section.addItem(
    new CodeNode(context.code.memberSignatureTitle(props.signatures[0], { hideName: true, arrowStyle: true }))
  );

  return mergeSections(section, context.memberSignatureBody(props.signatures[0]));
};
