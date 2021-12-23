import { InfoResponse } from './InfoResponse';

export default class InfoService {
    constructor() {
    }

    public async invoke(): Promise<InfoResponse> {
        // Throw new NotFoundHttpError('Esto es un error tocho');
        return {
            name: 'is-auth',
            version: '1.0.0',
        };
    }
}
