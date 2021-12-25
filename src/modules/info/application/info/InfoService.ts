import { InfoResponse } from './InfoResponse';
import EventBus from '../../../shared/domain/event-bus/EventBus';
import Uuid from '../../../shared/domain/value-object/Uuid';
import InfoRequestedDomainEvent from '../../domain/InfoRequestedDomainEvent';
import { sleep } from '../../../shared/infrastructure/Sleep';

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
