import Logger from '@microk/core/domain/Logger';
import DependencyContainer from '@microk/core/infrastructure/di/DependencyContainer';
import ModuleDependencyMapper from '@microk/core/infrastructure/di/ModuleDependencyMapper';
import PersistErrorMiddleware from '@microk/core/infrastructure/error/PersistErrorMiddleware';
import HttpErrorMiddleware from '@microk/core/infrastructure/HttpErrorMiddleware';
import CommandHandlersModuleDiscoverer from '@microk/core/infrastructure/module/CommandHandlersModuleDiscoverer';
import EventSubscriberModuleDiscoverer from '@microk/core/infrastructure/module/EventSubscriberModuleDiscoverer';
import QueryHandlersModuleDiscoverer from '@microk/core/infrastructure/module/QueryHandlersModuleDiscoverer';
import ServerRoutesModuleDiscoverer from '@microk/core/infrastructure/module/ServerRoutesModuleDiscoverer';
import ServiceModuleDiscoverer from '@microk/core/infrastructure/module/ServiceModuleDiscoverer';
import SystemLogger from '@microk/core/infrastructure/SystemLogger';
import Command from '@microk/cqrs/domain/command/Command';
import { CommandBus } from '@microk/cqrs/domain/command/CommandBus';
import CommandHandler from '@microk/cqrs/domain/command/CommandHandler';
import Query from '@microk/cqrs/domain/query/Query';
import QueryBus from '@microk/cqrs/domain/query/QueryBus';
import { QueryHandler } from '@microk/cqrs/domain/query/QueryHandler';
import { CommandHandlersMapper } from '@microk/cqrs/infrastructure/command/CommandHandlersMapper';
import { InMemoryCommandBus } from '@microk/cqrs/infrastructure/command/InMemoryCommandBus';
import { MiddlewareCommandBus } from '@microk/cqrs/infrastructure/command/MiddlewareCommandBus';
import InMemoryQueryBus from '@microk/cqrs/infrastructure/query/InMemoryQueryBus';
import MiddlewareQueryBus from '@microk/cqrs/infrastructure/query/MiddlewareQueryBus';
import QueryHandlersMapper from '@microk/cqrs/infrastructure/query/QueryHandlersMapper';
import DomainEvent from '@microk/event/domain/DomainEvent';
import EventBus from '@microk/event/domain/EventBus';
import EventSubscriber from '@microk/event/domain/EventSubscriber';
import { EventClassMapper } from '@microk/event/infrastructure/EventClassMapper';
import { EventJsonDeserializer } from '@microk/event/infrastructure/EventJsonDeserializer';
import { EventSubscriberMapper } from '@microk/event/infrastructure/EventSubscriberMapper';
import RabbitMqEventbus from '@microk/event/infrastructure/rabbit-mq/RabbitMqEventBus';
import StoreMessageBusMiddleware from '@microk/message-store/infrastructure/StoreMessageBusMiddleware';
import BusTimeMiddleware from '@microk/utils/BusTimeMiddleware';
import FileErrorTracker from '@microk/utils/FileErrorTracker';
import FileMessageStore from '@microk/utils/FileMessageStore';
import { ContainerKeys } from './ContainerKeys';
import Server from './Server';
import ProcessEnv from './ProcessEnv';
import { InfoModule } from '../modules/info/Info.module';

export default class App {
    private readonly container: DependencyContainer;

    private readonly modules = [InfoModule];

    private readonly server?: Server;

    constructor() {
        const env = new ProcessEnv();
        const logger = new SystemLogger();
        this.server = new Server(env, logger);
        this.container = new DependencyContainer();
        this.container.addInstance(ContainerKeys.Env, env);
        this.container.addInstance(ContainerKeys.Logger, logger);
    }

    async start() {
        await this.initDiContainer();
        await this.initErrorTracker();
        await this.initEventBus();
        await this.initQueryBus();
        await this.initCommandBus();
        await this.initMiddleware();
        await this.registerServices();
        await this.initEventBusMapper();
        await this.initQueryBusMapper();
        await this.initCommandBusMapper();
        await this.registerRoutes();
        await this.initErrorMiddleware();
        await this.initEventBusMapper();
        return this.server.listen();
    }

