import MessageNameFactory from '../../../../microk/common/message/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';
import Query from '../../../../microk/cqrs/domain/query/Query';
import { Req } from '../../../../microk/core/domain/http/Req';
import { PrimitivesObject } from '../../../../microk/common/PrimitiveType';

export default class AuthenticateQuery extends Query {
    static fromRequest(req: Req): AuthenticateQuery {
        return new AuthenticateQuery(
            req.body.email,
            req.body.password,
        )
    }

    constructor(
        private readonly _email: string,
        private readonly _password: string,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('authenticate', 'auth', MessageType.QUERY),
        );
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            attributes: {
                email: this.email,
            },
        };
    }
}
