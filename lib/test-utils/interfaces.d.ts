export interface Parameter {
    name: string;
    typeName: string;
    description?: string;
    flags: {
        isOptional?: boolean;
    };
    defaultValue?: string;
}
interface TypeArgument {
    name: string;
}
export interface TestUtilMethod {
    name: string;
    description?: string;
    returnType: {
        name: string;
        isNullable: boolean;
        typeArguments?: Array<TypeArgument>;
    };
    parameters: Array<Parameter>;
    inheritedFrom?: {
        name: string;
    };
}
export interface TestUtilsDoc {
    name: string;
    methods: Array<TestUtilMethod>;
}
export interface TestUtilsDefinition {
    classes: Array<TestUtilsDoc>;
}
export {};
