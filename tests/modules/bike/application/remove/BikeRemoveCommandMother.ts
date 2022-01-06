import { UuidMother } from '../../../shared/domain/UuidMother';
import BikeRemoveCommand from '../../../../../src/modules/bike/application/remove/BikeRemoveCommand';

export default class BikeRemoveCommandMother {
    static random(): BikeRemoveCommand {
        return new BikeRemoveCommand(
            UuidMother.random(),
            UuidMother.random(),
        )
    }
}
