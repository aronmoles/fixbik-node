import { HttpStatus } from '../../../common/http/HttpStatus';
import ResponseContent from './ResponseContent';

export type ControllerResponse = {
    status: HttpStatus,
    content: ResponseContent,
}
