import Command from '../../domain/command-bus/Command';
import BusMiddleware from '../../domain/BusMiddleware';
import CommandBusDecorator from '../../domain/command-bus/CommandBusDecorator';
import { CommandBus } from '../../domain/command-bus/CommandBus';

export class MiddlewareCommandBus extends CommandBusDecorator {
    private readonly middlewares: BusMiddleware<Command, void>[];

    constructor(commandBus: CommandBus, middlewares: BusMiddleware<Command, void>[]) {
        super(commandBus);
        this.middlewares = middlewares;
    }

    async dispatch(command: Command): Promise<void> {
        const runner = (index: number) => {
            if (this.middlewares[index]) {
                return this.middlewares[index].handle(command, () => runner(index + 1))
            }
            return super.dispatch(command);
        }

        return runner(0)
    }
}
