import Server from './Server';
import ProcessEnv from './ProcessEnv';
import { InfoModule } from '../modules/info/Info.module';
import DependencyContainer from '../modules/shared/infrastructure/framework/di/DependencyContainer';
import ModuleDependencyMapper from '../modules/shared/infrastructure/framework/di/ModuleDependencyMapper';
import ServerRoutesModuleDiscoverer
    from '../modules/shared/infrastructure/framework/module/ServerRoutesModuleDiscoverer';
import ServiceModuleDiscoverer from '../modules/shared/infrastructure/framework/module/ServiceModuleDiscoverer';
import SystemLogger from '../modules/shared/infrastructure/SystemLogger';
import { ContainerKeys } from './ContainerKeys';
import HttpErrorMiddleware from '../modules/shared/infrastructure/HttpErrorMiddleware';
import QueryHandlersModuleDiscoverer
    from '../modules/shared/infrastructure/framework/module/QueryHandlersModuleDiscoverer';
import QueryHandlersMapper from '../modules/shared/infrastructure/query-bus/QueryHandlersMapper';
import CommandHandlersModuleDiscoverer
    from '../modules/shared/infrastructure/framework/module/CommandHandlersModuleDiscoverer';
import { CommandHandlersMapper } from '../modules/shared/infrastructure/command-bus/CommandHandlersMapper';
import BusTimeMiddleware from '../modules/shared/infrastructure/BusTimeMiddleware';
import { QueryHandler } from '../modules/shared/domain/query-bus/QueryHandler';
import Query from '../modules/shared/domain/query-bus/Query';
import CommandHandler from '../modules/shared/domain/command-bus/CommandHandler';
import Command from '../modules/shared/domain/command-bus/Command';
import InMemoryMiddlewareQueryBus from '../modules/shared/infrastructure/query-bus/InMemoryMiddlewareQueryBus';
import {
    InMemoryMiddlewareCommandBus,
} from '../modules/shared/infrastructure/command-bus/InMemoryMiddlewareCommandBus';
import DomainEventSubscriber from '../modules/shared/domain/event-bus/DomainEventSubscriber';
import DomainEvent from '../modules/shared/domain/messages/DomainEvent';
import DomainEventSubscriberModuleDiscoverer
    from '../modules/shared/infrastructure/framework/module/DomainEventSubscriberModuleDiscoverer';
import InMemoryEventBus from '../modules/shared/infrastructure/event-bus/InMemoryEventBus';
import { DomainEventSubscriberMapper } from '../modules/shared/infrastructure/event-bus/DomainEventSubscriberMapper';
import QueryBus from '../modules/shared/domain/query-bus/QueryBus';
import EventBus from '../modules/shared/domain/event-bus/EventBus';
import { CommandBus } from '../modules/shared/domain/command-bus/CommandBus';

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

        const eventBus = new InMemoryEventBus();
        // eventBus.addMiddleware(new BusTimeMiddleware(this.container.get(ContainerKeys.Logger)))
        this.container.addInstance(ContainerKeys.EventBus, eventBus)

        const queryBus = new InMemoryMiddlewareQueryBus();
        queryBus.addMiddleware(new BusTimeMiddleware(this.container.get(ContainerKeys.Logger)))
        this.container.addInstance(ContainerKeys.QueryBus, queryBus)

        const commandBus = new InMemoryMiddlewareCommandBus();
        commandBus.addMiddleware(new BusTimeMiddleware(this.container.get(ContainerKeys.Logger)))
        this.container.addInstance(ContainerKeys.CommandBus, commandBus)
    }

    async start() {
        await this.initDiContainer();
        await this.initMiddleware();
        await this.registerServices();
        await this.initEventBus();
        await this.initQueryBus();
        await this.initCommandBus();
        await this.registerRoutes();
        await this.initErrorMiddleware();
        await this.initEventBus();
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

    private async initMiddleware() {
        this.server.registerControllerMiddleware([
        //     New TimeMiddleware(this.container.get(ContainerKeys.Logger)),
        ]);
    }

    private async registerServices() {
        const moduleServiceDiscover = new ServiceModuleDiscoverer();
        this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .forEach((service) => this.container.addClass(service.key, service.class));
    }

    private async initEventBus() {
        const domainEventSubscriberModuleDiscoverer = new DomainEventSubscriberModuleDiscoverer();
        const domainEventSubscribers = this.modules
            .map((module) => domainEventSubscriberModuleDiscoverer.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<DomainEventSubscriber<DomainEvent>>(moduleService.key));
        const domainEventSubscriberMapper = new DomainEventSubscriberMapper(domainEventSubscribers);
        const eventBus = this.container.get<EventBus>(ContainerKeys.EventBus);
        eventBus.attachMapper(domainEventSubscriberMapper)
    }

    private async initQueryBus() {
        const moduleServiceDiscover = new QueryHandlersModuleDiscoverer();
        const queryHandlers = this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<QueryHandler<Query, Response>>(moduleService.key));
        const queryHandlerMapper = new QueryHandlersMapper(queryHandlers);
        const queryBus = this.container.get<QueryBus>(ContainerKeys.QueryBus);
        queryBus.attachMapper(queryHandlerMapper)
    }

    private async initCommandBus() {
        const moduleServiceDiscover = new CommandHandlersModuleDiscoverer();
        const commandHandlers = this.modules
            .map((module) => moduleServiceDiscover.discover(module))
            .reduce((prev, current) => prev.concat(current), [])
            .map((moduleService) => this.container.get<CommandHandler<Command>>(moduleService.key));
        const commandHandlerMapper = new CommandHandlersMapper(commandHandlers);
        const commandBus = this.container.get<CommandBus>(ContainerKeys.CommandBus);
        commandBus.attachMapper(commandHandlerMapper)
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
        ]);
    }
}
