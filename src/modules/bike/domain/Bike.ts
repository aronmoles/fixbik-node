import { AggregateRoot } from '../../../microk/common/AggregateRoot';
import BikeId from './BikeId';
import BikeYear from './BikeYear';
import BikeName from './BikeName';
import BikeBrand from './BikeBrand';
import BikeModel from './BikeModel';
import BikeCreatedDomainEvent from './BikeCreatedDomainEvent';
import AuthUserId from '../../auth/domain/AuthUserId';
import BikeUpdatedDomainEvent from './BikeUpdatedDomainEvent';
import ForbiddenHttpError from '../../../microk/common/http/errors/ForbiddenHttpError';

export default class Bike extends AggregateRoot {
    constructor(
        public readonly id: BikeId,
        public readonly userId: AuthUserId,
        public name: BikeName,
        public brand: BikeBrand,
        public model: BikeModel,
        public year: BikeYear,
    ) {
        super();
    }

    static create(
        id: BikeId,
        userId: AuthUserId,
        name: BikeName,
        brand: BikeBrand,
        model: BikeModel,
        year: BikeYear,
    ): Bike {
        const bike = new Bike(id, userId, name, brand, model, year);
        bike.record(new BikeCreatedDomainEvent(bike))
        return bike;
    }

    toPrimitives(): any {
        return {
            id: this.id.value(),
            userId: this.userId.value(),
            name: this.name.value(),
            brand: this.brand.value(),
            model: this.model.value(),
            year: this.year.value(),
        }
    }

    checkBelongs(authUserId: AuthUserId): void {
        if (!this.userId.equals(authUserId)) {
            throw new ForbiddenHttpError('Bike not belongs to user')
        }
    }

    updateValues(name: BikeName, brand: BikeBrand, model: BikeModel, year: BikeYear) {
        this.name = name;
        this.brand = brand;
        this.model = model;
        this.year = year;

        this.record(new BikeUpdatedDomainEvent(this))
    }
}
