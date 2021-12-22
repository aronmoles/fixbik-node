export default interface Env<EnvKey> {
    get<T extends keyof EnvKey>(key: T): EnvKey[T];
    set<T extends keyof EnvKey>(key: T, value: EnvKey[T]);
}
