import { QueryResponse } from '../../../../microk/cqrs/domain/query/QueryResponse';

export interface InfoResponse extends QueryResponse {
    name: string,
    version: string,
    description: string,
    license: string,
    author: string,
}
