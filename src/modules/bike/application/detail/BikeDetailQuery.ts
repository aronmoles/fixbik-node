import Query from '../../../../microk/cqrs/domain/query/Query';
import MessageId from '../../../../microk/common/message/MessageId';
import MessageNameFactory from '../../../../microk/common/message/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';

export default class BikeDetailQuery extends Query {
    constructor(
        private readonly _bikeId: string,
        private readonly _authUserId: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('detail', 'bike', MessageType.QUERY)
        );
    }

    get bikeId(): string {
        return this._bikeId;
    }

    get authUserId(): string {
        return this._authUserId;
    }
}
