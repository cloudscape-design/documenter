// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeclarationReflection, ReferenceReflection, ReferenceType } from 'typedoc';

import { EmptyNode, TitleNode, SectionNode, TableNode } from '../../../../typedoc-plugin/lib/theme/layout';
import RenderContext from '../render-context';
import { mergeSections } from '../../../../typedoc-plugin/lib/theme/partials/utils';

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
      const properties: DeclarationReflection[] = [];
      const slots: DeclarationReflection[] = [];
      const callbacks: DeclarationReflection[] = [];

      props.groups
        .flatMap(group => group.children)
        .forEach(item => {
          if (item.hasOwnDocument || !(item instanceof DeclarationReflection)) {
            // noop
          } else if (item.type instanceof ReferenceType && item.type.name === 'ReactNode') {
            slots.push(item);
          } else if (item.type instanceof ReferenceType && item.type.name === 'NonCancelableEventHandler') {
            callbacks.push(item);
          } else if (item.type instanceof ReferenceType && item.type.name === 'CancelableEventHandler') {
            callbacks.push(item);
          } else {
            properties.push(item);
          }
        });

      if (properties.length > 0) {
        const table = new TableNode('Properties', ['Name', 'Type', 'Description'], []);
        properties.forEach(prop => {
          const row = member(context, prop);
          table.addRow([
            (row?.title || row?.items.find(item => item.nodeType === 'Name')) ?? new EmptyNode(),
            row?.items.find(item => item.nodeType === 'Code') ?? new EmptyNode(),
            row?.items.find(item => item.nodeType === 'Comment') ?? new EmptyNode(),
          ]);
        });
        section.addItem(table);
      }

      if (slots.length > 0) {
        const table = new TableNode('Slots', ['Name', 'Description'], []);
        slots.forEach(prop => {
          const row = member(context, prop);
          table.addRow([
            (row?.title || row?.items.find(item => item.nodeType === 'Name')) ?? new EmptyNode(),
            row?.items.find(item => item.nodeType === 'Comment') ?? new EmptyNode(),
          ]);
        });
        section.addItem(table);
      }

      if (callbacks.length > 0) {
        const table = new TableNode('Callbacks', ['Name', 'Type', 'Description'], []);
        callbacks.forEach(prop => {
          const row = member(context, prop);
          table.addRow([
            (row?.title || row?.items.find(item => item.nodeType === 'Name')) ?? new EmptyNode(),
            row?.items.find(item => item.nodeType === 'Code') ?? new EmptyNode(),
            row?.items.find(item => item.nodeType === 'Comment') ?? new EmptyNode(),
          ]);
        });
        section.addItem(table);
      }
    }
  }

  return section;
};
