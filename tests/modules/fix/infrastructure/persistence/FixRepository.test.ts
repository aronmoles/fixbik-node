import Container from '../../../../../src/app/Container';
import { EnvironmentArranger } from '../../../../../src/microk/tests/domain/EnvironmentArranger';
import { Keys } from '../../../../../src/modules/shared/infrastructure/di/Keys';
import EnvironmentFixtures from '../../../../../src/microk/tests/domain/EnvironmentFixtures';
import FixRepository from '../../../../../src/modules/fix/domain/FixRepository';
import FixMother from '../../domain/FixMother';

const repository: FixRepository = Container.get(Keys.Fix.FixRepository);
const environmentArranger: EnvironmentArranger = Container.get(Keys.Test.EnvironmentArranger);
const environmentFixtures: EnvironmentFixtures = Container.get(Keys.Test.EnvironmentFixtures);

beforeEach(async () => {
    await (await environmentArranger).arrange();
    await (await environmentFixtures).loadFixtures();
});

afterAll(async () => {
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
});

describe('FixRepository', () => {
    describe('#save & #search', () => {
        it('should save a fix and search by id', async () => {
            const fix = FixMother.random();

            await repository.save(fix);
            const fixResponse = await repository.search(fix.id);

            expect(fixResponse)
                .toEqual(fix)
        });
    });

    describe('#searchUser', () => {
        it('should search bikes by user', async () => {
            const fix = FixMother.random();

            await repository.save(fix);
            const fixList = await repository.searchUser(fix.userId);

            expect(fixList)
                .toEqual([fix])
        });
    });

    describe('#save & #search & #delete', () => {
        it('should delete a existent fix', async () => {
            const fix = FixMother.random();
            await repository.save(fix);

            await repository.delete(fix.id);

            const fixResponse = await repository.search(fix.id);
            expect(fixResponse).toBeUndefined()
        });
    });
});
