import AuthenticateQueryHandler from '../../modules/auth/application/login/AuthenticateQueryHandler';
import Authenticator from '../../modules/auth/application/login/Authenticator';
import AuthenticateController from '../../modules/auth/infrastructure/controllers/AuthenticateController';
import JwtAuthTokenRepository from '../../modules/auth/infrastructure/generators/JwtAuthTokenRepository';
import { TypeOrmAuthUserRepository } from '../../modules/auth/infrastructure/persistence/TypeOrmAuthUserRepository';
import InfoQueryHandler from '../../modules/info/application/info/InfoQueryHandler';
import InfoService from '../../modules/info/application/info/InfoService';
import SendEmailInfoRequestDomainEventSubscriber
    from '../../modules/info/application/send-email/SendEmailInfoRequestDomainEventSubscriber';
import SendEmailService from '../../modules/info/application/send-email/SendEmailService';
import SetInfoCommandHandler from '../../modules/info/application/set-info/SetInfoCommandHandler';
import SetInfoService from '../../modules/info/application/set-info/SetInfoService';
import InfoController from '../../modules/info/infrastructure/InfoController';
import SetInfoController from '../../modules/info/infrastructure/SetInfoController';
import { Keys } from '../../modules/shared/infrastructure/di/Keys';
import ServerOpenApiConfigFactory from '../../modules/shared/infrastructure/docs/ServerOpenApiConfigFactory';
import { TypeOrmConfigFactory } from '../../modules/shared/infrastructure/persistence/typeorm/TypeOrmConfigFactory';
import QueryHandlersMapper from '../../microk/cqrs/infrastructure/query/QueryHandlersMapper';
import ErrorMiddlewareDiscoverer from '../../microk/core/infrastructure/discoverer/ErrorMiddlewareDiscoverer';
import FileMessageStore from '../../microk/utils/FileMessageStore';
import { ContainerTag } from '../../microk/core/domain/di/ContainerTag';
import ControllerDiscoverer from '../../microk/core/infrastructure/discoverer/ControllerDiscoverer';
import StoreMessageBusMiddleware from '../../microk/message-store/infrastructure/StoreMessageBusMiddleware';
import InMemoryQueryBus from '../../microk/cqrs/infrastructure/query/InMemoryQueryBus';
import FileErrorTracker from '../../microk/utils/FileErrorTracker';
import { EventSubscriberMapper } from '../../microk/event/infrastructure/EventSubscriberMapper';
import { InMemoryCommandBus } from '../../microk/cqrs/infrastructure/command/InMemoryCommandBus';
import SystemLogger from '../../microk/core/infrastructure/SystemLogger';
import TimeBusMiddleware from '../../microk/utils/TimeBusMiddleware';
import { EventClassMapper } from '../../microk/event/infrastructure/EventClassMapper';
import { TypeOrmClientFactory } from '../../microk/persistence/infrastructure/typeorm/TypeOrmClientFactory';
import MiddlewareDiscoverer from '../../microk/core/infrastructure/discoverer/MiddlewareDiscoverer';
import { CommandHandlersMapper } from '../../microk/cqrs/infrastructure/command/CommandHandlersMapper';
import PersistErrorMiddleware from '../../microk/core/infrastructure/error/PersistErrorMiddleware';
import HttpErrorMiddleware from '../../microk/core/infrastructure/HttpErrorMiddleware';
import Container from '../../microk/core/domain/di/Container';
import TypeOrmEventStore from '../../modules/shared/infrastructure/persistence/typeorm/TypeOrmEventStore';
import InMemoryEventBus from '../../microk/event/infrastructure/InMemoryEventBus';
import EventStoreController from '../../microk/event/infrastructure/controller/EventStoreController';
import FixBikEnv from '../FixBikEnv';

