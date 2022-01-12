import DomainEvent from '../../../microk/event/domain/DomainEvent';
import MessageId from '../../../microk/common/message/MessageId';
import MessageNameFactory from '../../../microk/common/message/MessageNameFactory';
import AggregateMessageOccurredOn from '../../../microk/common/message/AggregateMessageOccurredOn';
import Bike from './Bike';
import { MessageType } from '../../../microk/common/message/MessageType';
import { PrimitivesObject } from '../../../microk/common/PrimitiveType';

export default class BikeCreatedDomainEvent extends DomainEvent {
    constructor(private readonly bike: Bike) {
        super(
            MessageId.create(),
            MessageNameFactory.create('created', 'bike', MessageType.DOMAIN_EVENT),
            bike.id,
            AggregateMessageOccurredOn.now(),
        );
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                name: this.bike.name.value(),
                brand: this.bike.brand.value(),
                model: this.bike.model.value(),
                year: this.bike.year.value(),
                userId: this.bike.userId.value(),
            },
        };
    }
}
