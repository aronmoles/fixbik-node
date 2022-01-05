import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from './InvalidArgumentError';
import { v4, validate } from 'uuid';

export default class Uuid extends ValueObject<string> {
    static create(): Uuid {
        return new Uuid(v4());
    }

    protected ensureValidValue(uuid: string) {
        if (!validate(uuid)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${uuid}>`);
        }
    }
}
