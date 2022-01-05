import * as http from 'http';
import { Keys } from '../../../modules/shared/infrastructure/di/Keys';
import container from '../../../app/Container';
import ExpressServer from './ExpressServer';
import { ErrorMiddleware } from '../domain/ErrorMiddleware';
import Discoverer from '../domain/Discoverer';
import EventBus from '../../event/domain/EventBus';
import Env, { EnvType } from '../domain/env/Env';
import Controller from '../domain/http/Controller';
import { Middleware } from '../domain/Middleware';
import Logger from '../domain/Logger';
import Server, { ServerOpenApiConfig } from '../domain/Server';

export default abstract class App<E extends EnvType> {
    private readonly server?: Server;

    protected constructor(env: Env<E>, logger: Logger, serverOpenApiConfig: ServerOpenApiConfig) {
        this.server = new ExpressServer(env, logger, {
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
        return this.server.getHttpServer();
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
