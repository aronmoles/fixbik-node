import EventSubscriber from './EventSubscriber';
import { Mapper } from '../../common/Mapper';
import MessageName from '../../common/message/MessageName';
import DomainEvent from './DomainEvent';

export default interface EventBus {
    attachMapper(domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>): void;
    publish(events: DomainEvent[]): Promise<void>;
}
