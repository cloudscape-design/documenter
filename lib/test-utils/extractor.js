"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractDocumentation;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const typescript_1 = __importDefault(require("typescript"));
const type_utils_1 = require("../shared/type-utils");
function getInheritedFrom(declaration, currentClassName) {
    if (!typescript_1.default.isMethodDeclaration(declaration) || !typescript_1.default.isClassDeclaration(declaration.parent) || !declaration.parent.name) {
        throw new Error(`Unexpected declaration parent: ${declaration.getText()}`);
    }
    const parentName = declaration.parent.name.getText();
    if (parentName === currentClassName) {
        return undefined;
    }
    return { className: parentName, methodName: declaration.name.getText() };
}
function getDefaultValue(declaration) {
    if (!typescript_1.default.isParameter(declaration)) {
        throw new Error(`Unexpected declaration: ${declaration.getText()}`);
    }
    if (!declaration.initializer) {
        return undefined;
    }
    return declaration.initializer.getText();
}
function extractDocumentation(sourceFile, checker, extraExports, includeCoreMethods) {
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    if (!moduleSymbol) {
        throw new Error(`Unable to resolve module: ${sourceFile.fileName}`);
    }
    const exportSymbols = checker.getExportsOfModule(moduleSymbol);
    const definitions = new Map();
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
function documentClass(definitions, symbol, classType, checker, includeCoreMethods) {
    if (!classType.isClass()) {
        throw new Error(`Exported symbol is not a class, got ${checker.symbolToString(symbol)}`);
    }
    const className = checker.symbolToString(symbol);
    const definition = { name: className, methods: [] };
    definitions.set(className, definition);
    for (const property of classType.getProperties()) {
        const declaration = property.valueDeclaration;
        if (!declaration) {
            throw new Error(`Unexpected member on ${className} – ${property.getName()}`);
        }
        const modifiers = (typescript_1.default.canHaveModifiers(declaration) && typescript_1.default.getModifiers(declaration)) || [];
        if (modifiers.find(modifier => modifier.kind === typescript_1.default.SyntaxKind.ProtectedKeyword || modifier.kind === typescript_1.default.SyntaxKind.PrivateKeyword)) {
            continue;
        }
        const type = checker.getTypeAtLocation(declaration);
        // report each function signature as a separate method
        for (const signature of type.getCallSignatures()) {
            const maybeReturnType = signature.getReturnType();
            // non-nullable type of `void` is `never`
            const returnType = maybeReturnType.flags & typescript_1.default.TypeFlags.Void ? maybeReturnType : maybeReturnType.getNonNullableType();
            const dependency = findDependencyType(returnType, checker);
            if (dependency && !definitions.has(dependency.typeName)) {
                documentClass(definitions, dependency.symbol, dependency.type, checker, includeCoreMethods);
            }
            const { typeName, typeParameters } = (0, type_utils_1.extractTypeArguments)(returnType, checker);
            const inheritedFrom = getInheritedFrom(declaration, className);
            if (inheritedFrom &&
                !includeCoreMethods &&
                ['AbstractWrapper', 'ElementWrapper'].includes(inheritedFrom === null || inheritedFrom === void 0 ? void 0 : inheritedFrom.className)) {
                continue;
            }
            definition.methods.push({
                name: property.getName(),
                description: (0, type_utils_1.getDescription)(property.getDocumentationComment(checker), declaration).text,
                returnType: {
                    name: typeName,
                    isNullable: (0, type_utils_1.isNullable)(maybeReturnType),
                    typeArguments: typeParameters === null || typeParameters === void 0 ? void 0 : typeParameters.map(typeArgument => ({
                        name: (0, type_utils_1.stringifyType)(typeArgument, checker),
                    })),
                },
                parameters: signature.parameters.map(parameter => {
                    const paramType = checker.getTypeAtLocation((0, type_utils_1.extractDeclaration)(parameter));
                    return {
                        name: parameter.name,
                        typeName: (0, type_utils_1.stringifyType)(paramType, checker),
                        description: (0, type_utils_1.getDescription)(parameter.getDocumentationComment(checker), declaration).text,
                        flags: { isOptional: (0, type_utils_1.isOptional)(paramType) },
                        defaultValue: getDefaultValue((0, type_utils_1.extractDeclaration)(parameter)),
                    };
                }),
                inheritedFrom: inheritedFrom ? { name: `${inheritedFrom.className}.${inheritedFrom.methodName}` } : undefined,
            });
        }
    }
    definition.methods.sort((a, b) => a.name.localeCompare(b.name));
}
function findDependencyType(type, checker) {
    const symbol = type.getSymbol();
    if (!symbol) {
        return;
    }
    const typeName = checker.symbolToString(symbol);
    if (typeName === 'Array' || typeName === 'MultiElementWrapper') {
        const itemType = checker.getTypeArguments(type)[0];
        return findDependencyType(itemType, checker);
    }
    if (!typeName.endsWith('Wrapper') ||
        ['ElementWrapper', 'ComponentWrapper'].includes(typeName) ||
        !type.isClassOrInterface()) {
        return;
    }
    return {
        typeName,
        type,
        symbol,
    };
}
//# sourceMappingURL=extractor.js.map