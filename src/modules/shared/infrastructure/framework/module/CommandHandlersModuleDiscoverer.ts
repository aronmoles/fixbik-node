import Module, { ModuleService } from '../../../domain/framework/Module';
import ModuleDiscoverer from '../../../domain/framework/ModuleDiscoverer';
import { QueryHandler } from '../../../domain/query-bus/QueryHandler';

export default class CommandHandlersModuleDiscoverer
implements ModuleDiscoverer<ModuleService<QueryHandler<any, any>>[]> {
    discover(module: Module): ModuleService<QueryHandler<any, any>>[] {
        const queryHandlers: ModuleService<QueryHandler<any, any>>[] = [];

        queryHandlers.push(...(module.commandHandlers || []));

        return queryHandlers;
    }
}