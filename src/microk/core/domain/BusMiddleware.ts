import Message from '../../common/message/Message';
import { QueryResponse } from '../../cqrs/domain/query/QueryResponse';
import { BusMiddlewareOrder } from './BusMiddlewareOrder';

export default interface BusMiddleware<M extends Message, R extends QueryResponse | void> {
    order(): BusMiddlewareOrder;
    handle(message: M, next: () => Promise<R>): Promise<R>;
}
