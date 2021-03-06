import Container from '../../../../../src/app/Container';
import { EnvironmentArranger } from '../../../../../src/microk/tests/domain/EnvironmentArranger';
import { Keys } from '../../../../../src/modules/shared/infrastructure/di/Keys';
import BikeRepository from '../../../../../src/modules/bike/domain/BikeRepository';
import BikeMother from '../../domain/BikeMother';
import EnvironmentFixtures from '../../../../../src/microk/tests/domain/EnvironmentFixtures';

const repository: BikeRepository = Container.get(Keys.Bike.BikeRepository);
const environmentArranger: EnvironmentArranger = Container.get(Keys.Test.EnvironmentArranger);
const environmentFixtures: EnvironmentFixtures = Container.get(Keys.Test.EnvironmentFixtures);

beforeEach(async () => {
    await (await environmentArranger).arrange();
    await (await environmentFixtures).loadFixtures();
});

afterAll(async () => {
    // await (await environmentArranger).arrange();
    await (await environmentArranger).close();
});

describe('BikeRepository', () => {
    describe('#save & #search', () => {
        it('should save a auth user and search by id', async () => {
            const bike = BikeMother.random();

            await repository.save(bike);
            const bikeResponse = await repository.search(bike.id);

            expect(bikeResponse)
                .toEqual(bike)
        });
    });

    describe('#searchUser', () => {
        it('should search bikes by user', async () => {
            const bike = BikeMother.random();

            await repository.save(bike);
            const bikeList = await repository.searchUser(bike.userId);

            expect(bikeList)
                .toEqual([bike])
        });
    });

    describe('#save & #search & #delete', () => {
        it('should delete a existent bike', async () => {
            const bike = BikeMother.random();
            await repository.save(bike);

            await repository.delete(bike.id);

            const bikeResponse = await repository.search(bike.id);
            expect(bikeResponse).toBeUndefined()
        });
    });
});
