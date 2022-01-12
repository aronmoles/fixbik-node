import Command from '../../../../microk/cqrs/domain/command/Command';
import MessageId from '../../../../microk/common/message/MessageId';
import MessageNameFactory from '../../../../microk/common/message/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';
import { Req } from '../../../../microk/core/domain/http/Req';

export default class FixCreatorCommand extends Command {
    constructor(
        private readonly _fixId: string,
        private readonly _fixName: string,
        private readonly _userId: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('create', 'fix', MessageType.COMMAND),
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
            attributes: {
                id: this._fixId,
                name: this._fixName,
                userId: this._userId,
            },
        };
    }

    static fromRequest(req: Req): FixCreatorCommand {
        return new FixCreatorCommand(
            req.params.id,
            req.body.name,
            req.auth.authUserId,
        )
    }
}
