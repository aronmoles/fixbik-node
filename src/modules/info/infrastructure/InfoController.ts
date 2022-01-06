import { Keys } from '../../shared/infrastructure/di/Keys';
import InfoQuery from '../application/info/InfoQuery';
import { InfoResponse } from '../application/info/InfoResponse';
import { Req } from '../../../microk/core/domain/http/Req';
import Inject from '../../../microk/core/infrastructure/di/Inject.decorator';
import { ControllerConfig } from '../../../microk/core/domain/http/ControllerConfig';
import QueryBus from '../../../microk/cqrs/domain/query/QueryBus';
import { ControllerResponse } from '../../../microk/core/domain/http/ControllerResponse';
import Controller from '../../../microk/core/domain/http/Controller';
import { HttpMethod } from '../../../microk/common/http/HttpMethod';
import Response from '../../../microk/core/domain/http/Response';

export default class InfoController implements Controller {
    constructor(
        @Inject(Keys.CQRS.QueryBus) private readonly queryBus: QueryBus,
    ) {
    }

    config(): ControllerConfig {
        return {
            method: HttpMethod.GET,
            path: '/',
        };
    }

    async run(req: Req): Promise<ControllerResponse> {
        const data = await this.queryBus.ask<InfoResponse>(new InfoQuery());
        return Response.success(data)
    }
}
