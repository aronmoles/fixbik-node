import Controller from '../../shared/domain/framework/Controller';
import { HttpStatus } from '../../shared/domain/http/HttpStatus';
import { Request } from '../../shared/domain/framework/Request';
import { Response } from '../../shared/domain/framework/Response';
import { CommandBus } from '../../shared/domain/command-bus/CommandBus';
import SetInfoCommand from '../application/set-info/SetInfoCommand';

export default class SetInfoController implements Controller {
    constructor(
        private readonly commandBus: CommandBus,
    ) {
    }

    async run(req: Request, res: Response): Promise<void> {
        await this.commandBus.dispatch(new SetInfoCommand());
        res.status(HttpStatus.OK).send();
    }
}
