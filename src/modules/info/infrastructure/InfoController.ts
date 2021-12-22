import { Request, Response } from 'express';
import Controller from '../../shared/domain/framework/Controller';
import { HttpStatus } from '../../shared/domain/http/HttpStatus';
import InfoService from '../application/InfoService';
import { HttpMethod } from '../../shared/domain/http/HttpMethod';

export default class InfoController implements Controller {
    readonly METHOD = HttpMethod.GET;

    readonly PATH = '/';

    constructor(
       private readonly infoService: InfoService,
    ) {
    }

    async run(req: Request, res: Response): Promise<void> {
        const data = await this.infoService.invoke();
        res.status(HttpStatus.OK).send(data);
    }
}
