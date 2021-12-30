import { HttpMethod } from '@microk/common/http/HttpMethod';
import { HttpStatus } from '@microk/common/http/HttpStatus';
import Controller from '@microk/core/domain/http/Controller';
import { ControllerConfig } from '@microk/core/domain/http/ControllerConfig';
import { ControllerResponse } from '@microk/core/domain/http/ControllerResponse';
import { Request } from '@microk/core/domain/http/Request';
import QueryBus from '@microk/cqrs/domain/query/QueryBus';
import AuthenticateQuery from '../../application/login/AuthenticateQuery';
import AuthenticateQueryResponse from '../../application/login/AuthenticateQueryResponse';

/**
 * GET /auth/login
 * @tags Auth
 * @summary This is the summary of the endpoint
 * @return {AuthenticateQueryResponse} 200 - success response
 */
export default class AuthenticateController implements Controller<AuthenticateQueryResponse> {
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

    async run(req: Request): Promise<ControllerResponse<AuthenticateQueryResponse>> {
        const loginQuery = AuthenticateQuery.fromRequest(req);
        const loginQueryResponse = await this.queryBus.ask<AuthenticateQueryResponse>(loginQuery);
        return {
            status: HttpStatus.OK,
            data: loginQueryResponse,
        }
    }
}
