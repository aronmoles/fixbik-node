import { ControllerConfig } from './ControllerConfig';
import { ControllerResponse } from './ControllerResponse';
import { Req } from './Req';

export default interface Controller {
    config(): ControllerConfig;
    run(req: Req): Promise<ControllerResponse>;
}
