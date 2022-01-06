import DomainEvent from '../../../microk/event/domain/DomainEvent';
import Bike from './Bike';
import MessageNameFactory from '../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../microk/common/message/MessageType';
import AggregateMessageOccurredOn from '../../../microk/common/message/AggregateMessageOccurredOn';
import MessageId from '../../../microk/common/message/MessageId';

export default class BikeRemovedDomainEvent extends DomainEvent {
    constructor(bike: Bike) {
        super(
            MessageId.create(),
            MessageNameFactory.create('removed', 'bike', MessageType.DOMAIN_EVENT),
            bike.id,
            AggregateMessageOccurredOn.now(),
        );
    }
}
