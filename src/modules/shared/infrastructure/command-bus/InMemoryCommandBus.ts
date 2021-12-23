import { CommandBus } from '../../domain/command-bus/CommandBus';
import Command from '../../domain/command-bus/Command';
import { Mapper } from '../../domain/Mapper';
import CommandHandler from '../../domain/command-bus/CommandHandler';

export class InMemoryCommandBus implements CommandBus {
    private commandHandlersInformation: Mapper<Command, CommandHandler<Command>>;

    attachMapper(commandHandlersInformation: Mapper<Command, CommandHandler<Command>>) {
        this.commandHandlersInformation = commandHandlersInformation;
    }

    async dispatch(command: Command): Promise<void> {
        const handler = this.commandHandlersInformation.search(command);

        await handler.handle(command);
    }
}
