import Command from './Command';
import { Type } from '../framework/Type';

export default abstract class CommandHandler<C extends Command> {
    private readonly _commandName: string;

    protected constructor(command: Type<Command>) {
        this._commandName = command.name;
    }

    public subscribedTo(): string {
        return this._commandName;
    }

    abstract handle(command: C): Promise<void>;
}
