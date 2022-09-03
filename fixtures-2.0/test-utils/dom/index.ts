// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
import { appendSelector } from '@cloudscape-design/test-utils-core/utils';
export { ElementWrapper };

import AlertWrapper from './alert';
export { AlertWrapper };

import AnnotationWrapper from './annotation';
export { AnnotationWrapper };

import AppLayoutWrapper from './app-layout';
export { AppLayoutWrapper };

import AreaChartWrapper from './area-chart';
export { AreaChartWrapper };

import AttributeEditorWrapper from './attribute-editor';
export { AttributeEditorWrapper };

import AutosuggestWrapper from './autosuggest';
export { AutosuggestWrapper };

import BadgeWrapper from './badge';
export { BadgeWrapper };

import BarChartWrapper from './bar-chart';
export { BarChartWrapper };

import BoxWrapper from './box';
export { BoxWrapper };

import BreadcrumbGroupWrapper from './breadcrumb-group';
export { BreadcrumbGroupWrapper };

import ButtonWrapper from './button';
export { ButtonWrapper };

import ButtonDropdownWrapper from './button-dropdown';
export { ButtonDropdownWrapper };

import CardsWrapper from './cards';
export { CardsWrapper };

import CheckboxWrapper from './checkbox';
export { CheckboxWrapper };

import CodeEditorWrapper from './code-editor';
export { CodeEditorWrapper };

import CollectionPreferencesWrapper from './collection-preferences';
export { CollectionPreferencesWrapper };

import ColumnLayoutWrapper from './column-layout';
export { ColumnLayoutWrapper };

import ContainerWrapper from './container';
export { ContainerWrapper };

import DatePickerWrapper from './date-picker';
export { DatePickerWrapper };

import DateRangePickerWrapper from './date-range-picker';
export { DateRangePickerWrapper };

import ExpandableSectionWrapper from './expandable-section';
export { ExpandableSectionWrapper };

import FlashbarWrapper from './flashbar';
export { FlashbarWrapper };

import FormWrapper from './form';
export { FormWrapper };

import FormFieldWrapper from './form-field';
export { FormFieldWrapper };

import GridWrapper from './grid';
export { GridWrapper };

import HeaderWrapper from './header';
export { HeaderWrapper };

import HelpPanelWrapper from './help-panel';
export { HelpPanelWrapper };

import HotspotWrapper from './hotspot';
export { HotspotWrapper };

import IconWrapper from './icon';
export { IconWrapper };

import InputWrapper from './input';
export { InputWrapper };

import LineChartWrapper from './line-chart';
export { LineChartWrapper };

import LinkWrapper from './link';
export { LinkWrapper };

import MixedLineBarChartWrapper from './mixed-line-bar-chart';
export { MixedLineBarChartWrapper };

import ModalWrapper from './modal';
export { ModalWrapper };

import MultiselectWrapper from './multiselect';
export { MultiselectWrapper };

import PaginationWrapper from './pagination';
export { PaginationWrapper };

import PieChartWrapper from './pie-chart';
export { PieChartWrapper };

import PopoverWrapper from './popover';
export { PopoverWrapper };

import ProgressBarWrapper from './progress-bar';
export { ProgressBarWrapper };

import PropertyFilterWrapper from './property-filter';
export { PropertyFilterWrapper };

import RadioGroupWrapper from './radio-group';
export { RadioGroupWrapper };

import S3ResourceSelectorWrapper from './s3-resource-selector';
export { S3ResourceSelectorWrapper };

import SegmentedControlWrapper from './segmented-control';
export { SegmentedControlWrapper };

import SelectWrapper from './select';
export { SelectWrapper };

import SideNavigationWrapper from './side-navigation';
export { SideNavigationWrapper };

import SpaceBetweenWrapper from './space-between';
export { SpaceBetweenWrapper };

import SpinnerWrapper from './spinner';
export { SpinnerWrapper };

import SplitPanelWrapper from './split-panel';
export { SplitPanelWrapper };

import StatusIndicatorWrapper from './status-indicator';
export { StatusIndicatorWrapper };

import TableWrapper from './table';
export { TableWrapper };

import TabsWrapper from './tabs';
export { TabsWrapper };

import TagEditorWrapper from './tag-editor';
export { TagEditorWrapper };

import TextContentWrapper from './text-content';
export { TextContentWrapper };

import TextFilterWrapper from './text-filter';
export { TextFilterWrapper };

import TextareaWrapper from './textarea';
export { TextareaWrapper };

import TilesWrapper from './tiles';
export { TilesWrapper };

import TimeInputWrapper from './time-input';
export { TimeInputWrapper };

import ToggleWrapper from './toggle';
export { ToggleWrapper };

import TokenGroupWrapper from './token-group';
export { TokenGroupWrapper };

