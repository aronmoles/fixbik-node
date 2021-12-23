import Query from '../../domain/query-bus/Query';
import { QueryHandler } from '../../domain/query-bus/QueryHandler';
import { QueryNotRegisteredError } from '../../domain/query-bus/QueryNotRegisteredError';
import { Response } from '../../domain/Response';

export default class QueryHandlersMapper {
    private queryHandlersMap: Map<string, QueryHandler<Query, Response>>;

    constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
        this.queryHandlersMap = this.formatHandlers(queryHandlers);
    }

    private formatHandlers(
        queryHandlers: Array<QueryHandler<Query, Response>>
    ): Map<string, QueryHandler<Query, Response>> {
        const handlersMap = new Map();

        queryHandlers.forEach((queryHandler) => {
            handlersMap.set(queryHandler.subscribedTo(), queryHandler);
        });

        return handlersMap;
    }

    public search(query: Query): QueryHandler<Query, Response> {
        const queryHandler = this.queryHandlersMap.get(query.constructor.name);

        if (!queryHandler) {
            throw new QueryNotRegisteredError(query);
        }

        return queryHandler;
    }
}
