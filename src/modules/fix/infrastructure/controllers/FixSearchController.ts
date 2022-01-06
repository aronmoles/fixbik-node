import Controller from '../../../../microk/core/domain/http/Controller';
import { ControllerConfig } from '../../../../microk/core/domain/http/ControllerConfig';
import { ControllerResponse } from '../../../../microk/core/domain/http/ControllerResponse';
import { Req } from '../../../../microk/core/domain/http/Req';
import { HttpMethod } from '../../../../microk/common/http/HttpMethod';
import Response from '../../../../microk/core/domain/http/Response';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import AuthMiddleware from '../../../shared/infrastructure/AuthMiddleware';
import QueryBus from '../../../../microk/cqrs/domain/query/QueryBus';
import FixSearchQuery from '../../application/search/FixSearchQuery';
import FixDto from '../dto/FixDto';

/**
 * @openapi
 * /fix:
 *   get:
 *     operationId: fixUpdate
 *     tags:
 *       - Fix
 *     summary: Search Fix.
 *     description: ''
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Search by name
 *     responses:
 *       200:
 *         description: "Bike data."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/FixDto'
 *       409:
 *         $ref: '#/components/schemas/ErrorResponse'
 *       default:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
export default class FixSearchController implements Controller {
    constructor(
        @Inject(Keys.CQRS.QueryBus) private readonly queryBus: QueryBus,
        @Inject(Keys.App.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
    ) {
    }

    config(): ControllerConfig {
        return {
            path: '/fix',
            method: HttpMethod.GET,
            middlewares: [this.authMiddleware],
        };
    }

    async run(req: Req): Promise<ControllerResponse> {
        const query = FixSearchQuery.fromRequest(req)
        const fixDtos = await this.queryBus.ask<FixDto[]>(query);
        return Response.success(fixDtos.map((dto) => dto.toPrimitive()));
    }
}
