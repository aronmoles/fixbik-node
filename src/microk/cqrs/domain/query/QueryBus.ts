import Query from './Query';

export default interface QueryBus {
    ask<R>(query: Query): Promise<R>;
}
