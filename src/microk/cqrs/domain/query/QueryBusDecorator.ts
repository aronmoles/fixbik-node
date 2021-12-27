import Query from './Query';
import QueryBus from './QueryBus';
import { QueryResponse } from './QueryResponse';

export default class QueryBusDecorator implements QueryBus {
    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    ask<R extends QueryResponse>(query: Query): Promise<R> {
        return this.queryBus.ask(query);
    }
}
