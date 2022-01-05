import Env from '../../../../../microk/core/domain/env/Env';
import { TypeOrmConfig } from '../../../../../microk/persistence/infrastructure/typeorm/TypeOrmConfig';
import { FixBikEnvType } from '../../../../../app/FixBikEnv';

export class TypeOrmConfigFactory {
    static createConfig(env: Env<FixBikEnvType>): TypeOrmConfig {
        return {
            host: env.get('MYSQL_HOST'),
            port: Number(env.get('MYSQL_PORT')),
            username: env.get('MYSQL_USER'),
            password: env.get('MYSQL_PASSWORD'),
            database: env.get('MYSQL_DATABASE'),
        };
    }
}
