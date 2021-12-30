import { HttpStatus } from '../../../common/http/HttpStatus';

export type ControllerResponse<D> = {
    status: HttpStatus,
    data: D,
}
