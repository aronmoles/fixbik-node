import { ValueObject } from './ValueObject';

export abstract class DateValueObject extends ValueObject<Date> {
    protected constructor(value: Date) {
        super(value);
    }
}
