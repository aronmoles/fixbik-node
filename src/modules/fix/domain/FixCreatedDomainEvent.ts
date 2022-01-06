import DomainEvent from '../../../microk/event/domain/DomainEvent';
import MessageId from '../../../microk/common/message/MessageId';
import MessageNameFactory from '../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../microk/common/message/MessageType';
import Fix from './Fix';
import AggregateMessageOccurredOn from '../../../microk/common/message/AggregateMessageOccurredOn';
import { PrimitivesObject } from '../../../microk/common/PrimitiveType';

export default class FixCreatedDomainEvent extends DomainEvent {
    constructor(
        private readonly fix: Fix,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('created', 'fix', MessageType.DOMAIN_EVENT),
            fix.id,
            AggregateMessageOccurredOn.now(),
        );
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                name: this.name.value(),
            },
        };
    }
}
