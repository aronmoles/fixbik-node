import { Connection, EntitySchema, Repository } from 'typeorm';
import { Keys } from '../../../../modules/shared/infrastructure/di/Keys';
import { AggregateRoot } from '../../../common/AggregateRoot';
import { Criteria } from '../../../common/criteria/Criteria';
import { Nullable } from '../../../common/Nullable';
import Inject from '../../../core/infrastructure/di/Inject.decorator';
import TypeOrmCriteriaConverter from './TypeOrmCriteriaConverter';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
    private readonly criteriaConverter = new TypeOrmCriteriaConverter();

    constructor(
        @Inject(Keys.App.ConnectionManager) private _client: Promise<Connection>
    ) {
    }

    protected abstract entitySchema(): EntitySchema<T>;

    protected client(): Promise<Connection> {
        return this._client;
    }

    protected async repository(): Promise<Repository<T>> {
        return (await this._client).getRepository(this.entitySchema());
    }

    protected async persist(aggregateRoot: T): Promise<void> {
        const repository = await this.repository();
        await repository.save(aggregateRoot as any);
    }

    public async searchByCriteria(criteria: Criteria): Promise<Nullable<T[]>> {
        const repository = await this.repository();
        const findOptions = this.criteriaConverter.convert(criteria);
        return repository.find(findOptions);
    }

    public async searchOneByCriteria(criteria: Criteria): Promise<Nullable<T>> {
        const repository = await this.repository();
        const findOptions = this.criteriaConverter.convert(criteria);
        return repository.findOne(findOptions);
    }
}
