import DependencyMapper from '../../domain/di/DependencyMapper';
import { Dependency } from '../../domain/di/Dependency';
import Module from '../../domain/module/Module';

export default class ModuleDependencyMapper implements DependencyMapper {
    constructor(
        private readonly modules: Module[],
    ) {}

    getClassDependencies(name: string): Dependency[] {
        for (const module of this.modules) {
            const services = [
                ...(module.controllers || []),
                ...(module.services || []),
                ...(module.middlewares || []),
                ...(module.queryHandlers || []),
                ...(module.commandHandlers || []),
                ...(module.domainEventSubscribers || []),
            ];
            for (const moduleController of services) {
                if (moduleController.class.prototype.constructor.name === name) {
                    return moduleController.dep || [];
                }
            }
        }
        return [];
    }
}
