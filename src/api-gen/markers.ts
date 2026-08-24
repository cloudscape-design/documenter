// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

declare const removed: unique symbol;

/**
 * Marks an interface property or a namespace member for removal.
 *
 * ```ts
 * import type * as ApiGen from '@cloudscape-design/documenter/api-gen/markers';
 *
 * declare module '@cloudscape-design/components/button' {
 *   export interface ButtonProps {
 *     style: ApiGen.Remove;
 *   }
 *   export namespace ButtonProps {
 *     export type Style = ApiGen.Remove;
 *   }
 * }
 * ```
 */
export type Remove = typeof removed;
