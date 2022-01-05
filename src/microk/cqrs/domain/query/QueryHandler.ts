import { NewableClass } from '../../../common/NewableClass';
import Query from './Query';

export abstract class QueryHandler<Q extends Query, R> {
    private readonly _queryName: string;

    protected constructor(query: NewableClass<Query>) {
        this._queryName = query.name;
    }

    public subscribedTo(): string {
        return this._queryName;
    }

    abstract handle(query: Q): Promise<R>;
}
