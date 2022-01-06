import Controller from '../../../../microk/core/domain/http/Controller';
import { ControllerConfig } from '../../../../microk/core/domain/http/ControllerConfig';
import { ControllerResponse } from '../../../../microk/core/domain/http/ControllerResponse';
import { Req } from '../../../../microk/core/domain/http/Req';
import { HttpMethod } from '../../../../microk/common/http/HttpMethod';
import Response from '../../../../microk/core/domain/http/Response';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import { CommandBus } from '../../../../microk/cqrs/domain/command/CommandBus';
import AuthMiddleware from '../../../shared/infrastructure/AuthMiddleware';
import BikeModifyCommand from '../../application/modify/BikeModifyCommand';

/**
 * @openapi
 * /bike/{id}:
 *   put:
 *     operationId: bikeCreator
 *     tags:
 *       - Bike
 *     summary: Create a new Bike.
 *     description: ''
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Bike UUID
 *     requestBody:
 *       description: "Bike data"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BikeRequestDto'
 *     responses:
 *       201:
 *         description: "Successful operation. The Bike has been created on the server."
 *       409:
 *         $ref: '#/components/schemas/ErrorResponse'
 *       default:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
export default class BikeModifyController implements Controller {
    constructor(
        @Inject(Keys.CQRS.CommandBus) private readonly commandBus: CommandBus,
        @Inject(Keys.App.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
    ) {
    }

    config(): ControllerConfig {
        return {
            path: '/bike/:id',
            method: HttpMethod.PUT,
            middlewares: [this.authMiddleware],
        };
    }

    async run(req: Req): Promise<ControllerResponse> {
        const command = BikeModifyCommand.fromRequest(req)
        await this.commandBus.dispatch(command);
        return Response.success();
    }
}
