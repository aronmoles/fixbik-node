import { ControllerConfig } from './ControllerConfig';
import { Request } from './Request';
import { Response } from './Response';

export default interface Controller {
    config(): ControllerConfig;
    run(req: Request, res: Response): Promise<void>;
}
