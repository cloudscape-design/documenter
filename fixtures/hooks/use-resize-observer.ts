// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ContainerQueryEntry, ElementReference } from './interfaces';

/**
 * Attaches resize-observer to the referenced element.
 *
 * @remarks
 *
 * The hook has no control over the referenced element. It is up to the consumer to ensure
 * the element lifecycle and notify the hook by updating the `elementRef`.
 *
 * @example
 * With React reference
 * ```
 * const ref = useRef(null)
 * useResizeObserver(ref, (entry) => setState(getWidth(entry)))
 * ```
 *
 * @example
 * With ID reference
 * ```
 * const getElement = useCallback(() => document.getElementById(id), [id])
 * useResizeObserver(getElement, (entry) => setState(getWidth(entry)))
 * ```
 *
 * @param elementRef React reference or memoized getter for the target element
 * @param onObserve Function to fire when observation occurs
 */
export default function useResizeObserver(
  elementRef: ElementReference,
  onObserve: (entry: ContainerQueryEntry) => void
) {}
