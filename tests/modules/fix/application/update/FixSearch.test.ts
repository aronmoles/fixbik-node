import FixRepositoryMock from '../../__mocks__/FixRepositoryMock';
import FixSearchQueryMother from './FixSearchQueryMother';
import FixMother from '../../domain/FixMother';
import FixSearch from '../../../../../src/modules/fix/application/search/FixSearch';
import FixSearchQueryHandler from '../../../../../src/modules/fix/application/search/FixSearchQueryHandler';
import FixDto from '../../../../../src/modules/fix/infrastructure/dto/FixDto';

let fixRepository: FixRepositoryMock;
let fixSearchQueryHandler: FixSearchQueryHandler;

beforeEach(() => {
    fixRepository = new FixRepositoryMock();
    fixSearchQueryHandler = new FixSearchQueryHandler(
        new FixSearch(fixRepository),
    );
});

describe('FixSearch', () => {
    it('should search a fix', async () => {
        const query = FixSearchQueryMother.random();
        const fix = FixMother.fromFixSearchQuery(query);
        fixRepository.mockReturn(fix)

        const fixDtos = await fixSearchQueryHandler.handle(query);

        expect(fixDtos)
            .toEqual([FixDto.fromFix(fix)])
    });
});
