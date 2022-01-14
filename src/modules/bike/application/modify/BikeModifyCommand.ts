import Command from '../../../../microk/cqrs/domain/command/Command';
import MessageNameFactory from '../../../../microk/common/message/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';
import { Req } from '../../../../microk/core/domain/http/Req';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';

export default class BikeModifyCommand extends Command {
    constructor(
        private readonly _bikeId: string,
        private readonly _bikeName: string,
        private readonly _bikeBrand: string,
        private readonly _bikeModel: string,
        private readonly _bikeYear: number,
        private readonly _authUserId: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('modify', 'bike', MessageType.COMMAND),
        );
    }

    static fromRequest(req: Req): BikeModifyCommand {
        return new BikeModifyCommand(
            req.params.id,
            req.body.name,
            req.body.brand,
            req.body.model,
            req.body.year,
            req.auth.authUserId,
        );
    }

    get bikeId(): string {
        return this._bikeId;
    }

    get bikeName(): string {
        return this._bikeName;
    }

    get bikeBrand(): string {
        return this._bikeBrand;
    }

    get bikeModel(): string {
        return this._bikeModel;
    }

    get bikeYear(): number {
        return this._bikeYear;
    }

    get authUserId(): string {
        return this._authUserId;
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                id: this.bikeId,
                name: this.bikeName,
                brand: this.bikeBrand,
                model: this.bikeModel,
                year: this.bikeYear,
                userId: this.authUserId,
            },
        };
    }
}
