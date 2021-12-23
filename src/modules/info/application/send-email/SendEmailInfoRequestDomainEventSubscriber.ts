import DomainEventSubscriber from '../../../shared/domain/event-bus/DomainEventSubscriber';
import InfoRequestedDomainEvent from '../../domain/InfoRequestedDomainEvent';
import SendEmailService from './SenEmailService';
import { CommandBus } from '../../../shared/domain/command-bus/CommandBus';

export default class SendEmailInfoRequestDomainEventSubscriber extends DomainEventSubscriber<InfoRequestedDomainEvent> {
    constructor(
        private readonly sendEmailService: SendEmailService,
        private readonly commandBus: CommandBus,
    ) {
        super(InfoRequestedDomainEvent);
    }

    async dispatch(event: InfoRequestedDomainEvent): Promise<void> {
        await this.sendEmailService.invoke();
    }
}
