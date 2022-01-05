import { AggregateRoot } from '../../../microk/common/AggregateRoot';
import BikeId from './BikeId';
import BikeYear from './BikeYear';
import BikeName from './BikeName';
import BikeBrand from './BikeBrand';
import BikeModel from './BikeModel';
import BikeCreatedDomainEvent from './BikeCreatedDomainEvent';
import AuthUserId from '../../auth/domain/AuthUserId';

export default class Bike extends AggregateRoot {
    constructor(
        readonly id: BikeId,
        readonly userId: AuthUserId,
        readonly name: BikeName,
        readonly brand: BikeBrand,
        readonly model: BikeModel,
        readonly year: BikeYear,
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
}
