// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export namespace CodeEditorProps {
  // This simulates the pattern used in the code editor where we want:
  // 1. Autocomplete for known language literals
  // 2. Allow custom string values
  export type Language = 'javascript' | 'html' | 'ruby' | 'python' | 'java' | (string & { _?: undefined });
}

export interface CodeEditorProps {
  /**
   * Specifies the programming language.
   */
  language: CodeEditorProps.Language;
}

export default function CodeEditor({ language }: CodeEditorProps) {
  return <div data-language={language}>Code Editor</div>;
}
