import { ContainerTag } from '../../domain/di/ContainerTag';
import Discoverer from '../../domain/Discoverer';
import Controller from '../../domain/http/Controller';
import InjectTag from '../di/InjecTag.decorator';

export default class ControllerDiscoverer extends Discoverer<Controller[]> {
    constructor(
        @InjectTag(ContainerTag.CONTROLLER) controllers: Controller[],
    ) {
        super(controllers);
    }
}
