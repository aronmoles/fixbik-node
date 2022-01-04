import { HttpStatus } from '../../../common/http/HttpStatus';
import ResponseContent from './ResponseContent';

export type ControllerResponse<D = void> = {
    status: HttpStatus,
    content: ResponseContent<D>,
}
