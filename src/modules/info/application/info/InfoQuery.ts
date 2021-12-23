import Query from '../../../shared/domain/query-bus/Query';
import MessageId from '../../../shared/domain/messages/MessageId';
import MessageNameFactory from '../../../shared/infrastructure/MessageNameFactory';
import { MessageType } from '../../../shared/domain/messages/MessageType';

export default class InfoQuery extends Query {
    constructor() {
        super(
            MessageId.generate(),
            MessageNameFactory.create('consulted', 'info', MessageType.QUERY),
        );
    }
}
