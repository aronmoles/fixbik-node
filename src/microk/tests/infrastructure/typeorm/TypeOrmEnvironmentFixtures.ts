import { readFileSync } from 'fs';
import { Connection } from 'typeorm';
import EnvironmentFixtures from '../../domain/EnvironmentFixtures';

export default class TypeOrmEnvironmentFixtures extends EnvironmentFixtures {
    constructor(
        private readonly connection: Connection
    ) {
        super();
    }

    async loadFixtures(): Promise<void> {
        const fixtureFiles = await this.getFiles();
        for (const fixtureFile of fixtureFiles) {
            const fixture = JSON.parse(readFileSync(fixtureFile, 'utf8'));
            const repository = await this.connection.getRepository(fixture.entity);
            await repository
                .createQueryBuilder(fixture.entity)
                .insert()
                .values(fixture.data)
                .execute();
        }
    }
}
