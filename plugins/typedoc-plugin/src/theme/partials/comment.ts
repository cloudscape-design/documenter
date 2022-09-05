// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Reflection } from 'typedoc';
import { CommentNode } from '../layout';
import RenderContext from '../render-context';

export function comment(context: RenderContext, props: Reflection): CommentNode | null {
  if (!props.comment?.hasVisibleComponent()) {
    return null;
  }
  const fullText = context.markdown([props.comment.shortText, props.comment.text].filter(Boolean).join('\n'));
  const tags = (props.comment.tags || [])
    .sort((t1, t2) => t2.tagName.localeCompare(t1.tagName))
    .map(item => ({
      name: item.tagName + (item.paramName ? ` ${item.paramName}` : ''),
      markdown: context.markdown(item.text),
    }));

  return new CommentNode(fullText, tags);
}
