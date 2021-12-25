import Module, { ModuleService } from '../../domain/module/Module';
import ModuleDiscoverer from '../../domain/module/ModuleDiscoverer';

export default class ServiceModuleDiscoverer implements ModuleDiscoverer<ModuleService<any>[]> {
    discover(module: Module): ModuleService<any>[] {
        const services: ModuleService<any>[] = [];

        services.push(...(module.services || []));
        services.push(...(module.controllers || []));
        services.push(...(module.middlewares || []));
        services.push(...(module.queryHandlers || []));
        services.push(...(module.commandHandlers || []));
        services.push(...(module.domainEventSubscribers || []));

        return services;
    }
}
