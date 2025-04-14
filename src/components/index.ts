// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { pascalCase } from 'change-case';
import pathe from 'pathe';
import { matcher } from 'micromatch';

import { buildComponentDefinition } from './component-definition';
import { extractDefaultValues, extractExports, extractFunctions, extractProps } from './extractor';
import type { ComponentDefinition } from './interfaces';
import { bootstrapTypescriptProject } from '../bootstrap/typescript';
import { extractDeclaration, getDescription } from './type-utils';

function componentNameFromPath(componentPath: string) {
  const dashCaseName = pathe.basename(pathe.dirname(componentPath));
  return { dashCaseName, name: pascalCase(dashCaseName) };
}

export interface DocumenterOptions {
  tsconfigPath: string;
  publicFilesGlob: string;
  extraExports?: Record<string, Array<string>>;
}
export function documentComponents(
  tsconfigPath: string,
  publicFilesGlob: string,
  // deprecated, now unused
  additionalInputFilePaths?: Array<string>,
  options?: DocumenterOptions
): Array<ComponentDefinition>;
export function documentComponents(options: DocumenterOptions): Array<ComponentDefinition>;
export function documentComponents(
  ...args:
    | [
        tsconfigPath: string,
        publicFilesGlob: string,
        additionalInputFilePaths?: Array<string>,
        options?: DocumenterOptions
      ]
    | [options: DocumenterOptions]
): Array<ComponentDefinition> {
  const options =
    args.length === 1
      ? args[0]
      : {
          tsconfigPath: args[0],
          publicFilesGlob: args[1],
          additionalInputFilePaths: args[2],
          ...args[3],
        };
  const program = bootstrapTypescriptProject(options.tsconfigPath);
  const checker = program.getTypeChecker();

  const isMatch = matcher(pathe.resolve(options.publicFilesGlob));

  return program
    .getSourceFiles()
    .filter(file => isMatch(file.fileName))
    .map(sourceFile => {
      const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
      const { name, dashCaseName } = componentNameFromPath(sourceFile.fileName);

      // istanbul ignore next
      if (!moduleSymbol) {
        throw new Error(`Unable to resolve module: ${sourceFile.fileName}`);
      }
      const exportSymbols = checker.getExportsOfModule(moduleSymbol);
      const { propsSymbol, componentSymbol } = extractExports(
        name,
        exportSymbols,
        checker,
        options?.extraExports ?? {}
      );
      const props = extractProps(propsSymbol, checker);
      const functions = extractFunctions(propsSymbol, checker);
      const defaultValues = extractDefaultValues(componentSymbol, checker);
      const componentDescription = getDescription(
        componentSymbol.getDocumentationComment(checker),
        extractDeclaration(componentSymbol)
      );

      return buildComponentDefinition(
        name,
        dashCaseName,
        props,
        functions,
        defaultValues,
        componentDescription,
        checker
      );
    });
}
