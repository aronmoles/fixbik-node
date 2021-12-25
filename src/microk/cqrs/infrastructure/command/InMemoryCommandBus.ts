import { Mapper } from '../../../common/Mapper';
import Command from '../../domain/command/Command';
import { CommandBus } from '../../domain/command/CommandBus';
import CommandHandler from '../../domain/command/CommandHandler';

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
