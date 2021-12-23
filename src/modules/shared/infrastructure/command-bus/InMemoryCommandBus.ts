import { CommandHandlersMapper } from './CommandHandlersMapper';
import { CommandBus } from '../../domain/command-bus/CommandBus';
import Command from '../../domain/command-bus/Command';

export class InMemoryCommandBus implements CommandBus {
    constructor(private commandHandlersInformation: CommandHandlersMapper) {
    }

    async dispatch(command: Command): Promise<void> {
        const handler = this.commandHandlersInformation.search(command);

        await handler.handle(command);
    }
}
