// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { IRenderContext } from '../../../typedoc-plugin/lib/theme/render-context';
import { DefinitionNode } from './definition';
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

export default class RenderContext implements IRenderContext<DefinitionNode> {
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
