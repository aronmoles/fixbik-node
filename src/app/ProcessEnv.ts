/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
import * as fs from 'fs';
import Env from '../modules/shared/domain/Env';

export enum EnvMode {
    dev,
    test,
    prod,
}

export interface EnvKey {
    NODE_ENV: string;
    PORT: string;
}

export default class ProcessEnv implements Env<EnvKey> {
    private readonly env: EnvKey;

    constructor() {
        this.env = {
            NODE_ENV: process.env.NODE_ENV,
            PORT: '3000',
        };

        const modeEnvFilePath = `${__dirname}/../../.env.${process.env.NODE_ENV}`;
        if (fs.existsSync(modeEnvFilePath)) {
            require('dotenv').config({ path: modeEnvFilePath });
        } else {
            const envFilePath = `${__dirname}/../../.env`;
            if (fs.existsSync(envFilePath)) {
                require('dotenv').config({ path: envFilePath });
            }
        }

        const envKeys = Object.keys(this.env) as Array<keyof EnvKey>;

        for (const key of envKeys) {
            const value = process.env[key];

            if (value) {
                this.env[key] = value;
            } else {
                throw new Error(`Missing env key ${key}`);
            }
        }

        if (!Object.keys(EnvMode).includes(this.get('NODE_ENV'))) {
            throw new Error('Invalid NODE_ENV value.');
        }
    }

    public get<T extends keyof EnvKey>(key: T): EnvKey[T] {
        return this.env[key];
    }

    public set<T extends keyof EnvKey>(key: T, value: EnvKey[T]) {
        this.env[key] = value;
    }
}
