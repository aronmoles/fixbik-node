import { Request } from './Request';
import { Response } from './Response';

export default interface Controller {
    run(req: Request, res: Response): Promise<void>;
}
