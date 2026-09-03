// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as ts from 'ts-morph';

const MARKERS_MODULE = '@cloudscape-design/documenter/api-gen/markers';
const MARKERS = ['Remove'] as const;

export interface Patch {
  patchPath: string;
  moduleSpecifier: string;
  imports: ts.ImportDeclarationStructure[];
  interfaces: InterfacePatch[];
  namespaces: NamespacePatch[];
  error: (message: string) => Error;
}

interface InterfacePatch {
  interfaceName: string;
  propertyOverrides: InterfacePropertyOverride[];
}

interface InterfacePropertyOverride {
  propertyName: string;
  declaration?: string;
}

interface NamespacePatch {
  namespaceName: string;
  memberOverrides: NamespaceMemberOverride[];
}

interface NamespaceMemberOverride {
  memberName: string;
  declaration?: string;
}

type PatchableMember = ts.PropertySignature | ts.TypeAliasDeclaration | ts.InterfaceDeclaration;

export function parsePatch(patch: ts.SourceFile, patchPath: string): Patch {
  const augmentation = patch.getModules().find(m => m.getDeclarationKind() === ts.ModuleDeclarationKind.Module);
  if (!augmentation) {
    throw new Error('The patch must contain a `declare module "..."` augmentation.');
  }

  const matchMarker = createMarkerMatcher(patch);
  const override = (member: PatchableMember) =>
    matchMarker(member) !== 'Remove' ? { declaration: member.getText({ includeJsDocComments: true }) } : {};

  return {
    patchPath,
    moduleSpecifier: augmentation.compilerNode.name.text,
    imports: collectImports(patch),
    interfaces: augmentation.getInterfaces().map(i => ({
      interfaceName: i.getName(),
      propertyOverrides: i
        .getProperties()
        .map(property => ({ propertyName: property.getName(), ...override(property) })),
    })),
    namespaces: augmentation
      .getModules()
      .filter(m => m.getDeclarationKind() === ts.ModuleDeclarationKind.Namespace)
      .map(ns => ({
        namespaceName: ns.getName(),
        memberOverrides: getNsMembers(ns).map(member => ({ memberName: member.getName(), ...override(member) })),
      })),
    error: message => new Error(`${patchPath}: ${message}`),
  };
}

function getNsMembers(namespace: ts.ModuleDeclaration) {
  return namespace.getStatements().map(statement => {
    if (ts.Node.isTypeAliasDeclaration(statement) || ts.Node.isInterfaceDeclaration(statement)) {
      return statement;
    } else {
      const name = `${namespace.getName()}.${statement.getSymbol()?.getName() ?? statement.getKindName()}`;
      throw new Error(`A namespace patch may declare only type aliases and interfaces; "${name}" is neither.`);
    }
  });
}

function collectImports(patch: ts.SourceFile): ts.ImportDeclarationStructure[] {
  return patch
    .getImportDeclarations()
    .filter(declaration => declaration.getModuleSpecifierValue() !== MARKERS_MODULE)
    .map(declaration => declaration.getStructure());
}

type Marker = (typeof MARKERS)[number];
type MatchMarker = (member: PatchableMember) => null | Marker;

function createMarkerMatcher(patch: ts.SourceFile): MatchMarker {
  const typeToMarker = new Map<string, Marker>();
  for (const declaration of patch.getImportDeclarations()) {
    // Ignore any import other than from '…/api-gen/markers'.
    if (declaration.getModuleSpecifierValue() !== MARKERS_MODULE) {
      continue;
    }
    // Handle `import { Remove } from '…/api-gen/markers'` or `import { Remove as Drop } from '…/api-gen/markers'`.
    for (const namedImport of declaration.getNamedImports()) {
      const marker = MARKERS.find(marker => marker === namedImport.getName());
      if (marker) {
        const aliasName = namedImport.getAliasNode()?.getText();
        const typeName = aliasName ?? namedImport.getName();
        typeToMarker.set(typeName, marker);
      }
    }
    // Handle `import * as ApiGen from '…/api-gen/markers'`.
    const namespaceImport = declaration.getNamespaceImport();
    if (namespaceImport) {
      MARKERS.forEach(marker => typeToMarker.set(`${namespaceImport.getText()}.${marker}`, marker));
    }
  }
  return member => {
    // Only a property or a type alias can carry a marker.
    const typeText = ts.Node.isInterfaceDeclaration(member) ? undefined : member.getTypeNode()?.getText();
    return typeText === undefined ? null : (typeToMarker.get(typeText) ?? null);
  };
}
