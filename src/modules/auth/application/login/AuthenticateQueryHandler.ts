import { Keys } from '../../../shared/infrastructure/di/Keys';
import AuthenticateQuery from './AuthenticateQuery';
import AuthenticateQueryResponse from './AuthenticateQueryResponse';
import Authenticator from './Authenticator';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { QueryHandler } from '../../../../microk/cqrs/domain/query/QueryHandler';

export default class AuthenticateQueryHandler extends QueryHandler<AuthenticateQuery, AuthenticateQueryResponse> {
    constructor(
        @Inject(Keys.Auth.Authenticator) private readonly authenticator: Authenticator,
    ) {
        super(AuthenticateQuery);
    }

    async handle(query: AuthenticateQuery): Promise<AuthenticateQueryResponse> {
        const authToken = await this.authenticator.run(query.email, query.password);
        return {
            authToken: authToken.toString(),
        };
    }
}
