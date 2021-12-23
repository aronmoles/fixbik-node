import Command from '../../domain/command-bus/Command';
import { InMemoryCommandBus } from './InMemoryCommandBus';
import BusMiddleware from '../../domain/BusMiddleware';

export class InMemoryMiddlewareCommandBus extends InMemoryCommandBus {
    private readonly middlewares: BusMiddleware<Command, void>[] = [];

    public addMiddleware(commandBusMiddleware: BusMiddleware<Command, void>) {
        this.middlewares.push(commandBusMiddleware)
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
