import { HttpMethod } from '@microk/common/http/HttpMethod';
import Env from '@microk/core/domain/Env';
import { ErrorMiddleware } from '@microk/core/domain/ErrorMiddleware';
import Controller from '@microk/core/domain/http/Controller';
import Logger from '@microk/core/domain/Logger';
import { Middleware } from '@microk/core/domain/Middleware';
import bodyParser from 'body-parser';
import compress from 'compression';
import express, { Request, Response } from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import { EnvKey } from './ProcessEnv';

export type ServerController = {
    method: HttpMethod,
    path: string,
    controller: Controller<unknown>,
    middlewares: Middleware[],
}

export type ServerControllers = ServerController[];

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

        const options = {
            info: {
                version: '1.0.0',
                title: 'FixBike',
                description: 'Public API',
                license: {
                    name: 'MIT',
                },
            },
            security: {
                jwt: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'jwt',
                },
            },
            baseDir: __dirname,
            // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
            filesPattern: './../**/*.ts',
            // URL where SwaggerUI will be rendered
            swaggerUIPath: '/api-docs',
            // Expose OpenAPI UI
            exposeSwaggerUI: true,
            // Expose Open API JSON Docs documentation in `apiDocsPath` path.
            exposeApiDocs: true,
            // Open API JSON Docs endpoint.
            apiDocsPath: '/api-docs.json',
            // Set non-required fields as nullable by default
            notRequiredAsNullable: false,
            // You can customize your UI options.
            // you can extend swagger-ui-express config. You can checkout an example of this
            // in the `example/configuration/swaggerOptions.js`
            swaggerUiOptions: {},
            // multiple option in case you want more that one instance
            multiple: true,
        };

        expressJSDocSwagger(this.express)(options);
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
