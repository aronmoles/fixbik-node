import AppConfig from '../../../../src/modules/info/domain/AppConfig';
import data from './../../../../package.json';

export default class AppConfigFactory {
    static getConfig(): AppConfig {
        return {
            name: data.name,
            version: data.version,
            description: data.description,
            author: data.author,
            license: data.license,
        }
    }
}
