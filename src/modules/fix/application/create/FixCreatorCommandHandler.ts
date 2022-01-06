import CommandHandler from '../../../../microk/cqrs/domain/command/CommandHandler';
import FixCreatorCommand from './FixCreatorCommand';
import FixCreator from './FixCreator';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';

export default class FixCreatorCommandHandler extends CommandHandler<FixCreatorCommand> {
    constructor(
        @Inject(Keys.Fix.FixCreator) private readonly fixCreator: FixCreator,
    ) {
        super(FixCreatorCommand);
    }

    async handle(command: FixCreatorCommand): Promise<void> {
        await this.fixCreator.run(command.fixId, command.fixName, command.userId);
    }
}
