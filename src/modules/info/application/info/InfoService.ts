import { InfoResponse } from './InfoResponse';


const timeout = (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(0);
    }, time);
})

export default class InfoService {
    constructor() {
    }

    public async invoke(): Promise<InfoResponse> {
        // Throw new NotFoundHttpError('Esto es un error tocho');
        await timeout(1200)
        return {
            name: 'is-auth',
            version: '1.0.0',
        };
    }
}
