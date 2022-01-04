import * as http from 'http';
import { Keys } from '../modules/shared/infrastructure/di/Keys';
import container from './Container';
import { EnvKey } from './ProcessEnv';
import Server, { ServerOpenApiConfig } from './Server';
import { ErrorMiddleware } from '../microk/core/domain/ErrorMiddleware';
import Discoverer from '../microk/core/domain/Discoverer';
import EventBus from '../microk/event/domain/EventBus';
import Env from '../microk/core/domain/Env';
import Controller from '../microk/core/domain/http/Controller';
import { Middleware } from '../microk/core/domain/Middleware';
import Logger from '../microk/core/domain/Logger';

export default class App {
    private readonly server?: Server;

    constructor() {
        const env = container.get<Env<EnvKey>>(Keys.App.Env);
        const logger = container.get<Logger>(Keys.App.Logger);
        const serverOpenApiConfig = container.get<ServerOpenApiConfig>(Keys.App.ServerOpenApiConfig);
        this.server = new Server(env, logger, {
            openapi: serverOpenApiConfig,
        });
    }

    async start() {
        this.initMiddleware();
        await this.registerRoutes();
        await this.initErrorMiddleware();
        await this.configureEventBus(container.get<EventBus>(Keys.CQRS.EventBus));
        return this.server.listen();
    }

    async stop() {
        await this.server?.stop();
    }

    get httpServer(): http.Server {
        return this.server?.httpServer;
    }

    private initMiddleware() {
        const middlewareDiscoverer = container.get<Discoverer<Middleware[]>>(Keys.App.MiddlewareDiscoverer)
        const middlewares = middlewareDiscoverer.discover();
        this.server.registerControllerMiddleware(middlewares);
    }

    private async registerRoutes() {
        const controllerDiscoverer = container.get<Discoverer<Controller<unknown>[]>>(Keys.App.ControllerDiscoverer)
        const controllers = controllerDiscoverer.discover();
        this.server.registerControllers(controllers)
    }

    private async initErrorMiddleware() {
        const discoverer = container.get<Discoverer<ErrorMiddleware[]>>(Keys.App.ErrorMiddlewareDiscoverer)
        const errorMiddlewares = discoverer.discover();
        this.server.registerErrorMiddleware(errorMiddlewares);
    }

    private async configureEventBus(eventBus: EventBus) {
        await eventBus.start()
    }
}
