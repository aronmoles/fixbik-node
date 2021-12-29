import { QueryHandler } from '@microk/cqrs/domain/query/QueryHandler';
import LoginQuery from './LoginQuery';
import LoginQueryResponse from './LoginQueryResponse';
import LoginService from './LoginService';

export default class LoginQueryHandler extends QueryHandler<LoginQuery, LoginQueryResponse> {
    constructor(
        private readonly loginService: LoginService,
    ) {
        super(LoginQuery);
    }

    async handle(query: LoginQuery): Promise<LoginQueryResponse> {
        const token = await this.loginService.run();
        return {
            token,
        };
    }
}
