import Query from './Query';
import { Response } from '../Response';
import { Mapper } from '../Mapper';
import { QueryHandler } from './QueryHandler';

export default interface QueryBus {
    attachMapper(queryHandlerMapper: Mapper<Query, QueryHandler<Query, Response>>): void;
    ask<R extends Response>(query: Query): Promise<R>;
}
