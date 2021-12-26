import Env from '@microk/core/domain/Env';
import { ErrorMiddleware } from '@microk/core/domain/ErrorMiddleware';
import Controller from '@microk/core/domain/http/Controller';
import Logger from '@microk/core/domain/Logger';
import { Middleware } from '@microk/core/domain/Middleware';
import Discoverer from '@microk/core/infrastructure/Discoverer';
import * as http from 'http';
import Container from './Container';
import { EnvKey } from './ProcessEnv';
import Server from './Server';

export default class App {
    private readonly server?: Server;

    constructor() {
        const env = Container.get<Env<EnvKey>>('App.Env');
        const logger = Container.get<Logger>('App.Logger');
        this.server = new Server(env, logger);
    }

    async start() {
        this.initMiddleware();
        await this.registerRoutes();
        await this.initErrorMiddleware();
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
        const controllerDiscoverer = Container.get<Discoverer<Controller[]>>('App.ControllerDiscoverer')
        const controllers = controllerDiscoverer.discover();
        this.server.registerControllers(controllers)
    }

    private async initErrorMiddleware() {
        const errorMiddlewareDiscoverer = Container.get<Discoverer<ErrorMiddleware[]>>('App.ErrorMiddlewareDiscoverer')
        const errorMiddlewares = errorMiddlewareDiscoverer.discover();
        this.server.registerErrorMiddleware(errorMiddlewares);
    }
}
