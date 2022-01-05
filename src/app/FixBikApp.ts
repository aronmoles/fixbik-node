import { Keys } from '../modules/shared/infrastructure/di/Keys';
import container from './Container';
import Env from '../microk/core/domain/env/Env';
import Logger from '../microk/core/domain/Logger';
import { FixBikEnvType } from './FixBikEnv';
import { ServerOpenApiConfig } from '../microk/core/domain/Server';
import App from '../microk/core/infrastructure/App';

export default class FixBikApp extends App<FixBikEnvType> {
    constructor() {
        const env = container.get<Env<FixBikEnvType>>(Keys.App.Env);
        const logger = container.get<Logger>(Keys.App.Logger);
        const serverOpenApiConfig = container.get<ServerOpenApiConfig>(Keys.App.ServerOpenApiConfig);
        super(env, logger, serverOpenApiConfig);
    }
}
