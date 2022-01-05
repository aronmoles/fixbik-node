import Bike from '../../domain/Bike';
import Serializable from '../../../../microk/common/Serializable';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';

/**
 * @openapi
 * BikeDto:
 *   type: object
 *   properties:
 *     id:
 *       type: string
 *       required: true
 *       example: 784a28b4-a777-47b8-b4ed-9fdc591d0d7d
 *     name:
 *       type: string
 *       required: true
 *     brand:
 *       type: string
 *       required: true
 *     model:
 *       type: string
 *       required: true
 *     year:
 *       type: integer
 *       required: true
 *       example: 2022
 */
export default class BikeDto implements Serializable {
    static fromBike(bike: Bike): BikeDto {
        return new BikeDto(bike);
    }

    private constructor(
        private readonly bike: Bike,
    ) {
    }

    toPrimitive(): PrimitivesObject {
        return this.bike.toPrimitives();
    }
}
