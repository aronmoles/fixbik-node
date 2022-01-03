import { NewableClass } from '../../../common/NewableClass';
import { ContainerTag } from './ContainerTag';

export type ContainerKey = string | number | symbol;
export type ContainerService = any;
export type ContainerServiceType = 'instance' | 'class';

export type ConstructorParam = {
    index: number,
    serviceKey?: ContainerKey,
    tag?: ContainerTag,
}

export default interface Container {
    addInstance(containerKey: ContainerKey, service: ContainerService, tags?: ContainerTag[])
    addClass(containerKey: ContainerKey, constructor: NewableClass, tags?: ContainerTag[])
    get(containerKey: ContainerKey): ContainerService
    getByTag(tag: ContainerTag): ContainerService[]
}
