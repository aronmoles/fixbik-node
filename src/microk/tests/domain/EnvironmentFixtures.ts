import { glob } from 'glob';

export default abstract class EnvironmentFixtures {
    async getFiles(): Promise<string[]> {
        const srcFixtures = glob.sync('src/**/*.fixtures.json');
        const testFixtures = glob.sync('tests/**/*.fixtures.json');
        return [...srcFixtures, ...testFixtures];
    }

    abstract loadFixtures(): Promise<void>;
}
