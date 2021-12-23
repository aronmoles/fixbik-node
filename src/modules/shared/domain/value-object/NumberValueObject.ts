import { ValueObject } from './ValueObject';

export abstract class NumberValueObject extends ValueObject<number> {
    protected constructor(value: number) {
        super(value);
    }

    isBiggerThan(other: NumberValueObject): boolean {
        return this.value > other.value;
    }
}
