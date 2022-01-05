import { HttpMethod } from '../../common/http/HttpMethod';
import Controller from './http/Controller';
import { Middleware } from './Middleware';
import { OpenApiConfig } from '../../docs/openapi';
import { ErrorMiddleware } from './ErrorMiddleware';
import http from 'http';

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

export default interface Server {
    registerControllerMiddleware(middlewareList: Middleware[]): void,
    registerErrorMiddleware(middlewareList: ErrorMiddleware[]): void,
    registerControllers(controllers: Controller<unknown>[]): void,
    listen(): Promise<void>,
    stop(): Promise<void>,
    getHttpServer(): http.Server,
}
