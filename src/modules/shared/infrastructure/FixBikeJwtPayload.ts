import { JwtPayload } from 'jsonwebtoken';

export default interface FixBikeJwtPayload extends JwtPayload {
    authUserId: string,
}
