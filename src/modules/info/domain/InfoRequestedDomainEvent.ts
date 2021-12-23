import DomainEvent from '../../shared/domain/messages/DomainEvent';
import MessageId from '../../shared/domain/messages/MessageId';
import Uuid from '../../shared/domain/value-object/Uuid';
import AggregateMessageOccurredOn from '../../shared/domain/messages/AggregateMessageOccurredOn';
import MessageNameFactory from '../../shared/infrastructure/MessageNameFactory';
import { MessageType } from '../../shared/domain/messages/MessageType';

export default class InfoRequestedDomainEvent extends DomainEvent {
    static EVENT_NAME = MessageNameFactory.create('requested', 'info', MessageType.DOMAIN_EVENT);

    constructor(
        aggregateId: Uuid,
    ) {
        super(
            MessageId.create(),
            InfoRequestedDomainEvent.EVENT_NAME,
            aggregateId,
            AggregateMessageOccurredOn.now(),
        );
    }

    static fromPrimitives(
        aggregateId: string,
    ): DomainEvent {
        return new InfoRequestedDomainEvent(new Uuid(aggregateId));
    }
}
