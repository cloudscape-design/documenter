// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Application, OptionsReader, Options, Renderer } from 'typedoc';

import { CloudscapeTheme } from './theme';
import { removeAssets } from './scripts';

export function load(app: Application, Theme?: new (renderer: Renderer) => CloudscapeTheme): void {
  // Define custom theme with overridden html output and apply it as default.
  app.renderer.defineTheme('override', Theme || CloudscapeTheme);
  app.options.addReader(
    new (class implements OptionsReader {
      priority = 1000;
      name = 'override-theme-reader';
      read(container: Options) {
        if (container.getValue('theme') === 'default') {
          container.setValue('theme', 'override');
        }
      }
    })()
  );

  // Remove unneeded assets folder.
  removeAssets(app);
}
