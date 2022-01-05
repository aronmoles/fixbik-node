import { Request as ExpressRequest } from 'express';

export interface Req extends ExpressRequest {
    auth?: {
        authUserId?: string,
    }
}
