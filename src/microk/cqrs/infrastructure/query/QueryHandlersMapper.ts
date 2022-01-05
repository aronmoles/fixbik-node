import { ContainerTag } from '../../../core/domain/di/ContainerTag';
import InjectTag from '../../../core/infrastructure/di/InjecTag.decorator';
import Query from '../../domain/query/Query';
import { QueryHandler } from '../../domain/query/QueryHandler';
import { QueryNotRegisteredError } from '../../domain/query/QueryNotRegisteredError';

export default class QueryHandlersMapper {
    private queryHandlersMap: Map<string, QueryHandler<Query, any>>;

    constructor(
        @InjectTag(ContainerTag.QUERY_HANDLER) queryHandlers: Array<QueryHandler<Query, any>>
    ) {
        this.queryHandlersMap = this.formatHandlers(queryHandlers);
    }

    private formatHandlers(
        queryHandlers: Array<QueryHandler<Query, any>>
    ): Map<string, QueryHandler<Query, any>> {
        const handlersMap = new Map();

        queryHandlers.forEach((queryHandler) => {
            handlersMap.set(queryHandler.subscribedTo(), queryHandler);
        });

        return handlersMap;
    }

    public search(query: Query): QueryHandler<Query, any> {
        const queryHandler = this.queryHandlersMap.get(query.constructor.name);

        if (!queryHandler) {
            throw new QueryNotRegisteredError(query);
        }

        return queryHandler;
    }
}
