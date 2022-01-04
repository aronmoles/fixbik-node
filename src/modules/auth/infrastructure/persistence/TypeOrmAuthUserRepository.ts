import { EntitySchema } from 'typeorm';
import { AuthUser } from '../../domain/AuthUser';
import AuthUserId from '../../domain/AuthUserId';
import { AuthUserRepository } from '../../domain/AuthUserRepository';
import { AuthUserEntity } from './typeorm/AuthUserEntity';
import { TypeOrmRepository } from '../../../../microk/persistence/infrastructure/typeorm/TypeOrmRepository';
import { Nullable } from '../../../../microk/common/Nullable';

export class TypeOrmAuthUserRepository extends TypeOrmRepository<AuthUser> implements AuthUserRepository {
    protected entitySchema(): EntitySchema<AuthUser> {
        return AuthUserEntity;
    }

    public save(course: AuthUser): Promise<void> {
        return this.persist(course);
    }

    public async search(id: AuthUserId): Promise<Nullable<AuthUser>> {
        const repository = await this.repository();

        return repository.findOne({ id });
    }
}
