import BikeName from '../../../../src/modules/bike/domain/BikeName';
import { WordMother } from '../../shared/domain/WordMother';

export default class BikeNameMother {
    static create(name: string): BikeName {
        return new BikeName(name)
    }

    static random(): BikeName {
        return this.create(WordMother.random())
    }
}
