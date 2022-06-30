// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ReflectionKind, ParameterReflection } from 'typedoc';
import { ReferenceType, DeclarationReflection } from 'typedoc/dist/lib/models';

import { TestUtilMethod, Parameter } from '../interfaces';
import schema from '../../schema';

function getName(methodSignature: DeclarationReflection) {
  return methodSignature.name;
}

// TODO: Extend and reuse existing utils
function getReturnType(methodSignature: DeclarationReflection) {
  // Error is check in calling function
  // TODO: Get right type. "Type" does e.g. not have .name
  const signatureReturnType = (methodSignature.signatures![0] as any).type;
  if (signatureReturnType === undefined) {
    throw Error('expected return type to be defined');
  }

  const returnType = {
    name: signatureReturnType.name,
    type: signatureReturnType.type,
    typeArguments: getTypeArguments(signatureReturnType.typeArguments),
  };

  // TODO: Reuse schema.code.buildType
  if (schema.types.isArrayType(signatureReturnType)) {
    returnType.name = signatureReturnType.type;
    returnType.type = signatureReturnType.elementType.type;
    returnType.typeArguments = getTypeArguments((signatureReturnType.elementType as any).typeArguments.constraint);
  }

  // TODO: Try to reuse buildUnionTypeDefinition
  if (schema.types.isUnionType(signatureReturnType)) {
    // TODO: This doesn't work well with the website currently
    const returnTypeNames = signatureReturnType.types.map(t => (t as any).name).join(' | ');
    returnType.name = returnTypeNames;
  }

  return returnType;
}

function getTypeArguments(typeArguments: any) {
  if (typeArguments && typeArguments.map) {
    return typeArguments.map((arg: any) => ({ name: arg.name, type: arg.type }));
  }
}

// TODO: Reuse existing functionality in components
function getParameters(methodSignature: DeclarationReflection): Array<Parameter> {
  const parameters = methodSignature.signatures![0].parameters as Array<ParameterReflection> | undefined;
  if (!parameters) {
    return [];
  }

  const parametersDoc = parameters.map(param => ({
    name: param.name,
    typeName: (param.type as any)?.name,
    description: schema.code.buildNodeDescription(param),
    flags: { isOptional: param.flags.isOptional },
    defaultValue: param.defaultValue ? param.defaultValue.trim() : undefined,
  }));

  return parametersDoc;
}

function getInheritedFrom(methodSignature: DeclarationReflection) {
  let inheritedFrom = undefined;
  if (methodSignature.inheritedFrom) {
    inheritedFrom = {
      name: (methodSignature.inheritedFrom as ReferenceType).name,
    };
  }

  return inheritedFrom;
}

export function getMethodsDoc(childReflections: Array<DeclarationReflection> = []): Array<TestUtilMethod> {
  const methodReflections = childReflections.filter(child => {
    const isPublic = !child.flags.isPrivate && !child.flags.isProtected;
    const isMethod = child.kind === ReflectionKind.Method;
    return isPublic && isMethod;
  });

  // TODO: Try to reuse existing functionality from components
  const testUtilMethodsDocs = methodReflections.map(methodSignature => {
    if (!methodSignature.signatures) {
      throw new Error('Expected method to have signatures');
    }

    const outMethod: Partial<TestUtilMethod> = {};
    outMethod.name = getName(methodSignature);
    outMethod.description = schema.code.buildDeclarationDescription(methodSignature);
    outMethod.returnType = getReturnType(methodSignature);
    outMethod.parameters = getParameters(methodSignature);
    outMethod.inheritedFrom = getInheritedFrom(methodSignature);
    return outMethod as TestUtilMethod;
  });

  return testUtilMethodsDocs;
}
