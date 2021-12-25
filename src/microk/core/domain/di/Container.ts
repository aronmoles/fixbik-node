import { Type } from '../../../common/Type';

export type ContainerKey = string | number | symbol;
export type ContainerService = any;
export type ContainerServiceType = 'instance' | 'class';
export type ContainerServiceConstructor = Type<any>;

export default interface Container {
    addInstance(containerKey: ContainerKey, service: ContainerService)
    addClass(containerKey: ContainerKey, constructor: ContainerServiceConstructor)
    get(containerKey: ContainerKey): ContainerService
}
