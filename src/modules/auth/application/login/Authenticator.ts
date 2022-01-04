import { Keys } from '../../../shared/infrastructure/di/Keys';
import AuthToken from '../../domain/AuthToken';
import AuthTokenRepository from '../../domain/AuthTokenRepository';
import AuthUserEmail from '../../domain/AuthUserEmail';
import AuthUserPassword from '../../domain/AuthUserPassword';
import { AuthUserRepository } from '../../domain/AuthUserRepository';
import AuthUserSearchByEmail from '../search-by-email/AuthUserSearchByEmail';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import EventBus from '../../../../microk/event/domain/EventBus';

export default class Authenticator {
    private readonly authUserSearcherByEmail: AuthUserSearchByEmail;
    constructor(
        @Inject(Keys.Auth.AuthUserRepository) authUserRepository: AuthUserRepository,
        @Inject(Keys.Auth.AuthTokenRepository) private readonly authTokenRepository: AuthTokenRepository,
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
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
