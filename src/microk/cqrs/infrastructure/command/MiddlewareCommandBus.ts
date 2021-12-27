import BusMiddleware from '../../../core/domain/BusMiddleware';
import Command from '../../domain/command/Command';
import { CommandBus } from '../../domain/command/CommandBus';
import CommandBusDecorator from '../../domain/command/CommandBusDecorator';

export class MiddlewareCommandBus extends CommandBusDecorator {
    private readonly middlewares: BusMiddleware<Command, void>[];

    constructor(commandBus: CommandBus, middlewares: BusMiddleware<Command, void>[]) {
        super(commandBus);
        this.middlewares = middlewares
            .sort((midd1, midd2) => midd2.order() - midd1.order());
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
