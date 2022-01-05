import InfoQueryHandler from '../../../../src/modules/info/application/info/InfoQueryHandler';
import InfoService from '../../../../src/modules/info/application/info/InfoService';
import InfoQueryMother from '../domain/InfoQueryMother';
import AppConfigFactory from '../infrastructure/AppConfigFactory';

let handler: InfoQueryHandler;

beforeEach(() => {
    const appConfig = AppConfigFactory.getConfig();
    const infoService = new InfoService(appConfig);
    handler = new InfoQueryHandler(infoService);
});

describe('InfoRequest', () => {
    it('should retrieve a info of app', async () => {
        const query = InfoQueryMother.random();

        await handler.handle(query);
    });
});
