import { AuthUser } from '../../domain/AuthUser';
import AuthUserEmail from '../../domain/AuthUserEmail';
import { AuthUserRepository } from '../../domain/AuthUserRepository';
import { Order } from '../../../../microk/common/criteria/Order';
import { FilterOperator } from '../../../../microk/common/criteria/FilterOperator';
import { Filters } from '../../../../microk/common/criteria/Filters';
import NotFoundHttpError from '../../../../microk/common/http/errors/NotFoundHttpError';
import { Filter } from '../../../../microk/common/criteria/Filter';
import { FilterField } from '../../../../microk/common/criteria/FilterField';
import { Criteria } from '../../../../microk/common/criteria/Criteria';
import { FilterValue } from '../../../../microk/common/criteria/FilterValue';

export default class AuthUserSearchByEmail {
    constructor(
        private readonly authUserRepository: AuthUserRepository,
    ) {
    }

    public async search(email: AuthUserEmail): Promise<NonNullable<AuthUser>> {
        const criteria = this.buildCriteria(email)
        const authUser = await this.authUserRepository.searchOneByCriteria(criteria);

        if (!authUser) {
            throw new NotFoundHttpError(`Not found user with email <${email.toString()}>`)
        }

        return authUser;
    }

    private buildCriteria(email: AuthUserEmail) {
        return new Criteria(
            new Filters([new Filter(
                new FilterField('email'),
                FilterOperator.equal(),
                new FilterValue(email.toString()),
            )]),
            Order.none(),
        );
    }
}
