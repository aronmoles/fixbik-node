import Command from './Command';
import CommandHandler from './CommandHandler';
import { Mapper } from '../Mapper';

export interface CommandBus {
    attachMapper(commandHandlerMapper: Mapper<Command, CommandHandler<Command>>): void;
    dispatch(command: Command): Promise<void>;
}
