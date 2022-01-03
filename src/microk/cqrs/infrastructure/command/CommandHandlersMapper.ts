import { Mapper } from '../../../common/Mapper';
import { ContainerTag } from '../../../core/domain/di/ContainerTag';
import InjectTag from '../../../core/infrastructure/di/InjecTag.decorator';
import Command from '../../domain/command/Command';
import CommandHandler from '../../domain/command/CommandHandler';
import { CommandNotRegisteredError } from '../../domain/command/CommandNotRegisteredError';

export class CommandHandlersMapper implements Mapper<Command, CommandHandler<Command>> {
    private commandHandlersMap: Map<string, CommandHandler<Command>>;

    constructor(
        @InjectTag(ContainerTag.COMMAND_HANDLER) commandHandlers: Array<CommandHandler<Command>>
    ) {
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
