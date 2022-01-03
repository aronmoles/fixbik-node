import { ContainerTag } from '../../domain/di/ContainerTag';
import Discoverer from '../../domain/Discoverer';
import { ErrorMiddleware } from '../../domain/ErrorMiddleware';
import InjectTag from '../di/InjecTag.decorator';

export default class ErrorMiddlewareDiscoverer extends Discoverer<ErrorMiddleware[]> {
    constructor(
        @InjectTag(ContainerTag.ERROR_MIDDLEWARE) errorMiddlewares: ErrorMiddleware[],
    ) {
        super(errorMiddlewares);
    }
}
