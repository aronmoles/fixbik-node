import AggregateMessageOccurredOn from '@microk/common/message/AggregateMessageOccurredOn';
import MessageId from '@microk/common/message/MessageId';
import { MessageType } from '@microk/common/message/MessageType';
import MessageNameFactory from '@microk/common/value-object/MessageNameFactory';
import DomainEvent from '@microk/event/domain/DomainEvent';
import { AuthUser } from './AuthUser';

export default class AuthUserAuthenticatedDomainEvent extends DomainEvent {
    constructor(authUser: AuthUser) {
        super(
            MessageId.create(),
            MessageNameFactory.create('authenticated', 'auth_user', MessageType.DOMAIN_EVENT),
            authUser.id,
            AggregateMessageOccurredOn.now(),
        );
    }
}
