import { DateValueObject } from '../value-object/DateValueObject';

export default class AggregateMessageOccurredOn extends DateValueObject {
    static now(): AggregateMessageOccurredOn {
        return new AggregateMessageOccurredOn(new Date());
    }

    constructor(value: Date) {
        super(value);
    }
}
