// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { TypeKindMap, Type, SignatureReflection, DeclarationReflection, ReflectionKind, Reflection } from 'typedoc';
import { CodeToken } from '../layout';

import { joinType, withBackticks, withBraces, withBrackets, withChevrons, withParens, withRest } from './utils';

export function type(type: Type | undefined): CodeToken[] {
  return renderType(type, {});
}

export function memberSignatureTitle(
  props: SignatureReflection,
  { hideName = false, arrowStyle = false }: { hideName?: boolean; arrowStyle?: boolean } = {}
): CodeToken[] {
  const tokens: CodeToken[] = [];

  // Add name unless hidden.
  if (!hideName) {
    tokens.push([props.name, 'name']);
  }

  // Add type params if exist surrounded with '<', '>'.
  if (props.typeParameters && props.typeParameters.length > 0) {
    tokens.push(
      ...withChevrons(
        joinType(
          ', ',
          props.typeParameters.map(item => [[item.name, 'name']])
        )
      )
    );
  }

  // Add params if exist surrounded with '(', ')'.
  tokens.push(
    ...withParens(
      joinType(
        ', ',
        (props.parameters ?? []).map(item => {
          const paramTokens: CodeToken[] = [];

          // Add name prefixed with '...' if it is a rest parameter.
          paramTokens.push(...withRest([[item.name, 'name']], item.flags.isRest));

          // Add '?: ' or ': ' depending of whether the parameter is optional.
          paramTokens.push([item.flags.isOptional || item.defaultValue ? '?: ' : ': ', 'symbol']);

          // Add parameter type.
          paramTokens.push(...type(item.type));

          return paramTokens;
        })
      ),
      true
    )
  );

  // Add return statement if exists.
  if (props.type) {
    tokens.push([arrowStyle ? ' => ' : ': ', 'symbol']);
    tokens.push(...type(props.type));
  }

  return tokens;
}

export function memberDeclaration(props: DeclarationReflection): CodeToken[] {
  const tokens: CodeToken[] = [];

  if (props.type) {
    if (props.typeParameters && props.typeParameters.length > 0) {
      tokens.push(...withChevrons(props.typeParameters.map(item => [item.name, 'name'] as CodeToken)));
    }
    tokens.push(...type(props.type));

    return tokens;
  }

  tokens.push([props.name, 'name']);

  if (props.typeParameters && props.typeParameters.length > 0) {
    tokens.push(...withChevrons(props.typeParameters.map(item => [item.name, 'name'] as CodeToken)));
  }

  if (props.defaultValue) {
    tokens.push([' = ', 'symbol']);
    tokens.push([props.defaultValue, 'type']);
  }

  return tokens;
}

export function memberGetter(props: DeclarationReflection): CodeToken[] {
  if (!props.getSignature) {
    return [];
  }
  return [['get ', 'symbol'], [props.name, 'name'], ...memberSignatureTitle(props.getSignature, { hideName: true })];
}

export function memberSetter(props: DeclarationReflection): CodeToken[] {
  if (!props.setSignature) {
    return [];
  }
  return [['set ', 'symbol'], [props.name, 'name'], ...memberSignatureTitle(props.setSignature, { hideName: true })];
}

export function literal(literal: string): CodeToken[] {
  return [[literal, 'type']];
}

