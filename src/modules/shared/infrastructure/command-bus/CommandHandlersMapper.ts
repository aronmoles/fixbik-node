import CommandHandler from '../../domain/command-bus/CommandHandler';
import Command from '../../domain/command-bus/Command';
import { CommandNotRegisteredError } from '../../domain/command-bus/CommandNotRegisteredError';
import { Mapper } from '../../domain/Mapper';

export class CommandHandlersMapper implements Mapper<Command, CommandHandler<Command>> {
    private commandHandlersMap: Map<string, CommandHandler<Command>>;

    constructor(commandHandlers: Array<CommandHandler<Command>>) {
        this.commandHandlersMap = this.formatHandlers(commandHandlers);
    }

    private formatHandlers(commandHandlers: Array<CommandHandler<Command>>): Map<string, CommandHandler<Command>> {
        const handlersMap = new Map();

        commandHandlers.forEach((commandHandler) => {
            handlersMap.set(commandHandler.subscribedTo(), commandHandler);
        });

        return handlersMap;
    }

    public search(command: Command): CommandHandler<Command> {
        const commandHandler = this.commandHandlersMap.get(command.constructor.name);

        if (!commandHandler) {
            throw new CommandNotRegisteredError(command);
        }

        return commandHandler;
    }
}
