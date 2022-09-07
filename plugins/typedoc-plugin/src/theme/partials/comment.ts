// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Reflection } from 'typedoc';
import { CommentNode } from '../layout';
import RenderContext from '../render-context';

export function comment(context: RenderContext, props: Reflection): CommentNode | null {
  if (!props.comment?.hasVisibleComponent()) {
    return null;
  }
  const fullText = context.markdown(props.comment.summary.map(s => s.text).join('\n'));
  const tags = (props.comment.blockTags || [])
    .sort((t1, t2) => t2.tag.localeCompare(t1.tag))
    .map(item => ({
      name: item.tag.substring(1),
      markdown: context.markdown(item.content.map(c => c.text).join(' ')),
    }));

  return new CommentNode(fullText, tags);
}
