// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';
import { extractDeclaration, getDescription, isOptional, stringifyType } from '../components/type-utils';
import { TestUtilsDoc } from '../test-utils/interfaces';

function getInheritedFrom(declaration: ts.Declaration, currentClassName: string) {
  if (!ts.isMethodDeclaration(declaration) || !ts.isClassDeclaration(declaration.parent) || !declaration.parent.name) {
    throw new Error(`Unexpected declaration parent: ${declaration.getText()}`);
  }
  const parentName = declaration.parent.name.getText();
  if (parentName === currentClassName) {
    return undefined;
  }
  return { name: parentName + '.' + declaration.name.getText() };
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

export default function extractDocumentation(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Array<TestUtilsDoc> {
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    throw new Error(`Unable to resolve module: ${sourceFile.fileName}`);
  }

  const exportSymbols = checker.getExportsOfModule(moduleSymbol);
  const definitions: Array<TestUtilsDoc> = [];

  for (const symbol of exportSymbols) {
    if (!(symbol.flags & ts.SymbolFlags.Class)) {
      throw new Error(`Exported symbol is not a class, got ${checker.symbolToString(symbol)}`);
    }
    const className = symbol.getName();
    const classType = checker.getTypeAtLocation(extractDeclaration(symbol));
    const classDefinition: TestUtilsDoc = { name: className, methods: [] };
    for (const property of classType.getProperties()) {
      const declaration = extractDeclaration(property);
      const modifiers = (ts.canHaveModifiers(declaration) && ts.getModifiers(declaration)) || [];
      if (
        modifiers.find(
          modifier => modifier.kind & ts.SyntaxKind.ProtectedKeyword || modifier.kind & ts.SyntaxKind.PrivateKeyword
        )
      ) {
        continue;
      }
      const type = checker.getTypeAtLocation(declaration);
      if (type.getCallSignatures().length !== 1) {
        throw new Error(`Unexpected member on ${className} – ${property.getName()}: ${stringifyType(type, checker)}`);
      }
      const returnType = type.getCallSignatures()[0].getReturnType();
      classDefinition.methods.push({
        name: property.getName(),
        description: getDescription(property.getDocumentationComment(checker), declaration).text,
        inheritedFrom: getInheritedFrom(declaration, className),
        parameters: type.getCallSignatures()[0].parameters.map(parameter => {
          const paramType = checker.getTypeAtLocation(extractDeclaration(parameter));
          return {
            name: parameter.name,
            typeName: stringifyType(paramType, checker),
            description: getDescription(parameter.getDocumentationComment(checker), declaration).text,
            flags: { isOptional: isOptional(paramType) },
            defaultValue: getDefaultValue(extractDeclaration(parameter)),
          };
        }),
        returnType: { name: stringifyType(returnType, checker) },
      });
    }
    classDefinition.methods.sort((a, b) => a.name.localeCompare(b.name));

    definitions.push(classDefinition);
  }

  return definitions;
}
