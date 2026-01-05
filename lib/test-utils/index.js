"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentTestUtils = documentTestUtils;
exports.writeTestUtilsDocumentation = writeTestUtilsDocumentation;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const node_fs_1 = __importDefault(require("node:fs"));
const pathe_1 = __importDefault(require("pathe"));
const bootstrap_1 = require("../shared/bootstrap");
const extractor_1 = __importDefault(require("./extractor"));
function documentTestUtils(options) {
    var _a, _b, _c;
    const domUtilsRoot = pathe_1.default.resolve(options.domUtils.root);
    const selectorsUtilsRoot = pathe_1.default.resolve(options.selectorsUtils.root);
    const program = (0, bootstrap_1.bootstrapTypescriptProject)(options.tsconfigPath);
    const checker = program.getTypeChecker();
    const domUtilsFile = program.getSourceFiles().find(file => file.fileName === domUtilsRoot);
    if (!domUtilsFile) {
        throw new Error(`File '${domUtilsRoot}' not found`);
    }
    const selectorsUtilsFile = program.getSourceFiles().find(file => file.fileName === selectorsUtilsRoot);
    if (!selectorsUtilsFile) {
        throw new Error(`File '${selectorsUtilsFile}' not found`);
    }
    const includeCoreMethods = (_a = options.includeCoreMethods) !== null && _a !== void 0 ? _a : false;
    return {
        domDefinitions: (0, extractor_1.default)(domUtilsFile, checker, (_b = options.domUtils.extraExports) !== null && _b !== void 0 ? _b : [], includeCoreMethods),
        selectorsDefinitions: (0, extractor_1.default)(selectorsUtilsFile, checker, (_c = options.selectorsUtils.extraExports) !== null && _c !== void 0 ? _c : [], includeCoreMethods),
    };
}
function writeTestUtilsDocumentation({ outDir, ...rest }) {
    const { domDefinitions, selectorsDefinitions } = documentTestUtils(rest);
    node_fs_1.default.mkdirSync(outDir, { recursive: true });
    node_fs_1.default.writeFileSync(pathe_1.default.join(outDir, 'dom.js'), `module.exports = { classes: ${JSON.stringify(domDefinitions, null, 2)} };`);
    node_fs_1.default.writeFileSync(pathe_1.default.join(outDir, 'selectors.js'), `module.exports = { classes: ${JSON.stringify(selectorsDefinitions, null, 2)} };`);
    node_fs_1.default.copyFileSync(require.resolve('./interfaces.d.ts'), pathe_1.default.join(outDir, 'interfaces.d.ts'));
    const dtsTemplate = `import { TestUtilsDefinition } from './interfaces';
  declare const definitions: TestUtilsDefinition;
  export = definitions;
  `;
    node_fs_1.default.writeFileSync(pathe_1.default.join(outDir, 'dom.d.ts'), dtsTemplate);
    node_fs_1.default.writeFileSync(pathe_1.default.join(outDir, 'selectors.d.ts'), dtsTemplate);
}
//# sourceMappingURL=index.js.map