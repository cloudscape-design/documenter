// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ReferenceType, SignatureReflection, SourceFile } from 'typedoc22';

import { CodeNode, CommentNode, LiteralNode, SectionNode } from '../layout';
import RenderContext from '../render-context';
import { extractNamedParameters } from './utils';

export const memberSignatureBody = (context: RenderContext, props: SignatureReflection): SectionNode => {
  const section = new SectionNode(null, []);

  section.addItem(context.comment(props));

  section.addItem(context.typeParameters(props.typeParameters));

  section.addItem(context.parameters(props.parameters));

  if (
    props.parameters?.some(p => p.name === '__namedParameters') ||
    (props.type instanceof ReferenceType && props.type.qualifiedName === 'global.JSX.Element')
  ) {
    if (props.sources?.[0].file instanceof SourceFile) {
      // const defaults = extractNamedParameters(props.sources?.[0].file.fullFileName, props.name);
    }
  }

  if (props.type) {
    const returnsSections = new SectionNode(new LiteralNode('Returns'), []);

    returnsSections.addItem(new CodeNode(context.code.type(props.type)));

    if (props.comment?.returns) {
      returnsSections.addItem(new CommentNode(props.comment.returns));
    }

    section.addItem(returnsSections);
  }

  return section;
};
