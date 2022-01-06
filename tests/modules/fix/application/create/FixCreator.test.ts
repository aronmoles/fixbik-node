import EventBusMock from '../../../shared/__mocks__/EventBusMock';
import AlreadyExistsHttpError from '../../../../../src/microk/common/http/errors/AlreadyExistsHttpError';
import FixRepositoryMock from '../../__mocks__/FixRepositoryMock';
import FixCreatorCommandHandler from '../../../../../src/modules/fix/application/create/FixCreatorCommandHandler';
import FixCreator from '../../../../../src/modules/fix/application/create/FixCreator';
import FixCreatorCommandMother from './FixCreatorCommandMother';
import FixMother from '../../domain/FixMother';

let fixRepository: FixRepositoryMock;
let eventBus: EventBusMock;
let fixCreatorCommandHandler: FixCreatorCommandHandler;

beforeEach(() => {
    fixRepository = new FixRepositoryMock();
    eventBus = new EventBusMock();
    fixCreatorCommandHandler = new FixCreatorCommandHandler(
        new FixCreator(fixRepository, eventBus),
    );
});

describe('FixCreator', () => {
    it('should create a fix', async () => {
        const command = FixCreatorCommandMother.random();
        const fix = FixMother.fromFixCreatorCommand(command);

        await fixCreatorCommandHandler.handle(command);

        fixRepository.hasBenCalledSaveWith(fix);
        eventBus.hasBeenPublishedEvent();
    });

    it('should throw AlreadyExistsHttpError if fix already exists', async () => {
        const command = FixCreatorCommandMother.random();
        fixRepository.mockReturn(FixMother.random())

        await expect(async () => {
            await fixCreatorCommandHandler.handle(command);
        })
            .rejects
            .toThrow(AlreadyExistsHttpError);
    });
});
