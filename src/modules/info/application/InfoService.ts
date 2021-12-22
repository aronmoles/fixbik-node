export default class InfoService {
    constructor() {
    }

    public async invoke(): Promise<string> {
        // Throw new NotFoundHttpError('Esto es un error tocho');
        return 'Hola';
    }
}
