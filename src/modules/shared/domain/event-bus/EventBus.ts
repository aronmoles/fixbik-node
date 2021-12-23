import DomainEvent from '../messages/DomainEvent';
import MessageName from '../messages/MessageName';
import DomainEventSubscriber from './DomainEventSubscriber';
import { Mapper } from '../Mapper';

export default interface EventBus {
    attachMapper(domainEventSubscriberMapper: Mapper<MessageName, Array<DomainEventSubscriber<DomainEvent>>>): void;
    publish(events: DomainEvent[]): Promise<void>;
}
