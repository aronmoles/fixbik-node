import { ServerController, ServerControllers } from '../../../../app/Server';
import { Middleware } from '../../domain/Middleware';
import Module from '../../domain/module/Module';
import ModuleDiscoverer from '../../domain/module/ModuleDiscoverer';
import DependencyContainer from '../di/DependencyContainer';

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
