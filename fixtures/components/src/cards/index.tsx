// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardsForwardRefType, CardsProps } from './interfaces';

export { CardsProps };

const Cards = React.forwardRef(function <T = any>(
  {
    items = [],
    cardDefinition,
    cardsPerRow = [],
    header,
    filter,
    pagination,
    preferences,
    empty,
    loading,
    loadingText,
    trackBy,
    selectedItems,
    selectionType,
    isItemDisabled,
    onSelectionChange,
    ariaLabels,
    visibleSections,
    stickyHeader,
    stickyHeaderVerticalOffset,
    variant = 'container',
    ...rest
  }: CardsProps<T>,
  ref: React.Ref<CardsProps.Ref>
) {
  // impl
  return null;
}) as CardsForwardRefType;

export default Cards;
