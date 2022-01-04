import AuthUserEmail from '../../domain/AuthUserEmail';
import AuthUserPassword from '../../domain/AuthUserPassword';
import MessageNameFactory from '../../../../microk/common/value-object/MessageNameFactory';
import { MessageType } from '../../../../microk/common/message/MessageType';
import MessageId from '../../../../microk/common/message/MessageId';
import Query from '../../../../microk/cqrs/domain/query/Query';
import { Request } from '../../../../microk/core/domain/http/Request';

export default class AuthenticateQuery extends Query {
    static fromRequest(req: Request): AuthenticateQuery {
        return new AuthenticateQuery(
            new AuthUserEmail(req.body.email),
            new AuthUserPassword(req.body.password),
        )
    }

    constructor(
        private readonly _email: AuthUserEmail,
        private readonly _password: AuthUserPassword,
    ) {
        super(
            MessageId.create(),
            MessageNameFactory.create('authenticate', 'auth', MessageType.QUERY),
        );
    }

    get email(): AuthUserEmail {
        return this._email;
    }

    get password(): AuthUserPassword {
        return this._password;
    }
}
