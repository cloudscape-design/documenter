// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as path from 'node:path';
import * as assert from 'node:assert/strict';
import ts from 'typescript';
import { glob } from 'fast-glob';
import { pascalCase } from 'change-case';

import {
  ComponentDefinition,
  ComponentFunction,
  ComponentProperty,
  ComponentRegion,
  EventHandler,
  InlineTypeDefinition,
} from './interfaces';

import {
  nodeToString,
  typeToString,
  joinSymbolDisplayParts,
  isTruthy,
  sortSymbolsByName,
  signatureDeclarationToString,
} from './util';

const EVENT_HANDLER_REGEX = /^on[A-Z]/;
const PASSTHROUGH_TYPE_NAMES = ['HTMLElement'];

export function documentComponents(tsconfigPath: string, publicFilesGlob: string): ComponentDefinition[] {
  // HACK: assuming "src" directory cause it's easier for now
  const allFiles = glob.sync(path.join(path.dirname(tsconfigPath), 'src/**/*.{ts,tsx}'), { absolute: true });
  const componentEntryFiles = glob.sync(publicFilesGlob, { absolute: true });

  // Don't provide the tsconfig because it unpredictably alters how TypeScript parses source files.
  // Thankfully, we don't really need much config-specific stuff here.
  const program = ts.createProgram(allFiles, { strict: true });

  return program
    .getSourceFiles()
    .filter(({ fileName }) => componentEntryFiles.includes(fileName))
    .flatMap(sourceFile => buildComponentDefinition(program, sourceFile))
    .filter(isTruthy);
}

