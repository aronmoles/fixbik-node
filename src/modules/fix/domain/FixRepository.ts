import Fix from './Fix';
import FixId from './FixId';
import { Nullable } from '../../../microk/common/Nullable';
import AuthUserId from '../../auth/domain/AuthUserId';

export default interface FixRepository {
    save(fix: Fix): Promise<void>
    delete(id: FixId): Promise<void>
    search(id: FixId): Promise<Nullable<Fix>>
    searchUser(userId: AuthUserId): Promise<Fix[]>
}
