import { WordMother } from '../../shared/domain/WordMother';
import BikeModel from '../../../../src/modules/bike/domain/BikeModel';

export default class BikeModelMother {
    static create(model: string): BikeModel {
        return new BikeModel(model)
    }

    static random(): BikeModel {
        return this.create(WordMother.random())
    }
}
