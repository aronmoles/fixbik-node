import { Type } from '../../../common/Type';
import Query from './Query';
import { QueryResponse } from './QueryResponse';

export abstract class QueryHandler<Q extends Query, R extends QueryResponse> {
    private readonly _queryName: string;

    protected constructor(query: Type<Query>) {
        this._queryName = query.name;
    }

    public subscribedTo(): string {
        return this._queryName;
    }

    abstract handle(query: Q): Promise<R>;
}
