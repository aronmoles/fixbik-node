import Env from '@microk/core/domain/Env';
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
import Command from '@microk/cqrs/domain/command/Command';
import { CommandBus } from '@microk/cqrs/domain/command/CommandBus';
import CommandHandler from '@microk/cqrs/domain/command/CommandHandler';
import Query from '@microk/cqrs/domain/query/Query';
import QueryBus from '@microk/cqrs/domain/query/QueryBus';
import { QueryHandler } from '@microk/cqrs/domain/query/QueryHandler';
import { CommandHandlersMapper } from '@microk/cqrs/infrastructure/command/CommandHandlersMapper';
import QueryHandlersMapper from '@microk/cqrs/infrastructure/query/QueryHandlersMapper';
import DomainEvent from '@microk/event/domain/DomainEvent';
import EventBus from '@microk/event/domain/EventBus';
import EventSubscriber from '@microk/event/domain/EventSubscriber';
import { EventClassMapper } from '@microk/event/infrastructure/EventClassMapper';
import { EventJsonDeserializer } from '@microk/event/infrastructure/EventJsonDeserializer';
import { EventSubscriberMapper } from '@microk/event/infrastructure/EventSubscriberMapper';
import RabbitMqEventbus from '@microk/event/infrastructure/rabbit-mq/RabbitMqEventBus';
import FileErrorTracker from '@microk/utils/FileErrorTracker';
import * as http from 'http';
import { InfoModule } from '../modules/info/Info.module';
import { AppKeys, AppModule } from './app.module';
import { EnvKey } from './ProcessEnv';
import Server from './Server';

export default class App {
    private container: DependencyContainer;

    private readonly appModule = AppModule;
    private readonly modules = [AppModule, InfoModule];

    private readonly server?: Server;

    constructor() {
        this.initDiContainer();
        this.registerServices();
        const env = this.container.get<Env<EnvKey>>(AppKeys.Env);
        const logger = this.container.get<Logger>(AppKeys.Logger);
        this.server = new Server(env, logger);
    }

    async start() {
        this.initMiddleware();
        this.initErrorTracker();
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

    get httpServer(): http.Server {
        return this.server?.httpServer;
    }

    private initDiContainer() {
        this.container = new DependencyContainer();
        const modulesDependencyMapper = new ModuleDependencyMapper(this.modules);
        this.container.attachDependencyMapper(modulesDependencyMapper);
    }

    private initErrorTracker() {
        this.container.addClass(AppKeys.ErrorTracker, FileErrorTracker)
    }

    private initMiddleware() {
        this.server.registerControllerMiddleware([
            // new TimeMiddleware(this.container.get(ContainerKeys.Logger)),
        ]);
    }

    private registerServices() {
        const moduleServiceDiscover = new ServiceModuleDiscoverer();
        this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .forEach((service) => {
                if (service.class) {
                    this.container.addClass(service.key, service.class)
                } else if (service.instance) {
                    this.container.addInstance(service.key, service.instance)
                } else {
                    throw new Error(`<${service.key.toString()}> not defined class or instance.`)
                }
            });
    }

    private async initQueryBusMapper() {
        const moduleServiceDiscover = new QueryHandlersModuleDiscoverer();
        const queryHandlers = this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<QueryHandler<Query, Response>>(moduleService.key));
        const queryHandlerMapper = new QueryHandlersMapper(queryHandlers);
        const queryBus = this.container.get<QueryBus>(AppKeys.QueryBus);
        queryBus.attachMapper(queryHandlerMapper)
    }

    private async initCommandBusMapper() {
        const moduleServiceDiscover = new CommandHandlersModuleDiscoverer();
        const commandHandlers = this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<CommandHandler<Command>>(moduleService.key));
        const commandHandlerMapper = new CommandHandlersMapper(commandHandlers);
        const commandBus = this.container.get<CommandBus>(AppKeys.CommandBus);
        commandBus.attachMapper(commandHandlerMapper)
    }

    private async initEventBusMapper() {
        const domainEventSubscriberModuleDiscoverer = new EventSubscriberModuleDiscoverer();
        const domainEventSubscribers = this.modules
            .map((module) => domainEventSubscriberModuleDiscoverer.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<EventSubscriber<DomainEvent>>(moduleService.key));
        const domainEventSubscriberMapper = new EventSubscriberMapper(domainEventSubscribers);
        const eventBus = this.container.get<EventBus>(AppKeys.EventBus);
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
            new HttpErrorMiddleware(this.container.get(AppKeys.Logger)),
            new PersistErrorMiddleware(this.container.get(AppKeys.ErrorTracker)),
        ]);
    }
}
