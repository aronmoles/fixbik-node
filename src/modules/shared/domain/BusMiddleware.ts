import { Response } from './Response';
import Message from './messages/Message';

export default interface BusMiddleware<M extends Message, R extends Response | void> {
    handle(message: M, next: () => Promise<R>): Promise<R>;
}
