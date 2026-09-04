// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as ts from 'ts-morph';

const LICENSE_HEADER = /^\/\/ Copyright Amazon\.com[^\n]*\r?\n\/\/ SPDX-License-Identifier:[^\n]*\r?\n+/;

export function toProxySource(project: ts.Project, emittedPath: string, sourceStr: string): ts.SourceFile {
  const source = project.createSourceFile(`out/${emittedPath}`, stripLicenseHeader(sourceStr));
  exportAmbientNamespaces(source);
  stripUpstreamTags(source);
  return source;
}

function stripLicenseHeader(declarations: string): string {
  return declarations.replace(LICENSE_HEADER, '');
}

/** In references *.d.ts files the namespace members are implicitly exported; real ones need explicit exports. */
function exportAmbientNamespaces(source: ts.SourceFile): void {
  for (const namespace of source.getModules()) {
    if (namespace.getDeclarationKind() === ts.ModuleDeclarationKind.Namespace) {
      addExports(namespace);
    }
  }

  function addExports(namespace: ts.ModuleDeclaration): void {
    namespace.setHasDeclareKeyword(false);

    // Remove `export {}` from the reference declarations.
    for (const exportDeclaration of namespace.getExportDeclarations()) {
      if (exportDeclaration.getNamedExports().length === 0) {
        exportDeclaration.remove();
      }
    }

    // Handle interfaces and type aliases.
    for (const member of [...namespace.getTypeAliases(), ...namespace.getInterfaces()]) {
      member.setIsExported(true);
    }

    // Handle nested namespaces.
    for (const nested of namespace.getModules()) {
      nested.setIsExported(true);
      addExports(nested);
    }
  }
}

const TAGS_TO_REMOVE = ['awsuiSystem', 'visualrefresh', 'displayname'];

/** Removes the annotations above, keeping any api-docs they sit beside. */
function stripUpstreamTags(source: ts.SourceFile): void {
  for (const jsDoc of source.getDescendantsOfKind(ts.SyntaxKind.JSDoc)) {
    for (const tag of jsDoc.getTags()) {
      if (TAGS_TO_REMOVE.includes(tag.getTagName())) {
        tag.remove();
      }
    }
    if (jsDoc.getInnerText().trim() === '') {
      jsDoc.remove();
    }
  }
}
