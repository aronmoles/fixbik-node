import FixRepository from '../../../../src/modules/fix/domain/FixRepository';
import Fix from '../../../../src/modules/fix/domain/Fix';
import FixId from '../../../../src/modules/fix/domain/FixId';
import { Nullable } from '../../../../src/microk/common/Nullable';
import { Criteria } from '../../../../src/microk/common/criteria/Criteria';

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

    hasBenCalledSaveWith(fix: Fix) {
        expect(this.saveSpy)
            .toHaveBeenCalledWith(fix)
    }

    hasBenCalledDeleteWith(id: FixId) {
        expect(this.deleteSpy)
            .toHaveBeenCalledWith(id)
    }

    async searchByCriteria(criteria: Criteria): Promise<Fix[]> {
        return [this.mockFix];
    }
}
