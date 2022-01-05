export type EnvType = {
    NODE_ENV: string,
    PORT: string,
    [key: string]: string
}

export default interface Env<E> {
    get(key: keyof E): string;
    set(key: keyof E, value: string);
}
