import ts from 'typescript';
import type { ComponentDefinition } from './interfaces';
import type { ExpandedProp, ExtractedDescription } from './extractor';
export declare function buildComponentDefinition(name: string, dashCaseName: string, props: Array<ExpandedProp>, functions: Array<ExpandedProp>, defaultValues: Record<string, string>, componentDescription: ExtractedDescription, checker: ts.TypeChecker): ComponentDefinition;
