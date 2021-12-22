import DependencyMapper from '../../../domain/framework/di/DependencyMapper';
import { Dependency } from '../../../domain/framework/di/Dependency';
import Module from '../../../domain/framework/Module';

export default class ModuleDependencyMapper implements DependencyMapper {
    constructor(
        private readonly modules: Module[],
    ) {}

    getClassDependencies(name: string): Dependency[] {
        for (const module of this.modules) {
            for (const moduleController of module.controllers) {
                if (moduleController.class.prototype.constructor.name === name) {
                    return moduleController.dep;
                }
            }
        }
        return [];
    }
}
