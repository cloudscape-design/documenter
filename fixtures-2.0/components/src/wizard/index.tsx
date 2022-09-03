// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { WizardProps } from './interfaces';

export { WizardProps };

export default function Wizard({
  steps,
  activeStepIndex: controlledActiveStepIndex,
  i18nStrings,
  isLoadingNextStep = false,
  allowSkipTo = false,
  secondaryActions,
  onCancel,
  onSubmit,
  onNavigate,
  ...rest
}: WizardProps) {
  // impl
}
