import { EntitySchema } from 'typeorm';
import {
    ValueObjectTransformer,
} from '../../../../../microk/persistence/infrastructure/typeorm/ValueObjectTransformer';
import AuthUserId from '../../../../auth/domain/AuthUserId';
import Fix from '../../../domain/Fix';
import FixId from '../../../domain/FixId';
import FixName from '../../../domain/FixName';

export const FixEntity = new EntitySchema<Fix>({
    name: 'Fix',
    tableName: 'fix',
    target: Fix,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: ValueObjectTransformer(FixId),
        },
        name: {
            type: String,
            transformer: ValueObjectTransformer(FixName),
        },
        userId: {
            type: String,
            name: 'user_id',
            transformer: ValueObjectTransformer(AuthUserId),
        },
    },
});
