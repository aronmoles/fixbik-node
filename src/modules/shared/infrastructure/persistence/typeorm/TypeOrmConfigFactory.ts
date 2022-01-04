import { EnvKey } from '../../../../../app/ProcessEnv';
import Env from '../../../../../microk/core/domain/Env';
import { TypeOrmConfig } from '../../../../../microk/persistence/infrastructure/typeorm/TypeOrmConfig';

export class TypeOrmConfigFactory {
    static createConfig(env: Env<EnvKey>): TypeOrmConfig {
        return {
            host: env.get('MYSQL_HOST'),
            port: Number(env.get('MYSQL_PORT')),
            username: env.get('MYSQL_USER'),
            password: env.get('MYSQL_PASSWORD'),
            database: env.get('MYSQL_DATABASE'),
        };
    }
}
