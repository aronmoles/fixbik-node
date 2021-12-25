import { ValueObject } from './ValueObject';

export abstract class DateValueObject extends ValueObject<Date> {
    protected constructor(value: Date) {
        super(value);
    }

    toString() {
        if (super.value()) {
            return super.value().toISOString();
        }
        return super.toString();
    }
}
