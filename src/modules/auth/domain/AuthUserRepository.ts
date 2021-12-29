import { Nullable } from '@microk/common/Nullable';
import { AuthUser } from './AuthUser';
import AuthUserId from './AuthUserId';

export interface AuthUserRepository {
  save(authUser: AuthUser): Promise<void>;
  search(id: AuthUserId): Promise<Nullable<AuthUser>>;
}
