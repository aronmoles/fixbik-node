import { Keys } from '../../../../modules/shared/infrastructure/di/Keys';
import { Mapper } from '../../../common/Mapper';
import { ContainerTag } from '../../../core/domain/di/ContainerTag';
import WrapperExecutor from '../../../core/domain/WrapperExecutor';
import Inject from '../../../core/infrastructure/di/Inject.decorator';
import InjectTag from '../../../core/infrastructure/di/InjecTag.decorator';
import Executor from '../../../core/infrastructure/Executor';
import Command from '../../domain/command/Command';
import { CommandBus } from '../../domain/command/CommandBus';
import CommandHandler from '../../domain/command/CommandHandler';

export class InMemoryCommandBus implements CommandBus {
    private readonly executor: Executor<Command, void>;

    constructor(
        @Inject(Keys.CQRS.CommandHandlersMapper)
        private readonly commandHandlersMapper: Mapper<Command, CommandHandler<Command>>,
        @InjectTag(ContainerTag.COMMAND_EXECUTOR) executors: WrapperExecutor<Command, void>[] = [],
    ) {
        this.executor = new Executor<Command, void>(executors);
    }

    async dispatch(command: Command): Promise<void> {
        return this.executor.run(command, async () => {
            const handler = this.commandHandlersMapper.search(command);
            await handler.handle(command);
        })
    }
}
