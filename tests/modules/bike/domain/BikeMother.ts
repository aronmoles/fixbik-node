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
import BikeDetailQuery from '../../../../src/modules/bike/application/detail/BikeDetailQuery';
import BikeModifyCommand from '../../../../src/modules/bike/application/modify/BikeModifyCommand';
import BikeRemoveCommand from '../../../../src/modules/bike/application/remove/BikeRemoveCommand';

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

    static fromBikeCreatorCommand(command: BikeCreatorCommand): Bike {
        return this.create(
            BikeId.fromString(command.bikeId),
            AuthUserId.fromString(command.userId),
            new BikeName(command.bikeName),
            new BikeBrand(command.bikeBrand),
            new BikeModel(command.bikeModel),
            new BikeYear(command.bikeYear),
        )
    }

    static fromBikeListQuery(query: BikeListQuery): Bike {
        return this.create(
            BikeIdMother.random(),
            AuthUserIdMother.create(query.authUserId),
            BikeNameMother.random(),
            BikeBrandMother.random(),
            BikeModelMother.random(),
            BikeYearMother.random(),
        )
    }

    static fromBikeDetailQuery(query: BikeDetailQuery): Bike {
        return this.create(
            BikeIdMother.create(query.bikeId),
            AuthUserIdMother.create(query.authUserId),
            BikeNameMother.random(),
            BikeBrandMother.random(),
            BikeModelMother.random(),
            BikeYearMother.random(),
        )
    }

    static fromBikeModifyCommand(command: BikeModifyCommand): Bike {
        return this.create(
            BikeId.fromString(command.bikeId),
            AuthUserId.fromString(command.authUserId),
            new BikeName(command.bikeName),
            new BikeBrand(command.bikeBrand),
            new BikeModel(command.bikeModel),
            new BikeYear(command.bikeYear),
        )
    }

    static fromBikeRemoveCommand(command: BikeRemoveCommand): Bike {
        return this.create(
            BikeId.fromString(command.bikeId),
            AuthUserId.fromString(command.authUserId),
            BikeNameMother.random(),
            BikeBrandMother.random(),
            BikeModelMother.random(),
            BikeYearMother.random(),
        );
    }
}
