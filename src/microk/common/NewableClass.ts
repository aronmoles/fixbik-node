export interface NewableClass<T = any> extends Function {
    new (...args: any[]): T;
}
