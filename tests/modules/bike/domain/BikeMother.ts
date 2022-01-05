import BikeModel from '../../../../src/modules/bike/domain/BikeModel';
import Bike from '../../../../src/modules/bike/domain/Bike';
import BikeId from '../../../../src/modules/bike/domain/BikeId';
import BikeName from '../../../../src/modules/bike/domain/BikeName';
import BikeBrand from '../../../../src/modules/bike/domain/BikeBrand';
import BikeYear from '../../../../src/modules/bike/domain/BikeYear';
import BikeModelMother from './BikeModelMother';
import BikeIdMother from './BikeIdMother';
import BikeBrandMother from './BikeBrandMother';
import BikeNameMother from './BikeNameMother';
import BikeYearMother from './BikeYearMother';
import BikeCreatorCommand from '../../../../src/modules/bike/application/create/BikeCreatorCommand';
import AuthUserId from '../../../../src/modules/auth/domain/AuthUserId';
import AuthUserIdMother from '../../auth/domain/AuthUserIdMother';
import BikeListQuery from '../../../../src/modules/bike/application/list/BikeListQuery';

export default class BikeMother {
    static create(
        id: BikeId,
        userId: AuthUserId,
        name: BikeName,
        brand: BikeBrand,
        model: BikeModel,
        year: BikeYear,
    ): Bike {
        return new Bike(
            id,
            userId,
            name,
            brand,
            model,
            year,
        )
    }

    static random(): Bike {
        return this.create(
            BikeIdMother.random(),
            AuthUserIdMother.random(),
            BikeNameMother.random(),
            BikeBrandMother.random(),
            BikeModelMother.random(),
            BikeYearMother.random(),
        )
    }

    static fromBikeCreatorCommand(command: BikeCreatorCommand) {
        return this.create(
            BikeId.fromString(command.bikeId),
            AuthUserId.fromString(command.userId),
            new BikeName(command.bikeName),
            new BikeBrand(command.bikeBrand),
            new BikeModel(command.bikeModel),
            new BikeYear(command.bikeYear),
        )
    }

    static fromBikeListQuery(query: BikeListQuery) {
        return this.create(
            BikeIdMother.random(),
            AuthUserId.fromString(query.authUserId),
            BikeNameMother.random(),
            BikeBrandMother.random(),
            BikeModelMother.random(),
            BikeYearMother.random(),
        )
    }
}
