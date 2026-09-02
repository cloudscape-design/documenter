// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { readFileSync } from 'node:fs';
import path from 'node:path';
import * as ts from 'ts-morph';

import { applyPatch } from './apply-patch';
import { Patch, parsePatch } from './parse-patch';
import { resolveRelativeImport, resolveUpstreamModule } from './resolve-package';
import { toProxySource } from './to-proxy-source';

export interface UpstreamImport {
  /** Path of the emitted file holding the import, e.g. `select/interfaces.ts`. */
  sourcePath: string;
  /** Absolute path of the upstream declaration file the import resolves to. */
  resolvedPath: string;
  /** Specifier as the upstream declaration file wrote it. */
  importSpecifier: string;
}

export interface GenerateProxyInterfacesOptions {
  /** Paths to patch files of the components to proxy. */
  entryPoints: string[];
  /** Override the specifier an emitted import is written with. Return `{}` to keep it unchanged. */
  resolveImport?: ResolveImport;
}

type ResolveImport = (imported: UpstreamImport) => { importSpecifier?: string };

export interface GenerateProxyInterfacesResult {
  /** The proxied interfaces and everything they depend on, ordered by path. */
  files: ProxyFile[];
}

export interface ProxyFile {
  /** Place in the proxy tree: the directory the consumer gave a proxied component, upstream's own otherwise. */
  path: string;
  /** Generated source with license header and awsui-system tags removed. */
  source: string;
}

interface PendingFile {
  /** Upstream declaration file to read. */
  upstreamPath: string;
  /** Where the file belongs in the proxy tree. */
  emittedPath: string;
  /** Package the file belongs to, from which the paths of the files it reaches are derived. */
  packageDir: string;
  /** Set when an entry point named this file: the patch to apply to it. */
  patch?: Patch;
}

/**
 * Generate the interfaces for a set of proxied components. Each entry point names one upstream
 * component to proxy and may patch its declarations, or leave them as they are. The result holds
 * those interfaces and everything they reach, down to the shared public types, all transformed alike
 * so the emitted tree resolves within itself.
 */
export function generateProxyInterfaces({
  entryPoints,
  resolveImport,
}: GenerateProxyInterfacesOptions): GenerateProxyInterfacesResult {
  const project = new ts.Project({
    useInMemoryFileSystem: true,
    manipulationSettings: { indentationText: ts.IndentationText.TwoSpaces, quoteKind: ts.QuoteKind.Single },
  });

  const pending = entryPoints.map(entryPath => readPatch(project, entryPath));
  const emitted = new Map<string, ProxyFile>();
  const queueKey = (file: PendingFile) => `${file.upstreamPath}\n${file.emittedPath}`;
  const queued = new Set(pending.map(queueKey));

  while (pending.length > 0) {
    const file = pending.shift()!;
    if (emitted.has(file.emittedPath)) {
      throw new Error(`Two declarations claim the place "${file.emittedPath}" in the proxy tree.`);
    }

    // Transform upstream interfaces that correspond to the given file path.
    const out = toProxySource(project, file.emittedPath, readFileSync(file.upstreamPath, 'utf-8'));

    // Follow file's relative imports to pull its dependencies, such as other components or shared types.
    for (const reached of followImports(out, file, resolveImport)) {
      if (!queued.has(queueKey(reached))) {
        queued.add(queueKey(reached));
        pending.push(reached);
      }
    }

    // A file reached through imports has no patch of its own.
    if (file.patch) {
      applyPatch(out, file.patch);
    }

    out.formatText({ indentSize: 2, convertTabsToSpaces: true });
    emitted.set(file.emittedPath, { path: file.emittedPath, source: out.getFullText() });
  }

  return { files: [...emitted.values()].sort((a, b) => a.path.localeCompare(b.path)) };
}

function readPatch(project: ts.Project, patchPath: string): PendingFile {
  try {
    const patchSource = readFileSync(patchPath, 'utf-8');
    const patch = parsePatch(
      project.createSourceFile(`patch/${patchPath}`, patchSource, { overwrite: true }),
      patchPath,
    );
    const upstream = resolveUpstreamModule(patch.moduleSpecifier, path.dirname(path.resolve(patchPath)));
    return {
      upstreamPath: upstream.filePath,
      emittedPath: createEmittedPathFromPatchPath(patchPath),
      packageDir: upstream.packageDir,
      patch,
    };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `${patchPath}: ${error.message}`;
    }
    throw error;
  }
}

function followImports(source: ts.SourceFile, file: PendingFile, resolveImport?: ResolveImport): PendingFile[] {
  const reached: PendingFile[] = [];
  const resolvedReferences = getResolvedReferences(source, path.dirname(file.upstreamPath));
  for (const { reference, resolvedPath, importSpecifier } of resolvedReferences) {
    if (resolveImport) {
      const override = resolveImport({ sourcePath: file.emittedPath, resolvedPath, importSpecifier });
      if (override?.importSpecifier !== undefined) {
        reference.setModuleSpecifier(override.importSpecifier);
      }
    }
    reached.push({
      upstreamPath: resolvedPath,
      emittedPath: createEmittedPathFromUpstreamPath(resolvedPath, file.packageDir),
      packageDir: file.packageDir,
    });
  }
  return reached;
}

function getResolvedReferences(source: ts.SourceFile, fromDir: string) {
  const references = new Array<{ reference: ts.ImportDeclaration; importSpecifier: string; resolvedPath: string }>();
  for (const reference of source.getImportDeclarations()) {
    const importSpecifier = reference.getModuleSpecifierValue();
    if (!reference.isModuleSpecifierRelative()) {
      continue;
    }
    const resolvedPath = resolveRelativeImport(importSpecifier, fromDir);
    if (resolvedPath) {
      references.push({ reference, importSpecifier, resolvedPath });
    }
  }
  return references;
}

function createEmittedPathFromPatchPath(patchPath: string) {
  let emittedPath = patchPath; // 1. Start from patch path, e.g. "./src/button/interfaces.patch.d.ts"
  emittedPath = path.dirname(emittedPath); // 2. ... -> "./src/button"
  emittedPath = path.basename(emittedPath); // 3. ... -> "button"
  emittedPath = `${emittedPath}/interfaces.ts`; // 4. ... -> "button/interfaces.ts"
  return emittedPath;
}

function createEmittedPathFromUpstreamPath(resolvedPath: string, packageDir: string) {
  let emittedPath = resolvedPath; // 1. Start from resolved path, e.g. "/repo/node_modules/@cloudscape-design/components/icon/interfaces.d.ts"
  emittedPath = path.relative(packageDir, emittedPath); // 2. ... -> "icon/interfaces.d.ts"
  emittedPath = emittedPath.split(path.sep).join('/'); // 3. ... unchanged on POSIX, backslashes to slashes on Windows
  emittedPath = emittedPath.replace(/\.d\.ts$/, '.ts'); // 4. ... -> "icon/interfaces.ts"
  return emittedPath;
}
