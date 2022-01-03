import Inject from '@microk/core/infrastructure/di/Inject.decorator';
import { QueryHandler } from '@microk/cqrs/domain/query/QueryHandler';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import InfoQuery from './InfoQuery';
import { InfoResponse } from './InfoResponse';
import InfoService from './InfoService';

export default class InfoQueryHandler extends QueryHandler<InfoQuery, InfoResponse> {
    constructor(
        @Inject(Keys.Info.InfoService) private readonly infoService: InfoService,
    ) {
        super(InfoQuery)
    }

    handle(query: InfoQuery): Promise<InfoResponse> {
        return this.infoService.invoke();
    }
}
