import Module from '../shared/domain/framework/Module';
import InfoController from './infrastructure/InfoController';
import { ModuleKeys } from '../shared/domain/framework/ModuleKeys';
import InfoService from './application/InfoService';
import { HttpMethod } from '../shared/domain/http/HttpMethod';
import AuthMiddleware from './infrastructure/AuthMiddleware';
import { ContainerKeys } from '../../app/ContainerKeys';

export const InfoModuleKeys: ModuleKeys = {
    InfoController: Symbol.for('InfoController'),
    InfoService: Symbol.for('InfoService'),
    AuthMiddleware: Symbol.for('AuthMiddleware'),
};

export const InfoModule: Module = {
    controllers: [
        {
            key: InfoModuleKeys.InfoController,
            class: InfoController,
            httpMethod: HttpMethod.GET,
            path: '/',
            dep: [InfoModuleKeys.InfoService],
        },
    ],
    middlewares: [
        {
            key: InfoModuleKeys.AuthMiddleware,
            class: AuthMiddleware,
            dep: [ContainerKeys.Logger],
        },
    ],
    services: [
        {
            key: InfoModuleKeys.InfoService,
            class: InfoService,
        },
    ],
};
