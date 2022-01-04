import { Keys } from '../../shared/infrastructure/di/Keys';
import SetInfoCommand from '../application/set-info/SetInfoCommand';
import { Request } from '../../../microk/core/domain/http/Request';
import Inject from '../../../microk/core/infrastructure/di/Inject.decorator';
import { ControllerConfig } from '../../../microk/core/domain/http/ControllerConfig';
import { HttpStatus } from '../../../microk/common/http/HttpStatus';
import { ControllerResponse } from '../../../microk/core/domain/http/ControllerResponse';
import { CommandBus } from '../../../microk/cqrs/domain/command/CommandBus';
import Controller from '../../../microk/core/domain/http/Controller';
import { HttpMethod } from '../../../microk/common/http/HttpMethod';

export default class SetInfoController implements Controller<void> {
    constructor(
        @Inject(Keys.CQRS.CommandBus) private readonly commandBus: CommandBus,
    ) {
    }

    config(): ControllerConfig {
        return {
            method: HttpMethod.PUT,
            path: '/',
        };
    }

    async run(req: Request): Promise<ControllerResponse<void>> {
        await this.commandBus.dispatch(new SetInfoCommand());
        return {
            status: HttpStatus.OK,
            data: undefined,
        }
    }
}
