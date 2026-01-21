import ts from 'typescript';
import type { TypeDefinition } from './interfaces';
export declare function getObjectDefinition(type: string, rawType: ts.Type, rawTypeNode: ts.TypeNode | undefined, checker: ts.TypeChecker): {
    type: string;
    inlineType?: TypeDefinition;
};
