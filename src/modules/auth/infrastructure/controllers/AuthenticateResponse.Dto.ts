/**
 * @openapi
 * AuthenticateResponseDto:
 *   type: object
 *   properties:
 *     authToken:
 *       type: string
 *       required: true
 */
export default interface AuthenticateResponseDto {
    authToken: string,
}
