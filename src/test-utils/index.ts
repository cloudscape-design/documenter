// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import pathe from 'pathe';
import { bootstrapTypescriptProject } from '../shared/bootstrap';
import extractDocumentation from './extractor';
import { TestUtilsDoc } from './interfaces';

export interface TestUtilsVariantOptions {
  root: string;
  extraExports?: Array<string>;
}

export interface TestUtilsDocumenterOptions {
  tsconfigPath: string;
  includeCoreMethods?: boolean;
  domUtils: TestUtilsVariantOptions;
  selectorsUtils: TestUtilsVariantOptions;
}

interface TestUtilsDefinitions {
  domDefinitions: Array<TestUtilsDoc>;
  selectorsDefinitions: Array<TestUtilsDoc>;
}

export function documentTestUtils(options: TestUtilsDocumenterOptions): TestUtilsDefinitions {
  const domUtilsRoot = pathe.resolve(options.domUtils.root);
  const selectorsUtilsRoot = pathe.resolve(options.selectorsUtils.root);
  const program = bootstrapTypescriptProject(options.tsconfigPath);
  const checker = program.getTypeChecker();

  const domUtilsFile = program.getSourceFiles().find(file => file.fileName === domUtilsRoot);
  if (!domUtilsFile) {
    throw new Error(`File '${domUtilsRoot}' not found`);
  }

  const selectorsUtilsFile = program.getSourceFiles().find(file => file.fileName === selectorsUtilsRoot);
  if (!selectorsUtilsFile) {
    throw new Error(`File '${selectorsUtilsFile}' not found`);
  }
  // TODO: switch to false after all consumers updated
  const includeCoreMethods = options.includeCoreMethods ?? true;
  return {
    domDefinitions: extractDocumentation(
      domUtilsFile,
      checker,
      options.domUtils.extraExports ?? [],
      includeCoreMethods
    ),
    selectorsDefinitions: extractDocumentation(
      selectorsUtilsFile,
      checker,
      options.selectorsUtils.extraExports ?? [],
      includeCoreMethods
    ),
  };
}

export function writeTestUtilsDocumentation({
  outDir,
  ...rest
}: TestUtilsDocumenterOptions & { outDir: string }): void {
  const { domDefinitions, selectorsDefinitions } = documentTestUtils(rest);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    pathe.join(outDir, 'dom.js'),
    `module.exports = { classes: ${JSON.stringify(domDefinitions, null, 2)} };`
  );
  fs.writeFileSync(
    pathe.join(outDir, 'selectors.js'),
    `module.exports = { classes: ${JSON.stringify(selectorsDefinitions, null, 2)} };`
  );
  fs.copyFileSync(require.resolve('./interfaces.d.ts'), pathe.join(outDir, 'interfaces.d.ts'));
  const dtsTemplate = `import { TestUtilsDefinition } from './interfaces';
  declare const definitions: TestUtilsDefinition;
  export = definitions;
  `;
  fs.writeFileSync(pathe.join(outDir, 'dom.d.ts'), dtsTemplate);
  fs.writeFileSync(pathe.join(outDir, 'selectors.d.ts'), dtsTemplate);
}
