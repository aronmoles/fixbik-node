import BusMiddleware from '../domain/BusMiddleware';
import Command from '../domain/command-bus/Command';

export default class MessageMiddlewareExecutor {
    constructor(private readonly middlewares: BusMiddleware<Command, void>) {
    }
}
