import DependencyContainer from '../di/DependencyContainer';
import Module from '../../../domain/framework/Module';
import ModuleDiscoverer from '../../../domain/framework/ModuleDiscoverer';
import { ServerController, ServerControllers } from '../../../../../app/Server';
import { Middleware } from '../../../domain/framework/Middleware';

export default class ServerRoutesModuleDiscoverer implements ModuleDiscoverer<ServerControllers> {
    constructor(
        private readonly dependencyContainer: DependencyContainer,
    ) {}

    discover(module: Module): ServerControllers {
        const serverControllers: ServerController[] = (module.controllers || []).map((moduleController) => ({
            method: moduleController.httpMethod,
            path: `${module.basePath || ''}${moduleController.path}`,
            controller: this.dependencyContainer.get(moduleController.key),
        }));

        const middlewares: Middleware[] = (module.middlewares || [])
            .map((moduleService) => this.dependencyContainer.get(moduleService.key));

        return {
            serverControllers,
            middlewares,
        };
    }
}
