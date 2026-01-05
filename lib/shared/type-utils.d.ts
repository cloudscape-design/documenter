import ts from 'typescript';
export declare function isOptional(type: ts.Type): boolean;
export declare function isNullable(type: ts.Type): boolean;
export declare function unwrapNamespaceDeclaration(declaration: ts.Declaration | undefined): readonly ts.Node[];
export declare function stringifyType(type: ts.Type, checker: ts.TypeChecker): string;
export declare function getDescription(docComment: Array<ts.SymbolDisplayPart>, declaration: ts.Node): {
    text: string | undefined;
    tags: {
        name: string;
        text: string | undefined;
    }[];
};
export declare function extractDeclaration(symbol: ts.Symbol): ts.Declaration;
export declare function printFlags(flags: number, mapping: Record<string, number | string>): string[];
export declare function extractTypeArguments(type: ts.Type, checker: ts.TypeChecker): {
    typeName: string;
    typeParameters?: undefined;
} | {
    typeParameters: readonly ts.Type[];
    typeName: string;
};
