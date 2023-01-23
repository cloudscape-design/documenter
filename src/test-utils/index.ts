// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { TypeDocOptions } from 'typedoc';
import extractDocumentation from './extractor';
import { TestUtilsDoc } from './interfaces';
import { bootstrapProject } from '../bootstrap';

// TODO: Align API with components util
export function documentTestUtils(
  options: Partial<TypeDocOptions>,

  // It would be nicer to just specify the files via the inputFiles option.
  // However, that doesn't work with typedoc 0.17: https://github.com/TypeStrong/typedoc/issues/1263
  // As a workaround, we do the filtering ourselves in getTypeDocProject.
  filteringGlob: string
): Array<TestUtilsDoc> {
  const project = bootstrapProject(options, filteringGlob);
  const definitions = extractDocumentation(project);
  return definitions;
}