export function buildComponentDefinition(
  program: ts.Program,
  sourceFile: ts.SourceFile,
): ComponentDefinition | undefined {
  /** The expected component name, based on the naming convention of the folder. */
  const componentName = pascalCase(path.basename(path.dirname(sourceFile.fileName)));

  /** The expected props type name, based on the naming convention of the folder. */
  const propsName = `${componentName}Props`;

  /** All the types and values exported from this source file. */
  const fileExports = program.getTypeChecker().getSymbolAtLocation(sourceFile)?.exports;
  if (!fileExports) {
    console.warn(`File has no exports! ${sourceFile.fileName}`);
    return;
  }

  /**
   * The AST node where the component was most likely defined.
   * This node's parameters can inspected to fetch default property values.
   */
  let componentNode: ts.SignatureDeclaration | undefined;

  /** The likely interface/type of the component properties. */
  let propsType: ts.Type | undefined;

  fileExports.forEach((tsSymbol, exportedName) => {
    if (exportedName === 'default') {
      // Get the non-type declaration that matches this export.
      // It's not possible to have two default exports, so only one is a non-type node.
      const node = tsSymbol.getDeclarations()?.find(node => !ts.isTypeNode(node));
      componentNode = node && getComponentFunctionNode(program, node);
    }

    if (exportedName === propsName) {
      propsType = program.getTypeChecker().getDeclaredTypeOfSymbol(tsSymbol);
    }
  });

  assert.ok(componentNode, `File has no default non-type export: ${sourceFile.fileName}`);
  assert.ok(propsType, `File has no props export (${propsName}): ${sourceFile.fileName}`);

  //
  // Get component documentation tags
  //

  let componentVersion: string | undefined;
  let componentDoc: string | undefined;
  let componentBeta = false;

  const componentSymbol = program.getTypeChecker().getSymbolAtLocation(componentNode.name ?? componentNode);
  if (componentSymbol) {
    const versionTag = componentSymbol.getJsDocTags().find(tag => tag.name === 'version');
    componentVersion = versionTag?.text && joinSymbolDisplayParts(versionTag.text);
    componentDoc =
      joinSymbolDisplayParts(componentSymbol.getDocumentationComment(program.getTypeChecker())) || undefined;
    componentBeta = componentSymbol.getJsDocTags().some(tag => tag.name === 'beta');
  }

  //
  // Extract default values from componentNode
  //

  const defaultValues = new Map<string, string>();

  if (componentNode.parameters[0] && ts.isObjectBindingPattern(componentNode.parameters[0].name)) {
    for (const bindingElement of componentNode.parameters[0].name.elements) {
      if (ts.isIdentifier(bindingElement.name) && bindingElement.initializer) {
        const defaultValueString = nodeToString(sourceFile, bindingElement.initializer, ts.EmitHint.Expression);
        defaultValues.set(bindingElement.name.getText(), defaultValueString);
      }
    }
  }

  //
  // Find a type under the props type named "Ref" and pull the functions from there.
  //
  const functions: Array<ComponentFunction> = [];

  const refSymbol = propsType.getSymbol()?.exports?.get(ts.escapeLeadingUnderscores('Ref'));
  const refProps = refSymbol && program.getTypeChecker().getDeclaredTypeOfSymbol(refSymbol).getProperties();
  for (const fnSymbol of refProps ?? []) {
    const refFunctionType = program.getTypeChecker().getTypeOfSymbol(fnSymbol);
    // stripUnionWithUndefined because optional functions are treated as being unioned with undefined.
    // FIXME: Should ref functions even be optional? We don't document them as optional except in typings.
    const funcSignature = stripUnionWithUndefined(refFunctionType).getCallSignatures()[0];
    assert.ok(funcSignature, `Could not find function signature for ${fnSymbol.getName()}`);

    functions.push({
      name: fnSymbol.getName(),
      description: joinSymbolDisplayParts(fnSymbol.getDocumentationComment(program.getTypeChecker())),
      parameters: funcSignature.parameters.map(parameter => ({
        name: parameter.getName(),
        type: typeToString(program, program.getTypeChecker().getTypeOfSymbol(parameter)),
      })),
      returnType: typeToString(program, program.getTypeChecker().getReturnTypeOfSignature(funcSignature)),
    });
  }

  //
  // Extract properties from propsType
  //

  const properties: Array<ComponentProperty> = [];
  const regions: Array<ComponentRegion> = [];
  const events: Array<EventHandler> = [];

  const interfaceProps = propsType.getProperties();
  assert.ok(interfaceProps, `No properties found for ${propsName}`);

  for (const prop of sortSymbolsByName(interfaceProps)) {
    const declaration = prop.getDeclarations()?.[0];
    assert.ok(declaration && ts.isPropertySignature(declaration) && declaration.type);

    if (declaration.type.getText() === 'React.ReactNode' || declaration.type.getText() === 'ReactNode') {
      // If a property accepts React.ReactNode, it's treated as a slot.
      const visualRefreshTag = prop.getJsDocTags().find(tag => tag.name === 'visualrefresh');
      regions.push({
        name: prop.getName(),
        description: joinSymbolDisplayParts(prop.getDocumentationComment(program.getTypeChecker())) || undefined,
        displayName: joinSymbolDisplayParts(prop.getJsDocTags().find(tag => tag.name === 'displayname')?.text),
        deprecatedTag: joinSymbolDisplayParts(prop.getJsDocTags().find(tag => tag.name === 'deprecated')?.text),
        visualRefreshTag: visualRefreshTag ? joinSymbolDisplayParts(visualRefreshTag.text) ?? '' : undefined,
        i18nTag: prop.getJsDocTags().some(tag => tag.name === 'i18n') || undefined,
        inlineType: undefined,
        isDefault: prop.getName() === 'children',
      });
    } else if (EVENT_HANDLER_REGEX.test(prop.getName())) {
      // Event handler types are expected to be either CancelableEventHandler<T> or NonCancelableEventHandler<T>.
      // The <T> is what's documented in detailType and detailInlineType.
      let detailType: ts.Type | undefined;
      let detailTypeString: string | undefined;
      let isCancelable = false;

      if (ts.isTypeReferenceNode(declaration.type)) {
        const detailTypeNode = declaration.type.typeArguments?.[0];
        if (detailTypeNode) {
          detailType = program.getTypeChecker().getTypeFromTypeNode(detailTypeNode);
          detailTypeString = nodeToString(sourceFile, detailTypeNode, ts.EmitHint.Unspecified);
        }
        isCancelable = declaration.type.typeName.getText() !== 'NonCancelableEventHandler';
      }

      events.push({
        name: prop.getName(),
        description: joinSymbolDisplayParts(prop.getDocumentationComment(program.getTypeChecker())) || undefined,
        deprecatedTag: joinSymbolDisplayParts(prop.getJsDocTags().find(tag => tag.name === 'deprecated')?.text),
        cancelable: isCancelable,
        detailType: detailTypeString,
        detailInlineType:
          detailType && detailTypeString ? buildInlineTypeDefinition(program, detailTypeString, detailType) : undefined,
      });
    } else {
      const propType = program.getTypeChecker().getTypeFromTypeNode(declaration.type);
      const typeString = typeToString(program, propType);
      const visualRefreshTag = prop.getJsDocTags().find(tag => tag.name === 'visualrefresh');

      const property: ComponentProperty = {
        name: prop.getName(),
        type: typeString,
        description: joinSymbolDisplayParts(prop.getDocumentationComment(program.getTypeChecker())) || undefined,
        deprecatedTag: joinSymbolDisplayParts(prop.getJsDocTags().find(tag => tag.name === 'deprecated')?.text),
        visualRefreshTag: visualRefreshTag ? joinSymbolDisplayParts(visualRefreshTag.text) ?? '' : undefined,
        i18nTag: prop.getJsDocTags().some(tag => tag.name === 'i18n') || undefined,
        optional: !!(prop.getFlags() & ts.SymbolFlags.Optional) || isUnionWithUndefined(propType),
        defaultValue: defaultValues.get(prop.getName()),
      };

      if (ts.isTypeReferenceNode(declaration.type)) {
        // This is a named type (ThingProps.Item). Generally, we expect all
        // property types to be defined this way, for developer convenience.
        property.inlineType = buildInlineTypeDefinition(program, typeString, propType);

        // For compatibility, a union of strings should always be just "string".
        if (isUnionOfStrings(propType)) {
          property.type = 'string';
        }
      } else if (isInlineUnionOfStrings(declaration.type)) {
        // This is a union type, but is defined inline.
        // The previous documenter documented this as an inline type with an empty name.
        property.type = 'string';
        property.inlineType = {
          name: '',
          type: 'union',
          values: declaration.type.types.map(t => ((t as ts.LiteralTypeNode).literal as ts.StringLiteral).text).sort(),
        };
      }

      properties.push(property);
    }
  }

  return {
    name: componentName,
    version: componentVersion,
    description: componentDoc,
    releaseStatus: componentBeta ? 'beta' : 'stable',
    properties,
    regions,
    events,
    functions,
  };
}

