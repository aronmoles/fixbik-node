import Command from '../../../../microk/cqrs/domain/command/Command';
import MessageNameFactory from '../../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';

export default class SetInfoCommand extends Command {
    constructor() {
        super(
            MessageId.create(),
            MessageNameFactory.create('modified', 'info', MessageType.COMMAND),
        );
    }
}
