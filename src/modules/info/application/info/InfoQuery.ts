import Query from '../../../shared/domain/query-bus/Query';
import MessageId from '../../../shared/domain/messages/MessageId';
import { MessageType } from '../../../shared/domain/messages/MessageType';
import MessageName from '../../../shared/domain/messages/MessageName';

export default class InfoQuery extends Query {
    constructor() {
        super(
            MessageId.generate(),
            MessageType.QUERY,
            // TODO factoria
            new MessageName('query.info.get'),
        );
    }
}
