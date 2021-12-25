import BusMiddleware from '../../../core/domain/BusMiddleware';
import Query from '../../domain/query/Query';
import QueryBus from '../../domain/query/QueryBus';
import QueryBusDecorator from '../../domain/query/QueryBusDecorator';
import { QueryResponse } from '../../domain/query/QueryResponse';

export default class MiddlewareQueryBus extends QueryBusDecorator {
    private readonly middlewares: BusMiddleware<Query, QueryResponse>[];

    constructor(queryBus: QueryBus, middlewares: BusMiddleware<Query, QueryResponse>[]) {
        super(queryBus);
        this.middlewares = middlewares;
    }

    ask<R extends QueryResponse>(query: Query): Promise<R> {
        const runner = (index: number) => {
            if (this.middlewares[index]) {
                return this.middlewares[index].handle(query, () => runner(index + 1))
            }
            return super.ask(query);
        }

        return runner(0)
    }
}
