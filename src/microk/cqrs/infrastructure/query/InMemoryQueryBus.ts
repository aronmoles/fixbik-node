import { Mapper } from '../../../common/Mapper';
import Query from '../../domain/query/Query';
import QueryBus from '../../domain/query/QueryBus';
import { QueryHandler } from '../../domain/query/QueryHandler';
import { QueryResponse } from '../../domain/query/QueryResponse';

export default class InMemoryQueryBus implements QueryBus {
    private queryHandlersMapper: Mapper<Query, QueryHandler<Query, QueryResponse>>;

    attachMapper(queryHandlerMapper: Mapper<Query, QueryHandler<Query, QueryResponse>>): void {
        this.queryHandlersMapper = queryHandlerMapper;
    }

    ask<R extends QueryResponse>(query: Query): Promise<R> {
        const handler = this.queryHandlersMapper.search(query);

        return handler.handle(query) as Promise<R>;
    }
}
