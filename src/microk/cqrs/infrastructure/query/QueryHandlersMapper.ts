import Query from '../../domain/query/Query';
import { QueryHandler } from '../../domain/query/QueryHandler';
import { QueryNotRegisteredError } from '../../domain/query/QueryNotRegisteredError';
import { QueryResponse } from '../../domain/query/QueryResponse';

export default class QueryHandlersMapper {
    private queryHandlersMap: Map<string, QueryHandler<Query, QueryResponse>>;

    constructor(queryHandlers: Array<QueryHandler<Query, QueryResponse>>) {
        this.queryHandlersMap = this.formatHandlers(queryHandlers);
    }

    private formatHandlers(
        queryHandlers: Array<QueryHandler<Query, QueryResponse>>
    ): Map<string, QueryHandler<Query, QueryResponse>> {
        const handlersMap = new Map();

        queryHandlers.forEach((queryHandler) => {
            handlersMap.set(queryHandler.subscribedTo(), queryHandler);
        });

        return handlersMap;
    }

    public search(query: Query): QueryHandler<Query, QueryResponse> {
        const queryHandler = this.queryHandlersMap.get(query.constructor.name);

        if (!queryHandler) {
            throw new QueryNotRegisteredError(query);
        }

        return queryHandler;
    }
}
