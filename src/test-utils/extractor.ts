// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';
import {
  extractDeclaration,
  extractTypeArguments,
  getDescription,
  isNullable,
  isOptional,
  stringifyType,
} from '../shared/type-utils';
import { TestUtilsDoc } from './interfaces';

function getInheritedFrom(declaration: ts.Declaration, currentClassName: string) {
  if (!ts.isMethodDeclaration(declaration) || !ts.isClassDeclaration(declaration.parent) || !declaration.parent.name) {
    throw new Error(`Unexpected declaration parent: ${declaration.getText()}`);
  }
  const parentName = declaration.parent.name.getText();
  if (parentName === currentClassName) {
    return undefined;
  }
  return { className: parentName, methodName: declaration.name.getText() };
}

function getDefaultValue(declaration: ts.Declaration) {
  if (!ts.isParameter(declaration)) {
    throw new Error(`Unexpected declaration: ${declaration.getText()}`);
  }
  if (!declaration.initializer) {
    return undefined;
  }
  return declaration.initializer.getText();
}

export default function extractDocumentation(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  extraExports: Array<string>,
  includeCoreMethods: boolean,
): Array<TestUtilsDoc> {
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    throw new Error(`Unable to resolve module: ${sourceFile.fileName}`);
  }

  const exportSymbols = checker.getExportsOfModule(moduleSymbol);
  const definitions = new Map<string, TestUtilsDoc>();

  for (const symbol of exportSymbols) {
    const className = symbol.getName();
    if (extraExports.includes(className)) {
      continue;
    }
    const classType = checker.getDeclaredTypeOfSymbol(symbol);
    documentClass(definitions, symbol, classType, checker, includeCoreMethods);
  }

  return Array.from(definitions.values());
}

function documentClass(
  definitions: Map<string, TestUtilsDoc>,
  symbol: ts.Symbol,
  classType: ts.Type,
  checker: ts.TypeChecker,
  includeCoreMethods: boolean,
) {
  if (!classType.isClass()) {
    throw new Error(`Exported symbol is not a class, got ${checker.symbolToString(symbol)}`);
  }
  const className = checker.symbolToString(symbol);
  const definition: TestUtilsDoc = { name: className, methods: [] };
  definitions.set(className, definition);

  for (const property of classType.getProperties()) {
    const declaration = property.valueDeclaration;
    if (!declaration) {
      throw new Error(`Unexpected member on ${className} – ${property.getName()}`);
    }
    const modifiers = (ts.canHaveModifiers(declaration) && ts.getModifiers(declaration)) || [];
    if (
      modifiers.find(
        modifier => modifier.kind === ts.SyntaxKind.ProtectedKeyword || modifier.kind === ts.SyntaxKind.PrivateKeyword,
      )
    ) {
      continue;
    }
    const type = checker.getTypeAtLocation(declaration);
    // report each function signature as a separate method
    for (const signature of type.getCallSignatures()) {
      const maybeReturnType = signature.getReturnType();
      // non-nullable type of `void` is `never`
      const returnType =
        maybeReturnType.flags & ts.TypeFlags.Void ? maybeReturnType : maybeReturnType.getNonNullableType();
      const dependency = findDependencyType(returnType, checker);
      if (dependency && !definitions.has(dependency.typeName)) {
        documentClass(definitions, dependency.symbol, dependency.type, checker, includeCoreMethods);
      }

      const { typeName, typeParameters } = extractTypeArguments(returnType, checker);

      const inheritedFrom = getInheritedFrom(declaration, className);
      if (
        inheritedFrom &&
        !includeCoreMethods &&
        ['AbstractWrapper', 'ElementWrapper'].includes(inheritedFrom?.className)
      ) {
        continue;
      }

      definition.methods.push({
        name: property.getName(),
        description: getDescription(property.getDocumentationComment(checker), declaration).text,
        returnType: {
          name: typeName,
          isNullable: isNullable(maybeReturnType),
          typeArguments: typeParameters?.map(typeArgument => ({
            name: stringifyType(typeArgument, checker),
          })),
        },
        parameters: signature.parameters.map(parameter => {
          const paramType = checker.getTypeAtLocation(extractDeclaration(parameter));
          return {
            name: parameter.name,
            typeName: stringifyType(paramType, checker),
            description: getDescription(parameter.getDocumentationComment(checker), declaration).text,
            flags: { isOptional: isOptional(paramType) },
            defaultValue: getDefaultValue(extractDeclaration(parameter)),
          };
        }),
        inheritedFrom: inheritedFrom ? { name: `${inheritedFrom.className}.${inheritedFrom.methodName}` } : undefined,
      });
    }
  }
  definition.methods.sort((a, b) => a.name.localeCompare(b.name));
}

function findDependencyType(
  type: ts.Type,
  checker: ts.TypeChecker,
): { typeName: string; type: ts.Type; symbol: ts.Symbol } | undefined {
  const symbol = type.getSymbol();
  if (!symbol) {
    return;
  }

  const typeName = checker.symbolToString(symbol);
  if (typeName === 'Array' || typeName === 'MultiElementWrapper') {
    const itemType = checker.getTypeArguments(type as ts.TypeReference)[0];
    return findDependencyType(itemType, checker);
  }
  if (
    !typeName.endsWith('Wrapper') ||
    ['ElementWrapper', 'ComponentWrapper'].includes(typeName) ||
    !type.isClassOrInterface()
  ) {
    return;
  }

  return {
    typeName,
    type,
    symbol,
  };
}
