import { HttpStatus } from '../../../common/http/HttpStatus';
import { PrimitivesObject } from '../../../common/PrimitiveType';

/**
 * @openapi
 * ResponseError:
 *   type: object
 *   properties:
 *     code:
 *       type: integer
 *       required: true
 *     title:
 *       type: string
 *       required: true
 *     detail:
 *       type: string
 *       required: true
 */
export default interface ResponseContent<D = void> {
    data?: D,
    error?: {
        code: HttpStatus,
        title: string,
        detail: string,
    },
    meta?: PrimitivesObject,
    pagination?: {
        current:number,
        totalPages:number,
        totalElements: number,
    }
}
