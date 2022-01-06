import CommandHandler from '../../../../microk/cqrs/domain/command/CommandHandler';
import FixUpdateCommand from './FixUpdateCommand';
import FixUpdate from './FixUpdate';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';

export default class FixUpdateCommandHandler extends CommandHandler<FixUpdateCommand> {
    constructor(
        @Inject(Keys.Fix.FixUpdate) private readonly fixUpdate: FixUpdate,
    ) {
        super(FixUpdateCommand);
    }

    async handle(command: FixUpdateCommand): Promise<void> {
        await this.fixUpdate.run(command.fixId, command.fixName, command.userId)
    }
}
