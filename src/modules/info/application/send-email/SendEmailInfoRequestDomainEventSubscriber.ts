import Inject from '@microk/core/infrastructure/di/Inject.decorator';
import { CommandBus } from '@microk/cqrs/domain/command/CommandBus';
import EventSubscriber from '@microk/event/domain/EventSubscriber';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import InfoRequestedDomainEvent from '../../domain/InfoRequestedDomainEvent';
import SendEmailService from './SendEmailService';

export default class SendEmailInfoRequestDomainEventSubscriber extends EventSubscriber<InfoRequestedDomainEvent> {
    constructor(
        @Inject(Keys.Info.SendEmailService) private readonly sendEmailService: SendEmailService,
        @Inject(Keys.CQRS.CommandBus) private readonly commandBus: CommandBus,
    ) {
        super(InfoRequestedDomainEvent);
    }

    async dispatch(event: InfoRequestedDomainEvent): Promise<void> {
        await this.sendEmailService.invoke();
    }
}
