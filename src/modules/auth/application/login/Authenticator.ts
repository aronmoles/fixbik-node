import EventBus from '@microk/event/domain/EventBus';
import AuthToken from '../../domain/AuthToken';
import AuthTokenRepository from '../../domain/AuthTokenRepository';
import AuthUserEmail from '../../domain/AuthUserEmail';
import AuthUserPassword from '../../domain/AuthUserPassword';
import { AuthUserRepository } from '../../domain/AuthUserRepository';
import AuthUserSearchByEmail from '../search-by-email/AuthUserSearchByEmail';

export default class Authenticator {
    private readonly authUserSearcherByEmail: AuthUserSearchByEmail;
    constructor(
        authUserRepository: AuthUserRepository,
        private readonly authTokenRepository: AuthTokenRepository,
        private readonly eventBus: EventBus,
    ) {
        this.authUserSearcherByEmail = new AuthUserSearchByEmail(authUserRepository);
    }

    async run(email: AuthUserEmail, password: AuthUserPassword): Promise<AuthToken> {
        const authUser = await this.authUserSearcherByEmail.search(email);

        authUser.authenticate(password);

        this.eventBus.publish(authUser.pullDomainEvents())

        return this.authTokenRepository.generate(authUser);
    }
}
