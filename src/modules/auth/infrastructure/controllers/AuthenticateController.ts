import { HttpMethod } from '@microk/common/http/HttpMethod';
import { HttpStatus } from '@microk/common/http/HttpStatus';
import Controller from '@microk/core/domain/http/Controller';
import { ControllerConfig } from '@microk/core/domain/http/ControllerConfig';
import { Request } from '@microk/core/domain/http/Request';
import { Response } from '@microk/core/domain/http/Response';
import QueryBus from '@microk/cqrs/domain/query/QueryBus';
import AuthenticateQuery from '../../application/login/AuthenticateQuery';
import AuthenticateQueryResponse from '../../application/login/AuthenticateQueryResponse';

export default class AuthenticateController implements Controller {
    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    config(): ControllerConfig {
        return {
            path: '/auth/login',
            method: HttpMethod.POST,
        };
    }

    async run(req: Request, res: Response): Promise<void> {
        const loginQuery = AuthenticateQuery.fromRequest(req);
        const loginQueryResponse = await this.queryBus.ask<AuthenticateQueryResponse>(loginQuery);
        res.status(HttpStatus.OK).send(loginQueryResponse);
    }
}
