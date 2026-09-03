// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// This patch sits in a directory called `icon` but proxies `button`, which itself imports
// `../icon/interfaces`. The consumer's name and the upstream component want the same place.
declare module '@fixtures/upstream/button' {
  export interface ButtonProps {
    iconName: never;
  }
}
