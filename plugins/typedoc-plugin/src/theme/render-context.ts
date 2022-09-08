// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  DeclarationReflection,
  ParameterReflection,
  ReferenceReflection,
  Reflection,
  SignatureReflection,
  TypeParameterReflection,
} from 'typedoc';
import * as code from './code';
import { LayoutNode } from './layout';
import {
  comment,
  memberDeclaration,
  memberGetterSetter,
  memberReference,
  memberSignatureBody,
  memberSignatures,
  member,
  parameters,
  typeParameters,
} from './partials';

export interface IRenderContext<T> {
  comment(reflection: Reflection): null | T;
  memberDeclaration(reflection: DeclarationReflection): null | T;
  memberGetterSetter(reflection: DeclarationReflection): null | T;
  memberReference(reflection: ReferenceReflection): null | T;
  memberSignatureBody(reflection: SignatureReflection): null | T;
  memberSignatures(reflection: DeclarationReflection): null | T;
  member(reflection: DeclarationReflection): null | T;
  parameters(reflections?: ParameterReflection[]): null | T;
  typeParameters(reflections?: TypeParameterReflection[]): null | T;
}

// The context enables granular overrides of its members.
export default class RenderContext implements IRenderContext<LayoutNode> {
  // code
  code = code;

  // markdown
  markdown = (text: string): string => text;

  // layout
  comment = comment.bind(null, this);
  memberDeclaration = memberDeclaration.bind(null, this);
  memberGetterSetter = memberGetterSetter.bind(null, this);
  memberReference = memberReference.bind(null, this);
  memberSignatureBody = memberSignatureBody.bind(null, this);
  memberSignatures = memberSignatures.bind(null, this);
  member = member.bind(null, this);
  parameters = parameters.bind(null, this);
  typeParameters = typeParameters.bind(null, this);
}
