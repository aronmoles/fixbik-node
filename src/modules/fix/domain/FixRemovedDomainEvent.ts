import DomainEvent from '../../../microk/event/domain/DomainEvent';
import Fix from './Fix';
import AggregateMessageOccurredOn from '../../../microk/common/message/AggregateMessageOccurredOn';
import MessageNameFactory from '../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../microk/common/message/MessageType';
import MessageId from '../../../microk/common/message/MessageId';

export default class FixRemovedDomainEvent extends DomainEvent {
    constructor(
        private readonly fix: Fix,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('removed', 'fix', MessageType.DOMAIN_EVENT),
            fix.id,
            AggregateMessageOccurredOn.now(),
        );
    }
}
