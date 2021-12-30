import { QueryResponse } from '@microk/cqrs/domain/query/QueryResponse';

/**
 * @typedef {object} AuthenticateQueryResponse
 * @property {string} authToken.required - Auth Token
 * @property {string} tokenType.required - Type
 * @property {string} expiresIn.required - Expires in seconds
 */
export default interface AuthenticateQueryResponse extends QueryResponse {
    authToken: string,
}
