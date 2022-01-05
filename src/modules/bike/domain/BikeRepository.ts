import Bike from './Bike';
import { Nullable } from '../../../microk/common/Nullable';
import BikeId from './BikeId';
import AuthUserId from '../../auth/domain/AuthUserId';

export default interface BikeRepository {
    save(authUser: Bike): Promise<void>
    search(bikeId: BikeId): Promise<Nullable<Bike>>;
    searchUser(authUserId: AuthUserId): Promise<Nullable<Bike[]>>
}
