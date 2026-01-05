import ts from 'typescript';
import { ValueDescription } from './interfaces';
export declare function extractValueDescriptions(type: ts.UnionOrIntersectionType, typeNode: ts.TypeNode | undefined): (ValueDescription | undefined)[];
