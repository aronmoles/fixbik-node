import { isNullOrUndefined } from '../isNullOrUndefined';
import { Filters } from './Filters';
import { Order } from './Order';

export class Criteria {
    readonly filters: Filters;
    readonly order: Order;
    readonly limit?: number;
    readonly offset?: number;

    constructor(filters: Filters, order: Order, limit?: number, offset?: number) {
        this.filters = filters;
        this.order = order;
        this.limit = limit;
        this.offset = offset;
    }

    public hasFilters(): boolean {
        return this.filters.filters.length > 0;
    }

    hasPagination(): boolean {
        return !isNullOrUndefined(this.limit) && !isNullOrUndefined(this.offset);
    }

    hasOrder(): boolean {
        return this.order && this.order.hasOrder();
    }
}
