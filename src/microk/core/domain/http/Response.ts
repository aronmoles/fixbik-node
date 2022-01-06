import { ControllerResponse } from './ControllerResponse';
import { HttpStatus } from '../../../common/http/HttpStatus';
import ResponseContent from './ResponseContent';
import { PrimitivesObject } from '../../../common/PrimitiveType';

export default class Response {
    static success(
        data: PrimitivesObject | PrimitivesObject[] | undefined = undefined,
        pagination: ResponseContent['pagination'] = undefined,
    ): ControllerResponse {
        return {
            status: HttpStatus.OK,
            content: {
                data,
                pagination,
            },
        }
    }

    static created(): ControllerResponse {
        return {
            status: HttpStatus.CREATED,
            content: undefined,
        }
    }
}
