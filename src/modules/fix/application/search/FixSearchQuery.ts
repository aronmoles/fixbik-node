import Query from '../../../../microk/cqrs/domain/query/Query';
import MessageId from '../../../../microk/common/message/MessageId';
import MessageNameFactory from '../../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';
import { Req } from '../../../../microk/core/domain/http/Req';

export default class FixSearchQuery extends Query {
    constructor(
        readonly search: string,
        readonly userId: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('search', 'fix', MessageType.QUERY),
        );
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                search: this.search,
                userId: this.userId,
            },
        };
    }

    static fromRequest(req: Req): FixSearchQuery {
        return new FixSearchQuery(
            String(req.query.search),
            req.auth.authUserId,
        )
    }
}
