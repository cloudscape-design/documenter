// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
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

export interface WriteOptions {
  outDir: string;
}

export function writeComponentsDocumentation({ outDir, ...options }: WriteOptions & DocumenterOptions): void {
  const definitions = documentComponents(options);
  fs.mkdirSync(outDir, { recursive: true });
  for (const definition of definitions) {
    fs.writeFileSync(
      pathe.join(outDir, definition.dashCaseName + '.js'),
      `module.exports = ${JSON.stringify(definition, null, 2)};`
    );
  }
  const indexContent = `module.exports = {
    ${definitions
      .map(definition => `${JSON.stringify(definition.dashCaseName)}:require('./${definition.dashCaseName}')`)
      .join(',\n')}
  }`;
  fs.writeFileSync(pathe.join(outDir, 'index.js'), indexContent);
  fs.copyFileSync(require.resolve('./interfaces.d.ts'), pathe.join(outDir, 'interfaces.d.ts'));
  fs.writeFileSync(
    pathe.join(outDir, 'index.d.ts'),
    `import { ComponentDefinition } from './interfaces';
declare const definitions: Record<string, ComponentDefinition>;
export = definitions;
`
  );
}

export function documentComponents(options: DocumenterOptions): Array<ComponentDefinition> {
  const program = bootstrapTypescriptProject(options.tsconfigPath);
  const checker = program.getTypeChecker();

  const isMatch = matcher(pathe.resolve(options.publicFilesGlob));

  const sourceFiles = program.getSourceFiles().filter(file => isMatch(file.fileName));

  if (sourceFiles.length === 0) {
    throw new Error(`No files found matching ${options.publicFilesGlob}`);
  }

  return sourceFiles.map(sourceFile => {
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    const { name, dashCaseName } = componentNameFromPath(sourceFile.fileName);

    // istanbul ignore next
    if (!moduleSymbol) {
      throw new Error(`Unable to resolve module: ${sourceFile.fileName}`);
    }
    const exportSymbols = checker.getExportsOfModule(moduleSymbol);
    const { propsSymbol, componentSymbol } = extractExports(name, exportSymbols, checker, options?.extraExports ?? {});
    const props = extractProps(propsSymbol, checker);
    const functions = extractFunctions(propsSymbol, checker);
    const defaultValues = extractDefaultValues(componentSymbol, checker);
    const componentDescription = getDescription(
      componentSymbol.getDocumentationComment(checker),
      extractDeclaration(componentSymbol)
    );

    return buildComponentDefinition(name, dashCaseName, props, functions, defaultValues, componentDescription, checker);
  });
}
