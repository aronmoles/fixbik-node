import Query from './Query';
import { Response } from '../Response';
import { Type } from '../framework/Type';

export abstract class QueryHandler<Q extends Query, R extends Response> {
    private readonly _queryName: string;

    protected constructor(query: Type<Query>) {
        this._queryName = query.name;
    }

    public subscribedTo(): string {
        return this._queryName;
    }

    abstract handle(query: Q): Promise<R>;
}
