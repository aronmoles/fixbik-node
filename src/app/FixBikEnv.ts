/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
import DotEnv from '../microk/core/domain/env/DotEnv';
import { EnvType } from '../microk/core/domain/env/Env';

export enum EnvMode {
    dev = 'dev',
    test = 'test',
    prod = 'prod',
}

export interface FixBikEnvType extends EnvType {
    NODE_ENV: string;
    PORT: string;

    JWT_SECRET: string;

    RABBITMQ_HOST: string;
    RABBITMQ_USER: string;
    RABBITMQ_PASSWORD: string;
    RABBITMQ_EXCHANGE: string;
    RABBITMQ_QUEUE: string;

    MYSQL_HOST: string;
    MYSQL_PORT: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_SYNCHRONIZE: string;
    MYSQL_LOGGING: string;
}

export default class FixBikEnv extends DotEnv<FixBikEnvType> {
    constructor() {
        super({
            NODE_ENV: process.env.NODE_ENV,
            PORT: '3000',

            JWT_SECRET: '',

            RABBITMQ_HOST: '',
            RABBITMQ_USER: '',
            RABBITMQ_PASSWORD: '',
            RABBITMQ_EXCHANGE: '',
            RABBITMQ_QUEUE: '',

            MYSQL_HOST: '',
            MYSQL_PORT: '',
            MYSQL_USER: '',
            MYSQL_PASSWORD: '',
            MYSQL_DATABASE: '',
            MYSQL_SYNCHRONIZE: 'false',
            MYSQL_LOGGING: 'false',
        });

        if (!Object.keys(EnvMode).includes(this.get('NODE_ENV'))) {
            throw new Error('Invalid NODE_ENV value.');
        }
    }
}
