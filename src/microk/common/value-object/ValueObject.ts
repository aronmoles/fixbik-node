import { PrimitiveType } from '../PrimitiveType';
import { InvalidArgumentError } from './InvalidArgumentError';

export abstract class ValueObject<T extends PrimitiveType> {
    protected constructor(
        private readonly _value: T,
    ) {
        this.ensureValueIsDefined(_value);
    }

    private ensureValueIsDefined(value: T): void {
        if (value === null || value === undefined) {
            throw new InvalidArgumentError('Value must be defined');
        }
    }

    public value(): T {
        return this._value;
    }

    public equals(other: ValueObject<T>): boolean {
        return this.value() === other.value();
    }

    protected toJSON() {
        return this.toString();
    }

    toString() {
        if (this._value) {
            return this._value.toString();
        }

        return this._value;
    }

    valueOf() {
        return this._value;
    }
}
