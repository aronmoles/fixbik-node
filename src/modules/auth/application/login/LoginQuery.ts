import MessageId from '@microk/common/message/MessageId';
import { MessageType } from '@microk/common/message/MessageType';
import MessageNameFactory from '@microk/common/value-object/MessageNameFactory';
import Query from '@microk/cqrs/domain/query/Query';

export default class LoginQuery extends Query {
    constructor() {
        super(
            MessageId.create(),
            MessageNameFactory.create('login', 'auth', MessageType.QUERY),
        );
    }
}
