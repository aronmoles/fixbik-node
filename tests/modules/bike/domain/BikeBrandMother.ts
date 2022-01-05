import { WordMother } from '../../shared/domain/WordMother';
import BikeBrand from '../../../../src/modules/bike/domain/BikeBrand';

export default class BikeBrandMother {
    static create(brand: string): BikeBrand {
        return new BikeBrand(brand)
    }

    static random(): BikeBrand {
        return this.create(WordMother.random())
    }
}
