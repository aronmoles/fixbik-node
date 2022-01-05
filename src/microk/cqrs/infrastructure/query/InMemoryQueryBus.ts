import { Keys } from '../../../../modules/shared/infrastructure/di/Keys';
import { Mapper } from '../../../common/Mapper';
import { ContainerTag } from '../../../core/domain/di/ContainerTag';
import WrapperExecutor from '../../../core/domain/WrapperExecutor';
import Inject from '../../../core/infrastructure/di/Inject.decorator';
import InjectTag from '../../../core/infrastructure/di/InjecTag.decorator';
import Executor from '../../../core/infrastructure/Executor';
import Query from '../../domain/query/Query';
import QueryBus from '../../domain/query/QueryBus';
import { QueryHandler } from '../../domain/query/QueryHandler';

export default class InMemoryQueryBus implements QueryBus {
    private readonly executor: Executor<Query, any>;

    constructor(
        @Inject(Keys.CQRS.QueryHandlersMapper)
        private readonly queryHandlersMapper: Mapper<Query, QueryHandler<Query, any>>,
        @InjectTag(ContainerTag.QUERY_EXECUTOR)
        executors: WrapperExecutor<Query, any>[] = [],
    ) {
        this.executor = new Executor<Query, any>(executors);
    }

    ask<R>(query: Query): Promise<R> {
        return this.executor.run(query, () => {
            const handler = this.queryHandlersMapper.search(query);
            return handler.handle(query);
        }) as Promise<R>;
    }
}
