// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';
import { ValueDescription } from './interfaces';

export function isOptional(type: ts.Type) {
  if (!type.isUnionOrIntersection()) {
    return false;
  }
  return !!type.types.find(t => t.flags & ts.TypeFlags.Undefined);
}

export function unwrapNamespaceDeclaration(declaration: ts.Declaration | undefined) {
  if (!declaration) {
    return [];
  }
  const namespaceBlock = declaration.getChildren().find(node => node.kind === ts.SyntaxKind.ModuleBlock);
  if (!namespaceBlock) {
    return [];
  }
  const moduleContent = namespaceBlock.getChildren().find(node => node.kind === ts.SyntaxKind.SyntaxList);
  if (!moduleContent) {
    return [];
  }
  return moduleContent.getChildren();
}

function stripUndefined(typeString: string) {
  return typeString.replace(/\| undefined$/, '').trim();
}

export function stringifyType(type: ts.Type, checker: ts.TypeChecker) {
  return stripUndefined(
    checker.typeToString(
      type,
      undefined,
      ts.TypeFormatFlags.WriteArrayAsGenericType |
        ts.TypeFormatFlags.UseFullyQualifiedType |
        ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
    )
  );
}

function expandTags(extraTags: ReadonlyArray<ts.JSDocTag>) {
  return extraTags.map(tag => ({
    name: tag.tagName.text,
    text: ts.getTextOfJSDocComment(tag.comment),
  }));
}

export function getDescription(docComment: Array<ts.SymbolDisplayPart>, declaration: ts.Node) {
  return {
    text: docComment.length > 0 ? ts.displayPartsToString(docComment) : undefined,
    tags: expandTags(ts.getJSDocTags(declaration)),
  };
}

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
  return rawComments.map((comment): ValueDescription | undefined =>
    comment
      ? {
          systemTags: Array.from(comment.matchAll(/@awsuiSystem\s+(\w+)/g), ([_, system]) => system),
        }
      : undefined
  );
}

export function extractDeclaration(symbol: ts.Symbol) {
  const declarations = symbol.getDeclarations();
  if (!declarations || declarations.length === 0) {
    throw new Error(`No declaration found for symbol: ${symbol.getName()}`);
  }
  if (declarations.length > 1) {
    throw new Error(`Multiple declarations found for symbol: ${symbol.getName()}`);
  }
  return declarations[0];
}
