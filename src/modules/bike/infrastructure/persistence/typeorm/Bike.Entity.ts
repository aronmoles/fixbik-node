import { EntitySchema } from 'typeorm';
import {
    ValueObjectTransformer,
} from '../../../../../microk/persistence/infrastructure/typeorm/ValueObjectTransformer';
import Bike from '../../../domain/Bike';
import BikeId from '../../../domain/BikeId';
import AuthUserId from '../../../../auth/domain/AuthUserId';
import BikeName from '../../../domain/BikeName';
import BikeBrand from '../../../domain/BikeBrand';
import BikeModel from '../../../domain/BikeModel';
import BikeYear from '../../../domain/BikeYear';

export const BikeEntity = new EntitySchema<Bike>({
    name: 'Bike',
    tableName: 'bike',
    target: Bike,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: ValueObjectTransformer(BikeId),
        },
        userId: {
            type: String,
            name: 'user_id',
            transformer: ValueObjectTransformer(AuthUserId),
        },
        name: {
            type: String,
            transformer: ValueObjectTransformer(BikeName),
        },
        brand: {
            type: String,
            transformer: ValueObjectTransformer(BikeBrand),
        },
        model: {
            type: String,
            transformer: ValueObjectTransformer(BikeModel),
        },
        year: {
            type: Number,
            transformer: ValueObjectTransformer(BikeYear),
        },
    },
});
