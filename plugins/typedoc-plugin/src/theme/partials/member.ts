// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeclarationReflection, ReferenceReflection } from 'typedoc';

import { EmptyNode, TitleNode, SectionNode, TableNode } from '../layout';
import RenderContext from '../render-context';
import { mergeSections } from './utils';

export const member = (context: RenderContext, props: DeclarationReflection): SectionNode => {
  const section = mergeSections(
    new SectionNode(new TitleNode(props.name, props.kindString, props.flags), []),
    props.signatures
      ? context.memberSignatures(props)
      : props.hasGetterOrSetter()
      ? context.memberGetterSetter(props)
      : props instanceof ReferenceReflection
      ? context.memberReference(props)
      : context.memberDeclaration(props)
  );

  if (props.groups) {
    if (props.kindString === 'Namespace') {
      props.groups.forEach(group => {
        group.children.map(item => {
          section.addItem(member(context, item));
        });
      });
    } else {
      const table = new TableNode('Properties', ['Name', 'Type', 'Description'], []);

      props.groups
        .flatMap(group =>
          group.children.map(item =>
            !item.hasOwnDocument && item instanceof DeclarationReflection ? member(context, item) : null
          )
        )
        .forEach(row => {
          table.addRow([
            (row?.title || row?.items.find(item => item.nodeType === 'Name')) ?? new EmptyNode(),
            row?.items.find(item => item.nodeType === 'Code') ?? new EmptyNode(),
            row?.items.find(item => item.nodeType === 'Comment') ?? new EmptyNode(),
          ]);
        });

      section.addItem(table);
    }
  }

  return section;
};
