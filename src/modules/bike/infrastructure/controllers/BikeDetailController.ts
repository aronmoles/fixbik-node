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
import BikeDetailQuery from '../../application/detail/BikeDetailQuery';

/**
 * @openapi
 * /bike/{id}:
 *   get:
 *     operationId: bikeDetail
 *     tags:
 *       - Bike
 *     summary: Detail a bike.
 *     description: ''
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Bike UUID
 *     responses:
 *       200:
 *         description: "Bike data."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/BikeDto'
 *       default:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
export default class BikeDetailController implements Controller {
    constructor(
        @Inject(Keys.CQRS.QueryBus) private readonly queryBus: QueryBus,
        @Inject(Keys.App.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
    ) {
    }

    config(): ControllerConfig {
        return {
            path: '/bike/:id',
            method: HttpMethod.GET,
            middlewares: [this.authMiddleware],
        };
    }

    async run(req: Req): Promise<ControllerResponse> {
        const query = new BikeDetailQuery(req.params.id, req.auth.authUserId)
        const bikeDto: BikeDto = await this.queryBus.ask(query);
        return Response.success(bikeDto.toPrimitive());
    }
}
