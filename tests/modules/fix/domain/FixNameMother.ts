import FixName from '../../../../src/modules/fix/domain/FixName';
import { WordMother } from '../../shared/domain/WordMother';

export default class FixNameMother {
    static create(id: string): FixName {
        return new FixName(id);
    }

    static random(): FixName {
        return this.create(WordMother.random());
    }
}