    async stop() {
        await this.server?.stop();
    }

    // Get httpServer(): http.Server {
    //     return this.server?.httpServer;
    // }

    private async initDiContainer() {
        const modulesDependencyMapper = new ModuleDependencyMapper(this.modules);
        this.container.attachDependencyMapper(modulesDependencyMapper);
    }

    private async initErrorTracker() {
        this.container.addClass(ContainerKeys.ErrorTracker, FileErrorTracker)
    }

    private async initMiddleware() {
        this.server.registerControllerMiddleware([
            //     New TimeMiddleware(this.container.get(ContainerKeys.Logger)),
        ]);
    }

    private async initEventBus() {
        // const eventBus = new InMemoryEventBus();

        const eventBus = new RabbitMqEventbus(
            {
                host: 'localhost',
                user: 'guest',
                password: 'guest',
                exchange: 'ExchangeName',
                queue: 'QueueName',
            },
            this.container.get<Logger>(ContainerKeys.Logger),
        );
        this.container.addInstance(ContainerKeys.EventBus, eventBus)
    }

    private async initQueryBus() {
        const queryBus = new MiddlewareQueryBus(
            new InMemoryQueryBus(),
            [
                new BusTimeMiddleware(this.container.get(ContainerKeys.Logger)),
                new StoreMessageBusMiddleware(new FileMessageStore()),
            ]
        );
        this.container.addInstance(ContainerKeys.QueryBus, queryBus)
    }

    private async initCommandBus() {
        const commandBus = new MiddlewareCommandBus(
            new InMemoryCommandBus(),
            [
                new BusTimeMiddleware(this.container.get(ContainerKeys.Logger)),
                new StoreMessageBusMiddleware(new FileMessageStore()),
            ],
        );
        this.container.addInstance(ContainerKeys.CommandBus, commandBus)
    }

    private async registerServices() {
        const moduleServiceDiscover = new ServiceModuleDiscoverer();
        this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .forEach((service) => this.container.addClass(service.key, service.class));
    }

    private async initQueryBusMapper() {
        const moduleServiceDiscover = new QueryHandlersModuleDiscoverer();
        const queryHandlers = this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<QueryHandler<Query, Response>>(moduleService.key));
        const queryHandlerMapper = new QueryHandlersMapper(queryHandlers);
        const queryBus = this.container.get<QueryBus>(ContainerKeys.QueryBus);
        queryBus.attachMapper(queryHandlerMapper)
    }

    private async initCommandBusMapper() {
        const moduleServiceDiscover = new CommandHandlersModuleDiscoverer();
        const commandHandlers = this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<CommandHandler<Command>>(moduleService.key));
        const commandHandlerMapper = new CommandHandlersMapper(commandHandlers);
        const commandBus = this.container.get<CommandBus>(ContainerKeys.CommandBus);
        commandBus.attachMapper(commandHandlerMapper)
    }

    private async initEventBusMapper() {
        const domainEventSubscriberModuleDiscoverer = new EventSubscriberModuleDiscoverer();
        const domainEventSubscribers = this.modules
            .map((module) => domainEventSubscriberModuleDiscoverer.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<EventSubscriber<DomainEvent>>(moduleService.key));
        const domainEventSubscriberMapper = new EventSubscriberMapper(domainEventSubscribers);
        const eventBus = this.container.get<EventBus>(ContainerKeys.EventBus);
        eventBus.attachMapper(domainEventSubscriberMapper)
        const domainJsonDeserializer = new EventJsonDeserializer(
            new EventClassMapper(domainEventSubscribers),
        )
        // TODO start to all event bus
        await (eventBus as RabbitMqEventbus).start(domainJsonDeserializer);
    }

    private async registerRoutes() {
        const moduleServerRoutesDiscover = new ServerRoutesModuleDiscoverer(this.container);
        this.modules
            .map((module) => moduleServerRoutesDiscover.discover(module))
            .forEach((serverControllers) => this.server.registerControllers(serverControllers))
    }

    private async initErrorMiddleware() {
        this.server.registerErrorMiddleware([
            new HttpErrorMiddleware(this.container.get(ContainerKeys.Logger)),
            new PersistErrorMiddleware(this.container.get(ContainerKeys.ErrorTracker)),
        ]);
    }
}
