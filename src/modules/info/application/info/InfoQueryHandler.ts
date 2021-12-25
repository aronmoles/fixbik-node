import { QueryHandler } from '@microk/cqrs/domain/query/QueryHandler';
import { InfoResponse } from './InfoResponse';
import InfoQuery from './InfoQuery';
import InfoService from './InfoService';

export default class InfoQueryHandler extends QueryHandler<InfoQuery, InfoResponse> {
    constructor(private readonly infoService: InfoService) {
        super(InfoQuery)
    }

    handle(query: InfoQuery): Promise<InfoResponse> {
        return this.infoService.invoke();
    }
}
