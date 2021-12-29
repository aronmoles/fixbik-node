import { EnvironmentArranger } from '@microk/tests/domain/EnvironmentArranger';
import Container from '../../../../../src/app/Container';
import { AuthUserRepository } from '../../../../../src/modules/auth/domain/AuthUserRepository';
import AuthUserMother from '../../domain/AuthUserMother';

const repository: AuthUserRepository = Container.get('Auth.domain.AuthUserRepository');
const environmentArranger: EnvironmentArranger = Container.get('Test.EnvironmentArranger');

beforeEach(async () => {
    await (await environmentArranger).arrange();
});

afterAll(async () => {
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
});

describe('AuthUserRepository', () => {
    describe('#save', () => {
        it('should save a auth user', async () => {
            const authUser = AuthUserMother.random();

            await repository.save(authUser);
        });
    });
});
