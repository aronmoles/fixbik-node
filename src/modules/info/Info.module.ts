import Module from '../shared/domain/framework/Module';
import InfoController from './infrastructure/InfoController';
import { ModuleKeys } from '../shared/domain/framework/ModuleKeys';
import InfoService from './application/InfoService';
import { HttpMethod } from '../shared/domain/http/HttpMethod';

export const InfoModuleKeys: ModuleKeys = {
    InfoController: Symbol.for('InfoController'),
    InfoService: Symbol.for('InfoService'),
};

export const InfoModule: Module = {
    controllers: [
        {
            class: InfoController,
            dep: [InfoModuleKeys.InfoService],
            httpMethod: HttpMethod.GET,
            key: InfoModuleKeys.InfoController,
            path: '/',
        },
    ],
    services: [
        {
            key: InfoModuleKeys.InfoService,
            class: InfoService,
        },
    ],
};
