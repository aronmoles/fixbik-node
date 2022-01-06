import EventBusMock from '../../../shared/__mocks__/EventBusMock';
import FixRepositoryMock from '../../__mocks__/FixRepositoryMock';
import FixUpdateCommandMother from './FixUpdateCommandMother';
import FixMother from '../../domain/FixMother';
import NotFoundHttpError from '../../../../../src/microk/common/http/errors/NotFoundHttpError';
import FixUpdateCommandHandler from '../../../../../src/modules/fix/application/update/FixUpdateCommandHandler';
import FixUpdate from '../../../../../src/modules/fix/application/update/FixUpdate';
import ForbiddenHttpError from '../../../../../src/microk/common/http/errors/ForbiddenHttpError';

let fixRepository: FixRepositoryMock;
let eventBus: EventBusMock;
let fixUpdateCommandHandler: FixUpdateCommandHandler;

beforeEach(() => {
    fixRepository = new FixRepositoryMock();
    eventBus = new EventBusMock();
    fixUpdateCommandHandler = new FixUpdateCommandHandler(
        new FixUpdate(fixRepository, eventBus),
    );
});

describe('FixUpdate', () => {
    it('should update a fix', async () => {
        const command = FixUpdateCommandMother.random();
        const fix = FixMother.fromFixUpdateCommand(command);
        fixRepository.mockReturn(fix)

        await fixUpdateCommandHandler.handle(command);

        fixRepository.hasBenCalledSaveWith(fix);
        eventBus.hasBeenPublishedEvent();
    });

    it('should throw NotFoundHttpError if fix not exits', async () => {
        const command = FixUpdateCommandMother.random();
        fixRepository.mockReturn(null)

        await expect(async () => {
            await fixUpdateCommandHandler.handle(command);
        })
            .rejects
            .toThrow(NotFoundHttpError);
    });

    it('should throw ForbiddenHttpError if fix belongs another user', async () => {
        const command = FixUpdateCommandMother.random();
        fixRepository.mockReturn(FixMother.random())

        await expect(async () => {
            await fixUpdateCommandHandler.handle(command);
        })
            .rejects
            .toThrow(ForbiddenHttpError);
    });
});
