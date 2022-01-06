import { Criteria } from '../../../../microk/common/criteria/Criteria';
import { Filters } from '../../../../microk/common/criteria/Filters';
import { Filter } from '../../../../microk/common/criteria/Filter';
import { FilterField } from '../../../../microk/common/criteria/FilterField';
import { FilterOperator, Operator } from '../../../../microk/common/criteria/FilterOperator';
import { FilterValue } from '../../../../microk/common/criteria/FilterValue';
import { Order } from '../../../../microk/common/criteria/Order';

export default class FixSearchCriteriaFactory {
    static create(search: string, userId: string): Criteria {
        return new Criteria(
            new Filters([
                new Filter(
                    new FilterField('name'),
                    FilterOperator.fromValue(Operator.LIKE),
                    new FilterValue(`%${search}%`),
                ),
                new Filter(
                    new FilterField('userId'),
                    FilterOperator.equal(),
                    new FilterValue(userId),
                ),
            ]),
            Order.asc('name'),
        );
    }
}
