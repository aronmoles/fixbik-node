import Logger from '@microk/core/domain/Logger';
import Container from './Container';

const container = Container;

const logger = container.get<Logger>('App.Logger');

logger.info('Hello World!')
