/**
 * @openapi
 * BikeRequestDto:
 *   type: object
 *   properties:
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
export default interface BikeRequestDto {
    name: string,
    brand: string,
    model: string,
    year: string,
}
