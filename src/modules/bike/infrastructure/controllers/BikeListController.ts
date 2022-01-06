import Controller from '../../../../microk/core/domain/http/Controller';
import { ControllerConfig } from '../../../../microk/core/domain/http/ControllerConfig';
import { ControllerResponse } from '../../../../microk/core/domain/http/ControllerResponse';
import { Req } from '../../../../microk/core/domain/http/Req';
import { HttpMethod } from '../../../../microk/common/http/HttpMethod';
import Response from '../../../../microk/core/domain/http/Response';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import AuthMiddleware from '../../../shared/infrastructure/AuthMiddleware';
import BikeDto from '../dto/BikeDto';
import QueryBus from '../../../../microk/cqrs/domain/query/QueryBus';
import BikeListQuery from '../../application/list/BikeListQuery';

/**
 * @openapi
 * /bike:
 *   get:
 *     operationId: bikeList
 *     tags:
 *       - Bike
 *     summary: List all bikes of user.
 *     description: ''
 *     responses:
 *       200:
 *         description: "Successful authentication."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BikeDto'
 *       default:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
export default class BikeListController implements Controller {
    constructor(
        @Inject(Keys.CQRS.QueryBus) private readonly queryBus: QueryBus,
        @Inject(Keys.App.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
    ) {
    }

    config(): ControllerConfig {
        return {
            path: '/bike',
            method: HttpMethod.GET,
            middlewares: [this.authMiddleware],
        };
    }

    async run(req: Req): Promise<ControllerResponse> {
        const query = new BikeListQuery(req.auth.authUserId)
        const bikeDtos: BikeDto[] = await this.queryBus.ask(query);
        return Response.success(bikeDtos.map((bikeDto) => bikeDto.toPrimitive()));
    }
}
