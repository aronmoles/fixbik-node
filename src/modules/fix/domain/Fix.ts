import { AggregateRoot } from '../../../microk/common/AggregateRoot';
import AuthUserId from '../../auth/domain/AuthUserId';
import FixId from './FixId';
import FixName from './FixName';
import FixCreatedDomainEvent from './FixCreatedDomainEvent';
import ForbiddenHttpError from '../../../microk/common/http/errors/ForbiddenHttpError';
import FixUpdatedDomainEvent from './FixUpdatedDomainEvent';

export default class Fix extends AggregateRoot {
    constructor(
        readonly id: FixId,
        public name: FixName,
        readonly userId: AuthUserId,
    ) {
        super();
    }

    static create(id: FixId, name: FixName, userId: AuthUserId): Fix {
        const fix = new Fix(id, name, userId);
        fix.record(new FixCreatedDomainEvent(fix))
        return fix;
    }

    toPrimitives(): any {
        return {
            id: this.id.value(),
            name: this.name.value(),
        }
    }

    checkBelongs(authUserId: AuthUserId) {
        if (!this.userId.equals(authUserId)) {
            throw new ForbiddenHttpError('Fix not belongs a user')
        }
    }

    update(name: FixName) {
        this.name = name;

        this.record(new FixUpdatedDomainEvent(this))
    }
}
