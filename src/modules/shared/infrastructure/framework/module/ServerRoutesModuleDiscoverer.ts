import DependencyContainer from '../di/DependencyContainer';
import Module from '../../../domain/framework/Module';
import ModuleDiscoverer from '../../../domain/framework/ModuleDiscoverer';
import { ServerController } from '../../../../../app/Server';

export default class ServerRoutesModuleDiscoverer implements ModuleDiscoverer<ServerController[]> {
    constructor(
        private readonly dependencyContainer: DependencyContainer,
    ) {}

    discover(module: Module): ServerController[] {
        return (module.controllers || []).map((moduleController) => ({
            method: moduleController.httpMethod,
            path: `${module.basePath || ''}${moduleController.path}`,
            controller: this.dependencyContainer.get(moduleController.key),
        }));
    }
}
