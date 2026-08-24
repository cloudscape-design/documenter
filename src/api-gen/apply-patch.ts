// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as ts from 'ts-morph';

import { Patch } from './parse-patch';

export function applyPatch(out: ts.SourceFile, patch: Patch): void {
  patchInterfaces(out, patch);
  patchNamespaces(out, patch);
  carryOverImports(out, patch);
}

function patchInterfaces(out: ts.SourceFile, patch: Patch) {
  for (const interfacePatch of patch.interfaces) {
    const outInterface = findInterface(interfacePatch.interfaceName);
    for (const override of removalsFirst(interfacePatch.propertyOverrides)) {
      if (override.declaration === undefined) {
        removeProperty(outInterface, override.propertyName);
      } else {
        insertProperty(outInterface, override.propertyName, override.declaration);
      }
    }
  }

  function findInterface(interfaceName: string) {
    const target = out.getInterface(interfaceName);
    if (!target) {
      throw patch.error(`Interface "${interfaceName}" does not exist in "${patch.moduleSpecifier}".`);
    }
    return target;
  }

  function removeProperty(outInterface: ts.InterfaceDeclaration, propertyName: string) {
    const existing = outInterface.getProperty(propertyName);
    if (existing) {
      existing.remove();
    } else {
      throw patch.error(`Property "${outInterface.getName()}.${propertyName}" cannot be removed (it does not exist).`);
    }
  }

  function insertProperty(outInterface: ts.InterfaceDeclaration, propertyName: string, propertyDeclaration: string) {
    const existing = outInterface.getProperty(propertyName);
    existing?.remove();
    outInterface.addMember(dedentJsDoc(propertyDeclaration));
  }
}

function patchNamespaces(out: ts.SourceFile, patch: Patch) {
  for (const namespacePatch of patch.namespaces) {
    const outNamespace = findNamespace(namespacePatch.namespaceName);
    for (const override of removalsFirst(namespacePatch.memberOverrides)) {
      if (override.declaration === undefined) {
        removeMember(outNamespace, override.memberName);
      } else {
        insertMember(outNamespace, override.memberName, override.declaration);
      }
    }
  }

  function findNamespace(namespaceName: string) {
    const namespaces = out.getModules().filter(m => m.getDeclarationKind() === ts.ModuleDeclarationKind.Namespace);
    const target = namespaces.find(ns => ns.getName() === namespaceName);
    if (!target) {
      throw patch.error(`Namespace "${namespaceName}" does not exist in "${patch.moduleSpecifier}".`);
    }
    return target;
  }

  function removeMember(outNamespace: ts.ModuleDeclaration, memberName: string) {
    const existing = findExistingMembers(outNamespace, memberName);
    if (existing.length > 0) {
      existing.forEach(member => member.remove());
    } else {
      throw patch.error(`Member "${outNamespace.getName()}.${memberName}" cannot be removed (it does not exist).`);
    }
  }

  function insertMember(outNamespace: ts.ModuleDeclaration, memberName: string, memberDeclaration: string) {
    findExistingMembers(outNamespace, memberName).forEach(member => member.remove());
    outNamespace.addStatements(dedentJsDoc(memberDeclaration));
  }

  function findExistingMembers(outNamespace: ts.ModuleDeclaration, namespaceName: string) {
    return [
      outNamespace.getTypeAlias(namespaceName),
      outNamespace.getInterface(namespaceName),
      outNamespace.getModule(namespaceName),
    ].filter(declaration => declaration !== undefined);
  }
}

function carryOverImports(out: ts.SourceFile, patch: Patch) {
  out.addImportDeclarations(patch.imports);
}

function removalsFirst<T extends { declaration?: string }>(overrides: T[]): T[] {
  return [...overrides].sort((a, b) => Number(a.declaration !== undefined) - Number(b.declaration !== undefined));
}

/** Normalizes indentation of the js-docs when they are carried over from the patch file. */
function dedentJsDoc(jsDoc: string): string {
  return jsDoc.replace(/\n[ \t]*\*/g, '\n *');
}
