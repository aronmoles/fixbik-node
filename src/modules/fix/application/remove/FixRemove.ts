import FixFinder from '../FixFinder';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import FixRepository from '../../domain/FixRepository';
import EventBus from '../../../../microk/event/domain/EventBus';
import FixId from '../../domain/FixId';
import AuthUserId from '../../../auth/domain/AuthUserId';
import FixRemovedDomainEvent from '../../domain/FixRemovedDomainEvent';

export default class FixRemove {
    private readonly fixFinder: FixFinder;

    constructor(
        @Inject(Keys.Fix.FixRepository) private readonly fixRepository: FixRepository,
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
    ) {
        this.fixFinder = new FixFinder(this.fixRepository);
    }

    async run(id: string, userId: string): Promise<void> {
        const fixId = FixId.fromString(id);
        const fix = await this.fixFinder.find(fixId);

        fix.checkBelongs(AuthUserId.fromString(userId))

        await this.fixRepository.delete(fixId);

        this.eventBus.publish([new FixRemovedDomainEvent(fix)])
    }
}
