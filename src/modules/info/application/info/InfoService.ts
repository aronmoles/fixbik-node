import Uuid from '@microk/common/value-object/Uuid';
import EventBus from '@microk/event/domain/EventBus';
import { sleep } from '@microk/utils/Sleep';
import { InfoResponse } from './InfoResponse';
import InfoRequestedDomainEvent from '../../domain/InfoRequestedDomainEvent';

export default class InfoService {
    constructor(private readonly eventBus: EventBus) {
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
