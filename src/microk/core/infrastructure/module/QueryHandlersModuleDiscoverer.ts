import { QueryHandler } from '../../../cqrs/domain/query/QueryHandler';
import Module, { ModuleService } from '../../domain/module/Module';
import ModuleDiscoverer from '../../domain/module/ModuleDiscoverer';

export default class QueryHandlersModuleDiscoverer
implements ModuleDiscoverer<ModuleService<QueryHandler<any, any>>[]> {
    discover(module: Module): ModuleService<QueryHandler<any, any>>[] {
        const queryHandlers: ModuleService<QueryHandler<any, any>>[] = [];

        queryHandlers.push(...(module.queryHandlers || []));

        return queryHandlers;
    }
}