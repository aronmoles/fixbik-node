import Module from '@microk/core/domain/module/Module';
import SystemLogger from '@microk/core/infrastructure/SystemLogger';
import { InMemoryCommandBus } from '@microk/cqrs/infrastructure/command/InMemoryCommandBus';
import { MiddlewareCommandBus } from '@microk/cqrs/infrastructure/command/MiddlewareCommandBus';
import InMemoryQueryBus from '@microk/cqrs/infrastructure/query/InMemoryQueryBus';
import MiddlewareQueryBus from '@microk/cqrs/infrastructure/query/MiddlewareQueryBus';
import RabbitMqEventbus from '@microk/event/infrastructure/rabbit-mq/RabbitMqEventBus';
import StoreMessageBusMiddleware from '@microk/message-store/infrastructure/StoreMessageBusMiddleware';
import BusTimeMiddleware from '@microk/utils/BusTimeMiddleware';
import FileMessageStore from '@microk/utils/FileMessageStore';
import RabbitMqConfigFactory from '../modules/shared/infrastructure/RabbitMqConfigFactory';
import ProcessEnv from './ProcessEnv';

export const AppKeys = {
    Env: Symbol.for('Env'),
    Logger: Symbol.for('Logger'),
    QueryBus: Symbol.for('QueryBus'),
    CommandBus: Symbol.for('CommandBus'),
    EventBus: Symbol.for('EventBus'),
    ErrorTracker: Symbol.for('ErrorTracker'),
    RabbitMqConfig: Symbol.for('RabbitMqConfig'),
};

const logger = new SystemLogger();
const env = new ProcessEnv();

const rabbitMqConfig = new RabbitMqConfigFactory(env).config();

export const AppModule: Module = {
    services: [
        {
            key: AppKeys.Env,
            instance: env,
        },
        {
            key: AppKeys.Logger,
            instance: logger,
        },
        {
            key: AppKeys.CommandBus,
            instance: new MiddlewareCommandBus(
                new InMemoryCommandBus(),
                [
                    new BusTimeMiddleware(logger),
                    new StoreMessageBusMiddleware(new FileMessageStore()),
                ],
            ),
        },
        {
            key: AppKeys.CommandBus,
            instance: new MiddlewareCommandBus(
                new InMemoryCommandBus(),
                [
                    new BusTimeMiddleware(logger),
                    new StoreMessageBusMiddleware(new FileMessageStore()),
                ],
            ),
        },
        {
            key: AppKeys.QueryBus,
            instance: new MiddlewareQueryBus(
                new InMemoryQueryBus(),
                [
                    new BusTimeMiddleware(logger),
                    new StoreMessageBusMiddleware(new FileMessageStore()),
                ]
            ),
        },
        {
            key: AppKeys.RabbitMqConfig,
            instance: rabbitMqConfig,
        },
        {
            key: AppKeys.EventBus,
            class: RabbitMqEventbus,
            dep: [AppKeys.RabbitMqConfig, AppKeys.Logger],
        },
    ],
};
