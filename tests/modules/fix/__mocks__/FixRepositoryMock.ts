import FixRepository from '../../../../src/modules/fix/domain/FixRepository';
import AuthUserId from '../../../../src/modules/auth/domain/AuthUserId';
import Fix from '../../../../src/modules/fix/domain/Fix';
import FixId from '../../../../src/modules/fix/domain/FixId';
import { Nullable } from '../../../../src/microk/common/Nullable';

export default class FixRepositoryMock implements FixRepository {
    private mockFix: Fix;

    private readonly saveSpy = jest.fn();
    private readonly deleteSpy = jest.fn();

    mockReturn(fix: Fix): void {
        this.mockFix = fix;
    }

    async delete(id: FixId): Promise<void> {
        this.deleteSpy(id);
    }

    async save(fix: Fix): Promise<void> {
        this.saveSpy(fix);
    }

    async search(id: FixId): Promise<Nullable<Fix>> {
        return this.mockFix;
    }

    async searchUser(userId: AuthUserId): Promise<Fix[]> {
        return [this.mockFix];
    }

    hasBenCalledSaveWith(fix: Fix) {
        expect(this.saveSpy)
            .toHaveBeenCalledWith(fix)
    }
}
