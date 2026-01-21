"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValueDescriptions = extractValueDescriptions;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const typescript_1 = __importDefault(require("typescript"));
const type_utils_1 = require("../shared/type-utils");
function extractValueDescriptions(type, typeNode) {
    var _a;
    if (type.aliasSymbol) {
        // Traverse from "variant: ButtonProps.Variant" to "type Variant = ..."
        const aliasDeclaration = (0, type_utils_1.extractDeclaration)(type.aliasSymbol);
        if (typescript_1.default.isTypeAliasDeclaration(aliasDeclaration)) {
            typeNode = aliasDeclaration.type;
        }
    }
    if (!typeNode) {
        return [];
    }
    const maybeList = typeNode.getChildren()[0];
    // based on similar code in typedoc
    // https://github.com/TypeStrong/typedoc/blob/6090b3e31471cea3728db1b03888bca5703b437e/src/lib/converter/symbols.ts#L406-L438
    if (maybeList.kind !== typescript_1.default.SyntaxKind.SyntaxList) {
        return [];
    }
    const rawComments = [];
    let memberIndex = 0;
    for (const child of maybeList.getChildren()) {
        const text = child.getFullText();
        if (text.includes('/**')) {
            rawComments[memberIndex] = ((_a = rawComments[memberIndex]) !== null && _a !== void 0 ? _a : '') + child.getFullText();
        }
        if (child.kind !== typescript_1.default.SyntaxKind.BarToken) {
            memberIndex++;
        }
    }
    // Array.from to fix sparse array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_methods_and_empty_slots
    return Array.from(rawComments).map((comment) => {
        if (!comment) {
            return undefined;
        }
        const systemTags = Array.from(comment.matchAll(/@awsuiSystem\s+(\w+)/g), ([, system]) => system);
        return systemTags.length > 0 ? { systemTags } : undefined;
    });
}
//# sourceMappingURL=extract-value-descriptions.js.map