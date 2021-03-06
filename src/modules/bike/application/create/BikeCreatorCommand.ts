import Command from '../../../../microk/cqrs/domain/command/Command';
import MessageNameFactory from '../../../../microk/common/message/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';
import { Req } from '../../../../microk/core/domain/http/Req';
import { PrimitivesObject } from 'microk/common/PrimitiveType';

export default class BikeCreatorCommand extends Command {
    constructor(
        readonly bikeId: string,
        readonly userId: string,
        readonly bikeName: string,
        readonly bikeBrand: string,
        readonly bikeModel: string,
        readonly bikeYear: number,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('create', 'bike', MessageType.COMMAND),
        );
    }

    static fromRequest(req: Req): BikeCreatorCommand {
        return new BikeCreatorCommand(
            req.params.id,
            req.auth.authUserId,
            req.body.name,
            req.body.brand,
            req.body.model,
            req.body.year,
        )
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                id: this.bikeId,
                userId: this.userId,
                name: this.bikeName,
                brand: this.bikeBrand,
                model: this.bikeModel,
                year: this.bikeYear,
            },
        };
    }
}
