import Serializable from '../../../../microk/common/Serializable';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';
import Fix from '../../domain/Fix';

/**
 * @openapi
 * FixDto:
 *   type: object
 *   properties:
 *     id:
 *       type: string
 *       required: true
 *       example: 784a28b4-a777-47b8-b4ed-9fdc591d0d7d
 *     name:
 *       type: string
 *       required: true
 */
export default class FixDto implements Serializable {
    static fromFix(fix: Fix): FixDto {
        return new FixDto(fix);
    }

    private constructor(
        private readonly fix: Fix,
    ) {
    }

    toPrimitive(): PrimitivesObject {
        return this.fix.toPrimitives();
    }
}
