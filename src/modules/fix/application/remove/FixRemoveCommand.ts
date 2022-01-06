import Command from '../../../../microk/cqrs/domain/command/Command';
import MessageNameFactory from '../../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';
import { Req } from '../../../../microk/core/domain/http/Req';

export default class FixRemoveCommand extends Command {
    constructor(
        private readonly _fixId: string,
        private readonly _userId: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('remove', 'fix', MessageType.COMMAND),
        );
    }

    get fixId(): string {
        return this._fixId;
    }

    get userId(): string {
        return this._userId;
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                fixId: this._fixId,
                userId: this._userId,
            },
        };
    }

    static fromRequest(req: Req): FixRemoveCommand {
        return new FixRemoveCommand(req.params.id, req.auth.authUserId);
    }
}
