import FixCreatorCommand from '../../../../../src/modules/fix/application/create/FixCreatorCommand';
import { UuidMother } from '../../../shared/domain/UuidMother';
import { WordMother } from '../../../shared/domain/WordMother';

export default class FixCreatorCommandMother {
    static random(): FixCreatorCommand {
        return new FixCreatorCommand(
            UuidMother.random(),
            WordMother.random(),
            UuidMother.random(),
        )
    }
}
