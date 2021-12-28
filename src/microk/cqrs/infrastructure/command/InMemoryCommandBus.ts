import { Mapper } from '../../../common/Mapper';
import WrapperExecutor from '../../../core/domain/WrapperExecutor';
import Executor from '../../../core/infrastructure/Executor';
import Command from '../../domain/command/Command';
import { CommandBus } from '../../domain/command/CommandBus';
import CommandHandler from '../../domain/command/CommandHandler';

export class InMemoryCommandBus implements CommandBus {
    private readonly executor: Executor<Command, void>;

    constructor(
        private readonly commandHandlersMapper: Mapper<Command, CommandHandler<Command>>,
        executors: WrapperExecutor<Command, void>[] = [],
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