function getComponentFunctionNode(program: ts.Program, startNode: ts.Node): ts.SignatureDeclaration {
  let node: ts.Node | undefined = startNode;

  if (ts.isExportAssignment(node)) {
    // This is an "export default Abc" statement. This gets the node where "Abc" is declared.
    node = program.getTypeChecker().getSymbolAtLocation(node.expression)?.valueDeclaration;
    assert.ok(node);
  }

  if (ts.isVariableDeclaration(node)) {
    // This is a "const Abc = ..." statement.
    // For simplicity, we require that a variable be declared and initialized together.
    // NOTE: If needed, we'll need to pull documentation from here, not the function node.
    assert.ok(node.initializer);
    node = node.initializer;
  }

  if (ts.isAsExpression(node)) {
    // This is a "value as Type" statement.
    // NOTE: For now, we discard the type information and use the naming convention. Maybe we shouldn't?
    node = node.expression;
  }

  if (ts.isCallExpression(node)) {
    // Function call, very likely React.memo or React.forwardRef.
    // NOTE: Actually validate that this is a known/expected function?
    assert.ok(node.arguments[0]);
    node = node.arguments[0];
  }

  assert.ok(ts.isFunctionLike(node), 'Unexpected default export ts.SyntaxKind: ' + node.kind);
  return node;
}

