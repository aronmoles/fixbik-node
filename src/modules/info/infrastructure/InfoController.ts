import { HttpMethod } from '@microk/common/http/HttpMethod';
import { HttpStatus } from '@microk/common/http/HttpStatus';
import Controller from '@microk/core/domain/http/Controller';
import { ControllerConfig } from '@microk/core/domain/http/ControllerConfig';
import { Request } from '@microk/core/domain/http/Request';
import { Response } from '@microk/core/domain/http/Response';
import QueryBus from '@microk/cqrs/domain/query/QueryBus';
import InfoQuery from '../application/info/InfoQuery';
import { InfoResponse } from '../application/info/InfoResponse';

export default class InfoController implements Controller {
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

    async run(req: Request, res: Response): Promise<void> {
        const data = await this.queryBus.ask<InfoResponse>(new InfoQuery());
        res.status(HttpStatus.OK).send(data);
    }
}
