import Query from './Query';
import { QueryResponse } from './QueryResponse';

export default interface QueryBus {
    ask<R extends QueryResponse>(query: Query): Promise<R>;
}
