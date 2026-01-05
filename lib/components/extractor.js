"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDefaultValues = extractDefaultValues;
exports.extractProps = extractProps;
exports.extractFunctions = extractFunctions;
exports.extractExports = extractExports;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const typescript_1 = __importDefault(require("typescript"));
const type_utils_1 = require("../shared/type-utils");
function extractDefaultValues(exportSymbol, checker) {
    let declaration = (0, type_utils_1.extractDeclaration)(exportSymbol);
    if (typescript_1.default.isExportAssignment(declaration)) {
        // Traverse from "export default Something;" to the actual "Something"
        const symbol = checker.getSymbolAtLocation(declaration.expression);
        if (!symbol) {
            throw new Error('Cannot resolve symbol');
        }
        declaration = (0, type_utils_1.extractDeclaration)(symbol);
    }
    // Extract "Something" from "const Component = Something"
    if (typescript_1.default.isVariableDeclaration(declaration) && declaration.initializer) {
        declaration = declaration.initializer;
    }
    // Extract "Something" from "Something as MyComponentType"
    if (typescript_1.default.isAsExpression(declaration)) {
        declaration = declaration.expression;
    }
    // Extract "Something from React.forwardRef(Something)"
    if (typescript_1.default.isCallExpression(declaration) &&
        (declaration.expression.getText() === 'React.forwardRef' || declaration.expression.getText() === 'forwardRef')) {
        declaration = declaration.arguments[0];
    }
    // In the component function, find arguments destructuring
    let argument;
    if (typescript_1.default.isFunctionDeclaration(declaration) ||
        typescript_1.default.isFunctionExpression(declaration) ||
        typescript_1.default.isArrowFunction(declaration)) {
        if (declaration.parameters.length === 0) {
            return {};
        }
        argument = declaration.parameters[0].name;
    }
    if (!argument) {
        throw new Error(`Unsupported component declaration type ${typescript_1.default.SyntaxKind[declaration.kind]}`);
    }
    if (!typescript_1.default.isObjectBindingPattern(argument)) {
        // if a component does not use props de-structuring, we do not detect default values
        return {};
    }
    const values = {};
    for (const element of argument.elements) {
        if (typescript_1.default.isIdentifier(element.name) && element.initializer) {
            values[element.name.escapedText] = element.initializer.getText();
        }
    }
    return values;
}
function extractProps(propsSymbol, checker) {
    const exportType = checker.getDeclaredTypeOfSymbol(propsSymbol);
    return exportType
        .getProperties()
        .map((value) => {
        const declaration = (0, type_utils_1.extractDeclaration)(value);
        const type = checker.getTypeAtLocation(declaration);
        return {
            name: value.name,
            type: (0, type_utils_1.stringifyType)(type, checker),
            rawType: type,
            rawTypeNode: declaration.type,
            isOptional: (0, type_utils_1.isOptional)(type),
            description: (0, type_utils_1.getDescription)(value.getDocumentationComment(checker), declaration),
        };
    })
        .sort((a, b) => a.name.localeCompare(b.name));
}
function extractFunctions(propsSymbol, checker) {
    var _a, _b, _c;
    const propsName = propsSymbol.getName();
    const namespaceDeclaration = [
        // if we got the namespace directly
        ...((_a = propsSymbol.getDeclarations()) !== null && _a !== void 0 ? _a : []),
        // find namespace declaration from the interface with the same name
        ...((_c = (_b = checker.getDeclaredTypeOfSymbol(propsSymbol).getSymbol()) === null || _b === void 0 ? void 0 : _b.getDeclarations()) !== null && _c !== void 0 ? _c : []),
    ].find(decl => decl.kind === typescript_1.default.SyntaxKind.ModuleDeclaration);
    const refType = (0, type_utils_1.unwrapNamespaceDeclaration)(namespaceDeclaration)
        .map(child => checker.getTypeAtLocation(child))
        .find(type => { var _a, _b; return ((_b = ((_a = type.getSymbol()) !== null && _a !== void 0 ? _a : type.aliasSymbol)) === null || _b === void 0 ? void 0 : _b.getName()) === 'Ref'; });
    if (!refType) {
        return [];
    }
    return refType
        .getProperties()
        .map((value) => {
        const declaration = (0, type_utils_1.extractDeclaration)(value);
        const type = checker.getTypeAtLocation(declaration);
        const realType = type.getNonNullableType();
        if (realType.getCallSignatures().length === 0) {
            throw new Error(`${propsName}.Ref should contain only methods, "${value.name}" has a "${(0, type_utils_1.stringifyType)(type, checker)}" type`);
        }
        return {
            name: value.name,
            type: (0, type_utils_1.stringifyType)(realType, checker),
            rawType: realType,
            rawTypeNode: declaration.type,
            isOptional: (0, type_utils_1.isOptional)(type),
            description: (0, type_utils_1.getDescription)(value.getDocumentationComment(checker), declaration),
        };
    })
        .sort((a, b) => a.name.localeCompare(b.name));
}
function extractExports(componentName, exportSymbols, checker, extraExports) {
    let componentSymbol;
    let propsSymbol;
    const unknownExports = [];
    for (const exportSymbol of exportSymbols) {
        if (exportSymbol.name === 'default') {
            validateComponentType(checker.getDeclaredTypeOfSymbol(exportSymbol), checker);
            componentSymbol = exportSymbol;
        }
        else if (exportSymbol.name === `${componentName}Props`) {
            propsSymbol = exportSymbol;
        }
        else if (!extraExports[componentName] ||
            (!extraExports[componentName].includes(exportSymbol.name) && !extraExports[componentName].includes('*'))) {
            unknownExports.push(exportSymbol.name);
        }
    }
    if (unknownExports.length > 0) {
        throw new Error(`Unexpected exports in ${componentName}: ${unknownExports.join(', ')}`);
    }
    if (!componentSymbol) {
        throw new Error(`Missing default export for ${componentName}`);
    }
    if (!propsSymbol) {
        throw new Error(`Missing ${componentName}Props export`);
    }
    return { componentSymbol, propsSymbol };
}
function validateComponentType(type, checker) {
    var _a;
    if (
    // React.forwardRef
    ((_a = type.getSymbol()) === null || _a === void 0 ? void 0 : _a.name) !== 'ForwardRefExoticComponent' &&
        // Plain function returning JSX
        type.getCallSignatures().some(signature => {
            const returnTypeName = checker.typeToString(signature.getReturnType());
            return returnTypeName !== 'Element' && returnTypeName !== 'ReactPortal';
        })) {
        throw new Error(`Unknown default export type ${checker.typeToString(type)}`);
    }
}
//# sourceMappingURL=extractor.js.map