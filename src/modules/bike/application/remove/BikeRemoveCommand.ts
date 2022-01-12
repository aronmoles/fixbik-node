import Command from '../../../../microk/cqrs/domain/command/Command';
import MessageNameFactory from '../../../../microk/common/message/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';
import { Req } from '../../../../microk/core/domain/http/Req';

export default class BikeRemoveCommand extends Command {
    constructor(
        private readonly _bikeId: string,
        private readonly _authUserId: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('remove', 'bike', MessageType.COMMAND),
        );
    }

    get bikeId(): string {
        return this._bikeId;
    }

    get authUserId(): string {
        return this._authUserId;
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                bikeId: this._bikeId,
                authUserId: this._authUserId,
            },
        };
    }

    static fromRequest(req: Req) {
        return new BikeRemoveCommand(
            req.params.id,
            req.auth.authUserId,
        )
    }
}
