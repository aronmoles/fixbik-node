import QueryBus from '../../domain/query-bus/QueryBus';
import Query from '../../domain/query-bus/Query';
import { Response } from '../../domain/Response';
import { Mapper } from '../../domain/Mapper';
import { QueryHandler } from '../../domain/query-bus/QueryHandler';

export default class InMemoryQueryBus implements QueryBus {
    private queryHandlersMapper: Mapper<Query, QueryHandler<Query, Response>>;

    attachMapper(queryHandlerMapper: Mapper<Query, QueryHandler<Query, Response>>): void {
        this.queryHandlersMapper = queryHandlerMapper;
    }

    public ask<R extends Response>(query: Query): Promise<R> {
        const handler = this.queryHandlersMapper.search(query);

        return handler.handle(query) as Promise<R>;
    }
}
