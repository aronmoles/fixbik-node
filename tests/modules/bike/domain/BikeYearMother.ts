import BikeYear from '../../../../src/modules/bike/domain/BikeYear';
import { NumberMother } from '../../shared/domain/NumberMother';

export default class BikeYearMother {
    static create(year: number): BikeYear {
        return new BikeYear(year)
    }

    static random(): BikeYear {
        return this.create(NumberMother.random(new Date().getFullYear() + 1))
    }
}
