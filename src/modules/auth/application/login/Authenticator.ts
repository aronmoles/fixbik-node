import { Keys } from '../../../shared/infrastructure/di/Keys';
import AuthToken from '../../domain/AuthToken';
import AuthTokenRepository from '../../domain/AuthTokenRepository';
import AuthUserEmail from '../../domain/AuthUserEmail';
import { AuthUserRepository } from '../../domain/AuthUserRepository';
import AuthUserSearchByEmail from '../search-by-email/AuthUserSearchByEmail';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import EventBus from '../../../../microk/event/domain/EventBus';
import AuthUserPassword from '../../domain/AuthUserPassword';

export default class Authenticator {
    private readonly authUserSearcherByEmail: AuthUserSearchByEmail;

    constructor(
        @Inject(Keys.Auth.AuthUserRepository) authUserRepository: AuthUserRepository,
        @Inject(Keys.Auth.AuthTokenRepository) private readonly authTokenRepository: AuthTokenRepository,
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
    ) {
        this.authUserSearcherByEmail = new AuthUserSearchByEmail(authUserRepository);
    }

    async run(email: string, password: string): Promise<AuthToken> {
        const userAuthEmail = new AuthUserEmail(email)
        const userAuthPassword = new AuthUserPassword(password)

        const authUser = await this.authUserSearcherByEmail.search(userAuthEmail);

        authUser.authenticate(userAuthPassword);

        this.eventBus.publish(authUser.pullDomainEvents())

        return this.authTokenRepository.generate(authUser);
    }
}
