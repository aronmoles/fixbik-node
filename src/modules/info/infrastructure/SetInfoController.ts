import { HttpMethod } from '@microk/common/http/HttpMethod';
import { HttpStatus } from '@microk/common/http/HttpStatus';
import Controller from '@microk/core/domain/http/Controller';
import { ControllerConfig } from '@microk/core/domain/http/ControllerConfig';
import { Request } from '@microk/core/domain/http/Request';
import { Response } from '@microk/core/domain/http/Response';
import { CommandBus } from '@microk/cqrs/domain/command/CommandBus';
import SetInfoCommand from '../application/set-info/SetInfoCommand';

export default class SetInfoController implements Controller {
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

    async run(req: Request, res: Response): Promise<void> {
        await this.commandBus.dispatch(new SetInfoCommand());
        res.status(HttpStatus.OK).send();
    }
}
