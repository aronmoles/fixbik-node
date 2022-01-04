import { AuthUser } from './AuthUser';
import DomainEvent from '../../../microk/event/domain/DomainEvent';
import MessageNameFactory from '../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../microk/common/message/MessageType';
import AggregateMessageOccurredOn from '../../../microk/common/message/AggregateMessageOccurredOn';
import MessageId from '../../../microk/common/message/MessageId';

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