export const config = (container: Container) => {
    // App
    const env = new FixBikEnv();
    container.addInstance(Keys.App.Env, env);
    container.addClass(Keys.App.Logger, SystemLogger);
    container.addClass(Keys.App.ControllerDiscoverer, ControllerDiscoverer);
    container.addClass(Keys.App.MiddlewareDiscoverer, MiddlewareDiscoverer);
    container.addClass(Keys.App.ErrorMiddlewareDiscoverer, ErrorMiddlewareDiscoverer);
    container.addClass(Keys.App.PersistErrorMiddleware, PersistErrorMiddleware, [ContainerTag.ERROR_MIDDLEWARE]);
    container.addClass(Keys.App.HttpErrorMiddleware, HttpErrorMiddleware, [ContainerTag.ERROR_MIDDLEWARE]);
    container.addClass(Keys.App.ErrorTracker, FileErrorTracker);
    container.addClass(Keys.App.MessageStore, FileMessageStore);
    container.addClass(
        Keys.App.StoreMessageBusMiddleware,
        StoreMessageBusMiddleware,
        [ContainerTag.COMMAND_EXECUTOR, ContainerTag.QUERY_EXECUTOR, ContainerTag.EVENT_EXECUTOR],
    );
    container.addClass(
        Keys.App.TimeBusMiddleware,
        TimeBusMiddleware,
        [ContainerTag.COMMAND_EXECUTOR, ContainerTag.QUERY_EXECUTOR, ContainerTag.EVENT_EXECUTOR],
    );
    // container.addClass(Keys.App.AuthMiddleware, AuthMiddleware);
    container.addInstance(Keys.App.ServerOpenApiConfig, ServerOpenApiConfigFactory.createConfig());
    container.addInstance(
        Keys.App.ConnectionManager,
        TypeOrmClientFactory.createClient(TypeOrmConfigFactory.createConfig(env)),
    );

    // CQRS
    container.addClass(Keys.CQRS.CommandHandlersMapper, CommandHandlersMapper);
    container.addClass(Keys.CQRS.CommandBus, InMemoryCommandBus);
    container.addClass(Keys.CQRS.QueryHandlersMapper, QueryHandlersMapper);
    container.addClass(Keys.CQRS.QueryBus, InMemoryQueryBus);

    // EVENT
    container.addClass(Keys.CQRS.EventSubscriberMapper, EventSubscriberMapper);
    container.addClass(Keys.CQRS.EventClassMapper, EventClassMapper);
    // container.addClass(Keys.CQRS.EventBus, RabbitMqEventBus);
    // container.addClass(Keys.CQRS.EventDeserializer, EventJsonDeserializer);
    // container.addInstance(Keys.CQRS.RabbitMqConfig, RabbitMqConfigFactory.createConfig(env));
    container.addClass(Keys.CQRS.EventBus, InMemoryEventBus);
    container.addClass(Keys.CQRS.EventStore, TypeOrmEventStore);
    container.addClass(Keys.CQRS.EventStoreController, EventStoreController, [ContainerTag.CONTROLLER]);

    // Info
    container.addClass(Keys.Info.InfoController, InfoController, [ContainerTag.CONTROLLER]);
    container.addClass(Keys.Info.SetInfoController, SetInfoController, [ContainerTag.CONTROLLER]);
    container.addClass(Keys.Info.InfoService, InfoService);
    container.addClass(Keys.Info.SetInfoService, SetInfoService);
    container.addClass(Keys.Info.SendEmailService, SendEmailService);
    container.addClass(Keys.Info.InfoQueryHandler, InfoQueryHandler, [ContainerTag.QUERY_HANDLER]);
    container.addClass(Keys.Info.SetInfoCommandHandler, SetInfoCommandHandler, [ContainerTag.COMMAND_HANDLER]);
    container.addClass(
        Keys.Info.SendEmailInfoRequestDomainEventSubscriber,
        SendEmailInfoRequestDomainEventSubscriber,
        [ContainerTag.EVENT_SUBSCRIBER],
    );

    // Auth
    container.addClass(Keys.Auth.AuthenticateController, AuthenticateController, [ContainerTag.CONTROLLER]);
    container.addClass(Keys.Auth.Authenticator, Authenticator);
    container.addClass(Keys.Auth.AuthenticateQueryHandler, AuthenticateQueryHandler, [ContainerTag.QUERY_HANDLER]);
    container.addClass(Keys.Auth.AuthUserRepository, TypeOrmAuthUserRepository);
    container.addClass(Keys.Auth.AuthTokenRepository, JwtAuthTokenRepository);
}
