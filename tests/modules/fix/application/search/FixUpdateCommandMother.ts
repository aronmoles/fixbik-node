import { UuidMother } from '../../../shared/domain/UuidMother';
import { WordMother } from '../../../shared/domain/WordMother';
import FixUpdateCommand from '../../../../../src/modules/fix/application/update/FixUpdateCommand';

export default class FixUpdateCommandMother {
    static random(): FixUpdateCommand {
        return new FixUpdateCommand(
            UuidMother.random(),
            WordMother.random(),
            UuidMother.random(),
        )
    }
}
