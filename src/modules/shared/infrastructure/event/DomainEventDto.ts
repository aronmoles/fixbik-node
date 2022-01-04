import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';

/**
 * @openapi
 * DomainEventDto:
 *   type: object
 *   properties:
 *     id:
 *       type: string
 *       required: true
 *       example: 'e926d5d2-d20e-460b-92c8-188688ec78a8'
 *     name:
 *       type: string
 *       required: true
 *     occurredOn:
 *       type: string
 *       required: true
 *     aggregateId:
 *       type: string
 *       required: true
 *       example: 'e926d5d2-d20e-460b-92c8-188688ec78a8'
 *     meta:
 *       type: object
 *       required: true
 *       properties:
 *         any-key:
 *           type: string
 */
export default interface DomainEventDto {
    id: string,
    name: string,
    occurredOn: string,
    aggregateId: string,
    meta: PrimitivesObject,
}
