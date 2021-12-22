import Controller from './Controller';
import { Type } from './Type';
import { Dependency } from './di/Dependency';
import { HttpMethod } from '../http/HttpMethod';
import { ContainerKey } from './di/Container';

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
    services?: ModuleService<any>[],
}
