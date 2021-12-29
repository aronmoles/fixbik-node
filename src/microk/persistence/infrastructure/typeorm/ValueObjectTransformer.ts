import { NewableClass } from '../../../common/NewableClass';
import { ValueObject } from '../../../common/value-object/ValueObject';

export const ValueObjectTransformer = (valueObject: NewableClass<ValueObject<any>>) => {
    return {
        to: (value: ValueObject<any>): any => value?.value(),
        from: (value: any): ValueObject<any> => (value ? new valueObject(value) : undefined),
    }
}
