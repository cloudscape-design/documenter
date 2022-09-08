// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeclarationReflection, ReferenceType } from 'typedoc';

import { DefinitionNode } from '../definition';
import RenderContext from '../render-context';

export const member = (context: RenderContext, props: DeclarationReflection): null | DefinitionNode => {
  const definition: DefinitionNode = {
    name: props.name,
    kind: props.kindString,
    flags: props.flags,
    children: [],
    properties: [],
    slots: [],
    callbacks: [],
  };

  if (props.groups) {
    if (props.kindString === 'Namespace') {
      props.groups.forEach(group => {
        group.children.map(item => {
          definition.children.push(member(context, item));
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
        properties.forEach(prop => {
          definition.properties.push(member(context, prop));
        });
      }

      if (slots.length > 0) {
        slots.forEach(prop => {
          definition.slots.push(member(context, prop));
        });
      }

      if (callbacks.length > 0) {
        callbacks.forEach(prop => {
          definition.callbacks.push(member(context, prop));
        });
      }
    }
  }

  return definition;
};
