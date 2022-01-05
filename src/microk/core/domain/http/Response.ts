import { ControllerResponse } from './ControllerResponse';
import { HttpStatus } from '../../../common/http/HttpStatus';
import ResponseContent from './ResponseContent';

export default class Response {
    static success<T>(data: T = undefined, pagination: ResponseContent['pagination'] = undefined): ControllerResponse<T> {
        return {
            status: HttpStatus.OK,
            content: {
                data,
                pagination,
            },
        }
    }

    static created(): ControllerResponse<void> {
        return {
            status: HttpStatus.CREATED,
            content: undefined,
        }
    }
}
