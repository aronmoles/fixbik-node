import Env, { EnvType } from './Env';

export default abstract class BaseEnv<K extends EnvType> implements Env<K> {
    private readonly env: K;

    protected constructor(env: K) {
        this.env = env;
    }

    public get(key: keyof K): string {
        return this.env[key];
    }

    public set(key: keyof K, value: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.env[key] = value;
    }
}
