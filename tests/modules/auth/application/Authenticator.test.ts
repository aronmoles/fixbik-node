import NotFoundHttpError from '@microk/common/http/errors/NotFoundHttpError';
import UnauthorizedHttpError from '@microk/common/http/errors/UnauthorizedHttpError';
import AuthenticateQueryHandler from '../../../../src/modules/auth/application/login/AuthenticateQueryHandler';
import Authenticator from '../../../../src/modules/auth/application/login/Authenticator';
import AuthTokenRepository from '../../../../src/modules/auth/domain/AuthTokenRepository';
import EventBusMock from '../../shared/__mocks__/EventBusMock';
import AuthTokenRepositoryMock from '../__mocks__/AuthTokenRepositoryMock';
import AuthUserRepositoryMock from '../__mocks__/AuthUserRepositoryMock';
import AuthUserMother from '../domain/AuthUserMother';
import AuthenticateQueryMother from './AuthenticateQueryMother';

let authUserRepository: AuthUserRepositoryMock;
let authTokenRepository: AuthTokenRepository;
let eventBus: EventBusMock;
let authenticateQueryHandler: AuthenticateQueryHandler;

beforeEach(() => {
    authTokenRepository = new AuthTokenRepositoryMock();
    authUserRepository = new AuthUserRepositoryMock();
    eventBus = new EventBusMock();
    authenticateQueryHandler = new AuthenticateQueryHandler(
        new Authenticator(authUserRepository, authTokenRepository, eventBus),
    );
});

describe('Authenticator', () => {
    it('should create a valid auth token', async () => {
        const query = AuthenticateQueryMother.random();
        const authUser = AuthUserMother.fromQuery(query);
        authUserRepository.mockReturn(authUser);

        const authToken = await authenticateQueryHandler.handle(query);

        expect(authToken.toString()).toBeDefined();
        eventBus.hasBeenPublishedEvent();
    });

    it('should throw NotFoundError if user not exists', async () => {
        const query = AuthenticateQueryMother.random();
        authUserRepository.mockReturn(null);

        await expect(async () => {
            await authenticateQueryHandler.handle(query);
        }).rejects.toThrow(NotFoundHttpError);
    });

    it('should throw UnauthorizedHttpError if user credentials are invalid', async () => {
        const query = AuthenticateQueryMother.random();
        const authUser = AuthUserMother.random();
        authUserRepository.mockReturn(authUser);

        await expect(async () => {
            await authenticateQueryHandler.handle(query);
        }).rejects.toThrow(UnauthorizedHttpError);
    });
});
