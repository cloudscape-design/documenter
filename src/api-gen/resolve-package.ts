// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import fs from 'node:fs';
import path from 'node:path';

export interface UpstreamFile {
  packageDir: string;
  filePath: string;
}

export function resolveUpstreamModule(moduleSpecifier: string, fromDir: string): UpstreamFile {
  const [scope, name, ...subpath] = moduleSpecifier.split('/');
  const packageDir = resolvePackageDir(`${scope}/${name}`, fromDir);
  const filePath = path.join(packageDir, ...subpath, 'interfaces.d.ts');
  return { packageDir, filePath };
}

export function resolveRelativeImport(specifier: string, fromDir: string): null | string {
  const target = path.resolve(fromDir, specifier).replace(/\.js$/, '');
  const candidate = `${target}.d.ts`;
  return fs.existsSync(candidate) ? candidate : null;
}

function resolvePackageDir(packageName: string, fromDir: string): string {
  let dir = path.resolve(fromDir);
  while (true) {
    const candidate = path.join(dir, 'node_modules', packageName);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(`Cannot resolve package "${packageName}" from ${fromDir}.`);
    }
    dir = parent;
  }
}
