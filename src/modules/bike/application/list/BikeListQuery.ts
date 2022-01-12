import Query from '../../../../microk/cqrs/domain/query/Query';
import MessageNameFactory from '../../../../microk/common/message/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';

export default class BikeListQuery extends Query {
    constructor(
        private readonly _authUserId: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('list', 'bike', MessageType.QUERY)
        );
    }

    get authUserId(): string {
        return this._authUserId;
    }
}
