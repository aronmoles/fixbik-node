export default class InfoService {
    constructor() {
    }

    public async invoke(): Promise<string> {
        // Throw new NotFoundHttpException('Esto es un error tocho');
        return 'Hola';
    }
}