import TopNavigationWrapper from './top-navigation';
export { TopNavigationWrapper };

import TutorialPanelWrapper from './tutorial-panel';
export { TutorialPanelWrapper };

import WizardWrapper from './wizard';
export { WizardWrapper };

declare module '@cloudscape-design/test-utils-core/dist/dom' {
  interface ElementWrapper {
    findAlert(selector?: string): AlertWrapper | null;
    findAnnotation(selector?: string): AnnotationWrapper | null;
    findAppLayout(selector?: string): AppLayoutWrapper | null;
    findAreaChart(selector?: string): AreaChartWrapper | null;
    findAttributeEditor(selector?: string): AttributeEditorWrapper | null;
    findAutosuggest(selector?: string): AutosuggestWrapper | null;
    findBadge(selector?: string): BadgeWrapper | null;
    findBarChart(selector?: string): BarChartWrapper | null;
    findBox(selector?: string): BoxWrapper | null;
    findBreadcrumbGroup(selector?: string): BreadcrumbGroupWrapper | null;
    findButton(selector?: string): ButtonWrapper | null;
    findButtonDropdown(selector?: string): ButtonDropdownWrapper | null;
    findCards(selector?: string): CardsWrapper | null;
    findCheckbox(selector?: string): CheckboxWrapper | null;
    findCodeEditor(selector?: string): CodeEditorWrapper | null;
    findCollectionPreferences(selector?: string): CollectionPreferencesWrapper | null;
    findColumnLayout(selector?: string): ColumnLayoutWrapper | null;
    findContainer(selector?: string): ContainerWrapper | null;
    findDatePicker(selector?: string): DatePickerWrapper | null;
    findDateRangePicker(selector?: string): DateRangePickerWrapper | null;
    findExpandableSection(selector?: string): ExpandableSectionWrapper | null;
    findFlashbar(selector?: string): FlashbarWrapper | null;
    findForm(selector?: string): FormWrapper | null;
    findFormField(selector?: string): FormFieldWrapper | null;
    findGrid(selector?: string): GridWrapper | null;
    findHeader(selector?: string): HeaderWrapper | null;
    findHelpPanel(selector?: string): HelpPanelWrapper | null;
    findHotspot(selector?: string): HotspotWrapper | null;
    findIcon(selector?: string): IconWrapper | null;
    findInput(selector?: string): InputWrapper | null;
    findLineChart(selector?: string): LineChartWrapper | null;
    findLink(selector?: string): LinkWrapper | null;
    findMixedLineBarChart(selector?: string): MixedLineBarChartWrapper | null;
    findModal(selector?: string): ModalWrapper | null;
    findMultiselect(selector?: string): MultiselectWrapper | null;
    findPagination(selector?: string): PaginationWrapper | null;
    findPieChart(selector?: string): PieChartWrapper | null;
    findPopover(selector?: string): PopoverWrapper | null;
    findProgressBar(selector?: string): ProgressBarWrapper | null;
    findPropertyFilter(selector?: string): PropertyFilterWrapper | null;
    findRadioGroup(selector?: string): RadioGroupWrapper | null;
    findS3ResourceSelector(selector?: string): S3ResourceSelectorWrapper | null;
    findSegmentedControl(selector?: string): SegmentedControlWrapper | null;
    findSelect(selector?: string): SelectWrapper | null;
    findSideNavigation(selector?: string): SideNavigationWrapper | null;
    findSpaceBetween(selector?: string): SpaceBetweenWrapper | null;
    findSpinner(selector?: string): SpinnerWrapper | null;
    findSplitPanel(selector?: string): SplitPanelWrapper | null;
    findStatusIndicator(selector?: string): StatusIndicatorWrapper | null;
    findTable(selector?: string): TableWrapper | null;
    findTabs(selector?: string): TabsWrapper | null;
    findTagEditor(selector?: string): TagEditorWrapper | null;
    findTextContent(selector?: string): TextContentWrapper | null;
    findTextFilter(selector?: string): TextFilterWrapper | null;
    findTextarea(selector?: string): TextareaWrapper | null;
    findTiles(selector?: string): TilesWrapper | null;
    findTimeInput(selector?: string): TimeInputWrapper | null;
    findToggle(selector?: string): ToggleWrapper | null;
    findTokenGroup(selector?: string): TokenGroupWrapper | null;
    findTopNavigation(selector?: string): TopNavigationWrapper | null;
    findTutorialPanel(selector?: string): TutorialPanelWrapper | null;
    findWizard(selector?: string): WizardWrapper | null;
  }
}
ElementWrapper.prototype.findAlert = function (selector) {
  const rootSelector = `.${AlertWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, AlertWrapper);
};
ElementWrapper.prototype.findAnnotation = function (selector) {
  const rootSelector = `.${AnnotationWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    AnnotationWrapper
  );
};
ElementWrapper.prototype.findAppLayout = function (selector) {
  const rootSelector = `.${AppLayoutWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    AppLayoutWrapper
  );
};
ElementWrapper.prototype.findAreaChart = function (selector) {
  const rootSelector = `.${AreaChartWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    AreaChartWrapper
  );
};
ElementWrapper.prototype.findAttributeEditor = function (selector) {
  const rootSelector = `.${AttributeEditorWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    AttributeEditorWrapper
  );
};
ElementWrapper.prototype.findAutosuggest = function (selector) {
  const rootSelector = `.${AutosuggestWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    AutosuggestWrapper
  );
};
ElementWrapper.prototype.findBadge = function (selector) {
  const rootSelector = `.${BadgeWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, BadgeWrapper);
};
ElementWrapper.prototype.findBarChart = function (selector) {
  const rootSelector = `.${BarChartWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, BarChartWrapper);
};
ElementWrapper.prototype.findBox = function (selector) {
  const rootSelector = `.${BoxWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, BoxWrapper);
};
ElementWrapper.prototype.findBreadcrumbGroup = function (selector) {
  const rootSelector = `.${BreadcrumbGroupWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    BreadcrumbGroupWrapper
  );
};
ElementWrapper.prototype.findButton = function (selector) {
  const rootSelector = `.${ButtonWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, ButtonWrapper);
};
ElementWrapper.prototype.findButtonDropdown = function (selector) {
  const rootSelector = `.${ButtonDropdownWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    ButtonDropdownWrapper
  );
};
ElementWrapper.prototype.findCards = function (selector) {
  const rootSelector = `.${CardsWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, CardsWrapper);
};
ElementWrapper.prototype.findCheckbox = function (selector) {
  const rootSelector = `.${CheckboxWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, CheckboxWrapper);
};
ElementWrapper.prototype.findCodeEditor = function (selector) {
  const rootSelector = `.${CodeEditorWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    CodeEditorWrapper
  );
};
ElementWrapper.prototype.findCollectionPreferences = function (selector) {
  const rootSelector = `.${CollectionPreferencesWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    CollectionPreferencesWrapper
  );
};
ElementWrapper.prototype.findColumnLayout = function (selector) {
  const rootSelector = `.${ColumnLayoutWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    ColumnLayoutWrapper
  );
};
ElementWrapper.prototype.findContainer = function (selector) {
  const rootSelector = `.${ContainerWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    ContainerWrapper
  );
};
ElementWrapper.prototype.findDatePicker = function (selector) {
  const rootSelector = `.${DatePickerWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    DatePickerWrapper
  );
};
ElementWrapper.prototype.findDateRangePicker = function (selector) {
  const rootSelector = `.${DateRangePickerWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    DateRangePickerWrapper
  );
};
ElementWrapper.prototype.findExpandableSection = function (selector) {
  const rootSelector = `.${ExpandableSectionWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    ExpandableSectionWrapper
  );
};
ElementWrapper.prototype.findFlashbar = function (selector) {
  const rootSelector = `.${FlashbarWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, FlashbarWrapper);
};
ElementWrapper.prototype.findForm = function (selector) {
  const rootSelector = `.${FormWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, FormWrapper);
};
ElementWrapper.prototype.findFormField = function (selector) {
  const rootSelector = `.${FormFieldWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    FormFieldWrapper
  );
};
ElementWrapper.prototype.findGrid = function (selector) {
  const rootSelector = `.${GridWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, GridWrapper);
};
ElementWrapper.prototype.findHeader = function (selector) {
  const rootSelector = `.${HeaderWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, HeaderWrapper);
};
ElementWrapper.prototype.findHelpPanel = function (selector) {
  const rootSelector = `.${HelpPanelWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    HelpPanelWrapper
  );
};
ElementWrapper.prototype.findHotspot = function (selector) {
  const rootSelector = `.${HotspotWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, HotspotWrapper);
};
ElementWrapper.prototype.findIcon = function (selector) {
  const rootSelector = `.${IconWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, IconWrapper);
};
ElementWrapper.prototype.findInput = function (selector) {
  const rootSelector = `.${InputWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, InputWrapper);
};
ElementWrapper.prototype.findLineChart = function (selector) {
  const rootSelector = `.${LineChartWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    LineChartWrapper
  );
};
ElementWrapper.prototype.findLink = function (selector) {
  const rootSelector = `.${LinkWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, LinkWrapper);
};
ElementWrapper.prototype.findMixedLineBarChart = function (selector) {
  const rootSelector = `.${MixedLineBarChartWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    MixedLineBarChartWrapper
  );
};
ElementWrapper.prototype.findModal = function (selector) {
  const rootSelector = `.${ModalWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, ModalWrapper);
};
ElementWrapper.prototype.findMultiselect = function (selector) {
  const rootSelector = `.${MultiselectWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    MultiselectWrapper
  );
};
ElementWrapper.prototype.findPagination = function (selector) {
  const rootSelector = `.${PaginationWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    PaginationWrapper
  );
};
ElementWrapper.prototype.findPieChart = function (selector) {
  const rootSelector = `.${PieChartWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, PieChartWrapper);
};
ElementWrapper.prototype.findPopover = function (selector) {
  const rootSelector = `.${PopoverWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, PopoverWrapper);
};
ElementWrapper.prototype.findProgressBar = function (selector) {
  const rootSelector = `.${ProgressBarWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    ProgressBarWrapper
  );
};
ElementWrapper.prototype.findPropertyFilter = function (selector) {
  const rootSelector = `.${PropertyFilterWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    PropertyFilterWrapper
  );
};
ElementWrapper.prototype.findRadioGroup = function (selector) {
  const rootSelector = `.${RadioGroupWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    RadioGroupWrapper
  );
};
ElementWrapper.prototype.findS3ResourceSelector = function (selector) {
  const rootSelector = `.${S3ResourceSelectorWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    S3ResourceSelectorWrapper
  );
};
ElementWrapper.prototype.findSegmentedControl = function (selector) {
  const rootSelector = `.${SegmentedControlWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    SegmentedControlWrapper
  );
};
ElementWrapper.prototype.findSelect = function (selector) {
  const rootSelector = `.${SelectWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, SelectWrapper);
};
ElementWrapper.prototype.findSideNavigation = function (selector) {
  const rootSelector = `.${SideNavigationWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    SideNavigationWrapper
  );
};
ElementWrapper.prototype.findSpaceBetween = function (selector) {
  const rootSelector = `.${SpaceBetweenWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    SpaceBetweenWrapper
  );
};
ElementWrapper.prototype.findSpinner = function (selector) {
  const rootSelector = `.${SpinnerWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, SpinnerWrapper);
};
ElementWrapper.prototype.findSplitPanel = function (selector) {
  const rootSelector = `.${SplitPanelWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    SplitPanelWrapper
  );
};
ElementWrapper.prototype.findStatusIndicator = function (selector) {
  const rootSelector = `.${StatusIndicatorWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    StatusIndicatorWrapper
  );
};
ElementWrapper.prototype.findTable = function (selector) {
  const rootSelector = `.${TableWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, TableWrapper);
};
ElementWrapper.prototype.findTabs = function (selector) {
  const rootSelector = `.${TabsWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, TabsWrapper);
};
ElementWrapper.prototype.findTagEditor = function (selector) {
  const rootSelector = `.${TagEditorWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    TagEditorWrapper
  );
};
ElementWrapper.prototype.findTextContent = function (selector) {
  const rootSelector = `.${TextContentWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    TextContentWrapper
  );
};
ElementWrapper.prototype.findTextFilter = function (selector) {
  const rootSelector = `.${TextFilterWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    TextFilterWrapper
  );
};
ElementWrapper.prototype.findTextarea = function (selector) {
  const rootSelector = `.${TextareaWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, TextareaWrapper);
};
ElementWrapper.prototype.findTiles = function (selector) {
  const rootSelector = `.${TilesWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, TilesWrapper);
};
ElementWrapper.prototype.findTimeInput = function (selector) {
  const rootSelector = `.${TimeInputWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    TimeInputWrapper
  );
};
ElementWrapper.prototype.findToggle = function (selector) {
  const rootSelector = `.${ToggleWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, ToggleWrapper);
};
ElementWrapper.prototype.findTokenGroup = function (selector) {
  const rootSelector = `.${TokenGroupWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    TokenGroupWrapper
  );
};
ElementWrapper.prototype.findTopNavigation = function (selector) {
  const rootSelector = `.${TopNavigationWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    TopNavigationWrapper
  );
};
ElementWrapper.prototype.findTutorialPanel = function (selector) {
  const rootSelector = `.${TutorialPanelWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(
    selector ? appendSelector(selector, rootSelector) : rootSelector,
    TutorialPanelWrapper
  );
};
ElementWrapper.prototype.findWizard = function (selector) {
  const rootSelector = `.${WizardWrapper.rootSelector}`;
  // casting to 'any' is needed to avoid this issue with generics
  // https://github.com/microsoft/TypeScript/issues/29132
  return (this as any).findComponent(selector ? appendSelector(selector, rootSelector) : rootSelector, WizardWrapper);
};
export default function wrapper(root: Element = document.body) {
  if (document && document.body && !document.body.contains(root)) {
    console.warn(
      '[AwsUi] [test-utils] provided element is not part of the document body, interactions may work incorrectly'
    );
  }
  return new ElementWrapper(root);
}
