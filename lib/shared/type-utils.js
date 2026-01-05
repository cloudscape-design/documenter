"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOptional = isOptional;
exports.isNullable = isNullable;
exports.unwrapNamespaceDeclaration = unwrapNamespaceDeclaration;
exports.stringifyType = stringifyType;
exports.getDescription = getDescription;
exports.extractDeclaration = extractDeclaration;
exports.printFlags = printFlags;
exports.extractTypeArguments = extractTypeArguments;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const typescript_1 = __importDefault(require("typescript"));
function isOptional(type) {
    if (!type.isUnionOrIntersection()) {
        return false;
    }
    return !!type.types.find(t => t.flags & typescript_1.default.TypeFlags.Undefined);
}
function isNullable(type) {
    if (!type.isUnionOrIntersection()) {
        return false;
    }
    return !!type.types.find(t => t.flags & typescript_1.default.TypeFlags.Null);
}
function unwrapNamespaceDeclaration(declaration) {
    if (!declaration) {
        return [];
    }
    const namespaceBlock = declaration.getChildren().find(node => node.kind === typescript_1.default.SyntaxKind.ModuleBlock);
    if (!namespaceBlock) {
        return [];
    }
    const moduleContent = namespaceBlock.getChildren().find(node => node.kind === typescript_1.default.SyntaxKind.SyntaxList);
    if (!moduleContent) {
        return [];
    }
    return moduleContent.getChildren();
}
function stripUndefined(typeString) {
    return typeString.replace(/\| undefined$/, '').trim();
}
function stringifyType(type, checker) {
    return stripUndefined(checker.typeToString(type, undefined, typescript_1.default.TypeFormatFlags.WriteArrayAsGenericType |
        typescript_1.default.TypeFormatFlags.UseFullyQualifiedType |
        typescript_1.default.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope));
}
function expandTags(extraTags) {
    return extraTags.map(tag => ({
        name: tag.tagName.text,
        text: typescript_1.default.getTextOfJSDocComment(tag.comment),
    }));
}
function getDescription(docComment, declaration) {
    return {
        text: docComment.length > 0 ? typescript_1.default.displayPartsToString(docComment) : undefined,
        tags: expandTags(typescript_1.default.getJSDocTags(declaration)),
    };
}
function extractDeclaration(symbol) {
    const declarations = symbol.getDeclarations();
    if (!declarations || declarations.length === 0) {
        throw new Error(`No declaration found for symbol: ${symbol.getName()}`);
    }
    if (declarations.length > 1) {
        throw new Error(`Multiple declarations found for symbol: ${symbol.getName()}`);
    }
    return declarations[0];
}
function printFlags(flags, mapping) {
    return Object.entries(mapping)
        .filter(([, value]) => typeof value === 'number')
        .filter(([, value]) => value & flags)
        .map(([key]) => key);
}
function extractTypeArguments(type, checker) {
    const typeParameters = checker.getTypeArguments(type);
    if (typeParameters.length <= 0) {
        return { typeName: stringifyType(type, checker) };
    }
    const symbol = type.getSymbol();
    if (!symbol) {
        throw new Error(`Unknown generic type without symbol: ${stringifyType(type, checker)}`);
    }
    return { typeParameters, typeName: checker.symbolToString(symbol) };
}
//# sourceMappingURL=type-utils.js.map