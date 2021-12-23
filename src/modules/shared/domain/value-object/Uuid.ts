import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from './InvalidArgumentError';
import { v4, validate } from 'uuid';

export default class Uuid extends ValueObject<string> {
    constructor(value: string) {
        super(value)
        this.ensureIsValidUuid(value);
    }

    static generate(): Uuid {
        return new Uuid(v4());
    }

    private ensureIsValidUuid(uuid: string): void {
        if (!validate(uuid)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${uuid}>`);
        }
    }
}
