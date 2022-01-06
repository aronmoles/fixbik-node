import { UuidMother } from '../../../shared/domain/UuidMother';
import FixRemoveCommand from '../../../../../src/modules/fix/application/remove/FixRemoveCommand';

export default class FixRemoveCommandMother {
    static random(): FixRemoveCommand {
        return new FixRemoveCommand(
            UuidMother.random(),
            UuidMother.random(),
        )
    }
}
