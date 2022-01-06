import Command from '../../../../microk/cqrs/domain/command/Command';
import MessageId from '../../../../microk/common/message/MessageId';
import MessageNameFactory from '../../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';
import { Req } from '../../../../microk/core/domain/http/Req';

export default class FixUpdateCommand extends Command {
    constructor(
        private readonly _fixId: string,
        private readonly _fixName: string,
        private readonly _userId: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('update', 'fix', MessageType.COMMAND),
        );
    }

    get fixId(): string {
        return this._fixId;
    }

    get fixName(): string {
        return this._fixName;
    }

    get userId(): string {
        return this._userId;
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            userId: this._userId,
            attributes: {
                id: this._fixId,
                name: this._fixName,
            },
        };
    }

    static fromRequest(req: Req): FixUpdateCommand {
        return new FixUpdateCommand(
            req.params.id,
            req.body.name,
            req.auth.authUserId,
        )
    }
}
