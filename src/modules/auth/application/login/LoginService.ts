import AuthUserId from '../../domain/AuthUserId';
import { AuthUserRepository } from '../../domain/AuthUserRepository';

export default class LoginService {
    constructor(
        private readonly authUserRepository: AuthUserRepository,
    ) {
    }

    async run(): Promise<string> {
        await this.authUserRepository.search(new AuthUserId('6fe82999-5933-4259-89aa-802efa746ba1'))
        return 'abcdefghai';
    }
}
