// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as path from 'path';
import * as fs from 'fs';
import { Application, Renderer, UrlMapping } from 'typedoc22';

export function createIndex(app: Application) {
  app.renderer.on(Renderer.EVENT_END, (context: any) => {
    const modules = context.urls.map((url: UrlMapping) => ({
      name: url.model.name,
      path: url.url,
      kind: url.model.kindString,
    }));
    const indexContent = JSON.stringify(modules, null, 2);

    fs.writeFileSync(path.resolve(app.options.getValue('out'), 'index.json'), indexContent);
  });
}

export function removeAssets(app: Application) {
  app.renderer.on(Renderer.EVENT_END, () => {
    fs.rmSync(path.resolve(app.options.getValue('out'), 'assets'), { recursive: true, force: true });
  });
}
