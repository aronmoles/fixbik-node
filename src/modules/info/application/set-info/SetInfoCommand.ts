import MessageId from '@microk/common/message/MessageId';
import { MessageType } from '@microk/common/message/MessageType';
import MessageNameFactory from '@microk/common/value-object/MessageNameFactory';
import Command from '@microk/cqrs/domain/command/Command';

export default class SetInfoCommand extends Command {
    constructor() {
        super(
            MessageId.create(),
            MessageNameFactory.create('modified', 'info', MessageType.COMMAND),
        );
    }
}
