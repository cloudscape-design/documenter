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
    // console.warn('An error occurred while formatting a type definition: ', type, error.message);
    return type;
  }
}

export function enhanceTokensWithWhitespace(tokens: CodeToken[], formattedCode: string): FormattedToken[] {
  // Trim token values to ensure no unexpected whitespaces.
  const trimmedTokens: CodeToken[] = tokens.map(([first, ...last]) => [first.trim(), ...last]);

  const formattedTokens: FormattedToken[] = [];

  let searchIndex = 0;
  let tokenIndex = 0;

  while (tokenIndex < trimmedTokens.length) {
    const token = trimmedTokens[tokenIndex];
    const matchedIndex = formattedCode.indexOf(token[0], searchIndex);

    // Semicolons can disappear as result of formatting. Ignore.
    if (matchedIndex === -1 && token[0] === ';') {
      tokenIndex++;
      continue;
    }

    // This is unexpected. Return unformatted tokens as a fallback.
    if (matchedIndex === -1) {
      return tokens;
    }

    // Everything between two consequitive token matches is a whitespace.
    const whitespaceValue = formattedCode.slice(searchIndex, matchedIndex);
    if (whitespaceValue) {
      formattedTokens.push([whitespaceValue, 'whitespace']);
    }

    // Insert original token after whitespace.
    formattedTokens.push(token);

    searchIndex = matchedIndex + token[0].length;
    tokenIndex++;
  }

  // Insert trainling whitespace if available.
  const whitespaceValue = formattedCode.slice(searchIndex, formattedCode.length);
  if (whitespaceValue) {
    formattedTokens.push([whitespaceValue, 'whitespace']);
  }

  return formattedTokens;
}
