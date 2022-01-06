import FixRepository from '../../domain/FixRepository';
import EventBus from '../../../../microk/event/domain/EventBus';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import FixId from '../../domain/FixId';
import AlreadyExistsHttpError from '../../../../microk/common/http/errors/AlreadyExistsHttpError';
import FixName from '../../domain/FixName';
import AuthUserId from '../../../auth/domain/AuthUserId';
import Fix from '../../domain/Fix';

export default class FixCreator {
    constructor(
        @Inject(Keys.Fix.FixRepository) private readonly fixRepository: FixRepository,
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
    ) {
    }

    async run(id: string, name: string, userId: string): Promise<void> {
        const fixId = FixId.fromString(id);
        const fixCheck = await this.fixRepository.search(fixId);
        if (fixCheck) {
            throw new AlreadyExistsHttpError('Fix already exists');
        }

        const fix = Fix.create(
            FixId.fromString(id),
            FixName.fromString(name),
            AuthUserId.fromString(userId),
        )

        await this.fixRepository.save(fix);

        this.eventBus.publish(fix.pullDomainEvents())
    }
}
