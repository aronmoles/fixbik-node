import { QueryHandler } from '@microk/cqrs/domain/query/QueryHandler';
import AuthenticateQuery from './AuthenticateQuery';
import AuthenticateQueryResponse from './AuthenticateQueryResponse';
import Authenticator from './Authenticator';

export default class AuthenticateQueryHandler extends QueryHandler<AuthenticateQuery, AuthenticateQueryResponse> {
    constructor(
        private readonly loginService: Authenticator,
    ) {
        super(AuthenticateQuery);
    }

    async handle(query: AuthenticateQuery): Promise<AuthenticateQueryResponse> {
        const authToken = await this.loginService.run(query.email, query.password);
        return {
            authToken: authToken.toString(),
        };
    }
}
