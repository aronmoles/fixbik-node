import EventBusMock from '../../../shared/__mocks__/EventBusMock';
import FixRepositoryMock from '../../__mocks__/FixRepositoryMock';
import FixRemoveCommandMother from './FixRemoveCommandMother';
import FixMother from '../../domain/FixMother';
import NotFoundHttpError from '../../../../../src/microk/common/http/errors/NotFoundHttpError';
import FixUpdateCommandHandler from '../../../../../src/modules/fix/application/update/FixUpdateCommandHandler';
import FixUpdate from '../../../../../src/modules/fix/application/update/FixUpdate';
import ForbiddenHttpError from '../../../../../src/microk/common/http/errors/ForbiddenHttpError';
import FixRemoveCommandHandler from '../../../../../src/modules/fix/application/remove/FixRemoveCommandHandler';
import FixRemove from '../../../../../src/modules/fix/application/remove/FixRemove';

let fixRepository: FixRepositoryMock;
let eventBus: EventBusMock;
let fixRemoveCommandHandler: FixRemoveCommandHandler;

beforeEach(() => {
    fixRepository = new FixRepositoryMock();
    eventBus = new EventBusMock();
    fixRemoveCommandHandler = new FixRemoveCommandHandler(
        new FixRemove(fixRepository, eventBus),
    );
});

describe('FixRemove', () => {
    it('should remove a fix', async () => {
        const command = FixRemoveCommandMother.random();
        const fix = FixMother.fromFixRemoveCommand(command);
        fixRepository.mockReturn(fix)

        await fixRemoveCommandHandler.handle(command);

        fixRepository.hasBenCalledDeleteWith(fix.id);
        eventBus.hasBeenPublishedEvent();
    });

    it('should throw NotFoundHttpError if fix not exits', async () => {
        const command = FixRemoveCommandMother.random();
        fixRepository.mockReturn(null)

        await expect(async () => {
            await fixRemoveCommandHandler.handle(command);
        })
            .rejects
            .toThrow(NotFoundHttpError);
    });

    it('should throw ForbiddenHttpError if fix belongs another user', async () => {
        const command = FixRemoveCommandMother.random();
        fixRepository.mockReturn(FixMother.random())

        await expect(async () => {
            await fixRemoveCommandHandler.handle(command);
        })
            .rejects
            .toThrow(ForbiddenHttpError);
    });
});
