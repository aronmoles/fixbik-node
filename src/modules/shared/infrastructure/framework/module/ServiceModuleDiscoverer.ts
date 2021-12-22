import Module, { ModuleService } from '../../../domain/framework/Module';
import ModuleDiscoverer from '../../../domain/framework/ModuleDiscoverer';

export default class ServiceModuleDiscoverer implements ModuleDiscoverer<ModuleService<any>[]> {
    discover(module: Module): ModuleService<any>[] {
        const services: ModuleService<any>[] = [];

        services.push(...(module.services || []));
        services.push(...(module.controllers || []));

        return services;
    }
}
