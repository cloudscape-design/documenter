// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import pathe from 'pathe';

export function setup() {
  const tmpDir = pathe.resolve('test/tmp');
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
