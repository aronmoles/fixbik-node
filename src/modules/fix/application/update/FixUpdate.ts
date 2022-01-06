import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import FixRepository from '../../domain/FixRepository';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import FixFinder from '../FixFinder';
import EventBus from '../../../../microk/event/domain/EventBus';
import FixId from '../../domain/FixId';
import AuthUserId from '../../../auth/domain/AuthUserId';
import FixName from '../../domain/FixName';

export default class FixUpdate {
    private readonly fixFinder: FixFinder;
    constructor(
        @Inject(Keys.Fix.FixRepository) private readonly fixRepository: FixRepository,
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
    ) {
        this.fixFinder = new FixFinder(fixRepository)
    }

    async run(id: string, name: string, userId: string): Promise<void> {
        const fixId = FixId.fromString(id);
        const fix = await this.fixFinder.find(fixId);

        fix.checkBelongs(AuthUserId.fromString(userId))

        fix.update(FixName.fromString(name))

        await this.fixRepository.save(fix);

        this.eventBus.publish(fix.pullDomainEvents())
    }
}
