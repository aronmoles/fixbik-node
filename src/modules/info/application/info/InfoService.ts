import { InfoResponse } from './InfoResponse';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import AppConfig from '../../domain/AppConfig';

export default class InfoService {
    constructor(
        @Inject(Keys.App.AppConfig) private readonly appConfig: AppConfig,
    ) {
    }

    public async invoke(): Promise<InfoResponse> {
        return this.appConfig as InfoResponse;
    }
}
