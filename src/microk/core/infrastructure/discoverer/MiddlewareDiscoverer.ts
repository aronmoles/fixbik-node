import { ContainerTag } from '../../domain/di/ContainerTag';
import Discoverer from '../../domain/Discoverer';
import { Middleware } from '../../domain/Middleware';
import InjectTag from '../di/InjecTag.decorator';

export default class MiddlewareDiscoverer extends Discoverer<Middleware[]> {
    constructor(
        @InjectTag(ContainerTag.MIDDLEWARE) middlewares: Middleware[],
    ) {
        super(middlewares);
    }
}
