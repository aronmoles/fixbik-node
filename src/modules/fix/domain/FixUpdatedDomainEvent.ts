import DomainEvent from '../../../microk/event/domain/DomainEvent';
import MessageId from '../../../microk/common/message/MessageId';
import MessageNameFactory from '../../../microk/common/message/MessageNameFactory';
import { MessageType } from '../../../microk/common/message/MessageType';
import AggregateMessageOccurredOn from '../../../microk/common/message/AggregateMessageOccurredOn';
import Fix from './Fix';
import { PrimitivesObject } from '../../../microk/common/PrimitiveType';

export default class FixUpdatedDomainEvent extends DomainEvent {
    constructor(
        private readonly fix: Fix,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('updated', 'fix', MessageType.DOMAIN_EVENT),
            fix.id,
            AggregateMessageOccurredOn.now(),
        );
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                name: this.fix.name.value(),
                userId: this.fix.userId.value(),
            },
        };
    }
}
