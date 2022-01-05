import BikeCreatorCommand from '../../../../../src/modules/bike/application/create/BikeCreatorCommand';
import { UuidMother } from '../../../shared/domain/UuidMother';
import { WordMother } from '../../../shared/domain/WordMother';
import { NumberMother } from '../../../shared/domain/NumberMother';

export default class BikeCreatorCommandMother {
    static random(): BikeCreatorCommand {
        return new BikeCreatorCommand(
            UuidMother.random(),
            UuidMother.random(),
            WordMother.random(),
            WordMother.random(),
            WordMother.random(),
            NumberMother.random(new Date().getFullYear() + 1),
        )
    }
}
