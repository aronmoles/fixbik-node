import EnumValueObject from '../value-object/EnumValueObject';
import { InvalidArgumentError } from '../value-object/InvalidArgumentError';

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  GT_OR_EQUAL = '>=',
  LT = '<',
  LT_OR_EQUAL = '<=',
  LIKE = 'LIKE',
  // CONTAINS = 'CONTAINS',
  // NOT_CONTAINS = 'NOT_CONTAINS',
}

export class FilterOperator extends EnumValueObject<Operator> {
    static equal() {
        return this.fromValue(Operator.EQUAL);
    }

    static fromValue(value: string): FilterOperator {
        switch (value) {
            case Operator.EQUAL:
                return new FilterOperator(Operator.EQUAL);
            case Operator.NOT_EQUAL:
                return new FilterOperator(Operator.NOT_EQUAL);
            case Operator.GT:
                return new FilterOperator(Operator.GT);
            case Operator.GT_OR_EQUAL:
                return new FilterOperator(Operator.GT_OR_EQUAL);
            case Operator.LT:
                return new FilterOperator(Operator.LT);
            case Operator.LT_OR_EQUAL:
                return new FilterOperator(Operator.LT_OR_EQUAL);
            case Operator.LIKE:
                return new FilterOperator(Operator.LIKE);
            // case Operator.CONTAINS:
            //     return new FilterOperator(Operator.CONTAINS);
            // case Operator.NOT_CONTAINS:
            //     return new FilterOperator(Operator.NOT_CONTAINS);
            default:
                throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
        }
    }

    constructor(value: Operator) {
        super(value, Object.values(Operator));
    }

    protected throwErrorForInvalidValue(value: Operator): void {
        throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
    }
}
