import Controller from '../../shared/domain/framework/Controller';
import { HttpStatus } from '../../shared/domain/http/HttpStatus';
import InfoService from '../application/InfoService';
import { Request } from '../../shared/domain/framework/Request';
import { Response } from '../../shared/domain/framework/Response';

export default class InfoController implements Controller {
    constructor(
       private readonly infoService: InfoService,
    ) {
    }

    async run(req: Request, res: Response): Promise<void> {
        const data = await this.infoService.invoke();
        res.status(HttpStatus.OK).send(data);
    }
}
