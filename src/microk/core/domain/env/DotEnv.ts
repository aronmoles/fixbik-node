/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs';
import { EnvType } from './Env';
import ProcessEnv from './ProcessEnv';

export default abstract class DotEnv<K extends EnvType> extends ProcessEnv<K> {
    protected constructor(variables: K) {
        const modeEnvFilePath = `${__dirname}/../../../../../.env.${process.env.NODE_ENV}`;
        if (fs.existsSync(modeEnvFilePath)) {
            require('dotenv').config({ path: modeEnvFilePath });
        } else {
            const envFilePath = `${__dirname}/../../../../../.env`;
            if (fs.existsSync(envFilePath)) {
                require('dotenv').config({ path: envFilePath });
            }
        }

        super(variables)
    }
}
