// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import type { Remove } from '@cloudscape-design/documenter/api-gen/markers';
import type { CheckboxProps } from '@fixtures/upstream/checkbox';
import * as BoxTypes from '@fixtures/upstream/box';
import '@fixtures/upstream/button';

declare module '@fixtures/upstream/button' {
  export interface ButtonProps {
    onClick: Remove;
    /**
     * Wrapper applied around the button content.
     */
    wrapper?: BoxTypes.BoxProps;
    toggle?: CheckboxProps;
  }
}
