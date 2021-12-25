import QueryBus from './QueryBus';
import Query from './Query';
import { Response } from '../Response';
import { Mapper } from '../Mapper';
import { QueryHandler } from './QueryHandler';

export default class QueryBusDecorator implements QueryBus {
    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    attachMapper(queryHandlerMapper: Mapper<Query, QueryHandler<Query, Response>>): void {
        this.queryBus.attachMapper(queryHandlerMapper)
    }

    ask<R extends Response>(query: Query): Promise<R> {
        return this.queryBus.ask(query);
    }
}
