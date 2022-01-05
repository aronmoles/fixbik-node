import Controller from '../../../../microk/core/domain/http/Controller';
import { ControllerConfig } from '../../../../microk/core/domain/http/ControllerConfig';
import { ControllerResponse } from '../../../../microk/core/domain/http/ControllerResponse';
import { Req } from '../../../../microk/core/domain/http/Req';
import { HttpMethod } from '../../../../microk/common/http/HttpMethod';
import Response from '../../../../microk/core/domain/http/Response';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import { CommandBus } from '../../../../microk/cqrs/domain/command/CommandBus';
import BikeCreatorCommand from '../../application/create/BikeCreatorCommand';

export default class CreateBikeController implements Controller<void> {
    constructor(
        @Inject(Keys.CQRS.CommandBus) private readonly commandBus: CommandBus,
    ) {
    }

    config(): ControllerConfig {
        return {
            path: '/bike/:id',
            method: HttpMethod.PUT,
        };
    }

    async run(req: Req): Promise<ControllerResponse<void>> {
        const command = BikeCreatorCommand.fromRequest(req)
        await this.commandBus.dispatch(command);
        return Response.created();
    }
}
