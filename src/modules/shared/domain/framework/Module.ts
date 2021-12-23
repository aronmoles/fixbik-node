import Controller from './Controller';
import { Type } from './Type';
import { Dependency } from './di/Dependency';
import { HttpMethod } from '../http/HttpMethod';
import { ContainerKey } from './di/Container';
import { Middleware } from './Middleware';
import { QueryHandler } from '../query-bus/QueryHandler';

export interface ModuleService<T> {
    key: ContainerKey,
    class: Type<T>,
    dep?: Dependency[],
}

export interface ModuleController extends ModuleService<Controller> {
    path: string,
    httpMethod: HttpMethod,
}

export default interface Module {
    basePath?: string,
    controllers?: ModuleController[],
    middlewares?: ModuleService<Middleware>[],
    services?: ModuleService<any>[],

    queryHandlers?: ModuleService<QueryHandler<any, any>>[],
    commandHandlers?: ModuleService<any>[],
    domainEventSubscriber?: ModuleService<any>[],
}
