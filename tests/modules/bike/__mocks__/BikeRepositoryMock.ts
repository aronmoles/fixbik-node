import BikeRepository from '../../../../src/modules/bike/domain/BikeRepository';
import Bike from '../../../../src/modules/bike/domain/Bike';
import { Nullable } from '../../../../src/microk/common/Nullable';
import BikeId from '../../../../src/modules/bike/domain/BikeId';
import AuthUserId from '../../../../src/modules/auth/domain/AuthUserId';

export default class BikeRepositoryMock implements BikeRepository {
    private readonly saveSpy = jest.fn();

    private bike: Bike;

    constructor() {
    }

    mockReturn(bike: Bike) {
        this.bike = bike;
    }

    async save(authUser: Bike): Promise<void> {
        this.saveSpy(authUser)
    }

    hasBenCalledSaveWith(bike: Bike) {
        expect(this.saveSpy)
            .toHaveBeenCalledWith(bike)
    }

    async search(bikeId: BikeId): Promise<Nullable<Bike>> {
        return this.bike;
    }

    async searchUser(authUserId: AuthUserId): Promise<Nullable<Bike[]>> {
        return [this.bike];
    }
}
