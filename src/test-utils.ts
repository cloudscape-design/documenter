// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as assert from 'node:assert/strict';
import ts from 'typescript';
import glob from 'fast-glob';

import { TestUtilMethod, TestUtilsDoc } from './interfaces';
import { isTruthy, joinSymbolDisplayParts, nodeToString, typeToString } from './util';

export function documentTestUtils(_options: unknown, filteringGlob: string): Array<TestUtilsDoc> {
  const entryFiles = glob.sync(filteringGlob, { absolute: true });

  // Don't provide the tsconfig because it unpredictably alters how TypeScript parses source files.
  // Thankfully, we don't really need much config-specific stuff here.
  const program = ts.createProgram(entryFiles, { strict: true });

  return program
    .getSourceFiles()
    .filter(({ fileName }) => entryFiles.includes(fileName))
    .flatMap(sourceFile => buildTestUtilsDefinition(program, sourceFile))
    .filter(isTruthy);
}

export function buildTestUtilsDefinition(
  program: ts.Program,
  sourceFile: ts.SourceFile,
): Array<TestUtilsDoc> | undefined {
  // Get a list of exports from the file.
  const fileSymbol = program.getTypeChecker().getSymbolAtLocation(sourceFile);
  if (!fileSymbol?.exports) {
    console.warn(`File has no exports: ${sourceFile.fileName}`);
    return;
  }

  const testUtilClasses: ts.Symbol[] = [];
  fileSymbol.exports.forEach(tsSymbol => {
    if (tsSymbol.getFlags() & ts.SymbolFlags.Class) {
      testUtilClasses.push(tsSymbol);
    }
  });

  const testUtilDocs: Array<TestUtilsDoc> = [];

  for (const classType of testUtilClasses) {
    const classDecl = classType.getDeclarations()?.[0];
    assert.ok(classDecl);
    assert.ok(ts.isClassDeclaration(classDecl));
    assert.ok(classDecl.name);

    const methods: Array<TestUtilMethod> = [];
    classType.members?.forEach(prop => {
      if (prop.getFlags() & ts.SymbolFlags.Method) {
        const declaration = prop.getDeclarations()?.[0];
        assert.ok(declaration);
        assert.ok(ts.isMethodDeclaration(declaration));

        const signature = program
          .getTypeChecker()
          .getSignaturesOfType(program.getTypeChecker().getTypeOfSymbol(prop), ts.SignatureKind.Call)[0];

        methods.push({
          name: prop.getName(),
          description: joinSymbolDisplayParts(prop.getDocumentationComment(program.getTypeChecker())),
          returnType: typeToString(program, signature.getReturnType()),
          parameters: declaration.parameters.map((parameter, i) => {
            const parameterSymbol = signature.getParameters()[i];
            return {
              name: parameter.name.getText(),
              description: joinSymbolDisplayParts(parameterSymbol.getDocumentationComment(program.getTypeChecker())),
              defaultValue:
                parameter.initializer && nodeToString(sourceFile, parameter.initializer, ts.EmitHint.Expression),
              flags: { isOptional: (prop.getFlags() & ts.SymbolFlags.Optional) > 0 },
              typeName: typeToString(program, program.getTypeChecker().getReturnTypeOfSignature(signature)),
            };
          }),
        });
      }
    });

    testUtilDocs.push({ name: classDecl.name.getText(), methods });
  }

  return testUtilDocs;
}
