import Inject from '@microk/core/infrastructure/di/Inject.decorator';
import CommandHandler from '@microk/cqrs/domain/command/CommandHandler';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import SetInfoCommand from './SetInfoCommand';
import SetInfoService from './SetInfoService';

export default class SetInfoCommandHandler extends CommandHandler<SetInfoCommand> {
    constructor(
        @Inject(Keys.Info.SetInfoService) private readonly setInfoService: SetInfoService,
    ) {
        super(SetInfoCommand);
    }

    async handle(command: SetInfoCommand): Promise<void> {
        await this.setInfoService.invoke();
    }
}
