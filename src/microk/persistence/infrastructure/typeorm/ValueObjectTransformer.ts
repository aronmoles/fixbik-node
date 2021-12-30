import { FindOperator } from 'typeorm';
import { NewableClass } from '../../../common/NewableClass';
import { ValueObject } from '../../../common/value-object/ValueObject';

export const ValueObjectTransformer = (valueObject: NewableClass<ValueObject<any>>) => {
    return {
        to: (vo: ValueObject<any>): any => {
            if (vo instanceof FindOperator || typeof vo === 'string' || typeof vo === 'number') {
                return vo;
            }
            return vo?.value();
        },
        from: (value: any): ValueObject<any> => (value ? new valueObject(value) : null),
    }
}
