import { QueryResponse } from '@microk/cqrs/domain/query/QueryResponse';

export default interface AuthenticateQueryResponse extends QueryResponse {
    authToken: string,
}
