import { HttpMethod } from '@microk/common/http/HttpMethod';
import { HttpStatus } from '@microk/common/http/HttpStatus';
import Env from '@microk/core/domain/Env';
import { ErrorMiddleware } from '@microk/core/domain/ErrorMiddleware';
import Controller from '@microk/core/domain/http/Controller';
import Logger from '@microk/core/domain/Logger';
import { Middleware } from '@microk/core/domain/Middleware';
import OpenApi, { OpenApiConfig } from '@microk/docs/openapi';
import bodyParser from 'body-parser';
import compress from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import { EnvKey } from './ProcessEnv';
import yaml from 'yaml';
import swaggerUi from 'swagger-ui-express';

export type ServerController = {
    method: HttpMethod,
    path: string,
    controller: Controller<unknown>,
    middlewares: Middleware[],
}

export type ServerOpenApiConfig = OpenApiConfig & { swaggerUIPath?: string, apiDocsPath?: string, format?: 'yaml' | 'json' }

export type ServerOptions = {
    openapi?: ServerOpenApiConfig,
}

export type ServerControllers = ServerController[];

export default class Server {
    // TODO Exportar interfaz Server y renombrar a Express Server
    private readonly logger: Logger;

    private readonly env: Env<EnvKey>;

    private readonly express: express.Express;

    httpServer?: http.Server;

    constructor(env: Env<EnvKey>, logger: Logger, options?: ServerOptions) {
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
        // Disable cache
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        });
        // Openapi
        if (options && options.openapi) {
            const openApi = new OpenApi(options.openapi)
            const openApiDoc = openApi.generateDocs();

            if (options.openapi.apiDocsPath) {
                this.express.get(options.openapi.apiDocsPath, (req: Request, res: Response) => {
                    switch (options.openapi.format) {
                        case 'json':
                            res.json(openApiDoc);
                            break;
                        case 'yaml':
                            res.setHeader('Content-Type', 'text/yaml')
                                .send(yaml.stringify(openApiDoc))
                            break;
                        default:
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    }
                });
            }

            if (options.openapi.swaggerUIPath) {
                this.express.use(options.openapi.swaggerUIPath, swaggerUi.serve, swaggerUi.setup(openApiDoc, {}));
            }
        }
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

    registerControllers(controllers: Controller<unknown>[]): void {
        const router = Router();
        controllers.forEach((controller) => {
            const routerMiddlewares = [];
            (controller.config().middlewares || []).forEach((middleware) => {
                routerMiddlewares.push((req: Request, res: Response, next: () => void) => {
                    middleware.apply(req, res, next)
                })
            })

            switch (controller.config().method) {
                case HttpMethod.GET:
                    router.get(
                        controller.config().path,
                        ...[
                            ...routerMiddlewares,
                            async (req, res) => {
                                const response = await controller.run(req);
                                res.status(response.status).send(response.data)
                            },
                        ],
                    );
                    break;
                case HttpMethod.POST:
                    router.post(
                        controller.config().path,
                        ...[
                            ...routerMiddlewares,
                            async (req, res) => {
                                const response = await controller.run(req);
                                res.status(response.status).send(response.data)
                            },
                        ],
                    );
                    break;
                case HttpMethod.PUT:
                    router.put(
                        controller.config().path,
                        ...[
                            ...routerMiddlewares,
                            async (req, res) => {
                                const response = await controller.run(req);
                                res.status(response.status).send(response.data)
                            },
                        ],
                    );
                    break;
                case HttpMethod.DELETE:
                    router.delete(
                        controller.config().path,
                        ...[
                            ...routerMiddlewares,
                            async (req, res) => {
                                const response = await controller.run(req);
                                res.status(response.status).send(response.data)
                            },
                        ],
                    );
                    break;
                default:
                    throw new Error(`HttpMethod <${controller.config().method}> not supported`);
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
