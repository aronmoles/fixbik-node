import { Connection, EntityMetadata } from 'typeorm';
import { EnvironmentArranger } from '../../domain/EnvironmentArranger';
import Inject from '../../../core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../../modules/shared/infrastructure/di/Keys';

export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
    constructor(
        @Inject(Keys.App.ConnectionManager) private _client: Promise<Connection>,
    ) {
        super();
    }

    public async arrange(): Promise<void> {
        await this.cleanDatabase();
    }

    protected async cleanDatabase(): Promise<void> {
        const entities = await this.entities();

        try {
            for (const entity of entities) {
                const repository = (await this.client()).getRepository(entity.name);
                await repository.query('SET FOREIGN_KEY_CHECKS = 0;');
                await repository.query(`TRUNCATE TABLE ${entity.tableName};`);
                await repository.query('SET FOREIGN_KEY_CHECKS = 1;');
            }
        } catch (error) {
            throw new Error(`Unable to clean test database: ${error}`);
        }
    }

    private async entities(): Promise<EntityMetadata[]> {
        return (await this.client()).entityMetadatas;
    }

    protected client(): Promise<Connection> {
        return this._client;
    }

    public async close(): Promise<void> {
        return (await this.client()).close();
    }
}
