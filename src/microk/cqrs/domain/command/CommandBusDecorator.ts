import { Mapper } from '../../../common/Mapper';
import { CommandBus } from './CommandBus';
import Command from './Command';
import CommandHandler from './CommandHandler';

export default class CommandBusDecorator implements CommandBus {
    constructor(
        private readonly commandBus: CommandBus,
    ) {
    }

    attachMapper(commandHandlerMapper: Mapper<Command, CommandHandler<Command>>): void {
        this.commandBus.attachMapper(commandHandlerMapper)
    }


    dispatch(command: Command): Promise<void> {
        return this.commandBus.dispatch(command);
    }
}
