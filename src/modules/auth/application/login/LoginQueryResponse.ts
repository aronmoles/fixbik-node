import { QueryResponse } from '@microk/cqrs/domain/query/QueryResponse';

export default interface LoginQueryResponse extends QueryResponse {
    token: string,
}
