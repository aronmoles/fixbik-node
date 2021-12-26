import { CommandBus } from '@microk/cqrs/domain/command/CommandBus';
import EventSubscriber from '@microk/event/domain/EventSubscriber';
import InfoRequestedDomainEvent from '../../domain/InfoRequestedDomainEvent';
import SendEmailService from './SendEmailService';

export default class SendEmailInfoRequestDomainEventSubscriber extends EventSubscriber<InfoRequestedDomainEvent> {
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
