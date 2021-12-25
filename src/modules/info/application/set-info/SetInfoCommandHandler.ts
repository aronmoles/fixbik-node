import CommandHandler from '@microk/cqrs/domain/command/CommandHandler';
import SetInfoCommand from './SetInfoCommand';
import SetInfoService from './SetInfoService';

export default class SetInfoCommandHandler extends CommandHandler<SetInfoCommand> {
    constructor(private readonly setInfoService: SetInfoService) {
        super(SetInfoCommand);
    }

    async handle(command: SetInfoCommand): Promise<void> {
        await this.setInfoService.invoke();
    }
}
