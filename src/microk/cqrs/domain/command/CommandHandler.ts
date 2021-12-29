import { NewableClass } from '../../../common/NewableClass';
import Command from './Command';

export default abstract class CommandHandler<C extends Command> {
    private readonly _commandName: string;

    protected constructor(command: NewableClass<Command>) {
        this._commandName = command.name;
    }

    public subscribedTo(): string {
        return this._commandName;
    }

    abstract handle(command: C): Promise<void>;
}
