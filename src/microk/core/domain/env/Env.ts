export type EnvType = { [key: string]: string }

export default interface Env<E> {
    get(key: keyof E): string;
    set(key: keyof E, value: string);
}
