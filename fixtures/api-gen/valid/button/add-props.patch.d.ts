// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

declare module '@fixtures/upstream/button' {
  export interface ButtonProps {
    /**
     * Annotation API-docs
     */
    annotation?: ButtonProps.Annotation;
  }

  export namespace ButtonProps {
    export type Annotation = string;
  }
}
