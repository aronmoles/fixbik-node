import { Response } from '../../../shared/domain/Response';

export interface InfoResponse extends Response {
    name: string,
    version: string,
}
