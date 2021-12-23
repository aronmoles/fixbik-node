import Controller from '../../shared/domain/framework/Controller';
import { HttpStatus } from '../../shared/domain/http/HttpStatus';
import { Request } from '../../shared/domain/framework/Request';
import { Response } from '../../shared/domain/framework/Response';
import QueryBus from '../../shared/domain/query-bus/QueryBus';
import { InfoResponse } from '../application/info/InfoResponse';
import InfoQuery from '../application/info/InfoQuery';

export default class InfoController implements Controller {
    constructor(
       private readonly queryBus: QueryBus,
    ) {
    }

    async run(req: Request, res: Response): Promise<void> {
        const data = await this.queryBus.ask<InfoResponse>(new InfoQuery());
        res.status(HttpStatus.OK).send(data);
    }
}
