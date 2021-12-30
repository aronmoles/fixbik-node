import { ValueObjectTransformer } from '@microk/persistence/infrastructure/typeorm/ValueObjectTransformer';
import { EntitySchema } from 'typeorm';
import { AuthUser } from '../../../domain/AuthUser';
import AuthUserEmail from '../../../domain/AuthUserEmail';
import AuthUserId from '../../../domain/AuthUserId';
import AuthUserPassword from '../../../domain/AuthUserPassword';
import AuthUserRecoverPasswordToken from '../../../domain/AuthUserRecoverPasswordToken';

export const AuthUserEntity = new EntitySchema<AuthUser>({
    name: 'AuthUser',
    tableName: 'auth_user',
    target: AuthUser,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: ValueObjectTransformer(AuthUserId),
        },
        email: {
            type: String,
            transformer: ValueObjectTransformer(AuthUserEmail),
        },
        password: {
            type: String,
            transformer: ValueObjectTransformer(AuthUserPassword),
        },
        recoverPasswordToken: {
            type: String,
            nullable: true,
            transformer: ValueObjectTransformer(AuthUserRecoverPasswordToken),
        },
    },
});
