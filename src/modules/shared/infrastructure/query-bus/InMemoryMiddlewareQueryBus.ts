import Query from '../../domain/query-bus/Query';
import QueryHandlersMapper from './QueryHandlersMapper';
import { Response } from '../../domain/Response';
import BusMiddleware from '../../domain/BusMiddleware';
import InMemoryQueryBus from './InMemoryQueryBus';

export default class InMemoryMiddlewareQueryBus extends InMemoryQueryBus {
    private readonly middlewares: BusMiddleware<Query, Response>[] = [];

    constructor(queryHandlersMapper: QueryHandlersMapper) {
        super(queryHandlersMapper)
    }

    public addMiddleware(queryBusMiddleware: BusMiddleware<Query, Response>) {
        this.middlewares.push(queryBusMiddleware)
    }

    public ask<R extends Response>(query: Query): Promise<R> {
        const runner = (index: number) => {
            if (this.middlewares[index]) {
                return this.middlewares[index].handle(query, () => runner(index + 1))
            }
            return super.ask(query);
        }

        return runner(0)
    }
}
