import { Keys } from '../../../shared/infrastructure/di/Keys';
import InfoRequestedDomainEvent from '../../domain/InfoRequestedDomainEvent';
import SendEmailService from './SendEmailService';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import EventSubscriber from '../../../../microk/event/domain/EventSubscriber';

export default class SendEmailInfoRequestDomainEventSubscriber extends EventSubscriber<InfoRequestedDomainEvent> {
    constructor(
        @Inject(Keys.Info.SendEmailService) private readonly sendEmailService: SendEmailService,
    ) {
        super(InfoRequestedDomainEvent);
    }

    async dispatch(event: InfoRequestedDomainEvent): Promise<void> {
        await this.sendEmailService.invoke();
    }
}
