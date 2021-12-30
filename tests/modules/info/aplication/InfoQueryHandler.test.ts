import InfoQueryHandler from '../../../../src/modules/info/application/info/InfoQueryHandler';
import InfoService from '../../../../src/modules/info/application/info/InfoService';
import EventBusMock from '../../shared/__mocks__/EventBusMock';
import InfoQueryMother from '../domain/InfoQueryMother';

let handler: InfoQueryHandler;
let eventBus: EventBusMock;

beforeEach(() => {
    eventBus = new EventBusMock();
    const creator = new InfoService(eventBus);
    handler = new InfoQueryHandler(creator);
});

describe('InfoRequest', () => {
    it('should retrieve a info of app', async () => {
        const query = InfoQueryMother.random();

        await handler.handle(query);

        eventBus.hasBeenPublishedEvent();
    });
});
