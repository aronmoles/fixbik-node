import { HttpMethod } from '@microk/common/http/HttpMethod';
import Env from '@microk/core/domain/Env';
import { ErrorMiddleware } from '@microk/core/domain/ErrorMiddleware';
import Controller from '@microk/core/domain/http/Controller';
import Logger from '@microk/core/domain/Logger';
import { Middleware } from '@microk/core/domain/Middleware';
import bodyParser from 'body-parser';
import compress from 'compression';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import { EnvKey } from './ProcessEnv';

export type ServerController = {
    method: HttpMethod,
    path: string,
    controller: Controller,
}

export type ServerControllers = {
    serverControllers: ServerController[],
    middlewares: Middleware[],
}

export default class Server {
    // TODO Exportar interfaz Server y renombrar a Express Server
    private readonly logger: Logger;

    private readonly env: Env<EnvKey>;

    private readonly express: express.Express;

    httpServer?: http.Server;

    constructor(env: Env<EnvKey>, logger: Logger) {
        this.env = env;
        this.logger = logger;
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(helmet.xssFilter());
        this.express.use(helmet.noSniff());
        this.express.use(helmet.hidePoweredBy());
        this.express.use(helmet.frameguard({ action: 'deny' }));
        this.express.use(compress());
    }

    registerControllerMiddleware(middlewareList: Middleware[]): void {
        middlewareList.forEach((middleware) => {
            this.express.use(middleware.apply.bind(this));
        });
    }

    registerErrorMiddleware(middlewareList: ErrorMiddleware[]): void {
        middlewareList.forEach((middleware) => {
            this.express.use((error, req, res, next) => {
                middleware.apply(error, req, res, next)
            });
        });
    }

    registerControllers(serverControllers: ServerControllers): void {
        const commonRequestHandlers = [];
        serverControllers.middlewares.forEach((middleware) => {
            commonRequestHandlers.push((req: Request, res: Response, next: () => void) => {
                middleware.apply(req, res, next)
            })
        })

        const router = Router();
        serverControllers.serverControllers.forEach((serverController) => {
            switch (serverController.method) {
            case HttpMethod.GET:
                router.get(
                    serverController.path,
                    ...[
                        ...commonRequestHandlers,
                        (req, res) => serverController.controller.run(req, res),
                    ],
                );
                break;
            case HttpMethod.POST:
                router.post(serverController.path, (req, res) => serverController.controller.run(req, res));
                break;
            case HttpMethod.PUT:
                router.put(serverController.path, (req, res) => serverController.controller.run(req, res));
                break;
            case HttpMethod.DELETE:
                router.delete(serverController.path, (req, res) => serverController.controller.run(req, res));
                break;
            default:
                throw new Error(`HttpMethod <${serverController.method}> not supported`);
            }
        });
        this.express.use(router);
    }

    async listen(): Promise<void> {
        return new Promise((resolve) => {
            this.httpServer = this.express.listen(this.env.get('PORT'), () => {
                this.logger.info(
                    `App is running at http://localhost:${this.env.get('PORT')} in ${this.env.get('NODE_ENV')} mode`,
                );
                this.logger.info('  Press CTRL-C to stop\n');
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }
}
