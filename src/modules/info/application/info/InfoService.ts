import { Keys } from '../../../shared/infrastructure/di/Keys';
import InfoRequestedDomainEvent from '../../domain/InfoRequestedDomainEvent';
import { InfoResponse } from './InfoResponse';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { sleep } from '../../../../microk/utils/Sleep';
import Uuid from '../../../../microk/common/value-object/Uuid';
import EventBus from '../../../../microk/event/domain/EventBus';

export default class InfoService {
    constructor(
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
    ) {
    }

    public async invoke(): Promise<InfoResponse> {
        // throw new NotFoundHttpError('Esto es un error tocho');
        await sleep(1200)

        this.eventBus.publish([new InfoRequestedDomainEvent(Uuid.create())])

        return {
            name: 'is-auth',
            version: '1.0.0',
        };
    }
}
