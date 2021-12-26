import { Mapper } from '../../../common/Mapper';
import Command from '../../domain/command/Command';
import { CommandBus } from '../../domain/command/CommandBus';
import CommandHandler from '../../domain/command/CommandHandler';

export class InMemoryCommandBus implements CommandBus {
    constructor(private readonly commandHandlersMapper: Mapper<Command, CommandHandler<Command>>) {
    }

    async dispatch(command: Command): Promise<void> {
        const handler = this.commandHandlersMapper.search(command);

        await handler.handle(command);
    }
}
