import Command from '../../../../microk/cqrs/domain/command/Command';
import MessageNameFactory from '../../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';

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
}