const typeRenderers: {
  [K in keyof TypeKindMap]: (type: TypeKindMap[K], options: { needsParens?: boolean }) => CodeToken[];
} = {
  array(type) {
    return [...renderType(type.elementType, { needsParens: true }), ['[]', 'symbol']];
  },
  conditional(type, { needsParens }) {
    const tokens: CodeToken[] = [];

    tokens.push(...renderType(type.checkType, { needsParens: true }));
    tokens.push([' extends ', 'symbol']);
    tokens.push(...renderType(type.extendsType));
    tokens.push([' ? ', 'symbol']);
    tokens.push(...renderType(type.trueType));
    tokens.push([' : ', 'symbol']);
    tokens.push(...renderType(type.falseType));

    return withParens(tokens, needsParens);
  },
  indexedAccess(type) {
    return [...renderType(type.objectType), ...withBrackets(renderType(type.indexType))];
  },
  inferred(type) {
    return [
      ['infer ', 'symbol'],
      [type.name, 'name'],
    ];
  },
  intersection(type, { needsParens }) {
    return withParens(
      joinType(
        ' & ',
        type.types.map(item => renderType(item, { needsParens: true }))
      ),
      needsParens
    );
  },
  intrinsic(type) {
    return [[type.name, 'name']];
  },
  literal(type) {
    return [[JSON.stringify(type.value), 'type']];
  },
  mapped(type) {
    const tokens: CodeToken[] = [];

    switch (type.readonlyModifier) {
      case '+':
        tokens.push(['readonly ', 'symbol']);
        break;
      case '-':
        tokens.push(['-readonly', 'symbol']);
        break;
    }

    tokens.push(['[', 'symbol']);
    tokens.push([type.parameter, 'type']);
    tokens.push([' in ', 'symbol']);
    tokens.push(...renderType(type.parameterType));
    if (type.nameType) {
      tokens.push([' as ', 'symbol']);
      tokens.push(...renderType(type.nameType));
    }
    tokens.push([']', 'symbol']);

    switch (type.optionalModifier) {
      case '+':
        tokens.push(['?: ', 'symbol']);
        break;
      case '-':
        tokens.push(['-?: ', 'symbol']);
        break;
      default:
        tokens.push([': ', 'symbol']);
    }

    tokens.push(...renderType(type.templateType));

    return withBraces(tokens);
  },
  'named-tuple-member'(type) {
    return [[type.name, 'name'], [type.isOptional ? '?: ' : ': ', 'symbol'], ...renderType(type.element)];
  },
  optional(type) {
    return [...renderType(type.elementType), ['?', 'symbol']];
  },
  predicate(type) {
    const tokens: CodeToken[] = [];

    if (type.asserts) {
      tokens.push(['asserts ', 'symbol']);
    }

    tokens.push([type.name, 'name']);

    if (type.targetType) {
      tokens.push([' is ', 'symbol']);
      tokens.push(...renderType(type.targetType));
    }

    return tokens;
  },
  query(type) {
    return [['typeof ', 'symbol'], ...renderType(type.queryType)];
  },
  reference(type) {
    const tokens: CodeToken[] = [];

    if (type.reflection) {
      const isTypeParameter = type.reflection.kindOf(ReflectionKind.TypeParameter);
      tokens.push([
        type.reflection.name,
        'name',
        { path: !isTypeParameter ? buildReflectionPath(type.reflection) : undefined },
      ]);
    } else {
      tokens.push([type.name, 'name']);
    }

    if (type.typeArguments && type.typeArguments.length > 0) {
      tokens.push(
        ...withChevrons(
          joinType(
            ', ',
            type.typeArguments.map(item => renderType(item))
          )
        )
      );
    }

    return tokens;
  },
  reflection(type, { needsParens }) {
    const tokens: CodeToken[] = [];

    if (type.declaration.children) {
      return withBraces(
        joinType(
          '; ',
          type.declaration.children.map(item => {
            if (item.getSignature && item.setSignature) {
              return [[item.name, 'name'], [': ', 'symbol'], ...renderType(item.getSignature.type)];
            }

            if (item.getSignature) {
              return [
                ['get ', 'symbol'],
                [item.name, 'name'],
                ['(): ', 'symbol'],
                ...renderType(item.getSignature.type),
              ];
            }

            if (item.setSignature) {
              return [
                ['set ', 'symbol'],
                [item.name, 'name'],
                ...withParens(
                  (item.setSignature.parameters || []).flatMap(item => [
                    [item.name, 'name'],
                    [': ', 'symbol'],
                    ...renderType(item.type),
                  ]),
                  true
                ),
              ];
            }

            return [[item.name, 'name'], [item.flags.isOptional ? '?: ' : ': ', 'symbol'], ...renderType(item.type)];
          })
        )
      );
    }

    if (type.declaration.signatures?.length === 1) {
      return withParens(
        memberSignatureTitle(type.declaration.signatures[0], {
          hideName: true,
          arrowStyle: true,
        }),
        needsParens
      );
    }

    if (type.declaration.signatures) {
      return withBraces(type.declaration.signatures.flatMap(item => memberSignatureTitle(item, { hideName: true })));
    }

    return withBraces(tokens);
  },
  rest(type) {
    return [['...', 'symbol'], ...renderType(type.elementType)];
  },
  'template-literal'(type) {
    const tokens: CodeToken[] = [];

    if (type.head) {
      tokens.push([type.head, 'type']);
    }

    tokens.push(
      ...type.tail.flatMap(item => {
        const itemTokens: CodeToken[] = [];

        itemTokens.push(['${', 'symbol']);
        itemTokens.push(...renderType(item[0]));
        itemTokens.push(['}', 'symbol']);

        if (item[1]) {
          itemTokens.push([item[1], 'type']);
        }

        return itemTokens;
      })
    );

    return withBackticks(tokens);
  },
  tuple(type) {
    return withBrackets(
      joinType(
        ', ',
        type.elements.map(item => renderType(item))
      )
    );
  },
  typeOperator(type) {
    return [[type.operator + ' ', 'symbol'], ...renderType(type.target)];
  },
  union(type, { needsParens }) {
    return withParens(
      joinType(
        ' | ',
        type.types.map(item => renderType(item, { needsParens: true }))
      ),
      needsParens
    );
  },
  unknown(type) {
    return [[type.name, 'name']];
  },
};

function renderType(type: Type | undefined, options?: { needsParens?: boolean }): CodeToken[] {
  if (!type) {
    return [['any', 'type']];
  }
  const renderFn = typeRenderers[type.type];
  return renderFn(type as never, options ?? {});
}

function buildReflectionPath(reflection?: Reflection) {
  const url = [];

  while (reflection) {
    if (reflection.name) {
      url.push(reflection.name);
    }
    reflection = reflection.parent;
  }

  return url.reverse();
}
