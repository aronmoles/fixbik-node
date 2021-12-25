import QueryBus from './QueryBus';
import Query from './Query';
import { QueryResponse } from './QueryResponse';
import { Mapper } from '../../../common/Mapper';
import { QueryHandler } from './QueryHandler';

export default class QueryBusDecorator implements QueryBus {
    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    attachMapper(queryHandlerMapper: Mapper<Query, QueryHandler<Query, QueryResponse>>): void {
        this.queryBus.attachMapper(queryHandlerMapper)
    }

    ask<R extends QueryResponse>(query: Query): Promise<R> {
        return this.queryBus.ask(query);
    }
}
