import Env from '@microk/core/domain/Env';
import { ErrorMiddleware } from '@microk/core/domain/ErrorMiddleware';
import Controller from '@microk/core/domain/http/Controller';
import Logger from '@microk/core/domain/Logger';
import { Middleware } from '@microk/core/domain/Middleware';
import Discoverer from '@microk/core/infrastructure/Discoverer';
import EventBus from '@microk/event/domain/EventBus';
import * as http from 'http';
import Container from './Container';
import { EnvKey } from './ProcessEnv';
import Server, { ServerOpenApiConfig } from './Server';

export default class App {
    private readonly server?: Server;

    constructor() {
        const env = Container.get<Env<EnvKey>>('App.Env');
        const logger = Container.get<Logger>('App.Logger');
        const serverOpenApiConfig = Container.get<ServerOpenApiConfig>('App.ServerOpenApiConfig');
        this.server = new Server(env, logger, {
            openapi: serverOpenApiConfig,
        });
    }

    async start() {
        this.initMiddleware();
        await this.registerRoutes();
        await this.initErrorMiddleware();
        await this.configureEventBus(Container.get<EventBus>('App.EventBus'));
        return this.server.listen();
    }

    async stop() {
        await this.server?.stop();
    }

    get httpServer(): http.Server {
        return this.server?.httpServer;
    }

    private initMiddleware() {
        const middlewareDiscoverer = Container.get<Discoverer<Middleware[]>>('App.MiddlewareDiscoverer')
        const middlewares = middlewareDiscoverer.discover();
        this.server.registerControllerMiddleware(middlewares);
    }

    private async registerRoutes() {
        const controllerDiscoverer = Container.get<Discoverer<Controller<unknown>[]>>('App.ControllerDiscoverer')
        const controllers = controllerDiscoverer.discover();
        this.server.registerControllers(controllers)
    }

    private async initErrorMiddleware() {
        const errorMiddlewareDiscoverer = Container.get<Discoverer<ErrorMiddleware[]>>('App.ErrorMiddlewareDiscoverer')
        const errorMiddlewares = errorMiddlewareDiscoverer.discover();
        this.server.registerErrorMiddleware(errorMiddlewares);
    }

    private async configureEventBus(eventBus: EventBus) {
        await eventBus.start()
    }
}
