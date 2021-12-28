import { Mapper } from '../../../common/Mapper';
import WrapperExecutor from '../../../core/domain/WrapperExecutor';
import Executor from '../../../core/infrastructure/Executor';
import Query from '../../domain/query/Query';
import QueryBus from '../../domain/query/QueryBus';
import { QueryHandler } from '../../domain/query/QueryHandler';
import { QueryResponse } from '../../domain/query/QueryResponse';

export default class InMemoryQueryBus implements QueryBus {
    private readonly executor: Executor<Query, QueryResponse>;

    constructor(
        private readonly queryHandlersMapper: Mapper<Query, QueryHandler<Query, QueryResponse>>,
        executors: WrapperExecutor<Query, QueryResponse>[] = [],
    ) {
        this.executor = new Executor<Query, QueryResponse>(executors);
    }

    ask<R extends QueryResponse>(query: Query): Promise<R> {
        return this.executor.run(query, () => {
            const handler = this.queryHandlersMapper.search(query);
            return handler.handle(query);
        }) as Promise<R>;
    }
}
