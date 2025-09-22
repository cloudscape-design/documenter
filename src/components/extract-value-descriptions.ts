// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';
import { extractDeclaration } from '../shared/type-utils';
import { ValueDescription } from './interfaces';

export function extractValueDescriptions(type: ts.UnionOrIntersectionType, typeNode: ts.TypeNode | undefined) {
  if (type.aliasSymbol) {
    // Traverse from "variant: ButtonProps.Variant" to "type Variant = ..."
    const aliasDeclaration = extractDeclaration(type.aliasSymbol);
    if (ts.isTypeAliasDeclaration(aliasDeclaration)) {
      typeNode = aliasDeclaration.type;
    }
  }

  if (!typeNode) {
    return [];
  }

  const maybeList = typeNode.getChildren()[0];
  // based on similar code in typedoc
  // https://github.com/TypeStrong/typedoc/blob/6090b3e31471cea3728db1b03888bca5703b437e/src/lib/converter/symbols.ts#L406-L438
  if (maybeList.kind !== ts.SyntaxKind.SyntaxList) {
    return [];
  }
  const rawComments: Array<string | undefined> = [];
  let memberIndex = 0;
  for (const child of maybeList.getChildren()) {
    const text = child.getFullText();
    if (text.includes('/**')) {
      rawComments[memberIndex] = (rawComments[memberIndex] ?? '') + child.getFullText();
    }

    if (child.kind !== ts.SyntaxKind.BarToken) {
      memberIndex++;
    }
  }
  // Array.from to fix sparse array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_methods_and_empty_slots
  return Array.from(rawComments).map((comment): ValueDescription | undefined => {
    if (!comment) {
      return undefined;
    }
    const systemTags = Array.from(comment.matchAll(/@awsuiSystem\s+(\w+)/g), ([_, system]) => system);
    return systemTags.length > 0 ? { systemTags } : undefined;
  });
}
