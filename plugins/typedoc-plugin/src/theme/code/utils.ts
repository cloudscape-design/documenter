// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

const prettier = require('prettier/standalone');
const typeScriptParser = require('prettier/parser-typescript');

import { CodeToken, FormattedToken } from '../layout';

export function withParens(type: CodeToken[], needsParens = false): CodeToken[] {
  return needsParens ? [['(', 'symbol'], ...type, [')', 'symbol']] : type;
}

export function withRest(type: CodeToken[], isRest = false): CodeToken[] {
  return isRest ? [['...', 'symbol'], ...type] : type;
}

export function withBrackets(type: CodeToken[]): CodeToken[] {
  return [['[', 'symbol'], ...type, [']', 'symbol']];
}

export function withBraces(type: CodeToken[]): CodeToken[] {
  return [['{', 'symbol'], ...type, ['}', 'symbol']];
}

export function withChevrons(type: CodeToken[]): CodeToken[] {
  return [['<', 'symbol'], ...type, ['>', 'symbol']];
}

export function withBackticks(type: CodeToken[]): CodeToken[] {
  return [['`', 'symbol'], ...type, ['`', 'symbol']];
}

export function joinType(symbol: string, type: CodeToken[][]): CodeToken[] {
  const tokens: CodeToken[] = [];
  for (let i = 0; i < type.length; i++) {
    tokens.push(...type[i]);
    if (i !== type.length - 1) {
      tokens.push([symbol, 'symbol']);
    }
  }
  return tokens;
}

export function formatType(type: string): string {
  try {
    // Prefix type to help the formatter understand it.
    let formatted = 'type X = ' + type;

    // Format with Prettier using a reasonable print width.
    // Can be re-formatted on the consumer side if need to use a different print width.
    formatted = prettier.format(formatted, { parser: 'typescript', plugins: [typeScriptParser], printWidth: 100 });

    // Remove semicolons on line-ends.
    formatted = formatted.replace(/;\s*$/gm, '');

    // Remove custom prefix.
    formatted = formatted.replace('type X = ', '');

    return formatted.trim();
  } catch (error: any) {
    console.warn('An error occurred while formatting a type definition: ', type, error.message);
    return type;
  }
}

export function enhanceTokensWithWhitespace(tokens: CodeToken[], formattedCode: string): FormattedToken[] {
  const formattedTokens: FormattedToken[] = [];

  let tokenIndex = 0;
  let tokenValueIndex = 0;
  let codeIndex = 0;

  while (codeIndex !== formattedCode.length) {
    const [tokenValue, tokenKind, tokenOptions] = tokens[tokenIndex];
    const trimmedTokenValue = tokenValue.trim();
    const nextTokenChar = trimmedTokenValue[tokenValueIndex];
    const lastToken = formattedTokens[formattedTokens.length - 1];

    // Add or append code token.
    if (formattedCode[codeIndex] === nextTokenChar) {
      if (tokenValueIndex === 0) {
        formattedTokens.push([formattedCode[codeIndex], tokenKind, tokenOptions] as any);
      } else if (lastToken[1] !== 'whitespace') {
        lastToken[0] = lastToken[0] + formattedCode[codeIndex];
      } else {
        formattedTokens.push([formattedCode[codeIndex], tokenKind, tokenOptions] as any);
      }
      tokenValueIndex++;
      if (tokenValueIndex === trimmedTokenValue.length) {
        tokenValueIndex = 0;
        tokenIndex++;
      }
    }
    // Add or append whitespace.
    else if (lastToken) {
      if (lastToken[1] === 'whitespace') {
        lastToken[0] = lastToken[0] + formattedCode[codeIndex];
      } else {
        formattedTokens.push([formattedCode[codeIndex], 'whitespace']);
      }
    }
    codeIndex++;
  }

  return formattedTokens;
}
