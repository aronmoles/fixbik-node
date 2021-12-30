import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Equal, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not } from 'typeorm';
import { Criteria } from '../../../common/criteria/Criteria';
import { Filter } from '../../../common/criteria/Filter';
import { Operator } from '../../../common/criteria/FilterOperator';

export default class TypeOrmCriteriaConverter {
    public convert(criteria: Criteria): FindManyOptions<unknown> {
        const options: FindManyOptions<unknown> = {};

        if (criteria.hasOrder()) {
            options.order = {
                name: criteria.order.orderBy.value(),
                id: criteria.order.orderType.value(),
            };
        }

        if (criteria.hasPagination()) {
            options.skip = criteria.offset;
            options.take = criteria.limit;
        }

        if (criteria.hasFilters()) {
            options.where = {};
            for (const filter of criteria.filters.filters) {
                options.where[filter.field.value()] = this.buildWhereCondition(filter);
            }
        }

        return options;
    }

    private buildWhereCondition(filter: Filter): any {
        switch (filter.operator.value()) {
            case Operator.EQUAL:
                return Equal(filter.value.value());
            case Operator.NOT_EQUAL:
                return Not(Equal(filter.value.value()));
            case Operator.GT:
                return MoreThan(filter.value.value());
            case Operator.GT_OR_EQUAL:
                return MoreThanOrEqual(filter.value.value());
            case Operator.LT:
                return LessThan(filter.value.value());
            case Operator.LT_OR_EQUAL:
                return LessThanOrEqual(filter.value.value());
            case Operator.LIKE:
                return Like(filter.value.value());
            // case Operator.CONTAINS:
            //     return In<string>(filter.value.value);
            default:
                return filter.value.value();
        }
    }
}
