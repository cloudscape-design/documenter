// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const docs = import.meta.glob('../../docs/**/*.json');

interface DefinitionEntry {
  namespace: string;
  folder: string;
  name: string;
  promise: Promise<any>;
}

const allEntries: DefinitionEntry[] = Object.entries(docs)
  .filter(([name]) => !name.endsWith('index.json'))
  .map(([path, definitionImport]) => {
    path = path.replace('../../docs/', '');
    const [namespace, folder, name] = path.split('/');
    return { namespace, folder, name: name.replace('.json', ''), promise: definitionImport() };
  });

export default Object.entries(
  allEntries.reduce((acc, entry) => {
    if (!acc[entry.namespace]) {
      acc[entry.namespace] = [];
    }
    acc[entry.namespace].push(entry);

    return acc;
  }, {} as { [key: string]: DefinitionEntry[] })
);
