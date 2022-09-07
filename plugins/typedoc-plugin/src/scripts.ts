// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as path from 'path';
import * as fs from 'fs';
import { Application, Renderer } from 'typedoc';

export function removeAssets(app: Application): void {
  app.renderer.on(Renderer.EVENT_END, () => {
    fs.rmSync(path.resolve(app.options.getValue('out'), 'assets'), { recursive: true, force: true });
  });
}
