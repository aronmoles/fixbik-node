import { UuidMother } from '../../../shared/domain/UuidMother';
import { WordMother } from '../../../shared/domain/WordMother';
import { NumberMother } from '../../../shared/domain/NumberMother';
import BikeModifyCommand from '../../../../../src/modules/bike/application/modify/BikeModifyCommand';

export default class BikeModifyCommandMother {
    static random(): BikeModifyCommand {
        return new BikeModifyCommand(
            UuidMother.random(),
            WordMother.random(),
            WordMother.random(),
            WordMother.random(),
            NumberMother.random(new Date().getFullYear() + 1),
            UuidMother.random(),
        )
    }
}
