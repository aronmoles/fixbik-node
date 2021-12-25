import { HttpMethod } from '@microk/common/http/HttpMethod';
import Module from '@microk/core/domain/module/Module';
import { ModuleKeys } from '@microk/core/domain/module/ModuleKeys';
import { AppKeys } from '../../app/app.module';
import InfoController from './infrastructure/InfoController';
import InfoService from './application/info/InfoService';
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
            dep: [AppKeys.QueryBus],
        },
        {
            key: InfoModuleKeys.SetInfoController,
            class: SetInfoController,
            httpMethod: HttpMethod.PUT,
            path: '/',
            dep: [AppKeys.CommandBus],
        },
    ],
    middlewares: [
        // {
        //     key: InfoModuleKeys.AuthMiddleware,
        //     class: AuthMiddleware,
        //     dep: [AppKeys.Logger],
        // },
    ],
    services: [
        {
            key: InfoModuleKeys.InfoService,
            class: InfoService,
            dep: [AppKeys.EventBus],
        },
        {
            key: InfoModuleKeys.SetInfoService,
            class: SetInfoService,
            dep: [AppKeys.Logger],
        },
        {
            key: InfoModuleKeys.SendEmailService,
            class: SendEmailService,
            dep: [AppKeys.Logger],
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
            dep: [InfoModuleKeys.SendEmailService, AppKeys.CommandBus],
        },
    ],
};
