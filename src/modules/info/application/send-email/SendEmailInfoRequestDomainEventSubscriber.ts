import DomainEventSubscriber from '../../../shared/domain/event-bus/DomainEventSubscriber';
import InfoRequestedDomainEvent from '../../domain/InfoRequestedDomainEvent';
import { sleep } from '../../../shared/infrastructure/Sleep';

export default class SendEmailInfoRequestDomainEventSubscriber extends DomainEventSubscriber<InfoRequestedDomainEvent> {
    constructor() {
        super(InfoRequestedDomainEvent);
    }

    async dispatch(event: InfoRequestedDomainEvent): Promise<void> {
        await sleep(2000)
        // eslint-disable-next-line no-console
        console.log('DISPATCH', this.constructor.name)
    }
}
