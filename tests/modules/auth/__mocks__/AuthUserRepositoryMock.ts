import { AuthUser } from '../../../../src/modules/auth/domain/AuthUser';
import AuthUserId from '../../../../src/modules/auth/domain/AuthUserId';
import { AuthUserRepository } from '../../../../src/modules/auth/domain/AuthUserRepository';
import { Criteria } from '../../../../src/microk/common/criteria/Criteria';
import { Nullable } from '../../../../src/microk/common/Nullable';

export default class AuthUserRepositoryMock implements AuthUserRepository {
    private readonly saveSpy = jest.fn();

    private authUser: AuthUser;

    constructor(
    ) {
    }

    mockReturn(authUser: AuthUser) {
        this.authUser = authUser;
    }

    async save(authUser: AuthUser): Promise<void> {
        this.saveSpy(authUser)
    }

    hasBenCalledSaveWith(authUser: AuthUser) {
        expect(this.saveSpy).toHaveBeenCalledWith(authUser)
    }

    async search(id: AuthUserId): Promise<Nullable<AuthUser>> {
        return this.authUser;
    }

    async searchByCriteria(criteria: Criteria): Promise<Nullable<AuthUser[]>> {
        return [this.authUser];
    }

    async searchOneByCriteria(criteria: Criteria): Promise<Nullable<AuthUser>> {
        return this.authUser;
    }
}
