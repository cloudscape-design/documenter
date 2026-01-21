import { TestUtilsDoc } from './interfaces';
export interface TestUtilsVariantOptions {
    root: string;
    extraExports?: Array<string>;
}
export interface TestUtilsDocumenterOptions {
    tsconfigPath: string;
    includeCoreMethods?: boolean;
    domUtils: TestUtilsVariantOptions;
    selectorsUtils: TestUtilsVariantOptions;
}
interface TestUtilsDefinitions {
    domDefinitions: Array<TestUtilsDoc>;
    selectorsDefinitions: Array<TestUtilsDoc>;
}
export declare function documentTestUtils(options: TestUtilsDocumenterOptions): TestUtilsDefinitions;
export declare function writeTestUtilsDocumentation({ outDir, ...rest }: TestUtilsDocumenterOptions & {
    outDir: string;
}): void;
export {};
