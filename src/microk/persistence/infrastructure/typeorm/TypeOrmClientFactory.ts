import { Connection, createConnection, getConnection } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
    static async createClient(config: TypeOrmConfig): Promise<Connection> {
        try {
            const connection = await createConnection({
                type: 'mysql',
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password,
                database: config.database,
                // eslint-disable-next-line no-undef
                entities: [`${__dirname}/../../../../../src/**/**/infrastructure/persistence/typeorm/*{.js,.ts}`],
                synchronize: config.synchronize,
                logging: config.logging,
                migrationsTableName: 'migrations',
                migrations: ['migration/*.js'],
                cli: {
                    migrationsDir: 'migration',
                },
            });

            return connection;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('error', error);
            return getConnection();
        }
    }
}
