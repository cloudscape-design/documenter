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
  const directoryName = pathe.dirname(componentPath);
  return pascalCase(pathe.basename(directoryName));
}

export interface DocumenterOptions {
  extraExports?: Record<string, Array<string>>;
}

export function documentComponents(
  tsconfigPath: string,
  publicFilesGlob: string,
  // deprecated, now unused
  additionalInputFilePaths?: Array<string>,
  options?: DocumenterOptions
): Array<ComponentDefinition> {
  const program = bootstrapTypescriptProject(tsconfigPath);
  const checker = program.getTypeChecker();

  const isMatch = matcher(pathe.resolve(publicFilesGlob));

  return program
    .getSourceFiles()
    .filter(file => isMatch(file.fileName))
    .map(sourceFile => {
      const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
      const name = componentNameFromPath(sourceFile.fileName);

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

      return buildComponentDefinition(name, props, functions, defaultValues, componentDescription, checker);
    });
}
