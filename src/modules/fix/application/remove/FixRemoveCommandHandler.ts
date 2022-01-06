import CommandHandler from '../../../../microk/cqrs/domain/command/CommandHandler';
import FixRemoveCommand from './FixRemoveCommand';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import FixRemove from './FixRemove';

export default class FixRemoveCommandHandler extends CommandHandler<FixRemoveCommand> {
    constructor(
        @Inject(Keys.Fix.FixRemove) private readonly fixRemove: FixRemove,
    ) {
        super(FixRemoveCommand);
    }

    async handle(command: FixRemoveCommand): Promise<void> {
        await this.fixRemove.run(command.fixId, command.userId)
    }
}
