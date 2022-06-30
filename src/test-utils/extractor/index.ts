// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ReflectionKind, DeclarationReflection, ProjectReflection } from 'typedoc';

import { TestUtilsDoc } from '../interfaces';
import { getMethodsDoc } from './get-methods-doc';

function getWrapperClasses(project: ProjectReflection): Array<DeclarationReflection> {
  const projectClone = Object.assign({}, project);
  const wrapperClasses = projectClone.children
    ?.flatMap(child => child.children)
    .filter((child): child is DeclarationReflection => !!child && child.kind === ReflectionKind.Class);

  // Undefined values get filtered out before
  return wrapperClasses as Array<DeclarationReflection>;
}

export default function extractRelevantDocumentation(project: ProjectReflection): TestUtilsDoc[] {
  const wrapperClasses = getWrapperClasses(project);

  // TODO: Make this output structure match the components one
  const documentation: Array<TestUtilsDoc> = wrapperClasses.map(classDesc => {
    return {
      name: classDesc.name,
      methods: getMethodsDoc(classDesc.children || []),
    };
  });

  return documentation;
}
