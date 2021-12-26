import { HttpMethod } from '../../../common/http/HttpMethod';
import { Middleware } from '../Middleware';

export type ControllerConfig = {
    method: HttpMethod,
    path: string,
    middlewares?: Middleware[]
}
