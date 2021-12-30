import { ControllerConfig } from './ControllerConfig';
import { ControllerResponse } from './ControllerResponse';
import { Request } from './Request';

export default interface Controller<R = undefined> {
    config(): ControllerConfig;
    run(req: Request): Promise<ControllerResponse<R>>;
}
