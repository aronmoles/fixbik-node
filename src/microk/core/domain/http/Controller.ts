import { ControllerConfig } from './ControllerConfig';
import { ControllerResponse } from './ControllerResponse';
import { Req } from './Req';

export default interface Controller<R = undefined> {
    config(): ControllerConfig;
    run(req: Req): Promise<ControllerResponse<R>>;
}
