import Query from '../../domain/query-bus/Query';
import { Response } from '../../domain/Response';
import BusMiddleware from '../../domain/BusMiddleware';
import QueryBusDecorator from '../../domain/query-bus/QueryBusDecorator';
import QueryBus from '../../domain/query-bus/QueryBus';

export default class MiddlewareQueryBus extends QueryBusDecorator {
    private readonly middlewares: BusMiddleware<Query, Response>[];

    constructor(queryBus: QueryBus, middlewares: BusMiddleware<Query, Response>[]) {
        super(queryBus);
        this.middlewares = middlewares;
    }

    ask<R extends Response>(query: Query): Promise<R> {
        const runner = (index: number) => {
            if (this.middlewares[index]) {
                return this.middlewares[index].handle(query, () => runner(index + 1))
            }
            return super.ask(query);
        }

        return runner(0)
    }
}
