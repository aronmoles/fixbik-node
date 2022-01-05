import DomainEvent from '../../../microk/event/domain/DomainEvent';
import MessageId from '../../../microk/common/message/MessageId';
import MessageNameFactory from '../../../microk/common/value-object/MessageNameFactory';
import AggregateMessageOccurredOn from '../../../microk/common/message/AggregateMessageOccurredOn';
import Bike from './Bike';
import { MessageType } from '../../../microk/common/message/MessageType';

export default class BikeCreatedDomainEvent extends DomainEvent {
    constructor(bike: Bike) {
        super(
            MessageId.create(),
            MessageNameFactory.create('created', 'bike', MessageType.DOMAIN_EVENT),
            bike.id,
            AggregateMessageOccurredOn.now(),
        );
    }
}
