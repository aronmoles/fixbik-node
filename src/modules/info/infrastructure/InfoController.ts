import { HttpMethod } from '@microk/common/http/HttpMethod';
import { HttpStatus } from '@microk/common/http/HttpStatus';
import Controller from '@microk/core/domain/http/Controller';
import { ControllerConfig } from '@microk/core/domain/http/ControllerConfig';
import { ControllerResponse } from '@microk/core/domain/http/ControllerResponse';
import { Request } from '@microk/core/domain/http/Request';
import QueryBus from '@microk/cqrs/domain/query/QueryBus';
import InfoQuery from '../application/info/InfoQuery';
import { InfoResponse } from '../application/info/InfoResponse';

export default class InfoController implements Controller<InfoResponse> {
    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    config(): ControllerConfig {
        return {
            method: HttpMethod.GET,
            path: '/',
        };
    }

    async run(req: Request): Promise<ControllerResponse<InfoResponse>> {
        const data = await this.queryBus.ask<InfoResponse>(new InfoQuery());
        return {
            status: HttpStatus.OK,
            data,
        }
    }
}
