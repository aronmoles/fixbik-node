import { ValueObject } from './ValueObject';

export abstract class StringValueObject extends ValueObject<string> {
    protected constructor(value: string) {
        super(value);
    }
}
