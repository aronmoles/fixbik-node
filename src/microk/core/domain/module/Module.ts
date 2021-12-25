import Controller from '../http/Controller';
import { Type } from '../../../common/Type';
import { Dependency } from '../di/Dependency';
import { ContainerKey } from '../di/Container';
import { Middleware } from '../Middleware';
import { HttpMethod } from '../../../common/http/HttpMethod';
import { QueryHandler } from '../../../cqrs/domain/query/QueryHandler';

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
    domainEventSubscribers?: ModuleService<any>[],
}
