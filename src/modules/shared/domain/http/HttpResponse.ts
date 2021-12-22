import { HttpStatus } from './HttpStatus';

export type HttpResponse<D> = {
    code?: HttpStatus,
    data: D,
}