function buildInlineTypeDefinition(program: ts.Program, name: string, type: ts.Type): InlineTypeDefinition | undefined {
  // If it's a "global" type (e.g. HTMLElement), we don't want to turn it
  // into an inline type. So we keep a blocklist for now. There may be a
  // better way to do this.
  if (PASSTHROUGH_TYPE_NAMES.includes(name)) {
    return undefined;
  }

  if (type.isUnion()) {
    return {
      name,
      type: 'union',
      values: type.types.map(t => typeToString(program, t, true)).sort(),
    };
  }

  // If a type has a call signature (even if it's defined as an object),
  // we treat it as a "function". We have no use for callable types that
  // also have properties.
  const callSignatures = type.getCallSignatures();
  if (callSignatures.length > 0) {
    const signature = callSignatures[0];
    return {
      name,
      type: 'function',
      parameters: signature.parameters.map(parameter => {
        const declaration = parameter.getDeclarations()?.[0];
        assert.ok(declaration && ts.isParameter(declaration) && declaration.type);
        return {
          name: parameter.getName(),
          type: typeToString(program, program.getTypeChecker().getTypeFromTypeNode(declaration.type)),
        };
      }),
      returnType: typeToString(program, program.getTypeChecker().getReturnTypeOfSignature(signature)),
    };
  }

  // We can treat non-union, non-callable types as object types (or types that
  // resolve down to object types). One exception is arrays, which are technically
  // object types, but we don't want JS array methods (like sort) to end up in here.
  const hasIndexSignatures = !!type.getNumberIndexType() || !!type.getStringIndexType();
  if (!type.isLiteral() && !hasIndexSignatures && type.getProperties().length > 0) {
    return {
      name,
      type: 'object',
      properties: sortSymbolsByName(type.getProperties()).map(property => {
        const declaration = property.getDeclarations()?.[0];
        assert.ok(declaration);

        if (ts.isPropertySignature(declaration)) {
          assert.ok(declaration.type);
          const type = program.getTypeChecker().getTypeFromTypeNode(declaration.type);
          return {
            name: property.getName(),
            optional: !!(property.flags & ts.SymbolFlags.Optional) || isUnionWithUndefined(type),
            type: typeToString(program, type),
          };
        }

        if (ts.isMethodSignature(declaration)) {
          return {
            name: property.getName(),
            optional: !!(property.flags & ts.SymbolFlags.Optional) || isUnionWithUndefined(type),
            type: signatureDeclarationToString(program, declaration),
          };
        }

        assert.fail(`Unexpected declaration kind: ${declaration.kind}`);
      }),
    };
  }
}

function isInlineUnionOfStrings(type: ts.TypeNode): type is ts.UnionTypeNode {
  return (
    ts.isUnionTypeNode(type) &&
    type.types.every(subType => ts.isLiteralTypeNode(subType) && ts.isStringLiteral(subType.literal))
  );
}

function isUnionOfStrings(type: ts.Type): type is ts.UnionType {
  return type.isUnion() && type.types.every(subType => subType.isStringLiteral());
}

function isUnionWithUndefined(type: ts.Type): type is ts.UnionType {
  return type.isUnion() && type.types.length === 2 && type.types.some(t => t.getFlags() & ts.TypeFlags.Undefined);
}

function stripUnionWithUndefined(type: ts.Type): ts.Type {
  if (isUnionWithUndefined(type)) {
    return type.types.find(subtype => (subtype.getFlags() & ts.TypeFlags.Undefined) === 0)!;
  }
  return type;
}
