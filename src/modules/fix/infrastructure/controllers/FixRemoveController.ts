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
import FixRemoveCommand from '../../application/remove/FixRemoveCommand';

/**
 * @openapi
 * /fix/{id}:
 *   delete:
 *     operationId: fixRemove
 *     tags:
 *       - Fix
 *     summary: Remove a Fix.
 *     description: ''
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Fix UUID
 *     responses:
 *       201:
 *         description: "Successful operation. The Fix has been created on the server."
 *       404:
 *         $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         $ref: '#/components/schemas/ErrorResponse'
 *       default:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
export default class FixRemoveController implements Controller {
    constructor(
        @Inject(Keys.CQRS.CommandBus) private readonly commandBus: CommandBus,
        @Inject(Keys.App.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
    ) {
    }

    config(): ControllerConfig {
        return {
            path: '/fix/:id',
            method: HttpMethod.DELETE,
            middlewares: [this.authMiddleware],
        };
    }

    async run(req: Req): Promise<ControllerResponse> {
        const command = FixRemoveCommand.fromRequest(req)
        await this.commandBus.dispatch(command);
        return Response.success();
    }
}
