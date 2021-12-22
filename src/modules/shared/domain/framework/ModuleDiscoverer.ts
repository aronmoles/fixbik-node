import Module from './Module';

export default interface ModuleDiscoverer<T> {
    discover(module: Module): T;
}
