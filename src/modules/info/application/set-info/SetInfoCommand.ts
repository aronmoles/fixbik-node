import Command from '../../../shared/domain/command-bus/Command';
import MessageId from '../../../shared/domain/messages/MessageId';
import MessageNameFactory from '../../../shared/infrastructure/MessageNameFactory';
import { MessageType } from '../../../shared/domain/messages/MessageType';

export default class SetInfoCommand extends Command {
    constructor() {
        super(
            MessageId.create(),
            MessageNameFactory.create('modified', 'info', MessageType.COMMAND),
        );
    }
}
