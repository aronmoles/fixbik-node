import { EnvMode } from '../ProcessEnv';
import { config } from './config';
import { configDev } from './configDev';
import { configProd } from './configProd';
import { configTest } from './configTest';
import Container from '../../microk/core/domain/di/Container';

export const configEnvDependencyContainer = (container: Container, env: EnvMode): void => {
    config(container);
    switch (env) {
        case EnvMode.dev:
            configDev(container);
            break;
        case EnvMode.prod:
            configProd(container);
            break;
        case EnvMode.test:
            configTest(container);
            break;
        default:
            throw new Error('Configure DI Env invalid')
    }
}
