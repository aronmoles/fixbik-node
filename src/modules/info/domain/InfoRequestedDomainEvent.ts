import { MessageType } from '@microk/common/message/MessageType';
import MessageNameFactory from '@microk/common/value-object/MessageNameFactory';
import Uuid from '@microk/common/value-object/Uuid';
import DomainEvent from '../../../microk/event/domain/DomainEvent';
import MessageId from '../../../microk/common/message/MessageId';
import AggregateMessageOccurredOn from '../../../microk/common/message/AggregateMessageOccurredOn';

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

    static fromPrimitives(args: any): InfoRequestedDomainEvent {
        return new InfoRequestedDomainEvent(new Uuid(args.aggregateId));
    }
}
