import Command from './Command';
import { CommandBus } from './CommandBus';

export default class CommandBusDecorator implements CommandBus {
    constructor(
        private readonly commandBus: CommandBus,
    ) {
    }

    dispatch(command: Command): Promise<void> {
        return this.commandBus.dispatch(command);
    }
}
