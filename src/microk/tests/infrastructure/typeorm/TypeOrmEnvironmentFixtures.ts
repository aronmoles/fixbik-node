import { readFileSync } from 'fs';
import { Connection } from 'typeorm';
import EnvironmentFixtures from '../../domain/EnvironmentFixtures';
import Inject from '../../../core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../../modules/shared/infrastructure/di/Keys';

export default class TypeOrmEnvironmentFixtures extends EnvironmentFixtures {
    constructor(
        @Inject(Keys.App.ConnectionManager) private readonly _client: Promise<Connection>
    ) {
        super();
    }

    async loadFixtures(): Promise<void> {
        const fixtureFiles = await this.getFiles();
        for (const fixtureFile of fixtureFiles) {
            const fixture = JSON.parse(readFileSync(fixtureFile, 'utf8'));
            const repository = await (await this.client()).getRepository(fixture.entity);
            await repository
                .createQueryBuilder(fixture.entity)
                .insert()
                .values(fixture.data)
                .execute();
        }
    }

    protected client(): Promise<Connection> {
        return this._client;
    }
}
