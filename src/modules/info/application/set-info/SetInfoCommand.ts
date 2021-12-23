import Command from '../../../shared/domain/command-bus/Command';
import MessageId from '../../../shared/domain/messages/MessageId';
import { MessageType } from '../../../shared/domain/messages/MessageType';
import MessageName from '../../../shared/domain/messages/MessageName';

export default class SetInfoCommand extends Command {
    constructor() {
        super(
            MessageId.generate(),
            MessageType.COMMAND,
            new MessageName('command.info.set'),
        );
    }
}
