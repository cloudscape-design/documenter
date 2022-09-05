// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as fs from 'fs';
import * as ts from 'typescript';
import { SectionNode } from '../layout';

export function mergeSections(target: SectionNode, source: SectionNode): SectionNode {
  return new SectionNode(target.title, [...target.items, ...source.items]);
}

export function extractNamedParameters(sourceFilePath: string, expressionName: string): Record<string, string>[] {
  const sourceCode = fs.readFileSync(sourceFilePath, 'utf-8');
  const node = ts.createSourceFile('temp.ts', sourceCode, ts.ScriptTarget.Latest);

  const extracted: Record<string, string>[] = [];

  function matchFunctionExpression(statement: ts.Statement): boolean {
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.escapedText !== expressionName) {
        return false;
      }
      statement.parameters.forEach((parameter, index) => {
        extracted.push({});

        if (ts.isObjectBindingPattern(parameter.name)) {
          for (const element of parameter.name.elements) {
            if (ts.isIdentifier(element.name) && element.initializer) {
              extracted[index][element.name.escapedText as string] = sourceCode
                .substring(element.initializer.pos, element.initializer.end)
                .trim();
            }
          }
        }
      });
    }
    return false;
  }

  function matchVariableExpression(statement: ts.Statement): boolean {
    if (ts.isVariableStatement(statement)) {
      const nameIdentifier = statement.declarationList.declarations[0].name;
      if (!ts.isIdentifier(nameIdentifier) || nameIdentifier.escapedText !== expressionName) {
        return false;
      }
      const initializer = statement.declarationList.declarations[0].initializer as ts.Node;

      if (ts.isAsExpression(initializer) && ts.isCallExpression(initializer.expression)) {
        const expression = initializer.expression.arguments[0];
        if (ts.isArrowFunction(expression) || ts.isFunctionExpression(expression)) {
          if (ts.isObjectBindingPattern(expression.parameters[0].name)) {
            extracted.push({});
            for (const element of expression.parameters[0].name.elements) {
              if (ts.isIdentifier(element.name) && element.initializer) {
                extracted[0][element.name.escapedText as string] = sourceCode
                  .substring(element.initializer.pos, element.initializer.end)
                  .trim();
              }
            }
          }
        }
      }
    }
    return false;
  }

  for (const statement of node.statements) {
    if (matchFunctionExpression(statement) || matchVariableExpression(statement)) {
      break;
    }
  }

  return extracted;
}
