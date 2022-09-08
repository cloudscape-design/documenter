// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

const docsJson = import.meta.glob('../../docs/**/nodes/**/*.json');

export interface DefinitionEntry {
  packageName: string;
  folder: string;
  name: string;
  fullName: string;
  definition: any;
}

export default function useDocs(): { [packageName: string]: DefinitionEntry[] } {
  const [docs, setDocs] = useState<{ [packageName: string]: DefinitionEntry[] }>({});

  useEffect(() => {
    Promise.all(
      Object.entries(docsJson)
        .filter(([path]) => !path.includes('components-definitions'))
        .map(([path, definitionImport]) => {
          path = path.replace('../../docs/', '');
          const [packageName, , folder, nameWithExtension] = path.split('/');
          const name = nameWithExtension.replace('.json', '');
          const fullName = folder + '/' + name;
          return definitionImport().then(definition => ({ packageName, folder, name, fullName, definition }));
        })
    ).then(results => {
      setDocs(
        results
          .sort((a, b) => a.fullName.localeCompare(b.fullName))
          .reduce((acc, result) => {
            if (!acc[result.packageName]) {
              acc[result.packageName] = [];
            }
            acc[result.packageName].push(result);
            return acc;
          }, {} as { [packageName: string]: DefinitionEntry[] })
      );
    });
  }, []);

  return docs;
}
