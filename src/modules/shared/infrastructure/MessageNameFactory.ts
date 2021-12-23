import { MessageType } from '../domain/messages/MessageType';
import MessageName from '../domain/messages/MessageName';

export default class MessageNameFactory {
    private static readonly DEFAULT_VERSION = 1;
    static create(
        name: string,
        entity: string,
        type: MessageType,
        version = this.DEFAULT_VERSION,
        service = 'auth',
        companyName = 'invoicesystem',
    ): MessageName {
        return new MessageName(`${companyName}.${service}.${type}.${version}.${entity}.${name}`);
    }
}
