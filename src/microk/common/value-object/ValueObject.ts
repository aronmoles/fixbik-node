import { PrimitiveType } from '../PrimitiveType';

export abstract class ValueObject<T extends PrimitiveType> {
    protected constructor(
        private readonly _value: T,
    ) {
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
