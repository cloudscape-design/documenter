// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import pathe from 'pathe';
import {
  generateProxyInterfaces,
  GenerateProxyInterfacesOptions,
  ProxyFile,
} from '../../src/api-gen/generate-proxy-interfaces';

export const FIXTURES_DIR = pathe.resolve('fixtures/api-gen');

export function getPatchPath(casePath: string, variant = 'interfaces') {
  const caseDir = pathe.join(FIXTURES_DIR, casePath);
  return pathe.join(caseDir, `${variant}.patch.d.ts`);
}

export function generateFixture(
  path: string,
  variant = 'interfaces',
  options?: Omit<GenerateProxyInterfacesOptions, 'entryPoints'>,
) {
  return generateProxyInterfaces({ entryPoints: [getPatchPath(path, variant)], ...options }).files;
}

export function generateFixtures(
  entryPoints: Array<[path: string, variant?: string]>,
  options?: Omit<GenerateProxyInterfacesOptions, 'entryPoints'>,
) {
  return generateProxyInterfaces({
    entryPoints: entryPoints.map(([path, variant]) => getPatchPath(path, variant)),
    ...options,
  }).files;
}

export function sourceOf(files: ProxyFile[], path: string) {
  const file = files.find(candidate => candidate.path === path)!;
  return file.source;
}
