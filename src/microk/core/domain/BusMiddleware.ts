import Message from '../../common/message/Message';
import { QueryResponse } from '../../cqrs/domain/query/QueryResponse';

export default interface BusMiddleware<M extends Message, R extends QueryResponse | void> {
    handle(message: M, next: () => Promise<R>): Promise<R>;
}
