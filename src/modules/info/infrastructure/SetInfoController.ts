import { HttpMethod } from '@microk/common/http/HttpMethod';
import { HttpStatus } from '@microk/common/http/HttpStatus';
import Controller from '@microk/core/domain/http/Controller';
import { ControllerConfig } from '@microk/core/domain/http/ControllerConfig';
import { ControllerResponse } from '@microk/core/domain/http/ControllerResponse';
import { Request } from '@microk/core/domain/http/Request';
import { CommandBus } from '@microk/cqrs/domain/command/CommandBus';
import SetInfoCommand from '../application/set-info/SetInfoCommand';

export default class SetInfoController implements Controller<void> {
    constructor(
        private readonly commandBus: CommandBus,
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
