import { HttpMethod } from '@microk/common/http/HttpMethod';
import Module from '@microk/core/domain/module/Module';
import { ModuleKeys } from '@microk/core/domain/module/ModuleKeys';
import InfoController from './infrastructure/InfoController';
import InfoService from './application/info/InfoService';
import { ContainerKeys } from '../../app/ContainerKeys';
import InfoQueryHandler from './application/info/InfoQueryHandler';
import SetInfoService from './application/set-info/SetInfoService';
import SetInfoCommandHandler from './application/set-info/SetInfoCommandHandler';
import SetInfoController from './infrastructure/SetInfoController';
import SendEmailInfoRequestDomainEventSubscriber
    from './application/send-email/SendEmailInfoRequestDomainEventSubscriber';
import SendEmailService from './application/send-email/SenEmailService';

export const InfoModuleKeys: ModuleKeys = {
    InfoController: Symbol.for('InfoController'),
    SetInfoController: Symbol.for('SetInfoController'),
    InfoService: Symbol.for('InfoService'),
    InfoQueryHandler: Symbol.for('InfoQueryHandler'),
    SetInfoCommandHandler: Symbol.for('SetInfoCommandHandler'),
    SendEmailInfoRequestDomainEventSubscriber: Symbol.for('SendEmailInfoRequestDomainEventSubscriber'),
    SendEmailService: Symbol.for('SendEmailService'),
    AuthMiddleware: Symbol.for('AuthMiddleware'),
};

export const InfoModule: Module = {
    controllers: [
        {
            key: InfoModuleKeys.InfoController,
            class: InfoController,
            httpMethod: HttpMethod.GET,
            path: '/',
            dep: [ContainerKeys.QueryBus],
        },
        {
            key: InfoModuleKeys.SetInfoController,
            class: SetInfoController,
            httpMethod: HttpMethod.PUT,
            path: '/',
            dep: [ContainerKeys.CommandBus],
        },
    ],
    middlewares: [
        // {
        //     key: InfoModuleKeys.AuthMiddleware,
        //     class: AuthMiddleware,
        //     dep: [ContainerKeys.Logger],
        // },
    ],
    services: [
        {
            key: InfoModuleKeys.InfoService,
            class: InfoService,
            dep: [ContainerKeys.EventBus],
        },
        {
            key: InfoModuleKeys.SetInfoService,
            class: SetInfoService,
            dep: [ContainerKeys.Logger],
        },
        {
            key: InfoModuleKeys.SendEmailService,
            class: SendEmailService,
            dep: [ContainerKeys.Logger],
        },
    ],
    queryHandlers: [
        {
            key: InfoModuleKeys.InfoQueryHandler,
            class: InfoQueryHandler,
            dep: [InfoModuleKeys.InfoService],
        },
    ],
    commandHandlers: [
        {
            key: InfoModuleKeys.SetInfoCommandHandler,
            class: SetInfoCommandHandler,
            dep: [InfoModuleKeys.SetInfoService],
        },
    ],
    domainEventSubscribers: [
        {
            key: InfoModuleKeys.SendEmailInfoRequestDomainEventSubscriber,
            class: SendEmailInfoRequestDomainEventSubscriber,
            dep: [InfoModuleKeys.SendEmailService, ContainerKeys.CommandBus],
        },
    ],
};
