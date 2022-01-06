import { Connection, EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../../microk/persistence/infrastructure/typeorm/TypeOrmRepository';
import { Nullable } from '../../../../microk/common/Nullable';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import Fix from '../../domain/Fix';
import FixRepository from '../../domain/FixRepository';
import { FixEntity } from './typeorm/Fix.Entity';
import FixId from '../../domain/FixId';

export class TypeOrmFixRepository extends TypeOrmRepository<Fix> implements FixRepository {
    constructor(@Inject(Keys.App.ConnectionManager) client: Promise<Connection>) {
        super(client);
    }

    protected entitySchema(): EntitySchema<Fix> {
        return FixEntity;
    }

    public save(fix: Fix): Promise<void> {
        return this.persist(fix);
    }

    public async search(id: FixId): Promise<Nullable<Fix>> {
        const repository = await this.repository();
        return repository.findOne({ id });
    }

    async delete(id: FixId): Promise<void> {
        const repository = await this.repository();
        await repository.delete(id.value())
    }
}
