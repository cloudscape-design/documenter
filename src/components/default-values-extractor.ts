// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as ts from 'typescript';
import { DeclarationReflection } from 'typedoc';
import { ReflectionType } from 'typedoc/dist/lib/models';
import schema from '../schema';

export default function extractDefaultValues(component: DeclarationReflection): Record<string, any> {
  const callSignature: DeclarationReflection | undefined = (
    component.signatures?.[0].parameters?.[0].type as ReflectionType
  )?.declaration;
  if (callSignature) {
    return extractFromCallSignature(callSignature);
  }
  if (schema.utils.isForwardRefDeclaration(component) && component.defaultValue) {
    // TypeDoc does look inside React.forwardRef content, so we need to parse
    // typescript manually to extract values from object destructuring
    return extractFromSource(component.defaultValue);
  }
  return {};
}

export function extractFromSource(sourceCode: string): Record<string, any> {
  const node = ts.createSourceFile('temp.ts', sourceCode, ts.ScriptTarget.Latest);
  const statement = node.statements[0];
  if (!ts.isExpressionStatement(statement)) {
    return {};
  }
  let expression = statement.expression;
  if (ts.isAsExpression(expression)) {
    expression = expression.expression;
  }
  if (ts.isCallExpression(expression)) {
    expression = expression.arguments[0];
  }
  if (!ts.isArrowFunction(expression) && !ts.isFunctionExpression(expression)) {
    return {};
  }
  const props = expression.parameters[0];
  if (!ts.isObjectBindingPattern(props.name)) {
    return {};
  }
  const values: Record<string, any> = {};
  for (const element of props.name.elements) {
    if (ts.isIdentifier(element.name) && element.initializer) {
      values[element.name.escapedText as string] = sourceCode
        .substring(element.initializer.pos, element.initializer.end)
        .trim();
    }
  }
  return values;
}

function extractFromCallSignature(callSignature: DeclarationReflection) {
  const values: Record<string, any> = {};
  for (const child of callSignature.children || []) {
    if (child.defaultValue) {
      values[child.name] = child.defaultValue;
    }
  }
  return values;
}
