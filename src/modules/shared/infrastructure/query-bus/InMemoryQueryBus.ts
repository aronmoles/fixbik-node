import QueryBus from '../../domain/query-bus/QueryBus';
import Query from '../../domain/query-bus/Query';
import QueryHandlersMapper from './QueryHandlersMapper';
import { Response } from '../../domain/Response';

export default class InMemoryQueryBus implements QueryBus {
    constructor(private queryHandlersMapper: QueryHandlersMapper) {}

    public ask<R extends Response>(query: Query): Promise<R> {
        const handler = this.queryHandlersMapper.search(query);

        // TODO remove unknown
        return handler.handle(query) as unknown as Promise<R>;
    }
}
