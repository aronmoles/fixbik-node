import FixId from '../../../../src/modules/fix/domain/FixId';
import { UuidMother } from '../../shared/domain/UuidMother';

export default class FixIdMother {
    static create(id: string): FixId {
        return new FixId(id);
    }

    static random(): FixId {
        return this.create(UuidMother.random());
    }
}
