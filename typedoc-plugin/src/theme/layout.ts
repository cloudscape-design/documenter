// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { enhanceTokensWithWhitespace, formatType } from './code/utils';

export type LayoutNode = SectionNode | TitleNode | CommentNode | CodeNode | TableNode | LiteralNode | EmptyNode;

export type CodeToken =
  | [value: string, kind: 'symbol']
  | [value: string, kind: 'name', options?: { path?: string[] }]
  | [value: string, kind: 'type'];

export type FormattedToken = [value: string, kind: 'whitespace'] | CodeToken;

export class SectionNode {
  nodeType = 'Section';
  title: null | LayoutNode;
  items: LayoutNode[];

  constructor(title: null | LayoutNode, items: LayoutNode[]) {
    this.title = title;
    this.items = items;
  }

  addItem(node: null | LayoutNode) {
    if (node) {
      this.items.push(node);
    }
  }
}

export class TableNode {
  nodeType = 'Table';
  title: null | string;
  header: string[];
  items: LayoutNode[][];

  constructor(title: null | string, header: string[], items: LayoutNode[][]) {
    this.title = title;
    this.header = header;
    this.items = items;
  }

  addRow(node: null | LayoutNode[]) {
    if (node) {
      this.items.push(node);
    }
  }
}

export class TitleNode {
  nodeType = 'Title';
  flags: string[];
  kind?: string;
  name: string;

  constructor(name: string, kind?: string, flags: string[] = []) {
    this.name = name;
    this.kind = kind;
    this.flags = flags;
  }
}

export class CommentNode {
  nodeType = 'Comment';
  markdown: string;
  tags: { name: string; markdown: string }[];

  constructor(text: string, tags: { name: string; markdown: string }[] = []) {
    this.markdown = text;
    this.tags = tags;
  }
}

export class CodeNode {
  nodeType = 'Code';
  tokens: FormattedToken[];
  formatted: string;

  constructor(tokens: CodeToken[]) {
    this.formatted = formatType(tokens.reduce((acc, [value]) => acc + value, ''));
    this.tokens = enhanceTokensWithWhitespace(tokens, this.formatted);
  }
}

export class LiteralNode {
  nodeType = 'Literal';
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

export class EmptyNode {
  nodeType = 'Empty';
}
