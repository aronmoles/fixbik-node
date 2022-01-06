import { Connection, EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../../microk/persistence/infrastructure/typeorm/TypeOrmRepository';
import { Nullable } from '../../../../microk/common/Nullable';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import Bike from '../../domain/Bike';
import BikeRepository from '../../domain/BikeRepository';
import { BikeEntity } from './typeorm/Bike.Entity';
import BikeId from '../../domain/BikeId';
import AuthUserId from '../../../auth/domain/AuthUserId';

export class TypeOrmBikeRepository extends TypeOrmRepository<Bike> implements BikeRepository {
    constructor(@Inject(Keys.App.ConnectionManager) client: Promise<Connection>) {
        super(client);
    }

    protected entitySchema(): EntitySchema<Bike> {
        return BikeEntity;
    }

    public save(bike: Bike): Promise<void> {
        return this.persist(bike);
    }

    public async search(id: BikeId): Promise<Nullable<Bike>> {
        const repository = await this.repository();
        return repository.findOne({ id });
    }

    public async searchUser(authUserId: AuthUserId): Promise<Nullable<Bike[]>> {
        const repository = await this.repository();
        return repository.find({ userId: authUserId.value() });
    }

    async delete(bikeId: BikeId): Promise<void> {
        const repository = await this.repository();
        await repository.delete(bikeId.value())
    }
}
