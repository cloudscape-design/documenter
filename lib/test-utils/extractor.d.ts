import ts from 'typescript';
import { TestUtilsDoc } from './interfaces';
export default function extractDocumentation(sourceFile: ts.SourceFile, checker: ts.TypeChecker, extraExports: Array<string>, includeCoreMethods: boolean): Array<TestUtilsDoc>;
