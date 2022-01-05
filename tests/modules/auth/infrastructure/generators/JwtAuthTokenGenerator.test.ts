import Container from '../../../../../src/app/Container';
import AuthTokenRepository from '../../../../../src/modules/auth/domain/AuthTokenRepository';
import AuthUserMother from '../../domain/AuthUserMother';
import { Keys } from '../../../../../src/modules/shared/infrastructure/di/Keys';

const repository: AuthTokenRepository = Container.get(Keys.Auth.AuthTokenRepository);

describe('AuthTokenRepository', () => {
    describe('#generate', () => {
        it('should generate a new auth token', async () => {
            const authUser = AuthUserMother.random();

            const authToken = repository.generate(authUser);

            expect(authToken).toBeDefined();
            expect(authToken.toString()).toBeDefined();
        });
    });

    describe('#decode', () => {
        it('should decode a token', async () => {
            const authUser = AuthUserMother.random();
            const authToken = repository.generate(authUser);

            const data = await repository.decode(authToken);
            console.log('DATA', data)
            expect(data).toBeDefined();
        });
    });
});
