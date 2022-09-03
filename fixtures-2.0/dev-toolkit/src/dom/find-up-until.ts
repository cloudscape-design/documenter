// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Checks if the current element or any of its parent is matched with `test` function.
 *
 * @example
 * Check if there is an ancestor with a CSS class matching regex
 * ```
 * const matchContext = (element) => element.className.match(/my-context-([\w-]+)/)
 * const contextElement = findUpUntil(currentElement, matchContext)
 * ```
 *
 * @param from Element to search from
 * @param test Returns `true` if the given element satisfies the search criteria
 * @returns First matched element or `null`
 */
export default function findUpUntil(from: HTMLElement, test: (element: HTMLElement) => boolean): HTMLElement | null {
  return null;
}
