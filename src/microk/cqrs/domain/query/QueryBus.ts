import Query from './Query';
import { QueryResponse } from './QueryResponse';
import { Mapper } from '../../../common/Mapper';
import { QueryHandler } from './QueryHandler';

export default interface QueryBus {
    attachMapper(queryHandlerMapper: Mapper<Query, QueryHandler<Query, QueryResponse>>): void;
    ask<R extends QueryResponse>(query: Query): Promise<R>;
}
