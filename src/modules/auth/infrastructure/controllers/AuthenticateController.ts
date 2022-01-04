import { Keys } from '../../../shared/infrastructure/di/Keys';
import AuthenticateQuery from '../../application/login/AuthenticateQuery';
import AuthenticateQueryResponse from '../../application/login/AuthenticateQueryResponse';
import AuthenticateResponseDto from './AuthenticateResponse.Dto';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { ControllerConfig } from '../../../../microk/core/domain/http/ControllerConfig';
import QueryBus from '../../../../microk/cqrs/domain/query/QueryBus';
import { ControllerResponse } from '../../../../microk/core/domain/http/ControllerResponse';
import Controller from '../../../../microk/core/domain/http/Controller';
import { HttpMethod } from '../../../../microk/common/http/HttpMethod';
import { Req } from '../../../../microk/core/domain/http/Req';
import Response from '../../../../microk/core/domain/http/Response';

/**
 * @openapi
 * /auth/authenticate:
 *   post:
 *     operationId: authenticate
 *     tags:
 *       - Auth
 *     summary: Authenticate user in app.
 *     description: ''
 *     requestBody:
 *       description: "AuthUser data to authenticate"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticateRequestDto'
 *     responses:
 *       201:
 *         description: "Successful operation. The notification has been created on the server."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/AuthenticateResponseDto'
 *       default:
 *         description: "Error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
export default class AuthenticateController implements Controller<AuthenticateQueryResponse> {
    constructor(
        @Inject(Keys.CQRS.QueryBus) private readonly queryBus: QueryBus,
    ) {
    }

    config(): ControllerConfig {
        return {
            path: '/auth/authenticate',
            method: HttpMethod.POST,
        };
    }

    async run(req: Req): Promise<ControllerResponse<AuthenticateResponseDto>> {
        const loginQuery = AuthenticateQuery.fromRequest(req);
        const loginQueryResponse = await this.queryBus.ask<AuthenticateQueryResponse>(loginQuery);
        return Response.success({
            authToken: loginQueryResponse.authToken,
        })
    }
}
