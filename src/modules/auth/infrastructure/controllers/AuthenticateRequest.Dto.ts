/**
 * @openapi
 * AuthenticateRequestDto:
 *   type: object
 *   properties:
 *     email:
 *       type: string
 *       required: true
 *     password:
 *       type: string
 *       required: true
 */
export default interface AuthenticateRequestDto {
    email: string,
    password: string,
}
