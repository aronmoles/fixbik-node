import Fix from '../../../../src/modules/fix/domain/Fix';
import FixName from '../../../../src/modules/fix/domain/FixName';
import AuthUserId from '../../../../src/modules/auth/domain/AuthUserId';
import FixId from '../../../../src/modules/fix/domain/FixId';
import AuthUserIdMother from '../../auth/domain/AuthUserIdMother';
import FixNameMother from './FixNameMother';
import FixIdMother from './FixIdMother';
import FixCreatorCommand from '../../../../src/modules/fix/application/create/FixCreatorCommand';
import FixUpdateCommand from '../../../../src/modules/fix/application/update/FixUpdateCommand';
import FixRemoveCommand from '../../../../src/modules/fix/application/remove/FixRemoveCommand';

export default class FixMother {
    static create(
        id: FixId,
        name: FixName,
        userId: AuthUserId,
    ): Fix {
        return new Fix(id, name, userId);
    }

    static random(): Fix {
        return this.create(
            FixIdMother.random(),
            FixNameMother.random(),
            AuthUserIdMother.random(),
        );
    }

    static fromFixCreatorCommand(command: FixCreatorCommand): Fix {
        return this.create(
            FixId.fromString(command.fixId),
            FixName.fromString(command.fixName),
            AuthUserId.fromString(command.userId),
        )
    }

    static fromFixUpdateCommand(command: FixUpdateCommand): Fix {
        return this.create(
            FixId.fromString(command.fixId),
            FixName.fromString(command.fixName),
            AuthUserId.fromString(command.userId),
        )
    }

    static fromFixRemoveCommand(command: FixRemoveCommand): Fix {
        return this.create(
            FixId.fromString(command.fixId),
            FixNameMother.random(),
            AuthUserId.fromString(command.userId),
        )
    }
}
