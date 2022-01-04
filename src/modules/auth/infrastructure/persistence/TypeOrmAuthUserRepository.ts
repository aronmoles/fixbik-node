import { Connection, EntitySchema } from 'typeorm';
import { AuthUser } from '../../domain/AuthUser';
import AuthUserId from '../../domain/AuthUserId';
import { AuthUserRepository } from '../../domain/AuthUserRepository';
import { AuthUserEntity } from './typeorm/AuthUser.Entity';
import { TypeOrmRepository } from '../../../../microk/persistence/infrastructure/typeorm/TypeOrmRepository';
import { Nullable } from '../../../../microk/common/Nullable';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';

export class TypeOrmAuthUserRepository extends TypeOrmRepository<AuthUser> implements AuthUserRepository {
    constructor(@Inject(Keys.App.ConnectionManager) client: Promise<Connection>) {
        super(client);
    }

    protected entitySchema(): EntitySchema<AuthUser> {
        return AuthUserEntity;
    }

    public save(authUser: AuthUser): Promise<void> {
        return this.persist(authUser);
    }

    public async search(id: AuthUserId): Promise<Nullable<AuthUser>> {
        const repository = await this.repository();

        return repository.findOne({ id });
    }
}
