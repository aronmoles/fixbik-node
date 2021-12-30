import { Criteria } from '@microk/common/criteria/Criteria';
import { Filter } from '@microk/common/criteria/Filter';
import { FilterField } from '@microk/common/criteria/FilterField';
import { FilterOperator } from '@microk/common/criteria/FilterOperator';
import { Filters } from '@microk/common/criteria/Filters';
import { FilterValue } from '@microk/common/criteria/FilterValue';
import { Order } from '@microk/common/criteria/Order';
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
        it('should save a auth user and search by id', async () => {
            const authUser = AuthUserMother.random();

            await repository.save(authUser);
            const authUserResponse = await repository.search(authUser.id);

            expect(authUserResponse).toEqual(authUser)
        });
    });

    describe('#searchOneByCriteria', () => {
        it('should save a auth user and search by criteria', async () => {
            const authUser = AuthUserMother.random();
            await repository.save(authUser);

            const criteria = new Criteria(
                new Filters([new Filter(
                    new FilterField('email'),
                    FilterOperator.equal(),
                    new FilterValue(authUser.email.toString()),
                )]),
                Order.none(),
            )
            const authUserResponse = await repository.searchOneByCriteria(criteria);

            expect(authUserResponse).toEqual(authUser)
        });
    });

    describe('#searchByCriteria', () => {
        it('should save a auth user and search by criteria', async () => {
            const authUser = AuthUserMother.random();
            await repository.save(authUser);

            const criteria = new Criteria(
                new Filters([new Filter(
                    new FilterField('email'),
                    FilterOperator.equal(),
                    new FilterValue(authUser.email.toString()),
                )]),
                Order.none(),
            )
            const authUsersResponse = await repository.searchByCriteria(criteria);

            expect(authUsersResponse).toEqual([authUser])
        });
    });
});
